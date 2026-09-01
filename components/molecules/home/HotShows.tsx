import { useShowStore } from "@/utils/store/zustand-hooks/useShowStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function HotShows() {
  const getShows = useShowStore((state) => state.getBestWeekly);
  const bestWeekly = useShowStore((state) => state.bestWeekly);

  useEffect(() => {
    getShows();
  }, [getShows]);
  return (
    <section id="foryou" className="border-b border-line px-6 py-14">
      <div className="mx-auto max-w-295">
        <div className="mb-7">
          <div className="font-mono text-[13px] text-dim">
            {/* <span className="text-cyan">P.150</span> —  */}
            Hot Shows
          </div>
          {/* <h2 className="mt-1.5 font-display text-2xl">
            Because you watched Static Bloom
          </h2> */}
        </div>

        <p className="mb-5 font-mono text-[13px] text-dim">
          Check out these shows, specifically chosen by dadaman. —{" "}
          <b className="font-medium text-paper">3 picks</b>, scroll to see more.
        </p>

        <div className="flex gap-px overflow-x-auto border border-line bg-line">
          {bestWeekly &&
            bestWeekly.map((p) => (
              <Link
                href={`/show/${p.id}`}
                key={p.id}
                className="min-w-55 flex-none bg-ink p-4.5"
              >
                <Image className="font-mono text-xs text-dim" alt={p.title} src={p.image!}  />
                <h4 className="mb-1.5 mt-2 font-display text-base">
                  {p.title}
                </h4>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
