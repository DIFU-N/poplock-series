"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { useShowStore } from "@/app/utils/store/zustand-hooks/useShowStore";
import { searchForShowSchema } from "@/app/utils/yup";
import { RankedShow } from "@/app/utils/types/shows";

export default function PickShowModal({
  rank,
  currentShow,
  takenIds,
  onSelect,
  onClose,
}: {
  rank: number;
  currentShow: RankedShow | null;
  takenIds: number[];
  onSelect: (show: RankedShow) => void;
  onClose: () => void;
}) {
  const search = useShowStore((s) => s.searchShow);
  const searchResult = useShowStore((s) => s.searchResult);

  const formik = useFormik({
    initialValues: { query: "" },
    validationSchema: searchForShowSchema,
    onSubmit: async (values) => {
      await search(values.query);
    },
  });

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black px-6 py-16"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-140 border border-line bg-black"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <div className="font-mono text-xs text-dim">
              SLOT {String(rank).padStart(2, "0")}
            </div>
            <div className="font-display text-lg">
              {currentShow ? currentShow.title : "Pick a show"}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="border border-line px-2.5 py-1.5 font-mono text-xs text-dim transition-colors hover:border-paper hover:text-paper"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-5">
          <form
            onSubmit={formik.handleSubmit}
            className="mb-4 flex border border-line"
          >
            <input
              type="text"
              id="query"
              {...formik.getFieldProps("query")}
              placeholder="Search for a show…"
              autoFocus
              className="flex-1 bg-transparent px-4 py-3 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
            />
            <button
              type="submit"
              className="border-l border-line bg-paper px-5 font-mono text-[13px] text-ink transition-colors hover:bg-cyan"
            >
              Go
            </button>
          </form>

          {searchResult.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto border border-line">
              {searchResult.map((result, i) => {
                const show = result.show;
                // Already sitting in another slot — block it so the
                // ranking can't contain the same show twice.
                const taken =
                  takenIds.includes(show.id) &&
                  show.id !== currentShow?.tvMazeId;

                return (
                  <li
                    key={show.id}
                    className={
                      i !== searchResult.length - 1
                        ? "border-b border-line"
                        : ""
                    }
                  >
                    <button
                      type="button"
                      disabled={taken}
                      onClick={() =>
                        onSelect({
                          tvMazeId: show.id,
                          title: show.name,
                          image: show.image?.original,
                        })
                      }
                      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      {show.image ? (
                        <Image
                          alt={show.name}
                          src={show.image.original}
                          width={32}
                          height={32}
                          className="shrink-0 object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 shrink-0 border border-line" />
                      )}
                      <span className="flex-1 font-display text-sm">
                        {show.name}
                      </span>
                      {taken && (
                        <span className="font-mono text-xs text-dim">
                          already ranked
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="border border-line px-4 py-6 font-mono text-sm text-dim">
              Search for a show above to fill this slot.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
