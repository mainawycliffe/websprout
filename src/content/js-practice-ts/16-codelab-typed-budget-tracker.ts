import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-codelab-typed-budget-tracker",
  slug: "codelab-typed-budget-tracker",
  title: "Codelab: Typed Budget Tracker",
  description:
    "Build a real budget tracker on your own machine in plain HTML + TypeScript. Uses the in-browser TS compiler from a CDN — no install, no npm, no build tools.",
  order: 16,
  steps: [
    {
      id: "codelab-intro",
      type: "explanation",
      instruction: {
        heading: "What you’re building",
        body: "<p>You’ll build a single-page <strong>budget tracker</strong> on your own computer:</p><ul><li>A form to add an expense (description, amount, category).</li><li>A list of expenses underneath.</li><li>A live total at the top, plus a per-category breakdown.</li></ul><p>The interesting part: it’s written in <strong>TypeScript</strong>. We’ll use the official TypeScript compiler loaded from a CDN to transpile your code in the browser — no <code>npm install</code>, no <code>tsc</code>, no build tools. Just two files and a tiny local web server.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "In a real production project you would run <code>tsc</code> ahead of time. Browser transpilation is for learning — it’s slower, it ships the whole compiler to the browser, and it skips strict type-checking. Once you’re comfortable, set up a real project with <code>npx tsc --init</code>.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-setup",
      type: "explanation",
      instruction: {
        heading: "Step 1 — Make the project folder",
        body: "<p>Open a terminal and create the project. We’ll have just two files: <code>index.html</code> and <code>app.ts</code>.</p><p>If you don’t have an editor, install <a href=\"https://code.visualstudio.com\">VS Code</a>. Any plain editor works (nano, gedit) — just not a word processor.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          "# In your terminal:\nmkdir budget-tracker\ncd budget-tracker\ntouch index.html app.ts\n\n# Open the folder in VS Code (skip if you use a different editor):\ncode .",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-html",
      type: "explanation",
      instruction: {
        heading: "Step 2 — Paste the HTML scaffold",
        body: "<p>Open <code>index.html</code> and paste the code below. Two things to notice:</p><ul><li>The <code>&lt;script src=&quot;https://cdn.jsdelivr.net/npm/typescript...&quot;&gt;</code> loads the TypeScript compiler.</li><li>The bootstrap at the bottom fetches <code>app.ts</code>, transpiles it with <code>ts.transpileModule</code>, and runs the resulting JavaScript with <code>new Function</code>.</li></ul>",
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <title>Budget Tracker</title>\n  <style>\n    body { font-family: sans-serif; max-width: 540px; margin: 40px auto; }\n    h1 { margin: 0 0 8px; }\n    .total { font-size: 1.4rem; margin: 8px 0 24px; }\n    form { display: grid; grid-template-columns: 1fr 100px 120px auto; gap: 8px; margin-bottom: 16px; }\n    input, select, button { padding: 8px; font: inherit; }\n    ul { list-style: none; padding: 0; }\n    li { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #eee; }\n    .breakdown { margin-top: 16px; color: #555; font-size: 0.9rem; }\n  </style>\n</head>\n<body>\n  <h1>Budget Tracker</h1>\n  <div class="total">Total: <span id="total">0.00</span></div>\n\n  <form id="form">\n    <input id="desc" placeholder="Description" required />\n    <input id="amount" type="number" step="0.01" placeholder="0.00" required />\n    <select id="category">\n      <option value="food">Food</option>\n      <option value="rent">Rent</option>\n      <option value="travel">Travel</option>\n      <option value="fun">Fun</option>\n    </select>\n    <button type="submit">Add</button>\n  </form>\n\n  <ul id="list"></ul>\n  <div class="breakdown" id="breakdown"></div>\n\n  <script src="https://cdn.jsdelivr.net/npm/typescript@5.4.5/lib/typescript.min.js"></script>\n  <script>\n    fetch("app.ts")\n      .then((r) => r.text())\n      .then((source) => {\n        const out = ts.transpileModule(source, {\n          compilerOptions: { target: ts.ScriptTarget.ES2020 },\n        });\n        new Function(out.outputText)();\n      });\n  </script>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-types",
      type: "explanation",
      instruction: {
        heading: "Step 3 — Define the types",
        body: "<p>Open <code>app.ts</code> and start with the type definitions: a literal-string union for <code>Category</code> and an interface for <code>Expense</code>. The compiler doesn’t care about runtime — these only exist to help you (and your editor) write the rest of the file safely.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          '// app.ts — paste this at the top of the file\n\ntype Category = "food" | "rent" | "travel" | "fun";\n\ninterface Expense {\n  id: number;\n  desc: string;\n  amountCents: number;  // store cents! (remember 0.1 + 0.2)\n  category: Category;\n}',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-store",
      type: "explanation",
      instruction: {
        heading: "Step 4 — Build the BudgetStore class",
        body: "<p>Add a <code>BudgetStore</code> class with a private <code>#expenses</code> array, an <code>add</code> method, and methods that return the total and a <code>Map&lt;Category, number&gt;</code> of per-category totals.</p><p>Notice we never expose the array directly — callers go through <code>list()</code>, <code>total()</code>, and <code>byCategory()</code>.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          'class BudgetStore {\n  #expenses: Expense[] = [];\n  #nextId = 1;\n\n  add(desc: string, amountCents: number, category: Category): Expense {\n    const expense: Expense = {\n      id: this.#nextId++,\n      desc,\n      amountCents,\n      category,\n    };\n    this.#expenses.push(expense);\n    return expense;\n  }\n\n  list(): Expense[] {\n    return [...this.#expenses];\n  }\n\n  total(): number {\n    return this.#expenses.reduce((sum, e) => sum + e.amountCents, 0);\n  }\n\n  byCategory(): Map<Category, number> {\n    const out = new Map<Category, number>();\n    for (const e of this.#expenses) {\n      out.set(e.category, (out.get(e.category) ?? 0) + e.amountCents);\n    }\n    return out;\n  }\n}\n\nconst store = new BudgetStore();',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-form-handler",
      type: "explanation",
      instruction: {
        heading: "Step 5 — Wire up the form (with narrowing!)",
        body: "<p>The form’s <code>submit</code> event gives you an <code>Event</code>. <code>event.target</code> is typed <code>EventTarget | null</code> — you have to <strong>narrow</strong> it before you can use form-specific APIs.</p><p>The pattern below is exactly how production TypeScript code handles DOM events: <code>document.querySelector</code> returns <code>HTMLElement | null</code>, and you assert / narrow it to the specific subtype you expect.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "<code>document.querySelector&lt;HTMLInputElement&gt;(\"#amount\")</code> tells TypeScript the result is an <code>HTMLInputElement</code> (or <code>null</code>). Without that, <code>amountInput.value</code> would be an error.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const form = document.querySelector<HTMLFormElement>("#form")!;\nconst descInput = document.querySelector<HTMLInputElement>("#desc")!;\nconst amountInput = document.querySelector<HTMLInputElement>("#amount")!;\nconst categorySelect = document.querySelector<HTMLSelectElement>("#category")!;\nconst totalSpan = document.querySelector<HTMLSpanElement>("#total")!;\nconst listEl = document.querySelector<HTMLUListElement>("#list")!;\nconst breakdownEl = document.querySelector<HTMLDivElement>("#breakdown")!;\n\nfunction render() {\n  totalSpan.textContent = (store.total() / 100).toFixed(2);\n\n  listEl.innerHTML = "";\n  for (const e of store.list()) {\n    const li = document.createElement("li");\n    li.textContent = `${e.desc} (${e.category}) — $${(e.amountCents / 100).toFixed(2)}`;\n    listEl.appendChild(li);\n  }\n\n  const parts: string[] = [];\n  for (const [cat, cents] of store.byCategory()) {\n    parts.push(`${cat}: $${(cents / 100).toFixed(2)}`);\n  }\n  breakdownEl.textContent = parts.join(" · ");\n}\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n\n  const desc = descInput.value.trim();\n  const dollars = Number(amountInput.value);\n  const category = categorySelect.value as Category;\n\n  if (!desc || Number.isNaN(dollars)) return;\n\n  store.add(desc, Math.round(dollars * 100), category);\n  form.reset();\n  render();\n});\n\nrender();',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-run",
      type: "explanation",
      instruction: {
        heading: "Step 6 — Serve it locally and open in the browser",
        body: "<p>You can’t open <code>index.html</code> directly with <code>file://</code> — the bootstrap uses <code>fetch(\"app.ts\")</code>, which browsers block on the file protocol. Run a tiny local server instead. Linux ships with Python 3, which has one built in.</p><p>From inside the <code>budget-tracker</code> folder:</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          "# In the budget-tracker folder:\npython3 -m http.server 8000\n\n# Then open in your browser:\n# http://localhost:8000\n\n# Press Ctrl+C in the terminal to stop the server when done.",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Step 7 — Checkpoint",
        body: "<p>Paste your final <code>app.ts</code> below for the checkpoint. The validator looks for the key pieces: <code>interface Expense</code>, the <code>Category</code> union, the <code>BudgetStore</code> class with a private field, the <code>byCategory</code> Map, and a <code>submit</code> event listener.</p><p>If you got the local app running and saw the total update when you added an expense — congratulations, you just shipped a typed app from scratch.</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          '// Paste your final app.ts contents here.\n//\n// Required pieces:\n//   - type Category = "food" | "rent" | "travel" | "fun";\n//   - interface Expense { id; desc; amountCents; category }\n//   - class BudgetStore with #expenses, add, list, total, byCategory\n//   - form.addEventListener("submit", ...)\n',
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: [
            "interface Expense",
            "Category",
            "class BudgetStore",
            "#expenses",
            "byCategory",
            "addEventListener",
          ],
        },
      },
      hints: [
        "All six required pieces are in the steps above — combine them in one file.",
        "If something is missing, scroll back to the relevant step and copy that block in.",
      ],
    },
  ],
};
