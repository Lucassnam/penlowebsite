"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LiquidEffect } from "@/components/ui/liquid-effect";
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

const PARTICLE_COLORS = ["#E63027", "#FF6B5B", "#FF9B8B", "#FBFAF7"];

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
    const newParticles = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: cx,
      y: cy,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));
    setParticles(newParticles);
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
    <LiquidEffect className="py-20 md:py-32" ref={ref} id="waitlist">
      {particles.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
      ))}

      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-4 pb-2">
            <WordReveal text="Stop retyping" className="block" />
            <span className="text-pen block pb-2">
              <WordReveal text="your edits." delay={0.2} />
            </span>
          </h2>

          <p className="font-body text-lg text-white/50 mb-10 leading-relaxed">
            Caret is launching on the App Store soon.{" "}
            <span className="text-white/70">Join the waitlist</span> to get early
            access and a{" "}
            <span className="text-pen font-semibold">40% launch discount.</span>
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
                <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass-card text-white">
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)" }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 13l4 4L19 7" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <div className="text-left">
                    <p className="font-body font-semibold text-sm text-white">You&apos;re on the list!</p>
                    <p className="font-body text-xs text-white/50">We&apos;ll email you before launch with your 40% discount.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={btnRef}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
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
                  className="flex-1 px-5 py-3.5 rounded-2xl font-body text-sm bg-white/8 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-pen/50 focus:bg-white/12 transition-all backdrop-blur-xl disabled:opacity-60"
                />
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    data-track="cta-waitlist-submit"
                    disabled={loading}
                    className="relative inline-flex items-center justify-center px-6 py-3.5 rounded-2xl font-body font-semibold text-sm bg-pen border border-pen/50 text-white hover:bg-pen/90 whitespace-nowrap transition-all active:scale-[0.97] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                    {loading ? "Joining…" : "Join the waitlist"}
                    {!loading && (
                      <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
              className="mt-4 font-body text-sm text-[#FF6B5B]"
            >
              {error}
            </motion.p>
          )}

          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-xs font-body text-white/45">No spam, ever. Unsubscribe any time.</p>
            <div className="flex items-center gap-4 text-[10px] font-body text-white/40">
              {["40% launch discount", "First in line", "Cancel anytime"].map((text) => (
                <span key={text} className="flex items-center gap-1">
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </LiquidEffect>
  );
}
