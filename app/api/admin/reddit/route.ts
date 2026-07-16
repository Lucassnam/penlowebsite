import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { requireAdminKey } from "@/lib/admin-auth";

const EDITABLE_FIELDS = [
  "subreddit",
  "title",
  "url",
  "src_tag",
  "posted_at",
  "notes",
] as const;

/** Fetch public score/comments for a reddit post via its .json endpoint. */
async function fetchRedditStats(
  postUrl: string,
): Promise<{ score: number; num_comments: number } | { error: string }> {
  let jsonUrl: string;
  try {
    const u = new URL(postUrl);
    if (!/(^|\.)reddit\.com$/.test(u.hostname)) return { error: "Not a reddit.com URL." };
    u.search = "";
    jsonUrl = `${u.origin}${u.pathname.replace(/\/$/, "")}.json`;
  } catch {
    return { error: "Invalid URL." };
  }

  try {
    const res = await fetch(jsonUrl, {
      headers: { "User-Agent": "caret-admin-dashboard/1.0 (by usecaret.app)" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { error: `Reddit responded ${res.status}. Enter stats manually.` };
    const data = (await res.json()) as unknown;
    const post = Array.isArray(data)
      ? (data[0] as { data?: { children?: { data?: { score?: number; num_comments?: number } }[] } })
          ?.data?.children?.[0]?.data
      : undefined;
    if (typeof post?.score !== "number" || typeof post?.num_comments !== "number") {
      return { error: "Unexpected response shape. Enter stats manually." };
    }
    return { score: post.score, num_comments: post.num_comments };
  } catch {
    return { error: "Fetch failed (timeout or blocked). Enter stats manually." };
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { key, action, id, fields, views } = (body ?? {}) as {
    key?: unknown;
    action?: unknown;
    id?: unknown;
    fields?: Record<string, unknown>;
    views?: unknown;
  };

  const denied = requireAdminKey(request, key);
  if (denied) return denied;

  try {
    const supabase = getSupabaseAdminClient();

    if (action === "create") {
      const clean: Record<string, unknown> = {};
      for (const f of EDITABLE_FIELDS) {
        const v = fields?.[f];
        if (typeof v === "string" && v.length > 0) clean[f] = v;
      }
      if (!clean.subreddit || !clean.title) {
        return Response.json({ error: "Subreddit and title are required." }, { status: 400 });
      }
      const { error } = await supabase.from("reddit_posts").insert(clean);
      if (error) return Response.json({ error: error.message }, { status: 500 });
      return Response.json({ ok: true });
    }

    if (typeof id !== "string") {
      return Response.json({ error: "Missing id." }, { status: 400 });
    }

    if (action === "set_views") {
      const n = typeof views === "number" && Number.isFinite(views) ? Math.max(0, Math.floor(views)) : null;
      if (n === null) return Response.json({ error: "views must be a number." }, { status: 400 });
      const { error } = await supabase.from("reddit_posts").update({ views: n }).eq("id", id);
      if (error) return Response.json({ error: error.message }, { status: 500 });
      return Response.json({ ok: true });
    }

    if (action === "refresh") {
      const { data: row, error: readErr } = await supabase
        .from("reddit_posts")
        .select("url")
        .eq("id", id)
        .single();
      if (readErr || typeof row?.url !== "string" || row.url.length === 0) {
        return Response.json({ error: "Post has no URL to refresh from." }, { status: 400 });
      }
      const stats = await fetchRedditStats(row.url);
      if ("error" in stats) return Response.json({ error: stats.error }, { status: 502 });
      const { error } = await supabase
        .from("reddit_posts")
        .update({ ...stats, last_refreshed: new Date().toISOString() })
        .eq("id", id);
      if (error) return Response.json({ error: error.message }, { status: 500 });
      return Response.json({ ok: true, ...stats });
    }

    return Response.json({ error: "Invalid action." }, { status: 400 });
  } catch (err) {
    console.error("reddit route error:", err);
    return Response.json({ error: "Request failed." }, { status: 500 });
  }
}
