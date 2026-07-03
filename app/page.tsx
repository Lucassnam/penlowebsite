import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Problem } from "@/components/sections/Problem";
import { DocStack } from "@/components/sections/DocStack";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AiMarks } from "@/components/sections/AiMarks";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

function GradientBridge({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden
      style={{
        height: 140,
        background: `linear-gradient(to bottom, ${from} 0%, ${from} 15%, ${to} 85%, ${to} 100%)`,
        marginTop: -1,
        marginBottom: -1,
      }}
    />
  );
}

export default function Home() {
  const night = "#0B0B0F";
  const paper = "#FBFAF7";

  return (
    <main>
      <Nav />
      <Hero />
      <SocialProof />
      <GradientBridge from={night} to={paper} />
      <Problem />
      <DocStack />
      <HowItWorks />
      <GradientBridge from={paper} to={night} />
      <AiMarks />
      <GradientBridge from={night} to={paper} />
      <FeatureGrid />
      <Testimonials />
      <Faq />
      <GradientBridge from={paper} to={night} />
      <FinalCta />
      <GradientBridge from={night} to={paper} />
      <Footer />
    </main>
  );
}
