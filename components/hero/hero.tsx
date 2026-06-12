"use client";

import { useRef } from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";
import hero from "@/public/hero-whistle.svg";
import { Button } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

export const Hero = () => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-logo", { y: -60, opacity: 0, duration: 0.7 })
        .from(
          ".hero-whistle",
          {
            scale: 0.6,
            rotation: -12,
            opacity: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
          },
          "-=0.3",
        )
        .from(
          ".hero-line",
          { y: 40, opacity: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4",
        )
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(
          ".hero-cta",
          { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(2)" },
          "-=0.2",
        );

      // Gentle idle float for the whistle once it has popped in.
      gsap.to(".hero-whistle", {
        y: -12,
        rotation: 2,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <div className="bg-portfolio-yellow text-primary px-6 lg:px-14">
        {/* Logo: centered on mobile, top-left on desktop */}
        <div className="flex justify-center lg:justify-start pt-8 lg:pt-10">
          <Image
            src={logo}
            alt="Studio.Squiggle"
            className="hero-logo h-12 lg:h-14 w-auto"
            priority
          />
        </div>

        {/* Mobile: whistle stacked above centered copy.
            Desktop: copy left, whistle right (per Figma Desktop-14). */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-4 pb-4 lg:py-16 lg:pr-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <div className="font-light text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              <h1 className="hero-line">For the weird</h1>
              <h1 className="hero-line font-semibold">By the weird</h1>
            </div>
            <div className="hero-sub font-serif font-light mt-5 lg:mt-8 text-xs md:text-sm lg:text-base">
              <p>We help brands embrace their own kind of weird.</p>
              <p>carefully built identities, illustrated with intention</p>
            </div>
            {/* GSAP animates this wrapper, not the button: the button's own
                CSS transition-all would corrupt the values gsap.from()
                captures. */}
            <div className="hero-cta mt-8 lg:mt-12 mb-2">
              <Button
                asChild
                variant={"ghost"}
                className="wiggle-on-hover font-serif font-light uppercase tracking-wider border border-black rounded-full px-6 py-5 hover:bg-foreground hover:text-portfolio-yellow"
              >
                <a href="#contact">Book a meeting with us</a>
              </Button>
            </div>
          </div>
          <Image
            src={hero}
            alt="A squiggly character blowing a whistle"
            className="hero-whistle h-72 md:h-80 lg:h-104 w-auto mt-6 lg:mt-0 order-1 lg:order-2"
            loading="eager"
            priority
          />
        </div>
      </div>
      <div className="scalloped-box scalloped-bottom bg-portfolio-yellow min-h-21"></div>
    </div>
  );
};
