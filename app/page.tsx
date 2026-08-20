import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { DemoModal } from "@/components/ui/demo-modal";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <FeatureGrid />
      <Faq />
      <FinalCta />
      <Footer />
      <DemoModal />
    </main>
  );
}
