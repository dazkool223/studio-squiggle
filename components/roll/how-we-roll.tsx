import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { rollSectionsMobile } from "./roll-data";

export const HowWeRollCarousel = () => {
  return (
    <section className="flex flex-col">
      <h2 className="mt-10 font-light text-4xl text-center">How We Roll</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {rollSectionsMobile.map((section) => (
            <CarouselItem key={section.id}>
              <Image
                src={section.content}
                alt={section.alt}
                height={650}
                width={470}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </section>
  );
};
