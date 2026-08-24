export default function SearchSection() {
  return (
    <section id="search" className="px-6 py-14">
      <div className="mx-auto max-w-295">
        <div className="mb-7">
          <div className="font-mono text-[13px] text-dim">
            <span className="text-cyan">P.199</span> — SEARCH
          </div>
          <h2 className="mt-1.5 font-display text-2xl">
            Look something up
          </h2>
        </div>

        <form className="flex max-w-130 border border-line">
          <input
            type="text"
            placeholder='Search a title, actor, or mood (e.g. "slow burn mystery")'
            className="flex-1 bg-transparent px-4 py-3.5 font-mono text-sm text-paper outline-none placeholder:text-dim"
          />
          <button
            type="submit"
            className="border-l border-line bg-paper px-5 font-mono text-[13px] text-ink transition-colors hover:bg-cyan"
          >
            Go
          </button>
        </form>
      </div>
    </section>
  );
}
