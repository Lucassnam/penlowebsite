import type { Metadata } from "next";
import { GlassLab } from "./GlassLab";

export const metadata: Metadata = {
  title: "Glass lab",
  robots: { index: false, follow: false },
};

export default function GlassLabPage() {
  return <GlassLab />;
}
