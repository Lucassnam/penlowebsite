"use client";

import { useEffect, useRef, useState } from "react";
import LiquidGlassCore from "liquid-glass-react";
import type { GlassSettings } from "@/lib/glass";
import { blurPx } from "@/lib/glass";

/**
 * A liquid-glass pane that fills its positioned parent, so callers keep their
 * own layout and put content in a sibling layer above it.
 *
 * Two things this has to work around:
 *
 * 1. liquid-glass-react always applies `translate(-50%, -50%)` and merges it
 *    *after* any style you pass, so the transform cannot be overridden. The
 *    core is therefore pinned at top/left 50% of this wrapper and handed a
 *    spacer child measured to the wrapper's box.
 * 2. The refraction is an SVG displacement filter fed through `backdrop-filter`,
 *    which only Chromium supports. Safari and Firefox drop the entire
 *    declaration when any part of it is unsupported, which would leave a clear
 *    pane and unreadable type — so they get plain frost at the same blur,
 *    saturation, tint and radius. Same legibility, no refraction.
 */
function supportsDisplacementBackdrop(): boolean {
  if (typeof window === "undefined" || typeof CSS === "undefined") return false;
  const supports = CSS.supports?.bind(CSS);
  if (!supports) return false;
  return (
    supports("backdrop-filter", "url(#x)") ||
    supports("-webkit-backdrop-filter", "url(#x)")
  );
}

export function frostStyle(s: GlassSettings): React.CSSProperties {
  const filter = `blur(${blurPx(s)}px) saturate(${s.saturation}%)`;
  return {
    borderRadius: s.cornerRadius,
    background: s.overLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.10)",
    backdropFilter: filter,
    WebkitBackdropFilter: filter,
    border: s.overLight
      ? "1px solid rgba(255,255,255,0.65)"
      : "1px solid rgba(255,255,255,0.16)",
    boxShadow: s.overLight
      ? "inset 0 1px 0 rgba(255,255,255,0.90), 0 10px 30px rgba(0,0,0,0.10)"
      : "inset 0 1px 0 rgba(255,255,255,0.22), 0 10px 30px rgba(0,0,0,0.30)",
  };
}

export function LiquidGlassSurface({
  settings,
  className = "",
}: {
  settings: GlassSettings;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const [refract, setRefract] = useState(false);

  useEffect(() => {
    setRefract(supportsDisplacementBackdrop());
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setBox({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {refract && box ? (
        <LiquidGlassCore
          displacementScale={settings.displacementScale}
          blurAmount={settings.blurAmount}
          saturation={settings.saturation}
          aberrationIntensity={settings.aberrationIntensity}
          elasticity={settings.elasticity}
          cornerRadius={settings.cornerRadius}
          overLight={settings.overLight}
          mode={settings.mode}
          padding="0px"
          style={{ position: "absolute", top: "50%", left: "50%" }}
        >
          <div style={{ width: box.w, height: box.h }} />
        </LiquidGlassCore>
      ) : (
        // Also the first paint, so the pane is never briefly clear.
        <div className="absolute inset-0" style={frostStyle(settings)} />
      )}
    </div>
  );
}
