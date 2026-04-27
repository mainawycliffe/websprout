import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-theme-toggle",
  slug: "theme-toggle",
  title: "Build a Theme Toggle",
  description:
    "The 'flip a class on body, let CSS variables do the rest' pattern. Build a working light/dark toggle and watch the whole page change with one click.",
  order: 2,
  steps: [
    {
      id: "theme-explain",
      type: "explanation",
      instruction: {
        heading: "Theming with one class",
        body: "<p>Real apps with light/dark mode rarely change every colour by hand. Instead they:</p><ol><li>Define a palette using CSS custom properties (<code>--bg</code>, <code>--text</code>, etc.) at the top of the file.</li><li>Define a second palette inside <code>body.dark</code> that <em>overrides</em> those variables.</li><li>Style every element using the variables (<code>color: var(--text)</code>).</li><li>Toggle the <code>dark</code> class on <code>&lt;body&gt;</code> from JavaScript.</li></ol><p>The result: one click flips the whole interface, and your CSS does not have to know anything about JS state.</p>",
        analogy:
          "It is like a cinema with two sets of lights — house lights and screen lights. You do not rewire each lamp; you flip one switch and the whole room shifts mood.",
        docLinks: [
          {
            label: "MDN: classList.toggle()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle",
            type: "js-method",
          },
          {
            label: "MDN: CSS custom properties",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
            type: "css-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "theme-fill-toggle",
      type: "gap-fill",
      instruction: {
        heading: "Predict: which method flips a class on/off?",
        body: "<p>Fill in the method name that adds the class if missing and removes it if present.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const button = document.querySelector("#theme");\nbutton.addEventListener("click", () => {\n  document.body.classList.{{method}}("dark");\n});',
        gaps: [
          {
            id: "method",
            placeholder: "method",
            acceptedAnswers: ["toggle"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["method"] } },
      hints: [
        "classList has add, remove, toggle, contains.",
        "Toggle is the one-call shortcut for 'add if missing, remove if present'.",
      ],
    },
    {
      id: "theme-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: the working toggle",
        body: "<p>Click the button in the preview. The page should flip between light and dark instantly. The CSS is already written using variables; you only need to write the click handler that toggles the <code>dark</code> class on <code>&lt;body&gt;</code>.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Make sure your script tag is at the bottom of the body, AFTER the button — otherwise <code>querySelector</code> runs before the button exists in the DOM and returns <code>null</code>.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<style>\n  :root {\n    --bg: #f8fafc;\n    --text: #0f172a;\n    --card: white;\n  }\n  body.dark {\n    --bg: #0f172a;\n    --text: #f8fafc;\n    --card: #1e293b;\n  }\n  body { background: var(--bg); color: var(--text); margin: 0; font-family: system-ui, sans-serif; padding: 32px; transition: background 0.2s, color 0.2s; }\n  .card { background: var(--card); padding: 16px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }\n  .toggle { padding: 10px 20px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; background: #6366f1; color: white; margin-bottom: 16px; }\n</style>\n</head>\n<body>\n  <button class="toggle" id="theme">Toggle theme</button>\n  <div class="card">\n    <h2>Hello, Sukuma!</h2>\n    <p>Click the button to switch between light and dark mode.</p>\n  </div>\n\n  <script>\n    // TODO: select #theme, add a click listener that toggles the "dark" class on document.body\n  </script>\n</body>\n</html>',
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["classList.toggle", "dark"] },
      },
      hints: [
        "const button = document.querySelector('#theme');",
        "button.addEventListener('click', () => { document.body.classList.toggle('dark'); });",
      ],
    },
  ],
};
