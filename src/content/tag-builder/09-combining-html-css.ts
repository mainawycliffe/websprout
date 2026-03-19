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
        body: "Now you know HTML tags and CSS rules. Time to combine them! You'll write HTML for structure and CSS for style, and see the result live.",
        analogy: "You've learned to build the frame (HTML) and mix the paint (CSS). Now let's build and paint a room!",
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
        body: "Fill in the CSS property to give the card a background color, and the HTML class name to connect them.",
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
        body: "Create a mini webpage with at least: a <style> tag with CSS rules, an h1 title, a paragraph, and use at least one class. Make it look however you want!",
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
