"use client";

import { useState } from "react";

export type OutreachRow = {
  id: string;
  name: string;
  tier: string;
  contact: string | null;
  email: string | null;
  status: string;
  draft_subject: string | null;
  draft_body: string | null;
  notes: string | null;
  sent_at: string | null;
  follow_up_at: string | null;
};

const STATUSES = ["research", "drafted", "sent", "followed_up", "replied", "won", "passed"];
const FOLLOW_UP_DAYS = 4;

function mailtoHref(row: OutreachRow): string | null {
  if (!row.email) return null;
  const subject = encodeURIComponent(row.draft_subject ?? "");
  const body = encodeURIComponent(row.draft_body ?? "");
  return `mailto:${row.email}?subject=${subject}&body=${body}`;
}

function gmailHref(row: OutreachRow): string | null {
  if (!row.email) return null;
  const to = encodeURIComponent(row.email);
  const subject = encodeURIComponent(row.draft_subject ?? "");
  const body = encodeURIComponent(row.draft_body ?? "");
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
}

export function OutreachPanel({ rows }: { rows: OutreachRow[] }) {
  const [items, setItems] = useState(rows);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function update(id: string, fields: Partial<OutreachRow>) {
    setBusy(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", id, fields }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Update failed.");
      setItems((prev) => prev.map((r) => (r.id === id ? { ...r, ...fields } : r)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed.");
    } finally {
      setBusy(null);
    }
  }

  function setStatus(row: OutreachRow, status: string) {
    const fields: Partial<OutreachRow> = { status };
    if (status === "sent" && !row.sent_at) {
      const now = new Date();
      fields.sent_at = now.toISOString();
      fields.follow_up_at = new Date(
        now.getTime() + FOLLOW_UP_DAYS * 24 * 60 * 60 * 1000,
      ).toISOString();
    }
    update(row.id, fields);
  }

  async function copyDraft(row: OutreachRow) {
    const text = `Subject: ${row.draft_subject ?? ""}\n\n${row.draft_body ?? row.notes ?? ""}`;
    await navigator.clipboard.writeText(text);
    setCopied(row.id);
    setTimeout(() => setCopied(null), 1500);
  }

  const now = Date.now();

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden mb-10 overflow-x-auto">
      {error && (
        <p className="px-4 py-2 font-body text-xs text-[#FF6B5B] bg-white/5">{error}</p>
      )}
      <table className="w-full text-left font-body text-sm">
        <thead className="bg-white/5 text-white/50 text-xs">
          <tr>
            {["Target", "Tier", "Status", "Follow-up", "Draft", "Contact"].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-white/40 text-center">
                No targets yet. Run docs/supabase-marketing-setup.sql to seed the researched list.
              </td>
            </tr>
          ) : (
            items.map((row) => {
              const followUpDue =
                row.follow_up_at &&
                new Date(row.follow_up_at).getTime() < now &&
                (row.status === "sent" || row.status === "followed_up");
              const mailto = mailtoHref(row);
              const gmail = gmailHref(row);
              return (
                <tr key={row.id} className={`border-t border-white/5 align-top ${followUpDue ? "bg-[#E63027]/10" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="text-white/90 font-semibold">{row.name}</p>
                    <input
                      type="email"
                      defaultValue={row.email ?? ""}
                      placeholder="paste their email"
                      onBlur={(e) => {
                        const v = e.target.value.trim();
                        if (v !== (row.email ?? "")) update(row.id, { email: v || null });
                      }}
                      className="mt-1 w-48 bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                    />
                    {row.notes && <p className="text-white/40 text-xs mt-1 max-w-xs">{row.notes}</p>}
                  </td>
                  <td className="px-4 py-3 text-white/60">{row.tier}</td>
                  <td className="px-4 py-3">
                    <select
                      value={row.status}
                      disabled={busy === row.id}
                      onChange={(e) => setStatus(row, e.target.value)}
                      className="bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-[#0A0A10]">{s.replace("_", " ")}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap">
                    {followUpDue ? (
                      <span className="text-[#FF6B5B] font-semibold">due {row.follow_up_at!.slice(0, 10)}</span>
                    ) : (
                      <span className="text-white/40">{row.follow_up_at ? row.follow_up_at.slice(0, 10) : "—"}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => copyDraft(row)}
                      className="text-xs rounded-lg border border-white/15 px-2 py-1 hover:bg-white/10 transition-colors"
                    >
                      {copied === row.id ? "copied" : "copy draft"}
                    </button>
                    {gmail && (
                      <a
                        href={gmail}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-xs rounded-lg border border-white/15 px-2 py-1 hover:bg-white/10 transition-colors inline-block"
                      >
                        Gmail
                      </a>
                    )}
                    {mailto && (
                      <a
                        href={mailto}
                        className="ml-2 text-xs rounded-lg border border-white/15 px-2 py-1 hover:bg-white/10 transition-colors inline-block"
                      >
                        Mail
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/50 text-xs max-w-[16rem]">{row.contact ?? "—"}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
