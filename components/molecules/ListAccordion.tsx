"use client";

import { useState } from "react";
import Link from "next/link";
import { ShowList, Review, genreChipClasses, genreLabels } from "@/lib/data";
import SignalBars from "../atoms/SignalBars";
import { GetMustHavResponse } from "@/utils/types/musthavs";
import { someOfShow } from "@/utils/types/shows";

export default function ListAccordion({
  list,
  shows,
}: {
  list: GetMustHavResponse;
  shows: someOfShow[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-2"
      >
        <div>
          <h3 className="mt-0.5 font-display text-lg">{list.name}</h3>
          <p className="mt-1 max-w-[60ch] text-sm text-[#c9c8c0]">
            {list.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-dim">
          <span>
            {shows.length} {shows.length === 1 ? "show" : "shows"}
          </span>
          <span className="text-cyan">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-line">
          {shows.length > 0 ? (
            shows.map((show, i) => (
              <Link
                key={show.id}
                href={`/show/${show.id}`}
                className={`flex items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-ink-2 ${
                  i !== shows.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* <span className="font-mono text-xs text-dim">
                    {show.page}
                  </span> */}
                  {/* <span
                    className={`px-1.75 py-0.5 font-mono text-[11px] tracking-[0.04em] text-ink ${genreChipClasses[show.genre]}`}
                  >
                    {genreLabels[show.genre]}
                  </span> */}
                  <span className="font-display text-sm">{show.title}</span>
                </div>
                {/* <SignalBars signal={show.signal} /> */}
              </Link>
            ))
          ) : (
            <div className="px-5 py-6 font-mono text-sm text-dim">
              Nothing added to this list yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
