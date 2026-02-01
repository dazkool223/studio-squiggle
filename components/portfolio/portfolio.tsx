"use client";

import { useState } from "react";
import { portfolioSections } from "./portfolio-data";
import { Button } from "@/components/ui";

export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState(0);

  const buttons = portfolioSections.map((section) => (
    <Button
      key={section.id}
      variant={"folder"}
      className={`${section.color} flex-1`}
      onClick={() => setActiveSection(section.id - 1)}
    >
      {section.id === activeSection + 1 ? section.label : ""}
    </Button>
  ));

  return (
    <div>
      <div className="scalloped-box scalloped-bottom bg-portfolio-yellow min-h-20"></div>
      <div className="flex mt-10 lg:ml-10">{buttons}</div>
      <section
        className={`h-50 w-full ${portfolioSections[activeSection].color}`}
      ></section>
    </div>
  );
};
