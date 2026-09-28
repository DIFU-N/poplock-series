import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  FFParticipantRanking,
  FFRankDTO,
  UserRankingRequest,
} from "../../types/ffranks";
import {
  CreateAdminRanking,
  GetAllRankings,
  GetDadamansRanking,
  GetRankingByName,
  GetTopTen,
  SubmitRanking,
} from "../../apis/ffranks";
import axios, { isAxiosError } from "axios";

interface FFRankingState {
  loading: boolean;
  submitted: boolean;
  error: string | null;
  dadamansRanking: FFRankDTO[] | null;
  inviteeRanking: FFRankDTO[] | null;
  allFFRanks: FFParticipantRanking[];
  topTen: FFRankDTO[];

  createUserRanking: (request: UserRankingRequest) => Promise<void>;

  createAdminRanking: (tvmazeIds: number[]) => Promise<void>;
  getAllRanks: () => Promise<void>;

  getDadamansRanking: () => Promise<void>;
  getRankingByName: (name: string) => Promise<void>;

  getTopTen: () => Promise<void>;
  reset: () => void;
}

const initialState: FFRankingState = {
  submitted: false,
  loading: false,
  error: null,
  dadamansRanking: null,
  inviteeRanking: null,
  allFFRanks: [],
  topTen: [],

  reset: () => {},

  createUserRanking: async () => {},
  createAdminRanking: async () => {},

  getAllRanks: async () => {},
  getDadamansRanking: async () => {},
  getRankingByName: async () => {},

  getTopTen: async () => {},
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
          const data: FFParticipantRanking[] = await GetAllRankings();

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

          set({ loading: false, dadamansRanking: data, submitted: false });
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

          set({ submitted: true, loading: false });
        } catch (error: unknown) {
          set({
            loading: false,
            error: isAxiosError(error) ? error.message : "some kind of error",
          });
        }
      },

      getTopTen: async () => {
        set({ loading: true, error: null });

        try {
          const data = await GetTopTen();

          set({ loading: false, topTen: data });
        } catch (error: unknown) {
          set({
            loading: false,
            error: isAxiosError(error) ? error.message : "some kind of error",
          });
        }
      },

      getRankingByName: async (name: string) => {
        set({ loading: true, error: null });

        try {
          const data = await GetRankingByName(name);

          set({ loading: false, inviteeRanking: data, submitted: false });
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            set({
              loading: false,
              error:
                typeof error.response?.data === "string"
                  ? error.response.data
                  : (error.response?.data?.message ?? error.message),
            });

            return;
          }

          set({
            loading: false,
            error: "something went wrong",
          });
        }
      },
    }),
    {
      name: "ffrank",
    },
  ),
);
