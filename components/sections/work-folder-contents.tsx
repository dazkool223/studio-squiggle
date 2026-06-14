"use client";

import { useState } from "react";
import { WorkCategory, Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { ProjectDetail } from "./project-detail";

// The inside of an open file: that category's project grid, with the same
// click-to-open detail view the section already uses. Shared by both folder
// layouts so the only thing that differs between them is the folder/shuffle.
export function WorkFolderContents({ category }: { category: WorkCategory }) {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <div className="px-5 py-5 md:px-7">
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        {category.projects.slice(0, 4).map((project) => (
          <div key={project.id} className="work-project">
            <ProjectCard
              project={project}
              cardClass={category.cardClass}
              onOpen={() => setOpenProject(project)}
            />
          </div>
        ))}
      </div>

      {openProject && (
        <ProjectDetail
          project={openProject}
          category={category.label}
          onClose={() => setOpenProject(null)}
        />
      )}
    </div>
  );
}
