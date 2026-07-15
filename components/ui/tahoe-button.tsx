"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TahoeButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  variant?: "dark" | "light" | "pen";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  dataTrack?: string;
}

export function TahoeButton({
  children,
  className,
  style: styleProp,
  onClick,
  href,
  variant = "dark",
  size = "md",
  magnetic = true,
  dataTrack,
}: TahoeButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  /* Cursor-follow glow */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const glowX = useTransform(springX, (x) => `${x}px`);
  const glowY = useTransform(springY, (y) => `${y}px`);

  /* Magnetic offset */
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const magSpringX = useSpring(magX, { stiffness: 180, damping: 18 });
  const magSpringY = useSpring(magY, { stiffness: 180, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    if (magnetic) {
      magX.set((e.clientX - cx) * 0.3);
      magY.set((e.clientY - cy) * 0.3);
    }
  };

  const handleMouseLeave = () => {
    magX.set(0);
    magY.set(0);
    setHovered(false);
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantBase = {
    dark: "text-white border border-white/20 bg-white/8",
    light: "text-ink border border-black/10 bg-white/80",
    pen: "text-white border border-pen/40 bg-pen",
  };

  const glowColor = {
    dark: "rgba(255,255,255,0.3)",
    light: "rgba(230,48,39,0.25)",
    pen: "rgba(255,255,255,0.35)",
  };

  const baseClasses = cn(
    "relative inline-flex items-center justify-center rounded-2xl font-body font-semibold overflow-hidden select-none",
    sizeClasses[size],
    variantBase[variant],
    className
  );

  const content = (
    <>
      {/* Animated gradient border */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background:
            variant === "pen"
              ? "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05), rgba(255,255,255,0.2))"
              : "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.03), rgba(230,48,39,0.15))",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Cursor-follow glow */}
      <motion.span
        className="pointer-events-none absolute rounded-full blur-xl"
        style={{
          width: 100,
          height: 100,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, ${glowColor[variant]} 0%, transparent 70%)`,
          opacity: hovered ? 0.8 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />

      {/* Top sheen line */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Click ripple */}
      {clicked && (
        <motion.span
          className="pointer-events-none absolute rounded-full bg-white/20"
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
          onAnimationComplete={() => setClicked(false)}
        />
      )}

      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </>
  );

  const motionStyle = {
    x: magSpringX,
    y: magSpringY,
    scale: hovered ? 1.04 : 1,
  };

  const motionTransition = { type: "spring" as const, stiffness: 300, damping: 25 };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        data-track={dataTrack}
        className={baseClasses}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setClicked(true)}
        style={{ ...styleProp, ...motionStyle }}
        transition={motionTransition}
        whileTap={{ scale: 0.96 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      data-track={dataTrack}
      className={baseClasses}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setClicked(true)}
      style={{ ...styleProp, ...motionStyle }}
      transition={motionTransition}
      whileTap={{ scale: 0.96 }}
    >
      {content}
    </motion.button>
  );
}
