import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-pseudo-tooltip",
  slug: "pseudo-elements-tooltip",
  title: "::before & ::after — Build a Tooltip",
  description:
    "Pseudo-elements let you generate decoration in CSS without adding HTML. Combine them with absolute positioning to build a tooltip with no extra markup.",
  order: 8,
  steps: [
    {
      id: "pseudo-explain",
      type: "explanation",
      instruction: {
        heading: "Pseudo-elements are extra ghost children",
        body: "<p>The selectors <code>::before</code> and <code>::after</code> let you generate two extra child elements via CSS — one before the real content of the element and one after. They are perfect for decorative work: tooltip arrows, list bullet styling, quote marks around blockquotes, badges, dividers.</p><p>To make them appear, you must give them <code>content: ''</code> (an empty string is enough). Without <code>content</code>, the browser does not generate the pseudo-element at all.</p>",
        analogy:
          "Think of <code>::before</code> and <code>::after</code> as the small decorative trim a tailor adds to a jacket — the lapel pin, the buttonhole stitching. They are not part of the jacket's structure, but they make it feel finished.",
        docLinks: [
          {
            label: "MDN: ::before",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/::before",
            type: "css-selector",
          },
          {
            label: "MDN: ::after",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/::after",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Keep meaningful text in HTML, not in <code>content</code>. Screen readers do not read pseudo-element <code>content</code> reliably across browsers, so use it only for decoration.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; padding: 24px; }\n  blockquote {\n    position: relative;\n    background: #f1f5f9;\n    padding: 16px 16px 16px 36px;\n    border-radius: 8px;\n    margin: 0;\n  }\n  blockquote::before {\n    content: \'❝\';\n    position: absolute;\n    top: 8px;\n    left: 8px;\n    color: #6366f1;\n    font-size: 28px;\n    line-height: 1;\n  }\n</style>\n<blockquote>The best preview is the one you can read.</blockquote>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tooltip-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a CSS-only tooltip",
        body: "<p>Build a tooltip that appears when the user hovers a button. Use <code>::after</code> to draw the tooltip box. Use <code>position: relative</code> on the button and <code>position: absolute</code> on the pseudo-element. Show the tooltip on <code>:hover</code>.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "<code>content</code> on a pseudo-element can include real text. Try <code>content: 'Click to confirm'</code> on <code>::after</code> and the tooltip writes itself.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  body { font-family: system-ui, sans-serif; padding: 60px 24px; }\n  .with-tip {\n    position: relative;\n    padding: 8px 16px;\n    background: #6366f1;\n    color: white;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n  }\n  /* Build a tooltip with ::after that:\n     - has content: \'Click to confirm\'\n     - is position: absolute, bottom: 110%, left: 50%, transform: translateX(-50%)\n     - has dark background, white text, padding, rounded corners\n     - is hidden by default (opacity: 0) and shown on :hover\n  */\n</style>\n<button class="with-tip">Order</button>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "::after" },
      },
      hints: [
        ".with-tip::after { content: 'Click to confirm'; position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%); background: #1e293b; color: white; padding: 4px 8px; border-radius: 6px; opacity: 0; transition: opacity 0.15s; pointer-events: none; white-space: nowrap; }",
        ".with-tip:hover::after { opacity: 1; }",
      ],
    },
  ],
};
