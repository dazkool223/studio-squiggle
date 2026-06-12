"use client";

import { useRef } from "react";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui";
import { gsap, useGSAP } from "@/lib/gsap";

const MARQUEE_ITEMS = [
  "Brand Strategy",
  "Character Design",
  "UI/UX Design",
  "Content Design",
  "Merch & Print",
  "Visual Storytelling",
  "Illustration",
];

// TODO: replace with the studio's real handles / email
const CONTACT_EMAIL = "hello@studiosquiggle.com";

export const Footer = () => {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Infinite marquee: the track holds two copies of the content, so
      // sliding by -50% loops seamlessly.
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });

      gsap.from(".footer-cta-block > *", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: scope.current, start: "top 80%" },
      });
    },
    { scope },
  );

  return (
    <footer ref={scope} id="contact" className="bg-foreground text-portfolio-cream">
      {/* Marquee strip */}
      <div className="bg-portfolio-yellow text-foreground overflow-hidden py-3 border-y border-foreground">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="text-lg md:text-2xl font-light px-4 flex items-center gap-8"
                >
                  {item} <span aria-hidden>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTA block */}
      <div className="footer-cta-block flex flex-col items-center text-center px-6 py-16 md:py-24 gap-6">
        <h2 className="font-light text-4xl md:text-6xl max-w-3xl leading-tight">
          Let&apos;s make something{" "}
          <span className="font-semibold text-portfolio-yellow">weird</span>{" "}
          together
        </h2>
        <p className="font-serif font-light text-sm md:text-base text-portfolio-cream/80 max-w-md">
          Got a brand that needs a personality? A character that needs a story?
          Say hi.
        </p>
        {/* Wrapper div keeps GSAP off the button's own transition-all */}
        <div>
          <Button
            asChild
            variant={"ghost"}
            className="wiggle-on-hover font-serif font-light border border-portfolio-cream rounded-full px-6 text-portfolio-cream hover:bg-portfolio-yellow hover:text-foreground hover:border-portfolio-yellow"
          >
            <a href={`mailto:${CONTACT_EMAIL}`}>Book a meeting with us</a>
          </Button>
        </div>

        {/* Socials */}
        <div className="flex gap-5 mt-4">
          <a
            href="#"
            aria-label="Instagram"
            className="p-2 border border-portfolio-cream/40 rounded-full hover:bg-portfolio-pink hover:border-portfolio-pink transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="p-2 border border-portfolio-cream/40 rounded-full hover:bg-portfolio-blue hover:border-portfolio-blue hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label="Email"
            className="p-2 border border-portfolio-cream/40 rounded-full hover:bg-portfolio-yellow hover:border-portfolio-yellow hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-portfolio-cream/20 py-6 px-6 flex flex-col md:flex-row items-center justify-between gap-3 max-w-6xl mx-auto">
        <p className="text-2xl font-light">Studio.Squiggle</p>
        <p className="font-serif font-light text-xs text-portfolio-cream/60">
          For the Weird — By the Weird © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
