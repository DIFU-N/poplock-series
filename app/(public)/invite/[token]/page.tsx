"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInviteStore } from "@/app/utils/store/zustand-hooks/useInviteStore";
import InviteListRow from "@/app/components/molecules/invite/InviteListRow";
import SwapShowModal from "@/app/components/molecules/invite/SwapShowModal";
import { useFFRankingStore } from "@/app/utils/store/zustand-hooks/useFFRankingStore";
import { FFRankDTO } from "@/app/utils/types/ffranks";
import DummyInviteListRow from "@/app/components/molecules/invite/DummyInviteListRow";
import Toast from "@/app/components/atoms/Toast";
import CreateInvite from "@/app/components/molecules/CreateInvite";

export default function InvitePage() {
  const params = useParams<{ token: string }>();
  const token = params.token;

  const invite = useInviteStore((s) => s.invite);
  const loading = useInviteStore((s) => s.loading);
  const error = useInviteStore((s) => s.error);
  const submitting = useFFRankingStore((s) => s.loading);
  const submitted = useFFRankingStore((s) => s.submitted);
  const fetchInvite = useInviteStore((s) => s.fetchInvite);
  const submitList = useFFRankingStore((s) => s.createUserRanking);

  const dadamansRanking = useFFRankingStore((s) => s.dadamansRanking);
  const getDadamansRanking = useFFRankingStore((s) => s.getDadamansRanking);
  const inviteeRanking = useFFRankingStore((s) => s.inviteeRanking);
  const getRankingByName = useFFRankingStore((s) => s.getRankingByName);

  const [shows, setShows] = useState<FFRankDTO[] | null>(null);
  const [swapIndex, setSwapIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [flashId, setFlashId] = useState<string | null>(null);

  function triggerFlash(id: string) {
    setFlashId(id);
    setTimeout(() => setFlashId(null), 300);
  }

  useEffect(() => {
    if (token) fetchInvite(token);
    getDadamansRanking();
  }, [token, fetchInvite, getDadamansRanking]);

  useEffect(() => {
    if (!invite) return;

    const isFromDadaman = invite.createdByName?.toLowerCase() === "dadaman";

    if (!isFromDadaman && invite.recipientName) {
      getRankingByName(invite.recipientName.toLowerCase());
    }
  }, [invite, getRankingByName]);

  const [lastLoadedRanking, setLastLoadedRanking] = useState<
    FFRankDTO[] | null
  >(null);

  const source = inviteeRanking?.length ? inviteeRanking : dadamansRanking;

  useEffect(() => {
    if (!source?.length) return;

    setShows((prev) => {
      // only initialize once
      if (prev) return prev;
      return source;
    });
  }, [source]);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }

  // Index 0 is always Dadaman's own #1 pick — it's locked in place and
  // is never part of the editable/swappable portion of the list.
  const friendsIsTop = shows?.[0] ?? null;
  const displayShows = shows?.slice(1) ?? [];

  function moveShow(displayIndex: number, direction: -1 | 1) {
    setShows((prev) => {
      if (!prev) return prev;

      // +1 to translate a `displayShows`-relative index back into the
      // full list, where index 0 is the pinned #1 show.
      const fullIndex = displayIndex + 1;
      const target = fullIndex + direction;

      // Never allow anything to move into (or out of) the pinned slot.
      if (target <= 0 || target >= prev.length) return prev;

      const next = [...prev];
      [next[fullIndex], next[target]] = [next[target], next[fullIndex]];
      return next;
    });
  }

  function handleSwapSelect(show: FFRankDTO) {
    if (swapIndex === null) return;

    setShows((prev) => {
      if (!prev) return prev;
      // Same +1 offset as moveShow — swapIndex is relative to
      // displayShows, not the full list.
      const fullIndex = swapIndex + 1;
      return prev.map((s, i) => (i === fullIndex ? { ...show } : s));
    });

    setSwapIndex(null);
  }

  function resetToOriginal() {
    if (inviteeRanking) {
      setShows(inviteeRanking);
    } else if (dadamansRanking && !inviteeRanking) {
      setShows(dadamansRanking);
    }
  }

  function handleSubmit() {
    if (!token || !shows) return;

    submitList({
      token,
      tvmazeIds: shows.map((s) => s.tvMazeId),
    });
  }

  return (
    <main className="relative overflow-hidden">
      <section className="border-b px-6 py-12 bg-fuchsia-200">
        <div className="mx-auto max-w-295">
          {loading && (
            <p className="font-mono text-sm text-dim">Loading your invite…</p>
          )}

          {!loading && error && (
            <h1 className="mb-3 font-display text-2xl">
              We couldn&apos;t open this invite
            </h1>
          )}

          {!loading && !error && invite && !submitted && (
            <>
              <h1 className="mb-3 text-[clamp(28px,5vw,44px)] font-bold leading-[1.05] tracking-tight">
                {invite?.recipientName.toUpperCase()}, build your Top 10
              </h1>
              <p className="max-w-140 text-[17px] text-gray-800">
                {invite?.createdByName?.toLocaleUpperCase() ?? "Dadaman"} {" "} shared their Top 10 with you. Make your own version by swapping out anything that’s not you and reordering it until it feels right.
              </p>
              <br />
              <p className="text-xs font-bold">
                You represent all {invite?.recipientName}
                {"'s"} around the world. Make it count.
              </p>
              <p className="text-xs font-bold">
                Have fun with it. Make it yours. Serious business though
              </p>
            </>
          )}

          {!loading && !error && submitted && (
            <div className="flex flex-col gap-2">
              <h1 className="mb-3 font-bold font-mono text-2xl">
                Your Top 10 is saved
              </h1>
              <p className="max-w-140 font-mono">
                Thank you. Your list has been submitted. View the Top shows list
                to see how your shit has affected the world.
              </p>

              <section className="">
                <CreateInvite token={token} />
              </section>
            </div>
          )}
        </div>
      </section>

      {!loading && error && dadamansRanking && (
        <section className="px-6 py-14">
          <div className="mx-auto max-w-295 flex flex-col gap-2">
            <h2 className="text-4xl">Dadaman to the world</h2>
            <ol className="mb-10 border border-line">
              {dadamansRanking.map((show, i) => (
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
          </div>
        </section>
      )}

      {!loading && !error && invite && (
        <section className="px-6 py-14">
          <div className="mx-auto max-w-295">
            {!shows ? (
              <p className="font-mono text-sm text-dim">
                Loading the current Top 10…
              </p>
            ) : !submitted ? (
              <>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[13px] text-dim">
                  <span>10 shows</span>
                  <button
                    type="button"
                    onClick={resetToOriginal}
                    className="text-dim underline decoration-line underline-offset-2 hover:text-cyan"
                  >
                    reset to original list
                  </button>
                </div>

                <ol className="mb-6 border border-line">
                  {friendsIsTop && (
                    <DummyInviteListRow
                      key={friendsIsTop.showId}
                      show={friendsIsTop}
                      rank={1}
                      isFirst={true}
                      isLast={true}
                      onSwap={() => {}}
                      onMove={() => {}}
                      onTriggerToast={showToast}
                    />
                  )}
                  {displayShows.map((show, i) => (
                    <InviteListRow
                      key={show.tvMazeId}
                      show={show}
                      rank={i + 2}
                      isFirst={i === 0}
                      isLast={i === displayShows.length - 1}
                      onSwap={() => {
                        setSwapIndex(i);
                        triggerFlash(show.showId);
                      }}
                      onMove={(dir) => {
                        moveShow(i, dir);
                        triggerFlash(show.showId);
                      }}
                      flash={flashId === show.showId}
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
                  className="w-full border border-paper bg-paper px-4.5 py-3.25 font-mono text-[13px] text-ink transition-colors hover:border-cyan hover:bg-fuchsia-200 disabled:opacity-60 sm:w-auto cursor-pointer"
                >
                  {submitting ? "Saving…" : "Save my Top 10"}
                </button>
              </>
            ) : (
              <>
                <ol className="mb-10 border border-line">
                  {shows.map((show, i) => (
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
              </>
            )}
          </div>
        </section>
      )}

      {swapIndex !== null && displayShows[swapIndex] && (
        <SwapShowModal
          currentShow={displayShows[swapIndex]}
          onSelect={handleSwapSelect}
          onClose={() => setSwapIndex(null)}
          existingShows={shows}
        />
      )}

      {toast && <Toast text={toast} />}
    </main>
  );
}
