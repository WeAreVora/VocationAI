import { NextRequest, NextResponse } from "next/server";
import {
  buildAdminSessionCookie,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/adminAuth";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginBody;
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    const isValid = await verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: "Credenciales invalidas" },
        { status: 401 },
      );
    }

    const token = createAdminSessionToken(username);
    const sessionCookie = buildAdminSessionCookie(token);

    const response = NextResponse.json({ ok: true });
    response.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.options);

    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error al iniciar sesion" },
      { status: 500 },
    );
  }
}
