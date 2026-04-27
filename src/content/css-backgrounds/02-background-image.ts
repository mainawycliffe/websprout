import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-image",
  slug: "background-image",
  title: "background-image: A Photo Behind Anything",
  description:
    "Use background-image to paint a picture behind any element. Learn the url() syntax and why a background image is not the same as an <img> tag.",
  order: 2,
  steps: [
    {
      id: "image-explain",
      type: "explanation",
      instruction: {
        heading: "background-image puts a picture behind content",
        body: "<p>The <code>background-image</code> property paints an image behind whatever the element contains. The image does not affect the layout — your text, buttons and other elements stay where the box already put them. The picture is purely decorative paint.</p><p>You give it an image source with the <code>url()</code> function: <code>background-image: url('photo.jpg');</code>. The URL can be relative (<code>'photo.jpg'</code>), absolute (<code>'https://...'</code>), or a data URL.</p>",
        analogy:
          "An <code>&lt;img&gt;</code> tag is a photograph hung on the wall — it takes up its own space. A <code>background-image</code> is wallpaper — it covers the wall behind everything else, and the furniture sits in front of it.",
        docLinks: [
          {
            label: "MDN: background-image",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-image",
            type: "css-property",
          },
          {
            label: "MDN: url()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/url",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Decorative images belong in CSS. <em>Meaningful</em> images that convey information should stay as <code>&lt;img&gt;</code> tags so screen readers can describe them via the <code>alt</code> attribute.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .card {\n    width: 100%;\n    height: 200px;\n    background-image: url(\'https://picsum.photos/seed/sukuma/600/400\');\n    border-radius: 12px;\n  }\n</style>\n<div class="card"></div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "image-gap-fill",
      type: "gap-fill",
      instruction: {
        heading: "Predict the output",
        body: "<p>Fill in the property name and the function used to point at an image URL.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '.hero {\n  width: 100%;\n  height: 240px;\n  {{prop}}: {{fn}}(\'https://picsum.photos/seed/hero/800/300\');\n}',
        gaps: [
          {
            id: "prop",
            placeholder: "property",
            acceptedAnswers: ["background-image"],
            caseSensitive: false,
          },
          {
            id: "fn",
            placeholder: "function",
            acceptedAnswers: ["url"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: { gaps: ["prop", "fn"] },
      },
      hints: [
        "The property name is two words joined with a hyphen.",
        "The function reads like the abbreviation of 'uniform resource locator'.",
      ],
    },
    {
      id: "image-free-edit",
      type: "free-edit",
      instruction: {
        heading: "Build it: a market hero card",
        body: "<p>Add a <code>background-image</code> to the <code>.hero</code> rule using <code>https://picsum.photos/seed/sukuma/800/300</code>. Save the change and watch the photo appear behind the text in the preview.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Picsum gives you a different photo for each <code>seed</code> value, so swap the seed to try a new image.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  .hero {\n    width: 100%;\n    height: 200px;\n    border-radius: 12px;\n    color: white;\n    padding: 16px;\n    /* Add a background-image here */\n  }\n</style>\n<div class="hero">\n  <h2>Fresh Today</h2>\n</div>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "background-image" },
      },
      hints: [
        "Inside the .hero rule add: background-image: url('https://picsum.photos/seed/sukuma/800/300');",
        "Make sure the line ends with a semicolon and lives inside the curly braces.",
      ],
    },
  ],
};
