import { getSupabaseServerClient } from "@/lib/supabase";
import { getVisitorHash } from "@/lib/visitor";
import { normalizeEmail } from "@/lib/email";


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

  const trimmed = normalizeEmail(email);

  if (!trimmed) {
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

    // Analytics: record the conversion. Must never block or fail the signup.
    try {
      const { error: eventError } = await supabase.from("events").insert({
        type: "signup",
        path: typeof source === "string" ? source.slice(0, 64) : null,
        visitor_hash: getVisitorHash(request),
      });
      if (eventError) console.error("signup event insert failed:", eventError);
    } catch (err) {
      console.error("signup event insert failed:", err);
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
