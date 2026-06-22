import { OurWorkTabs } from "@/components/sections/our-work-tabs";

// Temporary preview of the "Our Work" folder layout under consideration.
// Delete this route once the design is locked into the real section.
export default function WorkPreview() {
  return (
    <main className="min-h-svh bg-portfolio-cream text-foreground px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center font-light text-3xl md:text-4xl">Our Work</h1>
        <p className="mt-1 text-center font-serif font-light text-base md:text-xl">
          Done. Delivered. Displayed.
        </p>
        <p className="mt-3 text-center font-serif font-light text-sm opacity-60">
          Horizontal staggered tabs — click a folder tab to bring it forward.
        </p>

        <div className="mt-10">
          <OurWorkTabs />
        </div>
      </div>
    </main>
  );
}
