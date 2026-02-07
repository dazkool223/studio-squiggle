interface PolaroidProps {
  image: string;
  alt: string;
}

export const Polaroid = ({ image, alt }: PolaroidProps) => {
  return (
    <div className="bg-white pl-3 pr-3 pt-3 pb-15 shadow-2xl">
      <div className="aspect-square overflow-hidden">
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
