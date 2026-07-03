"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import { WordReveal } from "@/components/ui/word-reveal";

const testimonials = [
  {
    quote:
      "I've been editing manuscripts by hand for twenty years. Caret is the first tool that actually gets what I'm doing when I mark up a page.",
    name: "Sarah M.",
    role: "Senior Book Editor",
    avatarColor: "#E63027",
    accentBg: "bg-pen-soft",
    accentBorder: "border-pen/15",
  },
  {
    quote:
      "Contract review used to mean printing, marking, retyping. Now I mark up the iPad screen and hand back a clean docx in minutes.",
    name: "James K.",
    role: "Corporate Lawyer",
    avatarColor: "#1F8A70",
    accentBg: "bg-teal/10",
    accentBorder: "border-teal/20",
  },
  {
    quote:
      "As a grad student with hundreds of pages to annotate, this is the tool I didn't know I desperately needed. The AI understands caret inserts perfectly.",
    name: "Priya R.",
    role: "PhD Candidate, Literature",
    avatarColor: "#8B5CF6",
    accentBg: "bg-[#F5F3FF]",
    accentBorder: "border-[#DDD6FE]",
  },
  {
    quote:
      "My editors send me marked-up PDFs. Now I just pull them into Caret and the changes apply themselves. Absolutely wild.",
    name: "Tom W.",
    role: "Freelance Journalist",
    avatarColor: "#3B82F6",
    accentBg: "bg-[#EFF6FF]",
    accentBorder: "border-[#BFDBFE]",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4" aria-label="5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 md:py-24 bg-paper paper-texture" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-widest font-body text-ink-muted font-semibold mb-3">
            Early access feedback
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            <WordReveal text="Why pen people love it." />
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.09 }}
            >
            <TiltCard maxTilt={6} scale={1.01}>
            <div className={`rounded-2xl p-7 border h-full ${t.accentBg} ${t.accentBorder}`}>
              <Stars />

              <p className="font-display text-lg italic text-ink leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-display font-bold text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.avatarColor} 0%, ${t.avatarColor}cc 100%)`,
                    boxShadow: `0 2px 8px ${t.avatarColor}30`,
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-body font-semibold text-ink text-sm">{t.name}</p>
                  <p className="font-body text-xs text-ink-muted mt-0.5">{t.role}</p>
                </div>

                {/* Verified badge */}
                <div className="ml-auto flex items-center gap-1 text-[10px] font-body text-ink-muted/60 bg-black/4 rounded-full px-2 py-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Verified
                </div>
              </div>
            </div>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
