"use client";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const SERVICES = [
  "Brand Strategy",
  "Character Design",
  "UI/UX Design",
  "Content Design",
  "Merch & Print Design",
  "Visual Storytelling",
  "Illustration",
] as const;

// Brand palette from globals.css. Full literal class names — Tailwind only
// generates classes it can see verbatim in the source.
const THEMES = [
  { bg: "bg-portfolio-blue", fg: "text-[#0b1220]" },
  { bg: "bg-portfolio-pink", fg: "text-white" },
  { bg: "bg-foreground", fg: "text-white" },
  { bg: "bg-portfolio-yellow", fg: "text-[#1a1300]" },
] as const;

export default function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-driven active index: the wrapper is n * 100vh tall and the inner
  // section is sticky, so progress through the wrapper picks the service.
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const idx = Math.min(
            SERVICES.length - 1,
            Math.floor(self.progress * SERVICES.length),
          );
          setActive(idx);
        },
      });
    },
    { scope: wrapperRef },
  );

  const theme = THEMES[active % THEMES.length];

  return (
    <div
      id="services"
      ref={wrapperRef}
      className="relative w-full mt-16 md:mt-24"
      style={{ height: `${SERVICES.length * 100}vh` }}
      aria-label="Creative services"
    >
      <section
        className={`${theme.bg} ${theme.fg} sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center transition-colors duration-700 ease-in-out`}
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16 flex items-center gap-4 md:gap-8">
          {/* Intro copy */}
          <p className="shrink-0 max-w-35 md:max-w-55 text-sm md:text-base lg:text-lg font-medium leading-tight select-none">
            We bring ideas
            <br />
            to life through
          </p>

          {/* Arrow */}
          <ArrowRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="shrink-0 h-6 w-6 md:h-9 md:w-9 lg:h-12 lg:w-12"
          />

          {/* Radial spinning-wheel typography */}
          <div className="relative flex-1 h-[80vh] self-center">
            <h2 className="sr-only" aria-live="polite">
              {SERVICES[active]}
            </h2>

            {/* Wheel hub sits 4.5em left of this column so the words land
                right after the arrow regardless of viewport size. */}
            <ul
              aria-hidden="true"
              className="absolute top-1/2"
              style={{
                left: "-4.5em",
                fontSize: "clamp(26px, 6.4vw, 76px)",
              }}
            >
              {[
                ...SERVICES,
                ...SERVICES,
                ...SERVICES,
                ...SERVICES.toSpliced(3),
              ].map((label, i) => {
                // signed distance from the active spoke
                const d = i - active;
                const abs = Math.abs(d);

                const STEP = 15; // degrees between spokes
                const angle = d * STEP;

                let opacity = 0.35;
                let blur = 8;
                if (abs === 0) {
                  opacity = 1;
                  blur = 0;
                } else if (abs === 1) {
                  opacity = 0.85;
                  blur = 1.5;
                } else if (abs === 2) {
                  opacity = 0.55;
                  blur = 4;
                }

                return (
                  <li
                    key={i}
                    className="absolute left-0 top-0 whitespace-nowrap leading-none font-black tracking-tight transition-all duration-700 ease-out will-change-transform select-none"
                    style={{
                      // Pivot at the wheel hub, push out past the inner
                      // radius so words sit in the donut band.
                      transformOrigin: "0% 50%",
                      transform: `translateY(-50%) rotate(${angle}deg) translateX(4.5em)`,
                      opacity,
                      filter: `blur(${blur}px)`,
                      zIndex: 100 - abs,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
