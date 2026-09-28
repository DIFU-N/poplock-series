"use client";

import { motion } from "framer-motion";
import React from "react";

type Variant = "info" | "success" | "error";

type Props = {
  text: string;
  variant?: Variant;
  /** ms. Only drives the progress bar, so keep it in step with however
   *  long the parent leaves the toast mounted. */
  duration?: number;
};

const STYLES: Record<Variant, { glyph: string; accent: string; bar: string }> = {
  info: { glyph: "i", accent: "text-red-600", bar: "bg-red-700" },
  success: { glyph: "✓", accent: "text-green-400", bar: "bg-green-400" },
  error: { glyph: "!", accent: "text-magenta", bar: "bg-magenta" },
};

const Toast: React.FC<Props> = ({ text, variant = "info", duration = 2000 }) => {
  const style = STYLES[variant];

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ x: 48, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 48, opacity: 0, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="fixed right-4 top-20 z-100 w-[calc(100vw-2rem)] max-w-sm overflow-hidden border border-line rounded-lg  bg-red-300 shadow-lg shadow-black/40 sm:right-5"
    >
      <div className="flex items-start gap-3 p-4">
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 shrink-0 items-center justify-center border border-current font-mono text-[11px] font-bold ${style.accent}`}
        >
          {style.glyph}
        </span>
        <p className="font-mono text-[13px] leading-snug text-paper">{text}</p>
      </div>

      {/* Drains over `duration` so it's obvious when the toast is about to go. */}
      <motion.div
        className={`h-0.5 origin-left ${style.bar}`}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
};

export default Toast;