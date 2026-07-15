import Link from "next/link";

export const metadata = {
  title: "Terms of Service · Caret",
  description: "The terms that govern your use of the Caret website and waitlist.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal nav */}
      <header className="border-b border-black/6 px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display font-bold text-xl text-[#111] hover:opacity-70 transition-opacity"
        >
          Caret<span style={{ color: "#E63027" }}>.</span>
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-xs font-sans text-[#999] uppercase tracking-widest font-semibold mb-4">
          Legal
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#111] mb-2 leading-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-[#999] font-sans mb-12">Last updated: July 14, 2026</p>

        <div className="prose prose-sm max-w-none" style={{ color: "#333", lineHeight: "1.8" }}>
          <Section title="Agreement">
            <p>
              These terms govern your use of the Caret website (usecaret.app) and waitlist. By
              using the site or joining the waitlist, you agree to them. The Caret iPad app is
              not yet released; when it launches, its use will be governed by separate terms
              presented in the app.
            </p>
          </Section>

          <Section title="The service today">
            <p>
              This site describes Caret, an upcoming iPad app, and lets you join a waitlist to
              be notified at launch. Caret is pre-release software: features, availability
              dates, and pricing described on this site may change before launch.
            </p>
          </Section>

          <Section title="Waitlist and launch discount">
            <p>
              Joining the waitlist costs nothing and creates no obligation for you or for us.
              The advertised launch discount for waitlist members will be honored for a limited
              window after launch, communicated by email. You can leave the waitlist at any
              time by emailing{" "}
              <a href="mailto:hello@usecaret.app" style={{ color: "#E63027", textDecoration: "underline" }}>
                hello@usecaret.app
              </a>
              .
            </p>
          </Section>

          <Section title="Acceptable use">
            <p>
              Don&apos;t attempt to disrupt the site, probe or overload its infrastructure,
              submit email addresses you don&apos;t control, or scrape the site for bulk data
              collection.
            </p>
          </Section>

          <Section title="Intellectual property">
            <p>
              The Caret name, logo, and all content on this site belong to us. You may not use
              them without written permission, except to link to or accurately describe the
              product.
            </p>
          </Section>

          <Section title="Disclaimers">
            <p>
              The site is provided &ldquo;as is&rdquo; without warranties of any kind. To the
              maximum extent permitted by law, we are not liable for any indirect, incidental,
              or consequential damages arising from your use of the site or reliance on
              pre-release product descriptions.
            </p>
          </Section>

          <Section title="Privacy">
            <p>
              How we handle your data is described in our{" "}
              <Link href="/privacy" style={{ color: "#E63027", textDecoration: "underline" }}>
                Privacy Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="Changes to these terms">
            <p>
              If we make material changes, we will update this page and change the date at the
              top. Continued use of the site after changes are posted constitutes acceptance of
              the revised terms.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms?{" "}
              <a href="mailto:hello@usecaret.app" style={{ color: "#E63027", textDecoration: "underline" }}>
                hello@usecaret.app
              </a>
            </p>
          </Section>
        </div>
      </main>

      <footer className="border-t border-black/6 px-6 py-6 text-center">
        <p className="text-xs text-[#aaa] font-sans">
          &copy; 2026 Caret. All rights reserved.{" "}
          <Link href="/" className="underline hover:text-[#111] transition-colors">
            Back to home
          </Link>
        </p>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "#111",
          marginBottom: "0.75rem",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid #f0f0f0",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: "0.9rem", color: "#444", lineHeight: "1.8" }}>{children}</div>
    </section>
  );
}
