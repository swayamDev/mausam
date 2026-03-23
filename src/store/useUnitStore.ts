import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Unit = "metric" | "imperial";

type UnitState = {
  unit: Unit;
  setUnit: (unit: Unit) => void;
  toggleUnit: () => void;
};

export const useUnitStore = create<UnitState>()(
  persist(
    (set, get) => ({
      unit: "metric",

      setUnit: (unit) => set({ unit }),

      toggleUnit: () =>
        set({
          unit: get().unit === "metric" ? "imperial" : "metric",
        }),
    }),
    {
      name: "mausam-unit",
    },
  ),
);
