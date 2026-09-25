import { useMustHavStore } from "@/app/utils/store/zustand-hooks/useMustHavsStore";
import { useEffect, useMemo, useState } from "react";
import ListAccordion from "../ListAccordion";
import { shuffle } from "@/app/utils/shuffleArr";

export default function MustHavs() {
  const getAll = useMustHavStore((state) => state.getAll);

  const mustHavs = useMustHavStore((state) => state.mustHavs);

  const mcut = useMemo(() => {
    return shuffle(mustHavs).slice(0, 3);
  }, [mustHavs]);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const [openId, setOpenId] = useState<string | null>();

  const firstId = mcut?.[0]?.id;

  const effectiveOpenId = openId ?? firstId;

  return (
    <section id="foryou" className="border-b border-line px-6 py-14">
      <div className="mx-auto max-w-295">
        <div className="mb-7">
          <div className="font-mono text-4xl font-bold">
            Must Hav Previews.
          </div>
          {/* <h2 className="mt-1.5 font-display text-2xl">
            Because you watched Static Bloom
          </h2> */}
        </div>

        <div className="mx-auto max-w-295">
          {mcut.length > 0 ? (
            <div className="flex flex-col gap-4">
              {mcut.map((i) => (
                <ListAccordion
                  key={i.id}
                  list={i}
                  shows={i.shows}
                  open={effectiveOpenId == i.id}
                  onToggle={() =>
                    setOpenId((prev) => (prev === i.id! ? null : i.id!))
                  }
                />
              ))}
            </div>
          ) : (
            <div>Not working.</div>
          )}
        </div>
      </div>
    </section>
  );
}
