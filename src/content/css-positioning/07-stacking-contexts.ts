import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-stacking-contexts",
  slug: "stacking-contexts",
  title: "When z-index 'Doesn't Work'",
  description:
    "Sometimes you set z-index: 9999 and the element STILL hides behind another. The cause is almost always a stacking context. Learn what they are and how to spot the trap.",
  order: 7,
  steps: [
    {
      id: "context-explain",
      type: "explanation",
      instruction: {
        heading: "z-index is scoped, not global",
        body: "<p>Most beginners assume z-index is one giant ranking across the whole page. It is not. The browser groups elements into <em>stacking contexts</em>, and z-index only fights for position inside its own context.</p><p>A stacking context is created automatically by certain CSS properties. The most common ones:</p><ul><li><code>position: relative/absolute/fixed/sticky</code> combined with any <code>z-index</code> value (even <code>0</code>).</li><li><code>opacity</code> less than 1.</li><li><code>transform</code>, <code>filter</code>, <code>perspective</code> with non-default values.</li><li><code>will-change</code> on certain properties.</li></ul><p>Once an ancestor creates a stacking context, all of its descendants are trapped inside. A child with <code>z-index: 9999</code> still cannot escape its parent's stacking context.</p>",
        analogy:
          "Think of a school sports day. Students compete for ranking <em>within</em> their year group — Year 7's first place does not outrank Year 12's second place. Stacking contexts are year groups for z-index.",
        docLinks: [
          {
            label: "MDN: stacking context",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context",
            type: "css-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "context-fix-broken",
      type: "gap-fill",
      instruction: {
        heading: "Fix the broken code",
        body: "<p>The dropdown menu inside <code>.card</code> needs to appear above the modal overlay (which has <code>z-index: 100</code>). The dropdown is set to <code>z-index: 1000</code> — but the card has <code>opacity: 0.95</code>, which silently creates a stacking context that traps the dropdown.</p><p>Remove the trap by changing the offending property to its default value. Fill in the value.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '.card {\n  position: relative;\n  /* opacity creates a stacking context — remove it */\n  opacity: {{value}};\n}\n\n.dropdown {\n  position: absolute;\n  z-index: 1000;\n}\n\n.modal-overlay {\n  position: fixed;\n  z-index: 100;\n}',
        gaps: [
          {
            id: "value",
            placeholder: "value",
            acceptedAnswers: ["1"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["value"] } },
      hints: [
        "Opacity creates a stacking context for any value less than 1.",
        "The default (no stacking context created) is 1.",
      ],
    },
    {
      id: "context-rule-of-thumb",
      type: "explanation",
      instruction: {
        heading: "Diagnostic checklist",
        body: "<p>Whenever a z-index 'does not work', walk this checklist:</p><ol><li>Is the element <code>position</code> non-static? z-index does nothing on static elements.</li><li>Is its parent (or any ancestor) creating a stacking context? Look for <code>opacity &lt; 1</code>, <code>transform</code>, <code>filter</code>, or a positioned parent with its own z-index.</li><li>If the element needs to escape the parent's stacking context, restructure the markup — put the element outside that ancestor in the DOM.</li></ol><p>For overlays and modals specifically, the cleanest fix is to render them as direct children of <code>&lt;body&gt;</code> (often via React portals or a similar technique) so they live in the page-level stacking context.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Modern modal libraries always portal the modal to the document root. That is not a 'React thing' — it is a CSS-stacking-context thing. The portal exists to escape the parent's stacking context.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
