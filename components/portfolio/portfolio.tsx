"use client";

import { useState, useRef, useCallback } from "react";
import { portfolioSections } from "./portfolio-data";
import { FolderTabs } from "./folder-tabs";
import { PortfolioSection } from "./portfolio-section";
import { Button } from "@/components/ui/button";

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle scroll snap for mobile
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.offsetWidth * 0.85;
    const gap = 16;
    const newIndex = Math.round(scrollLeft / (itemWidth + gap));

    if (
      newIndex !== activeIndex &&
      newIndex >= 0 &&
      newIndex < portfolioSections.length
    ) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex]);

  // Scroll to section on tab click (desktop)
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const activeSection = portfolioSections[activeIndex];

  return (
    <section className="w-full min-h-screen bg-background md:py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="bg-portfolio-cream rounded-t-lg py-8 md:py-12 px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-foreground italic">
            Our Work
          </h2>
          <p className="mt-2 text-sm md:text-base text-foreground font-medium tracking-wide">
            Done. Delivered. Displayed.
          </p>
        </div>

        {/* Desktop Tabs - hidden on mobile */}
        <div className="hidden md:block">
          <FolderTabs
            sections={portfolioSections}
            activeIndex={activeIndex}
            onTabClick={handleTabClick}
          />
        </div>

        {/* Mobile: Horizontal Scroll Container - visible only on mobile */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {portfolioSections.map((section) => (
            <div
              key={section.id}
              className="flex-shrink-0 rounded-lg overflow-hidden"
              style={{ width: "85vw" }}
            >
              <PortfolioSection section={section} />
            </div>
          ))}
        </div>

        {/* Desktop: Active Section Content - hidden on mobile */}
        <div
          className={`hidden md:block transition-colors duration-300 rounded-b-lg overflow-hidden ${activeSection.contentColor}`}
        >
          <PortfolioSection section={activeSection} />
        </div>

        {/* See More Button */}
        <div className="flex justify-center md:justify-end mt-6">
          <Button
            variant="outline"
            className="rounded-full px-8 py-2 text-sm font-medium border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            SEE MORE
          </Button>
        </div>

        {/* Mobile Indicators - visible only on mobile */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {portfolioSections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveIndex(index);
                scrollContainerRef.current?.scrollTo({
                  left: index * (window.innerWidth * 0.85 + 16),
                  behavior: "smooth",
                });
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? "bg-foreground w-6" : "bg-foreground/30"
              }`}
              aria-label={`Go to ${section.label}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
