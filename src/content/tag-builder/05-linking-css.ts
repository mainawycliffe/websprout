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
        body: "HTML creates the content and structure of a page. CSS controls how it looks — colors, sizes, spacing, fonts. They were intentionally made as separate languages because it lets you change the entire look of a website without touching the content. Sites like Twitter/X and YouTube use CSS to implement dark mode — the HTML stays exactly the same, only the CSS changes.",
        analogy: "Imagine redecorating a room: you don't rebuild the walls just to change the paint color. HTML is the structure (walls, rooms, doors) and CSS is the decoration (paint, furniture, lighting). Keeping them separate means you can redesign without rebuilding — exactly how real companies rebrand their websites.",
        infoBoxes: [
          {
            variant: "standard",
            body: "Separation of concerns: HTML defines structure, CSS defines presentation. Keeping them in separate files means you can restyle an entire site by changing one CSS file.",
          },
        ],
        docLinks: [
          { label: "<link>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link", type: "html-element" },
        ],
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
        body: "Instead of a separate file, you can put CSS directly in a <style> tag inside <head>. This is convenient for small projects or quick experiments (like this tool!), but real websites like Spotify or GitHub put CSS in separate .css files so the styles can be shared across hundreds of pages without copying and pasting.",
        infoBoxes: [
          {
            variant: "tip",
            body: "Put <link> tags inside <head>, not <body>. The browser needs to load CSS before rendering — otherwise users see a flash of unstyled content (FOUC).",
          },
        ],
        docLinks: [
          { label: "<style>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style", type: "html-element" },
        ],
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
        body: "Write a simple HTML page with a <style> tag that changes the color of an h1. You're doing exactly what a web developer does when prototyping a new page — write the HTML structure first, then add CSS to make it look good.",
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
