import { NextRequest, NextResponse } from "next/server";
import {
  getApprovedSaleByPaymentId,
  getPendingPaymentByRef,
  recordApprovedSale,
  removePendingPaymentByRef,
} from "@/lib/salesStore";

type VerifyBody = {
  paymentId?: string;
  ref?: string;
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
    if (!paymentId || !ref || !isValidRef(ref)) {
      return NextResponse.json({ paid: false }, { status: 400 });
    }

    const alreadyApproved = await getApprovedSaleByPaymentId(paymentId);
    if (alreadyApproved?.ref === ref) {
      return NextResponse.json({ paid: true });
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
    const pendingPayment = await getPendingPaymentByRef(ref);

    const isApproved = payment.status === "approved";
    const sameReference = payment.external_reference === ref;
    const samePendingReference = pendingPayment ? pendingPayment.ref === ref : false;
    const sameProfile = pendingPayment ? payment.metadata?.perfil === pendingPayment.perfil : false;
    const sameCountry = pendingPayment ? payment.metadata?.pais === pendingPayment.pais : false;

    const paid = Boolean(
      isApproved &&
        sameReference &&
        pendingPayment &&
        samePendingReference &&
        sameProfile &&
        sameCountry,
    );

    if (paid && pendingPayment) {
      await recordApprovedSale({
        paymentId,
        ref,
        perfil: pendingPayment.perfil,
        pais: pendingPayment.pais,
      });

      await removePendingPaymentByRef(ref);
    }

    return NextResponse.json({ paid });
  } catch {
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
