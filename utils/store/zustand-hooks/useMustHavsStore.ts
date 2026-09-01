import {
  addMustHav,
  addTopTenFamFriends,
  getMustHavs,
} from "@/utils/apis/musthavs";
import {
  addMustHavResponse,
  addTopTenResponse,
  GetMustHavResponse,
  MustHav,
} from "@/utils/types/musthavs";
import { ShowRanking } from "@/utils/types/showRanking";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MustHavState = {
  loading: boolean;
  error: string | null;
  mustHavs: GetMustHavResponse[];
  topTen: ShowRanking[];

  setMustHavs: (mustHav: MustHav) => Promise<addMustHavResponse | null>;
  setTopTen: (ShowRanking: ShowRanking) => Promise<void>;
  getAll: () => Promise<void>;
};

const initialState: MustHavState = {
  error: null,
  loading: false,
  mustHavs: [],
  topTen: [],
  setMustHavs: async () => null,
  setTopTen: async () => {},
  getAll: async () => {},
};

export const useMustHavStore = create<MustHavState>()(
  persist(
    (set, get) => ({
      ...initialState,
      mustHavs: [],
      topTen: [],
      setMustHavs: async (mustHav: MustHav) => {
        set({ loading: true });

        try {
          console.log(mustHav);

          const addList: addMustHavResponse = await addMustHav(mustHav);

          set((state) => ({
            loading: false,
            // mustHavs: [...state.mustHavs, addList.mustHav],
          }));
          // console.log(addList);

          return addList;
        } catch {
          set({
            loading: false,
            error: "error adding musthave",
          });

          return null;
        }
      },
      setTopTen: async (showRanking: ShowRanking) => {
        set({ loading: true });

        try {
          const addList: addTopTenResponse = await addTopTenFamFriends(
            showRanking,
            // token,
          );

          set((state) => ({
            loading: false,
            topTen: [...state.topTen, addList.showRanking],
          }));
        } catch {
          set({
            loading: false,
            error: "error adding top ten",
          });
        }
      },
      getAll: async () => {
        set({ loading: true });

        const all = await getMustHavs();

        // console.log(all.all);

        try {
          set((state) => ({
            loading: false,
            mustHavs: [...all.all],
          }));
        } catch {
          set({
            loading: false,
            error: "error getting all",
          });
        }
      },
    }),
    { name: "mustHav-storage" },
  ),
);
