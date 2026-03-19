import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-block-vs-inline",
  slug: "block-vs-inline",
  title: "Block vs Inline",
  description:
    "Learn the two fundamental display types — block elements stack, inline elements flow.",
  order: 2,
  steps: [
    {
      id: "two-types",
      type: "explanation",
      instruction: {
        heading: "Two types of elements",
        body: "Every HTML element has a default display type: block or inline. Block elements — like <div>, <h1>–<h6>, <p>, and <section> — take the full available width and always start on a new line. Inline elements — like <span>, <a>, <strong>, and <em> — only take as much width as their content needs and flow alongside other content on the same line. On a Google search results page, each result card is a block element (it gets its own row). Within a result, the blue link text, green URL, and description snippet are inline elements sitting next to each other.",
        analogy:
          "Block elements are like shipping containers on a dock — each one gets its own row, no matter how small the cargo inside. Inline elements are like words on a line of text — they sit next to each other until the line runs out of space, then wrap to the next line.",
        docLinks: [
          {
            label: "Block-level content",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Block-level_content",
            type: "css-concept",
          },
          {
            label: "Inline-level content",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The display property controls how an element behaves in the layout. Block and inline are the two most fundamental values. Every HTML element defaults to one of these — the browser's built-in stylesheet (called the user-agent stylesheet) sets these defaults.",
          },
        ],
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "see-the-difference",
      type: "explanation",
      instruction: {
        heading: "See the difference",
        body: "Notice how each <div> takes a full row, while the <span> elements sit side by side on the same line. This is the core difference between block and inline. The colored backgrounds make it easy to see — block elements stretch edge to edge, while inline elements only color the space their text occupies.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "You cannot set width or height on inline elements — they ignore those properties. If you need a sized element that flows inline, you'll learn about inline-block in the next lesson.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<div style="background: #DBEAFE; padding: 8px; margin: 4px;">I am a div (block)</div>\n<div style="background: #E0E7FF; padding: 8px; margin: 4px;">I am another div (block)</div>\n<span style="background: #FCE7F3; padding: 4px;">I am a span (inline)</span>\n<span style="background: #CFFAFE; padding: 4px;">I am another span (inline)</span>\n<span style="background: #FEF3C7; padding: 4px;">And another one</span>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "default-display-values",
      type: "gap-fill",
      instruction: {
        heading: "Default display values",
        body: "Fill in the default display type for each element. Think about how each one behaves — does it take the full width, or only as much as its content needs?",
      },
      config: {
        type: "gap-fill",
        template:
          "A <div> has a default display of {{div_display}}.\nA <span> has a default display of {{span_display}}.",
        gaps: [
          {
            id: "div_display",
            placeholder: "display type",
            acceptedAnswers: ["block"],
            caseSensitive: false,
          },
          {
            id: "span_display",
            placeholder: "display type",
            acceptedAnswers: ["inline"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "<div> takes the full width — it's a ___ element.",
        "Spans flow with text — they're ___ elements.",
      ],
    },
    {
      id: "change-the-display",
      type: "gap-fill",
      instruction: {
        heading: "Change the display",
        body: "Write CSS to make a <span> behave like a block element — taking full width and starting on a new line. What value should the display property have?",
      },
      config: {
        type: "gap-fill",
        template: ".my-span {\n  display: {{display_value}};\n}",
        gaps: [
          {
            id: "display_value",
            placeholder: "display value",
            acceptedAnswers: ["block"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "What type of element takes full width and starts on a new line?",
        "The answer is 'block'.",
      ],
    },
    {
      id: "mix-and-match",
      type: "free-edit",
      instruction: {
        heading: "Mix and match",
        body: "Write HTML that uses both block and inline elements, then add a CSS rule to change one of the <span> elements to display as a block element. Notice how its behavior changes — it will take the full width and push the next element to a new line.",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<div>This is a block element.</div>\n<span class="highlight">Inline A</span>\n<span class="highlight">Inline B</span>\n\n<style>\n/* Change .highlight to display as block */\n\n</style>',
        language: "both",
      },
      validation: { type: "contains-css", criteria: { property: "display" } },
      hints: [
        "Add display: block; to change an inline element to block.",
        "Try: .highlight { display: block; }",
      ],
    },
  ],
};
