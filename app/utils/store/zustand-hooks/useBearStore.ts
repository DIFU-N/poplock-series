import { create } from "zustand";
import { persist } from "zustand/middleware";

type BearState = {
  bears: number;
  addABear: () => void;
};

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "food-storage",
    },
  ),
);
