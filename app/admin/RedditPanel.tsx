"use client";

import { useState } from "react";

export type RedditRow = {
  id: string;
  subreddit: string;
  title: string;
  url: string | null;
  src_tag: string | null;
  posted_at: string | null;
  score: number | null;
  num_comments: number | null;
  views: number | null;
  last_refreshed: string | null;
  // Joined server-side from events/waitlist by src_tag:
  clicks: number;
  signups: number;
};

const EMPTY_FORM = { subreddit: "", title: "", url: "", src_tag: "" };

export function RedditPanel({ rows }: { rows: RedditRow[] }) {
  const [items, setItems] = useState(rows);
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function call(payload: Record<string, unknown>): Promise<Record<string, unknown> | null> {
    setError(null);
    try {
      const res = await fetch("/api/admin/reddit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed.");
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed.");
      return null;
    }
  }

  async function addPost() {
    if (!form.subreddit || !form.title) {
      setError("Subreddit and title are required.");
      return;
    }
    setBusy("create");
    const ok = await call({
      action: "create",
      fields: { ...form, posted_at: new Date().toISOString() },
    });
    setBusy(null);
    if (ok) {
      setForm(EMPTY_FORM);
      // Server-generated id arrives on refresh; reload keeps this simple.
      window.location.reload();
    }
  }

  async function refresh(id: string) {
    setBusy(id);
    const data = await call({ action: "refresh", id });
    setBusy(null);
    if (data && typeof data.score === "number" && typeof data.num_comments === "number") {
      setItems((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, score: data.score as number, num_comments: data.num_comments as number }
            : r,
        ),
      );
    }
  }

  async function saveViews(id: string, raw: string) {
    const views = parseInt(raw, 10);
    if (Number.isNaN(views)) return;
    const ok = await call({ action: "set_views", id, views });
    if (ok) setItems((prev) => prev.map((r) => (r.id === id ? { ...r, views } : r)));
  }

  return (
    <div className="mb-10">
      {error && (
        <p className="px-1 pb-2 font-body text-xs text-[#FF6B5B]">{error}</p>
      )}
      <div className="rounded-2xl border border-white/10 overflow-hidden overflow-x-auto mb-3">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-white/5 text-white/50 text-xs">
            <tr>
              {["Post", "Score", "Comments", "Views (manual)", "Clicks", "Signups", ""].map((h, i) => (
                <th key={i} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-white/40 text-center">
                  No posts tracked yet. Add one below after posting.
                </td>
              </tr>
            ) : (
              items.map((r) => (
                <tr key={r.id} className="border-t border-white/5 align-top">
                  <td className="px-4 py-3 max-w-sm">
                    <p className="text-white/90">
                      <span className="text-white/50">r/{r.subreddit}</span>{" "}
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                          {r.title}
                        </a>
                      ) : (
                        r.title
                      )}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      {r.posted_at ? r.posted_at.slice(0, 10) : "not posted"}
                      {r.src_tag ? ` · src=${r.src_tag}` : ""}
                      {r.last_refreshed ? ` · refreshed ${r.last_refreshed.slice(0, 16).replace("T", " ")}` : ""}
                    </p>
                  </td>
                  <td className="px-4 py-3">{r.score ?? "—"}</td>
                  <td className="px-4 py-3">{r.num_comments ?? "—"}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      defaultValue={r.views ?? ""}
                      onBlur={(e) => saveViews(r.id, e.target.value)}
                      placeholder="from app"
                      className="w-24 bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                    />
                  </td>
                  <td className="px-4 py-3">{r.clicks}</td>
                  <td className="px-4 py-3 text-[#FF6B5B] font-semibold">{r.signups}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => refresh(r.id)}
                      disabled={busy === r.id || !r.url}
                      className="text-xs rounded-lg border border-white/15 px-2 py-1 hover:bg-white/10 transition-colors disabled:opacity-40"
                    >
                      {busy === r.id ? "…" : "refresh"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["subreddit", "subreddit (no r/)"],
            ["title", "post title"],
            ["url", "post URL"],
            ["src_tag", "src tag, e.g. reddit-ipadpro"],
          ] as const
        ).map(([field, placeholder]) => (
          <input
            key={field}
            value={form[field]}
            onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
            placeholder={placeholder}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-body flex-1 min-w-[10rem]"
          />
        ))}
        <button
          onClick={addPost}
          disabled={busy === "create"}
          className="text-xs font-body rounded-lg border border-white/15 px-4 py-2 hover:bg-white/10 transition-colors disabled:opacity-40"
        >
          {busy === "create" ? "adding…" : "add post"}
        </button>
      </div>
    </div>
  );
}
