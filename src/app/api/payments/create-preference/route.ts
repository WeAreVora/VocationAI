import { NextRequest, NextResponse } from "next/server";
import { recordPendingPayment } from "@/lib/salesStore";

type CreatePreferenceBody = {
  perfil?: string;
  pais?: string;
};

const ALLOWED_COUNTRIES = new Set(["arg", "mx", "uru", "col", "chile", "peru"]);

function normalizeBaseUrl(candidate: string): string | null {
  try {
    const parsedUrl = new URL(candidate);

    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      return null;
    }

    parsedUrl.pathname = "";
    parsedUrl.search = "";
    parsedUrl.hash = "";

    return parsedUrl.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function resolveBaseUrl(req: NextRequest): string {
  const candidates = [
    process.env.APP_BASE_URL?.trim(),
    process.env.NEXT_PUBLIC_APP_URL?.trim(),
    req.nextUrl.origin,
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const normalized = normalizeBaseUrl(candidate);
    if (normalized) {
      return normalized;
    }
  }

  throw new Error("No se pudo resolver la URL base de la aplicacion");
}

export async function POST(req: NextRequest) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Falta configurar MP_ACCESS_TOKEN en el servidor" },
        { status: 500 },
      );
    }

    const body = (await req.json()) as CreatePreferenceBody;
    const perfil = body.perfil?.trim() || "creativo-digital";
    const rawCountry = body.pais?.trim().toLowerCase() || "arg";
    const pais = ALLOWED_COUNTRIES.has(rawCountry) ? rawCountry : "arg";
    const baseUrl = resolveBaseUrl(req);

    const externalReference = `informe-${crypto.randomUUID()}`;

    const successUrl = `${baseUrl}/informe?perfil=${encodeURIComponent(perfil)}&pais=${encodeURIComponent(pais)}&ref=${encodeURIComponent(externalReference)}`;
    const pendingUrl = `${baseUrl}/resultados?perfil=${encodeURIComponent(perfil)}&pais=${encodeURIComponent(pais)}&pago=pendiente`;
    const failureUrl = `${baseUrl}/resultados?perfil=${encodeURIComponent(perfil)}&pais=${encodeURIComponent(pais)}&pago=rechazado`;

    const payload: Record<string, unknown> = {
      items: [
        {
          title: "Informe vocacional completo - VocacionAI",
          quantity: 1,
          currency_id: "ARS",
          unit_price: 15000,
        },
      ],
      external_reference: externalReference,
      metadata: {
        perfil,
        pais,
      },
      back_urls: {
        success: successUrl,
        pending: pendingUrl,
        failure: failureUrl,
      },
    };

    // Mercado Pago requiere HTTPS para auto_return.
    if (successUrl.toLowerCase().startsWith("https://")) {
      payload.auto_return = "approved";
    }

    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!mpRes.ok) {
      const errorText = await mpRes.text();
      return NextResponse.json(
        { error: "No se pudo crear la preferencia de Mercado Pago", detail: errorText },
        { status: 502 },
      );
    }

    const data = await mpRes.json();
    const checkoutUrl = typeof data.init_point === "string" ? data.init_point.trim() : "";
    const checkoutSandboxUrl = typeof data.sandbox_init_point === "string" ? data.sandbox_init_point.trim() : "";
    const preferenceId = typeof data.id === "string" ? data.id.trim() : "";

    if (!preferenceId || (!checkoutUrl && !checkoutSandboxUrl)) {
      return NextResponse.json(
        { error: "Mercado Pago no devolvio una preferencia valida" },
        { status: 502 },
      );
    }

    await recordPendingPayment({
      preferenceId,
      ref: externalReference,
      perfil,
      pais,
    });

    return NextResponse.json({
      checkoutUrl,
      checkoutSandboxUrl,
      preferenceId,
    });
  } catch {
    return NextResponse.json(
      { error: "Error inesperado al iniciar el pago" },
      { status: 500 },
    );
  }
}