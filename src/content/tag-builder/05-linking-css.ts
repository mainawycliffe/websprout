import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-linking-css",
  slug: "linking-css",
  title: "Linking CSS to HTML",
  description: "Connect a stylesheet to your HTML page.",
  order: 5,
  steps: [
    {
      id: "why-css",
      type: "explanation",
      instruction: {
        heading: "HTML is structure, CSS is style",
        body: "HTML creates the content and structure of a page. CSS controls how it looks — colors, sizes, spacing, fonts. They live in separate files and are linked together.",
        analogy: "HTML is like the frame and walls of a house. CSS is the paint, wallpaper, and decorations. You need both, but they're different jobs.",
      },
      config: {
        type: "explanation",
        demoCode: '<!-- In your HTML file -->\n<link rel="stylesheet" href="styles.css">',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "link-tag",
      type: "gap-fill",
      instruction: {
        heading: "Link a CSS file",
        body: 'The <link> tag connects CSS to HTML. Fill in the attribute to tell the browser this is a stylesheet.',
      },
      config: {
        type: "gap-fill",
        template: '<link rel="{{rel_value}}" href="styles.css">',
        gaps: [
          { id: "rel_value", placeholder: "relationship type", acceptedAnswers: ["stylesheet"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        'The rel attribute tells the browser what kind of file is being linked.',
        'The value should be "stylesheet".',
      ],
    },
    {
      id: "style-tag",
      type: "explanation",
      instruction: {
        heading: "You can also write CSS inside HTML",
        body: "Instead of a separate file, you can put CSS directly in a <style> tag inside <head>. This is fine for small projects, but separate files are better for real websites.",
      },
      config: {
        type: "explanation",
        demoCode: "<style>\n  h1 {\n    color: blue;\n  }\n</style>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "full-page",
      type: "free-edit",
      instruction: {
        heading: "Put it all together",
        body: "Write a simple HTML page with a <style> tag that changes the color of an h1. Include the h1 with some text.",
      },
      config: {
        type: "free-edit",
        starterCode: "<style>\n  \n</style>\n\n<h1>My Styled Page</h1>",
        language: "both",
      },
      validation: { type: "contains-tag", criteria: { tag: "style" } },
      hints: [
        "Inside the <style> tag, write: h1 { color: blue; }",
        "The CSS goes between <style> and </style>.",
      ],
    },
  ],
};
