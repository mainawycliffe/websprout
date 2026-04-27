import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-shorthand",
  slug: "shorthand",
  title: "The background Shorthand",
  description:
    "In real codebases you will see one line that does the work of five. Learn to read and write the background shorthand without losing track of which value is which.",
  order: 8,
  steps: [
    {
      id: "shorthand-explain",
      type: "explanation",
      instruction: {
        heading: "One line, multiple jobs",
        body: "<p>The <code>background</code> shorthand combines several properties into a single declaration:</p><pre>background: &lt;color&gt; &lt;image&gt; &lt;repeat&gt; &lt;position&gt; / &lt;size&gt; &lt;attachment&gt;;</pre><p>You do not have to use every part — anything you skip falls back to its default. Common combos:</p><ul><li><code>background: #f1f5f9;</code> — just a colour.</li><li><code>background: url('hero.jpg') center / cover no-repeat;</code> — image, centred, scaled to cover, not tiled.</li><li><code>background: linear-gradient(...) no-repeat;</code> — a gradient that does not tile.</li></ul>",
        docLinks: [
          {
            label: "MDN: background (shorthand)",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The slash <code>/</code> is what separates <code>background-position</code> from <code>background-size</code>. If you see <code>center / cover</code>, that means 'position: center; size: cover'. Without the slash, the browser does not know which is which.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; }\n  .hero {\n    height: 180px;\n    border-radius: 12px;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 24px;\n    font-weight: 700;\n    /* The whole hero in one line: */\n    background: #1e293b url(\'https://picsum.photos/seed/banner/800/300\') center / cover no-repeat;\n  }\n</style>\n<div class="hero">One-line background</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "shorthand-predict",
      type: "gap-fill",
      instruction: {
        heading: "Predict: which long-form properties does this set?",
        body: "<p>Read the shorthand and fill in the matching long-form values that the browser will compute.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '/* CSS author writes: */\n.hero {\n  background: #0f172a url(\'/banner.jpg\') center / cover no-repeat;\n}\n\n/* The browser computes: */\nbackground-color:    {{color}};\nbackground-image:    url(\'/banner.jpg\');\nbackground-position: {{pos}};\nbackground-size:     {{size}};\nbackground-repeat:   {{repeat}};',
        gaps: [
          {
            id: "color",
            placeholder: "value",
            acceptedAnswers: ["#0f172a"],
            caseSensitive: false,
          },
          {
            id: "pos",
            placeholder: "value",
            acceptedAnswers: ["center"],
            caseSensitive: false,
          },
          {
            id: "size",
            placeholder: "value",
            acceptedAnswers: ["cover"],
            caseSensitive: false,
          },
          {
            id: "repeat",
            placeholder: "value",
            acceptedAnswers: ["no-repeat"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: { gaps: ["color", "pos", "size", "repeat"] },
      },
      hints: [
        "Position comes before the slash; size comes after the slash.",
        "Repeat is the keyword that controls tiling.",
        "Colour is the bare hex value with no url() and no keyword.",
      ],
    },
    {
      id: "shorthand-build",
      type: "free-edit",
      instruction: {
        heading: "Rewrite the longhand as one line",
        body: "<p>Replace the four long-form properties with a single <code>background</code> shorthand that produces the same result. Keep the photo, keep the centre position, keep cover sizing, keep no-repeat.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  .hero {\n    height: 200px;\n    border-radius: 12px;\n    color: white;\n    /* Replace these four lines with a single `background:` declaration */\n    background-image: url(\'https://picsum.photos/seed/sukuma/800/300\');\n    background-position: center;\n    background-size: cover;\n    background-repeat: no-repeat;\n  }\n</style>\n<div class="hero"></div>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "background:" },
      },
      hints: [
        "The shorthand looks like: background: url('...') center / cover no-repeat;",
        "Make sure to keep the slash between center and cover.",
      ],
    },
  ],
};
