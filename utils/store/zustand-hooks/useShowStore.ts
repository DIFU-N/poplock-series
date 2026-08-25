import {
  fetchGenres,
  getAllShows,
  getShowById,
  importShow,
  searchForShow,
} from "@/utils/apis/show";
import {
  fetchGenresResponse,
  Genre,
  getAllShowsResponse,
  importShowResponse,
  Show,
} from "@/utils/types/shows";
import { searchShowResponse } from "@/utils/types/tvmaze";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ShowState = {
  loading: boolean;
  error: boolean;

  genres: Genre[];
  fetchGenre: () => Promise<void>;

  shows: Show[];
  openedShow: Show | null;
  setOpenedShow: (show: Show) => void;
  fetchAllShows: () => Promise<void>;
  searchShow: (query: string) => Promise<searchShowResponse>;
  searchResult: searchShowResponse;

  getShowById: (id: string) => Promise<Show | null>;

  importShow: (tvMazeId: number) => Promise<Show | null>;
  importedShow: Show | null;

  errorData: string | null;
};

const initialState: ShowState = {
  shows: [],
  fetchAllShows: async () => {},
  searchShow: async () => [],
  setOpenedShow: () => {},
  openedShow: null,
  searchResult: [],

  getShowById: async () => null,

  importShow: async () => null,
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
            importedShow: data,
          });

          return data;
        } catch {
          set({
            loading: false,
            errorData: "Some kind of error",
          });

          return null;
        }
      },
      getShowById: async (id: string) => {
        set({ loading: true });

        try {
          const data: importShowResponse = await getShowById(id);

          set({
            loading: false,
          });

          return data;
        } catch {
          set({
            loading: false,
            errorData: "Some kind of error",
          });

          return null;
        }
      },
      setOpenedShow: (show: Show) => {
        set({
          openedShow: show,
        });
      },
      searchShow: async (query: string) => {
        set({ loading: true });

        try {
          const data: searchShowResponse = await searchForShow(query);

          set({
            loading: false,
            searchResult: [...data],
          });

          return data;
        } catch {
          set({
            errorData: "Some kind of error",
          });
          return [];
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
