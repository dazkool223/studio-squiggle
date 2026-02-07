import { AboutUs } from "@/components/about-us";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { HowWeRollCarousel } from "@/components/roll/how-we-roll";

export default function Home() {
  return (
    <main className="flex flex-col bg-portfolio-cream">
      <Hero />
      <HowWeRollCarousel />
      <Portfolio />
      <AboutUs />
    </main>
  );
}
