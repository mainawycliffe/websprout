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
        body: "HTML tags exist because browsers need a way to understand what your content means. Without tags, a browser would just see a wall of text with no structure. An HTML tag wraps your content and labels it — 'this is a heading', 'this is a paragraph' — so the browser, search engines like Google, and screen readers all know how to display and interpret it.",
        analogy:
          'Think of how a news website like BBC or CNN is structured: the main headline is big and bold, sub-headlines are smaller, and body text is regular-sized. HTML tags are how developers tell the browser which text is which — without them, everything would look the same.',
        infoBoxes: [
          {
            variant: "standard",
            body: "Every HTML tag has a meaning. <h1> doesn't just make text big — it tells the browser (and screen readers) 'this is the most important heading on the page.' This is called semantic HTML.",
          },
        ],
        docLinks: [
          { label: "<h1> heading", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements", type: "html-element" },
        ],
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
        body: 'Every tag has two parts: an opening tag <h1> and a closing tag </h1>. The closing tag has a forward slash / before the tag name. This pairing exists so the browser knows exactly where your content starts and ends — just like quotation marks in writing tell the reader where a quote begins and finishes.',
        analogy: "The opening tag is like opening the lid of a box, and the closing tag is snapping the lid shut.",
        docLinks: [
          { label: "<p> paragraph", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p", type: "html-element" },
        ],
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
        infoBoxes: [
          {
            variant: "tip",
            body: "The opening and closing tag names must match exactly. Forgetting the closing tag is the most common beginner mistake — the browser will guess where to close it, often incorrectly.",
          },
        ],
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
        body: "Now write any HTML tag you like. Try an h1, h2, or p tag with your own text inside. Every webpage you visit — from Google's search results to your favorite social media — is built with these exact same tags.",
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
