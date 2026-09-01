import Link from "next/link";

export default function BestWeekly() {
  return (
    <section id="foryou" className="border-b border-line px-6 py-14">
      <div className="mx-auto max-w-295">
        <div className="mb-7">
          <div className="font-mono text-[13px] text-dim">
            {/* <span className="text-cyan">P.150</span> —  */}
            Best TV performances of the week.
          </div>
          {/* <h2 className="mt-1.5 font-display text-2xl">
            Because you watched Static Bloom
          </h2> */}
        </div>

        <p className="mb-5 font-mono text-[13px] text-dim">
          specifically chosen by @ on Twitter. We trust them. —{" "}
          <b className="font-medium text-paper">3 picks</b>, scroll to see more.
        </p>

        <div className="flex gap-px overflow-x-auto border border-line bg-line">
          {/* {forYouPicks.map((p) => ( */}
          <div className="min-w-55 flex-none bg-ink p-4.5">
            <span className="font-mono text-xs text-dim">Lucy Freyer</span>
            <h4>plays This</h4>
            <Link href={`/show/`}>
              <h4 className="mb-1.5 mt-2 font-display text-base">in Show</h4>
            </Link>
          </div>
          {/* ))} */}
        </div>
      </div>
    </section>
  );
}
