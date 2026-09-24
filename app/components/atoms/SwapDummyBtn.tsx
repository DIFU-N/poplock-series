import { getRandomPosition } from "@/app/utils/getRandomPosition";
import { useState } from "react";
import { motion } from "framer-motion";

type props = {
  onTriggerToast: (msg: string) => void;
};

const SwapDummyBtn: React.FC<props> = ({ onTriggerToast }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);

  const messages = [
    "yeah, don't do that",
    "still not happening",
    "you’re persistent huh",
    "what is insanity?",
    "maybe finish up the rest and try me again.",
    "Yes please, just continue doing what you're doing.",
    "lmao please submit.",
    "on company time?",
    "please let it go.",
    "I promise, this is the best show lmao",
  ];

  const [pool, setPool] = useState<string[]>([]);

  const shuffle = (arr: string[]) => {
    const copy = [...arr];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  };

  const getNextMessage = () => {
    let currentPool = pool;

    if (currentPool.length === 0) {
      currentPool = shuffle(messages);
    }

    const [nextMessage, ...rest] = currentPool;

    setPool(rest);

    return nextMessage;
  };

  const handleClick = () => {
    setPosition(getRandomPosition());

    setHoverCount((c) => {
      const next = c + 1;

      if (next % 5 === 0) {
        const message = getNextMessage();
        onTriggerToast(message);
      }

      return next;
    });
  };

  return (
    <motion.button
      onClick={() => handleClick()}
      onHoverStart={() => handleClick()}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      //   style={{ position: "fixed" }} // key for screen confinement
      className="border border-paper px-2.5 py-1 text-paper transition-colors hover:border-cyan hover:text-cyan z-50"
    >
      Swap
    </motion.button>
  );
};

export default SwapDummyBtn;
