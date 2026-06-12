import Image from "next/image";
import { Project as ProjectType } from "./portfolio-data";

interface ProjectProps {
  project: ProjectType;
  onOpen: () => void;
}

// Card per the Figma Our Work frames: image on top, title and a short
// blurb below it. Clicking anywhere opens the project detail section.
export const Project = ({ project, onOpen }: ProjectProps) => {
  const { image, alt, title, description } = project;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <h3 className="text-white font-bold text-lg md:text-xl mt-3 drop-shadow-sm">
        {title}
      </h3>
      <p className="text-white/85 font-serif font-light text-xs md:text-sm mt-1">
        {description}
      </p>
    </button>
  );
};
