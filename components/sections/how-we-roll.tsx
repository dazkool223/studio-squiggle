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

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    const onPointerDown = () => setDragging(true);
    const onPointerUp = () => setDragging(false);
    onSelect();
    api.on("select", onSelect);
    api.on("pointerDown", onPointerDown);
    api.on("pointerUp", onPointerUp);
    return () => {
      api.off("select", onSelect);
      api.off("pointerDown", onPointerDown);
      api.off("pointerUp", onPointerUp);
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

      // Mobile-only swipe hint: once the section is revealed, rock the
      // carousel sideways a few times so it's obvious the tickets can be
      // swiped (there are no arrow buttons on mobile). gsap.matchMedia keeps
      // this tied to the live viewport and reverts cleanly when it changes.
      gsap.matchMedia().add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap
            .timeline({
              delay: 0.9,
              repeat: 2,
              repeatDelay: 1.1,
              scrollTrigger: { trigger: scope.current, start: "top 70%" },
            })
            .to(".roll-carousel", { x: -28, duration: 0.4, ease: "power1.inOut" })
            .to(".roll-carousel", { x: 0, duration: 0.55, ease: "power2.out" });
        },
      );
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
        className="roll-carousel roll-reveal w-full mt-2 md:mt-10"
      >
        <CarouselContent>
          {processTickets.map((ticket, index) => {
            const total = processTickets.length;
            const rel = (index - current + total) % total;
            // Tilt non-active neighbours outward on desktop only:
            // rel===1 → right neighbour leans right; rel===total-1 → left neighbour leans left.
            const tilt =
              index === current ? "" :
              rel === 1 ? "md:rotate-3" :
              rel === total - 1 ? "md:-rotate-3" : "";
            return (
            <CarouselItem
              key={ticket.id}
              className="basis-[88%] md:basis-[72%] lg:basis-[62%] flex justify-center items-center"
            >
              <div
                className={`w-full ${!dragging ? "transition-[transform,opacity] duration-500" : ""} ${
                  index === current ? "scale-100 opacity-100" : `scale-90 opacity-50 ${tilt}`
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
          );
          })}
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
