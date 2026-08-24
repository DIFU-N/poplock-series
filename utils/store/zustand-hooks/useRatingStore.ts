import {
  getAllUsersRatings,
  getAverageRating,
  getDadamansRating,
  getUserRating,
  rateShow,
  updateRating,
} from "@/utils/apis/rating";
import { getUserRatingResponse, Rating } from "@/utils/types/rating";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RatingState = {
  loading: boolean;
  error: string;

  allRatingByUser: Rating[];

  userRating: Rating | null;
  dadamanRating: Rating | null;
  averageRating: number | null;

  getUserRating: (showId: string) => Promise<getUserRatingResponse | null>;
  getDadamanRating: (showId: string) => Promise<getUserRatingResponse | null>;
  getAverageRating: (showId: string) => Promise<number | null>;

  setRating: (rating: Rating) => Promise<void>;

  updateRating: (rating: Rating) => Promise<void>;

  getAllUsersRatings: () => Promise<Rating[]>;
};

const initialState: RatingState = {
  loading: false,
  error: "",

  allRatingByUser: [],

  userRating: null,
  dadamanRating: null,
  averageRating: null,

  getUserRating: async () => null,
  getDadamanRating: async () => null,
  getAverageRating: async () => null,

  setRating: async () => {},
  updateRating: async () => {},

  getAllUsersRatings: async () => [],
};

export const useRatingStore = create<RatingState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setRating: async (rating) => {
        set({ loading: true });

        try {
          await rateShow(rating);

          set({ loading: false });
        } catch (error: unknown) {
          set({
            loading: false,
            error: axios.isAxiosError(error)
              ? error.message
              : "something went wrong",
          });
        }
      },
      updateRating: async (rating) => {
        set({ loading: true });

        try {
          await updateRating(rating);

          set({ loading: false });
        } catch (error: unknown) {
          set({
            loading: false,
            error: axios.isAxiosError(error)
              ? error.message
              : "something went wrong",
          });
        }
      },
      getAllUsersRatings: async () => {
        set({ loading: true });

        try {
          const rating = await getAllUsersRatings();

          set({
            loading: false,
            allRatingByUser: [...rating],
          });

          return rating;
        } catch (error: unknown) {
          set({
            loading: false,
            error: axios.isAxiosError(error)
              ? error.message
              : "somehting went wrong",
          });
        }
      },
      getUserRating: async (showId: string) => {
        set({ loading: true });

        try {
          const rating = await getUserRating(showId);

          set({
            loading: false,
            userRating: rating,
          });

          return rating;
        } catch (error: unknown) {
          set({
            loading: false,
            error: axios.isAxiosError(error)
              ? error.message
              : "something went wrong",
          });
        }
      },
      getDadamanRating: async (showId: string) => {
        set({ loading: true });

        try {
          const rating = await getDadamansRating(showId);

          set({
            loading: false,
            dadamanRating: rating,
          });

          return rating;
        } catch (error: unknown) {
          set({
            loading: false,
            error: axios.isAxiosError(error)
              ? error.message
              : "something went wrong",
          });
        }
      },
      getAverageRating: async (showId: string) => {
        set({ loading: true });

        try {
          const rating = await getAverageRating(showId);

          set({
            loading: false,
            averageRating: rating,
          });

          return rating;
        } catch (error: unknown) {
          set({
            loading: false,
            error: axios.isAxiosError(error)
              ? error.message
              : "something went wrong",
          });
        }
      },
    }),
    {
      name: "rating-store",
    },
  ),
);
