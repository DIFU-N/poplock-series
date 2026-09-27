"use client";
import RankingTable from "@/app/components/molecules/RankingTable";
import TopTenAccordion from "@/app/components/molecules/TopTenAccordion";
import { useFFRankingStore } from "@/app/utils/store/zustand-hooks/useFFRankingStore";
import React, { useEffect, useState } from "react";

const TopTen = () => {
  const topTen = useFFRankingStore((state) => state.topTen);
  const getTopTen = useFFRankingStore((state) => state.getTopTen);
  const getAllRanks = useFFRankingStore((state) => state.getAllRanks);
  const allRanks = useFFRankingStore((state) => state.allFFRanks);

  useEffect(() => {
    getTopTen();
    getAllRanks();
    // console.log(topTen);
    // console.log(allRanks);
  }, [getTopTen, getAllRanks]);

  const [openId, setOpenId] = useState<number | null>();

  //   const firstId = mustHavs?.[0]?.id;

  //   const effectiveOpenId = openId ?? firstId;

  return (
    <main className="mb-10 b">
      <section className="bg-purple-500 px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-295 flex-col items-start gap-6">
          <span className="rounded-full bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-gray-900">
            Rank. Repeat.
          </span>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl gap-2 flex">
            Top
            <span className="text-yellow-300">Fifty</span>
          </h1>
          <p className="max-w-140 text-lg text-gray-800">
            Each name becomes a single voice. Ratings reflect everyone in the world who shares that name, gathered into one identity. Invite others, step forward, and claim your name’s place in the rankings.
          </p>
          <p className="max-w-140 text-base font-light">
            Whoever receives the invite represents that name for all who carry it. Move quickly if you want to be the one who speaks for it.
          </p>
        </div>
      </section>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-295">
          <RankingTable rankings={topTen} />
        </div>
      </section>

      <section className="mx-2 md:mx-20">
        {allRanks.length > 0 ? (
          <div className="flex flex-col gap-4">
            {allRanks.map((i, index) => (
              <TopTenAccordion
                key={index}
                list={i}
                shows={i.rankings}
                open={openId == index}
                onToggle={() =>
                  setOpenId((prev) => (prev === index! ? null : index!))
                }
              />
            ))}
          </div>
        ) : (
          <div>Not working.</div>
        )}
      </section>
    </main>
  );
};

export default TopTen;
