import { Portfolio } from "@/components/portfolio";

export default function Home() {
  return (
    <main className="flex flex-col">
      <h1>Studio Squiggle</h1>
      <Portfolio />
      {/* <section className="mt-10 grid">
        <div className="h-50 w-full folder bg-portfolio-purple translate-y-[-1.75rem]"></div>
        <div className="h-50 w-full folder bg-portfolio-yellow translate-y-[-1.25rem]"></div>
        <div className="h-50 w-full folder bg-portfolio-pink translate-y-[-0.75rem]"></div>
        <div className="h-50 w-full folder bg-portfolio-blue">
          <button>Visual Design</button>
        </div>
      </section>

      <section className="relative">This IS NEW SECTION</section> */}
    </main>
  );
}
