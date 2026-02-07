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

export const AboutUs = () => {
  return (
    <>
      <section className="bg-portfolio-cream">
        <Image
          src={aboutUsInformation.src}
          alt={aboutUsInformation.alt}
          width={200}
          height={200}
          className="w-full"
        />

        <div className="relative grid grid-cols-2 grid-rows-2 gap-4 max-w-100">
          <div className="-rotate-6 max-w-50">
            <Polaroid image={coverImage1.src} alt={coverImage1.alt} />
          </div>
          <div>
            <Image
              src={arrowPink}
              height={100}
              width={100}
              alt="arrow"
              className="absolute top-10 left-40 rotate-12 w-20 translate-x-7 translate-y-6"
            />
            <p className="absolute left-60 font-light text-xl -rotate-6 translate-y-14 translate-x-6">
              This is Sayee
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="rotate-1">Visual Storyteller</p>
            <p className="rotate-1">Illustrator</p>
            <p className="-rotate-1">Graphic Designer</p>
            <p className="rotate-1">UI/UX Designer</p>
          </div>
          <Image
            src={arrowBlue}
            height={100}
            width={100}
            alt="arrow"
            className="absolute bottom-40 left-35 z-5 translate-y-30"
          />
          <div className="rotate-6 max-w-50 -translate-y-15 -translate-x-7">
            <Polaroid image={coverImage2.src} alt={coverImage2.alt} />
          </div>
        </div>
        <div className="m-10 text-xl font-serif font-light flex flex-col gap-5">
          <p>
            I'm Sayee, a designer, illustrator, and the founder of
            Studio.Squiggle (yes, it's just me for now). I work in the space
            between design and storytelling, creating characters and visuals
            that feel honest, expressive, and weird.
          </p>
          <p>
            My work blends illustration, branding, and narrative design.
            Basically, if it needs personality, I want to work on it.
          </p>
          <p>Fork and Blaze live here too. They don't do much.</p>
        </div>
      </section>
      <section className="mt-10">
        <p className="flex flex-col items-center justify-center text-4xl font-light">
          Squiggly Friends
        </p>
        {squigglyFriends.map((friend, index) => (
          <SquigglyFriendComponent key={index} {...friend} />
        ))}
      </section>
    </>
  );
};
