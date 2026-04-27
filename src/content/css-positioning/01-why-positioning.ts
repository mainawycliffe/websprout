import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-why",
  slug: "why-positioning",
  title: "Why Positioning Matters",
  description:
    "Modals. Sticky headers. Tooltips. Dropdowns. Floating chat bubbles. None of these are possible with normal flow alone — positioning is the CSS escape hatch that builds them.",
  order: 1,
  steps: [
    {
      id: "why-positioning-intro",
      type: "explanation",
      instruction: {
        heading: "Normal flow is a polite queue",
        body: "<p>Most of the time, the browser arranges elements in <em>normal flow</em>: each block sits below the one before it, each inline word next to the previous word. It is calm, predictable, and exactly right for the body of an article.</p><p>But what about a navbar that sticks to the top when you scroll? A modal that hovers over the page? A tooltip that appears next to a hovered icon? A 'New' badge in the corner of a card? None of those follow the queue. They live <em>on top of</em> or <em>outside</em> normal flow.</p><p>The <code>position</code> property is the escape hatch that lets you take an element out of the queue and place it anywhere you want.</p>",
        analogy:
          "Think of a wedding seating chart. Most guests sit at assigned tables (normal flow). The photographer roams freely between tables (absolute). The celebrant stands fixed in the front no matter what (fixed). The MC has a designated seat but stands when speaking (sticky). All four roles are necessary.",
        docLinks: [
          {
            label: "MDN: position",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Reach for positioning when normal flow cannot do the job. If a layout works with flexbox or grid, prefer those — positioning is for elements that genuinely need to escape the flow.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; }\n  .card { position: relative; padding: 24px; border-radius: 12px; background: #f1f5f9; max-width: 320px; }\n  .badge {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n    background: #ef4444;\n    color: white;\n    padding: 2px 8px;\n    border-radius: 999px;\n    font-size: 12px;\n    font-weight: 700;\n  }\n</style>\n<div class="card">\n  <span class="badge">NEW</span>\n  <h3>Sukuma Wiki — Per kg</h3>\n  <p>Fresh from the farm.</p>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "why-real-world",
      type: "explanation",
      instruction: {
        heading: "You have already seen all five",
        body: "<p>The five values of <code>position</code> are not abstract — every interactive site uses each of them, often on the same page.</p><ul><li><code>static</code> — the default. Elements sit in normal flow.</li><li><code>relative</code> — still in flow, but you can nudge it with <code>top/right/bottom/left</code>. Also creates a positioning anchor for absolute children.</li><li><code>absolute</code> — out of flow. Positioned relative to the nearest positioned ancestor (or the page if there is none).</li><li><code>fixed</code> — out of flow. Positioned relative to the viewport — stays put when you scroll.</li><li><code>sticky</code> — in flow until you scroll past it; then it sticks to a viewport edge.</li></ul><p>Examples: Twitter's compose button is <code>fixed</code>. Section headings on Wikipedia are <code>sticky</code>. Tooltips and dropdowns are <code>absolute</code>. Card badges and floating action buttons are <code>absolute</code>.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "why-roadmap",
      type: "explanation",
      instruction: {
        heading: "What is coming up",
        body: "<p>In this module you will:</p><ol><li>Use <code>position: relative</code> to nudge an element from its normal spot.</li><li>Take elements out of flow with <code>absolute</code> and place them inside a positioned parent.</li><li>Pin a chat bubble with <code>fixed</code>.</li><li>Build a sticky section header with <code>sticky</code>.</li><li>Stack overlapping elements with <code>z-index</code> — and learn why it sometimes 'does not work'.</li><li>Build a tooltip using <code>::before</code> + absolute positioning.</li></ol><p>The capstone is a modal overlay. The codelab is a CSS-only modal toggled by a checkbox.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
