export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  alt: string;
}

export interface WorkCategory {
  id: string;
  label: string;
  /** Big panel behind the project grid */
  panelClass: string;
  /** Folder-tab chip — fixed per Figma Desktop-25…28, independent of panel */
  tabClass: string;
  /** Rounded card behind each project image */
  cardClass: string;
  projects: Project[];
}

// TODO: replace sample projects with real portfolio entries
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

export const workCategories: WorkCategory[] = [
  {
    id: "visual-design",
    label: "Visual Design",
    panelClass: "bg-portfolio-blue",
    tabClass: "bg-tab-yellow text-foreground",
    cardClass: "bg-portfolio-pink",
    projects: makeProjects("vd", 6),
  },
  {
    id: "creative-design",
    label: "Creative Design",
    panelClass: "bg-portfolio-pink",
    tabClass: "bg-tab-orange text-foreground",
    cardClass: "bg-portfolio-yellow",
    projects: makeProjects("cd", 4),
  },
  {
    id: "uiux-design",
    label: "UI/UX Design",
    panelClass: "bg-portfolio-yellow",
    tabClass: "bg-tab-cream text-foreground",
    cardClass: "bg-portfolio-pink",
    projects: makeProjects("ux", 4),
  },
  {
    id: "media-content",
    label: "Media+Content",
    panelClass: "bg-portfolio-purple",
    tabClass: "bg-tab-magenta text-portfolio-cream",
    cardClass: "bg-portfolio-yellow",
    projects: makeProjects("mc", 4),
  },
];
