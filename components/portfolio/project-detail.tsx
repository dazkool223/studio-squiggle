import Image from "next/image";
import { X } from "lucide-react";
import { Project } from "./portfolio-data";

interface ProjectDetailProps {
  project: Project;
  category: string;
  onClose: () => void;
}

// Detail section that opens inside the Our Work panel when a project
// card is clicked.
export const ProjectDetail = ({
  project,
  category,
  onClose,
}: ProjectDetailProps) => {
  return (
    <div className="project-detail relative bg-portfolio-cream text-foreground rounded-2xl p-6 md:p-10 mt-8">
      <button
        type="button"
        aria-label="Close project details"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full border border-foreground p-2 cursor-pointer hover:bg-foreground hover:text-portfolio-cream transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="font-serif font-light text-xs uppercase tracking-widest opacity-70">
            {category}
          </p>
          <h3 className="font-light text-3xl md:text-4xl mt-2">
            {project.title}
          </h3>
          <p className="font-serif font-light text-sm md:text-base leading-relaxed mt-4">
            {project.details}
          </p>
        </div>
      </div>
    </div>
  );
};
