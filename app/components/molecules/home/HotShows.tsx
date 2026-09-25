import { useShowStore } from "@/app/utils/store/zustand-hooks/useShowStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HotShows() {
  const getShows = useShowStore((state) => state.getBestWeekly);
  const bestWeekly = useShowStore((state) => state.bestWeekly);
  const getBestWeekly = useShowStore((state) => state.getBestWeekly);

  useEffect(() => {
    getShows();
    getBestWeekly();
  }, [getShows, getBestWeekly]);

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  return (
    <section id="foryou" className="border-b border-line px-6 py-14">
      <div className="mx-auto max-w-295">
        <div className="mb-7">
          <div className="font-mono text-4xl font-extrabold">
            Hot Shows
          </div>
          {/* <h2 className="mt-1.5 font-display text-2xl">
            Because you watched Static Bloom
          </h2> */}
        </div>

        <p className="mb-5 font-mono text-[13px] text-dim">
          Check out these shows, specifically chosen by dadaman.
        </p>

        <div className="flex overflow-x-auto scrollbar-hide">
          {bestWeekly &&
            bestWeekly.map((show, i) => (
              <Link
                key={show.id}
                href={`/show/${show.id}`}
                className={`flex items-center justify-between gap-4 px-5 py-3 transition-colors ${
                  i !== bestWeekly.length - 1 ? "" : ""
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
                      src={show.image!}
                      title={show.title}
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
                      alt={show.title}
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
            ))}
        </div>
      </div>
    </section>
  );
}
