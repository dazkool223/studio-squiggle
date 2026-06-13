// Site-wide content: navigation, contact, services.

export const NAV_LINKS = [
  { label: "About us", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact us", href: "#contact" },
] as const;

// From the "Let's Connect" postcard in the Figma
export const CONTACT_EMAIL = "its.squigglestudio@gmail.com";
export const LOCATION = "Pune, Maharashtra";

// TODO: real profile URL once the user shares it
export const INSTAGRAM_URL = "#";

// Services shown on the spinning "What we offer" wheel (Figma Desktop-43…46).
// Each entry carries the panel color it brings to the front when it lands in
// the active slot next to the arrow, plus whether that panel needs light text.
export interface Service {
  name: string;
  /** Background the section morphs to when this service is active */
  bg: string;
  /** true → panel is dark enough that the active word should be light */
  dark: boolean;
}

export const SERVICES: Service[] = [
  { name: "Branding & Identity", bg: "var(--portfolio-blue)", dark: true },
  { name: "Character Design", bg: "var(--portfolio-pink)", dark: true },
  { name: "UI/UX Design", bg: "var(--portfolio-purple)", dark: true },
  { name: "Content Design", bg: "var(--foreground)", dark: true },
  { name: "Merch & Print Design", bg: "var(--portfolio-pink)", dark: true },
  { name: "Visual Storytelling", bg: "var(--portfolio-yellow)", dark: false },
  { name: "Illustration", bg: "var(--portfolio-blue)", dark: true },
];
