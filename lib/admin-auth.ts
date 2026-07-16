import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Cookie-session auth for the admin dashboard and /api/admin/* routes.
 *
 * The session token is `<expiry>.<hmac(expiry)>` where the HMAC key is
 * derived from ADMIN_PASSWORD. Deriving (rather than using the password
 * directly) means the cookie value never reveals the password, and no
 * extra secret env var is needed; rotating ADMIN_PASSWORD invalidates
 * all existing sessions, which is exactly what rotation should do.
 */

export const SESSION_COOKIE = "caret_admin";
export const SESSION_MAX_AGE_S = 30 * 24 * 60 * 60; // 30 days

function sessionSecret(): Buffer | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHmac("sha256", password).update("caret-admin-session-v1").digest();
}

function sign(secret: Buffer, payload: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const exp = String(Date.now() + SESSION_MAX_AGE_S * 1000);
  return `${exp}.${sign(secret, exp)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const secret = sessionSecret();
  if (!secret) return false;

  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const exp = token.slice(0, dot);
  const mac = token.slice(dot + 1);

  const expected = sign(secret, exp);
  const macBuf = Buffer.from(mac, "hex");
  const expectedBuf = Buffer.from(expected, "hex");
  if (macBuf.length !== expectedBuf.length || !timingSafeEqual(macBuf, expectedBuf)) {
    return false;
  }

  const expMs = Number(exp);
  return Number.isFinite(expMs) && expMs > Date.now();
}

/** Read + verify the session cookie on a Request. */
export function hasValidSession(request: Request): boolean {
  const header = request.headers.get("cookie") ?? "";
  const match = header.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  return verifySessionToken(match?.[1]);
}

/**
 * Auth gate for /api/admin/* routes. Returns null when the request carries
 * a valid session cookie, otherwise a Response to return as-is.
 */
export function requireAdminSession(request: Request): Response | null {
  if (hasValidSession(request)) return null;
  return Response.json({ error: "Unauthorized." }, { status: 401 });
}
