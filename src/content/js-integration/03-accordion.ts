import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-accordion",
  slug: "accordion",
  title: "Build an Accordion",
  description:
    "An accordion is the FAQ pattern: click a heading to expand the answer below it. You will use class toggles, aria-expanded, and a click handler.",
  order: 3,
  steps: [
    {
      id: "accordion-explain",
      type: "explanation",
      instruction: {
        heading: "An accordion is just a collapsible card",
        body: "<p>Each item in an accordion has a heading (always visible) and a body (hidden until clicked). The state lives in a class — usually <code>open</code> — that JS toggles when the heading is clicked. CSS does the visual work.</p><p>For accessibility, the heading should be a <code>&lt;button&gt;</code> with an <code>aria-expanded</code> attribute that JS keeps in sync. Screen reader users hear 'expanded' or 'collapsed' depending on state.</p>",
        analogy:
          "Imagine those question-and-answer cards in a quiz pack. The question is always on the front; the answer shows only when you flip it. The class toggle is the flip.",
        docLinks: [
          {
            label: "MDN: aria-expanded",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Use <code>&lt;button&gt;</code> for the heading, not a <code>&lt;div&gt;</code>. Buttons are keyboard-focusable and screen-reader-friendly without extra work.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "accordion-predict",
      type: "gap-fill",
      instruction: {
        heading: "Predict the output",
        body: "<p>The button starts with <code>aria-expanded=\"false\"</code>. After this click handler runs once, what will <code>aria-expanded</code> equal? (Type the string the browser will store as the attribute value.)</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const btn = document.querySelector(".accordion-header");\nbtn.addEventListener("click", () => {\n  const isOpen = btn.classList.toggle("open");\n  btn.setAttribute("aria-expanded", String(isOpen));\n});\n\n// After one click, btn.getAttribute("aria-expanded") returns: {{value}}',
        gaps: [
          {
            id: "value",
            placeholder: "value",
            acceptedAnswers: ["true"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["value"] } },
      hints: [
        "classList.toggle returns true when it adds the class, false when it removes it.",
        "Started without 'open', so the first click adds it — toggle returns true.",
        "String(true) is 'true'.",
      ],
    },
    {
      id: "accordion-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a working FAQ",
        body: "<p>Click each question in the preview to expand its answer. Write the JS at the bottom: select all <code>.question</code> buttons, add a click listener that toggles <code>open</code> on the <em>parent</em> <code>.faq-item</code>.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; }\n  .faq-item { border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 8px; overflow: hidden; }\n  .question { width: 100%; text-align: left; background: #f8fafc; border: none; padding: 12px 16px; cursor: pointer; font-weight: 600; }\n  .answer { display: none; padding: 0 16px 12px; color: #334155; }\n  .faq-item.open .answer { display: block; }\n  .question::after { content: " ▾"; }\n  .faq-item.open .question::after { content: " ▴"; }\n</style>\n</head>\n<body>\n  <h1>Sukuma FAQs</h1>\n  <div class="faq-item">\n    <button class="question">Is sukuma in season?</button>\n    <div class="answer">Sukuma wiki grows year-round in most parts of Kenya.</div>\n  </div>\n  <div class="faq-item">\n    <button class="question">Per kg or per bunch?</button>\n    <div class="answer">Markets sell both. Per kg gives precise quantity; per bunch is faster checkout.</div>\n  </div>\n  <div class="faq-item">\n    <button class="question">Do you deliver?</button>\n    <div class="answer">Yes — within town, same-day. Outside town, next-day.</div>\n  </div>\n\n  <script>\n    // TODO: select all .question buttons, add a click listener that toggles \'open\' on each one\'s closest .faq-item parent.\n  </script>\n</body>\n</html>',
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["addEventListener", "classList.toggle"] },
      },
      hints: [
        "const buttons = document.querySelectorAll('.question');",
        "buttons.forEach(btn => btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open')));",
      ],
    },
  ],
};
