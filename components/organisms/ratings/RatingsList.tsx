"use client";

import { useRouter } from "next/navigation";
import { RatingWithShow } from "@/utils/types/rating";

export default function RatingsList({
  initial,
}: {
  initial: RatingWithShow[];
}) {
  const router = useRouter();
  const onClick = async (id: string) => {
    if (id) {
      router.push(`/show/${id}`);
    } else {
      return;
    }
  };

  return (
    <div className="border border-line text-white">
      {initial.map((show, i) => (
        <div
          onClick={() => onClick(show.show.id)}
          key={show.id}
          className={`flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center cursor-pointer sm:justify-between ${
            i !== initial.length - 1 ? "border-b border-line" : ""
          }`}
        >
          <div className="flex items-start gap-3 sm:items-center">
            <div>
              <h3 className="font-display text-base">{show.show.title}</h3>
              <p className="font-mono text-xs text-dim">
                Rated {new Date(show.updatedAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>

          <div
            className="flex items-end gap-1.25"
            role="group"
            aria-label={`Your rating for ${show.show.title}`}
          >
            <span className="ml-2 w-10 font-mono text-xs text-dim">
              {show.score}/10
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
