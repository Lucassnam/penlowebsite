import { getSupabaseServerClient } from "@/lib/supabase";
import { getVisitorHash } from "@/lib/visitor";

// 'signup' is deliberately excluded: signup events are written server-side by
// the waitlist route, so clients can't inflate the conversion numbers.
const CLIENT_EVENT_TYPES = new Set(["pageview", "cta_click"]);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { type, path, referrer } = (body ?? {}) as {
    type?: unknown;
    path?: unknown;
    referrer?: unknown;
  };

  if (typeof type !== "string" || !CLIENT_EVENT_TYPES.has(type)) {
    return Response.json({ error: "Invalid event type." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("events").insert({
      type,
      path: typeof path === "string" ? path.slice(0, 256) : null,
      referrer: typeof referrer === "string" ? referrer.slice(0, 512) : null,
      visitor_hash: getVisitorHash(request),
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
