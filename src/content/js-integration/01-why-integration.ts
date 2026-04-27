import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-why",
  slug: "why-integration",
  title: "Why JS + HTML + CSS Together",
  description:
    "Real interactive features are never JS alone — they are JS that mutates HTML and toggles CSS classes. See why the three languages dance together on every page you actually use.",
  order: 1,
  steps: [
    {
      id: "why-intro",
      type: "explanation",
      instruction: {
        heading: "Three languages, one feature",
        body: "<p>By now you have learned each of the three core web languages on its own:</p><ul><li><strong>HTML</strong> — structure: what is on the page.</li><li><strong>CSS</strong> — appearance: how it looks.</li><li><strong>JavaScript</strong> — behaviour: what happens when the user does something.</li></ul><p>Real features need all three working together. A theme toggle is a button (HTML), styled (CSS), that swaps a class on click (JS). A modal is a div (HTML), positioned and styled (CSS), that opens and closes when JS sets a class. A form validator is inputs (HTML), styled error states (CSS), that JS toggles based on input.</p><p>This module is practice. Each lesson is a small, recognisable interactive feature you build end-to-end.</p>",
        analogy:
          "It is like making chai. You need water (HTML), milk and tea leaves (CSS — flavour and colour), and heat (JS — the action). Any one of them alone is missing the experience; together they are the drink.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The interactive preview in this module actually <em>runs</em> your JavaScript. You can click your buttons, toggle your toggles, type in your inputs. That is different from the read-only preview in the HTML/CSS modules.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "why-pattern",
      type: "explanation",
      instruction: {
        heading: "The pattern you will use again and again",
        body: "<p>Almost every feature you will build follows the same shape:</p><ol><li><strong>HTML</strong>: write the structure once. Buttons, inputs, containers.</li><li><strong>CSS</strong>: write styles for both the resting state and a 'special' state — usually a class like <code>.open</code>, <code>.active</code>, <code>.error</code>, <code>.dark</code>.</li><li><strong>JavaScript</strong>: listen for an event. When it fires, toggle the special class on the right element.</li></ol><p>The CSS does the visual work; the JS just flips a switch. This pattern is more readable, more accessible, and easier to debug than recreating elements in JS — and it is exactly how React, Vue, and the rest of modern frameworks model components under the hood.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Toggling classes (rather than mutating inline styles in JS) lets the browser optimise rendering and respects <code>prefers-reduced-motion</code> and other CSS-driven accessibility rules.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "why-roadmap",
      type: "explanation",
      instruction: {
        heading: "What you will build",
        body: "<p>Across the next nine lessons you will build:</p><ul><li>A theme toggle (light/dark)</li><li>An accordion</li><li>A tab switcher</li><li>A modal dialog</li><li>A live form validator</li><li>An image carousel</li><li>A Sukuma price calculator (kg vs bunch)</li><li>A styled todo list</li></ul><p>The capstone combines several of them into a small market-style dashboard. The codelab bridges everything to a real local project.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
