"use client";

import { useState } from "react";
import { portfolioSections, PortfolioSection } from "./portfolio-data";
import { Button } from "@/components/ui";
import { Project } from "./project";

export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState(0);

  const isActiveSection = (section: PortfolioSection) => {
    return section.id === activeSection + 1;
  };

  const buttons = portfolioSections.map((section) => (
    <Button
      key={section.id}
      variant={"folder"}
      // do something here which increase the height of the selected section
      className={`${section.color} flex-1 ${isActiveSection(section) ? "" : ""}`}
      onClick={() => setActiveSection(section.id - 1)}
    >
      {isActiveSection(section) ? section.label : ""}
    </Button>
  ));

  return (
    <section className="flex flex-col mt-10">
      <h2 className="font-light text-4xl text-center">Our Work</h2>
      <h3 className="font-serif font-light text-xl text-center">
        Done. Delivered. Displayed.
      </h3>
      <div className="flex mt-10 lg:ml-10">{buttons}</div>
      <section
        className={`${portfolioSections[activeSection].color} container mx-auto px-4 py-8`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioSections[activeSection].projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </section>
    </section>
  );
};
