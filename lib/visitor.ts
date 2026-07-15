import { createHash } from "node:crypto";

/**
 * Privacy-light visitor identifier: sha256(ip | user-agent | UTC day).
 * No cookies, nothing stored client-side; the same person counts once per
 * day. Raw IP and UA never leave this function.
 */
export function getVisitorHash(request: Request): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const ua = request.headers.get("user-agent") ?? "unknown";
  const day = new Date().toISOString().slice(0, 10);
  return createHash("sha256").update(`${ip}|${ua}|${day}`).digest("hex");
}
