import { getSupabaseServerClient } from "@/lib/supabase";

// Basic RFC-5322-ish email check — good enough for a signup form.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, source } = (body ?? {}) as {
    email?: unknown;
    source?: unknown;
  };

  const trimmed = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!trimmed || trimmed.length > 254 || !EMAIL_RE.test(trimmed)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("waitlist").insert({
      email: trimmed,
      source: typeof source === "string" ? source.slice(0, 64) : null,
    });

    if (error) {
      // 23505 = unique_violation → already signed up. Treat as success so the
      // user still sees the happy path.
      if (error.code === "23505") {
        return Response.json({ ok: true, alreadyJoined: true });
      }
      console.error("waitlist insert failed:", error);
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("waitlist route error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
