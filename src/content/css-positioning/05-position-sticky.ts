import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-sticky",
  slug: "position-sticky",
  title: "position: sticky — In Flow Until It Sticks",
  description:
    "Sticky is the hybrid: an element flows normally until it would scroll out of view, then it pins to a viewport edge. Section headers, table headers, and sticky filters all use this.",
  order: 5,
  steps: [
    {
      id: "sticky-explain",
      type: "explanation",
      instruction: {
        heading: "Sticky has two modes — automatically",
        body: "<p><code>position: sticky</code> behaves like <code>relative</code> until the user scrolls the element to a threshold (set with <code>top</code>, <code>bottom</code>, etc.) — at that point it switches to behaving like <code>fixed</code>, pinning to the viewport. When the user scrolls back, it un-pins and rejoins normal flow.</p><p>You always pair sticky with at least one offset. <code>position: sticky; top: 0;</code> means: 'flow normally until you would scroll past the top of the viewport, then stick to the top'.</p>",
        analogy:
          "It is the photo on a school yearbook page that sits in flow until the binding catches it on the cover — then it stays pinned to the spine while you flip past, and falls back into place when you turn back.",
        docLinks: [
          {
            label: "MDN: position: sticky",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Sticky is scoped to its parent. The element will stop sticking when its parent scrolls out of view. That is by design — perfect for section headers that stick within their own section.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; }\n  .section { padding: 12px; background: #f1f5f9; margin-bottom: 16px; border-radius: 8px; }\n  .section-header {\n    position: sticky;\n    top: 0;\n    background: #6366f1;\n    color: white;\n    padding: 8px 12px;\n    margin: -12px -12px 12px;\n    border-radius: 8px 8px 0 0;\n    font-weight: 700;\n  }\n  .section p { margin: 8px 0; }\n</style>\n<section class="section">\n  <header class="section-header">Vegetables</header>\n  <p>Sukuma, Spinach, Cabbage…</p>\n  <p>Tomatoes, Onions, Garlic…</p>\n  <p>Carrots, Beetroot, Radish…</p>\n  <p>Scroll within this preview to see the header stick.</p>\n</section>\n<section class="section">\n  <header class="section-header">Fruits</header>\n  <p>Mangoes, Pineapples, Bananas…</p>\n  <p>Apples, Oranges, Limes…</p>\n</section>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "sticky-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a sticky aisle header",
        body: "<p>Make the <code>.aisle-header</code> stick to the top of its scrolling parent so the user always knows which aisle they are looking at, even after scrolling through items.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; }\n  .scroll-area { height: 200px; overflow-y: auto; border: 1px solid #cbd5e1; border-radius: 8px; }\n  .aisle-header {\n    /* Stick to the top of .scroll-area when scrolled past */\n    background: #ef4444;\n    color: white;\n    padding: 6px 10px;\n    font-weight: 700;\n  }\n  .item { padding: 6px 10px; border-top: 1px solid #e2e8f0; }\n</style>\n<div class="scroll-area">\n  <div class="aisle-header">Aisle 3 — Greens</div>\n  <div class="item">Sukuma — Bunch</div>\n  <div class="item">Sukuma — Per kg</div>\n  <div class="item">Spinach — Bunch</div>\n  <div class="item">Cabbage — Per piece</div>\n  <div class="item">Lettuce — Per piece</div>\n  <div class="item">Cabbage — Per piece</div>\n  <div class="item">Lettuce — Per piece</div>\n</div>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "position: sticky" },
      },
      hints: [
        "On .aisle-header set: position: sticky; top: 0;",
        "Scroll inside the preview to see it stick.",
      ],
    },
  ],
};
