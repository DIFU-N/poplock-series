"use client";
import RatingsList from "@/app/components/organisms/ratings/RatingsList";
import { useAuthStore } from "@/app/utils/store/zustand-hooks/useAuthStore";
import { useRatingStore } from "@/app/utils/store/zustand-hooks/useRatingStore";
import { useEffect } from "react";

const MyAccount = () => {
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
      <section className="bg-pink-500 px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-295 flex-col items-start gap-6">
          <span className="rounded-full bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide text-gray-900">
            Rate. Rank. Suggest. Repeat.
          </span>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl gap-2 flex">
            {user?.username}
            <span className="text-yellow-300">rates</span>
          </h1>
          <p className="max-w-140 text-lg text-gray-800">
            All your ratings. Done out of love, I hope.
          </p>
        </div>
      </section>
      <section className="border-b border-line px-6 py-16 sm:py-20 gap-10 flex flex-col">
        <section className="px-6 py-14">
          <div className="mx-auto max-w-295">
            <div className="mb-6 font-mono text-[13px] text-dim">
              {allUserRatings.length} shows rated
            </div>
            <RatingsList initial={allUserRatings} />
          </div>
        </section>
      </section>

      {/* <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-20 max-w-295">
          <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            My Must-Havs
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            The Must-Hav lists you have created
          </p>
        </div>
      </section> */}
    </main>
  );
};

export default MyAccount;
