import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-codelab-tabs-app",
  slug: "codelab-tabs-app",
  title: "Codelab: A Three-File Tabs App",
  description:
    "Step out of the platform and build a real multi-file project: index.html, styles.css, and app.js. Ship a working tabbed settings page with proper file separation.",
  order: 11,
  steps: [
    {
      id: "tabs-lab-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project folder",
        body: "<p>You will build a three-file project — HTML, CSS, and JavaScript living in separate files. This mirrors how real codebases are organised, and it forces you to wire them together with <code>&lt;link&gt;</code> and <code>&lt;script src&gt;</code>.</p><p>Open a terminal on Linux with <strong>Ctrl + Alt + T</strong>:</p><ul><li><code>mkdir ~/tabs-app-lab</code></li><li><code>cd ~/tabs-app-lab</code></li><li><code>touch index.html styles.css app.js</code></li><li><code>code .</code></li></ul>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tabs-lab-html",
      type: "explanation",
      instruction: {
        heading: "Write the HTML",
        body: "<p>Save this into <code>index.html</code>. Notice the two <em>links</em> at the top and bottom: <code>&lt;link rel=\"stylesheet\"&gt;</code> in the head, <code>&lt;script src=\"app.js\"&gt;</code> at the end of body. Putting the script at the end means the DOM has loaded by the time the script runs.</p><p>Open the file with <code>xdg-open index.html</code> or by double-clicking. It will look bare — that is expected.</p>",
        docLinks: [
          {
            label: "MDN: <script src>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Settings · Mboga Direct</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <main class="page">\n    <h1>Settings</h1>\n    <div class="tabs" role="tablist">\n      <button class="tab active" data-tab="account">Account</button>\n      <button class="tab" data-tab="delivery">Delivery</button>\n      <button class="tab" data-tab="notifications">Notifications</button>\n    </div>\n\n    <section class="panel active" id="account">\n      <h2>Account</h2>\n      <p>Manage your name, phone number, and password.</p>\n    </section>\n    <section class="panel" id="delivery">\n      <h2>Delivery</h2>\n      <p>Pick your default delivery window and address.</p>\n    </section>\n    <section class="panel" id="notifications">\n      <h2>Notifications</h2>\n      <p>Choose how we tell you about new vegetables and offers.</p>\n    </section>\n  </main>\n\n  <script src="app.js" defer></script>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tabs-lab-css",
      type: "explanation",
      instruction: {
        heading: "Add the styles",
        body: "<p>Save this into <code>styles.css</code>. The active tab gets a coloured underline; only the active panel is visible.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          'body {\n  margin: 0;\n  font-family: system-ui, -apple-system, sans-serif;\n  background: #f8fafc;\n  color: #0f172a;\n}\n\n.page { max-width: 640px; margin: 0 auto; padding: 32px 16px; }\n\n.tabs {\n  display: flex;\n  gap: 4px;\n  border-bottom: 1px solid #cbd5e1;\n  margin-bottom: 16px;\n}\n\n.tab {\n  padding: 8px 16px;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  font-weight: 600;\n  color: #64748b;\n  border-bottom: 2px solid transparent;\n  transition: color 0.15s, border-color 0.15s;\n}\n\n.tab.active {\n  color: #0f172a;\n  border-bottom-color: #6366f1;\n}\n\n.panel {\n  display: none;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);\n}\n\n.panel.active { display: block; }',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tabs-lab-js",
      type: "explanation",
      instruction: {
        heading: "Wire up the JavaScript",
        body: "<p>Save this into <code>app.js</code>. One delegated click listener on <code>.tabs</code> handles all three buttons. When clicked, it removes <code>.active</code> from all tabs and panels, then adds <code>.active</code> to the clicked tab and the panel whose id matches.</p><p>Refresh the browser. Click each tab — the panel below should swap.</p>",
        docLinks: [
          {
            label: "MDN: querySelectorAll",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const tabBar = document.querySelector(".tabs");\nconst tabs = document.querySelectorAll(".tab");\nconst panels = document.querySelectorAll(".panel");\n\ntabBar.addEventListener("click", (e) => {\n  const btn = e.target.closest(".tab");\n  if (!btn) return;\n\n  tabs.forEach((t) => t.classList.remove("active"));\n  panels.forEach((p) => p.classList.remove("active"));\n\n  btn.classList.add("active");\n  const target = document.getElementById(btn.dataset.tab);\n  if (target) target.classList.add("active");\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tabs-lab-checkpoint",
      type: "explanation",
      instruction: {
        heading: "Free-edit checkpoint: extend it",
        body: "<p>Try at least two of these:</p><ul><li>Add a fourth tab — <strong>Payment</strong> — with its own panel.</li><li>Persist the active tab in <code>localStorage</code> so a refresh keeps the last selection.</li><li>Add keyboard support: arrow keys move between tabs (look up <code>keydown</code> events and <code>focus()</code>).</li><li>Animate the panel fade with <code>opacity</code> + a transition.</li></ul><p>If you break the file: <code>Ctrl + Z</code>, save, refresh. Each round of break-and-fix builds the muscle memory for real frontend work.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "For full a11y, real tabs need <code>role=\"tablist\"</code>, <code>role=\"tab\"</code>, <code>role=\"tabpanel\"</code>, <code>aria-selected</code>, and arrow-key navigation. The visual layout is correct; bolting on the ARIA attributes is the next layer of polish.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
