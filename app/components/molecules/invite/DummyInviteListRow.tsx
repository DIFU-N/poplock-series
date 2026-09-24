import { FFRankDTO } from "@/app/utils/types/ffranks";
import Image from "next/image";
import SwapDummyBtn from "../../atoms/SwapDummyBtn";

export default function DummyInviteListRow({
  show,
  rank,
  isFirst,
  //   isLast,
  //   onSwap,
  onMove,
  onTriggerToast,
}: {
  show: FFRankDTO;
  rank: number;
  isFirst: boolean;
  isLast: boolean;
  onSwap: () => void;
  onMove: (direction: -1 | 1) => void;
  onTriggerToast: (msg: string) => void;
}) {
  //   const onClick = () => {
  //     // const el = document.getElementById("swap") as HTMLElement;
  //     // el.style.top = "22";
  //     if (ref.current) {
  //       ref.current.style.position = "relative";
  //       ref.current.style.top = "22px";
  //     }
  //   };
  //   const ref = useRef<HTMLButtonElement>(null);

  return (
    <li className="flex items-center gap-4 border-b border-line px-4 py-3.5 last:border-b-0">
      <span className="w-7 shrink-0 font-mono text-sm text-cyan">
        {String(rank).padStart(2, "0")}
      </span>

      {show.showImage ? (
        <Image
          alt={show.showName}
          src={show.showImage}
          width={40}
          height={40}
          className="shrink-0 object-cover"
        />
      ) : (
        <div className="h-10 w-10 shrink-0 border border-line" />
      )}

      <span className="flex-1 truncate font-display text-[15px]">
        {show.showName}
      </span>

      <div className="flex shrink-0 items-center gap-1.5 font-mono text-xs">
        <button
          type="button"
          onClick={() => onMove(-1)}
          disabled={isFirst}
          aria-label={`Move ${show.showName} up`}
          className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-dim"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={() => onMove(1)}
          disabled={isFirst}
          aria-label={`Move ${show.showName} down`}
          className="border border-line px-1.5 py-1 text-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-dim"
        >
          ▼
        </button>
        <SwapDummyBtn onTriggerToast={onTriggerToast} />
      </div>
    </li>
  );
}
