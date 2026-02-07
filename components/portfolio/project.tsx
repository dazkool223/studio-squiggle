import Image from "next/image";
import { Project as ProjectType } from "./portfolio-data";

export const Project = (props: ProjectType) => {
  const { image, alt, title, description } = props;
  return (
    <div
      className={`relative w-full h-96 overflow-hidden rounded-xl cursor-pointer group`}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Overlay with Title and Description */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-transparent flex flex-col justify-end p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white text-2xl font-bold mb-3 drop-shadow-lg">
          {title}
        </h3>
        <p className="text-white/90 text-base leading-relaxed drop-shadow-md">
          {description}
        </p>
      </div>
    </div>
  );
};
