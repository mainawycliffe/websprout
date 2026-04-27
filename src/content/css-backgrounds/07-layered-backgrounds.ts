import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-layered",
  slug: "layered-backgrounds",
  title: "Layered Backgrounds: Stacking Images & Gradients",
  description:
    "The most useful background trick in modern web design — put a dark gradient over a photo so white text becomes readable. You will use this on every hero you build.",
  order: 7,
  steps: [
    {
      id: "layered-explain",
      type: "explanation",
      instruction: {
        heading: "background-image accepts a list",
        body: "<p>The <code>background-image</code> property does not have to be a single value — you can give it a comma-separated list of images, and the browser stacks them from <em>front</em> (first in the list) to <em>back</em> (last in the list).</p><p>The most common stack on the web: a translucent gradient on top of a photo. The gradient darkens the photo so white text on top stays readable no matter what the photo looks like.</p>",
        analogy:
          "Think of a window display. The mannequin in front is the gradient overlay; the painted wall behind it is the photograph. Both are visible together; the front layer just dims part of the back.",
        docLinks: [
          {
            label: "MDN: Using multiple backgrounds",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_borders/Using_multiple_backgrounds",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Hero text on top of photos must reach a contrast ratio of 4.5:1 against its background to meet WCAG AA. A dark gradient overlay is the standard way to guarantee that no matter which photo loads.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .hero {\n    height: 200px;\n    border-radius: 12px;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: system-ui, sans-serif;\n    font-size: 28px;\n    font-weight: 700;\n    background-image:\n      linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),\n      url(\'https://picsum.photos/seed/market/800/300\');\n    background-size: cover;\n    background-position: center;\n  }\n</style>\n<div class="hero">Mboga Direct</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "layered-rgba",
      type: "explanation",
      instruction: {
        heading: "rgba() lets a colour see through",
        body: "<p>To make the overlay translucent, use <code>rgba(red, green, blue, alpha)</code>. The fourth value is opacity from <code>0</code> (fully transparent) to <code>1</code> (fully opaque).</p><p>For a darkening overlay, both stops can be the same colour: <code>linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))</code> draws a flat 50% dark sheet over whatever is behind it.</p><p>Modern syntax also accepts <code>rgb(0 0 0 / 0.5)</code>, but <code>rgba()</code> is what you will see in most existing code.</p>",
        docLinks: [
          {
            label: "MDN: rgba()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgba",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If your text is hard to read on a photo hero, the fix is almost always to bump the alpha of the overlay: try 0.4, 0.55, 0.7. Find the lowest value that still keeps your text crisp.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "layered-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a readable photo hero",
        body: "<p>Right now the heading is hard to read because the photo is bright. Add a dark translucent overlay <em>on top of</em> the photo using <code>linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))</code>. Remember: in the comma-separated list, the overlay comes <em>first</em>.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  .hero {\n    height: 220px;\n    border-radius: 12px;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-family: system-ui, sans-serif;\n    font-size: 26px;\n    font-weight: 700;\n    /* Replace this single background-image with two layers: gradient on top, photo behind. */\n    background-image: url(\'https://picsum.photos/seed/farm/800/300\');\n    background-size: cover;\n    background-position: center;\n  }\n</style>\n<div class="hero">Fresh from the Farm</div>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "rgba" },
      },
      hints: [
        "Replace the background-image line with: background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('...');",
        "Both sides of the comma must be valid background images. The gradient is first, the url() is second.",
      ],
    },
  ],
};
