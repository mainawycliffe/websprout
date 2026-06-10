import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-array-map",
  slug: "array-map",
  title: "Transforming Data with map",
  description:
    "Use .map() to turn one array into another by transforming every item — the single most important array method in React, where it powers every rendered list.",
  order: 5,
  steps: [
    {
      id: "why-map",
      type: "explanation",
      instruction: {
        heading: "map: one array in, a new array out",
        body: `<p><code>.map()</code> takes an array, runs a function on <em>every</em> item, and returns a <strong>new array</strong> of the transformed results — same length, same order, new values. The original is untouched.</p><pre><code>const prices = [10, 20, 30];
const withTax = prices.map((price) => price * 1.16);
// [11.6, 23.2, 34.8]</code></pre><p>This is <em>the</em> method you'll use most in React. Remember rendering a list there? <code>{posts.map((post) => &lt;li&gt;{post.title}&lt;/li&gt;)}</code> — that's <code>map</code> turning an array of data into an array of UI. Learn it cold here and React lists become second nature.</p>`,
        analogy: `<code>map</code> is a factory conveyor belt. Raw items go in one end, each passes through the same machine (your function), and a finished item comes out — one out for every one in. Three items in, three items out.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `<code>map</code> always returns an array of the <strong>same length</strong> as the original — one result per item. If you want to <em>remove</em> items, that's <code>filter</code> (next lesson), not <code>map</code>. And <code>map</code> never changes the original array; it builds a new one.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Array.prototype.map()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const prices = [10, 20, 30];
const withTax = prices.map((price) => price * 1.16);
console.log(withTax);   // [11.6, 23.2, 34.8]
console.log(prices);    // [10, 20, 30] — unchanged

// Transform an array of objects into an array of one field:
const users = [{ name: "Ada" }, { name: "Lin" }, { name: "Sam" }];
const names = users.map((user) => user.name);
console.log(names);     // ["Ada", "Lin", "Sam"]`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "map-practice",
      type: "js-console",
      instruction: {
        heading: "Your turn: map to labels",
        body: `<p>You have an array <code>scores = [55, 70, 92]</code>. Use <code>.map()</code> to build a new array where each score becomes a string like <code>"Score: 55"</code>, and log it.</p><p>You should see <code>["Score: 55", "Score: 70", "Score: 92"]</code>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `The function you pass to <code>map</code> runs once per item and <em>returns</em> the new value for that slot. Forgetting to <code>return</code> (when using curly braces) gives you an array of <code>undefined</code> — a classic bug.`,
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode: `const scores = [55, 70, 92];

// Map each score to a string "Score: <n>" and log the new array
`,
        expectedOutput: ["Score: 55", "Score: 70", "Score: 92"],
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: [".map(", "console.log"] },
      },
      hints: [
        'Build it: <code>const labels = scores.map((s) => "Score: " + s);</code>',
        "Then <code>console.log(labels);</code>",
      ],
    },
  ],
};
