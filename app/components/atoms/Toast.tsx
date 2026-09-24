import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
  text: string;
};

const Toast: React.FC<Props> = ({ text }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="
      fixed top-5 right-5
      w-[calc(100vw-2.5rem)]
      max-w-xs
      z-1000
      flex items-center p-4
      bg-black text-white
      rounded-base shadow-xs border border-default
    "
      >
        <div className="text-sm font-normal">{text}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
