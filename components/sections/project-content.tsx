import Image from "next/image";
import { ContentBlock } from "@/data/projects";

interface ProjectContentProps {
  blocks: ContentBlock[];
}

export const ProjectContent = ({ blocks }: ProjectContentProps) => (
  <div className="flex flex-col gap-10 md:gap-14">
    {blocks.map((block, i) => (
      <Block key={i} block={block} />
    ))}
  </div>
);

// Returns true when the hex color is light enough to need dark text.
// Threshold 0.6 keeps white text on Salmon Orange (#ED682A, luminance ≈ 0.54).
function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

const Block = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="font-light text-3xl md:text-4xl tracking-tight">
          {block.text}
        </h2>
      );

    case "text":
      return (
        <p className="font-serif font-light text-base md:text-lg leading-relaxed text-foreground/90 max-w-2xl">
          {block.text}
        </p>
      );

    case "image":
      return (
        <figure>
          <div className="w-full overflow-hidden rounded-2xl bg-white">
            <Image
              src={block.src}
              alt={block.alt}
              width={1200}
              height={1200}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
          {block.caption && <Caption>{block.caption}</Caption>}
        </figure>
      );

    case "gallery": {
      const cols =
        block.columns === 3
          ? "sm:grid-cols-2 md:grid-cols-3"
          : "sm:grid-cols-2";
      return (
        <div className={`grid grid-cols-1 gap-4 md:gap-5 ${cols}`}>
          {block.images.map((img, i) => (
            <div
              key={i}
              className="w-full overflow-hidden rounded-xl bg-white"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={800}
                className="w-full h-auto"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      );
    }

    case "palette":
      return (
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          {block.colors.map((c, i) => {
            const light = isLight(c.value);
            return (
              <div
                key={i}
                className="flex-1 rounded-xl flex flex-col justify-center px-5 py-6 min-h-[110px] md:min-h-[130px]"
                style={{
                  backgroundColor: c.value,
                  border: light ? "1px solid rgba(0,0,0,0.12)" : "none",
                }}
              >
                {c.name && (
                  <span
                    className={`font-serif text-sm font-semibold ${
                      light ? "text-foreground" : "text-white"
                    }`}
                  >
                    {c.name}
                  </span>
                )}
                <span
                  className={`font-serif text-xs font-light mt-0.5 ${
                    light ? "text-foreground/60" : "text-white/70"
                  }`}
                >
                  {c.value.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
      );

    case "video":
      return (
        <figure>
          <video
            controls
            poster={block.poster}
            className="w-full rounded-2xl bg-black"
          >
            <source src={block.src} />
          </video>
          {block.caption && <Caption>{block.caption}</Caption>}
        </figure>
      );

    case "fullBleed":
      return (
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f5f5f0]">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-foreground/30 pl-5 md:pl-6">
          <p className="font-light text-2xl md:text-3xl leading-snug">
            "{block.text}"
          </p>
          {block.cite && (
            <cite className="mt-3 block font-serif text-sm font-light not-italic text-foreground/60">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );

    case "split": {
      const imgRight = block.imageRight !== false;
      const textCol = (
        <div className="flex flex-col justify-center gap-4">
          {block.heading && (
            <p className="font-serif text-xs font-medium uppercase tracking-[0.15em] text-foreground/50">
              {block.heading}
            </p>
          )}
          <p className="font-serif font-light text-base md:text-lg leading-relaxed text-foreground/90">
            {block.body}
          </p>
        </div>
      );
      const imgCol = (
        <div className="flex items-center justify-center rounded-2xl bg-white overflow-hidden">
          <Image
            src={block.src}
            alt={block.alt}
            width={600}
            height={600}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
      );
      return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
          {imgRight ? textCol : imgCol}
          {imgRight ? imgCol : textCol}
        </div>
      );
    }

    case "logoShowcase":
      return (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: block.bg ?? "#f5f5f0" }}
        >
          <div className="grid grid-cols-2 gap-8 p-10 md:p-14">
            {block.items.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-6">
                <p className="font-serif text-xs font-medium uppercase tracking-[0.15em] text-foreground/60">
                  {item.label}
                </p>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

const Caption = ({ children }: { children: React.ReactNode }) => (
  <figcaption className="mt-2 font-serif text-sm font-light text-foreground/60">
    {children}
  </figcaption>
);
