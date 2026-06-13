"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Heart, Instagram, Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { NAV_LINKS, INSTAGRAM_URL } from "@/data/site";

// Wavy left edge of the desktop menu, morphed by GSAP as it opens —
// the designer asked for the menu to slide out "fluidly smoothly"
// as the cursor approaches the right edge.
const CURVE_REST = "M64 0 L40 0 C20 150 56 260 40 400 C24 540 60 660 40 800 L64 800 Z";
const CURVE_OPEN = "M64 0 L26 0 C-4 150 44 260 22 400 C0 540 48 660 26 800 L64 800 Z";

const MenuLinks = ({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) => (
  <ul className="flex flex-col gap-6">
    {NAV_LINKS.map((link) => (
      <li key={link.href}>
        <a
          href={link.href}
          tabIndex={open ? 0 : -1}
          onClick={onNavigate}
          className="fluid-link group flex items-center gap-3 whitespace-nowrap text-portfolio-cream text-2xl font-light transition-colors duration-200 hover:text-portfolio-yellow"
        >
          {/* Heart bullet pops in on hover (Desktop-16) */}
          <Heart
            aria-hidden
            className="h-4 w-4 fill-current opacity-0 -translate-x-1 scale-50 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100"
          />
          {link.label}
        </a>
      </li>
    ))}
  </ul>
);

export const FluidMenu = () => {
  const scope = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      tl.to(".fluid-panel", { width: 320, duration: 0.6, ease: "power3.out" })
        .to(
          ".fluid-curve-path",
          { attr: { d: CURVE_OPEN }, duration: 0.6, ease: "power3.out" },
          "<",
        )
        .fromTo(
          ".fluid-item",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" },
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
    <>
      {/* ---------- Desktop: fluid right-edge panel ---------- */}
      <div
        ref={scope}
        className="hidden lg:block fixed inset-y-0 right-0 z-50"
        onMouseEnter={expand}
        onMouseLeave={collapse}
      >
        {/* Hot zone so the menu starts opening as the cursor nears the edge */}
        <div className="absolute inset-y-0 right-0 w-24" />

        <div className="fluid-panel relative h-full w-14 bg-foreground">
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
            aria-label="Site navigation"
            className="h-full flex flex-col justify-between items-start pl-16 pr-8 py-12 overflow-hidden"
          >
            <Image
              src="/logo.svg"
              alt="Studio.Squiggle"
              width={284}
              height={93}
              className="fluid-item h-10 w-auto invert opacity-0"
            />
            <div className="fluid-item opacity-0">
              <MenuLinks open={open} onNavigate={collapse} />
            </div>
            <a
              href={INSTAGRAM_URL}
              aria-label="Instagram"
              tabIndex={open ? 0 : -1}
              className="fluid-item opacity-0 text-portfolio-cream hover:text-portfolio-yellow transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </nav>
        </div>
      </div>

      {/* ---------- Mobile: hamburger + full-screen overlay ---------- */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 rounded-full bg-foreground text-portfolio-cream p-3"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-foreground flex flex-col justify-between px-8 py-10">
          <div className="flex items-center justify-between">
            <Image
              src="/logo.svg"
              alt="Studio.Squiggle"
              width={284}
              height={93}
              className="h-10 w-auto invert"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="text-portfolio-cream p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <MenuLinks open onNavigate={() => setMobileOpen(false)} />
          <a
            href={INSTAGRAM_URL}
            aria-label="Instagram"
            className="text-portfolio-cream"
          >
            <Instagram className="h-6 w-6" />
          </a>
        </div>
      )}
    </>
  );
};
