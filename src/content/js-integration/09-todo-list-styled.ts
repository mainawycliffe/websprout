import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-todo-list-styled",
  slug: "todo-list-styled",
  title: "Build a Styled Todo List",
  description:
    "Create a todo list where completed items get visually marked — strikethrough and faded. Bridges JS DOM creation to CSS state classes.",
  order: 9,
  steps: [
    {
      id: "todo-explain",
      type: "explanation",
      instruction: {
        heading: "Three actions, one shape",
        body: "<p>A todo list has three actions and the same DOM-state pattern handles all of them:</p><ul><li><strong>Add</strong> — read the input, create a new <code>&lt;li&gt;</code>, append it to the list, clear the input.</li><li><strong>Complete</strong> — toggle a <code>completed</code> class on the clicked item. CSS handles the strikethrough.</li><li><strong>Delete</strong> — call <code>.remove()</code> on the clicked item.</li></ul><p>Add a single click listener on the <code>&lt;ul&gt;</code> (event delegation) so 'complete' and 'delete' work even for items added later.</p>",
        docLinks: [
          {
            label: "MDN: createElement",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
            type: "js-method",
          },
          {
            label: "MDN: closest()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "When delegating, use <code>e.target.closest('selector')</code> to find the right ancestor — the user might click the icon inside the button instead of the button itself, and <code>closest()</code> walks up to find the nearest matching element.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "todo-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a working market shopping list",
        body: "<p>Wire three behaviours: form submit adds a new item, clicking the text toggles <code>completed</code>, clicking the × removes the item.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { font-family: system-ui, sans-serif; max-width: 380px; margin: 0 auto; padding: 32px; }\n  h1 { font-size: 22px; }\n  form { display: flex; gap: 8px; margin-bottom: 16px; }\n  input { flex: 1; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 16px; }\n  form button { padding: 10px 16px; border: none; border-radius: 6px; background: #6366f1; color: white; font-weight: 600; cursor: pointer; }\n  ul { list-style: none; padding: 0; margin: 0; }\n  li { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: white; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 6px; cursor: pointer; }\n  li.completed .text { text-decoration: line-through; opacity: 0.5; }\n  .delete { background: none; border: none; color: #ef4444; font-size: 18px; cursor: pointer; padding: 0 6px; }\n</style>\n</head>\n<body>\n  <h1>Market shopping list</h1>\n  <form id="add-form">\n    <input type="text" id="new-item" placeholder="Sukuma per kg" required>\n    <button>Add</button>\n  </form>\n  <ul id="list"></ul>\n\n  <script>\n    // TODO:\n    // 1. const form, input, list = ...\n    // 2. form.addEventListener("submit", e => { e.preventDefault(); ... create li with span.text + button.delete, append to list, clear input })\n    // 3. list.addEventListener("click", e => { if (e.target.matches(".delete")) e.target.closest("li").remove(); else if (e.target.closest("li")) e.target.closest("li").classList.toggle("completed"); })\n  </script>\n</body>\n</html>',
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["preventDefault", "createElement", "addEventListener"] },
      },
      hints: [
        "const form = document.querySelector('#add-form'); const input = document.querySelector('#new-item'); const list = document.querySelector('#list');",
        "form.addEventListener('submit', (e) => { e.preventDefault(); const li = document.createElement('li'); li.innerHTML = `<span class=\"text\">${input.value}</span><button class=\"delete\">×</button>`; list.appendChild(li); input.value = ''; });",
        "list.addEventListener('click', (e) => { if (e.target.matches('.delete')) { e.target.closest('li').remove(); } else if (e.target.closest('li')) { e.target.closest('li').classList.toggle('completed'); } });",
      ],
    },
  ],
};
