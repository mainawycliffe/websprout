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
}

export type StepType =
  | "explanation"
  | "gap-fill"
  | "free-edit"
  | "js-console"
  | "slider-explore"
  | "challenge";

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
  language: "html" | "css" | "both" | "javascript" | "html-js";
  expectedOutput?: string;
}

export interface ExplanationConfig {
  type: "explanation";
  demoCode?: string;
  demoLanguage?: "html" | "css" | "javascript";
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

export type StepConfig =
  | GapFillConfig
  | FreeEditConfig
  | ExplanationConfig
  | JsConsoleConfig
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
  type: "none" | "exact-match" | "contains-tag" | "output-match" | "values-match" | "contains-css" | "contains-js" | "console-output-match";
  criteria: Record<string, unknown>;
}
