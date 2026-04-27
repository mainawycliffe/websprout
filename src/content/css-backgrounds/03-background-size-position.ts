import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-size-position",
  slug: "background-size-position",
  title: "Sizing & Positioning Backgrounds",
  description:
    "Most background images do not match the element's size. Learn cover vs contain and how to control which part of the image stays visible.",
  order: 3,
  steps: [
    {
      id: "size-explain",
      type: "explanation",
      instruction: {
        heading: "cover vs contain",
        body: "<p>Background images come in their own dimensions, but the element you put them behind probably has different ones. Two values solve almost every case:</p><ul><li><code>background-size: cover</code> — scale the image up until it fully covers the element. Some of the image will be cropped. Use this for hero photos.</li><li><code>background-size: contain</code> — scale the image so the whole picture fits. Empty space appears around it if proportions differ. Use this for logos and icons.</li></ul><p>You can also give exact sizes: <code>background-size: 200px 100px</code> or <code>background-size: 100% auto</code>.</p>",
        analogy:
          "Hanging a poster bigger than the wall: <em>cover</em> is when you let the edges spill behind the furniture (no white wall showing). <em>Contain</em> is when you trim it to fit, leaving a margin of bare wall.",
        docLinks: [
          {
            label: "MDN: background-size",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-size",
            type: "css-property",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 8px; }\n  .row { display: flex; gap: 12px; flex-wrap: wrap; }\n  .box {\n    width: 220px;\n    height: 140px;\n    background-image: url(\'https://picsum.photos/seed/grocer/600/400\');\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n  }\n  .cover   { background-size: cover; }\n  .contain { background-size: contain; background-repeat: no-repeat; background-color: #f1f5f9; }\n</style>\n<div class="row">\n  <div class="box cover"></div>\n  <div class="box contain"></div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "position-explain",
      type: "explanation",
      instruction: {
        heading: "background-position controls the crop",
        body: "<p>When the image is bigger than the element (which is what <code>cover</code> does on purpose), some of the image is cropped. <code>background-position</code> tells the browser <em>which part to show</em>.</p><p>Common values:</p><ul><li>Keywords: <code>top</code>, <code>center</code>, <code>bottom</code>, <code>left</code>, <code>right</code> — combine two: <code>background-position: center top</code>.</li><li>Percentages: <code>background-position: 50% 50%</code> centres the image.</li><li>Pixels: <code>background-position: 20px 0</code> nudges by a fixed amount.</li></ul>",
        docLinks: [
          {
            label: "MDN: background-position",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-position",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Photos of faces almost always look better with <code>background-position: center top</code> — that keeps the head from getting cropped at the top.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 8px; }\n  .row { display: flex; gap: 12px; }\n  .pic {\n    width: 200px;\n    height: 120px;\n    background-image: url(\'https://picsum.photos/seed/face/600/600\');\n    background-size: cover;\n    border-radius: 8px;\n  }\n  .top    { background-position: center top; }\n  .center { background-position: center center; }\n  .bottom { background-position: center bottom; }\n</style>\n<div class="row">\n  <div class="pic top"></div>\n  <div class="pic center"></div>\n  <div class="pic bottom"></div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "size-gap-fill",
      type: "gap-fill",
      instruction: {
        heading: "Predict: which value fills the box without leaving gaps?",
        body: "<p>Fill the blank so the image fully covers the box without leaving any empty space.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '.hero {\n  background-image: url(\'/banner.jpg\');\n  background-size: {{value}};\n  background-position: center;\n}',
        gaps: [
          {
            id: "value",
            placeholder: "value",
            acceptedAnswers: ["cover"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["value"] } },
      hints: [
        "There are two main keywords. One leaves empty space; one crops.",
        "You want no empty space — it covers the whole element.",
      ],
    },
    {
      id: "position-free-edit",
      type: "free-edit",
      instruction: {
        heading: "Build it: keep the face from getting cropped at the top",
        body: "<p>The portrait is currently centred and the top of the head is being cut off. Change <code>background-position</code> so the head is fully visible.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  .portrait {\n    width: 200px;\n    height: 120px;\n    background-image: url(\'https://picsum.photos/seed/face/600/600\');\n    background-size: cover;\n    background-position: center center;\n    border-radius: 8px;\n  }\n</style>\n<div class="portrait"></div>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "background-position" },
      },
      hints: [
        "Change the second value of background-position so the top of the image is anchored.",
        "Try background-position: center top;",
      ],
    },
  ],
};
