import { timingSafeEqual } from "node:crypto";
import { isBlocked, recordFailure } from "@/lib/admin-rate-limit";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_S } from "@/lib/admin-auth";

function passwordsMatch(supplied: string, actual: string): boolean {
  const a = Buffer.from(supplied);
  const b = Buffer.from(actual);
  // Length leak is acceptable; timingSafeEqual requires equal lengths.
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isBlocked(ip)) {
    return Response.json(
      { error: "Too many failed attempts. Try again in an hour." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { password } = (body ?? {}) as { password?: unknown };
  const actual = process.env.ADMIN_PASSWORD;

  if (!actual) {
    return Response.json(
      { error: "ADMIN_PASSWORD is not configured on the server." },
      { status: 500 },
    );
  }

  if (typeof password !== "string" || !passwordsMatch(password, actual)) {
    if (typeof password === "string" && password.length > 0) recordFailure(ip);
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }

  const token = createSessionToken();
  if (!token) {
    return Response.json({ error: "Could not create session." }, { status: 500 });
  }

  const cookie = [
    `${SESSION_COOKIE}=${token}`,
    `Max-Age=${SESSION_MAX_AGE_S}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    ...(process.env.NODE_ENV === "production" ? ["Secure"] : []),
  ].join("; ");

  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": cookie } },
  );
}

export async function DELETE() {
  const cookie = [
    `${SESSION_COOKIE}=`,
    "Max-Age=0",
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ].join("; ");
  return Response.json({ ok: true }, { headers: { "Set-Cookie": cookie } });
}
