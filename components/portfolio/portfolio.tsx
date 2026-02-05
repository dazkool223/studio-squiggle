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
    <section className="flex flex-col mt-10">
      <h2 className="font-light text-4xl text-center">Our Work</h2>
      <h3 className="font-serif font-light text-xl text-center">
        Done. Delivered. Displayed.
      </h3>
      <div className="flex mt-10 lg:ml-10">{buttons}</div>
      <section
        className={`h-50 w-full ${portfolioSections[activeSection].color}`}
      ></section>
    </section>
  );
};
