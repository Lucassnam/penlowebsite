export function Footer() {
  return (
    <footer className="bg-paper border-t border-black/6">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top row */}
        <div className="py-10 grid sm:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <a href="/" className="inline-block font-display font-bold text-ink text-xl mb-2">
              Caret<span className="text-pen">.</span>
            </a>
            <p className="font-body text-xs text-ink-muted leading-relaxed max-w-[200px]">
              Mark it up like paper.<br />Keep the document.
            </p>
            {/* App Store badge (coming soon) */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-black/8 bg-ink text-white opacity-40 cursor-not-allowed select-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="text-[8px] leading-none opacity-70">Coming soon</p>
                <p className="text-[11px] font-semibold leading-none mt-0.5">App Store</p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-body text-xs font-semibold text-ink uppercase tracking-wider mb-4">Product</p>
            <ul className="space-y-3">
              {["Features", "How it works", "FAQ", "Waitlist"].map((link) => (
                <li key={link}>
                  <a
                    href={link === "How it works" ? "#demo" : `#${link.toLowerCase()}`}
                    className="font-body text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-body text-xs font-semibold text-ink uppercase tracking-wider mb-4">Company</p>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Contact", href: "mailto:hello@usecaret.app" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-ink-muted">
            © 2026 Caret. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
