"use client";

import Image from "next/image";
import type { Project } from "./portfolio-data";

interface ProjectCardProps {
  project: Project;
  borderColor?: string;
}

export function ProjectCard({
  project,
  borderColor = "border-blue-600",
}: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className={`relative aspect-square overflow-hidden border-4 ${borderColor}`}
      >
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="text-xs md:text-sm text-foreground/80 leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
}
