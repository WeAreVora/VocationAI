import { NextRequest, NextResponse } from "next/server";

type CreatePreferenceBody = {
  perfil?: string;
  pais?: string;
};

const ALLOWED_COUNTRIES = new Set(["arg", "mx", "uru", "col", "chile", "peru"]);

function resolveBaseUrl(): string {
  const configuredBaseUrl = process.env.APP_BASE_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (!configuredBaseUrl) {
    if (process.env.NODE_ENV !== "production") {
      return "http://localhost:3000";
    }

    throw new Error("Falta APP_BASE_URL para construir back_urls de pago en produccion");
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(configuredBaseUrl);
  } catch {
    throw new Error("APP_BASE_URL no es una URL valida");
  }

  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    throw new Error("APP_BASE_URL debe usar protocolo http o https");
  }

  if (process.env.NODE_ENV === "production" && parsedUrl.protocol !== "https:") {
    throw new Error("APP_BASE_URL debe usar HTTPS en produccion");
  }

  parsedUrl.pathname = "";
  parsedUrl.search = "";
  parsedUrl.hash = "";

  return parsedUrl.toString().replace(/\/$/, "");
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
    const baseUrl = resolveBaseUrl();

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

    return NextResponse.json({
      checkoutUrl: data.init_point,
      checkoutSandboxUrl: data.sandbox_init_point,
      preferenceId: data.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Error inesperado al iniciar el pago" },
      { status: 500 },
    );
  }
}