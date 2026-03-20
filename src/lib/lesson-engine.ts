import type { Step, GapFillConfig, FreeEditConfig, ChallengeConfig, BoxModelValues, JsConsoleConfig } from "@/types/lesson";

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
