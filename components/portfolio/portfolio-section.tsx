"use client";

import type { PortfolioSection as PortfolioSectionType } from "./portfolio-data";

interface PortfolioSectionProps {
  section: PortfolioSectionType;
}

export function PortfolioSection({ section }: PortfolioSectionProps) {
  return (
    <div
      className={`relative w-full min-h-[500px] ${section.contentColor} md:min-w-0 min-w-[85vw] snap-center md:snap-align-none`}
    >
      {/* Mobile: Tab label - visible only on mobile */}
      <div className="p-4 md:hidden">
        <span
          className={`inline-block px-4 py-2 text-sm rounded-t-lg ${section.tabColor} text-foreground`}
        >
          {section.label}
        </span>
      </div>

      {/* Content area - minimalist for now */}
      <div className="p-8">
        {/* This area is intentionally minimal, focusing on the tab design */}
      </div>
    </div>
  );
}
