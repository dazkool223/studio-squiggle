"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { workCategories, Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectDetail } from "./project-detail";

const INITIAL_VISIBLE = 4;

// Folder-tab geometry (px). A symmetric trapezoid — narrower top, wider
// bottom — with rounded top corners, drawn as an SVG path so it scales to any
// label width without distorting the corners.
const TAB_H = 48; // tab height
const SLANT = 18; // horizontal inset of the top edge on each side
const RADIUS = 12; // top-corner radius
const OVERLAP = 16; // how far each tab tucks under its left neighbour
const PANEL_RISE = 18; // how far the panel rises over the tab row

// Rounded-trapezoid path for a tab `w` px wide and `TAB_H` px tall.
const tabPath = (w: number) => {
  const len = Math.hypot(SLANT, TAB_H);
  const ux = (SLANT / len) * RADIUS;
  const uy = (TAB_H / len) * RADIUS;
  const f = (n: number) => n.toFixed(1);
  // bottom-left → up left edge → round TL corner → top edge → round TR corner
  // → down right edge → bottom-right → close
  return [
    `M0 ${TAB_H}`,
    `L${f(SLANT - ux)} ${f(uy)}`,
    `Q${SLANT} 0 ${f(SLANT + RADIUS)} 0`,
    `L${f(w - SLANT - RADIUS)} 0`,
    `Q${f(w - SLANT)} 0 ${f(w - SLANT + ux)} ${f(uy)}`,
    `L${w} ${TAB_H}`,
    "Z",
  ].join(" ");
};

// "Our Work" (Figma Desktop-25…28): a file folder where each category is a
// tab. Clicking a tab pulls that file to the front — the folder body recolors
// and shows that category's project grid.
export const OurWork = () => {
  const scope = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Measure each tab so the SVG path can be drawn to its exact width.
  useLayoutEffect(() => {
    const measure = () =>
      setTabWidths(tabRefs.current.map((el) => el?.offsetWidth ?? 0));
    measure();
    // Re-measure once webfonts settle — label widths shift on font swap.
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const selectCategory = (index: number) => {
    setActiveIndex(index);
    setOpenProject(null);
    setShowAll(false);
  };

  useGSAP(
    () => {
      gsap.from(".work-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
      });
    },
    { scope },
  );

  // Re-stagger the cards whenever the active file or "see more" changes.
  useGSAP(
    () => {
      gsap.from(".work-project", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope, dependencies: [activeIndex, showAll] },
  );

  useGSAP(
    () => {
      if (!openProject) return;
      gsap.from(".project-detail", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      document
        .querySelector(".project-detail")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    },
    { scope, dependencies: [openProject] },
  );

  const category = workCategories[activeIndex];
  const visibleProjects = showAll
    ? category.projects
    : category.projects.slice(0, INITIAL_VISIBLE);

  return (
    <section
      id="work"
      ref={scope}
      className="flex flex-col py-12 md:py-20 scroll-mt-10"
    >
      <div className="work-heading text-center">
        <h2 className="font-light text-4xl md:text-5xl">Our Work</h2>
        <p className="font-serif font-light text-base md:text-xl mt-1">
          Done. Delivered. Displayed.
        </p>
      </div>

      <div className="relative mx-auto mt-8 w-full max-w-6xl px-3 md:px-8">
        {/* Folder tabs — each is the rounded-trapezoid top of a "file" and
            shares its file's color. They overlap left-on-top; the panel below
            rises over the row so non-active tabs only peek up behind it, while
            the active tab stays whole and continuous with its body. */}
        <div
          role="tablist"
          aria-label="Work categories"
          className="relative flex items-end pl-3 md:pl-8"
        >
          {workCategories.map((tab, index) => {
            const active = index === activeIndex;
            const w = tabWidths[index] || 120;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="work-panel"
                onClick={() => selectCategory(index)}
                style={{
                  height: TAB_H,
                  marginLeft: index === 0 ? 0 : -OVERLAP,
                  // Active file is frontmost (above the panel); the rest cascade
                  // left-on-top and sit behind the panel.
                  zIndex: active ? 50 : workCategories.length - index,
                }}
                className={`${tab.tabClass} relative cursor-pointer transition-transform duration-300 ${
                  active ? "" : "hover:-translate-y-0.5"
                }`}
              >
                <svg
                  aria-hidden
                  viewBox={`0 0 ${w} ${TAB_H}`}
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full drop-shadow-sm"
                >
                  <path d={tabPath(w)} fill={tab.color} />
                </svg>
                <span className="relative flex h-full items-center justify-center whitespace-nowrap px-6 pt-1 text-[11px] font-light sm:text-sm md:px-8 md:text-lg">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Folder body — same color as the active file's tab, rising over the
            tab row so it reads as the front folder the active tab belongs to. */}
        <div
          id="work-panel"
          role="tabpanel"
          style={{ marginTop: -PANEL_RISE, zIndex: 20 }}
          className={`${category.panelClass} relative w-full rounded-2xl transition-colors duration-500 md:rounded-3xl`}
        >
          <div className="px-4 py-8 md:px-10 md:py-12">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-10">
              {visibleProjects.map((project) => (
                <div key={project.id} className="work-project">
                  <ProjectCard
                    project={project}
                    cardClass={category.cardClass}
                    onOpen={() => setOpenProject(project)}
                  />
                </div>
              ))}
            </div>

            {openProject && (
              <ProjectDetail
                project={openProject}
                category={category.label}
                onClose={() => setOpenProject(null)}
              />
            )}

            {!showAll && category.projects.length > INITIAL_VISIBLE && (
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="cursor-pointer rounded-full border border-portfolio-cream px-6 py-2 font-serif text-sm font-light lowercase text-portfolio-cream transition-colors hover:bg-portfolio-cream hover:text-foreground"
                >
                  see more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
