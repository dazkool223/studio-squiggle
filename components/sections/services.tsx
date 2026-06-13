"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SERVICES } from "@/data/site";

// Angular gap between two neighbouring services on the wheel rim.
const STEP = 17;
// Total rotation the wheel sweeps from first → last service.
const SWEEP = STEP * (SERVICES.length - 1);

// "What we offer" (Figma Desktop-43…46): the services sit on the rim of a big
// wheel pivoting off the left edge. As you scroll, the section pins and the
// wheel spins, bringing one service at a time into the slot beside the arrow.
// The panel color morphs to match whichever service is active.
export const Services = () => {
  const scope = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const wheel = wheelRef.current;
      if (!wheel) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Reduced motion: skip the pin/scrub, leave the middle service centered.
      if (reduce) {
        const mid = Math.floor(SERVICES.length / 2);
        wheel.style.setProperty("--rot", `${-mid * STEP}deg`);
        setActive(mid);
        return;
      }

      const st = ScrollTrigger.create({
        trigger: scope.current,
        start: "top top",
        end: () => "+=" + window.innerHeight * (SERVICES.length - 1),
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const rot = -self.progress * SWEEP;
          wheel.style.setProperty("--rot", `${rot}deg`);
          const idx = Math.round(self.progress * (SERVICES.length - 1));
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });

      return () => st.kill();
    },
    { scope },
  );

  const theme = SERVICES[active];
  const fg = theme.dark ? "var(--portfolio-cream)" : "var(--foreground)";
  const muted = theme.dark ? "rgba(255,248,221,0.32)" : "rgba(34,34,34,0.28)";

  // Depth-of-field: the active word is in focus, every other word softens the
  // further it sits from the active slot — blur grows and opacity drops with
  // angular distance, so the wheel reads as a radial focus falloff.
  const falloff = (i: number) => {
    const d = Math.abs(i - active);
    if (d === 0) return { opacity: 1, blur: 0 };
    return {
      opacity: Math.max(0.28, 0.78 - (d - 1) * 0.16),
      blur: Math.min(8, d * 1.6),
    };
  };

  return (
    <section
      id="services"
      ref={scope}
      className="services-wheel relative h-svh overflow-hidden scroll-mt-0 transition-colors duration-700"
      style={
        {
          backgroundColor: theme.bg,
          "--svc-fg": fg,
          "--svc-muted": muted,
        } as React.CSSProperties
      }
    >
      {/* Section eyebrow */}
      <span
        className="absolute top-5 left-5 md:top-7 md:left-10 z-20 font-serif font-light text-xs md:text-sm uppercase tracking-widest"
        style={{ color: "var(--svc-muted)" }}
      >
        What we offer
      </span>

      {/* The pitch — top-left on mobile, parked beside the active slot on
          desktop where it stacks above the arrow. */}
      <div className="absolute z-20 top-16 left-6 md:top-1/2 md:-translate-y-1/2 md:left-12 lg:left-20 max-w-[15rem] md:max-w-xs">
        <p
          className="font-bold text-xl md:text-2xl leading-snug"
          style={{ color: "var(--svc-fg)" }}
        >
          We bring ideas
          <br />
          to life through
        </p>
        <ArrowRight
          aria-hidden
          strokeWidth={2}
          className="hidden md:block mt-3 h-9 w-9"
          style={{ color: "var(--svc-fg)" }}
        />
      </div>

      {/* Mobile arrow: sits centered at the left, pointing at the active word */}
      <ArrowRight
        aria-hidden
        strokeWidth={2}
        className="md:hidden absolute z-20 left-6 top-1/2 -translate-y-1/2 h-7 w-7"
        style={{ color: "var(--svc-fg)" }}
      />

      {/* The wheel — pivot sits off the left edge, words fan out to the right */}
      <div
        ref={wheelRef}
        className="services-pivot absolute left-0 top-1/2 h-0 w-0"
        style={{ transform: "translateY(-50%) rotate(var(--rot, 0deg))" }}
      >
        {SERVICES.map((service, i) => {
          const { opacity, blur } = falloff(i);
          return (
            <span
              key={service.name}
              aria-hidden
              className="service-spoke absolute left-0 top-0 flex h-0 items-center whitespace-nowrap font-bold transition-[opacity,filter,font-size] duration-300"
              style={{
                transformOrigin: "left center",
                transform: `rotate(${i * STEP}deg)`,
                paddingLeft: "var(--svc-radius)",
                color: "var(--svc-fg)",
                fontSize:
                  i === active ? "var(--svc-size-active)" : "var(--svc-size)",
                opacity,
                filter: blur ? `blur(${blur}px)` : "none",
              }}
            >
              {service.name}
            </span>
          );
        })}
      </div>

      {/* Accessible, non-visual list so the services aren't lost to the wheel */}
      <ul className="sr-only">
        {SERVICES.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>
    </section>
  );
};
