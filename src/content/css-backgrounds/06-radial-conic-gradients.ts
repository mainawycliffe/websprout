import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-radial-conic",
  slug: "radial-conic-gradients",
  title: "Radial & Conic Gradients",
  description:
    "Beyond straight lines, CSS can paint circles (radial-gradient) and pie slices (conic-gradient). Learn the syntax and a common typo that breaks them.",
  order: 6,
  steps: [
    {
      id: "radial-explain",
      type: "explanation",
      instruction: {
        heading: "radial-gradient: colours fanning out from a centre",
        body: "<p>A radial gradient starts from a centre point and fans outward. It is perfect for spotlight effects, glowing buttons, and attention-grabbing badges.</p><p>Anatomy: <code>radial-gradient(shape, color1, color2, ...)</code>. Common shapes: <code>circle</code> or <code>ellipse</code>. You can also place the centre with <code>at</code>: <code>radial-gradient(circle at top right, ...)</code>.</p>",
        analogy:
          "Imagine a torch shining at a wall in a dark room. The brightest spot is in the middle and the light fades into darkness around it. That fade is what a radial gradient draws.",
        docLinks: [
          {
            label: "MDN: radial-gradient()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient",
            type: "css-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 8px; }\n  .row { display: flex; gap: 12px; flex-wrap: wrap; }\n  .glow {\n    width: 180px;\n    height: 120px;\n    border-radius: 12px;\n    color: white;\n  }\n  .a { background-image: radial-gradient(circle, #fde047, #b91c1c); }\n  .b { background-image: radial-gradient(circle at top right, #38bdf8, #1e3a8a); }\n  .c { background-image: radial-gradient(ellipse, #f9a8d4, #500724); }\n</style>\n<div class="row">\n  <div class="glow a"></div>\n  <div class="glow b"></div>\n  <div class="glow c"></div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "conic-explain",
      type: "explanation",
      instruction: {
        heading: "conic-gradient: a pie chart in CSS",
        body: "<p>A conic gradient sweeps colours around a centre point like the hand of a clock. With sharp colour stops it draws a pie chart; with smooth ones it creates a colourful disc.</p><p>Anatomy: <code>conic-gradient(from angle, color stops)</code>. You can put colour <em>stops</em> at exact percentages to make crisp pie slices: <code>conic-gradient(red 0% 25%, blue 25% 75%, green 75% 100%)</code>.</p>",
        docLinks: [
          {
            label: "MDN: conic-gradient()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Conic gradients are how lots of dashboards draw donut/pie charts without a charting library — for simple visualisations they save a lot of code.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 8px; }\n  .row { display: flex; gap: 16px; align-items: center; }\n  .pie {\n    width: 140px;\n    height: 140px;\n    border-radius: 50%;\n  }\n  .smooth { background-image: conic-gradient(#f97316, #db2777, #6366f1, #f97316); }\n  .chart  { background-image: conic-gradient(#22c55e 0% 35%, #f59e0b 35% 65%, #ef4444 65% 100%); }\n</style>\n<div class="row">\n  <div class="pie smooth"></div>\n  <div class="pie chart"></div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "radial-fix-broken",
      type: "gap-fill",
      instruction: {
        heading: "Fix the broken code",
        body: "<p>A teammate copy-pasted a radial gradient but the function name has a typo so the browser silently ignores the rule. Fill the blank with the correct function name.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '.glow {\n  width: 200px;\n  height: 120px;\n  background-image: {{fn}}(circle, #fde047, #b91c1c);\n}',
        gaps: [
          {
            id: "fn",
            placeholder: "function",
            acceptedAnswers: ["radial-gradient"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["fn"] } },
      hints: [
        "The function shares the word 'gradient' with linear-gradient.",
        "It is named after the shape it draws — radial.",
      ],
    },
    {
      id: "radial-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a glowing button background",
        body: "<p>Replace the flat colour on the <code>.cta</code> button with a radial gradient. Place the centre in the top-left corner so the button looks lit from one side. Try colours like <code>#facc15</code> fading into <code>#b91c1c</code>.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  body { font-family: system-ui, sans-serif; padding: 16px; }\n  .cta {\n    border: none;\n    color: white;\n    padding: 16px 32px;\n    border-radius: 999px;\n    font-weight: 700;\n    background-color: #b91c1c;\n    /* Replace background-color with a radial-gradient */\n  }\n</style>\n<button class="cta">Order Now</button>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "radial-gradient" },
      },
      hints: [
        "Use background-image: radial-gradient(circle at top left, #facc15, #b91c1c);",
        "You can keep background-color as a fallback, but the radial-gradient line is what proves you have it.",
      ],
    },
  ],
};
