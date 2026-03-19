import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-selectors",
  slug: "selectors",
  title: "CSS Selectors",
  description: "Target specific elements with element, class, and ID selectors.",
  order: 8,
  steps: [
    {
      id: "element-selector",
      type: "explanation",
      instruction: {
        heading: "Element selectors",
        body: "The simplest selector is just the tag name: p, h1, div. It targets ALL elements of that type on the page.",
        analogy: 'It\'s like saying "paint ALL the doors blue." Every door gets the same treatment.',
      },
      config: {
        type: "explanation",
        demoCode: "/* Targets every paragraph */\np {\n  color: green;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "class-selector",
      type: "explanation",
      instruction: {
        heading: "Class selectors: target a group",
        body: 'A class selector starts with a DOT (.). In HTML, you add class="name" to the tag. Multiple elements can share the same class. In CSS, .highlight targets all elements with class="highlight".',
        analogy: 'Classes are like name tags at a party. Anyone wearing a "VIP" badge gets special treatment.',
      },
      config: {
        type: "explanation",
        demoCode: '/* HTML: <p class="highlight">Important!</p> */\n\n.highlight {\n  background-color: yellow;\n  font-weight: bold;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fill-class",
      type: "gap-fill",
      instruction: {
        heading: "Use a class selector",
        body: 'Fill in the CSS selector to target elements with class="special".',
      },
      config: {
        type: "gap-fill",
        template: "{{selector}} {\n  color: purple;\n  font-size: 24px;\n}",
        gaps: [
          { id: "selector", placeholder: "class selector", acceptedAnswers: [".special"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Class selectors start with a dot (.)",
        "The answer is .special",
      ],
    },
    {
      id: "id-selector",
      type: "explanation",
      instruction: {
        heading: "ID selectors: target one specific element",
        body: 'An ID selector starts with a HASH (#). In HTML, you add id="name" to the tag. IDs should be unique — only one element per ID. In CSS, #main-title targets the element with id="main-title".',
        analogy: "An ID is like a Social Security number — unique to one person. A class is like a job title — many people can share it.",
      },
      config: {
        type: "explanation",
        demoCode: '/* HTML: <h1 id="main-title">Welcome</h1> */\n\n#main-title {\n  color: navy;\n  text-align: center;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "write-selectors",
      type: "free-edit",
      instruction: {
        heading: "Practice all three selectors",
        body: "Write three CSS rules: one using an element selector, one using a class selector (with a dot), and one using an ID selector (with a hash).",
      },
      config: {
        type: "free-edit",
        starterCode: "/* Element selector */\n\n/* Class selector */\n\n/* ID selector */\n",
        language: "css",
      },
      validation: { type: "contains-css", criteria: { selector: "." } },
      hints: [
        "For element: just use the tag name like p { }",
        "For class: start with a dot like .myclass { }",
        "For ID: start with # like #myid { }",
      ],
    },
  ],
};
