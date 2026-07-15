import { getSupabaseServerClient } from "@/lib/supabase";
import { getVisitorHash } from "@/lib/visitor";

// Basic RFC-5322-ish email check — same as the waitlist route.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, role, useCase } = (body ?? {}) as {
    email?: unknown;
    role?: unknown;
    useCase?: unknown;
  };

  const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const trimmedRole = typeof role === "string" ? role.trim() : "";
  const trimmedUseCase = typeof useCase === "string" ? useCase.trim() : "";

  if (!trimmedEmail || trimmedEmail.length > 254 || !EMAIL_RE.test(trimmedEmail)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (!trimmedRole || trimmedRole.length > 64) {
    return Response.json({ error: "Please pick a role." }, { status: 400 });
  }
  if (!trimmedUseCase || trimmedUseCase.length > 1000) {
    return Response.json(
      { error: "Tell us briefly what you'd use Caret for." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("tester_applications").insert({
      email: trimmedEmail,
      role: trimmedRole,
      use_case: trimmedUseCase,
    });

    if (error) {
      // 23505 = unique_violation → already applied. Treat as success.
      if (error.code === "23505") {
        return Response.json({ ok: true, alreadyApplied: true });
      }
      console.error("application insert failed:", error);
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }

    // Analytics: record the conversion. Must never block or fail the application.
    try {
      const { error: eventError } = await supabase.from("events").insert({
        type: "application",
        path: trimmedRole.slice(0, 64),
        visitor_hash: getVisitorHash(request),
      });
      if (eventError) console.error("application event insert failed:", eventError);
    } catch (err) {
      console.error("application event insert failed:", err);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("apply route error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
