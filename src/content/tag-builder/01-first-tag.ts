import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-first-tag",
  slug: "first-tag",
  title: "Your First HTML Tag",
  description: "Learn how tags open and close — like lids on a box.",
  order: 1,
  steps: [
    {
      id: "intro",
      type: "explanation",
      instruction: {
        heading: "Tags are containers",
        body: "An HTML tag is like a labeled box. You open it, put something inside, and close it. The browser reads the label to know what kind of content is inside.",
        analogy:
          'Imagine a cardboard box with "HEADING" written on the side. Everything you put inside that box gets treated as a heading.',
      },
      config: {
        type: "explanation",
        demoCode: "<h1>Hello World</h1>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "open-close",
      type: "explanation",
      instruction: {
        heading: "Opening and closing",
        body: 'Every tag has two parts: an opening tag <h1> and a closing tag </h1>. The closing tag has a forward slash / before the tag name. Everything between them is the content.',
        analogy: "The opening tag is like opening the lid of a box, and the closing tag is snapping the lid shut.",
      },
      config: {
        type: "explanation",
        demoCode: "<p>This is a paragraph.</p>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "first-gap-fill",
      type: "gap-fill",
      instruction: {
        heading: "Complete the tag",
        body: 'Type "h1" in both blanks to create a heading tag.',
      },
      config: {
        type: "gap-fill",
        template: "<{{tag_open}}>Hello World</{{tag_close}}>",
        gaps: [
          {
            id: "tag_open",
            placeholder: "tag name",
            acceptedAnswers: ["h1"],
            caseSensitive: false,
          },
          {
            id: "tag_close",
            placeholder: "tag name",
            acceptedAnswers: ["h1"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The tag name goes between the < and > symbols.",
        "For a heading, the tag name is h1.",
      ],
    },
    {
      id: "try-paragraph",
      type: "gap-fill",
      instruction: {
        heading: "Now make a paragraph",
        body: 'Use the "p" tag to create a paragraph. Same idea — open it and close it!',
      },
      config: {
        type: "gap-fill",
        template: "<{{tag_open}}>This is my first paragraph.</{{tag_close}}>",
        gaps: [
          {
            id: "tag_open",
            placeholder: "tag name",
            acceptedAnswers: ["p"],
            caseSensitive: false,
          },
          {
            id: "tag_close",
            placeholder: "tag name",
            acceptedAnswers: ["p"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        'A paragraph uses the "p" tag.',
        "Remember: the opening and closing tag names must match!",
      ],
    },
    {
      id: "free-write",
      type: "free-edit",
      instruction: {
        heading: "Write your own!",
        body: "Now write any HTML tag you like. Try an h1, h2, or p tag with your own text inside.",
      },
      config: {
        type: "free-edit",
        starterCode: "",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "h1|h2|h3|p" } },
      hints: [
        "Start with < then a tag name, then >",
        "Try: <h1>My name is ...</h1>",
      ],
    },
  ],
};
