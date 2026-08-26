"use client";
import ScheduleTabs from "@/components/organisms/schedule/ScheduleTabs";
import { useShowStore } from "@/utils/store/zustand-hooks/useShowStore";
import { useEffect } from "react";

export default function SchedulePage() {
  const getScheduledEpisodes = useShowStore(
    (state) => state.getScheduledEpisodes,
  );
  const schedules = useShowStore((state) => state.scheduledEpisodes);

  useEffect(() => {
    getScheduledEpisodes();
  }, [getScheduledEpisodes]);
  return (
    <main>
      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-295">
          <div className="mb-4.5 flex items-center gap-2.5 font-mono text-[13px] text-dim">
            <span className="h-1.75 w-1.75 rounded-full bg-yellow shadow-[0_0_0_3px_rgba(242,201,76,0.15)]" />
            PAGE 180 — THIS WEEK
          </div>
          <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            Schedule
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            What&apos;s airing, day by day. Tap a day to jump to its page.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-295">
          <ScheduleTabs schedules={schedules} />
        </div>
      </section>
    </main>
  );
}
