"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Heart, Instagram, Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { NAV_LINKS, INSTAGRAM_URL } from "@/data/site";

// Geometry of the right-edge curve / panel (all in viewBox px).
const W = 340; // how far from the edge the SVG reaches (= viewBox width)
const PANEL_W = 320; // panel width once open
const PEEK = 180; // start bulging when the cursor is within this of the edge
const MAX_BULGE = 66; // how far the apex protrudes toward the page at rest
const OPEN_AT = 58; // cursor this close to the edge counts as a hover → open

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
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Live edge state, eased toward `target` every frame by the GSAP ticker.
  // Kept in refs (not React state) so the 60fps loop never re-renders.
  const stateRef = useRef({ apexY: 0, depth: 0, open: 0 });
  const targetRef = useRef({ apexY: 0, depth: 0, open: 0 });
  const hRef = useRef(0);
  const openedRef = useRef(false);

  const [open, setOpen] = useState(false); // only drives aria + link tabbing
  const [mobileOpen, setMobileOpen] = useState(false);

  // Open/close: nudge the animation target and the (cheap) aria state.
  const openMenu = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    targetRef.current.open = 1;
    setOpen(true);
  };
  const closeMenu = () => {
    if (!openedRef.current) return;
    openedRef.current = false;
    targetRef.current.open = 0;
    setOpen(false);
  };

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const easeA = reduce ? 1 : 0.18; // apex / depth follow
      const easeO = reduce ? 1 : 0.12; // open / close

      const syncSize = () => {
        hRef.current = window.innerHeight;
        svgRef.current?.setAttribute("viewBox", `0 0 ${W} ${hRef.current}`);
      };
      syncSize();
      stateRef.current.apexY = targetRef.current.apexY = hRef.current / 2;

      const f = (n: number) => n.toFixed(1);
      let settled = false;

      // Build the filled path: the region between a curved left boundary and
      // the right edge (x = W). Far from the apex the boundary hugs the edge;
      // near apexY it bulges left to `ax`, giving a single soft apex that
      // follows the cursor. As `open` grows the boundary slides left to form
      // the panel and the bulge flattens out.
      const render = () => {
        const st = stateRef.current;
        const tg = targetRef.current;
        st.apexY += (tg.apexY - st.apexY) * easeA;
        st.depth += (tg.depth - st.depth) * easeA;
        st.open += (tg.open - st.open) * easeO;

        const live =
          tg.depth > 0 || tg.open > 0 || st.depth > 0.05 || st.open > 0.002;
        if (!live) {
          if (!settled) {
            pathRef.current?.setAttribute("d", "");
            const nav = navRef.current;
            if (nav) {
              nav.style.opacity = "0";
              nav.style.pointerEvents = "none";
            }
            settled = true;
          }
          return;
        }
        settled = false;

        const h = hRef.current;
        const baseX = W - PANEL_W * st.open;
        const ax = baseX - st.depth * (1 - st.open);
        const ay = Math.max(0, Math.min(h, st.apexY));
        const d =
          `M ${W} 0 L ${f(baseX)} 0 ` +
          `C ${f(baseX)} ${f(ay * 0.5)} ${f(ax)} ${f(ay - ay * 0.32)} ${f(ax)} ${f(ay)} ` +
          `C ${f(ax)} ${f(ay + (h - ay) * 0.32)} ${f(baseX)} ${f(ay + (h - ay) * 0.5)} ${f(baseX)} ${f(h)} ` +
          `L ${W} ${f(h)} Z`;
        pathRef.current?.setAttribute("d", d);

        const nav = navRef.current;
        if (nav) {
          nav.style.opacity = String(st.open);
          nav.style.transform = `translateX(${(1 - st.open) * 28}px)`;
          nav.style.pointerEvents = st.open > 0.6 ? "auto" : "none";
        }
      };

      gsap.ticker.add(render);

      const onMove = (e: MouseEvent) => {
        if (window.innerWidth < 1024) return; // desktop only
        const distEdge = window.innerWidth - e.clientX;
        const tg = targetRef.current;
        tg.apexY = e.clientY;
        // Bulge grows from 0 (at PEEK) to MAX_BULGE (at the edge).
        const clamped = Math.max(OPEN_AT, Math.min(PEEK, distEdge));
        tg.depth =
          distEdge <= PEEK
            ? ((PEEK - clamped) / (PEEK - OPEN_AT)) * MAX_BULGE
            : 0;
        // Open when the cursor reaches the bulge; stay open until it leaves
        // the panel (hysteresis stops it flickering at the threshold).
        if (distEdge < OPEN_AT) openMenu();
        else if (distEdge > PANEL_W) closeMenu();
      };

      const onLeaveDoc = () => {
        closeMenu();
        targetRef.current.depth = 0;
      };

      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseleave", onLeaveDoc);
      window.addEventListener("resize", syncSize);

      return () => {
        gsap.ticker.remove(render);
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeaveDoc);
        window.removeEventListener("resize", syncSize);
      };
    },
    { scope },
  );

  return (
    <>
      {/* ---------- Desktop: magnetic black edge curve → fluid panel ---------- */}
      <div ref={scope} className="hidden lg:block">
        {/* The black curve. pointer-events-none: opening is driven by cursor
            proximity (below), and this never blocks the page underneath. */}
        <svg
          ref={svgRef}
          aria-hidden
          preserveAspectRatio="none"
          viewBox={`0 0 ${W} 800`}
          style={{ width: W }}
          className="pointer-events-none fixed right-0 top-0 z-40 h-screen"
        >
          <path ref={pathRef} fill="var(--foreground)" />
        </svg>

        {/* Panel content, fading/sliding in over the curve as it opens */}
        <div
          ref={navRef}
          aria-hidden={!open}
          style={{ width: PANEL_W, opacity: 0, pointerEvents: "none" }}
          className="fixed right-0 top-0 z-50 flex h-full flex-col items-start justify-between py-12 pl-16 pr-8 text-portfolio-cream"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            tabIndex={open ? 0 : -1}
            className="absolute right-6 top-6 cursor-pointer p-2 text-portfolio-cream"
          >
            <X className="h-6 w-6" />
          </button>

          <Image
            src="/logo.svg"
            alt="Studio.Squiggle"
            width={284}
            height={93}
            className="h-10 w-auto invert"
          />
          <MenuLinks open={open} onNavigate={closeMenu} />
          <a
            href={INSTAGRAM_URL}
            aria-label="Instagram"
            tabIndex={open ? 0 : -1}
            className="text-portfolio-cream transition-colors hover:text-portfolio-yellow"
          >
            <Instagram className="h-6 w-6" />
          </a>
        </div>

        {/* Keyboard affordance: invisible until focused, opens the menu */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onFocus={openMenu}
          className="pointer-events-none fixed right-3 top-1/2 z-50 -translate-y-1/2 rounded-full bg-foreground p-2 text-portfolio-cream opacity-0 transition-opacity focus-visible:pointer-events-auto focus-visible:opacity-100"
        >
          <Menu className="h-5 w-5" />
        </button>
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
