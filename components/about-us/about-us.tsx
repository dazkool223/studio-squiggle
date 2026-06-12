"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  aboutUsInformation,
  arrowBlue,
  arrowPink,
  coverImage1,
  coverImage2,
  squigglyFriends,
} from "./about-us-data";
import { Polaroid } from "./polaroid";
import { SquigglyFriendComponent } from "./squiggly-friends";
import { gsap, useGSAP } from "@/lib/gsap";

export const AboutUs = () => {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-title", start: "top 85%" },
      });

      gsap.from(".about-polaroid-1", {
        y: 60,
        rotation: -16,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".about-collage", start: "top 75%" },
      });
      gsap.from(".about-polaroid-2", {
        y: 60,
        rotation: 16,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".about-collage", start: "top 75%" },
      });
      gsap.from(".about-arrow", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.4,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".about-collage", start: "top 75%" },
      });
      gsap.from(".about-bio p", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about-bio", start: "top 80%" },
      });

      gsap.from(".friends-title", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".friends-title", start: "top 85%" },
      });
      gsap.utils
        .toArray<HTMLElement>(".squiggly-friend")
        .forEach((friend, i) => {
          const img = friend.querySelector(".friend-image");
          const card = friend.querySelector(".friend-card");
          const fromLeft = i % 2 === 0;
          gsap.from(img, {
            x: fromLeft ? -80 : 80,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: friend, start: "top 75%" },
          });
          gsap.from(card, {
            x: fromLeft ? 80 : -80,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: friend, start: "top 75%" },
          });
        });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <section className="mt-16 md:mt-24">
        <Image
          src={aboutUsInformation.src}
          alt={aboutUsInformation.alt}
          width={200}
          height={200}
          className="about-title w-full max-w-md md:max-w-xl mx-auto px-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 max-w-6xl mx-auto items-center">
          <div className="about-collage relative flex justify-center items-center py-10">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 max-w-100">
              <div className="about-polaroid-1 translate-x-10 translate-y-5 -rotate-6 max-w-50">
                <Polaroid image={coverImage1.src} alt={coverImage1.alt} />
              </div>
              <div>
                <Image
                  src={arrowPink}
                  height={100}
                  width={100}
                  alt=""
                  aria-hidden
                  className="about-arrow absolute rotate-12 w-20 h-auto top-0 -translate-x-5 translate-y-15"
                />
                <p className="absolute font-light text-xl -rotate-6 translate-y-11 translate-x-15">
                  This is Sayee
                </p>
              </div>
              <div className="flex flex-col items-center justify-center font-light">
                <p className="rotate-1">Visual Storyteller</p>
                <p className="rotate-1">Illustrator</p>
                <p className="-rotate-1">Graphic Designer</p>
                <p className="rotate-1">UI/UX Designer</p>
              </div>
              <Image
                src={arrowBlue}
                height={100}
                width={100}
                alt=""
                aria-hidden
                className="about-arrow absolute bottom-0 z-5 w-20 h-auto translate-x-30 -translate-y-10"
              />
              <div className="about-polaroid-2 rotate-6 max-w-50 -translate-y-15 -translate-x-7">
                <Polaroid image={coverImage2.src} alt={coverImage2.alt} />
              </div>
            </div>
          </div>
          <div className="about-bio m-10 text-lg md:text-xl font-serif font-light flex flex-col gap-5">
            <p>
              I&apos;m Sayee, a designer, illustrator, and the founder of
              Studio.Squiggle (yes, it&apos;s just me for now). I work in the
              space between design and storytelling, creating characters and
              visuals that feel honest, expressive, and weird.
            </p>
            <p>
              My work blends illustration, branding, and narrative design.
              Basically, if it needs personality, I want to work on it.
            </p>
            <p>Fork and Blaze live here too. They don&apos;t do much.</p>
          </div>
        </div>
      </section>
      <section className="mt-16 md:mt-24 max-w-6xl mx-auto">
        <p className="friends-title flex flex-col items-center justify-center text-4xl md:text-5xl font-light">
          Squiggly Friends
        </p>
        <div className="flex flex-col gap-10 mt-6">
          {squigglyFriends.map((friend, index) => (
            <SquigglyFriendComponent key={index} {...friend} />
          ))}
        </div>
      </section>
    </div>
  );
};
