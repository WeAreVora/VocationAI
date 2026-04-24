import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { compare } from "bcryptjs";

type AdminSessionPayload = {
  username: string;
  exp: number;
};

export const ADMIN_SESSION_COOKIE = "vora_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function base64UrlEncode(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function safeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

function getSessionSecret(): string {
  const secret =
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD_HASH?.trim() ||
    "";

  if (!secret) {
    throw new Error("Falta ADMIN_SESSION_SECRET o ADMIN_PASSWORD_HASH en variables de entorno");
  }

  return secret;
}

function signPayload(encodedPayload: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createAdminSessionToken(username: string): string {
  const payload: AdminSessionPayload = {
    username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined): AdminSessionPayload | null {
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [encodedPayload, signature] = parts;
  let expectedSignature = "";

  try {
    expectedSignature = signPayload(encodedPayload);
  } catch {
    return null;
  }

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionPayload;
    const now = Math.floor(Date.now() / 1000);

    if (!payload.username || payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function buildAdminSessionCookie(token: string) {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: token,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    },
  };
}

export function buildAdminSessionClearCookie() {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: "",
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    },
  };
}

export async function verifyAdminCredentials(inputUsername: string, inputPassword: string): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME?.trim();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!expectedUsername || !expectedHash) {
    return false;
  }

  if (!safeEqual(inputUsername, expectedUsername)) {
    return false;
  }

  if (expectedHash.startsWith("$2a$") || expectedHash.startsWith("$2b$") || expectedHash.startsWith("$2y$")) {
    return compare(inputPassword, expectedHash);
  }

  if (expectedHash.startsWith("sha256:")) {
    const digest = createHash("sha256").update(inputPassword).digest("hex");
    return safeEqual(digest, expectedHash.slice("sha256:".length));
  }

  const digest = createHash("sha256").update(inputPassword).digest("hex");
  return safeEqual(digest, expectedHash);
}
