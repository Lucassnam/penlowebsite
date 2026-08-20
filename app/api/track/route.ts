import { getSupabaseServerClient } from "@/lib/supabase";
import { getVisitorHash } from "@/lib/visitor";
import { isSameOrigin } from "@/lib/request";
import { RateLimiter } from "@/lib/rate-limit";

/**
 * This endpoint is an unauthenticated write, so anyone could otherwise inflate
 * the pageview and CTA numbers with a loop. Two cheap gates: the request has
 * to come from a page on this site, and one visitor can only log so many
 * events an hour. Neither is a hard guarantee — analytics integrity, not a
 * security boundary.
 */
const limiter = new RateLimiter(120, 60 * 60 * 1000);

// 'signup' is deliberately excluded: signup events are written server-side by
// the waitlist route, so clients can't inflate the conversion numbers.
const CLIENT_EVENT_TYPES = new Set(["pageview", "cta_click"]);

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { type, path, referrer, source } = (body ?? {}) as {
    type?: unknown;
    path?: unknown;
    referrer?: unknown;
    source?: unknown;
  };

  if (typeof type !== "string" || !CLIENT_EVENT_TYPES.has(type)) {
    return Response.json({ error: "Invalid event type." }, { status: 400 });
  }

  const visitorHash = getVisitorHash(request);
  if (!limiter.hit(visitorHash)) {
    // Quietly accept: a throttled client should not learn it is throttled, and
    // the caller has nothing useful to do with the failure either way.
    return Response.json({ ok: true });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("events").insert({
      type,
      path: typeof path === "string" ? path.slice(0, 256) : null,
      referrer: typeof referrer === "string" ? referrer.slice(0, 512) : null,
      source: typeof source === "string" ? source.slice(0, 64) : null,
      visitor_hash: visitorHash,
    });

    if (error) {
      console.error("event insert failed:", error);
      return Response.json({ error: "Insert failed." }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("track route error:", err);
    return Response.json({ error: "Insert failed." }, { status: 500 });
  }
}
