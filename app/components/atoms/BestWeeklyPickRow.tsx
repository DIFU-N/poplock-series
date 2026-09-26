"use client";

import Image from "next/image";

export interface DraftPick {
  key: string; // client-only, for React list rendering
  id?: string; // present when this draft came from an existing pick
  realName: string;
  character: string;
  showId: string | null;
  showName: string;
  showImage?: string | null;
}

export default function BestWeeklyPickRow({
  pick,
  isFirst,
  isLast,
  onChangeField,
  onPickShow,
  onRemove,
  onMove,
}: {
  pick: DraftPick;
  isFirst: boolean;
  isLast: boolean;
  onChangeField: (field: "realName" | "character", value: string) => void;
  onPickShow: () => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  return (
    <div className="border border-line p-4.5">
      <div className="mb-3 flex items-center gap-3">
        {pick.showImage ? (
          <Image
            alt={pick.showName}
            src={pick.showImage}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-sm object-cover"
          />
        ) : (
          <div className="h-12 w-12 shrink-0 rounded-sm border border-dashed border-line" />
        )}

        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-sm text-paper">
            {pick.showName || "No show selected"}
          </div>
        </div>

        <button
          type="button"
          onClick={onPickShow}
          className="shrink-0 border border-paper px-2.5 py-1 font-mono text-xs text-paper transition-colors hover:border-cyan hover:text-cyan"
        >
          {pick.showId ? "Change show" : "Pick show"}
        </button>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-mono text-xs text-dim">
            Real name
          </label>
          <input
            type="text"
            value={pick.realName}
            onChange={(e) => onChangeField("realName", e.target.value)}
            placeholder="e.g. Lucy Freyer"
            className="w-full border border-line bg-transparent px-3 py-2 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
          />
        </div>
        <div>
          <label className="mb-1 block font-mono text-xs text-dim">
            Character
          </label>
          <input
            type="text"
            value={pick.character}
            onChange={(e) => onChangeField("character", e.target.value)}
            placeholder="e.g. Elena Reyes"
            className="w-full border border-line bg-transparent px-3 py-2 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={isFirst}
            aria-label="Move pick up"
            className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-dim"
          >
            ▲
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={isLast}
            aria-label="Move pick down"
            className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-dim"
          >
            ▼
          </button>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="font-mono text-xs text-dim transition-colors hover:text-magenta"
        >
          Remove pick
        </button>
      </div>
    </div>
  );
}