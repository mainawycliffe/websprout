import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-properties-values",
  slug: "properties-values",
  title: "CSS Properties & Values",
  description: "Explore common CSS properties: color, font-size, background, and more.",
  order: 7,
  steps: [
    {
      id: "color-property",
      type: "explanation",
      instruction: {
        heading: "Colors in CSS",
        body: "The color property changes text color. The background-color property changes the background. You can use named colors (red, blue, green), hex codes (#FF0000), or rgb values.",
      },
      config: {
        type: "explanation",
        demoCode: "h1 {\n  color: navy;\n  background-color: lightyellow;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "font-size",
      type: "gap-fill",
      instruction: {
        heading: "Change the font size",
        body: "Fill in the property name that controls how big text appears.",
      },
      config: {
        type: "gap-fill",
        template: "p {\n  {{property}}: 20px;\n}",
        gaps: [
          { id: "property", placeholder: "size property", acceptedAnswers: ["font-size"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: ["The property is two words joined by a hyphen.", "It's font-size."],
    },
    {
      id: "common-properties",
      type: "explanation",
      instruction: {
        heading: "Common CSS properties",
        body: "Here are the properties you'll use most often: color (text color), background-color (background), font-size (text size), font-weight (bold), text-align (left/center/right), padding (space inside), margin (space outside).",
      },
      config: {
        type: "explanation",
        demoCode: "p {\n  color: darkblue;\n  font-size: 18px;\n  font-weight: bold;\n  text-align: center;\n  background-color: #f0f0f0;\n  padding: 16px;\n  margin: 8px;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "style-multiple",
      type: "free-edit",
      instruction: {
        heading: "Style it up!",
        body: "Write CSS that gives h1 a color, a background-color, and a font-size. Use any values you like!",
      },
      config: {
        type: "free-edit",
        starterCode: "h1 {\n  \n}",
        language: "css",
      },
      validation: { type: "contains-css", criteria: { property: "color" } },
      hints: [
        "Add color: followed by any color name;",
        "Example: color: purple; background-color: pink; font-size: 36px;",
      ],
    },
  ],
};
