"use client";

import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LiquidEffectProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export const LiquidEffect = forwardRef<HTMLDivElement, LiquidEffectProps>(
  function LiquidEffect({ className, children, id }, forwardedRef) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type Blob = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      hue: number;
      sat: number;
      lit: number;
      alpha: number;
    };

    const blobs: Blob[] = [
      // Deep indigo blobs
      { x: 0, y: 0, vx: 0.4, vy: 0.3, r: 0, hue: 240, sat: 70, lit: 20, alpha: 0.5 },
      { x: 0, y: 0, vx: -0.3, vy: 0.5, r: 0, hue: 260, sat: 65, lit: 18, alpha: 0.45 },
      // Blue/violet blobs
      { x: 0, y: 0, vx: 0.5, vy: -0.4, r: 0, hue: 220, sat: 55, lit: 22, alpha: 0.4 },
      { x: 0, y: 0, vx: -0.4, vy: -0.3, r: 0, hue: 250, sat: 60, lit: 16, alpha: 0.5 },
      // Deep midnight blue
      { x: 0, y: 0, vx: 0.2, vy: 0.6, r: 0, hue: 230, sat: 50, lit: 14, alpha: 0.6 },
      // Warm dark purple (creates warmth)
      { x: 0, y: 0, vx: -0.5, vy: 0.2, r: 0, hue: 280, sat: 50, lit: 20, alpha: 0.35 },
    ].map((b, i) => ({
      ...b,
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 600),
      r: 0,
    }));

    let t = 0;
    const draw = () => {
      t += 0.002;
      ctx.clearRect(0, 0, width, height);

      const minDim = Math.min(width, height);

      /* Dark base — richer than pure black */
      ctx.fillStyle = "#0A0A10";
      ctx.fillRect(0, 0, width, height);

      /* Draw blobs */
      ctx.globalCompositeOperation = "screen";
      blobs.forEach((b, idx) => {
        b.x += b.vx + Math.sin(t * 0.8 + idx) * 0.4;
        b.y += b.vy + Math.cos(t * 0.7 + idx * 0.8) * 0.4;
        if (b.x < -(minDim * 0.4)) b.x = width + minDim * 0.4;
        if (b.x > width + minDim * 0.4) b.x = -(minDim * 0.4);
        if (b.y < -(minDim * 0.4)) b.y = height + minDim * 0.4;
        if (b.y > height + minDim * 0.4) b.y = -(minDim * 0.4);

        const r = minDim * (0.28 + (idx % 3) * 0.08);
        const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grd.addColorStop(0, `hsla(${b.hue},${b.sat}%,${b.lit}%,${b.alpha})`);
        grd.addColorStop(0.45, `hsla(${b.hue},${b.sat - 10}%,${b.lit - 4}%,${b.alpha * 0.35})`);
        grd.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* Brand red accent — the "pen" */
      const rx = width * 0.5 + Math.sin(t * 0.6) * width * 0.18;
      const ry = height * 0.45 + Math.cos(t * 0.45) * height * 0.12;
      const rr = minDim * 0.38;
      const rg = ctx.createRadialGradient(rx, ry, 0, rx, ry, rr);
      rg.addColorStop(0, "rgba(230,48,39,0.16)");
      rg.addColorStop(0.5, "rgba(230,48,39,0.05)");
      rg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(rx, ry, rr, 0, Math.PI * 2);
      ctx.fill();

      /* Bottom vignette for depth */
      ctx.globalCompositeOperation = "source-over";
      const vgrd = ctx.createLinearGradient(0, height * 0.6, 0, height);
      vgrd.addColorStop(0, "rgba(10,10,16,0)");
      vgrd.addColorStop(1, "rgba(10,10,16,0.5)");
      ctx.fillStyle = vgrd;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div ref={forwardedRef} id={id} className={cn("relative overflow-hidden", className)} style={{ background: "#0A0A10" }}>
      {reducedMotion ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#14113a] via-[#0A0A10] to-[#0d1525]" />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
});
