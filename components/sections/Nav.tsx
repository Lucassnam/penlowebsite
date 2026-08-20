"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#demo" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const { scrollY } = useScroll();

  // The panel stays out of the way until you've scrolled past the opening
  // statement. The wordmark, though, is there from the first frame.
  // Glass has to invert over the dark sections or the type stops being
  // readable, so track which band the bar is currently floating over.
  const [onDark, setOnDark] = useState(true);
  const bands = useRef<{ threshold: number; dark: [number, number][] }>({
    threshold: 1200,
    dark: [],
  });

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById("hero");
      const cta = document.getElementById("waitlist");
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight * 3;
      const dark: [number, number][] = [[0, heroBottom]];
      if (cta) dark.push([cta.offsetTop, cta.offsetTop + cta.offsetHeight]);
      bands.current = { threshold: window.innerHeight * 1.15, dark };
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setShown(y > bands.current.threshold);
    const probe = y + 46; // vertical centre of the floating bar
    setOnDark(bands.current.dark.some(([top, bottom]) => probe > top && probe < bottom));
  });

  useEffect(() => {
    if (!shown) setMenuOpen(false);
  }, [shown]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-3 top-3 z-50 md:inset-x-6 md:top-5">
        <div className="relative mx-auto max-w-6xl">
          {/* ── liquid glass panel ─────────────────────────── */}
          <AnimatePresence>
            {shown && (
              <motion.div
                className="absolute inset-0 rounded-[20px] md:rounded-[22px]"
                initial={{ opacity: 0, y: -14, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.985 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: onDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(34px) saturate(200%)",
                  WebkitBackdropFilter: "blur(34px) saturate(200%)",
                  border: onDark
                    ? "1px solid rgba(255,255,255,0.16)"
                    : "1px solid rgba(255,255,255,0.65)",
                  boxShadow: onDark
                    ? "inset 0 1px 0 rgba(255,255,255,0.22), 0 10px 30px rgba(0,0,0,0.30)"
                    : "inset 0 1px 0 rgba(255,255,255,0.90), 0 10px 30px rgba(0,0,0,0.10)",
                  transition: "background 320ms ease, border-color 320ms ease, box-shadow 320ms ease",
                }}
              >
                {/* specular sheen across the top of the glass */}
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[20px] md:rounded-t-[22px]"
                  style={{
                    background: onDark
                      ? "linear-gradient(to bottom, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 100%)"
                      : "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── contents ───────────────────────────────────── */}
          <nav aria-label="Main" className="relative flex items-center justify-between px-4 py-3 md:px-5 md:py-3.5">
            {/* links appear with the panel */}
            <AnimatePresence>
              {shown && (
                <motion.ul
                  className="pointer-events-auto hidden items-center gap-7 md:flex"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35, delay: 0.06 }}
                >
                  {links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className={`font-body text-sm transition-colors duration-300 ${
                          onDark ? "text-white/70 hover:text-white" : "text-ink-muted hover:text-ink"
                        }`}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {shown && (
                <motion.button
                  className="pointer-events-auto z-10 flex flex-col gap-1.5 p-1.5 md:hidden"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span className={`block h-0.5 w-5 origin-center rounded-full ${onDark ? "bg-white" : "bg-ink"}`} animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} transition={{ duration: 0.2 }} />
                  <motion.span className={`block h-0.5 w-5 rounded-full ${onDark ? "bg-white" : "bg-ink"}`} animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.15 }} />
                  <motion.span className={`block h-0.5 w-5 origin-center rounded-full ${onDark ? "bg-white" : "bg-ink"}`} animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} transition={{ duration: 0.2 }} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* spacer holds the wordmark right while the left side is empty */}
            <span aria-hidden className="flex-1" />

            {/* wordmark — present from the first frame, top right */}
            <motion.a
              href="/"
              className="pointer-events-auto font-display text-lg font-bold tracking-tight md:text-xl"
              animate={{ color: onDark ? "#FFFFFF" : "#1A1A1A" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Caret
              <svg
                className={`ml-[0.04em] inline-block h-[0.6em] w-[0.6em] translate-y-[0.06em] transition-colors duration-300 ${
                  onDark ? "text-white/70" : "text-pen"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path d="M4 16 L12 8 L20 16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </nav>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col px-6 pb-8 pt-24"
            style={{ background: "rgba(4,4,6,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-1 flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="border-b border-white/[0.08] py-3 font-display text-3xl font-bold text-white/80 transition-colors hover:text-white"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#waitlist"
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-full bg-white py-4 text-center font-body text-base font-semibold text-black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Get early access
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
