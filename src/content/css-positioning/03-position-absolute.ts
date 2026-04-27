import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-absolute",
  slug: "position-absolute",
  title: "position: absolute — Out of Flow",
  description:
    "Absolute removes an element from normal flow and pins it to its nearest positioned ancestor. The result: badges, tooltips, dropdowns, and overlays.",
  order: 3,
  steps: [
    {
      id: "absolute-explain",
      type: "explanation",
      instruction: {
        heading: "Absolute leaves the queue",
        body: "<p><code>position: absolute</code> removes the element from normal flow entirely. The space it would have taken collapses — sibling elements act as if it were not there.</p><p>The element is then placed using <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code> — but measured from where? The <em>nearest positioned ancestor</em>. A 'positioned ancestor' is any parent up the tree whose position is <code>relative</code>, <code>absolute</code>, <code>fixed</code>, or <code>sticky</code>. If there is no such ancestor, the element is positioned relative to the viewport.</p>",
        analogy:
          "Absolute is the sticker you peel off and slap onto the page. Once stuck, it floats above everything else. Where it sticks depends on which surface (positioned parent) is right under your hand.",
        docLinks: [
          {
            label: "MDN: position: absolute",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position#absolute",
            type: "css-property",
          },
          {
            label: "MDN: containing block",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block",
            type: "css-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; padding: 16px; }\n  .card {\n    position: relative;\n    width: 220px;\n    padding: 16px;\n    background: #f8fafc;\n    border-radius: 12px;\n    box-shadow: 0 2px 8px rgba(0,0,0,0.06);\n  }\n  .badge {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n    background: #ef4444;\n    color: white;\n    padding: 2px 10px;\n    border-radius: 999px;\n    font-size: 12px;\n    font-weight: 700;\n  }\n</style>\n<div class="card">\n  <span class="badge">NEW</span>\n  <h3>Tomatoes — Per kg</h3>\n  <p>Vine-ripened.</p>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "absolute-must-have-positioned-parent",
      type: "explanation",
      instruction: {
        heading: "The single most common gotcha",
        body: "<p>Absolute children look for the nearest positioned ancestor. If you forget to set <code>position: relative</code> on the parent, the child anchors all the way up to the <code>&lt;html&gt;</code> element — and your badge ends up in the corner of the page instead of the corner of the card.</p><p>Rule of thumb: <strong>any element that contains an absolutely-positioned child should itself be at least <code>position: relative</code></strong>.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "When something positioned absolutely lands in the wrong place, the first thing to check is: does the parent have <code>position: relative</code>? Nine times out of ten, that is the missing piece.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "absolute-fix-broken",
      type: "gap-fill",
      instruction: {
        heading: "Fix the broken code",
        body: "<p>The badge is supposed to sit in the top-right corner of the card. Instead it is in the top-right corner of the whole page. The card is missing one property. Fill the blank.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '.card {\n  position: {{value}};\n  padding: 16px;\n  background: #f8fafc;\n}\n\n.badge {\n  position: absolute;\n  top: -8px;\n  right: -8px;\n}',
        gaps: [
          {
            id: "value",
            placeholder: "value",
            acceptedAnswers: ["relative"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["value"] } },
      hints: [
        "The card needs to be a positioned ancestor — but you do not want to move it around.",
        "The value that creates a positioning context without moving the element is 'relative'.",
      ],
    },
    {
      id: "absolute-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a corner ribbon",
        body: "<p>Add a <code>.ribbon</code> child inside the card with the text <code>SALE</code>. Make it <code>position: absolute</code>, sit at <code>top: 8px</code>, <code>left: 8px</code>, with red background and white text. Make sure the parent card has <code>position: relative</code>.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  body { padding: 24px; font-family: system-ui, sans-serif; }\n  .card {\n    /* Make this a positioning context */\n    width: 220px;\n    padding: 16px;\n    background: white;\n    border-radius: 12px;\n    box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n  }\n  .ribbon {\n    /* Position it absolutely in the top-left corner */\n    background: #ef4444;\n    color: white;\n    padding: 2px 8px;\n    font-weight: 700;\n    border-radius: 4px;\n    font-size: 12px;\n  }\n</style>\n<div class="card">\n  <span class="ribbon">SALE</span>\n  <h3>Onions — Per kg</h3>\n</div>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "position: absolute" },
      },
      hints: [
        ".card { position: relative; ... }",
        ".ribbon { position: absolute; top: 8px; left: 8px; ... }",
      ],
    },
  ],
};
