"use client";

import { useEffect, useRef, useState } from "react";
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
import { processTickets } from "@/data/process";

// "How we roll" (Figma Desktop-29…32): ticket-shaped process cards in
// a looping carousel, neighbours peeking in from the edges.
export const HowWeRoll = () => {
  const scope = useRef<HTMLElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useGSAP(
    () => {
      gsap.from(".roll-reveal", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
    },
    { scope },
  );

  return (
    <section
      id="roll"
      ref={scope}
      className="flex flex-col items-center scroll-mt-10 py-12 md:py-16"
    >
      <h2 className="roll-reveal font-light text-4xl md:text-5xl text-center">
        How we roll
      </h2>

      <Carousel
        opts={{ align: "center", loop: true }}
        setApi={setApi}
        className="roll-reveal w-full mt-6 md:mt-10"
      >
        <CarouselContent>
          {processTickets.map((ticket, index) => (
            <CarouselItem
              key={ticket.id}
              className="basis-[88%] md:basis-[72%] lg:basis-[62%] flex justify-center items-center"
            >
              <div
                className={`w-full transition-[transform,opacity] duration-500 ${
                  index === current ? "scale-100 opacity-100" : "scale-90 opacity-50"
                }`}
              >
                <Image
                  src={ticket.mobile}
                  alt={ticket.alt}
                  width={470}
                  height={650}
                  className="md:hidden w-full h-auto"
                />
                <Image
                  src={ticket.desktop}
                  alt={ticket.alt}
                  width={1253}
                  height={783}
                  className="hidden md:block w-full h-auto"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex left-6 lg:left-12 border-foreground bg-portfolio-cream/80" />
        <CarouselNext className="hidden md:inline-flex right-6 lg:right-12 border-foreground bg-portfolio-cream/80" />
      </Carousel>

      <div className="flex gap-3 mt-5" role="tablist" aria-label="Process steps">
        {processTickets.map((ticket, index) => (
          <button
            key={ticket.id}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === current
                ? "bg-portfolio-blue scale-125"
                : "bg-foreground hover:scale-110"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
