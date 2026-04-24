import { NextRequest, NextResponse } from "next/server";
import { recordApprovedSale } from "@/lib/salesStore";

type VerifyBody = {
  paymentId?: string;
  ref?: string;
  perfil?: string;
  pais?: string;
};

type MercadoPagoPayment = {
  status?: string;
  external_reference?: string;
  metadata?: {
    perfil?: string;
    pais?: string;
  };
};

function isValidRef(ref: string): boolean {
  return /^informe-[a-f0-9-]{36}$/i.test(ref);
}

export async function POST(req: NextRequest) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json({ paid: false }, { status: 500 });
    }

    const body = (await req.json()) as VerifyBody;
    const paymentId = body.paymentId?.trim();
    const ref = body.ref?.trim();
    const perfil = body.perfil?.trim();
    const pais = body.pais?.trim()?.toLowerCase();

    if (!paymentId || !ref || !isValidRef(ref)) {
      return NextResponse.json({ paid: false }, { status: 400 });
    }

    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!mpRes.ok) {
      return NextResponse.json({ paid: false }, { status: 502 });
    }

    const payment = (await mpRes.json()) as MercadoPagoPayment;

    const isApproved = payment.status === "approved";
    const sameReference = payment.external_reference === ref;
    const sameProfile = perfil ? payment.metadata?.perfil === perfil : true;
    const sameCountry = pais ? payment.metadata?.pais === pais : true;

    const paid = isApproved && sameReference && sameProfile && sameCountry;

    if (paid && perfil && pais) {
      await recordApprovedSale({
        paymentId,
        ref,
        perfil,
        pais,
      });
    }

    return NextResponse.json({ paid });
  } catch {
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
