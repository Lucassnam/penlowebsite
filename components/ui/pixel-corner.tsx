"use client";

import { motion } from "framer-motion";

const GRID = 5;
const CELL = 7;

/**
 * A little block of squares that dissolves in from the corner on hover.
 * Cells nearer the corner light first and stay darkest, so it reads as the
 * card's edge pixelating rather than as a decorative sprinkle.
 */
export function PixelCorner({
  corner = "br",
  className = "",
}: {
  corner?: "tr" | "br";
  className?: string;
}) {
  const cells = [];
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      const dist = corner === "br" ? (GRID - 1 - r) + (GRID - 1 - c) : r + (GRID - 1 - c);
      if (dist > GRID) continue;
      cells.push({ r, c, dist });
    }
  }

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${
        corner === "br" ? "bottom-0 right-0" : "right-0 top-0"
      } ${className}`}
      style={{ width: GRID * CELL, height: GRID * CELL }}
    >
      {cells.map(({ r, c, dist }) => (
        <motion.span
          key={`${r}-${c}`}
          className="absolute bg-pen"
          style={{
            left: c * CELL,
            top: r * CELL,
            width: CELL - 1.5,
            height: CELL - 1.5,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          variants={{
            rest: { opacity: 0, scale: 0.4 },
            hover: {
              opacity: Math.max(0.08, 0.42 - dist * 0.06),
              scale: 1,
            },
          }}
          transition={{ duration: 0.26, delay: dist * 0.035, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}
