"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StackedPanelsProps {
  panels: React.ReactNode[];
  className?: string;
}

export function StackedPanels({ panels, className }: StackedPanelsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none", className)}
      style={{ perspective: 900, paddingBottom: `${(panels.length - 1) * 16}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full"
      >
        {panels.map((panel, i) => {
          const total = panels.length;
          const fromTop = total - 1 - i; // 0 = front card
          const offsetY = fromTop * 16;
          const scaleVal = 1 - fromTop * 0.035;
          const shadowOpacity = 0.08 + fromTop * 0.04;

          return (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-full"
              style={{
                y: offsetY,
                scale: scaleVal,
                zIndex: i,
                boxShadow: `0 ${4 + fromTop * 3}px ${12 + fromTop * 6}px rgba(0,0,0,${shadowOpacity})`,
                originY: 0,
              }}
              whileHover={fromTop === 0 ? { y: offsetY - 8 } : undefined}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {panel}
            </motion.div>
          );
        })}
        {/* Invisible front card to set container height */}
        <div className="invisible w-full" aria-hidden>
          {panels[panels.length - 1]}
        </div>
      </motion.div>
    </div>
  );
}
