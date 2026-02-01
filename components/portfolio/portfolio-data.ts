export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PortfolioSection {
  id: string;
  label: string;
  tabColor: string;
  contentColor: string;
  projects: Project[];
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: "visual-design",
    label: "Visual Design",
    tabColor: "bg-portfolio-blue",
    contentColor: "bg-portfolio-blue",
    projects: [
      {
        id: "vd-1",
        title: "Brand Identity System",
        description: "A comprehensive visual identity for a modern tech startup, including logo, color palette, and guidelines.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
      },
      {
        id: "vd-2",
        title: "Editorial Layout",
        description: "Magazine spread designs featuring dynamic typography and photography composition.",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop",
      },
      {
        id: "vd-3",
        title: "Packaging Design",
        description: "Sustainable packaging solutions for an eco-friendly cosmetics brand.",
        image: "https://images.unsplash.com/photo-1636622433525-f3ffe6a4c54b?w=400&h=400&fit=crop",
      },
      {
        id: "vd-4",
        title: "Poster Series",
        description: "A collection of event posters exploring abstract shapes and bold colors.",
        image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    id: "creative-design",
    label: "Creative Design",
    tabColor: "bg-portfolio-pink",
    contentColor: "bg-portfolio-pink",
    projects: [
      {
        id: "cd-1",
        title: "Illustration Series",
        description: "Hand-drawn digital illustrations for a children's book publisher.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      },
      {
        id: "cd-2",
        title: "Motion Graphics",
        description: "Animated logo reveals and social media content for brand campaigns.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
      },
      {
        id: "cd-3",
        title: "Art Direction",
        description: "Creative direction for a fashion brand's seasonal lookbook.",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
      },
      {
        id: "cd-4",
        title: "3D Visualization",
        description: "Product renders and environment scenes for e-commerce platforms.",
        image: "https://images.unsplash.com/photo-1633899306328-c5e70574aaa2?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    id: "ui-ux-design",
    label: "UI/UX Design",
    tabColor: "bg-portfolio-yellow",
    contentColor: "bg-portfolio-yellow",
    projects: [
      {
        id: "ux-1",
        title: "Mobile Banking App",
        description: "A user-centered redesign of a banking application with improved accessibility.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop",
      },
      {
        id: "ux-2",
        title: "E-commerce Platform",
        description: "End-to-end design for a sustainable marketplace with seamless checkout flow.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
      },
      {
        id: "ux-3",
        title: "Dashboard Design",
        description: "Analytics dashboard with data visualization for business intelligence.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
      },
      {
        id: "ux-4",
        title: "Design System",
        description: "Scalable component library with documentation for enterprise applications.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    id: "media-content",
    label: "Media+Content",
    tabColor: "bg-portfolio-purple",
    contentColor: "bg-portfolio-purple",
    projects: [
      {
        id: "mc-1",
        title: "Video Production",
        description: "Short-form video content for social media marketing campaigns.",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=400&fit=crop",
      },
      {
        id: "mc-2",
        title: "Photography",
        description: "Product and lifestyle photography for brand content libraries.",
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=400&fit=crop",
      },
      {
        id: "mc-3",
        title: "Podcast Branding",
        description: "Visual identity and cover art for a technology podcast series.",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
      },
      {
        id: "mc-4",
        title: "Content Strategy",
        description: "Editorial calendar and content planning for digital publications.",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=400&fit=crop",
      },
    ],
  },
];
