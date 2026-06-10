import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-array-filter-find",
  slug: "array-filter-find",
  title: "Selecting Data: filter, find, some, every",
  description:
    "Keep only the items you want with filter, grab the first match with find, and ask yes/no questions about a list with some and every.",
  order: 6,
  steps: [
    {
      id: "filter-find",
      type: "explanation",
      instruction: {
        heading: "filter keeps many; find grabs one",
        body: `<p>Where <code>map</code> <em>transforms</em> items, these methods <em>select</em> them. You give each a test function that returns <code>true</code> or <code>false</code>:</p><ul><li><strong><code>filter</code></strong> returns a <em>new array</em> of every item that passes the test. Great for search results, or removing an item.</li><li><strong><code>find</code></strong> returns the <em>first single item</em> that passes (or <code>undefined</code> if none do). Great for looking something up by id.</li></ul><p>These are everyday React tools. Deleting a todo immutably is <code>todos.filter((t) => t.id !== id)</code> — keep everything except the one to remove. Opening a product page is <code>products.find((p) => p.id === id)</code>.</p>`,
        analogy: `<code>filter</code> is a coffee filter: the things that pass through (the liquid) are your result; the rest is left behind. <code>find</code> is reaching into a drawer for the <em>first</em> sock that matches — you stop as soon as you find it.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `<code>filter</code> always returns an <strong>array</strong> (possibly empty). <code>find</code> returns a <strong>single item</strong> or <code>undefined</code>. Mixing them up is common — if you <code>filter</code> when you meant <code>find</code>, you'll get a one-item array instead of the item.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Array.prototype.filter()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
            type: "js-method",
          },
          {
            label: "MDN — Array.prototype.find()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const nums = [4, 9, 2, 7, 1];
const big = nums.filter((n) => n > 3);
console.log(big);    // [4, 9, 7]  (a new array)

const users = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Lin" },
  { id: 3, name: "Sam" },
];
const lin = users.find((u) => u.id === 2);
console.log(lin);    // { id: 2, name: "Lin" }  (a single object)

// Remove an item immutably (the React "delete" pattern):
const withoutLin = users.filter((u) => u.id !== 2);
console.log(withoutLin.length);   // 2`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "some-every",
      type: "explanation",
      instruction: {
        heading: "some and every: yes/no about the whole list",
        body: `<p>Sometimes you don't want items back — just a true/false answer about the array as a whole:</p><ul><li><strong><code>some</code></strong> → <code>true</code> if <em>at least one</em> item passes the test.</li><li><strong><code>every</code></strong> → <code>true</code> only if <em>all</em> items pass.</li></ul><p>Use them for things like "is the cart non-empty?", "did every required field get filled?", or "are any items on sale?" — quick checks that drive what your UI shows.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Think of <code>some</code> as "any?" and <code>every</code> as "all?". A form's submit button might be enabled only when <code>fields.every((f) => f.valid)</code> is true.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Array.prototype.some()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const scores = [55, 80, 92];

console.log(scores.some((s) => s >= 90));    // true  (92 qualifies)
console.log(scores.every((s) => s >= 50));   // true  (all are >= 50)
console.log(scores.every((s) => s >= 60));   // false (55 fails)`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "filter-find-practice",
      type: "free-edit",
      instruction: {
        heading: "Practice: a tiny product query",
        body: `<p>Using the <code>products</code> array, do two things and log each result:</p><ol><li>Use <code>filter</code> to build an array of products that are <code>inStock</code>.</li><li>Use <code>find</code> to get the single product whose <code>id</code> is <code>3</code>.</li></ol>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `<code>filter</code> gives you an array you could then <code>map</code> into a list; <code>find</code> gives you one object you'd show on a detail page. That pairing — filter a list, find one item — is the backbone of most app screens.`,
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode: `const products = [
  { id: 1, name: "Pen", price: 5, inStock: true },
  { id: 2, name: "Desk", price: 150, inStock: false },
  { id: 3, name: "Mug", price: 12, inStock: true },
];

// 1. const available = products.filter(...)   -> only inStock items
// 2. const mug = products.find(...)           -> the product with id 3
// Log both.
`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: [".filter(", ".find(", "console.log"] },
      },
      hints: [
        "Filter: <code>const available = products.filter((p) => p.inStock);</code>",
        "Find: <code>const mug = products.find((p) => p.id === 3);</code>",
      ],
    },
  ],
};
