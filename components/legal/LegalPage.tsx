import Link from "next/link";

export const LINK_STYLE = { color: "#E63027", textDecoration: "underline" } as const;

export function Mail() {
  return (
    <a href="mailto:hello@usecaret.app" style={LINK_STYLE}>
      hello@usecaret.app
    </a>
  );
}

export function LegalPage({
  eyebrow = "Legal",
  title,
  meta,
  children,
}: {
  eyebrow?: string;
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
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
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#111] mb-2 leading-tight">{title}</h1>
        <p className="text-sm text-[#999] font-sans mb-12">{meta}</p>

        <div className="prose prose-sm max-w-none" style={{ color: "#333", lineHeight: "1.8" }}>
          {children}
        </div>
      </main>

      <footer className="border-t border-black/6 px-6 py-6 text-center">
        <p className="text-xs text-[#aaa] font-sans">
          &copy; 2026 Caret.{" "}
          <Link href="/privacy" className="underline hover:text-[#111] transition-colors">
            Privacy
          </Link>{" "}
          &middot;{" "}
          <Link href="/terms" className="underline hover:text-[#111] transition-colors">
            Terms
          </Link>{" "}
          &middot;{" "}
          <Link href="/support" className="underline hover:text-[#111] transition-colors">
            Support
          </Link>{" "}
          &middot;{" "}
          <Link href="/" className="underline hover:text-[#111] transition-colors">
            Home
          </Link>
        </p>
      </footer>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
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

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", listStyle: "disc" }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: "0.4rem" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}
