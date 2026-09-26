"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FFParticipantRanking, FFRankDTO } from "@/app/utils/types/ffranks";

export default function TopTenAccordion({
  list,
  shows,
  open,
  onToggle,
}: {
  list: FFParticipantRanking;
  shows: FFRankDTO[];
  open: boolean;
  onToggle: () => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  return (
    <div className="border border-line cursor-pointer ">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center cursor-pointer justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-green-700"
      >
        <div>
          <h3 className="mt-0.5 font-display text-lg">{list.name}</h3>
          {/* <p className="mt-1 max-w-[60ch] text-sm text-[#c9c8c0]">
            {list.description}
          </p> */}
        </div>
        <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-dim">
          <span>
            {shows.length} {shows.length === 1 ? "show" : "shows"}
          </span>
          <span className="text-cyan">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        // <div className="border-t border-line">
        <div className="flex overflow-x-auto w-full justify-start scrollbar-hide items-start p-4 gap-4 h-full">
          {shows.length > 0 ? (
            shows.map((show, i) => (
              <Link
                key={i}
                href={`/show/${show.showId}`}
                className={`flex items-center justify-between gap-4 px-5 py-3 transition-colors ${
                  i !== shows.length - 1 ? "" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-32 h-50 relative group">
                    <Image
                      src={show.showImage}
                      title={show.showName}
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
                      alt={show.showName}
                      onMouseOver={() => handleMouseEnter(i)}
                      onMouseOut={() => handleMouseLeave()}
                      // data-aos="fade-left"
                      // data-aos-duration={image.id*350}
                      // data-aos-once="false"
                    />
                    {/* <div className="absolute bottom-2 right-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition bg-amber-400/70 text-white text-xs py-1 px-2 text-center">
                    {show.title}
                  </div> */}
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="px-5 py-6 font-mono text-sm text-dim">
              Nothing added to this list yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
