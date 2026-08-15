import {
  fetchGenres,
  getAllShows,
  importShow,
  searchForShow,
} from "@/utils/apis/show";
import {
  fetchGenresResponse,
  Genre,
  getAllShowsResponse,
  importShowResponse,
  searchShowResponse,
  Show,
} from "@/utils/types/shows";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ShowState = {
  loading: boolean;
  error: boolean;

  genres: Genre[];
  fetchGenre: () => Promise<void>;

  shows: Show[];
  fetchAllShows: () => Promise<void>;
  searchShow: (query: string) => Promise<void>;
  searchResult: JSON | null;

  importShow: (tvMazeId: number) => Promise<void>;
  importedShow: Show | null;

  errorData: string | null;
};

const initialState: ShowState = {
  shows: [],
  fetchAllShows: async () => {},
  searchShow: async () => {},
  searchResult: null,

  importShow: async () => {},
  importedShow: null,

  loading: false,
  error: false,

  genres: [],
  fetchGenre: async () => {},
  errorData: null,
};

export const useShowStore = create<ShowState>()(
  persist(
    (set, get) => ({
      ...initialState,
      shows: [],
      fetchAllShows: async () => {
        set({ loading: true });

        try {
          const data: getAllShowsResponse = await getAllShows();

          set({
            loading: false,
            shows: [...data.shows],
          });
        } catch {
          set({
            loading: false,
            errorData: "this is the error",
          });
        }
      },
      importShow: async (tvMazeId: number) => {
        set({ loading: true });

        try {
          const data: importShowResponse = await importShow(tvMazeId);

          set({
            loading: false,
            importedShow: data.show,
          });
        } catch {
          set({
            loading: false,
            errorData: "Some kind of error",
          });
        }
      },
      searchShow: async (query: string) => {
        set({ loading: true });

        try {
          const data: searchShowResponse = await searchForShow(query);

          set({
            loading: false,
            searchResult: data.shows,
          });
        } catch {
          set({
            errorData: "Some kind of error",
          });
        }
      },
      fetchGenre: async () => {
        set({ loading: true });

        try {
          const data: fetchGenresResponse = await fetchGenres();

          set({
            loading: false,
            genres: data.genres,
          });
        } catch {
          set({
            loading: false,
            errorData: "some kind of error",
          });
        }
      },
    }),
    {
      name: "show-storage",
    },
  ),
);
