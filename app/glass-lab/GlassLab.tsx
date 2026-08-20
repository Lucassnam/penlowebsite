"use client";

import { useState } from "react";
import { LiquidGlassSurface } from "@/components/ui/liquid-glass";
import { NAV_GLASS, SHEET_GLASS, blurPx, type GlassSettings } from "@/lib/glass";

type Backdrop = "hero" | "paper" | "cta" | "type";

const BACKDROPS: { id: Backdrop; label: string; overLight: boolean }[] = [
  { id: "hero", label: "Black hero", overLight: false },
  { id: "type", label: "Dense text", overLight: true },
  { id: "paper", label: "Cream paper", overLight: true },
  { id: "cta", label: "Orange CTA", overLight: false },
];

const CONTROLS: {
  key: keyof GlassSettings;
  label: string;
  min: number;
  max: number;
  step: number;
  hint: string;
}[] = [
  { key: "blurAmount", label: "Frostedness", min: 0, max: 1, step: 0.01, hint: "the one you asked for — how much the backdrop is blurred" },
  { key: "displacementScale", label: "Refraction", min: 0, max: 200, step: 1, hint: "edge lensing; 0 is flat frost" },
  { key: "saturation", label: "Saturation", min: 100, max: 220, step: 1, hint: "colour pulled out of the backdrop" },
  { key: "aberrationIntensity", label: "Chromatic aberration", min: 0, max: 10, step: 0.1, hint: "rim colour split; goes garish past ~3" },
  { key: "elasticity", label: "Cursor elasticity", min: 0, max: 1, step: 0.01, hint: "lean toward the pointer; 0 for the nav" },
  { key: "cornerRadius", label: "Corner radius", min: 0, max: 60, step: 1, hint: "px" },
];

export function GlassLab() {
  const [s, setS] = useState<GlassSettings>({ ...NAV_GLASS });
  const [backdrop, setBackdrop] = useState<Backdrop>("hero");
  const [wide, setWide] = useState(true);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof GlassSettings>(k: K, v: GlassSettings[K]) =>
    setS((prev) => ({ ...prev, [k]: v }));

  const snippet = `{
  displacementScale: ${s.displacementScale},
  blurAmount: ${s.blurAmount},
  saturation: ${s.saturation},
  aberrationIntensity: ${s.aberrationIntensity},
  elasticity: ${s.elasticity},
  cornerRadius: ${s.cornerRadius},
  overLight: ${s.overLight},
  mode: "${s.mode}",
}`;

  return (
    <div className="min-h-screen bg-[#0A0A10] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[380px_minmax(0,1fr)]">
        {/* ── controls ─────────────────────────────── */}
        <div className="lg:sticky lg:top-10 lg:self-start">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-pen">
            Glass lab
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-[-0.03em]">
            Tune the frost.
          </h1>
          <p className="mt-2 font-body text-sm leading-relaxed text-white/45">
            Drag the sliders, switch what sits behind the panel, then paste the
            values into <code className="text-white/70">lib/glass.ts</code>.
          </p>

          <div className="mt-7 space-y-5">
            {CONTROLS.map((c) => (
              <label key={c.key} className="block">
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="font-body text-sm font-medium">{c.label}</span>
                  <span className="font-mono text-xs text-pen">
                    {String(s[c.key])}
                    {c.key === "blurAmount" && (
                      <span className="ml-1.5 text-white/35">= {blurPx(s)}px</span>
                    )}
                  </span>
                </div>
                <input
                  type="range"
                  min={c.min}
                  max={c.max}
                  step={c.step}
                  value={s[c.key] as number}
                  onChange={(e) => set(c.key, Number(e.target.value) as never)}
                  className="w-full accent-[#E63027]"
                />
                <span className="mt-1 block font-body text-[11px] leading-snug text-white/30">
                  {c.hint}
                </span>
              </label>
            ))}

            <div>
              <span className="mb-1.5 block font-body text-sm font-medium">Mode</span>
              <div className="flex flex-wrap gap-1.5">
                {(["standard", "polar", "prominent", "shader"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => set("mode", m)}
                    className={`rounded-full px-3 py-1.5 font-body text-xs transition-colors ${
                      s.mode === m ? "bg-pen text-white" : "bg-white/8 text-white/60 hover:bg-white/14"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={s.overLight}
                onChange={(e) => set("overLight", e.target.checked)}
                className="h-4 w-4 accent-[#E63027]"
              />
              <span className="font-body text-sm">
                Over light content
                <span className="ml-1.5 text-white/35">(darkens the frost so type reads)</span>
              </span>
            </label>

            <div className="flex flex-wrap gap-2 pt-1">
              <button onClick={() => setS({ ...NAV_GLASS })} className="rounded-full bg-white/10 px-3.5 py-2 font-body text-xs hover:bg-white/16">
                Load nav preset
              </button>
              <button onClick={() => setS({ ...SHEET_GLASS })} className="rounded-full bg-white/10 px-3.5 py-2 font-body text-xs hover:bg-white/16">
                Load sheet preset
              </button>
              <button onClick={() => setWide((w) => !w)} className="rounded-full bg-white/10 px-3.5 py-2 font-body text-xs hover:bg-white/16">
                {wide ? "Bar shape" : "Card shape"}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(snippet);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1400);
              }}
              className="mb-2 rounded-full bg-pen px-3.5 py-2 font-body text-xs font-semibold hover:bg-pen/90"
            >
              {copied ? "Copied" : "Copy settings"}
            </button>
            <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-white/70">
{snippet}
            </pre>
          </div>
        </div>

        {/* ── stage ────────────────────────────────── */}
        <div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {BACKDROPS.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setBackdrop(b.id);
                  set("overLight", b.overLight);
                }}
                className={`rounded-full px-3.5 py-1.5 font-body text-xs transition-colors ${
                  backdrop === b.id ? "bg-white text-black" : "bg-white/8 text-white/60 hover:bg-white/14"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-2xl">
            <Backdrop kind={backdrop} />
            <div
              className="relative z-10 overflow-hidden"
              style={{
                width: wide ? "min(680px, 88%)" : "min(380px, 80%)",
                borderRadius: s.cornerRadius,
              }}
            >
              <LiquidGlassSurface settings={s} />
              <div
                className={
                  wide
                    ? "relative flex items-center justify-between gap-6 px-6 py-4"
                    : "relative space-y-2 px-7 py-7"
                }
              >
                <span
                  className={`font-display text-lg font-bold ${s.overLight ? "text-ink" : "text-white"}`}
                >
                  Caret
                </span>
                <span
                  className={`font-body text-sm ${s.overLight ? "text-ink-muted" : "text-white/70"}`}
                >
                  Features · How it works · FAQ
                </span>
              </div>
            </div>
          </div>

          <p className="mt-3 font-body text-xs leading-relaxed text-white/35">
            Refraction needs SVG filters in <code>backdrop-filter</code>, which
            only Chromium ships. Safari and Firefox fall back to plain frost at
            the same blur and saturation — check the panel there before shipping
            a value that only reads well with refraction on.
          </p>
        </div>
      </div>
    </div>
  );
}

function Backdrop({ kind }: { kind: Backdrop }) {
  if (kind === "paper") {
    return <div className="absolute inset-0 bg-paper paper-texture" />;
  }
  if (kind === "cta") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 45% 50%, #FF7A2F 0%, #E63027 45%, #0A0A0C 100%)",
        }}
      />
    );
  }
  if (kind === "type") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-paper p-8">
        <p className="font-body text-[15px] leading-[1.9] text-ink/85">
          {Array.from({ length: 9 })
            .map(
              () =>
                "The report reveals surprising data about reading habits in the digital age. Researchers found that readers retain more information from physical media. ",
            )
            .join("")}
        </p>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 bg-black">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 20%, rgba(255,122,47,0.35) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <p className="absolute inset-x-0 top-1/3 text-center font-heading text-[5rem] font-bold tracking-[-0.045em] text-white/80">
        Handwriting
      </p>
    </div>
  );
}
