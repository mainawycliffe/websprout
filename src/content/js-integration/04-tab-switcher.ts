import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-tab-switcher",
  slug: "tab-switcher",
  title: "Build a Tab Switcher",
  description:
    "Tabs share the same visual area but show different content. Use event delegation to wire all tabs in a single listener — the technique scales to dozens of tabs without slowing down.",
  order: 4,
  steps: [
    {
      id: "tabs-explain",
      type: "explanation",
      instruction: {
        heading: "Tabs are linked to panels",
        body: "<p>A tab switcher has two parts:</p><ul><li>Tab buttons in a row.</li><li>Panels — one per tab — only one of which is visible at a time.</li></ul><p>The link is usually a shared identifier. Each button has <code>data-tab=\"a\"</code>; each panel has <code>id=\"a\"</code>. When the user clicks a button, JS hides every panel except the one whose id matches the clicked button's <code>data-tab</code>.</p>",
        analogy:
          "Like the tabs in a paper folder. Only one section is visible at a time, but all the content is filed in there. Pulling a tab brings that section to the front.",
        docLinks: [
          {
            label: "MDN: Event delegation",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events#event_delegation",
            type: "js-concept",
          },
          {
            label: "MDN: dataset",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Event delegation means: attach <em>one</em> listener to the parent of all the buttons, then check inside the handler which child was clicked. Faster, cleaner, and works even when buttons are added later.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tabs-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: three tabs, one delegated listener",
        body: "<p>Click each tab in the preview to swap the visible panel. Write the JS at the bottom: attach a single click listener to <code>.tabs</code>, read the clicked button's <code>data-tab</code>, hide all panels, then show the one whose id matches.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; }\n  .tabs { display: flex; gap: 4px; border-bottom: 1px solid #cbd5e1; margin-bottom: 16px; }\n  .tab { padding: 8px 16px; border: none; background: transparent; cursor: pointer; font-weight: 600; color: #64748b; }\n  .tab.active { color: #0f172a; border-bottom: 2px solid #6366f1; }\n  .panel { display: none; padding: 16px; background: #f8fafc; border-radius: 8px; }\n  .panel.active { display: block; }\n</style>\n</head>\n<body>\n  <h1>Pricing</h1>\n  <div class="tabs">\n    <button class="tab active" data-tab="kg">Per kg</button>\n    <button class="tab" data-tab="bunch">Per bunch</button>\n    <button class="tab" data-tab="combo">Combos</button>\n  </div>\n  <div class="panel active" id="kg">Sukuma — KSh 60/kg. Tomatoes — KSh 120/kg.</div>\n  <div class="panel" id="bunch">Sukuma — KSh 30/bunch. Spinach — KSh 30/bunch.</div>\n  <div class="panel" id="combo">Stew Mix (sukuma + tomato + onion) — KSh 200.</div>\n\n  <script>\n    // TODO: one click listener on .tabs.\n    // 1. Read clicked button.dataset.tab\n    // 2. Remove .active from all .tab and .panel\n    // 3. Add .active to the clicked button and the matching panel by id\n  </script>\n</body>\n</html>',
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["addEventListener", "dataset"] },
      },
      hints: [
        "document.querySelector('.tabs').addEventListener('click', (e) => { ... });",
        "Inside, check if e.target.matches('.tab'). If yes, read e.target.dataset.tab.",
        "Loop through .tab and .panel and remove 'active'. Then add 'active' to e.target and document.getElementById(e.target.dataset.tab).",
      ],
    },
  ],
};
