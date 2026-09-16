"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "█▓▒░▚▞▙▟▛▜";

export default function TuneHeadline({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const settledRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let frame = 0;
    const totalFrames = 14;

    const randomize = (len: number) => {
      let out = "";
      for (let i = 0; i < len; i++) {
        out +=
          Math.random() > 0.72
            ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            : text[i] || " ";
      }
      return out;
    };

    const iv = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplay(text);
        settledRef.current = true;
        clearInterval(iv);
        return;
      }
      setDisplay(randomize(text.length));
    }, 45);

    return () => clearInterval(iv);
  }, [text]);

  return (
    <h1
      aria-label={text}
      className="font-display font-bold text-[clamp(34px,6vw,64px)] leading-[1.04] tracking-tight mb-6 whitespace-pre-line"
    >
      {display}
    </h1>
  );
}
