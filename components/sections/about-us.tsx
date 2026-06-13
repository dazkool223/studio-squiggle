"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  aboutTitle,
  arrowBlue,
  arrowPink,
  sayeePhoto1,
  sayeePhoto2,
  squigglyFriends,
  SquigglyFriend,
} from "@/data/friends";

const Polaroid = ({ image, alt }: { image: string; alt: string }) => (
  <div className="bg-white p-3 pb-14 shadow-2xl">
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 220px"
        className="object-cover"
      />
    </div>
  </div>
);

const FriendCard = ({ friend }: { friend: SquigglyFriend }) => (
  <div className="squiggly-friend">
    <p className="md:hidden text-center lowercase font-light text-3xl">
      {friend.name}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
      <Image
        src={friend.image}
        alt={friend.name}
        width={256}
        height={256}
        className={`friend-image justify-self-center w-50 md:w-64 ${
          friend.reverse ? "md:order-last" : ""
        }`}
      />
      <div className="friend-card flex flex-col gap-2 m-10 text-lg md:text-xl font-serif font-light">
        <p className="lowercase font-sans font-light text-3xl hidden md:block">
          {friend.name}
        </p>
        {friend.attributes.map((attribute) => (
          <p key={attribute.key}>
            <span className="font-bold">{attribute.key}: </span>
            {attribute.value}
          </p>
        ))}
      </div>
    </div>
  </div>
);

// About Us: scrapbook collage of Sayee with hand-drawn arrows and
// labels, a short bio, then the Squiggly Friends character sheets.
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

      const collage = { trigger: ".about-collage", start: "top 75%" };
      gsap.from(".about-polaroid-1", {
        y: 60,
        rotation: -16,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: collage,
      });
      gsap.from(".about-polaroid-2", {
        y: 60,
        rotation: 16,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: collage,
      });
      gsap.from(".about-arrow", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.4,
        ease: "back.out(2)",
        scrollTrigger: collage,
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
      gsap.utils.toArray<HTMLElement>(".squiggly-friend").forEach((friend, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(friend.querySelector(".friend-image"), {
          x: fromLeft ? -80 : 80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: friend, start: "top 75%" },
        });
        gsap.from(friend.querySelector(".friend-card"), {
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
    <div id="about" ref={scope} className="scroll-mt-10 py-12 md:py-16">
      <section>
        <Image
          src={aboutTitle.src}
          alt={aboutTitle.alt}
          width={600}
          height={200}
          className="about-title w-full max-w-md md:max-w-xl mx-auto px-6 h-auto"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 max-w-6xl mx-auto items-center">
          {/* Percentage-positioned collage inside a square so the
              composition holds at every viewport width */}
          <div className="about-collage relative w-full max-w-sm md:max-w-md mx-auto aspect-square my-6 px-2">
            <div className="about-polaroid-1 absolute left-[7%] top-0 w-[42%] -rotate-6">
              <Polaroid image={sayeePhoto1.src} alt={sayeePhoto1.alt} />
            </div>
            <p className="absolute right-[4%] top-[5%] -rotate-6 font-light text-xl md:text-2xl whitespace-nowrap">
              This is Sayee
            </p>
            <Image
              src={arrowPink}
              width={100}
              height={100}
              alt=""
              aria-hidden
              className="about-arrow absolute left-[44%] top-[8%] w-[16%] h-auto rotate-12"
            />
            <div className="about-polaroid-2 absolute right-[2%] top-[34%] w-[44%] rotate-6 z-10">
              <Polaroid image={sayeePhoto2.src} alt={sayeePhoto2.alt} />
            </div>
            <div className="absolute left-[4%] bottom-[6%] w-[40%] flex flex-col items-center font-light text-base md:text-lg leading-snug">
              <p className="rotate-1">Visual Storyteller</p>
              <p className="rotate-1">Illustrator</p>
              <p className="-rotate-1">Graphic Designer</p>
              <p className="rotate-1">UI/UX Designer</p>
            </div>
            <Image
              src={arrowBlue}
              width={100}
              height={100}
              alt=""
              aria-hidden
              className="about-arrow absolute left-[45%] bottom-[8%] w-[18%] h-auto z-20"
            />
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
        <h2 className="friends-title text-center text-4xl md:text-5xl font-light">
          Squiggly Friends
        </h2>
        <div className="flex flex-col gap-10 mt-6">
          {squigglyFriends.map((friend) => (
            <FriendCard key={friend.name} friend={friend} />
          ))}
        </div>
      </section>
    </div>
  );
};
