import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  /** Colored card behind the artwork, varies per category */
  cardClass: string;
}

// Project card per the Our Work frames: artwork on a colored rounded
// card, title and blurb below. The whole card links to the project's
// detail page (/work/<slug>).
export const ProjectCard = ({ project, cardClass }: ProjectCardProps) => (
  <Link href={`/work/${project.slug}`} className="group block w-full text-left">
    <div
      className={`${cardClass} relative w-full aspect-[4/3] overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.02]`}
    >
      <Image
        src={project.thumbnail}
        alt={project.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
    <h3 className="text-portfolio-cream font-bold text-lg md:text-xl mt-3 drop-shadow-sm">
      {project.title}
    </h3>
    <p className="text-portfolio-cream/85 font-serif font-light text-xs md:text-sm mt-1">
      {project.description}
    </p>
  </Link>
);
