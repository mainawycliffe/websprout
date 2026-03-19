import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-headings-paragraphs",
  slug: "headings-paragraphs",
  title: "Headings & Paragraphs",
  description: "Learn the different heading sizes and how paragraphs work.",
  order: 2,
  steps: [
    {
      id: "heading-sizes",
      type: "explanation",
      instruction: {
        heading: "Six sizes of headings",
        body: "HTML has six heading levels: h1 (biggest) through h6 (smallest). Use h1 for the main title, h2 for sections, and so on.",
        analogy: "Think of headings like a book: h1 is the book title, h2 is a chapter title, h3 is a section within a chapter.",
      },
      config: {
        type: "explanation",
        demoCode: "<h1>Book Title</h1>\n<h2>Chapter 1</h2>\n<h3>Section 1.1</h3>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fill-headings",
      type: "gap-fill",
      instruction: {
        heading: "Create a heading hierarchy",
        body: "Fill in the tag names to create an h1 for the title and an h2 for the subtitle.",
      },
      config: {
        type: "gap-fill",
        template: "<{{h1_open}}>My Website</{{h1_close}}>\n<{{h2_open}}>Welcome!</{{h2_close}}>",
        gaps: [
          { id: "h1_open", placeholder: "biggest heading", acceptedAnswers: ["h1"], caseSensitive: false },
          { id: "h1_close", placeholder: "biggest heading", acceptedAnswers: ["h1"], caseSensitive: false },
          { id: "h2_open", placeholder: "second heading", acceptedAnswers: ["h2"], caseSensitive: false },
          { id: "h2_close", placeholder: "second heading", acceptedAnswers: ["h2"], caseSensitive: false },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: ["The biggest heading is h1.", "The second level heading is h2."],
    },
    {
      id: "paragraphs",
      type: "explanation",
      instruction: {
        heading: "Paragraphs add body text",
        body: "The <p> tag is for regular text content. Browsers add spacing between paragraphs automatically.",
      },
      config: {
        type: "explanation",
        demoCode: "<p>This is the first paragraph.</p>\n<p>This is another paragraph below it.</p>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-page",
      type: "free-edit",
      instruction: {
        heading: "Build a mini page",
        body: "Write an h1 title and at least one paragraph below it. Make it about anything you like!",
      },
      config: {
        type: "free-edit",
        starterCode: "",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "p" } },
      hints: [
        "Start with <h1>Your Title</h1>",
        "Then add <p>Your paragraph text here.</p>",
      ],
    },
  ],
};
