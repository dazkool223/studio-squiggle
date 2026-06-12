"use client";

import { useRef, useState } from "react";
import { portfolioSections, PortfolioSection } from "./portfolio-data";
import { Button } from "@/components/ui";
import { Project } from "./project";
import { gsap, useGSAP } from "@/lib/gsap";

export const Portfolio = () => {
  const scope = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const isActiveSection = (section: PortfolioSection) => {
    return section.id === activeSection + 1;
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

  // Animate projects in whenever the active tab changes.
  useGSAP(
    () => {
      gsap.from(".portfolio-project", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
      });
    },
    { scope, dependencies: [activeSection] },
  );

  const buttons = portfolioSections.map((section, index) => (
    <Button
      key={section.id}
      variant={"folder"}
      style={{ zIndex: isActiveSection(section) ? 30 : 20 - index }}
      className={`${section.color} h-auto px-1 sm:px-3 md:px-6 pt-2 md:pt-3 pb-4 md:pb-7 origin-bottom transition-transform duration-500 cursor-pointer ${
        isActiveSection(section) ? "scale-110" : "scale-100 hover:scale-105"
      }`}
      onClick={() => setActiveSection(section.id - 1)}
    >
      <span className="text-[11px] sm:text-sm md:text-lg font-light px-1">
        {section.label}
      </span>
    </Button>
  ));

  // Non-active folder sheets peek out as thin strips under the tab row,
  // matching the layered-folders look in the Figma (Desktop-22/23).
  const strips = portfolioSections
    .filter((section) => !isActiveSection(section))
    .sort((a, b) => b.id - a.id)
    .map((section) => (
      <div
        key={section.id}
        className={`${section.color} h-1.5 md:h-2 w-full transition-colors duration-300`}
      />
    ));

  return (
    <section
      id="work"
      ref={scope}
      className="flex flex-col mt-16 md:mt-24 scroll-mt-10"
    >
      <h2 className="portfolio-heading font-light text-4xl md:text-5xl px-6 md:px-12">
        Our Work
      </h2>
      {/* Tab row overlaps the strips below so each folder tab appears to
          belong to its sheet in the stack. */}
      <div className="relative z-10 flex items-end justify-between mt-8 px-2 md:px-8 -mb-[18px] md:-mb-[24px]">
        {buttons}
      </div>
      <div>{strips}</div>
      <section
        className={`${portfolioSections[activeSection].color} transition-colors duration-500 w-full`}
      >
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioSections[activeSection].projects.map((project) => (
              <div key={project.id} className="portfolio-project">
                <Project {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
