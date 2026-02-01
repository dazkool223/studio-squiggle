"use client";

import { useState } from "react";
import { portfolioSections } from "./portfolio-data";
import { Button } from "@/components/ui/button";

export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState(0);

  const buttons = portfolioSections.map((section) => (
    <Button
      key={section.id}
      className={`${section.color}`}
      onClick={() => setActiveSection(section.id - 1)}
    ></Button>
  ));
  const section = (
    <section
      className={`h-50 w-full ${portfolioSections[activeSection].color}`}
    ></section>
  );
  return (
    <>
      <div className="flex gap-1">{buttons}</div>
      {section}
    </>
  );
};
