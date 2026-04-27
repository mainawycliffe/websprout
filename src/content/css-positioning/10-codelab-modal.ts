import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-codelab-modal",
  slug: "codelab-modal",
  title: "Codelab: A CSS-only Modal",
  description:
    "Ship a working modal in your local editor — no JavaScript needed. Use the checkbox-hack to toggle visibility entirely with CSS.",
  order: 10,
  steps: [
    {
      id: "modal-lab-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your modal lab",
        body: "<p>You will build a modal you can open and close without writing a single line of JavaScript. The trick: a hidden checkbox keeps the open/closed state, and CSS sibling selectors react to it.</p><p>Open a terminal on Linux with <strong>Ctrl + Alt + T</strong>:</p><ul><li><code>mkdir ~/css-modal-lab</code></li><li><code>cd ~/css-modal-lab</code></li><li><code>touch index.html style.css</code></li><li><code>code .</code></li></ul>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "modal-lab-html",
      type: "explanation",
      instruction: {
        heading: "Write the HTML",
        body: "<p>Save this into <code>index.html</code> and open it in your browser with <code>xdg-open index.html</code> (Linux) or by double-clicking.</p><p>The hidden checkbox <code>#modal-toggle</code> is the state. Two <code>&lt;label&gt;</code>s point to it: one to open, one to close. Clicking either flips the checkbox.</p>",
        docLinks: [
          {
            label: "MDN: <label for>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>CSS Modal</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <main class="page">\n    <h1>Mboga Direct</h1>\n    <p>Click the button to confirm your order.</p>\n    <label class="open-btn" for="modal-toggle">Place order</label>\n  </main>\n\n  <input type="checkbox" id="modal-toggle" hidden>\n\n  <div class="modal">\n    <label class="backdrop" for="modal-toggle"></label>\n    <div class="dialog">\n      <label class="close" for="modal-toggle" aria-label="Close">×</label>\n      <h2>Confirm order</h2>\n      <p>Place 1 bunch of sukuma + 1 kg of tomatoes for delivery?</p>\n      <button>Yes, place order</button>\n    </div>\n  </div>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "modal-lab-base-styles",
      type: "explanation",
      instruction: {
        heading: "Add the base styles",
        body: "<p>Open <code>style.css</code> and paste these in. The page is calm; the open button is a friendly purple. The modal styles come next.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          'body {\n  margin: 0;\n  font-family: system-ui, -apple-system, sans-serif;\n  background: #f8fafc;\n  color: #0f172a;\n}\n\n.page { max-width: 640px; margin: 0 auto; padding: 32px 16px; }\n\n.open-btn {\n  display: inline-block;\n  padding: 10px 20px;\n  background: #6366f1;\n  color: white;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n}\n\n.dialog button {\n  margin-top: 12px;\n  padding: 10px 20px;\n  background: #10b981;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "modal-lab-modal-styles",
      type: "explanation",
      instruction: {
        heading: "Now style the modal — and hide it by default",
        body: "<p>Append this to <code>style.css</code>. The whole modal block is hidden until the toggle is checked. The backdrop covers the viewport (<code>position: fixed</code>) and the dialog is centred (<code>position: fixed</code> + <code>translate</code>).</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          '.modal {\n  display: none;\n}\n\n.modal .backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.55);\n  z-index: 100;\n  cursor: pointer;\n}\n\n.modal .dialog {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 110;\n  background: white;\n  padding: 24px 24px 20px;\n  border-radius: 12px;\n  max-width: 360px;\n  width: calc(100% - 32px);\n  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);\n}\n\n.modal .dialog .close {\n  position: absolute;\n  top: 6px;\n  right: 10px;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  line-height: 1;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "modal-lab-toggle",
      type: "explanation",
      instruction: {
        heading: "The trick: show the modal when the checkbox is checked",
        body: "<p>This is the magic line. The general sibling combinator <code>~</code> matches any later sibling. When <code>#modal-toggle</code> is <code>:checked</code>, the modal that follows it in HTML appears.</p><p>Save and refresh. Click <strong>Place order</strong> — the modal opens. Click the backdrop or the × — it closes.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "<code>inset: 0</code> is shorthand for <code>top: 0; right: 0; bottom: 0; left: 0</code> — perfect for full-coverage fixed elements.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '#modal-toggle:checked ~ .modal {\n  display: block;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "modal-lab-checkpoint",
      type: "explanation",
      instruction: {
        heading: "Free-edit checkpoint: make it your own",
        body: "<p>Try at least two of these:</p><ul><li>Add a fade-in transition: animate <code>opacity</code> on the dialog from 0 to 1 when the toggle is checked.</li><li>Slide the dialog in from the top using <code>transform</code>.</li><li>Add a second modal — duplicate the structure with a different checkbox id.</li><li>Replace the open button with a card that has a 'New' badge in the corner (use what you learned with <code>position: absolute</code>).</li></ul><p>If you want focus-trapping and Escape-to-close, swap the whole pattern for HTML's native <code>&lt;dialog&gt;</code> element later — it ships those behaviours for free. The visual layout you have now is the same.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
