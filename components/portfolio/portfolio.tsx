"use client";

import { useRef, useState } from "react";
import {
  portfolioSections,
  PortfolioSection,
  Project as ProjectType,
} from "./portfolio-data";
import { Button } from "@/components/ui";
import { Project } from "./project";
import { ProjectDetail } from "./project-detail";
import { gsap, useGSAP } from "@/lib/gsap";

const INITIAL_VISIBLE = 4;

export const Portfolio = () => {
  const scope = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [openProject, setOpenProject] = useState<ProjectType | null>(null);
  const [showAll, setShowAll] = useState(false);

  const isActiveSection = (section: PortfolioSection) => {
    return section.id === activeSection + 1;
  };

  const selectSection = (index: number) => {
    setActiveSection(index);
    setOpenProject(null);
    setShowAll(false);
  };

  // Reveal the whole section on scroll.
  useGSAP(
    () => {
      gsap.from(".portfolio-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 80%",
        },
      });
    },
    { scope },
  );

  // Animate projects in whenever the visible set changes.
  useGSAP(
    () => {
      gsap.from(".portfolio-project", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope, dependencies: [activeSection, showAll] },
  );

  // Slide the detail section open when a project is clicked.
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

  const section = portfolioSections[activeSection];
  const visibleProjects = showAll
    ? section.projects
    : section.projects.slice(0, INITIAL_VISIBLE);

  const buttons = portfolioSections.map((tabSection, index) => (
    <Button
      key={tabSection.id}
      variant={"folder"}
      style={{ zIndex: isActiveSection(tabSection) ? 30 : 20 - index }}
      className={`${tabSection.color} h-auto px-1 sm:px-3 md:px-6 pt-2 md:pt-3 pb-3 md:pb-5 origin-bottom transition-transform duration-500 cursor-pointer ${
        isActiveSection(tabSection) ? "scale-110" : "scale-100 hover:scale-105"
      }`}
      onClick={() => selectSection(tabSection.id - 1)}
    >
      <span className="text-[11px] sm:text-sm md:text-lg font-light px-1">
        {tabSection.label}
      </span>
    </Button>
  ));

  return (
    <section
      id="work"
      ref={scope}
      className="flex flex-col mt-16 md:mt-24 scroll-mt-10"
    >
      <div className="portfolio-heading text-center">
        <h2 className="font-light text-4xl md:text-5xl">Our Work</h2>
        <h3 className="font-serif font-light text-base md:text-xl mt-1">
          Done. Delivered. Displayed.
        </h3>
      </div>
      <div className="px-2 md:px-8 mt-8">
        {/* Tab row sits on the panel's top edge */}
        <div className="relative z-10 flex items-end justify-between px-3 md:px-10">
          {buttons}
        </div>
        <section
          className={`${section.color} transition-colors duration-500 w-full rounded-2xl md:rounded-3xl`}
        >
          <div className="px-4 md:px-10 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-10">
              {visibleProjects.map((project) => (
                <div key={project.id} className="portfolio-project">
                  <Project
                    project={project}
                    onOpen={() => setOpenProject(project)}
                  />
                </div>
              ))}
            </div>

            {openProject && (
              <ProjectDetail
                project={openProject}
                category={section.label}
                onClose={() => setOpenProject(null)}
              />
            )}

            {!showAll && section.projects.length > INITIAL_VISIBLE && (
              <div className="flex justify-end mt-8">
                <Button
                  variant={"ghost"}
                  className="font-serif font-light lowercase border border-portfolio-cream text-portfolio-cream rounded-full px-6 cursor-pointer hover:bg-portfolio-cream hover:text-foreground"
                  onClick={() => setShowAll(true)}
                >
                  see more
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};
