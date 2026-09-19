"use client";

import { RankedShow, Show } from "@/app/utils/types/shows";
import Image from "next/image";

export default function RankSlot({
  show,
  rank,
  isFirst,
  isLast,
  onPick,
  onClear,
  onMove,
}: {
  show: RankedShow | null;
  rank: number;
  isFirst: boolean;
  isLast: boolean;
  onPick: () => void;
  onClear: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  // Top 3 get the broadcast colors; the rest stay neutral.
  const rankColor =
    rank === 1
      ? "text-yellow"
      : rank === 2
        ? "text-cyan"
        : rank === 3
          ? "text-magenta"
          : "text-dim";

  if (!show) {
    return (
      <li className="flex items-center gap-4 border-b border-line px-4 py-3.5 last:border-b-0">
        <span className={`w-7 shrink-0 font-mono text-sm ${rankColor}`}>
          {String(rank).padStart(2, "0")}
        </span>
        <div className="h-10 w-10 shrink-0 border border-dashed border-line" />
        <span className="flex-1 font-mono text-sm text-dim">Empty slot</span>
        <button
          type="button"
          onClick={onPick}
          className="shrink-0 border border-paper px-2.5 py-1 font-mono text-xs text-paper transition-colors hover:border-cyan-400 hover:text-cyan-400 cursor-pointer"
        >
          Pick
        </button>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-4 border-b border-line px-4 py-3.5 last:border-b-0">
      <span className={`w-7 shrink-0 font-mono text-sm ${rankColor}`}>
        {String(rank).padStart(2, "0")}
      </span>

      {show.image ? (
        <Image
          alt={show.title}
          src={show.image}
          width={40}
          height={40}
          className="shrink-0 object-cover"
        />
      ) : (
        <div className="h-10 w-10 shrink-0 border border-line" />
      )}

      <span className="flex-1 truncate font-display text-[15px]">
        {show.title}
      </span>

      <div className="flex shrink-0 items-center gap-1.5 font-mono text-xs">
        <button
          type="button"
          onClick={() => onMove(-1)}
          disabled={isFirst}
          aria-label={`Move ${show.title} up`}
          className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-dim"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={() => onMove(1)}
          disabled={isLast}
          aria-label={`Move ${show.title} down`}
          className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-dim"
        >
          ▼
        </button>
        <button
          type="button"
          onClick={onPick}
          className="border border-paper px-2.5 py-1 text-paper transition-colors hover:border-cyan hover:text-cyan"
        >
          Swap
        </button>
        <button
          type="button"
          onClick={onClear}
          aria-label={`Clear slot ${rank}`}
          className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-magenta hover:text-magenta"
        >
          ×
        </button>
      </div>
    </li>
  );
}
