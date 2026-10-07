"use client";
import RatingsList from "@/app/components/organisms/ratings/RatingsList";
import { useAuthStore } from "@/app/utils/store/zustand-hooks/useAuthStore";
import { useRatingStore } from "@/app/utils/store/zustand-hooks/useRatingStore";
import { useEffect } from "react";

export default function RatingsPage() {
  const getAllDadamanRatings = useRatingStore(
    (state) => state.getAllDadamansRatings,
  );
  const allDadamanRatings = useRatingStore((state) => state.allRatingByDadaman);
  // const user = useAuthStore((state) => state.user);

  useEffect(() => {
    getAllDadamanRatings();
  }, [getAllDadamanRatings]);
  return (
    <main>
      <section className="bg-pink-500 px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-295 flex-col items-start gap-6">
          <span className="rounded-full bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-gray-900">
            Rate. Repeat.
          </span>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl gap-2 flex">
            Dadaman
            <span className="text-yellow-300">Rates</span>
          </h1>
          <p className="max-w-140 text-lg text-gray-800">
            Dadaman rates shows with love first, criticism second. Nothing here
            is final, only a starting point. Look closer, disagree freely, and
            add your own perspective.
          </p>
          <p className="max-w-140 text-base text-gray-600">
            Click a show to add your rating. Click the bars to change a rating.
          </p>
        </div>
      </section>
      <section className="px-6 py-14">
        <div className="mx-auto max-w-295">
          <div className="mb-6 font-mono text-[13px] text-dim">
            {allDadamanRatings.length} shows rated
          </div>
          <RatingsList initial={allDadamanRatings} />
        </div>
      </section>
    </main>
  );
}
