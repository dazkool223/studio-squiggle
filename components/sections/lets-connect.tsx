"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Instagram } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CONTACT_EMAIL, LOCATION, INSTAGRAM_URL } from "@/data/site";

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

  // No backend: subscribing opens a pre-filled email
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
      <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-24 pb-12">
        {/* ── Mobile-only title (sits above the letter on small screens) ── */}
        <h2 className="connect-title lg:hidden font-light text-5xl text-center mb-8">
          Let&apos;s Connect
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── Left: envelope + letter card ── */}
          <div className="connect-letter relative w-full max-w-md mx-auto">
            <Image
              src="/letter.svg"
              alt=""
              aria-hidden
              width={975}
              height={1057}
              className="w-full h-auto"
            />
            {/* Overlay sits on the white letter card inside the SVG */}
            <div className="absolute left-[24%] top-[38%] w-[48%] -rotate-[9deg]">
              {/* Studio logo — top right of the card */}
              <div className="flex justify-end mb-2">
                <Image
                  src="/logo.svg"
                  alt="Studio.Squiggle"
                  width={80}
                  height={26}
                  className="h-4 w-auto opacity-60"
                />
              </div>

              <p className="font-serif font-bold text-portfolio-pink text-sm md:text-lg leading-tight">
                Stay in the loop.
              </p>
              <p className="font-serif font-light text-[10px] md:text-xs mt-1 text-foreground/75 leading-relaxed">
                No spam, no boring bits. We&apos;re too lazy for that.
              </p>

              <form
                onSubmit={subscribe}
                className="flex items-end gap-2 mt-3 md:mt-5"
              >
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
                  className="wiggle-on-hover shrink-0 rounded-full bg-foreground text-portfolio-cream p-1.5 cursor-pointer"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* ── Right: title (desktop) + postcard + instagram ── */}
          <div className="flex flex-col items-center gap-8">
            <h2 className="connect-title hidden lg:block font-light text-5xl md:text-6xl">
              Let&apos;s Connect
            </h2>

            {/* Postcard */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="connect-postcard block w-full max-w-lg bg-portfolio-cream rounded-lg p-5 md:p-7 shadow-xl rotate-1 transition-transform duration-300 hover:rotate-0"
              style={{
                borderWidth: "6px",
                borderStyle: "solid",
                borderImage:
                  "repeating-linear-gradient(45deg, var(--portfolio-pink) 0 12px, var(--portfolio-blue) 12px 24px, var(--portfolio-yellow) 24px 36px) 8",
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
                  {/* Stamp — blue background, inverted logo */}
                  <div className="self-end bg-portfolio-blue rounded-sm p-1.5 relative">
                    <Image
                      src="/logo.svg"
                      alt=""
                      aria-hidden
                      width={284}
                      height={93}
                      className="h-6 w-auto invert"
                    />
                    {/* Postmark circle */}
                    <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full border border-foreground/20 opacity-60" />
                  </div>

                  {/* Contact lines — Poppins */}
                  <div className="font-serif font-light text-xs md:text-sm space-y-2">
                    <p className="border-b border-foreground/40 pb-1">
                      {CONTACT_EMAIL}
                    </p>
                    <p className="border-b border-foreground/40 pb-1">
                      {LOCATION}
                    </p>
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
