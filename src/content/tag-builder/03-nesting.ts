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
        body: "Tags can go inside other tags — this is called nesting, and it's how you build real page layouts. A <div> is a generic container that groups related content together. On a site like Amazon, each product card is a <div> containing an image, a title, a price, and a button — all nested inside one container. The inner tags must be fully closed before the outer tag closes.",
        analogy: "Think of how your phone's home screen organizes apps into folders. Each folder is a container (like a <div>) with individual apps (like <p> or <h1>) inside it. A webpage works the same way — containers hold groups of related content.",
        infoBoxes: [
          {
            variant: "standard",
            body: "When the browser reads your HTML, it builds a tree structure called the DOM (Document Object Model). Nested tags become child nodes. This tree is how JavaScript and CSS find and style elements.",
          },
        ],
        docLinks: [
          { label: "<div>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div", type: "html-element" },
          { label: "Nesting elements", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax#nesting_elements", type: "html-concept" },
        ],
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
        infoBoxes: [
          {
            variant: "tip",
            body: "Always close inner tags before outer tags — last opened, first closed. If you open <div> then <p>, close <p> first.",
          },
        ],
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
        body: "Tags must close in the right order. <div><p></div></p> is WRONG because the p closes after the div. Browsers try to fix bad nesting automatically, but the result is often broken layouts. This is one of the most common bugs on real websites — even professional developers get tripped up by incorrect nesting.",
        analogy: "You can't close the outer box before closing the inner one — the inner doll has to go in before you shut the bigger doll.",
        infoBoxes: [
          {
            variant: "standard",
            body: "The HTML spec defines which elements can be nested inside others. A <p> cannot contain a <div> — the browser will auto-close the paragraph, causing unexpected layout.",
          },
        ],
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
        body: "Create a div containing an h2 heading and a paragraph. This is the same pattern used to build cards, sections, and content blocks on sites like Airbnb, Netflix, and YouTube — a container wrapping a title and description.",
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
