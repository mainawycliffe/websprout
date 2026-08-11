import type { Step, GapFillConfig, FreeEditConfig, ChallengeConfig, BoxModelValues, JsConsoleConfig, QuizConfig } from "@/types/lesson";
import type { TestRunResult } from "@/lib/js-sandbox";

export type ValidationResult = {
  valid: boolean;
  message: string;
};

export function validateStep(step: Step, userInput: Record<string, unknown>): ValidationResult {
  switch (step.validation.type) {
    case "none":
      return { valid: true, message: "" };

    case "exact-match":
      return validateExactMatch(step, userInput);

    case "contains-tag":
      return validateContainsTag(step, userInput);

    case "contains-css":
      return validateContainsCss(step, userInput);

    case "output-match":
      return validateOutputMatch(step, userInput);

    case "values-match":
      return validateValuesMatch(step, userInput);

    case "contains-js":
      return validateContainsJs(step, userInput);

    case "console-output-match":
      return validateConsoleOutputMatch(step, userInput);

    case "quiz-answer":
      return validateQuizAnswer(step, userInput);

    case "tests-pass":
      return validateTestsPass(step, userInput);

    default:
      return { valid: false, message: "Unknown validation type" };
  }
}

function validateExactMatch(step: Step, userInput: Record<string, unknown>): ValidationResult {
  if (step.config.type !== "gap-fill") {
    return { valid: false, message: "Invalid step config" };
  }
  const config = step.config as GapFillConfig;
  const gapValues = userInput.gapValues as Record<string, string> | undefined;

  if (!gapValues) return { valid: false, message: "Fill in all the blanks!" };

  for (const gap of config.gaps) {
    const userValue = gapValues[gap.id]?.trim() ?? "";
    const matches = gap.acceptedAnswers.some((answer) =>
      gap.caseSensitive ? userValue === answer : userValue.toLowerCase() === answer.toLowerCase()
    );
    if (!matches) {
      return {
        valid: false,
        message: `Check the "${gap.placeholder}" blank — not quite right yet!`,
      };
    }
  }

  return { valid: true, message: "Nice work!" };
}

function validateContainsTag(step: Step, userInput: Record<string, unknown>): ValidationResult {
  const code = (userInput.code as string) ?? "";
  const requiredTag = step.validation.criteria.tag as string;

  if (!requiredTag) return { valid: true, message: "" };

  const openTag = new RegExp(`<${requiredTag}[^>]*>`, "i");
  const closeTag = new RegExp(`</${requiredTag}>`, "i");

  if (!openTag.test(code)) {
    return { valid: false, message: `Add a <${requiredTag}> tag!` };
  }
  if (!closeTag.test(code)) {
    return { valid: false, message: `Don't forget to close the </${requiredTag}> tag!` };
  }

  return { valid: true, message: "Perfect!" };
}

function validateContainsCss(step: Step, userInput: Record<string, unknown>): ValidationResult {
  const code = (userInput.code as string) ?? "";
  const requiredProperty = step.validation.criteria.property as string | undefined;
  const requiredSelector = step.validation.criteria.selector as string | undefined;

  if (requiredSelector && !code.includes(requiredSelector)) {
    return { valid: false, message: `Use the "${requiredSelector}" selector!` };
  }

  if (requiredProperty && !code.includes(requiredProperty)) {
    return { valid: false, message: `Add the "${requiredProperty}" property!` };
  }

  if (!code.includes("{") || !code.includes("}")) {
    return { valid: false, message: "A CSS rule needs curly braces { }!" };
  }

  return { valid: true, message: "Great CSS!" };
}

function validateOutputMatch(_step: Step, userInput: Record<string, unknown>): ValidationResult {
  const code = (userInput.code as string) ?? "";
  const config = _step.config as FreeEditConfig;

  if (!config.expectedOutput) return { valid: true, message: "" };

  // Simple check: does the rendered output roughly match?
  const normalizeHtml = (html: string) =>
    html.replace(/\s+/g, " ").trim().toLowerCase();

  if (normalizeHtml(code).includes(normalizeHtml(config.expectedOutput))) {
    return { valid: true, message: "Looks great!" };
  }

  return { valid: false, message: "The output doesn't match yet — keep going!" };
}

function validateValuesMatch(step: Step, userInput: Record<string, unknown>): ValidationResult {
  const config = step.config as ChallengeConfig;
  const currentValues = userInput.values as BoxModelValues | undefined;

  if (!currentValues) return { valid: false, message: "Adjust the values!" };

  const tolerance = config.tolerance;
  const target = config.targetValues;

  const checks = [
    { name: "width", actual: currentValues.contentWidth, expected: target.contentWidth },
    { name: "height", actual: currentValues.contentHeight, expected: target.contentHeight },
    ...["top", "right", "bottom", "left"].flatMap((side) => [
      {
        name: `padding-${side}`,
        actual: currentValues.padding[side as keyof typeof currentValues.padding],
        expected: target.padding[side as keyof typeof target.padding],
      },
      {
        name: `border-${side}`,
        actual: currentValues.border[side as keyof typeof currentValues.border],
        expected: target.border[side as keyof typeof target.border],
      },
      {
        name: `margin-${side}`,
        actual: currentValues.margin[side as keyof typeof currentValues.margin],
        expected: target.margin[side as keyof typeof target.margin],
      },
    ]),
  ];

  const wrong = checks.filter((c) => Math.abs(c.actual - c.expected) > tolerance);

  if (wrong.length === 0) {
    return { valid: true, message: "You matched it perfectly!" };
  }

  return {
    valid: false,
    message: `Almost! Check ${wrong[0].name} — it's ${wrong.length > 1 ? `and ${wrong.length - 1} more` : "off"}.`,
  };
}

function validateContainsJs(step: Step, userInput: Record<string, unknown>): ValidationResult {
  const code = (userInput.code as string) ?? "";
  const criteria = step.validation.criteria;

  const requiredKeywords = criteria.keywords as string[] | undefined;
  if (requiredKeywords) {
    for (const keyword of requiredKeywords) {
      if (!code.includes(keyword)) {
        return { valid: false, message: `Your code should include "${keyword}"` };
      }
    }
  }

  const requiredPattern = criteria.pattern as string | undefined;
  if (requiredPattern) {
    const regex = new RegExp(requiredPattern);
    if (!regex.test(code)) {
      return { valid: false, message: criteria.patternMessage as string ?? "Your code doesn't match the expected pattern yet." };
    }
  }

  return { valid: true, message: "Nice JavaScript!" };
}

function validateConsoleOutputMatch(step: Step, userInput: Record<string, unknown>): ValidationResult {
  const consoleOutput = userInput.consoleOutput as string[] | undefined;
  const config = step.config as JsConsoleConfig;
  const expectedOutput = config.expectedOutput ?? (step.validation.criteria.expectedOutput as string[] | undefined);

  if (!expectedOutput || expectedOutput.length === 0) {
    return { valid: true, message: "" };
  }

  if (!consoleOutput || consoleOutput.length === 0) {
    return { valid: false, message: "Run your code to see the output!" };
  }

  const normalize = (s: string) => s.trim().toLowerCase();

  for (let i = 0; i < expectedOutput.length; i++) {
    const expected = normalize(expectedOutput[i]);
    const actual = consoleOutput[i] ? normalize(consoleOutput[i]) : "";
    if (actual !== expected) {
      return {
        valid: false,
        message: `Line ${i + 1} of your output doesn't match. Expected "${expectedOutput[i]}" but got "${consoleOutput[i] ?? "(nothing)"}".`,
      };
    }
  }

  return { valid: true, message: "Output matches perfectly!" };
}

function validateQuizAnswer(step: Step, userInput: Record<string, unknown>): ValidationResult {
  if (step.config.type !== "quiz") {
    return { valid: false, message: "Invalid step config" };
  }
  const config = step.config as QuizConfig;
  const selected = (userInput.quizSelection as string[] | undefined) ?? [];

  if (selected.length === 0) {
    return { valid: false, message: "Pick an answer to continue." };
  }

  const correctIds = new Set(config.options.filter((o) => o.correct).map((o) => o.id));
  const picked = new Set(selected);

  const missed = [...correctIds].filter((id) => !picked.has(id));
  const extra = [...picked].filter((id) => !correctIds.has(id));

  if (missed.length === 0 && extra.length === 0) {
    return {
      valid: true,
      message: (step.validation.criteria.successMessage as string) ?? "Correct!",
    };
  }

  if (config.mode === "multiple") {
    if (extra.length > 0 && missed.length === 0) {
      return {
        valid: false,
        message: "You found all the right ones, but one of your picks doesn't belong. Read its explanation.",
      };
    }
    if (extra.length === 0) {
      return {
        valid: false,
        message: `Everything you picked is right — but you're missing ${missed.length} more.`,
      };
    }
    return { valid: false, message: "Not quite. Read the explanations under the options you picked." };
  }

  return {
    valid: false,
    message: (step.validation.criteria.failureMessage as string) ?? "Not quite — read the explanation and try another one.",
  };
}

function validateTestsPass(_step: Step, userInput: Record<string, unknown>): ValidationResult {
  const run = userInput.testRun as TestRunResult | undefined;

  if (!run || (run.results.length === 0 && !run.compileError)) {
    return { valid: false, message: 'Click "Run Tests" to check your solution.' };
  }

  if (run.compileError) {
    return { valid: false, message: run.compileError };
  }

  const failed = run.results.filter((r) => !r.passed);
  if (failed.length === 0) {
    return { valid: true, message: `All ${run.results.length} tests pass. Nice work!` };
  }

  const first = failed[0];
  const detail = first.error
    ? `it threw: ${first.error}`
    : first.hidden
      ? `it returned ${first.actual}`
      : `expected ${first.expected}, got ${first.actual}`;

  return {
    valid: false,
    message: `${run.results.length - failed.length}/${run.results.length} passing. "${first.name}" — ${detail}`,
  };
}

/* ---------------- quiz interaction state ---------------- */

export interface QuizState {
  selected: string[];
  revealed: boolean;
  wrongAttempts: number;
}

export const EMPTY_QUIZ_STATE: QuizState = { selected: [], revealed: false, wrongAttempts: 0 };

export function isQuizCorrect(config: QuizConfig, selected: string[]): boolean {
  const correct = config.options.filter((o) => o.correct).map((o) => o.id).sort();
  const picked = [...new Set(selected)].sort();
  return correct.length === picked.length && correct.every((id, i) => id === picked[i]);
}

export type QuizAction = { kind: "select"; optionId: string } | { kind: "check" };

/**
 * Pure transition, shared by every consumer so the reveal rules can't drift.
 *
 * single / true-false — one click selects AND reveals. A correct answer locks;
 * a wrong one stays retryable without giving away the right one.
 * multiple — clicks toggle and clear any prior reveal, so a wrong check forces a
 * re-check rather than one-toggle-at-a-time brute force.
 */
export function applyQuizSelection(
  config: QuizConfig,
  state: QuizState,
  action: QuizAction
): QuizState {
  if (action.kind === "check") {
    if (state.selected.length === 0) return state;
    const ok = isQuizCorrect(config, state.selected);
    return { ...state, revealed: true, wrongAttempts: state.wrongAttempts + (ok ? 0 : 1) };
  }

  if (config.mode === "multiple") {
    const selected = state.selected.includes(action.optionId)
      ? state.selected.filter((id) => id !== action.optionId)
      : [...state.selected, action.optionId];
    return { ...state, selected, revealed: false };
  }

  // A locked-in correct answer ignores further clicks.
  if (state.revealed && isQuizCorrect(config, state.selected)) return state;

  const selected = [action.optionId];
  const ok = isQuizCorrect(config, selected);
  return { selected, revealed: true, wrongAttempts: state.wrongAttempts + (ok ? 0 : 1) };
}

export function getHintForStep(step: Step, attemptCount: number): string | null {
  if (step.hints.length === 0) return null;
  const index = Math.min(attemptCount, step.hints.length - 1);
  return step.hints[index];
}

export function buildCodeFromGaps(template: string, gapValues: Record<string, string>): string {
  let code = template;
  for (const [id, value] of Object.entries(gapValues)) {
    code = code.replace(`{{${id}}}`, value);
  }
  // Replace remaining unfilled gaps with empty string
  code = code.replace(/\{\{[^}]+\}\}/g, "");
  return code;
}
