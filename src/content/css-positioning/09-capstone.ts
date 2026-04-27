import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-capstone",
  slug: "capstone",
  title: "Capstone: A Modal Overlay",
  description:
    "Combine fixed, absolute, and z-index to build a modal that hovers above the page with a dark backdrop and a centred dialog box.",
  order: 9,
  steps: [
    {
      id: "capstone-brief",
      type: "explanation",
      instruction: {
        heading: "The brief",
        body: "<p>You are building the visual structure of a modal — the kind that opens when you click 'Delete account' or 'Confirm order'.</p><p>Requirements:</p><ol><li>A full-viewport translucent black backdrop (<code>position: fixed</code>, edges at 0).</li><li>A white dialog centred on the screen — use <code>position: fixed</code> and a <code>transform</code> trick, or set <code>top/left</code> with negative offsets.</li><li>A close button positioned in the top-right corner of the dialog (<code>position: absolute</code>).</li><li>The dialog must paint on top of the backdrop, the backdrop must paint on top of everything else.</li></ol>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-build",
      type: "free-edit",
      instruction: {
        heading: "Build the modal",
        body: "<p>Open the editor and finish the four rules. Test by checking the backdrop covers everything and the dialog stays centred.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The classic centring trick: <code>top: 50%; left: 50%; transform: translate(-50%, -50%);</code>. The transform shifts the dialog by half its own size, regardless of its dimensions.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  body { font-family: system-ui, sans-serif; padding: 24px; }\n  /* The page behind the modal — leave it alone */\n  .page-content h1 { margin: 0 0 12px; }\n\n  /* 1. Full-screen translucent backdrop. position: fixed, top/right/bottom/left: 0,\n        background: rgba(0,0,0,0.5), z-index: 100. */\n  .backdrop {\n    background: rgba(0, 0, 0, 0.5);\n  }\n\n  /* 2. Centred dialog. position: fixed, top: 50%, left: 50%,\n        transform: translate(-50%, -50%), z-index: 110.\n        Plus: white background, padding 24px, border-radius 12px, max-width 400px. */\n  .dialog {\n    background: white;\n    padding: 24px;\n    border-radius: 12px;\n    max-width: 400px;\n  }\n\n  /* 3. Close button in dialog corner. position: absolute, top: 8px, right: 8px. */\n  .dialog .close {\n    background: none;\n    border: none;\n    font-size: 18px;\n    cursor: pointer;\n  }\n</style>\n<div class="page-content">\n  <h1>Page behind the modal</h1>\n  <p>This is the rest of the page. The backdrop should hide it visually.</p>\n</div>\n<div class="backdrop"></div>\n<div class="dialog">\n  <button class="close" aria-label="Close">×</button>\n  <h2>Confirm order</h2>\n  <p>Are you sure you want to place this order?</p>\n  <button>Yes, place order</button>\n</div>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "position: fixed" },
      },
      hints: [
        ".backdrop { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 100; ... }",
        ".dialog { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 110; ... }",
        ".dialog .close { position: absolute; top: 8px; right: 8px; }",
        "Make sure the .dialog rule has position: relative or its existing position: fixed is fine — fixed already creates a positioning context for the absolute close button.",
      ],
    },
    {
      id: "capstone-recap",
      type: "explanation",
      instruction: {
        heading: "What you just stacked",
        body: "<p>Four positioning ideas in one component:</p><ol><li><strong>Fixed</strong> for the backdrop and dialog so they ignore page scroll.</li><li><strong>Absolute</strong> for the close button so it pins to the dialog corner.</li><li><strong>z-index</strong> to layer the dialog above the backdrop.</li><li><strong>transform: translate(-50%, -50%)</strong> for centring without knowing dimensions in advance.</li></ol><p>Real modal libraries do the same thing under the hood. The only major addition is <em>portaling</em> — moving the modal to the document root in the DOM so no parent stacking context can trap it (review the previous lesson if that sounds unfamiliar).</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Real modals also need keyboard accessibility (Escape to close, focus trap inside, return focus on close). HTML's native <code>&lt;dialog&gt;</code> element ships those behaviours for free — once you have the visual layout down, prefer <code>&lt;dialog&gt;</code> over a hand-built div modal.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
