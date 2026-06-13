"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SERVICES } from "@/data/site";

const WORD_COLORS = [
  "text-portfolio-blue",
  "text-portfolio-pink",
  "text-foreground",
  "text-portfolio-purple",
] as const;

// Services: "We bring ideas to life through" + an auto-cycling word.
// All services are also listed as sticker chips so nothing is hidden
// behind the animation.
export const Services = () => {
  const scope = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const swap = () => {
        gsap
          .timeline()
          .to(wordRef.current, {
            y: -24,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setActive((i) => (i + 1) % SERVICES.length),
          })
          .fromTo(
            wordRef.current,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
          );
      };

      const interval = gsap.delayedCall(2.2, function repeat() {
        swap();
        interval.restart(true);
      });
      return () => {
        interval.kill();
      };
    },
    { scope },
  );

  useGSAP(
    () => {
      gsap.from(".service-chip", {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".service-chips", start: "top 85%" },
      });
    },
    { scope },
  );

  return (
    <section
      id="services"
      ref={scope}
      className="scroll-mt-10 py-16 md:py-24 px-6"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-10">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <p className="font-medium text-2xl md:text-3xl flex items-center gap-3">
            We bring ideas to life through
            <ArrowRight aria-hidden strokeWidth={1.5} className="hidden md:block h-8 w-8" />
          </p>
          <span
            ref={wordRef}
            aria-live="polite"
            className={`inline-block font-bold text-4xl md:text-6xl whitespace-nowrap ${WORD_COLORS[active % WORD_COLORS.length]}`}
          >
            {SERVICES[active]}
          </span>
        </div>

        <ul className="service-chips flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl">
          {SERVICES.map((service, index) => (
            <li
              key={service}
              className={`service-chip font-serif font-light text-sm md:text-base border border-foreground rounded-full px-5 py-2 bg-portfolio-cream ${
                index % 2 === 0 ? "rotate-1" : "-rotate-1"
              } hover:rotate-0 transition-transform`}
            >
              {service}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
