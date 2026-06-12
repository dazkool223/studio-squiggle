export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  alt: string;
}

export interface PortfolioSection {
  id: number;
  label: string;
  color: string;
  projects: Project[];
}

const sampleImage = "/projects/sample-project-image.svg";
const sampleBlurb =
  "A little about the project — bold, weird, and unmistakably theirs.";
const sampleDetails =
  "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines. We dug into what makes the brand tick, sketched a small army of weird ideas, and shaped the strongest one into a system that flexes across print, digital, and merch without losing its personality.";

const makeProjects = (prefix: string, count: number): Project[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: "Project Title",
    description: sampleBlurb,
    details: sampleDetails,
    image: sampleImage,
    alt: "Project preview",
  }));

export const portfolioSections: PortfolioSection[] = [
  {
    id: 1,
    label: "Visual Design",
    color: "bg-portfolio-blue",
    projects: makeProjects("vd", 6),
  },
  {
    id: 2,
    label: "Creative Design",
    color: "bg-portfolio-pink",
    projects: makeProjects("cd", 4),
  },
  {
    id: 3,
    label: "UI/UX Design",
    color: "bg-portfolio-yellow",
    projects: makeProjects("ux", 4),
  },
  {
    id: 4,
    label: "Media+Content",
    color: "bg-portfolio-purple",
    projects: makeProjects("mc", 4),
  },
];
