import Image from "next/image";

interface PolaroidProps {
  image: string;
  alt: string;
}

export const Polaroid = ({ image, alt }: PolaroidProps) => {
  return (
    <div className="bg-white pl-3 pr-3 pt-3 pb-15 shadow-2xl">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 200px"
          className="object-cover"
        />
      </div>
    </div>
  );
};
