import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-repeat",
  slug: "background-repeat",
  title: "background-repeat: Tile, Stretch, or Stop",
  description:
    "By default a small background image tiles to fill the box. Learn to control that tiling — including the very common bug of an accidentally repeating photo.",
  order: 4,
  steps: [
    {
      id: "repeat-explain",
      type: "explanation",
      instruction: {
        heading: "Tiling is the default",
        body: "<p>If you put a small image into a large element, the browser repeats it to fill the space. That is sometimes what you want (subtle pattern textures, dotted backgrounds) and sometimes a bug (a photograph showing up four times in a row).</p><p>Values of <code>background-repeat</code>:</p><ul><li><code>repeat</code> — tile in both directions (default).</li><li><code>repeat-x</code> — tile only horizontally.</li><li><code>repeat-y</code> — tile only vertically.</li><li><code>no-repeat</code> — do not tile at all; show the image once.</li><li><code>space</code> / <code>round</code> — distribute evenly with adjustments (less common).</li></ul>",
        analogy:
          "Repeat is like wallpaper — it tiles a small pattern across a whole wall. <code>no-repeat</code> is like hanging one picture in the centre of the wall.",
        docLinks: [
          {
            label: "MDN: background-repeat",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Whenever you set a single photograph as a background and it looks 'doubled' or 'gridded', the fix is almost always <code>background-repeat: no-repeat;</code> paired with <code>background-size: cover</code>.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 8px; }\n  .row { display: flex; gap: 12px; flex-wrap: wrap; }\n  .tile {\n    width: 200px;\n    height: 120px;\n    background-image: url(\'https://picsum.photos/seed/dot/40/40\');\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n  }\n  .repeat   { background-repeat: repeat; }\n  .repeat-x { background-repeat: repeat-x; }\n  .no-rep   { background-repeat: no-repeat; }\n</style>\n<div class="row">\n  <div class="tile repeat"></div>\n  <div class="tile repeat-x"></div>\n  <div class="tile no-rep"></div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "repeat-fix-broken",
      type: "gap-fill",
      instruction: {
        heading: "Fix the broken code",
        body: "<p>The hero image below is appearing four times in a row instead of once because the browser is tiling it. Fill the blank with the value that stops the tiling.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '.hero {\n  background-image: url(\'photo.jpg\');\n  background-size: cover;\n  background-repeat: {{value}};\n}',
        gaps: [
          {
            id: "value",
            placeholder: "value",
            acceptedAnswers: ["no-repeat"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["value"] } },
      hints: [
        "Look at the list of values. One of them turns tiling off entirely.",
        "It is a hyphenated word: 'no' + something.",
      ],
    },
    {
      id: "repeat-x-gap-fill",
      type: "gap-fill",
      instruction: {
        heading: "Fix the broken code: repeating only horizontally",
        body: "<p>This banner has a small leaf icon that should tile across the top edge only — not down the page. Fill the blank with the value that tiles horizontally and not vertically.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '.banner {\n  height: 80px;\n  background-image: url(\'leaf.png\');\n  background-repeat: {{value}};\n  background-position: top;\n}',
        gaps: [
          {
            id: "value",
            placeholder: "value",
            acceptedAnswers: ["repeat-x"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["value"] } },
      hints: [
        "X is the horizontal axis on a graph.",
        "repeat-x tiles horizontally; repeat-y tiles vertically.",
      ],
    },
  ],
};
