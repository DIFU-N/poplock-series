import SearchClient from "@/app/components/organisms/search/SearchClient";

export default function SearchPage() {
  return (
    <main>
      <section className="border-b px-6 py-12">
        <div className="mx-auto max-w-295">
          <h1 className="mb-3 text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            Look something up
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            Search by title.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-295">
          <SearchClient />
        </div>
      </section>
    </main>
  );
}
