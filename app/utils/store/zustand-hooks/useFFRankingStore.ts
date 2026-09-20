import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FFRankDTO, FFRanking, UserRankingRequest } from "../../types/ffranks";
import {
  CreateAdminRanking,
  GetAllRankings,
  GetDadamansRanking,
  SubmitRanking,
} from "../../apis/ffranks";
import { isAxiosError } from "axios";

interface FFRankingState {
  loading: boolean;
  submitted: boolean;
  error: string | null;
  dadamansRanking: FFRankDTO[] | null;
  allFFRanks: FFRanking[];

  createUserRanking: (request: UserRankingRequest) => Promise<void>;

  createAdminRanking: (tvmazeIds: number[]) => Promise<void>;
  getAllRanks: () => Promise<void>;

  getDadamansRanking: () => Promise<void>;
  reset: () => void;
}

const initialState: FFRankingState = {
  submitted: false,
  loading: false,
  error: null,
  dadamansRanking: null,
  allFFRanks: [],

  reset: () => {},

  createUserRanking: async () => {},
  createAdminRanking: async () => {},

  getAllRanks: async () => {},
  getDadamansRanking: async () => {},
};

export const useFFRankingStore = create<FFRankingState>()(
  persist(
    (set) => ({
      ...initialState,
      reset: () => set({ loading: false, submitted: false, error: null }),

      createAdminRanking: async (tvmazeIds) => {
        set({ loading: true, error: null });

        try {
          await CreateAdminRanking({ tvmazeIds });
          const dadaman: FFRankDTO[] = await GetDadamansRanking();

          set({ submitted: true, loading: false, dadamansRanking: dadaman });
        } catch (error: unknown) {
          set({
            loading: false,
            error: isAxiosError(error) ? error.message : "some kind of error",
          });
        }
      },
      getAllRanks: async () => {
        set({ loading: true, error: null });

        try {
          const data = await GetAllRankings();

          set({ loading: false, allFFRanks: data });
        } catch (error: unknown) {
          set({
            loading: false,
            error: isAxiosError(error) ? error.message : "some kind of error",
          });
        }
      },
      getDadamansRanking: async () => {
        set({ loading: true, error: null });

        try {
          const data = await GetDadamansRanking();

          set({ loading: false, dadamansRanking: data });
        } catch (error: unknown) {
          set({
            loading: false,
            error: isAxiosError(error) ? error.message : "some kind of error",
          });
        }
      },
      createUserRanking: async (request: UserRankingRequest) => {
        set({ loading: true, error: null });

        try {
          await SubmitRanking(request);

          set({ submitted: true, loading: false,});
        } catch (error: unknown) {
          set({
            loading: false,
            error: isAxiosError(error) ? error.message : "some kind of error",
          });
        }
      },
    }),
    {
      name: "ffrank",
    },
  ),
);
