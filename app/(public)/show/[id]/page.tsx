"use client";

import SignalBars from "@/components/atoms/SignalBars";
import RateShow from "@/components/molecules/RateShow";
import ShowTabs from "@/components/organisms/search/ShowTabs";
import { useRatingStore } from "@/utils/store/zustand-hooks/useRatingStore";
import { useShowStore } from "@/utils/store/zustand-hooks/useShowStore";
import { stripHtml } from "@/utils/stripHtml";
import { Show } from "@/utils/types/shows";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ShowPage = () => {
  const params = useParams();
  const getShow = useShowStore((state) => state.getShowById);
  const router = useRouter();

  const id = params.id as string;

  const [show, setShow] = useState<Show | null>(null);
  const getUserRating = useRatingStore((state) => state.getUserRating);
  const userRating = useRatingStore((state) => state.userRating);
  const getDadamanRating = useRatingStore((state) => state.getDadamanRating);
  const dadamanRating = useRatingStore((state) => state.dadamanRating);
  const getAverageRating = useRatingStore((state) => state.getAverageRating);
  const averageRating = useRatingStore((state) => state.averageRating);
  useEffect(() => {
    const loadShow = async () => {
      const result = await getShow(id);

      if (!result) {
        router.back();
        return;
      }

      setShow(result);
    };

    loadShow();
  }, [router, id, getShow]);

  useEffect(() => {
    if (show) {
      getUserRating(show?.id);
      getDadamanRating(show.id);
      getAverageRating(show.id);
    }
  }, [show, getUserRating, getDadamanRating, getAverageRating]);

  return (
    <main>
      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-295 flex gap-4">
          <div className="mx-auto flex flex-col gap-7">
            <div className="flex gap-5">
              <div className="w-fit h-fit">
                {show?.image ? (
                  <Image
                    alt={show.title}
                    src={show.image}
                    width={300}
                    height={300}
                  />
                ) : (
                  <div>No Image</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-green-400 font-bold">{"Active"}</span>
                  <div
                    className={`h-5 w-5 rounded-full ${show?.status === "Running" ? "bg-green-600" : "bg-red-600"}`}
                  />
                </div>
                <div className="mb-4 flex flex-wrap flex-col gap-1">
                  <span className="font-mono text-green-400 font-bold">{"Average Rating"}</span>
                  {/* <span
              className={`px-[7px] py-[2px] font-mono text-[11px] tracking-[0.04em] text-ink ${genreChipClasses[show.genre]}`}
            >
              {genreLabels[show.genre]}
            </span> */}

                  {averageRating ? (
                    <SignalBars
                      signal={averageRating ? averageRating : 0}
                    />
                  ) : (
                    <div className="font-mono text-xs text-white font-bold">
                      <div>Be the first to rate this show.</div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-mono text-green-400 font-bold">{"Dadaman\'s Rating"}</span>
                  {dadamanRating ? (
                    <SignalBars
                      signal={dadamanRating ? dadamanRating.score : 0}
                    />
                  ) : (
                    <div className="font-mono text-xs text-white font-bold">
                      Dadaman has not rated this show yet.
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-green-400 font-bold">{"Your Rating"}</span>
                  {userRating ? (
                    <SignalBars signal={userRating ? userRating.score : 0} />
                  ) : (
                    <RateShow
                      showId={show?.id ? show?.id : ""}
                      showName={show?.title ? show.title : ""}
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              {/* <span
              className={`px-[7px] py-[2px] font-mono text-[11px] tracking-[0.04em] text-ink ${genreChipClasses[show.genre]}`}
            >
              {genreLabels[show.genre]}
            </span> */}
            </div>
            <h1 className="mb-4 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
              {show?.title}
            </h1>

            <div className="mb-4.5 font-mono text-[13px] text-dim">
              {show?.summary ? stripHtml(show.summary) : null}
            </div>
          </div>
          <div className="mx-auto">
            <p className="mb-8 max-w-160 text-[17px] text-[#c9c8c0]">
              {/* {show.blurb} */}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-160">
              {/* <RateShowWidget initialRating={yourExistingRating?.yourSignal ?? 0} /> */}
              {/* <AddToListWidget showSlug={show.slug} /> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShowPage;
