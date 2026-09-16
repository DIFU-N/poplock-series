import SignalBars from "../atoms/SignalBars";
import TuneHeadline from "../atoms/TuneHeadline";


export default function Hero() {
  return (
    <section className="border-b border-line px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-4.5 mb-[18px] flex items-center gap-2.5 font-mono text-[13px] text-dim">
          <span className="h-[7px] w-[7px] rounded-full bg-green shadow-[0_0_0_3px_rgba(111,207,122,0.15)]" />
          SIGNAL ACQUIRED — PAGE 100
        </div>

        <TuneHeadline text={"Reviews for what's\nactually worth watching."} />

        <p className="mb-[30px] max-w-[560px] text-[17px] text-[#c9c8c0]">
          Every show gets a plain read: what it&apos;s about, who it&apos;s
          for, and whether it&apos;s worth your evening. No stars — we rate by
          signal strength.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#reviews"
            className="border border-paper bg-paper px-[18px] py-[11px] font-mono text-[13px] text-ink transition-colors hover:bg-cyan hover:border-cyan"
          >
            Browse reviews
          </a>
          <a
            href="#foryou"
            className="border border-paper px-[18px] py-[11px] font-mono text-[13px] text-paper transition-colors hover:border-cyan hover:text-cyan"
          >
            See what&apos;s for you
          </a>
        </div>

        <div className="mt-11 grid grid-cols-1 border border-line sm:grid-cols-[auto_1fr]">
          <div className="whitespace-nowrap bg-magenta px-4 py-2 font-display text-[13px] font-bold tracking-[0.08em] text-ink sm:px-2.5 sm:py-4 sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed]">
            FEATURED · P.101
          </div>
          <div className="px-7 py-6">
            <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-4">
              <span className="bg-cyan px-[7px] py-[2px] font-mono text-[11px] tracking-[0.04em] text-ink">
                SCI-FI
              </span>
              <span className="font-mono text-[13px] text-dim">
                P.101 / 06
              </span>
            </div>
            <h2 className="mb-2.5 font-display text-[26px]">Static Bloom</h2>
            <p className="mb-4 max-w-[60ch] text-[#c9c8c0]">
              A small town loses its broadcast signal for one night — and
              gets something else back in its place. Slow-burn, patient, and
              unnerving in a way that rewards sitting with it. The best new
              drama of the season.
            </p>
            <div className="flex items-center gap-2">
              <SignalBars signal={4} />
              <span className="font-mono text-xs text-dim">
                SIGNAL 4/5 — STRONG
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
