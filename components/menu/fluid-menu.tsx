"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "How We Roll", href: "#roll" },
  { label: "Our Work", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// Wavy left edge of the menu, drawn as an SVG path so GSAP can morph it.
const CURVE_REST =
  "M64 0 L40 0 C20 150 56 260 40 400 C24 540 60 660 40 800 L64 800 Z";
const CURVE_OPEN =
  "M64 0 L26 0 C-4 150 44 260 22 400 C0 540 48 660 26 800 L64 800 Z";

export const FluidMenu = () => {
  const scope = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      tl.to(".fluid-panel", {
        width: 300,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          ".fluid-curve-path",
          { attr: { d: CURVE_OPEN }, duration: 0.6, ease: "power3.out" },
          "<",
        )
        .fromTo(
          ".fluid-link",
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.35",
        );
      tlRef.current = tl;
    },
    { scope },
  );

  const expand = () => {
    setOpen(true);
    tlRef.current?.play();
  };
  const collapse = () => {
    setOpen(false);
    tlRef.current?.reverse();
  };

  return (
    <div
      ref={scope}
      className="hidden lg:block fixed inset-y-0 right-0 z-50"
      onMouseEnter={expand}
      onMouseLeave={collapse}
    >
      {/* Invisible hot zone so the menu starts opening as the cursor nears
          the edge, per the designer's note in Figma. */}
      <div className="absolute inset-y-0 right-0 w-24" />

      <div className="fluid-panel relative h-full w-14 bg-foreground">
        {/* Wavy edge bleeding out to the left of the panel */}
        <svg
          aria-hidden
          viewBox="0 0 64 800"
          preserveAspectRatio="none"
          className="absolute left-0 top-0 h-full w-16 -translate-x-[63px]"
        >
          <path className="fluid-curve-path" d={CURVE_REST} fill="#222222" />
        </svg>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={open ? collapse : expand}
          onFocus={expand}
          className="absolute top-1/2 -translate-y-1/2 -left-2 text-portfolio-cream p-2 cursor-pointer"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <nav
          aria-hidden={!open}
          className="h-full flex flex-col justify-center items-start gap-6 pl-14 pr-6 overflow-hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={collapse}
              className="fluid-link opacity-0 whitespace-nowrap text-portfolio-cream text-2xl font-light hover:text-portfolio-yellow hover:rotate-2 transition-[color,rotate] duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
