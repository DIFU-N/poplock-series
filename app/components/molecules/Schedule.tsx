import { scheduleRows } from "@/lib/data";

export default function Schedule() {
  return (
    <section id="schedule" className="border-b border-line px-6 py-14">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-7">
          <div className="font-mono text-[13px] text-dim">
            <span className="text-cyan">P.180</span> — TONIGHT
          </div>
          <h2 className="mt-1.5 font-display text-2xl">What&apos;s on</h2>
        </div>

        <div className="border border-line font-mono text-sm">
          {scheduleRows.map((row, i) => (
            <div
              key={row.time + row.show}
              className={`grid grid-cols-[70px_1fr_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[90px_1fr_auto] ${
                i !== scheduleRows.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <span className={row.live ? "text-green" : "text-dim"}>
                {row.time}
              </span>
              <span className="text-paper">{row.show}</span>
              <span className="text-xs text-dim">{row.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
