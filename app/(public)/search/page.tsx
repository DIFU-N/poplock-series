import SearchClient from "@/app/components/organisms/search/SearchClient";

export default function SearchPage() {
  return (
    <main>
      
       <section className="bg-cyan-400 px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-295 flex-col items-start gap-6">
          <span className="rounded-full bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-gray-900">
            Search.
          </span>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl gap-2 flex">
            Look something up.
            {/* <span className="text-yellow-300">Rates</span> */}
          </h1>
          <p className="max-w-140 text-lg text-gray-800">
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
