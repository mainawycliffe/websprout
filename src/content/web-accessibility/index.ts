import type { Lesson } from "@/types/lesson";
import { lesson as whatIsA11y } from "./01-what-is-a11y";
import { lesson as semanticHtmlA11y } from "./02-semantic-html-a11y";
import { lesson as ariaAttributes } from "./03-aria-attributes";
import { lesson as keyboardNavigation } from "./04-keyboard-navigation";
import { lesson as colorContrast } from "./05-color-contrast";
import { lesson as testingTools } from "./06-testing-tools";
import { lesson as capstone } from "./07-capstone";
import { lesson as codelabSemanticPage } from "./08-codelab-semantic-page";
import { lesson as codelabAriaForm } from "./09-codelab-aria-form";

export const webAccessibilityLessons: Lesson[] = [
  whatIsA11y,
  semanticHtmlA11y,
  ariaAttributes,
  keyboardNavigation,
  colorContrast,
  testingTools,
  capstone,
  codelabSemanticPage,
  codelabAriaForm,
];
