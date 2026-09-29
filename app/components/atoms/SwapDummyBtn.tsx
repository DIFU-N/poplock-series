import { getRandomPosition } from "@/app/utils/getRandomPosition";
import { useState } from "react";
import { motion } from "framer-motion";
import { shuffle } from "@/app/utils/shuffleArr";

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

  const getNextMessage = () => {
    let currentPool = pool;

    if (currentPool.length === 0) {
      currentPool = shuffle(messages);
    }

    const [nextMessage, ...rest] = currentPool;

    setPool(rest);

    return nextMessage;
  };

  const [isMoving, setIsMoving] = useState(false);

  const doMove = () => {
    if (isMoving) return;

    setIsMoving(true);
    setPosition(getRandomPosition());

    setHoverCount((c) => {
      const next = c + 1;
      if (next % 5 === 0) {
        const message = getNextMessage();
        setTimeout(() => onTriggerToast(message), 0);
      }
      return next;
    });

    setTimeout(() => setIsMoving(false), 300);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    doMove();
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.button
      onClick={(e) => handleClick(e)}
      {...(!isMobile && {
        onHoverStart: () => {
          requestAnimationFrame(doMove);
        },
      })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 120, damping: 25 }}
      //   style={{ position: "fixed" }} // key for screen confinement
      className="border border-paper px-2.5 py-1 text-paper transition-colors hover:border-cyan hover:text-cyan z-50"
    >
      Swap
    </motion.button>
  );
};

export default SwapDummyBtn;
