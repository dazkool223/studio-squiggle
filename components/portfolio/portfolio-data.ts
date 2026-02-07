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
        image: "projects/sample-project-image.svg",
        alt: "",
      },
      {
        id: "vd-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "projects/sample-project-image.svg",
        alt: "",
      },
    ],
  },
  {
    id: 2,
    label: "Creative Design",
    color: "bg-portfolio-pink",
    projects: [
      {
        id: "vd-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "projects/sample-project-image.svg",
        alt: "",
      },
      {
        id: "vd-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "projects/sample-project-image.svg",
        alt: "",
      },
    ],
  },
  {
    id: 3,
    label: "UI/UX Design",
    color: "bg-portfolio-yellow",
    projects: [
      {
        id: "vd-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "projects/sample-project-image.svg",
        alt: "",
      },
      {
        id: "vd-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "projects/sample-project-image.svg",
        alt: "",
      },
    ],
  },
  {
    id: 4,
    label: "Media+Content",
    color: "bg-portfolio-purple",
    projects: [
      {
        id: "vd-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "projects/sample-project-image.svg",
        alt: "",
      },
      {
        id: "vd-1",
        title: "Brand Identity System",
        description:
          "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "projects/sample-project-image.svg",
        alt: "",
      },
    ],
  },
];
