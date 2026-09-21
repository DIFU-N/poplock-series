"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInviteStore } from "@/app/utils/store/zustand-hooks/useInviteStore";
import InviteListRow from "@/app/components/molecules/invite/InviteListRow";
import SwapShowModal from "@/app/components/molecules/invite/SwapShowModal";
import { useFFRankingStore } from "@/app/utils/store/zustand-hooks/useFFRankingStore";
import { FFRankDTO } from "@/app/utils/types/ffranks";

export default function InvitePage() {
  const params = useParams<{ token: string }>();
  const token = params.token;

  const invite = useInviteStore((s) => s.invite);
  const loading = useInviteStore((s) => s.loading);
  const error = useInviteStore((s) => s.error);
  const submitting = useInviteStore((s) => s.submitting);
  const submitted = useInviteStore((s) => s.submitted);
  const fetchInvite = useInviteStore((s) => s.fetchInvite);
  const submitList = useInviteStore((s) => s.submitList);
  const getDmansRanking = useFFRankingStore((s) => s.getDadamansRanking);

  const dadamansRanking = useFFRankingStore((s) => s.dadamansRanking);

  const [swapIndex, setSwapIndex] = useState<number | null>(null);
  const [shows, setShows] = useState<FFRankDTO[] | null>(null);

  useEffect(() => {
    if (token) fetchInvite(token);

    getDmansRanking();
  }, [token, fetchInvite, getDmansRanking]);

  // Seed the editable list from the inviter's list once it loads —
  // this is what makes "the first thing they see is my list" true.
  // if (invite) setShows(invite.shows);
  const displayShows = shows ?? dadamansRanking ?? [];

  function moveShow(index: number, direction: -1 | 1) {
    setShows((prev) => {
      const base = prev ?? dadamansRanking ?? [];
      const next = [...base];

      const target = index + direction;
      if (target < 0 || target >= next.length) return next;

      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function handleSwapSelect(show: FFRankDTO) {
    if (swapIndex === null) return;

    setShows((prev) => {
      const base = prev ?? dadamansRanking ?? [];

      return base.map((s, i) => (i === swapIndex ? { ...show } : s));
    });

    setSwapIndex(null);
  }

  function resetToOriginal() {
    if (dadamansRanking) {
      setShows(dadamansRanking);
    }
  }

  function handleSubmit() {
    if (!token) return;

    const base = shows ?? dadamansRanking ?? [];

    submitList(
      token,
      base.map((s) => s.tvMazeId),
    );
  }

  return (
    <main>
      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-295">
          <div className="mb-4.5 font-mono text-[13px] text-dim">
            PAGE 210 — INVITE
          </div>

          {loading && (
            <p className="font-mono text-sm text-dim">Loading your invite…</p>
          )}

          {!loading && error && (
            <>
              <h1 className="mb-3 font-display text-2xl">
                We couldn&apos;t open this invite
              </h1>
              <p className="max-w-140 text-[#c9c8c0]">{error}</p>
            </>
          )}

          {!loading && !error && invite && !submitted && (
            <>
              <h1 className="mb-3 font-display text-[clamp(28px,5vw,44px)] font-bold leading-[1.05] tracking-tight">
                {invite?.recipientName}, build your Top 10
              </h1>
              <p className="max-w-140 text-[17px] text-[#c9c8c0]">
                {invite?.createdByName ?? "Someone"} shared their Top 10 with
                you. Swap out anything that&apos;s not you, and reorder the rest
                until it&apos;s yours.
              </p>
            </>
          )}

          {!loading && !error && submitted && (
            <>
              <h1 className="mb-3 font-display text-2xl">
                Your Top 10 is saved
              </h1>
              <p className="max-w-140 text-[#c9c8c0]">
                Thanks — your list has been submitted.
              </p>
            </>
          )}
        </div>
      </section>

      {!loading && !error && invite && (
        <section className="px-6 py-14">
          <div className="mx-auto max-w-295">
            {!submitted ? (
              <>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[13px] text-dim">
                  <span>{displayShows.length} shows</span>
                  <button
                    type="button"
                    onClick={resetToOriginal}
                    className="text-dim underline decoration-line underline-offset-2 hover:text-cyan"
                  >
                    reset to original list
                  </button>
                </div>

                <ol className="mb-6 border border-line">
                  {displayShows.map((show, i) => (
                    <InviteListRow
                      key={show.showId}
                      show={show}
                      rank={i + 1}
                      isFirst={i === 0}
                      isLast={i === displayShows.length - 1}
                      onSwap={() => setSwapIndex(i)}
                      onMove={(direction) => moveShow(i, direction)}
                    />
                  ))}
                </ol>

                {error && (
                  <p className="mb-5 border-l-2 border-magenta pl-3 font-mono text-[13px] text-magenta">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full border border-paper bg-paper px-4.5 py-3.25 font-mono text-[13px] text-ink transition-colors hover:border-cyan hover:bg-cyan disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? "Saving…" : "Save my Top 10"}
                </button>
              </>
            ) : (
              <ol className="border border-line">
                {displayShows.map((show, i) => (
                  <li
                    key={show.showId}
                    className="flex items-center gap-4 border-b border-line px-4 py-3.5 last:border-b-0"
                  >
                    <span className="w-7 shrink-0 font-mono text-sm text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[15px]">
                      {show.showName}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      )}

      {swapIndex !== null && displayShows[swapIndex] && (
        <SwapShowModal
          currentShow={displayShows[swapIndex]}
          onSelect={handleSwapSelect}
          onClose={() => setSwapIndex(null)}
        />
      )}
    </main>
  );
}
