"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TahoeButton } from "@/components/ui/tahoe-button";

const links = ["Features", "How it works", "FAQ"];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(11,11,15,0)", "rgba(11,11,15,0.72)"]
  );

  const backdropFilter = useTransform(
    scrollY,
    [0, 80],
    ["blur(0px) saturate(100%)", "blur(32px) saturate(200%)"]
  );

  const borderBottomColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]
  );

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
        style={{
          backgroundColor: bgColor,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor,
        }}
      >
        <a
          href="/"
          className="font-display text-xl font-bold tracking-tight text-white z-10"
        >
          Caret
          <svg
            className="inline-block w-[0.6em] h-[0.6em] ml-[0.04em] translate-y-[0.06em] text-pen"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path d="M4 16 L12 8 L20 16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-body text-white/70 hover:text-white transition-colors duration-200"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <TahoeButton
            href="#waitlist"
            variant="dark"
            dataTrack="cta-nav"
            className="text-white text-sm py-2 px-5 bg-pen/85 border-pen/30 hover:bg-pen"
          >
            Get early access
          </TahoeButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-5 h-0.5 bg-white rounded-full origin-center"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-white rounded-full"
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-white rounded-full origin-center"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-8"
            style={{ background: "rgba(10,10,16,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex-1 flex flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                  className="font-display text-3xl font-bold text-white/80 hover:text-white py-3 border-b border-white/8 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07 }}
                >
                  {l}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <a
                href="#waitlist"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-4 rounded-2xl bg-pen font-body font-semibold text-white text-base"
              >
                Get early access
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
