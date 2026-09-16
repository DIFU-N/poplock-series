import { reviews, genreChipClasses, genreLabels } from "@/lib/data";
import SignalBars from "../atoms/SignalBars";

export default function ReviewGrid() {
  return (
    <section id="reviews" className="border-b border-line px-6 py-14">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[13px] text-dim">
              <span className="text-cyan">P.120</span> — LATEST REVIEWS
            </div>
            <h2 className="mt-1.5 font-display text-2xl">On now</h2>
          </div>
          <div className="font-mono text-[13px] text-dim">
            6 pages · updated weekly
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.page}
              className="flex flex-col gap-3 bg-ink p-5 transition-colors hover:bg-ink-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-dim">{r.page}</span>
                <span
                  className={`px-[7px] py-0.5 font-mono text-[11px] tracking-[0.04em] text-ink ${genreChipClasses[r.genre]}`}
                >
                  {genreLabels[r.genre]}
                </span>
              </div>
              <h3 className="font-display text-lg">{r.title}</h3>
              <p className="grow text-[14.5px] text-[#c9c8c0]">
                {r.blurb}
              </p>
              <div className="flex items-center justify-between border-t border-line pt-1.5">
                <SignalBars signal={r.signal} />
                <span className="font-mono text-xs text-dim">{r.signal}/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
