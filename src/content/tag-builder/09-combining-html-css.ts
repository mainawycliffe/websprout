import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-combining",
  slug: "combining-html-css",
  title: "Combining HTML & CSS",
  description: "Write both HTML and CSS together to build styled pages.",
  order: 9,
  steps: [
    {
      id: "combo-intro",
      type: "explanation",
      instruction: {
        heading: "Putting it all together",
        body: "Now you know HTML tags and CSS rules — the two fundamental languages of every webpage on the internet. Time to combine them! This is exactly how professional developers work: write HTML for the content and structure, then write CSS to make it visually appealing. Every site from a personal blog to Amazon.com is built this way.",
        analogy: "You've learned the same two languages that power the entire web. When you right-click any webpage and select 'View Source', you'll see the same HTML tags and CSS rules you've been learning — you can now read and understand real website code.",
        infoBoxes: [
          {
            variant: "standard",
            body: "When multiple CSS rules target the same element, the browser uses specificity and source order to decide which wins. This is called the cascade — it's the 'C' in CSS.",
          },
        ],
        docLinks: [
          { label: "Getting started with CSS", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started", type: "css-concept" },
        ],
      },
      config: {
        type: "explanation",
        demoCode: '<style>\n  .card {\n    background-color: white;\n    padding: 20px;\n    border: 2px solid #ddd;\n  }\n  .card h2 {\n    color: navy;\n  }\n</style>\n\n<div class="card">\n  <h2>My Card</h2>\n  <p>This is a styled card.</p>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "style-card",
      type: "gap-fill",
      instruction: {
        heading: "Complete the styled card",
        body: "Fill in the CSS property to give the card a background color, and the HTML class name to connect them. This card pattern is one of the most common components on the web — you see it on Twitter/X posts, Trello boards, Airbnb listings, and app stores.",
      },
      config: {
        type: "gap-fill",
        template: '<style>\n  .info-box {\n    {{css_prop}}: lightblue;\n    padding: 16px;\n  }\n</style>\n\n<div class="{{class_name}}">\n  <p>Important information here.</p>\n</div>',
        gaps: [
          { id: "css_prop", placeholder: "CSS property", acceptedAnswers: ["background-color", "background"], caseSensitive: true },
          { id: "class_name", placeholder: "class name", acceptedAnswers: ["info-box"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The property for background color is background-color.",
        "The class name in the CSS (.info-box) must match the class in the HTML.",
      ],
    },
    {
      id: "build-styled-page",
      type: "free-edit",
      instruction: {
        heading: "Build a styled page!",
        body: "Create a mini webpage with at least: a <style> tag with CSS rules, an h1 title, a paragraph, and use at least one class. You now have all the building blocks to create a real webpage — this is the same foundation that every web developer started with.",
        infoBoxes: [
          {
            variant: "tip",
            body: "Keep styles in a <style> tag or external stylesheet rather than inline style attributes. Inline styles can't be reused and have the highest specificity, making them hard to override.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: "<style>\n  /* Your CSS here */\n  \n</style>\n\n<!-- Your HTML here -->\n",
        language: "both",
      },
      validation: { type: "contains-tag", criteria: { tag: "style" } },
      hints: [
        "Start by writing CSS rules inside the <style> tag.",
        'Try adding a class to your HTML: <h1 class="title">My Page</h1>',
        "Then style it: .title { color: purple; font-size: 40px; }",
      ],
    },
  ],
};
