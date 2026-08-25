"use client";
import RatingsList from "@/components/organisms/ratings/RatingsList";
import { useAuthStore } from "@/utils/store/zustand-hooks/useAuthStore";
import { useRatingStore } from "@/utils/store/zustand-hooks/useRatingStore";
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
      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-295">
          <div className="mb-4.5 flex items-center gap-2.5 font-mono text-[13px] text-dim">
            <span className="h-1.75 w-1.75 rounded-full bg-paper shadow-[0_0_0_3px_rgba(243,241,234,0.15)]" />
            YOUR ACCOUNT
          </div>
          <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            My ratings
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            Everything you&apos;ve rated, in one place. Click the bars to change
            a rating.
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
