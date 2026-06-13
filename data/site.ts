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

export const SERVICES = [
  "Brand Strategy",
  "Character Design",
  "UI/UX Design",
  "Content Design",
  "Merch & Print",
  "Visual Storytelling",
  "Illustration",
] as const;
