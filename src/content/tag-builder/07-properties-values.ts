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
        body: "The color property changes text color and background-color changes the background. These two properties are behind every brand's web presence — Spotify's green-on-black, Facebook's blue headers, Netflix's red accents. You can use named colors (red, blue), hex codes (#FF0000 — the format designers use), or rgb values for precise control.",
        infoBoxes: [
          {
            variant: "standard",
            body: "CSS property names use American English spelling: 'color' not 'colour', 'gray' not 'grey' (though named colors accept both grey and gray).",
          },
        ],
        docLinks: [
          { label: "color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color", type: "css-property" },
          { label: "background-color", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-color", type: "css-property" },
        ],
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
        body: "Fill in the property name that controls how big text appears. Font sizing is crucial for readability — it's why news sites use large text for headlines and smaller text for body content, guiding your eye through the page.",
        docLinks: [
          { label: "font-size", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-size", type: "css-property" },
        ],
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
        body: "Here are the properties you'll use most often — they cover about 80% of everyday styling work. Sites like Apple.com use font-weight: bold for emphasis, text-align: center for hero sections, padding for breathing room inside buttons, and margin for spacing between sections. Master these seven properties and you can style most of any basic webpage.",
        docLinks: [
          { label: "font-weight", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight", type: "css-property" },
          { label: "text-align", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/text-align", type: "css-property" },
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin", type: "css-property" },
        ],
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
        body: "Write CSS that gives h1 a color, a background-color, and a font-size. Combining multiple properties on one element is how developers create polished designs — a button isn't just a color, it's a combination of background, padding, font-size, and border-radius working together.",
        infoBoxes: [
          {
            variant: "tip",
            body: "When padding or margin looks wrong, check the shorthand order: top, right, bottom, left (clockwise from the top). 'padding: 10px 20px' means 10px top/bottom, 20px left/right.",
          },
        ],
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
