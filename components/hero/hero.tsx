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
      <div className="flex flex-col justify-center items-center bg-portfolio-yellow text-primary px-6">
        <Image
          src={logo}
          alt="Studio.Squiggle"
          className="hero-logo h-12 md:h-15 w-auto mt-8 md:mt-10"
          priority
        />
        <Image
          src={hero}
          alt="A squiggly character blowing a whistle"
          className="hero-whistle h-72 md:h-100 w-auto mt-8 md:mt-10 mb-8 md:mb-10"
          loading="eager"
          priority
        />
        <div className="font-light text-4xl md:text-6xl items-center text-center">
          <h1 className="hero-line">For the Weird</h1>
          <h1 className="hero-line font-semibold">By the Weird</h1>
        </div>
        <div className="hero-sub font-serif font-light mt-5 text-xs md:text-sm text-center">
          <p>We help brands embrace their own kind of weird.</p>
          <p>carefully built identities, illustrated with intention</p>
        </div>
        {/* GSAP animates this wrapper, not the button: the button's own CSS
            transition-all would corrupt the values gsap.from() captures. */}
        <div className="hero-cta mt-8 md:mt-10 mb-2">
          <Button
            asChild
            variant={"ghost"}
            className="wiggle-on-hover font-serif font-light border border-black rounded-full px-6 hover:bg-foreground hover:text-portfolio-yellow"
          >
            <a href="#contact">Book a meeting with us</a>
          </Button>
        </div>
      </div>
      <div className="scalloped-box scalloped-bottom bg-portfolio-yellow min-h-21"></div>
    </div>
  );
};
