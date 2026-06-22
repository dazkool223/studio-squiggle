"use client";

import { useState } from "react";
import { workCategories } from "@/data/projects";
import { WorkFolderContents } from "./work-folder-contents";

// Expanding-file-folder layout (per reference): the content lives in one wide
// pocket; the tabs are small rounded flaps cut at staggered positions along its
// top edge — a tab and its pocket are separate things. Selecting a tab dips it
// down to connect with the pocket and brings that section's projects forward;
// the other tabs peek from their own positions, tucked behind the pocket.
const TAB_H = 56; // height of a tab flap
const RISE = 24; // how far the pocket rises over the inactive tab bottoms
const DOWN = 12; // how far the active tab dips down into the pocket

export function OurWorkTabs() {
  const [active, setActive] = useState(0);
  const cat = workCategories[active];

  return (
    <div className="relative isolate mx-auto w-full max-w-5xl px-3 md:px-6">
      {/* Tab flaps — spread across the top edge at staggered positions */}
      <div
        className="flex items-end justify-between gap-2 px-5 md:px-10"
        style={{ height: TAB_H + DOWN }}
        role="tablist"
        aria-label="Work categories"
      >
        {workCategories.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              style={{
                height: TAB_H,
                background: c.color,
                transform: isActive
                  ? `translateY(${DOWN}px) scale(1.04)`
                  : "none",
                transformOrigin: "bottom center",
                zIndex: isActive ? 40 : 10,
                filter: isActive ? "none" : "brightness(0.95)",
                transition:
                  "transform .4s cubic-bezier(.34,1.1,.4,1), filter .3s ease",
              }}
              className="flex items-start justify-center rounded-t-[20px] px-4 pt-2.5 md:px-7 text-foreground cursor-pointer shadow-[0_-2px_8px_rgba(34,34,34,0.1)]"
            >
              <span className="whitespace-nowrap font-light text-[11px] sm:text-sm md:text-base">
                {c.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* The pocket — one wide content surface, separate from the tab flaps */}
      <div
        key={active}
        className="work-fade-in relative z-20 rounded-2xl md:rounded-3xl"
        style={{ background: cat.color, marginTop: -RISE }}
      >
        <WorkFolderContents category={cat} />
      </div>
    </div>
  );
}
