import type { NextConfig } from "next";
import path from "node:path";

/**
 * Baseline response headers. `frame-ancestors 'none'` is the important one:
 * /admin holds an authenticated session in a SameSite=Lax cookie, and without
 * it the dashboard can be framed and clickjacked.
 *
 * Deliberately no `script-src` yet — Next injects inline bootstrap scripts, so
 * a script CSP needs nonce plumbing and its own test pass.
 */
const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    // No `preload` — that is a hard-to-reverse commitment; add it only after
    // you have confirmed every subdomain is HTTPS-only and submitted the domain.
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework and its version.
  poweredByHeader: false,

  // Pin the workspace root to this project. A stray package-lock.json in the
  // home directory otherwise makes Next infer the wrong root.
  turbopack: {
    root: path.join(__dirname),
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
