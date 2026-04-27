import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-static-relative",
  slug: "position-static-relative",
  title: "static & relative",
  description:
    "The default is static — elements sit where flow puts them. With relative you can nudge an element a bit, while leaving its original space reserved.",
  order: 2,
  steps: [
    {
      id: "static-explain",
      type: "explanation",
      instruction: {
        heading: "static is the default — and that is fine",
        body: "<p>Every element in HTML starts with <code>position: static</code>. That just means the element follows normal flow — no special treatment. Most elements on most pages are static. You will never write <code>position: static</code> in your own code, but you should know the value exists because it is the value you might need to <em>reset to</em>.</p><p>Static elements ignore <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>, and <code>z-index</code>. Those properties only do anything once the element is positioned (relative, absolute, fixed, or sticky).</p>",
        docLinks: [
          {
            label: "MDN: position: static",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position#static",
            type: "css-property",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "relative-explain",
      type: "explanation",
      instruction: {
        heading: "relative: nudge without losing your seat",
        body: "<p><code>position: relative</code> does two things at once:</p><ol><li>It lets you offset the element from its normal position with <code>top</code>, <code>right</code>, <code>bottom</code>, or <code>left</code> — measured from where it would have been.</li><li>It reserves the original space, so other elements stay where they were. The relative element appears <em>shifted</em> from a placeholder.</li></ol><p>It also has a less obvious second job: it becomes a <em>positioning context</em> for absolute children. (More on that in the next lesson.)</p>",
        analogy:
          "Imagine you are still in your assigned seat at a wedding, but you lean two seats over to whisper to a friend. The chair you actually own is empty for a moment, but it is still 'yours' — nobody else takes it. That is relative.",
        docLinks: [
          {
            label: "MDN: position: relative",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position#relative",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Negative values work too. <code>top: -10px</code> moves the element up by 10 pixels, even past its normal box.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; }\n  .row { display: flex; gap: 12px; align-items: flex-start; }\n  .item { width: 80px; height: 80px; background: #93c5fd; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; }\n  .nudged { position: relative; top: 16px; left: 24px; background: #f59e0b; }\n</style>\n<div class="row">\n  <div class="item">A</div>\n  <div class="item nudged">B</div>\n  <div class="item">C</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "relative-predict",
      type: "gap-fill",
      instruction: {
        heading: "Predict the output",
        body: "<p>The blue badge should be nudged 12 pixels down and 8 pixels to the right of where it would normally sit. Fill in the values.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '.badge {\n  position: relative;\n  top: {{topVal}};\n  left: {{leftVal}};\n}',
        gaps: [
          {
            id: "topVal",
            placeholder: "value",
            acceptedAnswers: ["12px"],
            caseSensitive: false,
          },
          {
            id: "leftVal",
            placeholder: "value",
            acceptedAnswers: ["8px"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: { gaps: ["topVal", "leftVal"] },
      },
      hints: [
        "top moves the element down (positive numbers).",
        "left moves the element to the right (positive numbers).",
        "Always include the unit — px in this case.",
      ],
    },
    {
      id: "relative-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: lift a card on hover",
        body: "<p>Make <code>.card:hover</code> use <code>position: relative</code> with <code>top: -4px</code> so the card lifts when the user hovers it. (You will pair this with a transition in real code; here just confirm the position works.)</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  body { padding: 24px; font-family: system-ui, sans-serif; }\n  .card {\n    width: 200px;\n    padding: 16px;\n    background: white;\n    border-radius: 12px;\n    box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n    /* Add :hover rule using position: relative + top */\n  }\n</style>\n<div class="card">\n  <h3>Sukuma — Bunch</h3>\n  <p>Fresh today.</p>\n</div>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "position: relative" },
      },
      hints: [
        "Add a .card:hover rule that sets position: relative; top: -4px;",
        "Hover the card in the preview to see the lift.",
      ],
    },
  ],
};
