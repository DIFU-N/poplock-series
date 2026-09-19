"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/app/utils/store/zustand-hooks/useAuthStore";
import { useFFRankingStore } from "@/app/utils/store/zustand-hooks/useFFRankingStore";
import RankSlot from "@/app/components/molecules/RankSlot";
import PickShowModal from "@/app/components/molecules/PickShowModal";
import { RankedShow } from "@/app/utils/types/shows";

const SLOT_COUNT = 10;

export default function AdminRankingPage() {
  const token = useAuthStore((s) => s.token);

  const submitting = useFFRankingStore((s) => s.loading);
  const submitted = useFFRankingStore((s) => s.submitted);
  const error = useFFRankingStore((s) => s.error);
  const createAdminRanking = useFFRankingStore((s) => s.createAdminRanking);
  const reset = useFFRankingStore((s) => s.reset);

  const [slots, setSlots] = useState<(RankedShow | null)[]>(
    Array(SLOT_COUNT).fill(null),
  );
  const [pickIndex, setPickIndex] = useState<number | null>(null);

  const filled = slots.filter((s): s is RankedShow => s !== null);
  const isComplete = filled.length === SLOT_COUNT;
  const takenIds = filled.map((s) => s.tvMazeId);

  function moveSlot(index: number, direction: -1 | 1) {
    setSlots((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function handlePickSelect(show: RankedShow) {
    if (pickIndex === null) return;
    setSlots((prev) => prev.map((s, i) => (i === pickIndex ? show : s)));
    setPickIndex(null);
  }

  function clearSlot(index: number) {
    setSlots((prev) => prev.map((s, i) => (i === index ? null : s)));
  }

  function clearAll() {
    setSlots(Array(SLOT_COUNT).fill(null));
    reset();
  }

  function handleSubmit() {
    if (!isComplete) return;
    createAdminRanking(filled.map((s) => s.tvMazeId));
  }

  if (!token) {
    return (
      <main>
        <section className="px-6 py-20">
          <div className="mx-auto max-w-295 border border-line px-6 py-10">
            <div className="mb-3 font-mono text-[13px] text-dim">
              PAGE 170 — ADMIN RANKING
            </div>
            <h1 className="mb-3 font-display text-2xl">
              Sign in to publish a ranking
            </h1>
            <p className="mb-5 max-w-130 text-[#c9c8c0]">
              Only admin accounts can publish the official Top 10.
            </p>
            <Link
              href="/login"
              className="inline-block border border-paper px-4 py-2.5 font-mono text-[13px] text-paper transition-colors hover:border-cyan hover:text-cyan"
            >
              P.200 sign in
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-295">
          <div className="mb-4.5 font-mono text-[13px] text-dim">
            PAGE 170 — ADMIN RANKING
          </div>

          {submitted ? (
            <>
              <h1 className="mb-3 font-display text-2xl">Ranking published</h1>
              <p className="max-w-140 text-[#c9c8c0]">
                Your official Top 10 is live.
              </p>
            </>
          ) : (
            <>
              <h1 className="mb-3 font-display text-[clamp(28px,5vw,44px)] font-bold leading-[1.05] tracking-tight">
                Your Top 10
              </h1>
              <p className="max-w-140 text-[17px] text-[#c9c8c0]">
                Fill all ten slots, then order them from best to worst. This is
                the list invitees start from.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-295">
          {submitted ? (
            <>
              <ol className="mb-6 border border-line">
                {filled.map((show, i) => (
                  <li
                    key={show.id}
                    className="flex items-center gap-4 border-b border-line px-4 py-3.5 last:border-b-0"
                  >
                    <span className="w-7 shrink-0 font-mono text-sm text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[15px]">
                      {show.title}
                    </span>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={clearAll}
                className="border border-paper px-4.5 py-3.25 font-mono text-[13px] text-paper transition-colors hover:border-cyan hover:text-cyan"
              >
                Start another ranking
              </button>
            </>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[13px]">
                <span className={isComplete ? "text-green" : "text-dim"}>
                  {filled.length} of {SLOT_COUNT} slots filled
                </span>
                {filled.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-dim underline decoration-line underline-offset-2 hover:text-magenta"
                  >
                    clear all
                  </button>
                )}
              </div>

              <ol className="mb-6 border border-line">
                {slots.map((show, i) => (
                  <RankSlot
                    key={i}
                    show={show}
                    rank={i + 1}
                    isFirst={i === 0}
                    isLast={i === slots.length - 1}
                    onPick={() => setPickIndex(i)}
                    onClear={() => clearSlot(i)}
                    onMove={(direction) => moveSlot(i, direction)}
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
                disabled={!isComplete || submitting}
                className="w-full border border-paper bg-paper px-4.5 py-3.25 font-mono text-[13px] text-ink transition-colors hover:border-cyan hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-paper disabled:hover:bg-paper sm:w-auto"
              >
                {submitting
                  ? "Publishing…"
                  : isComplete
                    ? "Publish ranking"
                    : `Fill ${SLOT_COUNT - filled.length} more to publish`}
              </button>
            </>
          )}
        </div>
      </section>

      {pickIndex !== null && (
        <PickShowModal
          rank={pickIndex + 1}
          currentShow={slots[pickIndex]}
          takenIds={takenIds}
          onSelect={handlePickSelect}
          onClose={() => setPickIndex(null)}
        />
      )}
    </main>
  );
}
