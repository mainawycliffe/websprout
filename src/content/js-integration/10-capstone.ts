import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-capstone",
  slug: "capstone",
  title: "Capstone: A Mini Market Dashboard",
  description:
    "Stitch the price calculator, theme toggle, and a styled cart accordion into a single small dashboard. The pattern of every real frontend.",
  order: 10,
  steps: [
    {
      id: "capstone-brief",
      type: "explanation",
      instruction: {
        heading: "The brief",
        body: "<p>Build a mini market widget. It must include:</p><ol><li>A theme toggle (light/dark) at the top.</li><li>A price calculator: choose Sukuma <strong>Per kg</strong> or <strong>Bunch</strong>, set a quantity, see the live total.</li><li>An <strong>Add to cart</strong> button that appends the current selection to a list below.</li><li>The cart list shows each entry as a card with item, unit, qty, and total.</li></ol><p>Use everything you learned: <code>classList.toggle</code> for the theme, an event-driven <code>render()</code> for the calculator, <code>createElement</code> for cart entries, CSS variables for theming.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-build",
      type: "free-edit",
      instruction: {
        heading: "Build the dashboard",
        body: "<p>Open the editor and finish the JavaScript at the bottom. The HTML and CSS are already structured for you.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Read the comments in the script carefully — they describe each piece in the order you should build it. Add → calculate → add-to-cart → theme.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<style>\n  :root { --bg: #f8fafc; --text: #0f172a; --card: white; --muted: #64748b; }\n  body.dark { --bg: #0f172a; --text: #f8fafc; --card: #1e293b; --muted: #94a3b8; }\n  body { background: var(--bg); color: var(--text); margin: 0; font-family: system-ui, sans-serif; padding: 24px; transition: background 0.2s, color 0.2s; }\n  .panel { max-width: 420px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }\n  .row { display: flex; justify-content: space-between; align-items: center; }\n  .toggle { padding: 8px 14px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; background: #6366f1; color: white; }\n  .card { background: var(--card); padding: 16px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }\n  label { font-weight: 600; display: block; margin-bottom: 4px; }\n  select, input { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 16px; box-sizing: border-box; background: var(--bg); color: var(--text); }\n  .total { margin-top: 12px; font-weight: 700; }\n  button.add { margin-top: 12px; padding: 10px 16px; border: none; border-radius: 6px; background: #10b981; color: white; font-weight: 700; cursor: pointer; }\n  ul.cart { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }\n  ul.cart li { background: var(--card); padding: 10px 14px; border-radius: 8px; display: flex; justify-content: space-between; }\n  .muted { color: var(--muted); font-size: 13px; }\n</style>\n</head>\n<body>\n  <div class="panel">\n    <div class="row">\n      <h1 style="margin:0;font-size:20px">Mboga Direct</h1>\n      <button class="toggle" id="theme">Theme</button>\n    </div>\n\n    <div class="card">\n      <label for="unit">Unit</label>\n      <select id="unit">\n        <option value="kg">Sukuma — Per kg (KSh 60)</option>\n        <option value="bunch">Sukuma — Bunch (KSh 30)</option>\n      </select>\n      <label for="qty" style="margin-top:8px">Quantity</label>\n      <input type="number" id="qty" value="1" min="0" step="0.5">\n      <div class="total">Total: KSh <span id="total">0</span></div>\n      <button class="add" id="add">Add to cart</button>\n    </div>\n\n    <h2 style="margin:8px 0;font-size:16px">Cart</h2>\n    <ul class="cart" id="cart"></ul>\n  </div>\n\n  <script>\n    // 1. THEME — toggle .dark on body when #theme is clicked.\n\n    // 2. RENDER TOTAL — write a render() that reads #unit + #qty and writes #total.\n    //    Wire it on #unit (change) and #qty (input). Call once on load.\n\n    // 3. ADD TO CART — when #add is clicked, append a <li> to #cart with text like\n    //    "Sukuma — Per kg × 1.5    KSh 90".\n  </script>\n</body>\n</html>',
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["classList.toggle", "addEventListener", "createElement"] },
      },
      hints: [
        "Theme: document.querySelector('#theme').addEventListener('click', () => document.body.classList.toggle('dark'));",
        "render(): const u = unit.value === 'kg' ? 60 : 30; total.textContent = u * Number(qty.value);",
        "Add: document.querySelector('#add').addEventListener('click', () => { const li = document.createElement('li'); li.innerHTML = `<span>Sukuma — ${unit.options[unit.selectedIndex].text} × ${qty.value}</span><span>KSh ${total.textContent}</span>`; cart.appendChild(li); });",
      ],
    },
    {
      id: "capstone-recap",
      type: "explanation",
      instruction: {
        heading: "What you just shipped",
        body: "<p>This dashboard is the same shape as a real ecommerce widget — a unit selector, a live calculator, an add-to-cart action, and a render of stored items. The patterns scale: replace the <code>cart</code> array with a server fetch, the unit select with a product selector, and you have a functioning page.</p><p>You also wove together every concept in this module: class toggling for theme state, event-driven recalculation for the calculator, DOM creation for cart entries, and CSS variables for theming.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Real apps would persist the cart in <code>localStorage</code> and validate quantity bounds. The structure you have is the foundation; production polish is a layer on top, not a different shape.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
