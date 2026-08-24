import { useRatingStore } from "@/utils/store/zustand-hooks/useRatingStore";
import { useEffect, useState } from "react";

type RateShowProps = {
  showId: string;
  showName: string;
};

const RateShow = ({ showId, showName }: RateShowProps) => {
  const getRating = useRatingStore((state) => state.getUserRating);
  const userRating = useRatingStore((state) => state.userRating);
  const rateShow = useRatingStore((state) => state.setRating);
  const updateRate = useRatingStore((state) => state.updateRating);
  const [score, setScore] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    getRating(showId);
  }, [getRating, showId]);

  const onclick = async () => {
    try {
      if (userRating !== null) {
        await updateRate({
          score: score,
          id: userRating.id,
        });
      } else {
        await rateShow({
          score: score,
          showId: showId,
        });
      }
      await getRating(showId);
      setIsOpen(false);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="">
      <button
        onClick={() => setIsOpen(true)}
        className="border-2 p-2 border-green-200  cursor-pointer font-mono hover:bg-green-800"
      >
        Rate Show
      </button>
      {isOpen && (
        <SetRating
          showName={showName}
          onClose={() => setIsOpen(false)}
          onSubmit={onclick}
          score={score}
          setScore={setScore}
        />
      )}
    </div>
  );
};

type SetRatingProps = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => void;
  onClose: () => void;
  showName: string;
};
const SetRating = ({
  onClose,
  onSubmit,
  score,
  setScore,
  showName,
}: SetRatingProps) => {
  return (
    <div className="z-40 flex bg-black/80 fixed inset-0 w-full h-full  items-center justify-center">
      <div className="w-[30%] h-[40%] p-10 flex flex-col gap-10 bg-black border-green-400 border-2 text-black text-center">
        <div className="flex flex-col gap-2">
          <div className="text-green-400 text-sm font-mono flex gap-2 mx-auto">
            {"what's your rating?"}
          </div>
          <div className="text-white font-serif text-2xl flex gap-2 mx-auto">
            {showName}
          </div>
        </div>
        {/* <input
          type="number"
          min={1}
          max={10}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        /> */}

        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setScore(v)}
              className={`flex font-mono h-8 w-8 justify-center items-center cursor-pointer border text-center text-sm 
                ${
                  score === v
                    ? "border-green-800 bg-green-400 text-black"
                    : "border-gray-600 hover:border-green-400 hover:bg-green-800 text-white"
                }`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="cursor-pointer font-mono border-2 p-2 border-white text-white hover:bg-green-900 bg-green-500"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="cursor-pointer font-mono border-2 p-2 border-white text-white hover:bg-green-900 bg-green-500"
          >
            Rate
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateShow;
