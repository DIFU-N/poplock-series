"use client";
import RatingsList from "@/app/components/organisms/ratings/RatingsList";
import { useAuthStore } from "@/app/utils/store/zustand-hooks/useAuthStore";
import { useRatingStore } from "@/app/utils/store/zustand-hooks/useRatingStore";
import { useEffect } from "react";

export default function RatingsPage() {
  const getAllUserRatings = useRatingStore((state) => state.getAllUsersRatings);
  const allUserRatings = useRatingStore((state) => state.allRatingByUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      getAllUserRatings();
    }
  }, [user, getAllUserRatings]);
  return (
    <main>
      <section className="border-b px-6 py-12">
        <div className="mx-auto max-w-295">
          <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            Dadaman Rates
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            Click a show to add your rating. Click the bars to change a rating.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-295">
          <div className="mb-6 font-mono text-[13px] text-dim">
            {allUserRatings.length} shows rated
          </div>
          <RatingsList initial={allUserRatings} />
        </div>
      </section>
    </main>
  );
}
