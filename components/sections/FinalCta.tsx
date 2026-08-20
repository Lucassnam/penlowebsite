"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PaperShaderBackground } from "@/components/ui/paper-shader-background";
import { Magnetic } from "@/components/ui/magnetic";
import { WordReveal } from "@/components/ui/word-reveal";

function Particle({ x, y, color }: { x: number; y: number; color: string }) {
  const angle = Math.random() * Math.PI * 2;
  const distance = 60 + Math.random() * 120;
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance - 60;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9990] rounded-full"
      style={{
        left: x,
        top: y,
        width: 6 + Math.random() * 6,
        height: 6 + Math.random() * 6,
        background: color,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
      transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
    />
  );
}

const PARTICLE_COLORS = ["#FFFFFF", "#FFD9A0", "#FFF3E0", "#1A1A1A"];

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const btnRef = useRef<HTMLFormElement>(null);

  const burstParticles = () => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setParticles(
      Array.from({ length: 24 }, (_, i) => ({
        id: Date.now() + i,
        x: cx,
        y: cy,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      }))
    );
    setTimeout(() => setParticles([]), 1400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      burstParticles();
      setTimeout(() => setSubmitted(true), 200);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      ref={ref}
      className="relative isolate overflow-hidden py-28 md:py-40"
    >
      <PaperShaderBackground />

      {particles.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
      ))}

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-5 pb-2 font-heading text-5xl md:text-7xl font-bold leading-[1.02] tracking-[-0.035em] text-white">
            <WordReveal text="Stop retyping" className="block" />
            <span className="block pb-2">
              <WordReveal text="your edits." delay={0.2} />
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-md font-body text-lg leading-relaxed text-white/75">
            Caret is launching on the App Store soon. Join the waitlist for early
            access and a 40% launch discount.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-3"
              >
                <div className="inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/12 px-6 py-4 backdrop-blur-xl">
                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <div className="text-left">
                    <p className="font-body text-sm font-semibold text-white">You&apos;re on the list!</p>
                    <p className="font-body text-xs text-white/70">We&apos;ll email you before launch with your 40% discount.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={btnRef}
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="flex-1 rounded-full border border-white/30 bg-white/12 px-5 py-3.5 font-body text-sm text-white backdrop-blur-xl transition-all placeholder:text-white/55 focus:border-white/70 focus:bg-white/20 focus:outline-none disabled:opacity-60"
                />
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    data-track="cta-waitlist-submit"
                    disabled={loading}
                    className="group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-black transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Joining…" : "Join the waitlist"}
                    {!loading && (
                      <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>

          {error && !submitted && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="mt-4 font-body text-sm font-medium text-white"
            >
              {error}
            </motion.p>
          )}

          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="font-body text-xs text-white/70">No spam, ever. Unsubscribe any time.</p>
            <div className="flex items-center gap-4 font-body text-[10px] text-white/65">
              {["40% launch discount", "First in line", "Cancel anytime"].map((text) => (
                <span key={text} className="flex items-center gap-1">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
