"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  aboutTitle,
  arrowBlue,
  arrowPink,
  sayeePhoto1,
  sayeePhoto2,
  squigglyFriends,
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

// Shows one character at a time.  The pose illustration cycles every 2 s
// with a pop-in/out GSAP animation; the pill tabs switch characters with a
// slide-out/in card animation.
const FriendsShowcase = () => {
  const scope = useRef<HTMLDivElement>(null);
  const [activeFriend, setActiveFriend] = useState(0);
  const [activePose, setActivePose] = useState(0);
  const activeFriendRef = useRef(0);
  const activePoseRef = useRef(0);
  const animatingRef = useRef(false);

  // Initial card entrance on scroll
  useGSAP(
    () => {
      gsap.from(".friend-showcase-card", {
        y: 36,
        opacity: 0,
        scale: 0.93,
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
      });
    },
    { scope },
  );

  // Animate ALL .friend-doodle images in after a pose/friend state update.
  // (There are two in the DOM — one for desktop, one for mobile.)
  const animateDoodleIn = useCallback(() => {
    requestAnimationFrame(() => {
      if (!scope.current) {
        animatingRef.current = false;
        return;
      }
      const doodles = scope.current.querySelectorAll(".friend-doodle");
      if (!doodles.length) {
        animatingRef.current = false;
        return;
      }
      gsap.fromTo(
        doodles,
        { scale: 0.75, opacity: 0, rotation: -8 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.42,
          ease: "back.out(1.8)",
          onComplete: () => {
            animatingRef.current = false;
          },
        },
      );
    });
  }, []);

  // Swap to the next pose illustration (image-only animation)
  const cyclePose = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    if (!scope.current) {
      animatingRef.current = false;
      return;
    }
    const doodles = scope.current.querySelectorAll(".friend-doodle");
    const poseCount = squigglyFriends[activeFriendRef.current].images.length;
    const next = (activePoseRef.current + 1) % poseCount;
    if (!doodles.length) {
      setActivePose(next);
      activePoseRef.current = next;
      animatingRef.current = false;
      return;
    }
    gsap.to(doodles, {
      scale: 0.75,
      opacity: 0,
      rotation: 8,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        setActivePose(next);
        activePoseRef.current = next;
        animateDoodleIn();
      },
    });
  }, [animateDoodleIn]);

  // Auto-cycle poses every 2 s
  useEffect(() => {
    const id = setInterval(cyclePose, 2000);
    return () => clearInterval(id);
  }, [cyclePose]);

  // Switch between Fork and Blaze (full card slide-out/in)
  const switchFriend = useCallback(
    (idx: number) => {
      if (idx === activeFriendRef.current || animatingRef.current) return;
      animatingRef.current = true;
      const card = scope.current?.querySelector(
        ".friend-showcase-card",
      ) as HTMLElement | null;
      const doSwitch = () => {
        setActiveFriend(idx);
        setActivePose(0);
        activeFriendRef.current = idx;
        activePoseRef.current = 0;
        requestAnimationFrame(() => {
          const newCard = scope.current?.querySelector(
            ".friend-showcase-card",
          ) as HTMLElement | null;
          if (!newCard) {
            animatingRef.current = false;
            return;
          }
          gsap.fromTo(
            newCard,
            { y: 36, opacity: 0, scale: 0.93 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.4)",
              onComplete: () => {
                animatingRef.current = false;
              },
            },
          );
        });
      };
      if (!card) {
        doSwitch();
        return;
      }
      gsap.to(card, {
        y: -28,
        opacity: 0,
        scale: 0.93,
        duration: 0.32,
        ease: "power2.in",
        onComplete: doSwitch,
      });
    },
    [],
  );

  const friend = squigglyFriends[activeFriend];

  return (
    <div ref={scope} className="mt-6">
      {/* Pill tabs */}
      <div className="flex justify-center gap-3 mb-10 md:mb-14">
        {squigglyFriends.map((f, i) => (
          <button
            key={f.name}
            type="button"
            onClick={() => switchFriend(i)}
            className={`cursor-pointer rounded-full px-8 py-2 font-serif text-sm uppercase tracking-widest border transition-colors duration-300 ${
              i === activeFriend
                ? "bg-foreground text-portfolio-cream border-foreground"
                : "bg-transparent text-foreground border-foreground/40 hover:border-foreground"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Character card — one friend at a time */}
      <div className="friend-showcase-card max-w-5xl mx-auto">
        {/* ── Desktop ── */}
        <div className="hidden md:grid md:grid-cols-2 gap-16 items-center px-8">
          <div
            className={`flex flex-col items-center gap-4 ${
              friend.reverse ? "md:order-last" : ""
            }`}
          >
            <Image
              src={friend.images[activePose]}
              alt={friend.name}
              width={256}
              height={320}
              className="friend-doodle w-52 h-auto"
            />
            <p className="text-3xl font-light lowercase">{friend.name}</p>
          </div>
          <div className={`${friend.reverse ? "md:order-first" : ""}`}>
            <p className="font-serif text-sm font-light text-foreground/50 lowercase mb-4">
              {friend.name}
            </p>
            <div className="space-y-3 font-serif font-light text-xl">
              {friend.attributes.map((a) => (
                <p key={a.key}>
                  <span className="font-bold">{a.key}: </span>
                  {a.value}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden flex flex-col items-center gap-4 px-6">
          <Image
            src={friend.images[activePose]}
            alt={friend.name}
            width={256}
            height={320}
            className="friend-doodle h-52 w-auto"
          />
          <p className="text-2xl font-light lowercase">{friend.name}</p>
          <div className="text-left space-y-2 font-serif font-light text-lg w-full max-w-xs">
            {friend.attributes.map((a) => (
              <p key={a.key}>
                <span className="font-bold">{a.key}: </span>
                {a.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// About Us: Sayee's scrapbook collage + bio, then cycling Squiggly Friends.
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
    },
    { scope },
  );

  return (
    <div
      id="about"
      ref={scope}
      className="scroll-mt-10 overflow-x-clip py-12 md:py-16"
    >
      <section>
        <Image
          src={aboutTitle.src}
          alt={aboutTitle.alt}
          width={600}
          height={200}
          className="about-title w-full max-w-md md:max-w-xl mx-auto px-6 h-auto"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 max-w-6xl mx-auto items-center">
          <div className="about-collage relative w-[88%] max-w-sm md:w-full md:max-w-md mx-auto aspect-square my-6 px-2">
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
        <FriendsShowcase />
      </section>
    </div>
  );
};
