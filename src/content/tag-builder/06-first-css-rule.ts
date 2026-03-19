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
        body: 'A CSS rule has two parts: a SELECTOR (which elements to style) and a DECLARATION BLOCK (what styles to apply). The declaration block is wrapped in curly braces { } and contains property: value pairs ending with semicolons.',
        analogy: "A CSS rule is like a mail instruction: the selector is the address (who gets the mail), and the declaration block is the package contents (what they receive).",
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
        body: "Each property: value pair must end with a semicolon (;). Missing semicolons are one of the most common CSS mistakes. The curly braces { } wrap around ALL the declarations for one selector.",
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
        body: "Write a CSS rule that makes all h1 elements have a blue color. Remember: selector { property: value; }",
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
