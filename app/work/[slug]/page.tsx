import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FluidMenu } from "@/components/fluid-menu";
import { ProjectContent } from "@/components/sections/project-content";
import { allProjects, getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return allProjects.map(({ project }) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getProjectBySlug(slug);
  if (!entry) return {};
  const { project } = entry;
  return {
    title: `${project.title} — Studio.Squiggle`,
    description: project.about ?? project.summary ?? project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getProjectBySlug(slug);
  if (!entry) notFound();

  const { project, category } = entry;

  const siblings = category.projects;
  const index = siblings.findIndex((p) => p.id === project.id);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index < siblings.length - 1 ? siblings[index + 1] : null;

  const hasCaseStudyHeader = project.scope && project.scope.length > 0;

  return (
    <main className="relative min-h-svh bg-white text-foreground">
      <FluidMenu />

      {hasCaseStudyHeader ? (
        // ── Case-study header: dark info bar + full-width hero image ──────
        <>
          <div className="bg-[#100B0A] text-portfolio-cream pt-16 md:pt-20">
            {/* Back link */}
            <div className="mx-auto max-w-5xl px-4 pb-6 md:px-8">
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 font-serif text-sm font-light lowercase text-portfolio-cream/60 transition-colors hover:text-portfolio-cream"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                our work
              </Link>
            </div>

            {/* Info columns */}
            <div className="mx-auto max-w-5xl px-4 pb-12 md:px-8 md:pb-16">
              {/* Mobile: stacked / centered */}
              <div className="flex flex-col items-center gap-8 text-center md:hidden">
                <div>
                  <h1 className="font-light text-4xl">{project.title}</h1>
                  {project.subtitle && (
                    <p className="mt-1 font-serif font-light text-portfolio-cream/60">
                      {project.subtitle}
                    </p>
                  )}
                </div>
                <div>
                  <p className="mb-3 font-serif text-xs font-medium uppercase tracking-[0.15em] text-portfolio-cream/40">
                    Scope
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    {project.scope!.map((s, i) => (
                      <span
                        key={s}
                        className={`rounded-full px-4 py-1 font-serif text-sm ${
                          i === 0
                            ? "bg-portfolio-blue text-foreground font-medium"
                            : "border border-portfolio-cream/30 text-portfolio-cream/80"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 font-serif text-xs font-medium uppercase tracking-[0.15em] text-portfolio-cream/40">
                    About
                  </p>
                  {project.year && (
                    <p className="font-serif text-sm text-portfolio-cream/60">
                      Year: {project.year}
                    </p>
                  )}
                  {project.about && (
                    <p className="mt-2 font-serif font-light text-sm leading-relaxed text-portfolio-cream/80 max-w-xs mx-auto">
                      {project.about}
                    </p>
                  )}
                </div>
              </div>

              {/* Desktop: three columns */}
              <div className="hidden md:flex md:items-start md:gap-12">
                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h1 className="font-light text-5xl leading-tight">
                    {project.title}
                  </h1>
                  {project.subtitle && (
                    <p className="mt-2 font-serif font-light text-portfolio-cream/60 text-lg">
                      {project.subtitle}
                    </p>
                  )}
                </div>

                {/* Scope */}
                <div className="w-52 shrink-0">
                  <p className="mb-4 font-serif text-xs font-medium uppercase tracking-[0.15em] text-portfolio-cream/40">
                    Scope
                  </p>
                  <div className="flex flex-col items-start gap-2">
                    {project.scope!.map((s, i) => (
                      <span
                        key={s}
                        className={`rounded-full px-4 py-1 font-serif text-sm ${
                          i === 0
                            ? "bg-portfolio-blue text-foreground font-medium"
                            : "border border-portfolio-cream/30 text-portfolio-cream/80"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* About */}
                <div className="flex-1 min-w-0">
                  <p className="mb-3 font-serif text-xs font-medium uppercase tracking-[0.15em] text-portfolio-cream/40">
                    About
                  </p>
                  {project.year && (
                    <p className="font-serif text-sm text-portfolio-cream/60 mb-2">
                      Year: {project.year}
                    </p>
                  )}
                  {project.about && (
                    <p className="font-serif font-light text-sm leading-relaxed text-portfolio-cream/80">
                      {project.about}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Full-width hero image */}
          {(() => {
            const heroSrc = project.heroImage ?? project.thumbnail;
            return (
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-white">
                <Image
                  src={heroSrc}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                  unoptimized={heroSrc.endsWith(".gif")}
                />
              </div>
            );
          })()}
        </>
      ) : (
        // ── Simple header: category tag + title + summary + hero ──────────
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-0 md:max-w-5xl md:px-8 md:pt-24">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-serif text-sm font-light lowercase text-foreground/70 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            our work
          </Link>

          <header className="mt-8 md:mt-12">
            <span
              className="inline-block rounded-full px-4 py-1 font-serif text-xs font-light"
              style={{ backgroundColor: category.color }}
            >
              {category.label}
            </span>
            <h1 className="mt-4 font-light text-4xl md:text-6xl">
              {project.title}
            </h1>
            {project.summary && (
              <p className="mt-3 max-w-2xl font-serif font-light text-base md:text-xl text-foreground/80">
                {project.summary}
              </p>
            )}
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white">
              <Image
                src={project.thumbnail}
                alt={project.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </header>
        </div>
      )}

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-12 md:max-w-5xl md:px-8 md:py-16">
        <article>
          <ProjectContent blocks={project.content} />
        </article>

        {/* Prev / next */}
        {(prev || next) && (
          <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-foreground/10 pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="group flex flex-col gap-1 rounded-2xl border border-foreground/10 p-5 transition-colors hover:bg-foreground/5"
              >
                <span className="inline-flex items-center gap-2 font-serif text-xs font-light lowercase text-foreground/60">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  previous
                </span>
                <span className="font-light text-lg">{prev.title}</span>
              </Link>
            ) : (
              <span aria-hidden className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-col items-end gap-1 rounded-2xl border border-foreground/10 p-5 text-right transition-colors hover:bg-foreground/5"
              >
                <span className="inline-flex items-center gap-2 font-serif text-xs font-light lowercase text-foreground/60">
                  next
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="font-light text-lg">{next.title}</span>
              </Link>
            )}
          </nav>
        )}

        {/* Back-to-work CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/#work"
            className="cursor-pointer rounded-full border border-foreground px-6 py-2 font-serif text-sm font-light lowercase transition-colors hover:bg-foreground hover:text-portfolio-cream"
          >
            back to our work
          </Link>
        </div>
      </div>
    </main>
  );
}
