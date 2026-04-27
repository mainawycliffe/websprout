import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-modal-dialog",
  slug: "modal-dialog",
  title: "Build a Modal Dialog",
  description:
    "Combine the modal layout you built in CSS Positioning with JavaScript that opens it and — crucially — closes it. Two listeners, one bug to fix.",
  order: 5,
  steps: [
    {
      id: "modal-explain",
      type: "explanation",
      instruction: {
        heading: "Two events: open and close",
        body: "<p>The structure is now familiar: a backdrop, a dialog, a close button. The behaviour is two listeners:</p><ul><li>The 'open' button click → add a class (or remove a hidden attribute) that makes the modal visible.</li><li>The 'close' button click <em>and</em> the backdrop click → hide it again.</li></ul><p>For accessibility, real modals also trap focus inside the dialog, return focus to the opener on close, and handle Escape. HTML's native <code>&lt;dialog&gt;</code> element provides those behaviours for free, but writing a basic version yourself first is excellent practice.</p>",
        docLinks: [
          {
            label: "MDN: <dialog> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Production modals should use the native <code>&lt;dialog&gt;</code> element (<code>.showModal()</code> / <code>.close()</code>). It ships focus-trap, Escape handling, and modality semantics for free. Hand-rolled div modals miss most of that without extra work.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "modal-fix-broken",
      type: "gap-fill",
      instruction: {
        heading: "Fix the broken close handler",
        body: "<p>The close button calls a handler, but the handler tries to remove the <code>open</code> class from a variable that was never declared. Fill in the variable name that points to the modal element.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const modal = document.querySelector(".modal");\nconst openBtn = document.querySelector("#open");\nconst closeBtn = document.querySelector("#close");\n\nopenBtn.addEventListener("click", () => modal.classList.add("open"));\ncloseBtn.addEventListener("click", () => {{var}}.classList.remove("open"));',
        gaps: [
          {
            id: "var",
            placeholder: "variable",
            acceptedAnswers: ["modal"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["var"] } },
      hints: [
        "The variable that holds the modal element was declared on line 1.",
        "It is one word, lowercase: modal.",
      ],
    },
    {
      id: "modal-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: open and close working modal",
        body: "<p>Wire two listeners: <code>#open</code> opens the modal (adds <code>.open</code> to <code>.modal</code>), and BOTH the <code>#close</code> button AND the <code>.backdrop</code> click close it.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { font-family: system-ui, sans-serif; padding: 24px; }\n  .open-btn { padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }\n  .modal { display: none; }\n  .modal.open { display: block; }\n  .backdrop { position: fixed; inset: 0; background: rgba(15,23,42,0.55); z-index: 100; }\n  .dialog { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 110; background: white; padding: 24px; border-radius: 12px; max-width: 360px; width: calc(100% - 32px); box-shadow: 0 20px 50px rgba(0,0,0,0.25); }\n  .close-btn { position: absolute; top: 8px; right: 12px; background: none; border: none; font-size: 22px; cursor: pointer; }\n</style>\n</head>\n<body>\n  <h1>Confirm your order</h1>\n  <button class="open-btn" id="open">Place order</button>\n\n  <div class="modal">\n    <div class="backdrop"></div>\n    <div class="dialog">\n      <button class="close-btn" id="close" aria-label="Close">×</button>\n      <h2>Confirm</h2>\n      <p>Place 1 bunch of sukuma + 1 kg of tomatoes?</p>\n    </div>\n  </div>\n\n  <script>\n    // TODO:\n    // 1. const modal = document.querySelector(".modal");\n    // 2. open: clicking #open adds .open to modal\n    // 3. close: clicking #close OR .backdrop removes .open from modal\n  </script>\n</body>\n</html>',
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["addEventListener", "classList"] },
      },
      hints: [
        "const modal = document.querySelector('.modal');",
        "document.querySelector('#open').addEventListener('click', () => modal.classList.add('open'));",
        "document.querySelector('#close').addEventListener('click', () => modal.classList.remove('open'));",
        "document.querySelector('.backdrop').addEventListener('click', () => modal.classList.remove('open'));",
      ],
    },
  ],
};
