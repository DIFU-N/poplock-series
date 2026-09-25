import { addMustHav, getMustHavs } from "@/app/utils/apis/musthavs";
import {
  addMustHavResponse,
  GetMustHavResponse,
  MustHav,
} from "@/app/utils/types/musthavs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MustHavState = {
  loading: boolean;
  error: string | null;
  mustHavs: GetMustHavResponse[];

  setMustHavs: (mustHav: MustHav) => Promise<addMustHavResponse | null>;
  getAll: () => Promise<void>;
};

const initialState: MustHavState = {
  error: null,
  loading: false,
  mustHavs: [],
  setMustHavs: async () => null,
  getAll: async () => {},
};

export const useMustHavStore = create<MustHavState>()(
  persist(
    (set) => ({
      ...initialState,
      setMustHavs: async (mustHav: MustHav) => {
        set({ loading: true });

        try {
          const addList: addMustHavResponse = await addMustHav(mustHav);

          set(() => ({
            loading: false,
          }));

          return addList;
        } catch {
          set({
            loading: false,
            error: "error adding musthave",
          });

          return null;
        }
      },
      getAll: async () => {
        set({ loading: true });

        const all = await getMustHavs();

        try {
          set(() => ({
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
