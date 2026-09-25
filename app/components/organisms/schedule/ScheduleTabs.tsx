"use client";

import { useMemo, useState } from "react";
import { ScheduledShow } from "@/app/utils/types/episodes";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ScheduleTabs({
  schedules,
}: {
  schedules: ScheduledShow[];
}) {
  const router = useRouter();
  const onClick = (id: string) => {
    if (id) {
      router.push(`/show/${id}`);
    }
  };

  const week = useMemo(() => {
    // A Map is the right tool here because the keys (dates) aren't known
    // ahead of time — we discover them as we loop through `schedules` —
    // and we need fast "does this date already have a bucket?" lookups.
    const grouped = new Map<string, ScheduledShow[]>();

    schedules.forEach((schedule) => {
      if (!schedule.nextEpisode.airDate) return;

      // airDate arrives as a full ISO timestamp, e.g. "2026-09-25T20:00:00Z".
      // Splitting on "T" gives ["2026-09-25", "20:00:00Z"] — [0] is just
      // the date, which is what we group episodes by (ignoring the time).
      const date = schedule.nextEpisode.airDate.split("T")[0];

      // First episode we've seen for this date — create its bucket
      // before we try to push into it below.
      if (!grouped.has(date)) {
        grouped.set(date, []);
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
            className={`cursor-pointer border px-3.5 py-2 transition-colors ${
              i === active
                ? "border-green-500 text-green-500"
                : "border-line text-dim hover:border-paper hover:text-paper"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="border border-line font-mono text-sm">
        {day.shows.map((schedule) => (
          <div
            onClick={() => onClick(schedule.show.id)}
            key={schedule.show.id}
            className="grid cursor-pointer grid-cols-[56px_48px_1fr_auto] items-center gap-3 border-b border-line px-4 py-3 transition-colors last:border-b-0 hover:bg-ink-2 sm:grid-cols-[72px_56px_1fr_auto]"
          >
            {/* Not every episode has a confirmed air time yet — fall
                back to a plain label instead of rendering nothing. */}
            <span className="text-xs text-dim sm:text-sm">
              {schedule.nextEpisode.airTime
                ? `${schedule.nextEpisode.airTime} ET`
                : "Time TBA"}
            </span>

            {schedule.show.image ? (
              <Image
                alt={schedule.show.title}
                src={schedule.show.image}
                width={100}
                height={100}
                className="h-full w-full shrink-0 rounded-sm object-cover"
              />
            ) : (
              <div className="h-12 w-12 shrink-0 rounded-sm border border-line" />
            )}

            <div className="flex min-w-0 flex-col">
              <span className="truncate text-paper">
                {schedule.show.title}
              </span>
              <span className="truncate text-xs text-dim">
                S{schedule.nextEpisode.season} E{schedule.nextEpisode.number}
                {schedule.nextEpisode.title &&
                  ` - ${schedule.nextEpisode.title}`}
              </span>
            </div>

            {/* Runtime is also sometimes missing (e.g. unaired episodes) —
                show a dash instead of "undefined min". */}
            <span className="whitespace-nowrap text-xs text-dim">
              {schedule.nextEpisode.runtime
                ? `${schedule.nextEpisode.runtime} min`
                : "—"}
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