import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-linear-gradient",
  slug: "linear-gradients",
  title: "Linear Gradients",
  description:
    "A gradient is an image you generate with code instead of fetching from a server. Master linear-gradient — the workhorse of every modern landing page.",
  order: 5,
  steps: [
    {
      id: "linear-explain",
      type: "explanation",
      instruction: {
        heading: "Gradients are images made of colour stops",
        body: "<p>The function <code>linear-gradient()</code> generates an image that fades from one colour to another along a straight line. Because the result is an image, you use it with <code>background-image</code>, just like a photo.</p><p>Anatomy: <code>linear-gradient(direction, color1, color2, ...)</code>. The direction can be a keyword (<code>to right</code>, <code>to bottom</code>, <code>to bottom right</code>) or an angle (<code>45deg</code>, <code>180deg</code>). Each colour after that is a 'stop'. With two stops the gradient fades smoothly between them; with more stops you get bands.</p>",
        analogy:
          "It is a sunset. The sky fades from blue at the top, through orange, into deep red near the horizon. Each colour you remember from a sunset is a 'stop'; the gradient fills in the smooth transitions.",
        docLinks: [
          {
            label: "MDN: linear-gradient()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient",
            type: "css-concept",
          },
          {
            label: "MDN: <gradient>",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A gradient is an <em>image</em>. So <code>background-image: linear-gradient(...)</code> is correct, not <code>background-color: linear-gradient(...)</code>.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 8px; }\n  .row { display: flex; gap: 12px; flex-wrap: wrap; }\n  .swatch {\n    width: 200px;\n    height: 100px;\n    border-radius: 12px;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 600;\n  }\n  .a { background-image: linear-gradient(to right, #2563eb, #db2777); }\n  .b { background-image: linear-gradient(to bottom, #14b8a6, #facc15); }\n  .c { background-image: linear-gradient(45deg, #6366f1, #ec4899, #f59e0b); }\n</style>\n<div class="row">\n  <div class="swatch a">to right</div>\n  <div class="swatch b">to bottom</div>\n  <div class="swatch c">45deg, three stops</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "linear-direction",
      type: "explanation",
      instruction: {
        heading: "Direction: keywords vs angles",
        body: "<p>Two ways to point a gradient:</p><ul><li><strong>Keywords</strong> — <code>to top</code>, <code>to right</code>, <code>to bottom</code>, <code>to left</code>, plus the diagonals like <code>to bottom right</code>. Easy to read, easy to remember.</li><li><strong>Angles</strong> — <code>0deg</code> points straight up, <code>90deg</code> points right, <code>180deg</code> points down, <code>270deg</code> points left. Use any number in between.</li></ul><p>If you skip the direction, the default is <code>to bottom</code> (top to bottom).</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 8px; }\n  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; max-width: 480px; }\n  .tile {\n    height: 100px;\n    border-radius: 12px;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 600;\n  }\n  .t1 { background-image: linear-gradient(to right, #0ea5e9, #6366f1); }\n  .t2 { background-image: linear-gradient(180deg, #0ea5e9, #6366f1); }\n  .t3 { background-image: linear-gradient(45deg, #0ea5e9, #6366f1); }\n  .t4 { background-image: linear-gradient(135deg, #0ea5e9, #6366f1); }\n</style>\n<div class="grid">\n  <div class="tile t1">to right</div>\n  <div class="tile t2">180deg</div>\n  <div class="tile t3">45deg</div>\n  <div class="tile t4">135deg</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "linear-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a sunset gradient",
        body: "<p>Add a three-stop linear gradient to the <code>.sunset</code> element going from <em>top</em> to <em>bottom</em> through warm colours. A common sunset palette: <code>#1e3a8a</code> (deep blue) to <code>#f97316</code> (orange) to <code>#facc15</code> (yellow).</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Try <code>background-image: linear-gradient(to bottom, #1e3a8a, #f97316, #facc15);</code>. Then change the order or angle and watch the sunset change.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  .sunset {\n    width: 100%;\n    height: 200px;\n    border-radius: 12px;\n    /* Add a linear-gradient here */\n  }\n</style>\n<div class="sunset"></div>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "linear-gradient" },
      },
      hints: [
        "Use background-image, not background-color.",
        "Use linear-gradient() with at least two colour stops separated by commas.",
        "Try: background-image: linear-gradient(to bottom, #1e3a8a, #f97316, #facc15);",
      ],
    },
  ],
};
