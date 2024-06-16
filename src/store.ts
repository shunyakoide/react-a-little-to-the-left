import { create } from "zustand";

type StoreState = {
  open: boolean;
  setOpen: (v: boolean) => void;
  result: boolean[];
  setResult: (v: boolean[]) => void;
  reseting: boolean;
  setResetting: (v: boolean) => void;
  reset: () => void;
};

export const useStore = create<StoreState>((set) => ({
  open: false,
  setOpen: (v: boolean) => set({ open: v }),
  result: [false, false],
  setResult: (v: boolean[]) => set({ result: v }),
  reseting: false,
  setResetting: (v) => set({ reseting: v }),
  reset: () => set({ reseting: true, result: [false, false] }),
}));
