import {
  fetchGenres,
  getAllShows,
  getBestPerformers,
  getBestWeekly,
  getScheduledEpisodes,
  getShowById,
  importShow,
  searchForShow,
  setBestPerformers,
  setBestWeekly,
  setFeaturedShows,
} from "@/utils/apis/show";
import { ScheduledShow } from "@/utils/types/episodes";
import {
  bestPerformers,
  fetchGenresResponse,
  Genre,
  getAllShowsResponse,
  importShowResponse,
  setFeaturedInputValues,
  Show,
} from "@/utils/types/shows";
import { searchShowResponse } from "@/utils/types/tvmaze";
import { isAxiosError } from "axios";
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

  setFeaturedShows: (values: setFeaturedInputValues) => void;
  featuredShows: string[];
  setLocalFeaturedShows: (showId: string) => void;

  getScheduledEpisodes: () => Promise<ScheduledShow[]>;

  scheduledEpisodes: ScheduledShow[];

  getShowById: (id: string) => Promise<Show | null>;

  importShow: (tvMazeId: number) => Promise<Show | null>;
  importedShow: Show | null;

  errorData: string | null;

  bestWeekly: Show[];
  setBestWeekly: (values: string[]) => void;
  getBestWeekly: () => void;

  bestPerformers: bestPerformers[];
  setBestPerformers: (values: bestPerformers[]) => void;
  getBestPerformers: () => void;
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

  featuredShows: [],
  setLocalFeaturedShows: () => {},

  setFeaturedShows: async () => null,

  getScheduledEpisodes: async () => [],
  scheduledEpisodes: [],

  loading: false,
  error: false,

  genres: [],
  fetchGenre: async () => {},
  errorData: null,

  bestWeekly: [],
  setBestWeekly: async () => {},
  getBestWeekly: async () => {},

  bestPerformers: [],
  setBestPerformers: async () => {},
  getBestPerformers: async () => {},
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
      setFeaturedShows: async (values) => {
        set({ loading: true });

        try {
          await setFeaturedShows(values);
          set({ featuredShows: [] });
        } catch (error: unknown) {
          set({
            loading: false,
            error: true,
            errorData: isAxiosError(error)
              ? error.message
              : "some kind of error",
          });
        }
      },
      setLocalFeaturedShows: (showId: string) => {
        if (showId !== "") {
          set((state) => {
            if (state.featuredShows.includes(showId)) {
              return state;
            }

            if (state.featuredShows.length >= 10) {
              return state;
            }

            return {
              featuredShows: [...state.featuredShows, showId],
            };
          });
        }
      },
      getScheduledEpisodes: async () => {
        set({ loading: true });

        try {
          const data = await getScheduledEpisodes();

          set({ scheduledEpisodes: [...data] });
          return data;
        } catch (error: unknown) {
          set({
            loading: false,
            error: true,
            errorData: isAxiosError(error)
              ? error.message
              : "some kind of error",
          });
          return [];
        }
      },
      setBestWeekly: async (ids: string[]) => {
        set({ loading: true });

        try {
          const data = await setBestWeekly(ids);

          set({
            loading: false,
            bestWeekly: data.results,
          });
          return data.results;
        } catch (error: unknown) {
          set({
            loading: false,
            error: true,
            errorData: isAxiosError(error) ? error.message : "unkown error",
          });
          return [];
        }
      },
      getBestWeekly: async () => {
        set({ loading: true });

        try {
          const data = await getBestWeekly();

          set({
            loading: true,
            bestWeekly: data.results,
          });
          return data.results;
        } catch (error: unknown) {
          set({
            loading: false,
            error: true,
            errorData: isAxiosError(error) ? error.message : "unkown error",
          });
          return [];
        }
      },
      setBestPerformers: async (performers: bestPerformers[]) => {
        set({ loading: true });

        try {
          const data = await setBestPerformers(performers);

          set({
            loading: false,
            bestPerformers: data.results,
          });
        } catch (error: unknown) {
          set({
            loading: false,
            error: true,
            errorData: isAxiosError(error) ? error.message : "unkown error",
          });
          return [];
        }
      },
      getBestPerformers: async () => {
        set({ loading: true });

        try {
          const data = await getBestPerformers();

          set({
            loading: false,
            bestPerformers: data.results,
          });
        } catch (error: unknown) {
          set({
            loading: false,
            error: true,
            errorData: isAxiosError(error) ? error.message : "unkown error",
          });
          return [];
        }
      },
    }),
    {
      name: "show-storage",
    },
  ),
);
