import { create } from "zustand";
import type { TagNode, ValidationError } from "@/types/tag-builder";

interface TagBuilderState {
  currentCode: string;
  parsedTree: TagNode[];
  errors: ValidationError[];
  lessonStep: number;
  completedSteps: Set<number>;
  mode: "gap-fill" | "free-edit";
  gapValues: Record<string, string>;

  setCode: (code: string) => void;
  setParsedTree: (tree: TagNode[]) => void;
  setErrors: (errors: ValidationError[]) => void;
  setLessonStep: (step: number) => void;
  completeStep: (step: number) => void;
  setMode: (mode: "gap-fill" | "free-edit") => void;
  setGapValue: (gapId: string, value: string) => void;
  resetGapValues: () => void;
  reset: () => void;
}

export const useTagBuilderStore = create<TagBuilderState>((set) => ({
  currentCode: "",
  parsedTree: [],
  errors: [],
  lessonStep: 0,
  completedSteps: new Set(),
  mode: "gap-fill",
  gapValues: {},

  setCode: (code) => set({ currentCode: code }),
  setParsedTree: (tree) => set({ parsedTree: tree }),
  setErrors: (errors) => set({ errors }),
  setLessonStep: (step) => set({ lessonStep: step }),
  completeStep: (step) =>
    set((state) => ({
      completedSteps: new Set([...state.completedSteps, step]),
    })),
  setMode: (mode) => set({ mode }),
  setGapValue: (gapId, value) =>
    set((state) => ({
      gapValues: { ...state.gapValues, [gapId]: value },
    })),
  resetGapValues: () => set({ gapValues: {} }),
  reset: () =>
    set({
      currentCode: "",
      parsedTree: [],
      errors: [],
      lessonStep: 0,
      completedSteps: new Set(),
      mode: "gap-fill",
      gapValues: {},
    }),
}));
