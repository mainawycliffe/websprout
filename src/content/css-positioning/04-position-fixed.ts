import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-fixed",
  slug: "position-fixed",
  title: "position: fixed — Pinned to the Viewport",
  description:
    "Fixed elements ignore scrolling. They are how floating chat bubbles, toolbars, and 'back to top' buttons stay in place no matter where you are on the page.",
  order: 4,
  steps: [
    {
      id: "fixed-explain",
      type: "explanation",
      instruction: {
        heading: "Fixed = pinned to the screen",
        body: "<p><code>position: fixed</code> is like absolute, but the positioning context is always the <em>viewport</em> — the visible part of the browser window. <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code> are measured from the edges of the screen, not the page.</p><p>The element does not move when the user scrolls. It is fixed in place from their perspective.</p>",
        analogy:
          "Imagine a sticker glued to the inside of your car windscreen. The road moves underneath, but the sticker stays right where it is in your view.",
        docLinks: [
          {
            label: "MDN: position: fixed",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Fixed elements should not block important content. A fixed footer banner that hides text underneath it fails accessibility heuristics. Either give the page enough <code>padding-bottom</code> to account for the fixed element, or let users dismiss it.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fixed-when-to-use",
      type: "explanation",
      instruction: {
        heading: "Where you have seen fixed",
        body: "<ul><li><strong>Chat bubble</strong> — Intercom-style support widgets in the bottom-right corner of every SaaS site.</li><li><strong>Cookie banner</strong> — pinned to the top or bottom of the viewport until dismissed.</li><li><strong>Floating action button</strong> — common in mobile apps for the primary action (compose, add).</li><li><strong>Back-to-top arrow</strong> — appears after scrolling.</li><li><strong>Sidebar nav on desktop</strong> — stays visible while the article scrolls beside it.</li></ul>",
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; padding: 16px; min-height: 600px; }\n  .article p { margin: 16px 0; }\n  .chat {\n    position: fixed;\n    bottom: 16px;\n    right: 16px;\n    width: 56px;\n    height: 56px;\n    border-radius: 50%;\n    background: #6366f1;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);\n    cursor: pointer;\n    font-size: 24px;\n  }\n</style>\n<article class="article">\n  <h1>Scroll the preview</h1>\n  <p>The chat bubble in the corner stays put while this text scrolls.</p>\n  <p>Scroll down. The bubble does not move with the article.</p>\n  <p>That is the whole point of position: fixed.</p>\n</article>\n<button class="chat">💬</button>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fixed-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a 'Back to top' button",
        body: "<p>Add a <code>.back-to-top</code> button that is fixed in the <em>bottom-right</em> corner of the viewport, 24 pixels from each edge. Round it (<code>border-radius: 999px</code>), give it a dark background and white arrow.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  body { font-family: system-ui, sans-serif; padding: 16px; min-height: 700px; }\n  .back-to-top {\n    /* position it fixed at bottom-right with 24px from each edge */\n    width: 48px;\n    height: 48px;\n    border: none;\n    background: #1e293b;\n    color: white;\n    font-size: 22px;\n    cursor: pointer;\n    /* round it */\n  }\n</style>\n<article>\n  <h1>Read & scroll</h1>\n  <p>Lorem ipsum dolor sit amet. Scroll the preview to confirm the button stays put.</p>\n</article>\n<button class="back-to-top">↑</button>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "position: fixed" },
      },
      hints: [
        "Use position: fixed; bottom: 24px; right: 24px;",
        "Add border-radius: 999px to round it.",
      ],
    },
  ],
};
