import Image from "next/image";
import { Project as ProjectType } from "./portfolio-data";

export const Project = (props: ProjectType) => {
  const { image, alt, title, description } = props;
  return (
    <div
      className={`relative w-full h-72 md:h-96 overflow-hidden rounded-xl cursor-pointer group`}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Overlay: title always visible, description revealed on hover */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6 md:p-8 pt-16">
        <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
          {title}
        </h3>
        <p className="text-white/90 font-serif text-sm md:text-base leading-relaxed drop-shadow-md max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-3 transition-all duration-300 overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
};
