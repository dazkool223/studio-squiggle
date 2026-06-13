"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

// Hero per Figma Desktop-14: yellow panel, logo top-left, headline and
// CTA on the left, whistle character on the right, cream wave on the
// right edge (where the fluid menu lives) and a scalloped bottom edge.
export const Hero = () => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: scope.current, start: "top 70%" },
      });

      tl.from(".hero-logo", { y: -40, opacity: 0, duration: 0.6 })
        .from(
          ".hero-whistle",
          { scale: 0.6, rotation: -12, opacity: 0, duration: 0.8, ease: "back.out(1.6)" },
          "-=0.3",
        )
        .from(".hero-line", { y: 40, opacity: 0, duration: 0.5, stagger: 0.12 }, "-=0.4")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.4 }, "-=0.2")
        .from(
          ".hero-cta",
          { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)" },
          "-=0.15",
        );

      // Idle float once the whistle has popped in
      gsap.to(".hero-whistle", {
        y: -12,
        rotation: 2,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <section
        id="hero"
        className="relative bg-portfolio-yellow text-foreground overflow-hidden"
      >
        {/* Cream wave eating into the yellow on the right (Desktop-14).
            The fixed fluid-menu tab sits on top of it. */}
        <svg
          aria-hidden
          viewBox="0 0 64 800"
          preserveAspectRatio="none"
          className="hidden lg:block absolute right-0 top-0 h-full w-16 text-portfolio-cream"
        >
          <path
            d="M64 0 H34 C16 140 48 270 30 400 C12 530 50 660 30 800 H64 Z"
            fill="currentColor"
          />
        </svg>

        <div className="px-6 lg:px-14 lg:pr-24 min-h-svh flex flex-col">
          <div className="flex justify-center lg:justify-start pt-8 lg:pt-10">
            <Image
              src="/logo.svg"
              alt="Studio.Squiggle"
              width={284}
              height={93}
              priority
              className="hero-logo h-12 lg:h-16 w-auto"
            />
          </div>

          <div className="flex flex-1 flex-col lg:flex-row items-center lg:justify-between gap-8 max-w-6xl w-full mx-auto py-10 lg:py-0">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
              <h1 className="font-light text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                <span className="hero-line block">For the weird</span>
                <span className="hero-line block font-bold">By the weird</span>
              </h1>
              <div className="hero-sub font-serif font-light mt-5 lg:mt-8 text-xs md:text-sm lg:text-base">
                <p>We help brands embrace their own kind of weird.</p>
                <p>Carefully built identities, illustrated with intention.</p>
              </div>
              {/* Wrapper keeps GSAP off the link's own CSS transition */}
              <div className="hero-cta mt-8 lg:mt-12">
                <a
                  href="#contact"
                  className="wiggle-on-hover inline-block font-serif font-light text-xs md:text-sm uppercase tracking-wider border border-foreground rounded-full px-6 py-3 transition-colors hover:bg-foreground hover:text-portfolio-yellow"
                >
                  Book a meeting with us
                </a>
              </div>
            </div>

            <Image
              src="/hero-whistle.svg"
              alt="A squiggly character blowing a whistle"
              width={302}
              height={377}
              priority
              className="hero-whistle h-64 md:h-80 lg:h-105 w-auto order-1 lg:order-2"
            />
          </div>
        </div>
      </section>
      {/* Yellow melts into cream with a scalloped edge */}
      <div className="scalloped-bottom bg-portfolio-yellow h-21 -mt-px" aria-hidden />
    </div>
  );
};
