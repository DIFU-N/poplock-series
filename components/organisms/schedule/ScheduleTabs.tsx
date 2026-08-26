"use client";

import { useMemo, useState } from "react";
import { ScheduledShow } from "@/utils/types/episodes";
import { useRouter } from "next/navigation";

export default function ScheduleTabs({
  schedules,
}: {
  schedules: ScheduledShow[];
}) {
  const router = useRouter();
  const onClick = async (id: string) => {
    if (id) {
      router.push(`/show/${id}`);
    } else {
      return;
    }
  };

  const week = useMemo(() => {
    const grouped = new Map<string, ScheduledShow[]>(); //what does this mean?

    schedules.forEach((schedule) => {
      if (!schedule.nextEpisode.airDate) return;

      const date = schedule.nextEpisode.airDate.split("T")[0]; //what does this mean?

      if (!grouped.has(date)) {
        grouped.set(date, []); // what does this mean?
      }

      grouped.get(date)!.push(schedule);
    });

    return Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, shows]) => ({
        date,
        label: new Date(date).toLocaleString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        shows,
      }));
  }, [schedules]);

  const [active, setActive] = useState(0);

  const day = week[active];

  if (!day) {
    return (
      <div className="border border-line px-4 py-4 font-mono text-sm text-dim">
        Nothing scheduled yet.
      </div>
    );
  }
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-1.5 font-mono text-[13px]">
        {week.map((d, i) => (
          <button
            key={d.date}
            onClick={() => setActive(i)}
            className={`border px-3.5 py-2 transition-colors cursor-pointer ${
              i === active
                ? "border-green-500 text-green-500"
                : "border-line text-dim hover:border-paper hover:text-paper"
            }`}
          >
            {/* <span className={i === active ? "opacity-70" : "mr-1.5 text-cyan"}>
              {i === active ? "" : d.pageNo.replace("P.", "") + " "}
            </span> */}
            {d.label}
          </button>
        ))}
      </div>

      {/* <div className="mb-3 font-mono text-[13px] text-dim">{day.pageNo}</div> */}

      <div className="border border-line font-mono text-sm">
        {day.shows.map((schedule) => (
          <div
          onClick={() => onClick(schedule.show.id)}
            key={schedule.show.id}
            className={`grid grid-cols-[70px_1fr_auto] items-center cursor-pointer gap-3 px-4 py-3 sm:grid-cols-[90px_1fr_auto]`}
          >
            <span className={"text-dim"}>
              {schedule.nextEpisode.airTime
                ? `${schedule.nextEpisode.airTime} ET`
                : ""}
            </span>

            {/* <span className="text-xs text-dim">{row.badge}</span> */}
            <div className="flex flex-col">
              <span className="text-paper">{schedule.show.title}</span>
              <span className="text-dim text-xs">
                S{schedule.nextEpisode.season} E{schedule.nextEpisode.number}
                {schedule.nextEpisode.title &&
                  ` - ${schedule.nextEpisode.title}`}
              </span>
            </div>

            <span className="text-xs text-dim">
              {schedule.nextEpisode.runtime} min
            </span>
          </div>
        ))}
        {day.shows.length === 0 && (
          <div className="px-4 py-6 text-dim">Nothing scheduled yet.</div>
        )}
      </div>
    </div>
  );
}
