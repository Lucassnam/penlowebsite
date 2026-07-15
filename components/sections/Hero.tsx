"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LiquidEffect } from "@/components/ui/liquid-effect";
import { TahoeButton } from "@/components/ui/tahoe-button";
import { PenMark } from "@/components/pen/PenMark";
import { IpadMock } from "@/components/pen/IpadMock";
import { WordReveal } from "@/components/ui/word-reveal";
import { Magnetic } from "@/components/ui/magnetic";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const iPadY = useTransform(scrollY, [0, 600], [0, -80]);
  const textY = useTransform(scrollY, [0, 600], [0, 40]);
  const opacityOut = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <LiquidEffect className="min-h-screen flex flex-col" ref={containerRef}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16 md:pt-32 md:pb-20 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* ── Text column ──────────────────── */}
          <motion.div style={{ y: textY, opacity: opacityOut }}>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.05] tracking-tight mb-6">
              <span className="block">
                <WordReveal text="All the benefits of" delay={0.1} />
                <span className="relative inline-block">
                  <WordReveal text="paper." delay={0.3} />
                  <PenMark
                    variant="underline"
                    className="bottom-[-6px] left-0 w-full"
                    delay={1.0}
                  />
                </span>
              </span>
              <span className="text-white/50">
                <WordReveal text="None of the friction." delay={0.5} />
              </span>
            </h1>

            {/* Subheading */}
            <motion.p
              className="font-body text-lg text-white/50 max-w-[420px] leading-relaxed mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
            >
              Caret is{" "}
              <span className="text-white/80 font-medium">red-pen editing without the retyping</span>.
              Mark up any document with your Apple Pencil exactly like you would
              on paper. Caret reads your marks and writes them straight into
              the original file.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6, ease: "easeOut" }}
            >
              <Magnetic strength={0.25}>
                <TahoeButton href="#waitlist" variant="pen" size="lg" dataTrack="cta-hero">
                  Get early access
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </TahoeButton>
              </Magnetic>

              <Magnetic strength={0.2}>
                <TahoeButton href="#how-it-works" variant="dark" size="lg">
                  See how it works
                </TahoeButton>
              </Magnetic>
            </motion.div>

            {/* Social trust strip */}
            <motion.div
              className="flex items-center gap-3 text-white/45 text-xs font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 12l2 2 4-4" stroke="#E63027" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="#E63027" strokeWidth="2"/>
              </svg>
              <span>Built for editors, lawyers &amp; writers</span>
            </motion.div>
          </motion.div>

          {/* ── iPad column (parallax) ─────── */}
          <motion.div
            className="flex justify-center relative"
            style={{ y: iPadY }}
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 75% 60% at 50% 55%, rgba(230,48,39,0.14) 0%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />

            <div className="relative float-anim">
              <IpadMock className="w-72 md:w-96" showPencil>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/app-annotation.png"
                  alt="Caret showing a document marked up with red Apple Pencil strokes"
                  className="w-full h-full object-cover object-top"
                  style={{ display: "block" }}
                />
              </IpadMock>

              {/* Floating AI chip */}
              <motion.div
                className="absolute -bottom-4 -right-4 md:bottom-6 md:-right-14 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl"
                style={{ background: "rgba(10,10,16,0.92)" }}
                initial={{ opacity: 0, x: 24, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.3, duration: 0.7, ease: "easeOut" }}
              >
                <div className="w-7 h-7 rounded-xl bg-pen/15 border border-pen/25 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" fill="#E63027"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-body font-semibold text-white leading-none">AI read 6 marks</p>
                  <p className="text-[9px] font-body text-white/40 mt-0.5 leading-none">edits ready to apply</p>
                </div>
                <div
                  className="w-1.5 h-1.5 rounded-full bg-green-400 ml-1"
                  style={{ boxShadow: "0 0 6px rgba(74,222,128,0.9)" }}
                />
              </motion.div>

              {/* Floating mark legend */}
              <motion.div
                className="absolute -top-4 -left-4 md:top-8 md:-left-16 px-3 py-2.5 rounded-xl border border-white/8 backdrop-blur-xl"
                style={{ background: "rgba(10,10,16,0.88)" }}
                initial={{ opacity: 0, x: -20, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.5, duration: 0.7, ease: "easeOut" }}
              >
                <p className="text-[8px] font-body text-white/35 uppercase tracking-wider mb-1.5">Red marks</p>
                {[["——", "Delete word"], ["^", "Insert text"], [".", "Add period"]].map(([sym, label]) => (
                  <div key={label} className="flex items-center gap-2 mb-1">
                    <span className="font-body text-pen text-xs font-bold w-4 text-center">{sym}</span>
                    <span className="text-[9px] font-body text-white/50">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        style={{ opacity: opacityOut }}
      >
        <span className="text-white/20 text-[9px] font-body tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/0 to-white/20" />
      </motion.div>
    </LiquidEffect>
  );
}
