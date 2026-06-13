import Image from "next/image";
import { ChevronDown } from "lucide-react";

// Full-screen wall of doodle characters (Figma Desktop-5). It sits
// sticky at the top of the page so the hero scrolls up over it.
export const DoodleWall = () => {
  return (
    <section
      aria-label="Studio.Squiggle doodle wall"
      className="sticky top-0 z-0 h-svh bg-portfolio-yellow overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/doodle-wall.png"
          alt="A wall of squiggly doodle characters around the Studio.Squiggle logo"
          fill
          priority
          sizes="100vw"
          // Multiply blends the artwork's white background into the yellow wall
          className="object-cover object-center mix-blend-multiply"
        />
      </div>
      <div className="absolute bottom-6 inset-x-0 flex justify-center">
        <ChevronDown aria-hidden className="bob h-8 w-8 text-foreground/70" />
      </div>
    </section>
  );
};
