"use client";

import Link from "next/link";
import Image from "next/image";
import { useShowStore } from "@/app/utils/store/zustand-hooks/useShowStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BestWeekly({
  // picks,
  curatorHandle = "curator",
}) {
  const getBestPerfomers = useShowStore((s) => s.getBestPerformers);
  const bestPerformers = useShowStore((s) => s.bestPerformers);

  useEffect(() => {
    getBestPerfomers();
  }, [getBestPerfomers]);

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  if (!bestPerformers?.length) return null;

  return (
    <section className="px-6 py-14">
      <div className="mx-auto max-w-295">
        {/* <div className="mb-7">
          <div className="font-mono text-4xl font-extrabold">
            Best TV performances of the week.
          </div>
        </div> */}

        <p className="mb-5 font-mono text-[13px] text-dim">
          Specifically chosen by{" "}
          <a
            href={`https://twitter.com/${curatorHandle}`}
            target="_blank"
            rel="noreferrer"
            className="text-paper hover:text-cyan-500 text-cyan-800"
          >
            @{curatorHandle}
          </a>{" "}
          on Twitter. We trust them.
        </p>

        <div className="flex gap-2 overflow-x-auto">
          {bestPerformers.map((pick, i) => (
            <Link
              key={pick.id}
              href={`/show/${pick.showId}`}
              onMouseOver={() => handleMouseEnter(i)}
              onMouseOut={() => handleMouseLeave()}
            >
              <div
                key={`${pick.showId}-${pick.realName}`}
                className="flex min-w-55 flex-none flex-col border p-2"
              >
                <div className="">
                  <span className="inline-block bg-cyan py-0.5 font-mono text-xs font-bold uppercase tracking-wide">
                    {pick.realName}
                  </span>

                  <p className="mt-2 text-sm text-[#c9c8c0]">
                    as <span className="text-paper">{pick.character}</span>
                  </p>
                </div>
                {pick.showImage ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                     className={`flex items-center justify-between gap-4 px-5 py-3 transition-colors ${
                i !== bestPerformers.length - 1 ? "" : ""
              }`}
                  >
                    <div className="w-32 h-50 relative group">
                      <Image
                        src={pick.showImage}
                        title={pick.showName}
                        // width={100}
                        // height={100}
                        fill
                        // className='rounded-lg'
                        // className={`rounded-lg ${hoveredIndex !== image.id ? 'brightness-50' : ''}`}
                        className={`rounded-lg object-cover aos-animate ${
                          hoveredIndex !== -1 && hoveredIndex !== i
                            ? "brightness-50"
                            : ""
                        }`}
                        alt={pick.showName}
                        // data-aos="fade-left"
                        // data-aos-duration={image.id*350}
                        // data-aos-once="false"
                      />
                      {/* <div className="absolute bottom-2 right-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition bg-amber-400/70 text-white text-xs py-1 px-2 text-center">
                    {show.title}
                  </div> */}
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-32 w-full border-b border-line" />
                )}

                <div className="p-4.5 text-xs font-mono">
                  in{" "}
                  <span
                    className={`font-display text-xs transition  ${
                      hoveredIndex === i ? "text-cyan-400" : "text-cyan-800"
                    }`}
                  >
                    {pick.showName}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
