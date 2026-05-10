"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  "Brand Strategy",
  "Character Design",
  "UI/UX Design",
  "Content Design",
  "Merch & Print Design",
  "Visual Storytelling",
  "Illustration",
] as const;

const THEMES = [
  { bg: "#84B6F4", fg: "#0b1220" },
  { bg: "#FF4F87", fg: "#ffffff" },
  { bg: "#181818", fg: "#ffffff" },
  { bg: "#F4CD31", fg: "#1a1300" },
] as const;

export default function HeroServices() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-driven active index. The wrapper is tall (n * 100vh) and the
  // inner section is sticky — scroll position within the wrapper picks
  // the active service.
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const idx = Math.min(
        SERVICES.length - 1,
        Math.floor(progress * SERVICES.length),
      );
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const theme = THEMES[active % THEMES.length];

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `${SERVICES.length * 100}vh` }}
      aria-label="Creative services"
    >
      <section
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center transition-colors duration-700 ease-in-out"
        style={{ backgroundColor: theme.bg, color: theme.fg }}
      >
        <div
          className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16
                     grid items-center
                     grid-cols-2
                     md:grid-cols-3
                     lg:grid-cols-3"
        >
          {/* Intro copy */}
          <p className="col-span-2 md:col-span-1 lg:col-span-1 max-w-35 md:max-w-55 text-sm md:text-base lg:text-lg font-medium leading-tight select-none">
            We bring ideas
            <br />
            to life through
          </p>

          {/* Arrow */}
          <div className="flex ">
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="h-6 w-6 md:h-9 md:w-9 lg:h-12 lg:w-12"
            />
          </div>

          {/* Diagonal infinite-carousel typography */}
          {/* Radial spinning-wheel typography */}
          <div className="relative h-[80vh] -ml-[16em] self-stretch">
            <h2 className="sr-only" aria-live="polite">
              {SERVICES[active]}
            </h2>

            {/* Wheel hub anchored at the arrow's vertical center, words radiate to the right */}
            <ul
              aria-hidden="true"
              className="absolute left-0 top-1/2 text-white"
              style={{ fontSize: "clamp(32px, 6.4vw, 76px)" }}
            >
              {[
                ...SERVICES,
                ...SERVICES,
                ...SERVICES,
                ...SERVICES.toSpliced(3),
              ].map((label, i) => {
                const n = SERVICES.length;
                // shortest signed distance on the ring → infinite illusion
                let d = i - active;
                // d = ((d % n) + n) % n;
                // if (d > n / 2) d -= n;
                const abs = Math.abs(d);

                // Spoke angle. Negative d → above (counter-clockwise tilt up).
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
                      // Pivot at the left edge (wheel hub). Push slightly out from
                      // the hub so words don't overlap at the center, then rotate.
                      transformOrigin: "0% 50%",
                      // Donut: rotate around hub, then push out past the inner
                      // radius so text sits in the donut band (inner → outer).
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
