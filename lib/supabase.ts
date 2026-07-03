import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client. Reads SUPABASE_URL / SUPABASE_ANON_KEY
 * (NOT prefixed with NEXT_PUBLIC_, so they never reach the browser bundle).
 * The anon key is safe here because Row Level Security on `waitlist` allows
 * inserts only — the key cannot read, update, or delete rows.
 */
export function getSupabaseServerClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.",
    );
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
