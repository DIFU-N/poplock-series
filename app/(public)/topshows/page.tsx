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
    <main className="mb-10">
      <section className="border-b px-6 py-12">
        <div className="mx-auto max-w-295">
          <h1 className="mb-3 font-display flex gap-2 text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            Top FIFTY
            {/* <span className="bg-yellow-400">havs</span> */}
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            1 name per ranking. Get your invited friends to invite you too or
            stick with your name being represented by someone else.
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
