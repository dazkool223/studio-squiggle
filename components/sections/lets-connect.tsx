"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Instagram } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CONTACT_EMAIL, LOCATION, INSTAGRAM_URL } from "@/data/site";

// "Let's Connect" footer per the Figma: yellow wall, the stay-in-the-loop
// envelope on the left and a postcard with the studio's address on the
// right.
export const LetsConnect = () => {
  const scope = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");

  useGSAP(
    () => {
      gsap.from(".connect-letter", {
        y: 80,
        rotation: -6,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: scope.current, start: "top 70%" },
      });
      gsap.from(".connect-postcard", {
        y: 80,
        rotation: 6,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: scope.current, start: "top 70%" },
      });
      gsap.from(".connect-title", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%" },
      });
    },
    { scope },
  );

  // No backend on this static site: subscribing opens a pre-filled email
  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent("Keep me in the loop");
    const body = encodeURIComponent(
      `Hi Studio.Squiggle, add me to the list: ${email}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <footer
      id="contact"
      ref={scope}
      className="bg-portfolio-yellow text-foreground overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Envelope artwork with the stay-in-the-loop note written on the
            blank letter; the email field is a real input drawn as a line
            on the paper */}
        <div className="connect-letter relative w-full max-w-md mx-auto">
          <Image
            src="/letter.svg"
            alt=""
            aria-hidden
            width={975}
            height={1057}
            className="w-full h-auto"
          />
          <div className="absolute left-[24%] top-[42%] w-[44%] -rotate-[9deg]">
            <p className="font-bold text-portfolio-pink text-lg md:text-xl">
              Stay in the loop.
            </p>
            <p className="font-serif font-light text-[9px] md:text-[11px] mt-0.5 text-foreground/80">
              No spam, no boring bits. We&apos;re too lazy for that.
            </p>
            <form onSubmit={subscribe} className="flex items-end gap-2 mt-4 md:mt-6">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email Address"
                className="flex-1 min-w-0 font-serif font-light text-xs md:text-sm bg-transparent border-b border-foreground/60 pb-1 placeholder:text-foreground/50 focus:outline-none focus:border-foreground"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="wiggle-on-hover shrink-0 rounded-full bg-foreground text-portfolio-cream p-2 cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Heading + postcard */}
        <div className="flex flex-col items-center gap-8">
          <h2 className="connect-title font-light text-5xl md:text-6xl">
            Let&apos;s Connect
          </h2>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="connect-postcard block w-full max-w-lg bg-portfolio-cream rounded-lg p-5 md:p-7 shadow-xl rotate-1 transition-transform duration-300 hover:rotate-0"
            style={{
              outline: "3px dashed transparent",
              borderImage:
                "repeating-linear-gradient(45deg, var(--portfolio-pink) 0 12px, var(--portfolio-blue) 12px 24px, var(--portfolio-yellow) 24px 36px) 8",
              borderWidth: "6px",
              borderStyle: "solid",
            }}
          >
            <div className="grid grid-cols-[1fr_auto_1.2fr] gap-4 items-stretch">
              <Image
                src="/postcard-art.svg"
                alt="A doodle character waving from the postcard"
                width={630}
                height={486}
                className="w-full h-auto self-center"
              />
              <div className="w-px bg-foreground/30" aria-hidden />
              <div className="flex flex-col justify-between py-1">
                <div className="self-end border border-foreground/40 rounded-sm p-1.5">
                  <Image
                    src="/logo.svg"
                    alt=""
                    aria-hidden
                    width={284}
                    height={93}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="font-serif font-light text-xs md:text-sm space-y-2">
                  <p className="border-b border-foreground/40 pb-1">
                    {CONTACT_EMAIL}
                  </p>
                  <p className="border-b border-foreground/40 pb-1">{LOCATION}</p>
                </div>
              </div>
            </div>
          </a>

          <a
            href={INSTAGRAM_URL}
            aria-label="Instagram"
            className="p-3 border border-foreground rounded-full hover:bg-foreground hover:text-portfolio-yellow transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Credits bar */}
      <div className="bg-foreground text-portfolio-cream">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xl font-light">Studio.Squiggle</p>
          <p className="font-serif font-light text-xs opacity-70">
            {CONTACT_EMAIL} · {LOCATION}
          </p>
          <p className="font-serif font-light text-xs opacity-70">
            For the Weird — By the Weird © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
