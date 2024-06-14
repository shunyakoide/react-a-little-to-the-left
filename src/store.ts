import { create } from "zustand";

type StoreState = {
  open: boolean;
  setOpen: (v: boolean) => void;
  result: boolean[];
  setResult: (v: boolean[]) => void; // Update the parameter type to boolean[]
};

export const useStore = create<StoreState>((set) => ({
  open: false,
  setOpen: (v: boolean) => set({ open: v }),
  result: [false, false],
  setResult: (v: boolean[]) => set({ result: v }), // Update the parameter type to boolean[]
}));
