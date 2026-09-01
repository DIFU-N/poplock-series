"use client";

import Link from "next/link";
import { showsInList } from "@/lib/data";
import { useAuthStore } from "@/utils/store/zustand-hooks/useAuthStore";
import ListAccordion from "@/components/molecules/ListAccordion";
import { useListsStore } from "@/utils/store/zustand-hooks/useListsStore";
import { useEffect, useState } from "react";
import { useMustHavStore } from "@/utils/store/zustand-hooks/useMustHavsStore";

export default function MustHavesPage() {
  //   const token = useAuthStore((s) => s.token);
  //   const userLists = useListsStore((s) => s.userLists);
  //   const mine = userLists.filter((l) => l.isMine);

  const getAll = useMustHavStore((state) => state.getAll);

  const mustHavs = useMustHavStore((state) => state.mustHavs);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const user = useAuthStore((state) => state.user);
  const [gotyou, setGotyou] = useState(false);

  return (
    <main>
      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-295">
          {/* <div className="mb-4.5 flex items-center gap-2.5 font-mono text-[13px] text-dim">
            <span className="h-1.75 w-1.75 rounded-full bg-cyan shadow-[0_0_0_3px_rgba(77,217,232,0.15)]" />
            MUST HAVS
          </div> */}
          <h1 className="mb-3 font-display flex gap-2 text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            Must
            <span className="bg-yellow-400">havs</span>
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            Every list made by dadaman. Tap a list to see what&apos;s
            recommended under it.
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
                  className="border border-paper px-3.5 py-2 text-paper transition-colors hover:border-cyan hover:text-cyan"
                >
                  + New list
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
                  <ListAccordion key={i.id} list={i} shows={i.shows} />
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
