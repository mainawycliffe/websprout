import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-nesting",
  slug: "nesting",
  title: "Nesting Tags",
  description: "Put tags inside other tags — boxes inside boxes.",
  order: 3,
  steps: [
    {
      id: "nesting-intro",
      type: "explanation",
      instruction: {
        heading: "Boxes inside boxes",
        body: "Tags can go inside other tags. This is called nesting. A <div> can contain headings, paragraphs, and more. The inner tags must be fully closed before the outer tag closes.",
        analogy: "Think of Russian nesting dolls. Each doll fits inside a bigger one. HTML tags work the same way — smaller boxes go inside bigger boxes.",
      },
      config: {
        type: "explanation",
        demoCode: "<div>\n  <h1>Title</h1>\n  <p>Some text.</p>\n</div>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "nest-practice",
      type: "gap-fill",
      instruction: {
        heading: "Nest a paragraph inside a div",
        body: "Fill in the blanks to put a paragraph inside a div container.",
      },
      config: {
        type: "gap-fill",
        template: "<{{outer_open}}>\n  <{{inner_open}}>Hello from inside!</{{inner_close}}>\n</{{outer_close}}>",
        gaps: [
          { id: "outer_open", placeholder: "container tag", acceptedAnswers: ["div"], caseSensitive: false },
          { id: "inner_open", placeholder: "text tag", acceptedAnswers: ["p"], caseSensitive: false },
          { id: "inner_close", placeholder: "text tag", acceptedAnswers: ["p"], caseSensitive: false },
          { id: "outer_close", placeholder: "container tag", acceptedAnswers: ["div"], caseSensitive: false },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: ["The container tag is div.", "The text tag is p."],
    },
    {
      id: "wrong-nesting",
      type: "explanation",
      instruction: {
        heading: "Watch out for wrong nesting!",
        body: "Tags must close in the right order. <div><p></div></p> is WRONG because the p closes after the div. Always close the inner tag first.",
        analogy: "You can't close the outer box before closing the inner one — the inner doll has to go in before you shut the bigger doll.",
      },
      config: {
        type: "explanation",
        demoCode: "<!-- WRONG -->\n<div><p>text</div></p>\n\n<!-- RIGHT -->\n<div><p>text</p></div>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-nested",
      type: "free-edit",
      instruction: {
        heading: "Build a nested structure",
        body: "Create a div containing an h2 heading and a paragraph. Make sure the nesting is correct!",
      },
      config: {
        type: "free-edit",
        starterCode: "<div>\n  \n</div>",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "h2" } },
      hints: [
        "Put your h2 and p tags between the opening and closing div tags.",
        "Example: <div><h2>Title</h2><p>Text</p></div>",
      ],
    },
  ],
};
