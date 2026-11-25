import { NextResponse } from "next/server";

// Daily Vercel Cron target (see vercel.json). Makes one real, read-only request to the
// Caret Supabase project so the free-tier project is not paused for inactivity.
//
// Env vars (both optional):
//   CARET_SUPABASE_ANON_KEY  Caret app's PUBLISHABLE key. Public by design (it ships in the
//                            iPad app); never put a service-role key here.
//   CRON_SECRET              If set, Vercel Cron sends it as `Authorization: Bearer <secret>`
//                            and this route rejects any other caller.

export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://haoxmfzdvxdhnifpvzfi.supabase.co";
// Documented fallback: the same publishable key as penlov2 AppConfig.supabasePublishableKey.
const FALLBACK_PUBLISHABLE_KEY = "sb_publishable_6WYS1jxumUPcqhpoWfn-Ag_Um-H8_7x";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const key = process.env.CARET_SUPABASE_ANON_KEY || FALLBACK_PUBLISHABLE_KEY;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    // 200 = RLS returned rows (or []). Caret's anon role has no grant on `profiles`, so
    // Postgres answers 401 with code 42501 ("permission denied"): that is still a real
    // database round trip, which is all the keep-alive needs.
    let code: string | undefined;
    if (!res.ok) {
      code = ((await res.json().catch(() => null)) as { code?: string } | null)?.code;
    }
    const alive = res.ok || code === "42501";
    return NextResponse.json({ ok: alive }, { status: alive ? 200 : 500 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
