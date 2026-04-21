import { NextRequest, NextResponse } from "next/server";

type CreatePreferenceBody = {
  perfil?: string;
};

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
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;

    const successUrl = `${baseUrl}/informe?perfil=${encodeURIComponent(perfil)}`;
    const pendingUrl = `${baseUrl}/resultados?perfil=${encodeURIComponent(perfil)}&pago=pendiente`;
    const failureUrl = `${baseUrl}/resultados?perfil=${encodeURIComponent(perfil)}&pago=rechazado`;

    const payload: Record<string, unknown> = {
      items: [
        {
          title: "Informe vocacional completo - VocacionAI",
          quantity: 1,
          currency_id: "ARS",
          unit_price: 15000,
        },
      ],
      external_reference: `informe-${perfil}-${Date.now()}`,
      back_urls: {
        success: successUrl,
        pending: pendingUrl,
        failure: failureUrl,
      },
    };

    // Mercado Pago suele requerir una URL HTTPS válida para auto_return.
    if (successUrl.startsWith("https://")) {
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