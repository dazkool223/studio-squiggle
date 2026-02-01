"use client";

import { useState } from "react";
import { portfolioSections } from "./portfolio-data";
import { Button } from "@/components/ui/button";

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
  const section = (
    <section
      className={`h-50 w-full ${portfolioSections[activeSection].color}`}
    ></section>
  );
  return (
    <div className="overflow-x-hidden">
      <div className="flex lg:ml-10">{buttons}</div>
      {section}
    </div>
  );
};
