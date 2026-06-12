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
      style={{ zIndex: isActiveSection(section) ? 6 : 5 - index }}
      className={`${section.color} flex-1 min-w-0 transition-transform duration-500 cursor-pointer ${
        isActiveSection(section) ? "scale-110 px-4 md:px-6" : "scale-100"
      }`}
      onClick={() => setActiveSection(section.id - 1)}
    >
      <span className="truncate text-xs md:text-sm">
        {isActiveSection(section) ? section.label : ""}
      </span>
    </Button>
  ));

  return (
    <section ref={scope} className="flex flex-col mt-16 md:mt-24">
      <div className="portfolio-heading">
        <h2 className="font-light text-4xl md:text-5xl text-center">
          Our Work
        </h2>
        <h3 className="font-serif font-light text-xl text-center mt-1">
          Done. Delivered. Displayed.
        </h3>
      </div>
      <div className="flex mt-10 px-4 md:px-10 max-w-5xl w-full mx-auto">
        {buttons}
      </div>
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
