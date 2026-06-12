export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface PortfolioSection {
  id: number;
  label: string;
  color: string;
  projects: Project[];
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: 1,
    label: "Visual Design",
    color: "bg-portfolio-blue",
    projects: [
      {
        id: "vd-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "/projects/sample-project-image.svg",
        alt: "Brand identity project preview",
      },
      {
        id: "vd-2",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "/projects/sample-project-image.svg",
        alt: "Brand identity project preview",
      },
    ],
  },
  {
    id: 2,
    label: "Creative Design",
    color: "bg-portfolio-pink",
    projects: [
      {
        id: "cd-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "/projects/sample-project-image.svg",
        alt: "Creative design project preview",
      },
      {
        id: "cd-2",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "/projects/sample-project-image.svg",
        alt: "Creative design project preview",
      },
    ],
  },
  {
    id: 3,
    label: "UI/UX Design",
    color: "bg-portfolio-yellow",
    projects: [
      {
        id: "ux-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "/projects/sample-project-image.svg",
        alt: "UI/UX project preview",
      },
      {
        id: "ux-2",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "/projects/sample-project-image.svg",
        alt: "UI/UX project preview",
      },
    ],
  },
  {
    id: 4,
    label: "Media+Content",
    color: "bg-portfolio-purple",
    projects: [
      {
        id: "mc-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "/projects/sample-project-image.svg",
        alt: "Media and content project preview",
      },
      {
        id: "mc-2",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "/projects/sample-project-image.svg",
        alt: "Media and content project preview",
      },
    ],
  },
];
