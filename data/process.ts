// "How we roll" ticket artwork, exported from the Figma frames.

export interface ProcessTicket {
  id: number;
  mobile: string;
  desktop: string;
  alt: string;
}

export const processTickets: ProcessTicket[] = [
  {
    id: 1,
    mobile: "/carousel/1-discover-mobile.svg",
    desktop: "/carousel/1-discover-desktop.svg",
    alt: "Discover — learn the purpose, goals, audience, and what needs to be created",
  },
  {
    id: 2,
    mobile: "/carousel/2-direction-mobile.svg",
    desktop: "/carousel/2-direction-desktop.svg",
    alt: "Direction — shape the directive through research and visual/style decisions",
  },
  {
    id: 3,
    mobile: "/carousel/3-create-mobile.svg",
    desktop: "/carousel/3-create-desktop.svg",
    alt: "Create — design, develop, illustrate, or build the solution from concept to final output",
  },
  {
    id: 4,
    mobile: "/carousel/4-deliver-mobile.svg",
    desktop: "/carousel/4-deliver-desktop.svg",
    alt: "Deliver — refine, finalize, and hand over ready-to-use files, prototypes, or guidelines",
  },
];
