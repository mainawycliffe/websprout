import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-normal-flow",
  slug: "normal-flow",
  title: "Normal Flow",
  description:
    "Understand how the browser lays out elements by default — top to bottom, left to right.",
  order: 1,
  steps: [
    {
      id: "how-browser-lays-out",
      type: "explanation",
      instruction: {
        heading: "How the browser lays out your page",
        body: "When you write HTML, the browser reads it top-to-bottom and places each element in the order it appears in your source code. This default behavior is called \"normal flow.\" Without any CSS, block elements (like headings and paragraphs) stack vertically — one on top of the other — and inline elements (like links and bold text) flow horizontally like words in a sentence. Every layout technique you will learn later — flexbox, grid, floats — modifies or overrides normal flow. Understanding it is the foundation of all CSS layout.",
        analogy:
          "Think of reading a book. You read each line left to right, and when a line ends you move down to the next one. Paragraphs stack top to bottom. The browser does the same thing with your HTML elements — it places them in reading order, one after another.",
        docLinks: [
          {
            label: "Normal flow",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction",
            type: "css-concept",
          },
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Normal flow is the foundation of all CSS layout. Every element starts in normal flow. Flexbox, grid, and floats all take elements out of or modify normal flow — but the browser always begins here.",
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
      id: "block-elements-stack",
      type: "explanation",
      instruction: {
        heading: "Block elements stack",
        body: "Each <div> below is a block-level element. Notice how they stack vertically — each one takes the full available width and pushes the next element below it. This is normal flow in action. You didn't write any layout CSS, yet the browser knows exactly where to place each element. On a simple Wikipedia article, headings and paragraphs stack the same way — each one below the last.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A <div> is a block element by default. It always starts on a new line and stretches to fill the available width, even if its content is short. This is why three short words in three divs produce three full-width rows.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<div style="background: #DBEAFE; padding: 12px; margin: 4px;">Block A</div>\n<div style="background: #E0E7FF; padding: 12px; margin: 4px;">Block B</div>\n<div style="background: #D1FAE5; padding: 12px; margin: 4px;">Block C</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "name-the-flow",
      type: "gap-fill",
      instruction: {
        heading: "Name the flow",
        body: "Fill in the blank with the name of the default layout behavior browsers use to arrange elements.",
      },
      config: {
        type: "gap-fill",
        template:
          "The default way browsers arrange elements is called {{flow_name}} flow.",
        gaps: [
          {
            id: "flow_name",
            placeholder: "type of flow",
            acceptedAnswers: ["normal"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "It's the 'default' or 'standard' way browsers lay things out.",
        "The answer is 'normal'.",
      ],
    },
    {
      id: "stack-your-own",
      type: "free-edit",
      instruction: {
        heading: "Stack your own",
        body: "Write some HTML with at least an <h1> and a <p> tag. Watch how the browser stacks them vertically in normal flow — no CSS needed. Try adding more elements and notice how each block-level element takes its own line.",
      },
      config: {
        type: "free-edit",
        starterCode: "",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "h1|p" } },
      hints: [
        "Start with <h1>Your Title</h1>",
        "Add a <p> paragraph below the heading.",
      ],
    },
  ],
};
