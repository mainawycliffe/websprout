export interface Module {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string;
  color: string;
  lessons: Lesson[];
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
}

export type StepType =
  | "explanation"
  | "gap-fill"
  | "free-edit"
  | "slider-explore"
  | "challenge";

export interface StepInstruction {
  heading: string;
  body: string;
  analogy?: string;
  highlightElements?: string[];
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
  language: "html" | "css" | "both";
  expectedOutput?: string;
}

export interface ExplanationConfig {
  type: "explanation";
  demoCode?: string;
  demoLanguage?: "html" | "css";
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

export type StepConfig =
  | GapFillConfig
  | FreeEditConfig
  | ExplanationConfig
  | SliderConfig
  | ChallengeConfig;

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
  type: "none" | "exact-match" | "contains-tag" | "output-match" | "values-match" | "contains-css";
  criteria: Record<string, unknown>;
}
