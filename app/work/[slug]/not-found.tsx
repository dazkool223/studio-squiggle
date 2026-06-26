import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-portfolio-cream px-6 text-center text-foreground">
      <h1 className="font-light text-4xl md:text-5xl">Project not found</h1>
      <p className="max-w-md font-serif font-light text-base text-foreground/70">
        That project seems to have wandered off. It happens to the weird ones.
      </p>
      <Link
        href="/#work"
        className="rounded-full border border-foreground px-6 py-2 font-serif text-sm font-light lowercase transition-colors hover:bg-foreground hover:text-portfolio-cream"
      >
        back to our work
      </Link>
    </main>
  );
}
