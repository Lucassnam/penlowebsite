import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Caret",
  description: "How Caret handles your documents and data.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-[#999] font-sans mb-12">Last updated: June 30, 2026</p>

        <div className="prose prose-sm max-w-none" style={{ color: "#333", lineHeight: "1.8" }}>
          <Section title="Overview">
            <p>
              Caret is an iPad app that reads your handwritten Apple Pencil marks on Word documents
              and applies them as tracked changes. This policy explains what data leaves your device
              and why.
            </p>
          </Section>

          <Section title="What we process">
            <p>
              When you tap Convert in Caret, two things happen:
            </p>
            <ol style={{ paddingLeft: "1.25rem", marginTop: "0.75rem", marginBottom: "0.75rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Document conversion.</strong> Your .docx file is sent to{" "}
                <strong>CloudConvert</strong> (cloudconvert.com) to be rendered as a PDF so Caret can
                display it. CloudConvert processes the file on their servers and returns the PDF.
                CloudConvert&apos;s own privacy policy governs that processing.
              </li>
              <li>
                <strong>Mark recognition.</strong> An image of the annotated PDF page is sent to{" "}
                <strong>Google Gemini</strong> (via Google&apos;s AI API) so the AI can read your
                red pen marks and identify what changes to make. Google&apos;s AI API usage policy
                governs that processing.
              </li>
            </ol>
            <p>
              Both transfers use encrypted HTTPS connections. Neither CloudConvert nor Google stores
              your document or uses it to train their models under their standard API terms.
            </p>
          </Section>

          <Section title="What we do not do">
            <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
              {[
                "We do not store your documents on any Caret server.",
                "We do not collect your name, email, or account information unless you join the waitlist.",
                "We do not sell your data to third parties.",
                "We do not use your documents to train any AI model.",
                "We do not retain a copy of anything you send to CloudConvert or Gemini.",
              ].map((item) => (
                <li key={item} style={{ marginBottom: "0.4rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Waitlist">
            <p>
              If you join the waitlist, we collect your email address so we can notify you when Caret
              launches. We will not send marketing emails unrelated to Caret. You can ask us to remove
              your email at any time by emailing{" "}
              <a href="mailto:hello@caret.app" style={{ color: "#E63027", textDecoration: "underline" }}>
                hello@caret.app
              </a>
              .
            </p>
          </Section>

          <Section title="Third-party services">
            <p>Caret currently relies on the following external services:</p>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.75rem", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e5e5e5", textAlign: "left" }}>
                  <th style={{ paddingBottom: "0.5rem", paddingRight: "1rem", fontWeight: 600 }}>Service</th>
                  <th style={{ paddingBottom: "0.5rem", paddingRight: "1rem", fontWeight: 600 }}>Purpose</th>
                  <th style={{ paddingBottom: "0.5rem", fontWeight: 600 }}>Data sent</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["CloudConvert", ".docx to PDF rendering", "Your .docx file"],
                  ["Google Gemini", "Red mark recognition", "Image of annotated page"],
                ].map(([service, purpose, data]) => (
                  <tr key={service} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "0.5rem 1rem 0.5rem 0", fontWeight: 500 }}>{service}</td>
                    <td style={{ padding: "0.5rem 1rem 0.5rem 0", color: "#555" }}>{purpose}</td>
                    <td style={{ padding: "0.5rem 0", color: "#555" }}>{data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Your rights">
            <p>
              Depending on where you live, you may have the right to access, correct, or delete
              personal information we hold about you. To make such a request, email us at{" "}
              <a href="mailto:hello@caret.app" style={{ color: "#E63027", textDecoration: "underline" }}>
                hello@caret.app
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we make material changes to how we handle your data, we will update this page and
              change the date at the top. Continued use of Caret after changes are posted constitutes
              acceptance of the revised policy.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy?{" "}
              <a href="mailto:hello@caret.app" style={{ color: "#E63027", textDecoration: "underline" }}>
                hello@caret.app
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
