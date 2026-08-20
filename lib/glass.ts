/**
 * One source of truth for the liquid-glass surfaces.
 *
 * Tune these live at /glass-lab, then paste the values back here — the lab
 * reads the same presets, so what you see there is what the site renders.
 */
export type GlassSettings = {
  /** How hard the backdrop refracts at the edges. 0 = flat frost. */
  displacementScale: number;
  /** Frostedness. The library maps this to blur((overLight?12:4) + v*32)px. */
  blurAmount: number;
  /** Backdrop saturation, percent. */
  saturation: number;
  /** RGB split at the rim. Small numbers only, it goes garish fast. */
  aberrationIntensity: number;
  /** How much the panel leans toward the cursor. 0 = static. */
  elasticity: number;
  cornerRadius: number;
  /** True when the panel sits on light content — darkens the frost so type reads. */
  overLight: boolean;
  mode: "standard" | "polar" | "prominent" | "shader";
};

/** The floating top bar. Static, because a nav that leans at the cursor is a toy. */
export const NAV_GLASS: GlassSettings = {
  displacementScale: 44,
  blurAmount: 0.12,
  saturation: 150,
  aberrationIntensity: 1.4,
  elasticity: 0,
  cornerRadius: 22,
  overLight: false,
  mode: "standard",
};

/**
 * The same bar over the cream sections. The library's refraction needs a dark
 * or photographic backdrop; over paper it vanishes, and its `overLight` mode
 * darkens the pane to near-black. So light sections get a white frosted pane
 * with the same blur and saturation.
 */
export const NAV_GLASS_LIGHT: GlassSettings = {
  ...{
    displacementScale: 0,
    blurAmount: 0.12,
    saturation: 200,
    aberrationIntensity: 0,
    elasticity: 0,
    cornerRadius: 22,
    overLight: true,
    mode: "standard",
  },
};

/** The waitlist confirmation card, floating on the orange CTA band. */
export const SHEET_GLASS: GlassSettings = {
  displacementScale: 34,
  blurAmount: 0.2,
  saturation: 140,
  aberrationIntensity: 1,
  elasticity: 0,
  cornerRadius: 20,
  overLight: false,
  mode: "standard",
};

/** Effective CSS blur in px, matching the library's own formula. */
export function blurPx(s: Pick<GlassSettings, "blurAmount" | "overLight">): number {
  return Math.round((s.overLight ? 12 : 4) + s.blurAmount * 32);
}
