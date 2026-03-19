import { create } from "zustand";
import type { BoxModelState } from "@/types/box-model";
import type { SideValues } from "@/types/lesson";

const defaultSides: SideValues = { top: 0, right: 0, bottom: 0, left: 0 };

interface BoxModelStore extends BoxModelState {
  setContentWidth: (width: number) => void;
  setContentHeight: (height: number) => void;
  setPadding: (side: keyof SideValues, value: number) => void;
  setBorder: (side: keyof SideValues, value: number) => void;
  setMargin: (side: keyof SideValues, value: number) => void;
  setBoxSizing: (sizing: "content-box" | "border-box") => void;
  setViewMode: (mode: "2d" | "3d") => void;
  toggleExploded: () => void;
  setContentText: (text: string) => void;
  setAllValues: (values: Partial<BoxModelState>) => void;
  reset: () => void;
}

const initialState: BoxModelState = {
  contentWidth: 200,
  contentHeight: 100,
  padding: { ...defaultSides, top: 20, right: 20, bottom: 20, left: 20 },
  border: { ...defaultSides, top: 2, right: 2, bottom: 2, left: 2 },
  margin: { ...defaultSides, top: 10, right: 10, bottom: 10, left: 10 },
  boxSizing: "content-box",
  viewMode: "3d",
  exploded: true,
  contentText: "Hello World",
};

export const useBoxModelStore = create<BoxModelStore>((set) => ({
  ...initialState,

  setContentWidth: (width) => set({ contentWidth: width }),
  setContentHeight: (height) => set({ contentHeight: height }),
  setPadding: (side, value) =>
    set((state) => ({ padding: { ...state.padding, [side]: value } })),
  setBorder: (side, value) =>
    set((state) => ({ border: { ...state.border, [side]: value } })),
  setMargin: (side, value) =>
    set((state) => ({ margin: { ...state.margin, [side]: value } })),
  setBoxSizing: (sizing) => set({ boxSizing: sizing }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleExploded: () => set((state) => ({ exploded: !state.exploded })),
  setContentText: (text) => set({ contentText: text }),
  setAllValues: (values) => set(values),
  reset: () => set(initialState),
}));
