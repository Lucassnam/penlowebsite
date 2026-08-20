"use client";

import { useSyncExternalStore } from "react";
import { NAV_GLASS } from "@/lib/glass";

/**
 * Live override for the nav bar's frostedness, driven by the on-page tuner.
 * Module-level rather than context so the slider can sit anywhere in the tree
 * without wrapping the app in a provider.
 */
let blurAmount = NAV_GLASS.blurAmount;
const listeners = new Set<() => void>();

export function setNavBlur(value: number): void {
  blurAmount = value;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => blurAmount;
const getServerSnapshot = () => NAV_GLASS.blurAmount;

export function useNavBlur(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
