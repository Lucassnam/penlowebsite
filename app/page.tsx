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

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SocialProof />
      <Problem />
      <DocStack />
      <HowItWorks />
      <AiMarks />
      <FeatureGrid />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
