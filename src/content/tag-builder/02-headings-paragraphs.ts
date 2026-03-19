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
        body: "HTML has six heading levels: h1 (biggest) through h6 (smallest). They exist to create a clear content hierarchy — just like a Wikipedia article has a title, section headings, and sub-sections. Search engines like Google use your headings to understand what your page is about, which directly affects how it appears in search results.",
        analogy: "Open any Wikipedia article — the page title is an h1, section titles like 'Early life' or 'Career' are h2s, and sub-sections under those are h3s. This structure lets both readers and search engines quickly scan what the page covers.",
        infoBoxes: [
          {
            variant: "standard",
            body: "Headings create a document outline. Screen readers let users jump between heading levels to navigate — skipping levels (h1 to h3) breaks this accessibility feature. Always use headings in order.",
          },
        ],
        docLinks: [
          { label: "<h1>-<h6> headings", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements", type: "html-element" },
        ],
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
        body: "The <p> tag wraps regular text into a paragraph. It exists because reading a wall of unbroken text is exhausting — paragraphs create breathing room. Browsers automatically add spacing above and below each <p> tag, just like how a Medium article or blog post has visible gaps between paragraphs to make reading comfortable.",
        infoBoxes: [
          {
            variant: "standard",
            body: "The <p> tag represents a paragraph of text. Browsers automatically add spacing above and below paragraphs — this is the browser's default stylesheet at work.",
          },
        ],
        docLinks: [
          { label: "<p> paragraph", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p", type: "html-element" },
        ],
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
        body: "Write an h1 title and at least one paragraph below it. You're building the same structure used by every blog post, news article, and product page on the web — a clear title followed by body text.",
        infoBoxes: [
          {
            variant: "tip",
            body: "Only use one <h1> per page. It represents the single main topic. Use <h2> for sub-sections, <h3> for sub-sub-sections.",
          },
        ],
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
