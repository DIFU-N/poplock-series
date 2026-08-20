import SearchClient from "@/components/organisms/search/SearchClient";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <main>
      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-295">
          <div className="mb-4.5 flex items-center gap-2.5 font-mono text-[13px] text-dim">
            <span className="h-1.75 w-1.75 rounded-full bg-cyan shadow-[0_0_0_3px_rgba(77,217,232,0.15)]" />
            PAGE 199 — SEARCH
          </div>
          <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            Look something up
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            Search by title, mood, or genre. Filters narrow it further.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-295">
          <SearchClient initialQuery={searchParams.q ?? ""} />
        </div>
      </section>
    </main>
  );
}
