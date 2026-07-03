"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] origin-left"
      style={{
        scaleX,
        height: "2px",
        background: "linear-gradient(90deg, #E63027 0%, #FF6B5B 50%, #E63027 100%)",
        boxShadow: "0 0 8px rgba(230,48,39,0.6)",
      }}
    />
  );
}
