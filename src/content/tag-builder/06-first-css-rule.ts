import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-first-css-rule",
  slug: "first-css-rule",
  title: "Your First CSS Rule",
  description: "Learn the anatomy of a CSS rule: selector + declaration block.",
  order: 6,
  steps: [
    {
      id: "css-anatomy",
      type: "explanation",
      instruction: {
        heading: "The anatomy of a CSS rule",
        body: 'A CSS rule has two parts: a SELECTOR (which elements to style) and a DECLARATION BLOCK (what styles to apply). This structure exists because it would be impractical to style each element individually — imagine writing colors and sizes for every single paragraph on a 1000-paragraph website. Instead, CSS lets you write one rule that applies everywhere. The declaration block uses curly braces { } and property: value pairs ending with semicolons.',
        analogy: "Think of a company dress code: 'All employees in the marketing department must wear blue shirts.' The selector is 'marketing department' (who), and the declaration is 'blue shirts' (what). One rule affects everyone who matches — that's the power of CSS selectors.",
        infoBoxes: [
          {
            variant: "standard",
            body: "A CSS rule has two parts: a selector (which elements to style) and a declaration block (how to style them). This selector-based approach is what makes CSS powerful — one rule can style hundreds of elements.",
          },
        ],
        docLinks: [
          { label: "CSS syntax", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax", type: "css-concept" },
          { label: "CSS selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors", type: "css-selector" },
        ],
      },
      config: {
        type: "explanation",
        demoCode: "h1 {\n  color: blue;\n  font-size: 32px;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fill-rule",
      type: "gap-fill",
      instruction: {
        heading: "Complete a CSS rule",
        body: "Fill in the selector to target all paragraphs, and the property to change their color.",
        infoBoxes: [
          {
            variant: "tip",
            body: "Every CSS declaration must end with a semicolon. A missing semicolon silently breaks all declarations that follow it in the same rule.",
          },
        ],
        docLinks: [
          { label: "color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color", type: "css-property" },
        ],
      },
      config: {
        type: "gap-fill",
        template: "{{selector}} {\n  {{property}}: red;\n}",
        gaps: [
          { id: "selector", placeholder: "which element?", acceptedAnswers: ["p"], caseSensitive: true },
          { id: "property", placeholder: "what to change?", acceptedAnswers: ["color"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "To target paragraphs, use the tag name as the selector.",
        "The property that changes text color is simply: color",
      ],
    },
    {
      id: "semicolons",
      type: "explanation",
      instruction: {
        heading: "Don't forget the semicolons!",
        body: "Each property: value pair must end with a semicolon (;). Semicolons are how the browser knows where one instruction ends and the next begins — without them, 'color: blue font-size: 18px' becomes gibberish. This is one of the most common CSS bugs, even for experienced developers.",
      },
      config: {
        type: "explanation",
        demoCode: "p {\n  color: blue;     /* semicolon after each line */\n  font-size: 18px; /* semicolon here too */\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "write-rule",
      type: "free-edit",
      instruction: {
        heading: "Write a CSS rule from scratch",
        body: "Write a CSS rule that makes all h1 elements have a blue color. This is the same pattern used to style every website you visit — from the red headings on YouTube to the blue links on Google. The formula is always: selector { property: value; }",
      },
      config: {
        type: "free-edit",
        starterCode: "",
        language: "css",
      },
      validation: { type: "contains-css", criteria: { selector: "h1", property: "color" } },
      hints: [
        "Start with the selector: h1",
        "Then open curly braces: h1 {",
        "Inside, write: color: blue;",
      ],
    },
  ],
};
