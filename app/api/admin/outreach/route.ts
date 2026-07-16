import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { requireAdminKey } from "@/lib/admin-auth";

const STATUSES = new Set([
  "research",
  "drafted",
  "sent",
  "followed_up",
  "replied",
  "won",
  "passed",
]);

const EDITABLE_FIELDS = [
  "name",
  "tier",
  "contact",
  "email",
  "status",
  "draft_subject",
  "draft_body",
  "notes",
  "sent_at",
  "follow_up_at",
] as const;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { key, action, id, fields } = (body ?? {}) as {
    key?: unknown;
    action?: unknown;
    id?: unknown;
    fields?: Record<string, unknown>;
  };

  const denied = requireAdminKey(request, key);
  if (denied) return denied;

  const clean: Record<string, unknown> = {};
  for (const f of EDITABLE_FIELDS) {
    const v = fields?.[f];
    if (v === undefined) continue;
    if (v !== null && typeof v !== "string") continue;
    clean[f] = v;
  }
  if (typeof clean.status === "string" && !STATUSES.has(clean.status)) {
    return Response.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdminClient();

    if (action === "create") {
      if (typeof clean.name !== "string" || clean.name.length === 0) {
        return Response.json({ error: "Name is required." }, { status: 400 });
      }
      const { error } = await supabase.from("outreach_targets").insert(clean);
      if (error) return Response.json({ error: error.message }, { status: 500 });
      return Response.json({ ok: true });
    }

    if (action === "update") {
      if (typeof id !== "string") {
        return Response.json({ error: "Missing id." }, { status: 400 });
      }
      clean.updated_at = new Date().toISOString();
      const { error } = await supabase.from("outreach_targets").update(clean).eq("id", id);
      if (error) return Response.json({ error: error.message }, { status: 500 });
      return Response.json({ ok: true });
    }

    return Response.json({ error: "Invalid action." }, { status: 400 });
  } catch (err) {
    console.error("outreach route error:", err);
    return Response.json({ error: "Request failed." }, { status: 500 });
  }
}
