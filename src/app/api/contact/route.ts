import { NextRequest, NextResponse } from "next/server";
import { recordContactMessage } from "@/lib/contactStore";
import { recordComment } from "@/lib/commentsStore";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

type CommentBody = {
  rating?: number;
  message?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    if (typeof (body as CommentBody).rating !== "undefined") {
      const rating = Number((body as CommentBody).rating);
      const message = (body as CommentBody).message?.trim() ?? "";

      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return NextResponse.json(
          { ok: false, error: "La puntuacion debe estar entre 1 y 5" },
          { status: 400 },
        );
      }

      if (!message) {
        return NextResponse.json(
          { ok: false, error: "El comentario es obligatorio" },
          { status: 400 },
        );
      }

      if (message.length > 5000) {
        return NextResponse.json(
          { ok: false, error: "El comentario es demasiado largo" },
          { status: 400 },
        );
      }

      await recordComment({ rating, message });

      return NextResponse.json({ ok: true });
    }

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
