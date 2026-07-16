import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";
import { OutreachPanel, type OutreachRow } from "./OutreachPanel";
import { RedditPanel, type RedditRow } from "./RedditPanel";

export const metadata: Metadata = {
  title: "Caret Admin",
  robots: { index: false, follow: false },
};

type EventRow = {
  type: "pageview" | "cta_click" | "signup" | "application";
  path: string | null;
  source: string | null;
  visitor_hash: string | null;
  created_at: string;
};

type ApplicationRow = {
  email: string;
  role: string;
  use_case: string;
  created_at: string;
};

type Stats = {
  uniqueVisitors: number;
  pageviews: number;
  ctaClicks: number;
  signups: number;
  waitlistTotal: number;
  applicationsTotal: number;
  recentApplications: ApplicationRow[];
  ctaBreakdown: [string, number][];
  sourceBreakdown: [string, number][];
  funnel: { source: string; visitors: number; pageviews: number; signups: number }[];
  outreach: OutreachRow[];
  reddit: RedditRow[];
  /* Null when the marketing tables exist; otherwise the setup hint to show. */
  marketingSetupHint: string | null;
  daily: {
    day: string;
    visitors: number;
    pageviews: number;
    clicks: number;
    signups: number;
  }[];
};

const DAYS_SHOWN = 14;

async function loadStats(): Promise<Stats | { error: string }> {
  try {
    const supabase = getSupabaseAdminClient();
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [eventsRes, waitlistRes, sourcesRes, applicationsRes, recentAppsRes] = await Promise.all([
      supabase
        .from("events")
        .select("type, path, source, visitor_hash, created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(50000),
      supabase.from("waitlist").select("*", { count: "exact", head: true }),
      supabase.from("waitlist").select("source").limit(10000),
      supabase.from("tester_applications").select("*", { count: "exact", head: true }),
      supabase
        .from("tester_applications")
        .select("email, role, use_case, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

    // Marketing tables are optional until docs/supabase-marketing-setup.sql
    // has been run; their absence must not break the analytics above.
    const [outreachRes, redditRes] = await Promise.all([
      supabase
        .from("outreach_targets")
        .select("id, name, tier, contact, email, status, draft_subject, draft_body, notes, sent_at, follow_up_at")
        .order("created_at", { ascending: true }),
      supabase
        .from("reddit_posts")
        .select("id, subreddit, title, url, src_tag, posted_at, score, num_comments, views, last_refreshed")
        .order("created_at", { ascending: true }),
    ]);
    const marketingSetupHint =
      outreachRes.error || redditRes.error
        ? "Marketing tables not found. Run docs/supabase-marketing-setup.sql in the Supabase SQL editor."
        : null;

    if (eventsRes.error) return { error: eventsRes.error.message };
    if (waitlistRes.error) return { error: waitlistRes.error.message };

    const events = (eventsRes.data ?? []) as EventRow[];
    const visitorHashes = new Set<string>();
    const ctaCounts = new Map<string, number>();
    const funnelMap = new Map<string, { visitors: Set<string>; pageviews: number }>();
    const dailyMap = new Map<
      string,
      { visitors: Set<string>; pageviews: number; clicks: number; signups: number }
    >();
    let pageviews = 0;
    let ctaClicks = 0;
    let signups = 0;

    for (const ev of events) {
      const day = ev.created_at.slice(0, 10);
      if (!dailyMap.has(day)) {
        dailyMap.set(day, { visitors: new Set(), pageviews: 0, clicks: 0, signups: 0 });
      }
      const d = dailyMap.get(day)!;

      if (ev.type === "pageview") {
        pageviews++;
        d.pageviews++;
        if (ev.visitor_hash) {
          visitorHashes.add(ev.visitor_hash);
          d.visitors.add(ev.visitor_hash);
        }
        if (ev.source) {
          if (!funnelMap.has(ev.source)) {
            funnelMap.set(ev.source, { visitors: new Set(), pageviews: 0 });
          }
          const f = funnelMap.get(ev.source)!;
          f.pageviews++;
          if (ev.visitor_hash) f.visitors.add(ev.visitor_hash);
        }
      } else if (ev.type === "cta_click") {
        ctaClicks++;
        d.clicks++;
        const name = ev.path ?? "unknown";
        ctaCounts.set(name, (ctaCounts.get(name) ?? 0) + 1);
      } else if (ev.type === "signup") {
        signups++;
        d.signups++;
      }
    }

    const sourceCounts = new Map<string, number>();
    for (const row of (sourcesRes.data ?? []) as { source: string | null }[]) {
      const s = row.source ?? "(none)";
      sourceCounts.set(s, (sourceCounts.get(s) ?? 0) + 1);
    }

    const daily = [...dailyMap.entries()]
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .slice(0, DAYS_SHOWN)
      .map(([day, d]) => ({
        day,
        visitors: d.visitors.size,
        pageviews: d.pageviews,
        clicks: d.clicks,
        signups: d.signups,
      }));

    // Union of sources seen in traffic and in signups, so a channel with
    // signups but no tracked visits (pre-source-column history) still shows.
    const funnelSources = new Set([
      ...funnelMap.keys(),
      ...[...sourceCounts.keys()].filter((s) => s !== "(none)"),
    ]);
    const funnel = [...funnelSources]
      .map((source) => ({
        source,
        visitors: funnelMap.get(source)?.visitors.size ?? 0,
        pageviews: funnelMap.get(source)?.pageviews ?? 0,
        signups: sourceCounts.get(source) ?? 0,
      }))
      .sort((a, b) => b.signups - a.signups || b.visitors - a.visitors);

    const reddit: RedditRow[] = (
      (redditRes.data ?? []) as Omit<RedditRow, "clicks" | "signups">[]
    ).map((r) => ({
      ...r,
      clicks: r.src_tag ? funnelMap.get(r.src_tag)?.pageviews ?? 0 : 0,
      signups: r.src_tag ? sourceCounts.get(r.src_tag) ?? 0 : 0,
    }));

    return {
      uniqueVisitors: visitorHashes.size,
      pageviews,
      ctaClicks,
      signups,
      waitlistTotal: waitlistRes.count ?? 0,
      applicationsTotal: applicationsRes.count ?? 0,
      recentApplications: (recentAppsRes.data ?? []) as ApplicationRow[],
      ctaBreakdown: [...ctaCounts.entries()].sort((a, b) => b[1] - a[1]),
      sourceBreakdown: [...sourceCounts.entries()].sort((a, b) => b[1] - a[1]),
      funnel,
      outreach: (outreachRes.data ?? []) as OutreachRow[],
      reddit,
      marketingSetupHint,
      daily,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Unknown error" };
  }
}

function pct(numerator: number, denominator: number): string {
  if (denominator === 0) return "—";
  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;

  if (!verifySessionToken(session)) {
    return <LoginForm />;
  }

  const stats = await loadStats();

  return (
    <div className="min-h-screen bg-[#0A0A10] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest font-body text-white/40 font-semibold mb-2">
            Caret admin
          </p>
          <h1 className="font-display text-3xl font-bold">Waitlist analytics</h1>
          <p className="font-body text-sm text-white/40 mt-1">Last 30 days · updates on refresh</p>
        </div>

        {"error" in stats ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-body font-semibold text-sm mb-1">Couldn&apos;t reach the database</p>
            <p className="font-body text-xs text-white/50">{stats.error}</p>
            <p className="font-body text-xs text-white/50 mt-3">
              Check SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY and that
              docs/supabase-analytics-setup.sql has been run.
            </p>
          </div>
        ) : (
          <>
            {/* Totals */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
              {[
                ["Unique visitors", stats.uniqueVisitors],
                ["Pageviews", stats.pageviews],
                ["CTA clicks", stats.ctaClicks],
                ["Signups (30d)", stats.signups],
                ["Waitlist total", stats.waitlistTotal],
                ["Applications", stats.applicationsTotal],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-display text-3xl font-bold">{value}</p>
                  <p className="font-body text-xs text-white/50 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Conversion rates */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {[
                ["Visitor → CTA click", pct(stats.ctaClicks, stats.uniqueVisitors)],
                ["Visitor → signup", pct(stats.signups, stats.uniqueVisitors)],
                ["CTA click → signup", pct(stats.signups, stats.ctaClicks)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-display text-2xl font-bold text-[#FF6B5B]">{value}</p>
                  <p className="font-body text-xs text-white/50 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Channel funnel */}
            <h2 className="font-body font-semibold text-sm text-white/70 mb-3">
              Channel funnel (visits with ?src= over 30 days, all-time signups)
            </h2>
            <div className="rounded-2xl border border-white/10 overflow-hidden mb-10 overflow-x-auto">
              <table className="w-full text-left font-body text-sm">
                <thead className="bg-white/5 text-white/50 text-xs">
                  <tr>
                    {["Source", "Visitors", "Pageviews", "Signups", "Visitor → signup"].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.funnel.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-white/40 text-center">
                        No tagged traffic yet. Share links with ?src=channel-name to populate this.
                      </td>
                    </tr>
                  ) : (
                    stats.funnel.map((f) => (
                      <tr key={f.source} className="border-t border-white/5">
                        <td className="px-4 py-3 text-white/80">{f.source}</td>
                        <td className="px-4 py-3">{f.visitors}</td>
                        <td className="px-4 py-3">{f.pageviews}</td>
                        <td className="px-4 py-3 text-[#FF6B5B] font-semibold">{f.signups}</td>
                        <td className="px-4 py-3">{pct(f.signups, f.visitors)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Marketing: outreach + reddit */}
            {stats.marketingSetupHint ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10">
                <p className="font-body font-semibold text-sm mb-1">Outreach + Reddit tracking</p>
                <p className="font-body text-xs text-white/50">{stats.marketingSetupHint}</p>
              </div>
            ) : (
              <>
                <h2 className="font-body font-semibold text-sm text-white/70 mb-3">
                  Outreach (email targets · statuses · drafts)
                </h2>
                <OutreachPanel rows={stats.outreach} />

                <h2 className="font-body font-semibold text-sm text-white/70 mb-3">
                  Reddit posts (score/comments auto · views manual from the Reddit app)
                </h2>
                <RedditPanel rows={stats.reddit} />
              </>
            )}

            {/* Daily table */}
            <h2 className="font-body font-semibold text-sm text-white/70 mb-3">
              Daily (last {DAYS_SHOWN} days with activity)
            </h2>
            <div className="rounded-2xl border border-white/10 overflow-hidden mb-10 overflow-x-auto">
              <table className="w-full text-left font-body text-sm">
                <thead className="bg-white/5 text-white/50 text-xs">
                  <tr>
                    {["Day", "Visitors", "Pageviews", "CTA clicks", "Signups"].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.daily.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-white/40 text-center">
                        No events yet. They&apos;ll appear as soon as the site gets traffic.
                      </td>
                    </tr>
                  ) : (
                    stats.daily.map((d) => (
                      <tr key={d.day} className="border-t border-white/5">
                        <td className="px-4 py-3 text-white/80">{d.day}</td>
                        <td className="px-4 py-3">{d.visitors}</td>
                        <td className="px-4 py-3">{d.pageviews}</td>
                        <td className="px-4 py-3">{d.clicks}</td>
                        <td className="px-4 py-3 text-[#FF6B5B] font-semibold">{d.signups}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Recent applications */}
            <h2 className="font-body font-semibold text-sm text-white/70 mb-3">
              Recent beta-tester applications
            </h2>
            <div className="rounded-2xl border border-white/10 overflow-hidden mb-10 overflow-x-auto">
              <table className="w-full text-left font-body text-sm">
                <thead className="bg-white/5 text-white/50 text-xs">
                  <tr>
                    {["Date", "Email", "Role", "Would use it for"].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.recentApplications.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-white/40 text-center">
                        No applications yet.
                      </td>
                    </tr>
                  ) : (
                    stats.recentApplications.map((a) => (
                      <tr key={a.email} className="border-t border-white/5 align-top">
                        <td className="px-4 py-3 text-white/60 whitespace-nowrap">{a.created_at.slice(0, 10)}</td>
                        <td className="px-4 py-3 text-white/80">{a.email}</td>
                        <td className="px-4 py-3">{a.role}</td>
                        <td className="px-4 py-3 text-white/70 max-w-md">{a.use_case}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Breakdowns */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                ["Clicks by CTA", stats.ctaBreakdown, "No CTA clicks yet."],
                ["Signups by source", stats.sourceBreakdown, "No signups yet."],
              ].map(([title, rows, empty]) => (
                <div key={title as string}>
                  <h2 className="font-body font-semibold text-sm text-white/70 mb-3">{title as string}</h2>
                  <div className="rounded-2xl border border-white/10 divide-y divide-white/5">
                    {(rows as [string, number][]).length === 0 ? (
                      <p className="px-4 py-4 font-body text-sm text-white/40">{empty as string}</p>
                    ) : (
                      (rows as [string, number][]).map(([name, count]) => (
                        <div key={name} className="px-4 py-3 flex justify-between font-body text-sm">
                          <span className="text-white/70">{name}</span>
                          <span className="font-semibold">{count}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
