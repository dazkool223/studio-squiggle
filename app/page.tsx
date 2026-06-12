import { AboutUs } from "@/components/about-us";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { HowWeRollCarousel } from "@/components/roll/how-we-roll";
import Services from "@/components/support/support";

export default function Home() {
  return (
    <main className="flex flex-col bg-portfolio-cream">
      <Hero />
      <HowWeRollCarousel />
      <Portfolio />
      <AboutUs />
      <Services />
      <Footer />
      <Support />
      <AboutUs />
    </main>
  );
}
