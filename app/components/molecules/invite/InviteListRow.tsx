"use client";
import { FFRankDTO } from "@/app/utils/types/ffranks";
import Image from "next/image";

export default function InviteListRow({
  show,
  rank,
  isFirst,
  isLast,
  onSwap,
  onMove,
  flash,
}: {
  show: FFRankDTO;
  rank: number;
  isFirst: boolean;
  isLast: boolean;
  onSwap: () => void;
  onMove: (direction: -1 | 1) => void;
  flash?: boolean;
}) {
  return (
    <li
      className={`flex items-center gap-2 md:gap-4 border-b border-line px-4 py-3.5 last:border-b-0 transition-colors duration-300
        ${flash ? "bg-fuchsia-700/20" : ""}
      `}
    >
      <span className="w-7 shrink-0 font-mono md:text-sm text-[10px]">
        {String(rank).padStart(2, "0")}
      </span>

      {show.showImage ? (
        <Image
          alt={show.showName}
          src={show.showImage}
          width={40}
          height={40}
          className="shrink-0 object-cover"
        />
      ) : (
        <div className="h-10 w-10 shrink-0 border border-line hidden md:flex" />
      )}

      <span className="flex-1 truncate font-display text-[10px] md:text-[15px] font-bold">
        {show.showName}
      </span>

      <div className="flex shrink-0 items-center gap-1.5 font-mono text-[5px] md:text-xs">
        <button
          type="button"
          onClick={() => onMove(-1)}
          disabled={isFirst}
          className="border border-line px-1.5 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line cursor-pointer bg-green-400"
        >
          ▲
        </button>

        <button
          type="button"
          onClick={() => onMove(1)}
          disabled={isLast}
          className="border border-line px-1.5 py-1 transition-colors disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line cursor-pointer bg-red-400"
        >
          ▼
        </button>

        <button
          type="button"
          onClick={onSwap}
          className="border border-paper px-2.5 py-1 cursor-pointer hover:bg-fuchsia-200"
        >
          Swap
        </button>
      </div>
    </li>
  );
}