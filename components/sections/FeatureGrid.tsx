"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { PixelCorner } from "@/components/ui/pixel-corner";

type Feature = { icon: ReactNode; title: string; body: string };

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

const features: Feature[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" {...stroke} />
      </svg>
    ),
    title: "Mark up like paper",
    body: "Strike a word out, caret in a phrase, circle a paragraph. The same shorthand you already use on a printout.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5" {...stroke} />
        <circle cx="12" cy="12" r="3.4" {...stroke} />
      </svg>
    ),
    title: "Read in seconds",
    body: "Lift the Pencil and Caret has already interpreted the marks. No tap to confirm, no menu to open.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" {...stroke} />
        <path d="M14 2v6h6M8 13h8M8 17h5" {...stroke} />
      </svg>
    ),
    title: "Real .docx out",
    body: "A standard Word file, not a proprietary export. It opens in Word, Google Docs and Pages exactly as expected.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M4 6h16M4 12h10M4 18h13" {...stroke} />
        <circle cx="19" cy="12" r="2" {...stroke} />
      </svg>
    ),
    title: "Formatting survives",
    body: "Styles, numbering, headers and tracked changes stay intact. Retyping is what breaks documents; Caret never retypes.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2.8l7 2.9v5.4c0 4.3-2.9 7.7-7 9-4.1-1.3-7-4.7-7-9V5.7l7-2.9z" {...stroke} />
        <path d="M9 12l2 2 4-4" {...stroke} />
      </svg>
    ),
    title: "Original untouched",
    body: "Every accepted edit lands in a fresh copy. You cannot lose work you did not approve.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M8 3h6l4 4v10a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z" {...stroke} />
        <path d="M14 3v4h4" {...stroke} />
        <path d="M4 7v12a2 2 0 002 2h9" {...stroke} />
      </svg>
    ),
    title: "Any document",
    body: "Contracts, manuscripts, theses, scripts, reports. If Word opens it, Caret marks it up.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-xs font-semibold uppercase tracking-[0.28em] text-pen">
            Features
          </p>
          <h2 className="mt-4 font-heading text-4xl md:text-5xl font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            Everything paper does.
            <br />
            <span className="text-ink-muted">None of what it costs you.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 border-t border-l border-black/[0.09] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="group relative border-b border-r border-black/[0.09] p-8 md:p-10"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hover"
              animate="rest"
            >
              <motion.span
                className="pointer-events-none absolute inset-0 bg-white"
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.3 }}
              />
              {/* hairline that draws along the top edge on hover */}
              <motion.span
                className="pointer-events-none absolute left-0 top-[-1px] h-[2px] bg-pen"
                variants={{ rest: { width: "0%" }, hover: { width: "100%" } }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              />
              <PixelCorner corner={i % 2 === 0 ? "br" : "tr"} className={i % 2 === 0 ? "mb-3 mr-3" : "mr-3 mt-3"} />

              <div className="relative">
                <motion.div
                  className="h-6 w-6 text-pen"
                  variants={{ rest: { y: 0, rotate: 0 }, hover: { y: -3, rotate: -6 } }}
                  transition={{ type: "spring", stiffness: 380, damping: 16 }}
                >
                  {f.icon}
                </motion.div>
                <h3 className="mt-6 font-body text-base font-semibold text-ink">{f.title}</h3>
                <p className="mt-2.5 font-body text-sm leading-relaxed text-ink-muted">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
