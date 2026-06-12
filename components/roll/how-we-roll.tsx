"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { gsap, useGSAP } from "@/lib/gsap";

import { rollSections } from "./roll-data";

type DotButtonProps = {
  count: number;
  current: number;
  onSelect: (index: number) => void;
};

export const HowWeRollCarousel = () => {
  const scope = useRef<HTMLElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const count = rollSections.length;

  useEffect(() => {
    if (!api) {
      return;
    }
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useGSAP(
    () => {
      gsap.from(scope.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 80%",
        },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="flex flex-col items-center">
      <h2 className="mt-10 font-light text-4xl md:text-5xl text-center">
        How We Roll
      </h2>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        setApi={setApi}
        className="w-full max-w-md md:max-w-4xl lg:max-w-5xl mt-4"
      >
        <CarouselContent>
          {rollSections.map((section) => (
            <CarouselItem
              key={section.id}
              className="flex justify-center items-center"
            >
              <Image
                src={section.mobile}
                alt={section.alt}
                height={650}
                width={470}
                className="md:hidden w-full h-auto"
              />
              <Image
                src={section.desktop}
                alt={section.alt}
                height={783}
                width={1253}
                className="hidden md:block w-full h-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex -left-4 lg:-left-12 border-foreground" />
        <CarouselNext className="hidden md:inline-flex -right-4 lg:-right-12 border-foreground" />
      </Carousel>
      <DotButtons
        current={current}
        count={count}
        onSelect={(index) => api?.scrollTo(index)}
      />
    </section>
  );
};

const DotButtons = ({ count, current, onSelect }: DotButtonProps) => {
  return (
    <div className="flex gap-3 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer ${
            index === current - 1
              ? "bg-portfolio-blue scale-125"
              : "bg-foreground hover:scale-110"
          }`}
        ></button>
      ))}
    </div>
  );
};
