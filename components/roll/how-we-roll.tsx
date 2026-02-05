"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { rollSectionsMobile } from "./roll-data";

type DotButtonProps = {
  count: number;
  current: number;
};

export const HowWeRollCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="flex flex-col items-center">
      <h2 className="mt-10 font-light text-4xl text-center">How We Roll</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
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
      </Carousel>
      <DotButtons current={current} count={count} />
    </section>
  );
};

const DotButtons = (props: DotButtonProps) => {
  return (
    <div className="flex gap-3">
      {Array.from({ length: props.count }).map((_, index) => (
        <div
          key={index}
          className={`h-3 w-3 ${index == props.current - 1 ? "bg-portfolio-blue" : "bg-foreground"} rounded-full`}
        ></div>
      ))}
    </div>
  );
};
