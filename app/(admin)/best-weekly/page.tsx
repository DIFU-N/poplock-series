"use client";

import { useEffect, useState } from "react";
import ShowSearchModal, {
  PickedShow,
} from "@/app/components/atoms/ShowSearchModal";
import { bestPerformers } from "@/app/utils/types/shows";
import { useShowStore } from "@/app/utils/store/zustand-hooks/useShowStore";
import BestWeeklyPickRow, {
  DraftPick,
} from "@/app/components/atoms/BestWeeklyPickRow";

function emptyPick(): DraftPick {
  return {
    key: crypto.randomUUID(),
    realName: "",
    character: "",
    showId: null,
    showName: "",
    showImage: null,
  };
}

export default function BestWeeklyAdminPage() {
  const bestPerformersList = useShowStore((s) => s.bestPerformers);
  const getBestPerformers = useShowStore((s) => s.getBestPerformers);
  const setBestPerformers = useShowStore((s) => s.setBestPerformers);

  // const [drafts, setDrafts] = useState<DraftPick[]>([]);
  const [pickingKey, setPickingKey] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load whatever's currently published.
  useEffect(() => {
    getBestPerformers();
  }, []);

  // Seed the editable drafts from the store, so this is an edit of the
  // live picks rather than always starting blank.
  const [drafts, setDrafts] = useState<DraftPick[]>([]);

  if (!drafts && bestPerformersList.length > 0) {
    setDrafts(
      bestPerformersList.map((p) => ({
        key: p.id,
        id: p.id,
        realName: p.realName,
        character: p.character,
        showId: p.showId,
        showName: p.showName,
        showImage: p.showImage,
      })),
    );
  }

  // Nothing published yet — give the admin one row to start from instead
  // of a blank screen with just an "Add pick" button.
  // useEffect(() => {
  //   if (bestPerformersList.length === 0 && drafts.length === 0) {
  //     setDrafts([emptyPick()]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [bestPerformersList]);

  function addPick() {
    setDrafts((prev) => [...prev, emptyPick()]);
  }

  function removePick(key: string) {
    setDrafts((prev) => prev.filter((d) => d.key !== key));
  }

  function updateField(
    key: string,
    field: "realName" | "character",
    value: string,
  ) {
    setDrafts((prev) =>
      prev.map((d) => (d.key === key ? { ...d, [field]: value } : d)),
    );
  }

  function moveDraft(key: string, direction: -1 | 1) {
    setDrafts((prev) => {
      const index = prev.findIndex((d) => d.key === key);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function handleShowSelect(show: PickedShow) {
    if (pickingKey === null) return;
    setDrafts((prev) =>
      prev.map((d) =>
        d.key === pickingKey
          ? {
              ...d,
              // ShowSearchModal only knows TVMaze's numeric id — your
              // showId is a string, so it's cast here. Swap this for
              // whatever your backend actually treats as the show's id
              // if that's not the right value once resolved server-side.
              showId: String(show.id),
              showName: show.name,
              showImage: show.image?.original ?? null,
            }
          : d,
      ),
    );
    setPickingKey(null);
  }

  const isValid =
    drafts.length > 0 &&
    drafts.every((d) => d.realName.trim() && d.character.trim() && d.showId);

  async function handleSubmit() {
    if (!isValid) return;

    setError(null);
    setSubmitting(true);

    try {
      const payload: bestPerformers[] = drafts.map((d) => ({
        id: d.id,
        realName: d.realName.trim(),
        character: d.character.trim(),
        showId: d.showId as string,
      }));

      await setBestPerformers(payload);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while saving the picks.");
    } finally {
      setSubmitting(false);
    }
  }

  function startAnother() {
    setSubmitted(false);
  }

  return (
    <main>
      <section className="px-6 py-14">
        <div className="mx-auto max-w-295">
          {submitted ? (
            <>
              <ol className="mb-6 border border-line">
                {drafts.map((d) => (
                  <li
                    key={d.key}
                    className="flex items-center gap-4 border-b border-line px-4 py-3.5 last:border-b-0"
                  >
                    <span className="bg-cyan px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-ink">
                      {d.realName}
                    </span>
                    <span className="text-sm text-[#c9c8c0]">
                      as {d.character} in {d.showName}
                    </span>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={startAnother}
                className="border border-paper px-4.5 py-3.25 font-mono text-[13px] text-paper transition-colors hover:border-cyan hover:text-cyan"
              >
                Edit picks again
              </button>
            </>
          ) : (
            <>
              <div className="mb-4 flex flex-col gap-4">
                {drafts.map((d, i) => (
                  <BestWeeklyPickRow
                    key={d.key}
                    pick={d}
                    isFirst={i === 0}
                    isLast={i === drafts.length - 1}
                    onChangeField={(field, value) =>
                      updateField(d.key, field, value)
                    }
                    onPickShow={() => setPickingKey(d.key)}
                    onRemove={() => removePick(d.key)}
                    onMove={(direction) => moveDraft(d.key, direction)}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={addPick}
                className="mb-6 border border-line px-3.5 py-2 font-mono text-[13px] text-dim transition-colors hover:border-paper hover:text-paper"
              >
                + Add pick
              </button>

              {error && (
                <p className="mb-5 border-l-2 border-magenta pl-3 font-mono text-[13px] text-magenta">
                  {error}
                </p>
              )}

              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValid || submitting}
                  className="w-full border border-paper bg-paper px-4.5 py-3.25 font-mono text-[13px] text-ink transition-colors hover:border-cyan hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-paper disabled:hover:bg-paper sm:w-auto"
                >
                  {submitting ? "Saving…" : "Submit"}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {pickingKey !== null && (
        <ShowSearchModal
          title="Pick a show"
          onSelect={handleShowSelect}
          onClose={() => setPickingKey(null)}
        />
      )}
    </main>
  );
}
