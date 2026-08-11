import type { DifficultyLevel, Step } from "@/types/lesson";

/**
 * A practice question IS a lesson Step with some metadata wrapped around it.
 * That is deliberate: the hub reuses QuizQuestion, CodeChallenge, GapFillEditor
 * and validateStep unchanged instead of growing a parallel content system.
 */
/**
 * A small, fixed set used for filtering. Deliberately coarse: `topics` has a
 * long tail (most tags are used once or twice), which makes it good search
 * metadata and useless as a filter control.
 */
export const PRACTICE_CATEGORIES = [
  "JavaScript",
  "TypeScript",
  "DOM & Events",
  "CSS",
  "HTML & A11y",
  "React",
  "Web Platform",
] as const;

export type PracticeCategory = (typeof PRACTICE_CATEGORIES)[number];

export interface PracticeQuestion {
  id: string;
  slug: string;
  title: string;
  /** Broad grouping, used by the hub's filter bar. */
  category: PracticeCategory;
  /** Free-form tags, e.g. "arrays", "closures", "debugging". Searchable. */
  topics: string[];
  /** The question itself. Supports quiz, code-challenge and gap-fill steps. */
  step: Step;
  /** Optional "learn this first" link back into the course. */
  relatedModule?: string;
  relatedLesson?: string;
}

/**
 * What a topic file exports. The category is attached centrally in
 * `src/content/practice/index.ts`, since it is a property of the file rather
 * than of each individual question — that keeps it consistent by construction.
 */
export type PracticeQuestionSeed = Omit<PracticeQuestion, "category">;

export type PracticeStatus = "unsolved" | "attempted" | "solved";

export function getPracticeLevel(question: PracticeQuestion): DifficultyLevel {
  return question.step.difficulty ?? "easy";
}

export function getPracticeKind(question: PracticeQuestion): "Quiz" | "Code" | "Fill-in" {
  if (question.step.type === "code-challenge") return "Code";
  if (question.step.type === "gap-fill") return "Fill-in";
  return "Quiz";
}
