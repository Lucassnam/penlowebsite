/** Client IP as seen through the proxy, or "unknown". */
export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * True when the request came from a page on this same site.
 *
 * Compared against the request's own Host header rather than a hardcoded
 * domain, so preview deployments and localhost work without configuration.
 * Browsers always send Origin on a cross-origin-capable POST, so a missing
 * Origin means the caller is not a browser page — which is exactly the
 * traffic the analytics endpoint should ignore.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const host = request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
