"use client";

import { useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { useShowStore } from "@/utils/store/zustand-hooks/useShowStore";
import { useFormik } from "formik";
import { searchForShowSchema } from "@/utils/yup";
import { TvMazeResponse } from "@/utils/types/tvmaze";
import { useRouter } from "next/navigation";

// const GENRES: Genre[] = ["scifi", "comedy", "drama", "doc", "mystery"];

const initialValues = {
  query: "",
};

export default function SearchClient() {
  const fetchGenres = useShowStore((state) => state.fetchGenre);
  const search = useShowStore((state) => state.searchShow);
  const searchResult = useShowStore((state) => state.searchResult);
  // const [query, setQuery] = useState(initialQuery);
  // const [genre, setGenre] = useState<Genre[]>();
  // const GENRES = useShowStore((state) => state.genres);

  // const [results, setResults] = useState<searchShowResponse>([]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  // const results = useMemo(() => {
  //   const q = query.trim().toLowerCase();
  //   return allShows.filter((show) => {
  //     const matchesQuery =
  //       q.length === 0 ||
  //       show.title.toLowerCase().includes(q) ||
  //       show.blurb.toLowerCase().includes(q) ||
  //       genreLabels[show.genre].toLowerCase().includes(q);
  //     // const matchesGenre = genre === "all" || show.genre === genre;
  //     // return matchesQuery && matchesGenre;
  //   });
  // }, [query, genre]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: searchForShowSchema,
    onSubmit: async (values) => {
      console.log(values.query);

      const result = await search(values.query);
      console.log(result);

      // await importShow(searchResult?.parse.Tv)
    },
  });

  const setShow = useShowStore((state) => state.setOpenedShow);
  const importShow = useShowStore((state) => state.importShow);
  const router = useRouter();

  const onClick = async (tvMazeShow: TvMazeResponse) => {
    // console.log(tvMazeShow.id);

    const importedShow = await importShow(tvMazeShow.id);
    // console.log(importedShow);

    if (!importedShow) return;

    setShow(importedShow);
    router.push(`/show/${importedShow?.id}`);
  };

  return (
    <div>
      <form
        className="mb-5 flex max-w-140 border border-line"
        onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          id="query"
          {...formik.getFieldProps("query")}
          placeholder='Search a title (e.g. "slow burn")'
          className="flex-1 bg-transparent px-4 py-3.5 font-mono text-sm text-paper outline-none placeholder:text-dim focus:border-cyan"
          autoFocus
        />
        <button
          type="submit"
          className="border-l border-line bg-paper px-5 font-mono text-[13px] text-ink transition-colors hover:bg-cyan"
        >
          Go
        </button>
      </form>

      <div className="mb-8 flex flex-wrap gap-1.5 font-mono text-xs">
        {/* <button
          onClick={() => setGenre("all")}
          className={`border px-3 py-1.5 transition-colors ${
            genre === "all"
              ? "border-paper text-paper"
              : "border-line text-dim hover:border-paper hover:text-paper"
          }`}
        >
          All
        </button> */}
        {/* {GENRES.map((g) => (
          <button
            key={g.id}
            onClick={() => setGenre(g)}
            className={`border px-3 py-1.5 transition-colors ${
              genre === g
                ? "border-paper text-paper"
                : "border-line text-dim hover:border-paper hover:text-paper"
            }`}
          >
            {genreLabels[g]}
          </button>
        ))} */}
      </div>

      <div className="mb-4 font-mono text-[13px] text-dim">
        {/* {sea.length} {results.length === 1 ? "result" : "results"} */}
      </div>

      {searchResult.length > 0 ? (
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {searchResult.map((show) => (
            <ReviewCard
              key={show.show.id}
              id={show.show.id}
              rating={show.show.rating?.average}
              summary={show.show.summary}
              title={show.show.name}
              image={show.show.image?.original}
              onClick={() => onClick(show.show)}
            />
          ))}
        </div>
      ) : (
        <div className="border border-line px-5 py-8 font-mono text-sm text-dim">
          No signal on that one — try a different title, mood, or genre.
        </div>
      )}
    </div>
  );
}
