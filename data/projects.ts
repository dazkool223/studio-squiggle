// A project's detail page is a sequence of content blocks. Each block is a
// small, self-contained piece of layout (a paragraph, an image, a gallery,
// a colour palette, …) rendered by <ProjectContent>. New project pages are
// authored as data — no new components needed.
export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "text"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "gallery"; images: { src: string; alt: string }[]; columns?: 2 | 3 }
  | { type: "palette"; colors: { name?: string; value: string }[] }
  | { type: "video"; src: string; poster?: string; caption?: string }
  | { type: "fullBleed"; src: string; alt: string }
  | { type: "quote"; text: string; cite?: string }
  | {
      type: "split";
      /** Small uppercase heading above the body text */
      heading?: string;
      body: string;
      src: string;
      alt: string;
      /** When true (default) the image sits on the right */
      imageRight?: boolean;
    }
  | {
      type: "logoShowcase";
      items: { label: string; src: string; alt: string }[];
      /** Optional CSS color for the showcase background, e.g. "#FCEEE6" */
      bg?: string;
    };

export interface Project {
  id: string;
  /** URL segment for the detail page, e.g. "they-see-me-rolling" */
  slug: string;
  title: string;
  /** Optional sub-title shown beneath the main title, e.g. "Sushi Restaurant" */
  subtitle?: string;
  /** Short blurb shown on the card in the Our Work grid */
  description: string;
  /** Thumbnail shown on the card (may be a GIF) */
  thumbnail: string;
  alt: string;
  /**
   * Hero image shown at the top of the detail page. When omitted,
   * falls back to `thumbnail`. Use this when the card thumbnail
   * (e.g. an animated GIF) differs from the desired detail-page hero.
   */
  heroImage?: string;
  /** One-line intro shown under the title on the simple detail page header */
  summary?: string;
  /** Discipline tags shown in the "Scope" column of the case-study header */
  scope?: string[];
  /** Year shown in the "About" column of the case-study header */
  year?: number;
  /** Longer description shown in the "About" column of the case-study header */
  about?: string;
  /** Ordered blocks that make up the detail page body */
  content: ContentBlock[];
}

export interface WorkCategory {
  id: string;
  label: string;
  /** Big panel behind the project grid */
  panelClass: string;
  /** The file's color (CSS value) — drives both the SVG tab and the panel so
      the active tab reads as the top of its own folder. */
  color: string;
  /** Text color class for the tab label */
  tabClass: string;
  /** Rounded card behind each project image */
  cardClass: string;
  projects: Project[];
}

// Placeholder assets reused until real Figma exports are dropped in.
const sampleImage = "/projects/sample-project-image.svg";
const lightImage = "/projects/placeholder-light.svg";
const sampleBlurb =
  "A little about the project — bold, weird, and unmistakably theirs.";

// The studio palette, reused for placeholder entries.
const brandPalette: { name: string; value: string }[] = [
  { name: "Cream", value: "#fff8dd" },
  { name: "Blue", value: "#83bcff" },
  { name: "Pink", value: "#ff537c" },
  { name: "Yellow", value: "#ffd335" },
  { name: "Purple", value: "#c955ff" },
];

const placeholderContent = (title: string): ContentBlock[] => [
  { type: "image", src: sampleImage, alt: `${title} — hero` },
  {
    type: "text",
    text: "A comprehensive visual identity for a modern brand — logo, colour palette, and guidelines. We dug into what makes the brand tick, sketched a small army of weird ideas, and shaped the strongest one into a system that flexes across print, digital, and merch without losing its personality.",
  },
  { type: "palette", colors: brandPalette },
  {
    type: "gallery",
    columns: 2,
    images: [
      { src: lightImage, alt: `${title} — detail one` },
      { src: lightImage, alt: `${title} — detail two` },
    ],
  },
  { type: "fullBleed", src: sampleImage, alt: `${title} — full bleed` },
];

const makeProjects = (prefix: string, count: number): Project[] =>
  Array.from({ length: count }, (_, i) => {
    const slug = `${prefix}-project-${i + 1}`;
    const title = "Project Title";
    return {
      id: `${prefix}-${i + 1}`,
      slug,
      title,
      description: sampleBlurb,
      thumbnail: sampleImage,
      alt: "Project preview",
      summary: "A short intro to what this project set out to do.",
      content: placeholderContent(title),
    };
  });

// ─────────────────────────────────────────────────────────────────────────────
// Visual Design projects
// ─────────────────────────────────────────────────────────────────────────────

const p = (path: string) => `/projects/they-see-me-rolling/${path}`;
const s = (path: string) => `/projects/seafoam/${path}`;
const b = (path: string) => `/projects/blinkit-bingo/${path}`;
const f = (path: string) => `/projects/funky-dogs/${path}`;
const r = (path: string) => `/projects/raw-stickers/${path}`;

const visualDesignProjects: Project[] = [
  // ── Rolling Rice — first fully-authored project ──────────────────────────
  {
    id: "vd-1",
    slug: "they-see-me-rolling",
    title: "Rolling Rice",
    subtitle: "Sushi Restaurant",
    description:
      "A playful sushi restaurant brand that blends Japanese minimalism with quirky, handmade doodles.",
    thumbnail: p("thumbnail.gif"),
    heroImage: p("rolling-rice.png"),
    alt: "Rolling Rice brand identity",
    scope: [
      "Visual Design",
      "Branding and Identity",
      "Illustration",
      "Merch and Print Design",
    ],
    year: 2025,
    about:
      "Rolling Rice is a playful sushi restaurant brand identity that blends Japanese minimalism with quirky, modern doodles. The brand aims to make sushi approachable, fun, and memorable, especially for younger audiences who love casual dining experiences.",
    content: [
      // ── Primary Logo ───────────────────────────────────────────────────
      {
        type: "split",
        heading: "Primary Logo",
        body: "The logo features a bold sushi roll illustration with salmon and rice, highlighting the core product while also giving it a lively and friendly character. The rounded hand-drawn style conveys approachability and movement, tying in with the restaurant's name, Rolling Rice.",
        src: p("rolling-rice-logo-1.png"),
        alt: "Rolling Rice primary logo",
        imageRight: true,
      },
      // ── Logotype & Brandmark side-by-side ──────────────────────────────
      {
        type: "logoShowcase",
        bg: "#FCEEE6",
        items: [
          {
            label: "Logotype",
            src: p("rolling-rice-logo-2.png"),
            alt: "Rolling Rice logotype",
          },
          {
            label: "Brandmark",
            src: p("rolling-rice-brandmark.png"),
            alt: "Rolling Rice brandmark",
          },
        ],
      },
      // ── Colour Palette ─────────────────────────────────────────────────
      { type: "heading", text: "Color Palette" },
      {
        type: "text",
        text: "The colors are inspired by authentic sushi ingredients while keeping the palette bold yet minimal: Salmon Orange, Rice White, and Seaweed Black.",
      },
      {
        type: "palette",
        colors: [
          { name: "Salmon Orange", value: "#ED682A" },
          { name: "Rice White", value: "#FFFFFF" },
          { name: "Seaweed Black", value: "#100B0A" },
        ],
      },
      // ── Typography ─────────────────────────────────────────────────────
      { type: "heading", text: "Typography" },
      {
        type: "text",
        text: "The brand uses rounded, approachable typefaces that echo the playful hand-drawn quality of the logo. Each weight plays a role: headlines feel bold and fun, body copy stays clean and legible, maintaining clarity across menus, packaging, and digital touchpoints.",
      },
      // ── Doodles ────────────────────────────────────────────────────────
      { type: "heading", text: "Doodles" },
      {
        type: "image",
        src: p("they-see-me-rolling-1.png"),
        alt: "They See Me Rolling — doodle illustration",
      },
      // ── Illustrations ──────────────────────────────────────────────────
      { type: "heading", text: "Illustrations" },
      {
        type: "text",
        text: "Detailed hand-drawn illustrations throughout the brand identity capture the spirit of sushi culture and street food energy. The illustrations are bold, noodle-packed, and coated in lively personality — used in store experiences, trading games, food booth materials, and product.",
      },
      // "They See Me Rollin'" — three colour variants
      {
        type: "gallery",
        columns: 3,
        images: [
          { src: p("they-see-me-rolling-1.png"), alt: "They See Me Rolling — white" },
          { src: p("they-see-me-rolling-2.png"), alt: "They See Me Rolling — orange" },
          { src: p("they-see-me-rolling-3.png"), alt: "They See Me Rolling — dark" },
        ],
      },
      // "Ramen Mode On"
      { type: "heading", text: "Ramen Mode On" },
      {
        type: "text",
        text: "A steaming ramen bowl illustration with playful typography. Bold, graphic, and instantly recognisable — this piece captures the late-night ramen-craving energy that the brand loves to tap into.",
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          { src: p("Ramen 5.png"), alt: "Ramen Mode On — orange" },
          { src: p("Ramen 6.png"), alt: "Ramen Mode On — dark" },
        ],
      },
      // "Takeout Therapy"
      { type: "heading", text: "Takeout Therapy" },
      {
        type: "text",
        text: "A quirky takeout box doodle with relatable text — because sometimes the best therapy comes in a cardboard box. This illustration brings levity and humour to the brand's print collateral.",
      },
      {
        type: "image",
        src: p("takeout.png"),
        alt: "Takeout Therapy illustration",
      },
      // ── Mockups ────────────────────────────────────────────────────────
      { type: "heading", text: "Mockups" },
      {
        type: "text",
        text: "The Rolling Rice brand identity comes to life through playful everyday touchpoints: takeout packaging, tote bags and t-shirts that turn the brand into a lifestyle, and menus and signage that bold clarity with quirky accents. Each mockup reinforces the idea that Rolling Rice isn't just about sushi — it's about creating a joyful, memorable experience wherever the brand is seen.",
      },
      {
        type: "image",
        src: p("gallery-5.png"),
        alt: "Rolling Rice merchandise mockups",
      },
      // ── Full bleed footer ──────────────────────────────────────────────
      {
        type: "fullBleed",
        src: p("gallery-4.png"),
        alt: "Rolling Rice sushi spread",
      },
    ],
  },
  // ── Seafoam — second fully-authored project ─────────────────────────────
  {
    id: "vd-2",
    slug: "seafoam",
    title: "Seafoam",
    subtitle: "Cafe by the coast",
    description:
      "A coastal café brand identity blending sea breeze freshness with warm coffee culture.",
    thumbnail: s("thumbnail.png"),
    heroImage: s("seafoam-beach.png"),
    alt: "Seafoam café brand identity",
    scope: ["Branding and Identity", "Illustration", "Merch and Print Design"],
    year: 2025,
    about:
      "Seafoam Coffee is a coastal-inspired café brand that captures the laid-back vibes of sun, waves, and slow mornings by the sea. Its playful coastal design language supports coffee culture while adding warmth and character to every touchpoint.",
    content: [
      // ── Primary Logo ───────────────────────────────────────────────────
      {
        type: "split",
        heading: "Primary Logo",
        body: "The Seafoam Coffee logo combines soft, rounded lettering with ocean-inspired colors to reflect the brand's relaxed coastal atmosphere. The coffee bean icon reinforces the café's specialty coffee focus, while the playful wordmark creates a friendly and approachable identity.",
        src: s("seafoam-brandmark-1.png"),
        alt: "Seafoam primary logo",
        imageRight: true,
      },
      // ── Brandmark Variations ───────────────────────────────────────────
      { type: "heading", text: "Brandmark Variations" },
      {
        type: "gallery",
        columns: 3,
        images: [
          { src: s("seafoam-brandmark-1.png"), alt: "Seafoam brandmark — teal" },
          { src: s("seafoam-brandmark-2.png"), alt: "Seafoam brandmark — beige" },
          { src: s("seafoam-brandmark-3.png"), alt: "Seafoam brandmark — mint" },
          { src: s("seafoam-brandmark-4.png"), alt: "Seafoam brandmark — sandy scallop" },
          { src: s("seafoam-brandmark-5.png"), alt: "Seafoam brandmark — white scallop" },
          { src: s("seafoam-brandmark-6.png"), alt: "Seafoam brandmark — blue scallop" },
        ],
      },
      // ── Colour Palette ─────────────────────────────────────────────────
      { type: "heading", text: "Color Palette" },
      {
        type: "text",
        text: "Seafoam's color palette is inspired by the coast. Soft seafoam green and ocean blue bring freshness and calm, while sandy beige and rich coffee brown add warmth and grounding. Together, the hues reflect both the café's coastal roots and its inviting, cosy atmosphere.",
      },
      {
        type: "palette",
        colors: [
          { name: "Sandy Beige", value: "#EBD9C6" },
          { name: "Seafoam Green", value: "#9CD6C3" },
          { name: "Dusty Blue", value: "#5B7F9B" },
          { name: "Coffee", value: "#753E06" },
        ],
      },
      // ── Typography ─────────────────────────────────────────────────────
      { type: "heading", text: "Typography" },
      {
        type: "text",
        text: "Poppins was chosen for its circular forms that feel friendly and approachable, while its crisp structure ensures excellent readability across menus, packaging, and digital platforms. The font's versatility makes it a perfect fit for Seafoam, combining clarity with a contemporary coastal charm.",
      },
      // ── Doodles ────────────────────────────────────────────────────────
      { type: "heading", text: "Doodles" },
      {
        type: "text",
        text: "Hand-drawn doodles of shells, waves, and baked treats bring a playful balance of coast and café to the menu, adding warmth and personality to every detail.",
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          { src: s("seafoam-beach-doodle.png"), alt: "Beach doodles — shells, starfish, and seaweed" },
          { src: s("seafoam-cafe-doodle.png"), alt: "Café doodles — coffee, pastries, and baked treats" },
        ],
      },
      // ── Illustration ───────────────────────────────────────────────────
      { type: "heading", text: "Illustration" },
      {
        type: "text",
        text: "Seafoam's vibrant beach illustrations capture the café's playful soul. Inspired by surf culture and coastal life, the detailed circular artworks extend the brand into merchandise, trading card sets, and event materials.",
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          { src: s("seafoam-illustration-1.png"), alt: "Surfing skeleton illustration" },
          { src: s("seafoam-illustration-2.png"), alt: "Coastal scene illustration" },
          { src: s("seafoam-illustration-3.png"), alt: "Beach vibes illustration" },
        ],
      },
      // ── Full-bleed coastal break ────────────────────────────────────────
      { type: "fullBleed", src: s("seafoam-section.png"), alt: "Seafoam café by the coast" },
      // ── Menu ───────────────────────────────────────────────────────────
      { type: "heading", text: "Menu" },
      {
        type: "text",
        text: "Seafoam's menu design reflects the café's breezy coastal vibe. Bakery and beach motifs flow across the layout, paired with a clean and approachable type system — a menu that feels light, inviting, and easy to explore, echoing the relaxed rhythm of life by the sea.",
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          { src: s("seafoam-menu-card.png"), alt: "Seafoam menu — front" },
          { src: s("seafoam-menu-card-back.png"), alt: "Seafoam menu — back" },
        ],
      },
      // ── Mockups ────────────────────────────────────────────────────────
      { type: "heading", text: "Mockups" },
      {
        type: "text",
        text: "From tote bags to apparel, every piece carries Seafoam's playful coastal identity into daily life, turning simple items into memorable brand experiences.",
      },
      {
        type: "image",
        src: s("seafoam-mockups.png"),
        alt: "Seafoam brand mockups — tote bags, hoodies, and merchandise",
      },
      // ── Full-bleed footer ──────────────────────────────────────────────
      { type: "fullBleed", src: s("seafoam-footer-1.png"), alt: "Coffee by the sea" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Creative Design projects
// ─────────────────────────────────────────────────────────────────────────────

const creativeDesignProjects: Project[] = [
  // ── Blinkit Bingo ─────────────────────────────────────────────────────────
  {
    id: "cd-1",
    slug: "blinkit-bingo",
    title: "Blinkit Bingo",
    subtitle: "Navratri Bingo",
    description:
      "A festive Navratri-themed bag illustration for Blinkit, turning everyday grocery packaging into an interactive bingo experience.",
    thumbnail: b("blinkit-thumbnail.png"),
    heroImage: b("blinkit-banner.png"),
    alt: "Blinkit Navratri Bingo bag illustration",
    scope: ["Creative Design", "Merch and Print Design", "Illustration"],
    year: 2025,
    about:
      "This Blinkit bag illustration was created as a festive Navratri-themed experience, transforming everyday grocery packaging into an interactive celebration. Inspired by the energy and traditions of Navratri, the design features a playful bingo game filled with festive activities, making the bag both interactive and memorable while encouraging users to connect with the spirit of the festival.",
    content: [
      {
        type: "text",
        text: "Designed for Blinkit's Navratri campaign, the illustration wraps their iconic yellow grocery bag in a festive bingo card. Each square captures a classic Navratri moment — from garba nights and dandiya to festive outfits and street food — inviting customers to check off their celebrations as they shop.",
      },
      {
        type: "image",
        src: b("blinkit-bingo.png"),
        alt: "Blinkit Navratri Bingo — full bag illustration",
      },
      {
        type: "fullBleed",
        src: b("blinkit-banner.png"),
        alt: "Blinkit Navratri festive spread",
      },
    ],
  },
  // ── Funky Dogs ────────────────────────────────────────────────────────────
  {
    id: "cd-2",
    slug: "funky-dogs",
    title: "Funky Dogs",
    subtitle: "Awesome doggos",
    description:
      "A series of bold, personality-packed dog illustrations — each one stylish, silly, and unmistakably funky.",
    thumbnail: f("funky-dogs-banner-image.png"),
    heroImage: f("funky-dogs-banner-image.png"),
    alt: "Funky Dogs illustration series",
    scope: ["Illustration", "Creative Design"],
    year: 2025,
    about:
      "Funky Dogs is a series of vibrant, character-driven illustrations celebrating dogs with big personalities. Each piece captures a different mood and aesthetic — from glamorous to goofy — rendered in a bold, graphic style that's equal parts playful and polished.",
    content: [
      // ── Illustration grid ──────────────────────────────────────────────
      {
        type: "image",
        src: f("funky-dogs-illustration-group.png"),
        alt: "Funky Dogs — full illustration collection",
      },
      // ── Individual illustrations ───────────────────────────────────────
      { type: "heading", text: "The Collection" },
      { type: "image", src: f("Diamond  1.png"), alt: "Diamond Dog" },
      { type: "image", src: f("francy dog 1.png"), alt: "Francy Dog" },
      { type: "image", src: f("Chill time  1.png"), alt: "Chill Time" },
      { type: "image", src: f("heart eyes 1.png"), alt: "Heart Eyes" },
      { type: "image", src: f("Star goggles dog 1.png"), alt: "Star Goggles Dog" },
      { type: "image", src: f("PUPPY-CHINO 1.png"), alt: "Puppy-chino" },
      { type: "image", src: f("doughnut doggy 2 1.png"), alt: "Doughnut Doggy" },
      { type: "image", src: f("FLOWER DOG 1.png"), alt: "Flower Dog" },
    ],
  },
  // ── Raw Stickers ───────────────────────────────────────────────────────────
  {
    id: "cd-3",
    slug: "raw-stickers",
    title: "Raw Stickers",
    subtitle: "Bike Sticker Design",
    description:
      "A bold collection of biker-inspired sticker designs that capture humor, attitude, and individuality through expressive illustrations.",
    thumbnail: r("raw-stickers-banner.png"),
    heroImage: r("raw-stickers-banner.png"),
    alt: "Raw Stickers — bike sticker design collection",
    scope: ["Creative Design", "Illustration", "Merch and Print Design"],
    year: 2024,
    about:
      "A bold collection of biker-inspired sticker designs that capture humor, attitude, and individuality through expressive illustrations. Created during a graphic design internship, the project explores merchandise design using limited color palettes, strong contrasts, and print-ready visuals tailored for screen printing and reflective materials.",
    content: [
      // ── Project Brief ──────────────────────────────────────────────────
      { type: "heading", text: "Project Brief" },
      {
        type: "text",
        text: "A bold and expressive collection of 3×3 inch stickers designed for bikers — blending attitude, humor, and identity into compact, punchy visuals. Each sticker uses bold lines, limited color palettes, and strong contrast to ensure visibility and punch. Leaning into biker language, sarcasm, and pop-culture nods, the designs feel personal, relatable, and collectible.",
      },
      // ── Themes ────────────────────────────────────────────────────────
      { type: "heading", text: "Themes" },
      {
        type: "text",
        text: "Identity & Pride: Hello I'm a Biker, Riders Reserve — Humor & Sass: Eat Dust Hotline, Skidmarks Are My Signature — Everyday Mood: Ride On / World Off, Serial Chiller — Fantasy Meets Fuel: Saturn Your Throttle, Go Out Explore.",
      },
      // ── Sticker Gallery ────────────────────────────────────────────────
      { type: "heading", text: "The Stickers" },
      {
        type: "gallery",
        columns: 3,
        images: [
          { src: r("raw-stickers-1.png"), alt: "Turbo Ducky sticker" },
          { src: r("raw-stickers-2.png"), alt: "Raw sticker 2" },
          { src: r("raw-stickers-3.png"), alt: "Raw sticker 3" },
          { src: r("raw-stickers-4.png"), alt: "Raw sticker 4" },
          { src: r("raw-stickers-5.png"), alt: "Raw sticker 5" },
          { src: r("raw-stickers-6.png"), alt: "Raw sticker 6" },
          { src: r("raw-stickers-7.png"), alt: "Saturn Your Throttle sticker" },
          { src: r("raw-stickers-8.png"), alt: "Raw sticker 8" },
          { src: r("raw-stickers-9.png"), alt: "Raw sticker 9" },
          { src: r("raw-stickers-10.png"), alt: "Raw sticker 10" },
          { src: r("raw-stickers-11.png"), alt: "Raw sticker 11" },
          { src: r("raw-stickers-12.png"), alt: "Raw sticker 12" },
          { src: r("raw-stickers-13.png"), alt: "Raw sticker 13" },
          { src: r("raw-stickers-14.png"), alt: "Raw sticker 14" },
          { src: r("raw-stickers-15.png"), alt: "Raw sticker 15" },
        ],
      },
      // ── Section & Footer ───────────────────────────────────────────────
      { type: "fullBleed", src: r("raw-stickers-section.png"), alt: "Raw Stickers in context" },
      { type: "fullBleed", src: r("raw-stickers-footer.png"), alt: "Raw Stickers — footer" },
    ],
  },
  // ── Placeholder entries ────────────────────────────────────────────────────
  ...makeProjects("cd", 1).map((proj, i) => ({
    ...proj,
    id: `cd-${i + 4}`,
    slug: `cd-project-${i + 4}`,
  })),
];

export const workCategories: WorkCategory[] = [
  {
    id: "visual-design",
    label: "Visual Design",
    panelClass: "bg-portfolio-blue",
    color: "var(--portfolio-blue)",
    tabClass: "text-foreground",
    cardClass: "bg-portfolio-pink",
    projects: visualDesignProjects,
  },
  {
    id: "creative-design",
    label: "Creative Design",
    panelClass: "bg-portfolio-pink",
    color: "var(--portfolio-pink)",
    tabClass: "text-foreground",
    cardClass: "bg-portfolio-yellow",
    projects: creativeDesignProjects,
  },
  {
    id: "uiux-design",
    label: "UI/UX Design",
    panelClass: "bg-portfolio-yellow",
    color: "var(--portfolio-yellow)",
    tabClass: "text-foreground",
    cardClass: "bg-portfolio-pink",
    projects: makeProjects("ux", 4),
  },
  {
    id: "media-content",
    label: "Media+Content",
    panelClass: "bg-portfolio-purple",
    color: "var(--portfolio-purple)",
    tabClass: "text-foreground",
    cardClass: "bg-portfolio-yellow",
    projects: makeProjects("mc", 4),
  },
];

export const allProjects = workCategories.flatMap((category) =>
  category.projects.map((project) => ({ project, category })),
);

export const getProjectBySlug = (slug: string) =>
  allProjects.find((entry) => entry.project.slug === slug);
