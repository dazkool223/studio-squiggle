"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { workCategories, Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectDetail } from "./project-detail";

const INITIAL_VISIBLE = 4;

// "Our Work" (Figma Desktop-25…28): folder tabs over a colored panel
// holding the project grid for the active category.
export const OurWork = () => {
  const scope = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

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

  // Re-animate the grid when the visible set changes
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
      className="flex flex-col py-12 md:py-16 scroll-mt-10"
    >
      <div className="work-heading text-center">
        <h2 className="font-light text-4xl md:text-5xl">Our Work</h2>
        <p className="font-serif font-light text-base md:text-xl mt-1">
          Done. Delivered. Displayed.
        </p>
      </div>

      <div className="px-2 md:px-8 mt-8">
        {/* Folder tabs sit on the panel's top edge */}
        <div
          role="tablist"
          aria-label="Work categories"
          className="relative z-10 flex items-end justify-between px-3 md:px-10"
        >
          {workCategories.map((tab, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectCategory(index)}
                style={{ zIndex: active ? 30 : 20 - index }}
                className={`folder-tab ${tab.tabClass} h-auto px-2 sm:px-4 md:px-7 pt-2 md:pt-3 pb-3 md:pb-6 origin-bottom transition-transform duration-500 cursor-pointer ${
                  active ? "scale-110" : "scale-100 hover:scale-105"
                }`}
              >
                <span className="text-[11px] sm:text-sm md:text-lg font-light px-1">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className={`${category.panelClass} transition-colors duration-500 w-full rounded-2xl md:rounded-3xl`}
        >
          <div className="px-4 md:px-10 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-10">
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
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="font-serif font-light text-sm lowercase border border-portfolio-cream text-portfolio-cream rounded-full px-6 py-2 cursor-pointer transition-colors hover:bg-portfolio-cream hover:text-foreground"
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
