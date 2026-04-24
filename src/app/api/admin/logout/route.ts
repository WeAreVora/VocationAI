import { NextResponse } from "next/server";
import { buildAdminSessionClearCookie } from "@/lib/adminAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  const cookie = buildAdminSessionClearCookie();
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
