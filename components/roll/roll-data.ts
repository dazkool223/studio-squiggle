export interface Roll {
  id: number;
  mobile: string;
  desktop: string;
  alt: string;
}

export const rollSections: Roll[] = [
  {
    id: 1,
    mobile: "/carousel/1-discover-mobile.svg",
    desktop: "/carousel/1-discover-desktop.svg",
    alt: "Discover",
  },
  {
    id: 2,
    mobile: "/carousel/2-direction-mobile.svg",
    desktop: "/carousel/2-direction-desktop.svg",
    alt: "Direction",
  },
  {
    id: 3,
    mobile: "/carousel/3-create-mobile.svg",
    desktop: "/carousel/3-create-desktop.svg",
    alt: "Create",
  },
  {
    id: 4,
    mobile: "/carousel/4-deliver-mobile.svg",
    desktop: "/carousel/4-deliver-desktop.svg",
    alt: "Deliver",
  },
];
