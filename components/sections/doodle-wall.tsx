"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

// Full-screen wall of doodle characters (Figma Desktop-5). It sits sticky at
// the top of the page so the hero scrolls up over it. Because it's the first
// thing on screen, it also carries the page's landing animation.
export const DoodleWall = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Landing intro — plays once on first load: the wall settles in and the
      // scroll cue drops down to invite the user further.
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".doodle-art", { opacity: 0, scale: 1.08, duration: 1.2 })
        .from(".doodle-cue", { opacity: 0, y: -14, duration: 0.5 }, "-=0.45");
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-label="Studio.Squiggle doodle wall"
      className="sticky top-0 z-0 h-svh bg-portfolio-yellow overflow-hidden"
    >
      <div className="doodle-art absolute inset-0">
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
      <div className="doodle-cue absolute bottom-6 inset-x-0 flex justify-center">
        <ChevronDown aria-hidden className="bob h-8 w-8 text-foreground/70" />
      </div>
    </section>
  );
};
