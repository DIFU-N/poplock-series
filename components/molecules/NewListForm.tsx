"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import Image from "next/image";

import { useAuthStore } from "@/utils/store/zustand-hooks/useAuthStore";
import { useMustHavStore } from "@/utils/store/zustand-hooks/useMustHavsStore";
import { useShowStore } from "@/utils/store/zustand-hooks/useShowStore";
import { searchForShowSchema } from "@/utils/yup";

const initialValues = {
  query: "",
};

interface SelectedShow {
  id: number;
  name: string;
  image?: { original: string } | null;
}

export default function NewMustHavForm() {
  const search = useShowStore((state) => state.searchShow);
  const searchResult = useShowStore((state) => state.searchResult);

  const token = useAuthStore((state) => state.token);
  const addMustHav = useMustHavStore((s) => s.setMustHavs);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedShows, setSelectedShows] = useState<SelectedShow[]>([]);
  const [error, setError] = useState("");

  function toggleShow(show: SelectedShow) {
    setSelectedShows((prev) => {
      const exists = prev.some((s) => s.id === show.id);
      if (exists) {
        return prev.filter((s) => s.id !== show.id);
      }
      // newly picked shows land at the bottom of the ranking
      return [...prev, show];
    });
  }

  function removeShow(id: number) {
    setSelectedShows((prev) => prev.filter((s) => s.id !== id));
  }

  function moveShow(index: number, direction: -1 | 1) {
    setSelectedShows((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleCreateList() {
    setError("");

    if (!title.trim()) {
      setError("Give the list a title first.");
      return;
    }

    if (selectedShows.length === 0) {
      setError("Pick at least one show.");
      return;
    }

    try {
      await addMustHav({
        name: title,
        description: description.trim(),
        // order here IS the ranking — selectedShows is kept in rank order
        tvMazeIds: selectedShows.map((s) => s.id),
      });

      setSelectedShows([]);
      // router.push(`/lists/${list.slug}`);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while creating the list.");
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: searchForShowSchema,

    onSubmit: async (values) => {
      await search(values.query);
    },
  });

  if (!token) {
    return (
      <main>
        <section className="px-6 py-20">
          <div className="mx-auto max-w-295 border border-line px-6 py-10">
            <div className="mb-3 font-mono text-[13px] text-dim">NEW LIST</div>

            <h1 className="mb-3 font-display text-2xl">
              Sign in to make a list
            </h1>

            <p className="mb-5 max-w-130 text-[#c9c8c0]">
              Recommendation lists are tied to your account so people can see
              who made them.
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
            PAGE 147 — NEW LIST
          </div>

          <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            Build a list
          </h1>

          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            Give it a name, a short description, and pick a few shows to start
            it off — drag their rank up or down to set the order.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-295">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr]">
            {/* LEFT */}
            <div>
              <label className="mb-1.5 block font-mono text-[13px] text-dim">
                List title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                placeholder="e.g. Rainy Day Rewatches"
                className="mb-5 w-full border border-line bg-transparent px-4 py-3 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
              />

              <label className="mb-1.5 block font-mono text-[13px] text-dim">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What ties this list together?"
                rows={4}
                className="mb-5 w-full resize-none border border-line bg-transparent px-4 py-3 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
              />

              {/* RANKED LIST */}
              <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between font-mono text-[13px] text-dim">
                  <span>Your ranking</span>
                  <span>{selectedShows.length} picked</span>
                </div>

                {selectedShows.length > 0 ? (
                  <ol className="border border-line">
                    {selectedShows.map((show, i) => (
                      <li
                        key={show.id}
                        className={`flex items-center gap-3 px-3 py-2.5 ${
                          i !== selectedShows.length - 1
                            ? "border-b border-line"
                            : ""
                        }`}
                      >
                        <span className="w-6 shrink-0 font-mono text-xs text-cyan">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {show.image ? (
                          <Image
                            alt={show.name}
                            src={show.image.original}
                            width={28}
                            height={28}
                            className="shrink-0 object-cover"
                          />
                        ) : (
                          <div className="h-7 w-7 shrink-0 border border-line" />
                        )}

                        <span className="flex-1 truncate font-display text-sm">
                          {show.name}
                        </span>

                        <div className="flex shrink-0 items-center gap-1 font-mono text-xs">
                          <button
                            type="button"
                            onClick={() => moveShow(i, -1)}
                            disabled={i === 0}
                            aria-label={`Move ${show.name} up`}
                            className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-dim"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            onClick={() => moveShow(i, 1)}
                            disabled={i === selectedShows.length - 1}
                            aria-label={`Move ${show.name} down`}
                            className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-dim"
                          >
                            ▼
                          </button>
                          <button
                            type="button"
                            onClick={() => removeShow(show.id)}
                            aria-label={`Remove ${show.name}`}
                            className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-magenta hover:text-magenta"
                          >
                            ×
                          </button>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="border border-line px-3 py-4 font-mono text-xs text-dim">
                    Search and check a show on the right to add it here.
                  </div>
                )}
              </div>

              {error && (
                <p className="mb-5 border-l-2 border-magenta pl-3 font-mono text-[13px] text-magenta">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleCreateList}
                className="w-full border border-paper bg-paper px-4.5 py-3.25 font-mono text-[13px] text-ink transition-colors hover:border-cyan hover:bg-cyan sm:w-auto"
              >
                Create list
              </button>
            </div>

            {/* RIGHT */}
            <div>
              <div className="mb-3 font-mono text-[13px] text-dim">
                SEARCH SHOWS
              </div>

              {/* SEARCH FORM */}
              <form
                onSubmit={formik.handleSubmit}
                className="mb-5 flex max-w-140 border border-line"
              >
                <input
                  type="text"
                  id="query"
                  {...formik.getFieldProps("query")}
                  placeholder='Search a title (e.g. "slow burn")'
                  className="flex-1 bg-transparent px-4 py-3.5 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
                  autoFocus
                />

                <button
                  type="submit"
                  className="border-l border-line bg-paper px-5 font-mono text-[13px] text-ink transition-colors hover:bg-cyan"
                >
                  Go
                </button>
              </form>

              {/* RESULTS */}
              {searchResult.length > 0 ? (
                <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                  {searchResult.map((result) => {
                    const show = result.show;
                    const checked = selectedShows.some((s) => s.id === show.id);

                    return (
                      <label
                        key={show.id}
                        className="flex cursor-pointer items-start gap-3 bg-ink p-4 transition-colors hover:bg-ink-2"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleShow(show)}
                          className="mt-1 h-4 w-4 accent-cyan"
                        />

                        <span className="flex items-center gap-3">
                          {show.image ? (
                            <Image
                              alt={show.name}
                              src={show.image.original}
                              width={30}
                              height={30}
                            />
                          ) : (
                            <div className="h-7.5 w-7.5 border border-line" />
                          )}
                          <span className="block font-display text-[15px]">
                            {show.name}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="border border-line px-5 py-8 font-mono text-sm text-dim">
                  No signal on that one — try a different title, mood, or genre.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
