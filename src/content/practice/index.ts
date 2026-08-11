import type { DifficultyLevel } from "@/types/lesson";
import type { PracticeCategory, PracticeQuestion, PracticeQuestionSeed } from "@/types/practice";
import { getPracticeLevel } from "@/types/practice";
import { arrayQuestions } from "./arrays";
import { stringQuestions } from "./strings";
import { functionQuestions } from "./functions";
import { domQuestions } from "./dom";
import { cssLayoutQuestions } from "./css-layout";
import { objectQuestions } from "./objects";
import { coercionQuestions } from "./coercion";
import { asyncQuestions } from "./async";
import { cssSelectorQuestions } from "./css-selectors";
import { flexboxQuestions } from "./flexbox";
import { scopeQuestions } from "./scope";
import { controlFlowQuestions } from "./control-flow";
import { eventQuestions } from "./events";
import { gridQuestions } from "./grid";
import { boxModelQuestions } from "./box-model";
import { htmlSemanticsQuestions } from "./html-semantics";
import { accessibilityQuestions } from "./accessibility";
import { reactQuestions } from "./react";
import { webFundamentalsQuestions } from "./web-fundamentals";
import { typescriptQuestions } from "./typescript";

/**
 * The practice bank.
 *
 * Levels must stay consistent as this grows, so hold to these definitions
 * rather than going by feel:
 *
 *   easy         — recall or one concept. Quiz distractors are clearly wrong;
 *                  a code challenge needs one built-in or one loop, 2-3 tests,
 *                  no edge cases.
 *   intermediate — combines two or three concepts. At least one distractor is
 *                  genuinely tempting; a code challenge needs a helper or a
 *                  condition, 4-5 tests including an empty input.
 *   advanced     — turns on a gotcha, a spec detail, or an ordering rule.
 *                  Code challenges cover edge cases, immutability or identity,
 *                  and may use `hidden` tests to block hardcoded answers.
 *
 * Favour problems that require reasoning — predict-the-output, debug-this,
 * choose-between-approaches — over questions that only check recall.
 *
 * Every code challenge must ship a `solution`. `npm run verify:content` runs it
 * against the challenge's own tests, so a wrong `expected` value fails in CI
 * rather than in front of a student.
 *
 * Kept JS/TS- and concept-only on purpose: React *challenges* need the unpkg
 * CDN, so the bank sticks to React quizzes and the hub stays usable offline.
 */
/** Attaches the category to a whole file's worth of questions at once. */
function categorise(
  questions: PracticeQuestionSeed[],
  category: PracticeCategory
): PracticeQuestion[] {
  return questions.map((question) => ({ ...question, category }));
}

export const practiceQuestions: PracticeQuestion[] = [
  ...categorise(arrayQuestions, "JavaScript"),
  ...categorise(stringQuestions, "JavaScript"),
  ...categorise(functionQuestions, "JavaScript"),
  ...categorise(scopeQuestions, "JavaScript"),
  ...categorise(controlFlowQuestions, "JavaScript"),
  ...categorise(objectQuestions, "JavaScript"),
  ...categorise(coercionQuestions, "JavaScript"),
  ...categorise(asyncQuestions, "JavaScript"),
  ...categorise(typescriptQuestions, "TypeScript"),
  ...categorise(domQuestions, "DOM & Events"),
  ...categorise(eventQuestions, "DOM & Events"),
  ...categorise(cssSelectorQuestions, "CSS"),
  ...categorise(cssLayoutQuestions, "CSS"),
  ...categorise(boxModelQuestions, "CSS"),
  ...categorise(flexboxQuestions, "CSS"),
  ...categorise(gridQuestions, "CSS"),
  ...categorise(htmlSemanticsQuestions, "HTML & A11y"),
  ...categorise(accessibilityQuestions, "HTML & A11y"),
  ...categorise(reactQuestions, "React"),
  ...categorise(webFundamentalsQuestions, "Web Platform"),
];

export function getPracticeQuestion(slug: string): PracticeQuestion | undefined {
  return practiceQuestions.find((q) => q.slug === slug);
}

export function getPracticeTopics(): string[] {
  const topics = new Set<string>();
  for (const question of practiceQuestions) {
    for (const topic of question.topics) topics.add(topic);
  }
  return [...topics].sort();
}

export function getPracticeCountsByLevel(): Record<DifficultyLevel, number> {
  const counts: Record<DifficultyLevel, number> = { easy: 0, intermediate: 0, advanced: 0 };
  for (const question of practiceQuestions) counts[getPracticeLevel(question)] += 1;
  return counts;
}

export function pickRandomQuestion(
  candidates: PracticeQuestion[],
  random: () => number = Math.random
): PracticeQuestion | undefined {
  if (candidates.length === 0) return undefined;
  return candidates[Math.floor(random() * candidates.length)];
}
