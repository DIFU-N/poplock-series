"use client";
import ScheduleTabs from "@/app/components/organisms/schedule/ScheduleTabs";
import { useShowStore } from "@/app/utils/store/zustand-hooks/useShowStore";
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
       <section className="bg-yellow-400 px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-295 flex-col items-start gap-6">
          <span className="rounded-full bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-gray-900">
            Watch. Repeat.
          </span>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl gap-2 flex">
            Schedule
            {/* <span className="text-yellow-300">Rates</span> */}
          </h1>
          <p className="max-w-140 text-lg text-gray-800">
            A week of television, mapped day by day. Step into each day and explore what’s airing, and why dadaman suggests you watch it. 
          </p>
          <p className="max-w-140 text-base text-gray-600">
            Just trust dadaman 
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
