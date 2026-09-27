"use client";

import Link from "next/link";
import { useAuthStore } from "@/app/utils/store/zustand-hooks/useAuthStore";
import ListAccordion from "@/app/components/molecules/ListAccordion";
import { useEffect, useState } from "react";
import { useMustHavStore } from "@/app/utils/store/zustand-hooks/useMustHavsStore";

export default function MustHavesPage() {
  const getAll = useMustHavStore((state) => state.getAll);

  const mustHavs = useMustHavStore((state) => state.mustHavs);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const user = useAuthStore((state) => state.user);
  const [gotyou, setGotyou] = useState(false);

  const [openId, setOpenId] = useState<string | null>();

  const firstId = mustHavs?.[0]?.id;

  const effectiveOpenId = openId ?? firstId;

  return (
    <main className="text-gray-900">
      <section className="bg-green-400 px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-295 flex-col items-start gap-6">
          <span className="rounded-full bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-gray-900">
            Rank. Repeat.
          </span>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl gap-2 flex">
            Must
            <span className="text-purple-500">Havs</span>
          </h1>
          <p className="max-w-140 text-lg text-gray-800">
            Every ranked list created by Dadaman. Curated selections built from
            His real viewing choices. Tap into each list to explore the shows
            and performances behind the rankings.
          </p>

          <span className={`${gotyou ? "flex text-red-600" : "hidden"}`}>
            {
              "Sorry but you cannot do that, but you can talk about my must havs on twitter :)"
            }
            .
          </span>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-295">
          {/* {!token ? (
            <div className="border border-line px-5 py-8 font-mono text-sm text-dim">
              <Link
                href="/login"
                className="text-paper underline decoration-line underline-offset-2 hover:text-cyan"
              >
                Sign in
              </Link>{" "}
              to see your must-haves lists.
            </div>
          ) : ( */}
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[13px] text-dim">
              <span>
                {/* {mine.length} {mine.length === 1 ? "list" : "lists"} */}
              </span>
              {user?.role === "s.admin" ? (
                <Link
                  href="/new"
                  // passHref={false}
                >
                  <button className="border border-paper px-3.5 py-2 text-paper transition-colors hover:border-cyan hover:bg-green-200 rounded-md cursor-pointer">
                    + New list
                  </button>
                </Link>
              ) : (
                <button
                  className="border border-paper px-3.5 py-2 text-paper transition-colors hover:border-cyan hover:text-cyan"
                  onClick={() => setGotyou(!gotyou)}
                >
                  + New List
                </button>
              )}
            </div>
            {mustHavs.length > 0 ? (
              <div className="flex flex-col gap-4">
                {mustHavs.map((i) => (
                  <ListAccordion
                    key={i.id}
                    list={i}
                    shows={i.shows}
                    open={effectiveOpenId == i.id}
                    onToggle={() =>
                      setOpenId((prev) => (prev === i.id! ? null : i.id!))
                    }
                  />
                ))}
              </div>
            ) : (
              <div>Not working.</div>
            )}
            {/* ) : ( */}
            {/* <div className="border border-line px-5 py-8 font-mono text-sm text-dim">
                  You haven&apos;t made a list yet.{" "}
                  <Link
                    href="/new"
                    className="text-paper underline decoration-line underline-offset-2 hover:text-cyan"
                  >
                    Start one
                  </Link>
                  .
                </div> */}
            {/* )} */}
          </>
          {/* )} */}
        </div>
      </section>
    </main>
  );
}
