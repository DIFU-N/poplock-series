import SignalBars from "@/components/atoms/SignalBars";
import { useShowStore } from "@/utils/store/zustand-hooks/useShowStore";
import { stripHtml } from "@/utils/stripHtml";
import Image from "next/image";
import Link from "next/link";

type ReviewCardProps = {
  id: number;
  summary: string;
  title: string;
  rating: number | undefined;
  image: string | undefined;
  onClick: () => Promise<void>;
};

export default function ReviewCard({
  rating,
  summary,
  title,
  image,
  id,
  onClick,
}: ReviewCardProps) {
  const importedShow = useShowStore((state) => state.importedShow);

  return (
    <div
      onClick={onClick}
      // href={`/show/${importedShow?.id}`}
      className="flex flex-col gap-3 bg-ink p-5 transition-colors hover:bg-ink-2 cursor-pointer"
    >
      <div className="w-fit h-fit">
        {image ? (
          <Image alt={title} src={image} width={300} height={300} />
        ) : (
          <div>No Image</div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-dim">{stripHtml(summary)}</span>
        {/* <span
          className={`px-1.75 py-0.5 font-mono text-[11px] tracking-[0.04em] text-ink ${genreChipClasses[review.genre]}`}
        >
          {genreLabels[review.genre]}
        </span> */}
      </div>
      <h3 className="font-display text-lg">{title}</h3>
      {/* <p className="grow text-[14.5px] text-[#c9c8c0]">{review.}</p> */}
      <div className="flex items-center justify-between border-t border-line pt-1.5">
        <SignalBars signal={rating ? rating / 2 : 0} />
        <span className="font-mono text-xs text-dim">
          {rating ? `${rating}/10` : "No Rating"}
        </span>
      </div>
    </div>
  );
}
