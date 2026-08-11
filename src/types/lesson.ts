export interface Module {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  prerequisites?: string[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  steps: Step[];
}

export interface Step {
  id: string;
  type: StepType;
  instruction: StepInstruction;
  config: StepConfig;
  validation: ValidationRule;
  hints: string[];
  /** Defaults to "easy" when absent. */
  difficulty?: DifficultyLevel;
}

export type StepType =
  | "explanation"
  | "gap-fill"
  | "free-edit"
  | "js-console"
  | "slider-explore"
  | "challenge"
  | "quiz"
  | "code-challenge";

/**
 * easy — recall, or a single concept.
 * intermediate — combines two or three concepts.
 * advanced — edge cases, gotchas, or multi-step reasoning.
 */
export type DifficultyLevel = "easy" | "intermediate" | "advanced";

export interface DocLink {
  label: string;
  url: string;
  type?: "html-element" | "html-attribute" | "css-property" | "css-selector" | "css-concept" | "html-concept" | "js-concept" | "js-method" | "js-operator";
}

export interface InfoBox {
  variant: "standard" | "tip";
  title?: string;
  body: string;
}

export interface StepInstruction {
  heading: string;
  body: string;
  analogy?: string;
  highlightElements?: string[];
  docLinks?: DocLink[];
  infoBoxes?: InfoBox[];
}

export interface GapFillConfig {
  type: "gap-fill";
  template: string;
  gaps: GapDefinition[];
}

export interface GapDefinition {
  id: string;
  placeholder: string;
  acceptedAnswers: string[];
  caseSensitive: boolean;
}

export interface FreeEditConfig {
  type: "free-edit";
  starterCode: string;
  language: "html" | "css" | "both" | "javascript" | "html-js" | "typescript";
  expectedOutput?: string;
}

export interface ExplanationConfig {
  type: "explanation";
  demoCode?: string;
  demoLanguage?: "html" | "css" | "javascript" | "typescript";
}

export interface SliderConfig {
  type: "slider-explore";
  initialValues: BoxModelValues;
  lockedProperties: string[];
  highlightProperty?: string;
}

export interface ChallengeConfig {
  type: "challenge";
  initialValues: BoxModelValues;
  targetValues: BoxModelValues;
  tolerance: number;
  lockedProperties: string[];
}

export interface JsConsoleConfig {
  type: "js-console";
  starterCode: string;
  expectedOutput?: string[];
  timeout?: number;
}

export interface QuizOption {
  id: string;
  /** Inline HTML only — a, br, code, em, kbd, mark, s, strong, sub, sup, u. */
  text: string;
  correct: boolean;
  /**
   * Why this option is right or wrong. This is the teaching payload — a quiz
   * without explanations is a gate, not a lesson. Inline HTML only.
   */
  explanation: string;
}

export interface QuizConfig {
  type: "quiz";
  /**
   * single — exactly one correct option, revealed on click.
   * true-false — single with two options, rendered as a 2-up row.
   * multiple — one or more correct, revealed by an explicit "Check answer".
   */
  mode: "single" | "multiple" | "true-false";
  options: QuizOption[];
  /** Optional read-only code the question is about ("what does this log?"). */
  codeSnippet?: string;
  codeLanguage?: "html" | "css" | "javascript" | "typescript";
  /** Shuffle options deterministically (seeded by step id) so order isn't a tell. */
  shuffle?: boolean;
}

export interface CodeChallengeTest {
  /** Human-readable behaviour, e.g. "doubles every number". */
  name: string;
  /**
   * Arguments spread into the student's function.
   * MUST be structured-cloneable — postMessage throws DataCloneError on functions.
   * For callbacks, use `expression` instead.
   */
  args?: unknown[];
  /**
   * Escape hatch for tests that aren't fn(...args): mutation checks, identity
   * checks, classes, multi-call sequences, callbacks. Runs as the body of a
   * function with the student's code in scope. Wins over `args`.
   */
  expression?: string;
  /** Deep-equal target. Structured-cloneable. */
  expected: unknown;
  /** Hide input/expected in the results panel (for anti-hardcoding tests). */
  hidden?: boolean;
  /**
   * React only. Mounts <componentName {...props} /> and evaluates `assert`,
   * which is the body of an async function with `container` and `tick` in scope.
   */
  render?: {
    props?: Record<string, unknown>;
    assert: string;
  };
}

export interface CodeChallengeConfig {
  type: "code-challenge";
  /** The exact identifier the student must define. Guarded by the harness. */
  functionName: string;
  starterCode: string;
  language: "javascript" | "typescript" | "react";
  /** React only: the component the tests mount. Takes over functionName's role. */
  componentName?: string;
  tests: CodeChallengeTest[];
  /** Per-run wall clock, ms. Default 5000. */
  timeout?: number;
  solution?: string;
}

export type StepConfig =
  | GapFillConfig
  | FreeEditConfig
  | ExplanationConfig
  | JsConsoleConfig
  | SliderConfig
  | ChallengeConfig
  | QuizConfig
  | CodeChallengeConfig;

export interface BoxModelValues {
  contentWidth: number;
  contentHeight: number;
  padding: SideValues;
  border: SideValues;
  margin: SideValues;
  boxSizing: "content-box" | "border-box";
}

export interface SideValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ValidationRule {
  type: "none" | "exact-match" | "contains-tag" | "output-match" | "values-match" | "contains-css" | "contains-js" | "console-output-match" | "quiz-answer" | "tests-pass";
  criteria: Record<string, unknown>;
}
