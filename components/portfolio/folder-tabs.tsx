"use client";

import { Button } from "../ui/button";
import type { PortfolioSection } from "./portfolio-data";

interface FolderTabsProps {
  sections: PortfolioSection[];
  activeIndex: number;
  onTabClick: (index: number) => void;
}

export function FolderTabs({
  sections,
  activeIndex,
  onTabClick,
}: FolderTabsProps) {
  return (
    <div className="hidden md:flex items-start relative">
      {sections.map((section, index) => {
        const isActive = index === activeIndex;

        // Diagonal positioning: each tab starts progressively higher
        const diagonalOffset = index * 12; // 12px higher per tab

        // Active tab moves DOWN to come forward, inactive tabs stay UP (behind)
        const translateY = isActive ? diagonalOffset + 32 : diagonalOffset;

        // Z-index: active tab highest, others stack behind
        const zIndex = isActive ? 50 : 40 - index;

        // All tabs maintain consistent height
        const height = 64; // 64px height for all tabs

        return (
          <Button
            key={section.id}
            onClick={() => onTabClick(index)}
            className={`
              ${section.tabColor}
              px-6 
              rounded-tl-2xl rounded-tr-2xl
              transition-all duration-500 ease-out
              flex items-center justify-center
              font-sans text-base font-medium
              min-w-45
              -mr-4
              text-gray-900
              hover:brightness-95
            `}
            style={{
              zIndex,
              transform: `translateY(${translateY}px)`,
              height: `${height}px`,
              clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
            }}
            aria-selected={isActive}
            role="tab"
          >
            <span className="relative z-10 whitespace-nowrap">
              {section.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
