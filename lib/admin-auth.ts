import { isBlocked, recordFailure } from "@/lib/admin-rate-limit";

/**
 * Shared auth gate for /api/admin/* routes: same ADMIN_PASSWORD + per-IP
 * rate limiting the /admin page uses. Returns null when authorized,
 * otherwise a Response to return as-is.
 */
export function requireAdminKey(request: Request, key: unknown): Response | null {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isBlocked(ip)) {
    return Response.json({ error: "Too many failed attempts." }, { status: 429 });
  }

  const password = process.env.ADMIN_PASSWORD;
  if (!password || typeof key !== "string" || key !== password) {
    if (typeof key === "string" && key.length > 0) recordFailure(ip);
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
}
