import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-capstone-typed-todo-engine",
  slug: "capstone-typed-todo-engine",
  title: "Capstone: Typed Todo Engine",
  description:
    "Combine classes, Maps, closures, immutable updates, interfaces, unions, and generics into a complete in-memory todo store.",
  order: 15,
  steps: [
    {
      id: "capstone-intro",
      type: "explanation",
      instruction: {
        heading: "Build a typed in-memory todo store",
        body: "<p>This capstone exercises everything from the module:</p><ul><li><strong>Interface</strong> for the <code>Todo</code> shape, with a <strong>literal-string union</strong> for priority.</li><li><strong>Type alias</strong> for an optional filter shape using <strong>indexed access</strong>.</li><li><strong>Map</strong> as the underlying store for O(1) lookup by id.</li><li><strong>Closure</strong> to keep the Map private inside <code>createStore</code>.</li><li><strong>Immutable updates</strong> when toggling a todo (no in-place mutation).</li><li><strong>Generic</strong> <code>find&lt;K extends keyof Todo&gt;</code> for typesafe lookups by any field.</li><li><strong>===</strong> only for comparisons.</li></ul><p>Take it one step at a time. Each step builds on the previous one.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "define-todo",
      type: "gap-fill",
      instruction: {
        heading: "Step 1 — Define Todo and Priority",
        body: "<p>Fill in the <code>Priority</code> literal-string union and the <code>Todo</code> interface fields.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'type Priority = {{a}};\n\ninterface Todo {\n  id: number;\n  title: string;\n  done: boolean;\n  priority: {{b}};\n}',
        gaps: [
          {
            id: "a",
            placeholder: "literal union",
            acceptedAnswers: [
              '"low" | "med" | "high"',
              '"high" | "med" | "low"',
              '"low" | "high" | "med"',
              '"med" | "low" | "high"',
              '"med" | "high" | "low"',
              '"high" | "low" | "med"',
            ],
            caseSensitive: true,
          },
          { id: "b", placeholder: "type", acceptedAnswers: ["Priority"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b"] } },
      hints: [
        'Three string literals separated by <code>|</code>: <code>"low"</code>, <code>"med"</code>, <code>"high"</code>.',
        "Reuse the <code>Priority</code> alias on the <code>priority</code> field.",
      ],
    },
    {
      id: "create-store",
      type: "free-edit",
      instruction: {
        heading: "Step 2 — createStore with a private Map",
        body: "<p>Write a <code>createStore</code> function that returns an object with <code>add</code>, <code>toggle</code>, <code>remove</code>, and <code>list</code>. The store should keep a private <code>Map&lt;number, Todo&gt;</code> inside the closure so the array is never exposed directly.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "<code>toggle</code> must be immutable: build a NEW Todo object with <code>{ ...existing, done: !existing.done }</code> and put it back in the Map. Don’t mutate the existing object — that’s the rule from the references-vs-value lesson.",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          'type Priority = "low" | "med" | "high";\n\ninterface Todo {\n  id: number;\n  title: string;\n  done: boolean;\n  priority: Priority;\n}\n\nfunction createStore() {\n  const items = new Map<number, Todo>();\n  let nextId = 1;\n\n  return {\n    add(title: string, priority: Priority): Todo {\n      // create a new Todo, set in map, return it\n    },\n    toggle(id: number): void {\n      // build a NEW todo with done flipped; replace in map\n    },\n    remove(id: number): void {\n      // delete from map\n    },\n    list(): Todo[] {\n      // return [...items.values()]\n    },\n  };\n}\n\n// Sanity check\nconst store = createStore();\nstore.add("Buy tea", "low");\nstore.add("Ship feature", "high");\nstore.toggle(1);\nconsole.log(store.list().length); // 2',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["new Map", "Todo", "items.set", "..."] },
      },
      hints: [
        '<code>add</code>: <code>const todo: Todo = { id: nextId++, title, done: false, priority };</code> then <code>items.set(todo.id, todo);</code>',
        '<code>toggle</code>: <code>const t = items.get(id); if (t) items.set(id, { ...t, done: !t.done });</code>',
        '<code>list</code>: <code>return [...items.values()];</code>',
      ],
    },
    {
      id: "query-filter",
      type: "free-edit",
      instruction: {
        heading: "Step 3 — Add query(filter: TodoFilter)",
        body: "<p>Define <code>TodoFilter</code> as an optional shape and add a <code>query</code> method. Both fields are optional. If a field is omitted, don’t filter on it.</p><p>The neat trick: <code>Todo['priority']</code> is an <strong>indexed access type</strong> that says &quot;the type of the <code>priority</code> field of <code>Todo</code>&quot;. If we change <code>Priority</code> later, the filter type updates automatically.</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          '// type TodoFilter = { done?: boolean; priority?: Todo["priority"] };\n\n// Add a query method to your store:\n//   query(filter: TodoFilter): Todo[]\n//\n// Match an item only when:\n//   filter.done is undefined OR matches item.done\n//   filter.priority is undefined OR matches item.priority\n\n// Example expected behaviour\n// store.query({})                       -> all todos\n// store.query({ done: false })          -> only undone\n// store.query({ priority: "high" })     -> only high\n// store.query({ done: true, priority: "low" }) -> done AND low',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["TodoFilter", "query", "filter", "done", "priority"] },
      },
      hints: [
        "Use <code>list().filter(t =&gt; ...)</code> for the implementation.",
        "<code>(filter.done === undefined || filter.done === t.done) && (filter.priority === undefined || filter.priority === t.priority)</code>",
      ],
    },
    {
      id: "generic-find",
      type: "free-edit",
      instruction: {
        heading: "Step 4 — Generic find by any field",
        body: "<p>Add a generic <code>find</code> method to the store: <code>find&lt;K extends keyof Todo&gt;(key: K, value: Todo[K]): Todo | undefined</code>. It returns the first todo whose <code>key</code> equals <code>value</code>, or <code>undefined</code>.</p><p>This is the same shape as the <code>pluck</code> generic from the previous lesson — but now applied to a real method on a real store.</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          '// Add this to the object returned by createStore:\n//\n//   find<K extends keyof Todo>(key: K, value: Todo[K]): Todo | undefined {\n//     for (const t of items.values()) {\n//       if (t[key] === value) return t;\n//     }\n//     return undefined;\n//   }\n//\n// Example calls (all should typecheck and work):\n//   store.find("title", "Buy tea")\n//   store.find("priority", "high")\n//   store.find("done", true)\n//   store.find("nope", true)  // <- TypeScript catches this at compile time',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["find", "<K extends keyof Todo>", "Todo[K]"] },
      },
      hints: [
        "The constraint <code>K extends keyof Todo</code> means <code>K</code> must be one of <code>\"id\" | \"title\" | \"done\" | \"priority\"</code>.",
        "<code>Todo[K]</code> is the indexed access — the type of the value at that key.",
      ],
    },
    {
      id: "integration",
      type: "free-edit",
      instruction: {
        heading: "Step 5 — End-to-end integration",
        body: "<p>Tie it all together. Add three todos, toggle one, query for the high-priority items, find one by title, and log the final list. The expected console output is below — match it line for line.</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          '// Reuse your full createStore from the previous steps. Then run:\n//\n// const store = createStore();\n// store.add("Buy tea",        "low");\n// store.add("Ship feature",   "high");\n// store.add("Write changelog","med");\n//\n// store.toggle(2);  // Ship feature done\n//\n// console.log(store.list().length);                       // 3\n// console.log(store.query({ priority: "high" }).length);  // 1\n// console.log(store.find("title", "Buy tea")?.priority);  // "low"\n//\n// Expected console output, in order:\n// 3\n// 1\n// low',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["createStore", "add", "toggle", "query", "find"] },
      },
      hints: [
        "Make sure your <code>add</code> uses an incrementing <code>nextId</code> so ids start at 1, 2, 3.",
        "<code>store.find(\"title\", \"Buy tea\")?.priority</code> uses optional chaining — the result might be <code>undefined</code>.",
      ],
    },
  ],
};
