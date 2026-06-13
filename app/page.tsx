import { FluidMenu } from "@/components/fluid-menu";
import { DoodleWall } from "@/components/sections/doodle-wall";
import { Hero } from "@/components/sections/hero";
import { HowWeRoll } from "@/components/sections/how-we-roll";
import { OurWork } from "@/components/sections/our-work";
import { Services } from "@/components/sections/services";
import { AboutUs } from "@/components/sections/about-us";
import { LetsConnect } from "@/components/sections/lets-connect";

export default function Home() {
  return (
    <main id="top">
      <FluidMenu />
      {/* The doodle wall stays pinned at the top of the viewport;
          everything below scrolls up and over it (per the Figma
          "Scroll main page" prototype). */}
      <DoodleWall />
      <div className="relative z-10 bg-portfolio-cream">
        <Hero />
        <HowWeRoll />
        <OurWork />
        <Services />
        <AboutUs />
        <LetsConnect />
      </div>
    </main>
  );
}
