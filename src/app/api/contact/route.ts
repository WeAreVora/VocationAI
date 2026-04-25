import { NextRequest, NextResponse } from "next/server";
import { recordContactMessage } from "@/lib/contactStore";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Email invalido" },
        { status: 400 },
      );
    }

    if (name.length > 120 || email.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { ok: false, error: "Campos demasiado largos" },
        { status: 400 },
      );
    }

    await recordContactMessage({ name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el mensaje" },
      { status: 500 },
    );
  }
}
