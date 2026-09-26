"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export type FFRankDTO = {
  showId: string;
  showName: string;
  showImage: string;
  rank: number;
  tvMazeId: number;
};

export default function RankingTable({
  rankings,
}: {
  rankings: FFRankDTO[];
}) {
  const router = useRouter();

  if (rankings.length === 0) {
    return (
      <div className="border border-line px-4 py-6 font-mono text-sm text-dim">
        No rankings yet.
      </div>
    );
  }

  return (
    <div className="border border-line font-mono text-sm">
      {/* header row */}
      <div className="grid grid-cols-[40px_48px_1fr_auto] items-center gap-3 border-b border-line px-4 py-2.5 text-xs uppercase tracking-wide text-dim sm:grid-cols-[48px_56px_1fr_auto]">
        <span>#</span>
        <span />
        <span>Show</span>
        <span className="text-right">Points</span>
      </div>

      {rankings.map((entry, i) => {
        const position = i + 1;
        const podium =
          position === 1
            ? "text-yellow-400"
            : position === 2
              ? "text-cyan-400"
              : position === 3
                ? "text-pink-400"
                : "";

        return (
          <div
            key={entry.showId}
            onClick={() => router.push(`/show/${entry.showId}`)}
            className="grid cursor-pointer grid-cols-[40px_48px_1fr_auto] items-center gap-3 border-b border-line px-4 py-3 transition-colors last:border-b-0 hover:bg-ink-2 sm:grid-cols-[48px_56px_1fr_auto]"
          > 
            <span className={`text-xs font-bold ${podium}`}>
              {String(position).padStart(2, "0")}
            </span>

            {entry.showImage ? (
              <Image
                alt={entry.showName}
                src={entry.showImage}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-sm object-cover"
              />
            ) : (
              <div className="h-10 w-10 shrink-0 rounded-sm border border-line" />
            )}

            <span className="text-xs hover:text-gray-700">{entry.showName}</span>

            <span className="whitespace-nowrap text-right text-paper">
              {entry.rank}
              <span className="ml-1 text-xs text-dim">pts</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}