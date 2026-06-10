import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-chaining-pipelines",
  slug: "chaining-pipelines",
  title: "Chaining: Data Pipelines",
  description:
    "Chain map, filter, and reduce together to turn raw data into exactly what your UI needs — the data-shaping every React component does before it renders.",
  order: 8,
  steps: [
    {
      id: "why-chaining",
      type: "explanation",
      instruction: {
        heading: "Each method hands off to the next",
        body: `<p>Because <code>filter</code> and <code>map</code> each return a <em>new array</em>, you can call the next method right on the result. Strung together, they form a readable <strong>pipeline</strong> that flows top to bottom:</p><pre><code>const names = products
  .filter((p) => p.inStock)   // 1. keep in-stock items
  .map((p) => p.name);        // 2. pull out each name</code></pre><p>This is precisely what a React component does before rendering: take the raw array from an API, <code>filter</code> to what should show, <code>map</code> it into list items, maybe <code>reduce</code> for a total. Learning to read and write these pipelines is most of the "data work" in a real app.</p>`,
        analogy: `A pipeline is an assembly line with stations. The array of parts moves down the line: one station removes defects (<code>filter</code>), the next paints each part (<code>map</code>), a final station boxes them up and counts the total (<code>reduce</code>). Each station passes its output to the next.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — order matters for speed and meaning",
            body: `Usually <code>filter</code> first (shrink the list), then <code>map</code> (transform what's left). Filtering first means <code>map</code> does less work, and the steps read in the order you'd describe them out loud.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Array methods",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const products = [
  { name: "Pen", price: 5, inStock: true },
  { name: "Desk", price: 150, inStock: false },
  { name: "Mug", price: 12, inStock: true },
];

// Pipeline: keep in-stock, then take the names
const inStockNames = products
  .filter((p) => p.inStock)
  .map((p) => p.name);
console.log(inStockNames);   // ["Pen", "Mug"]

// Pipeline ending in reduce: total value of in-stock items
const stockValue = products
  .filter((p) => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log(stockValue);     // 17`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "pipeline-practice",
      type: "free-edit",
      instruction: {
        heading: "Practice: build a pipeline",
        body: `<p>From the <code>orders</code> array, produce a list of the <em>names</em> of orders that are <code>"paid"</code>. Chain two methods:</p><ol><li><code>filter</code> to keep only orders whose <code>status</code> is <code>"paid"</code>;</li><li><code>map</code> to turn each remaining order into its <code>customer</code> name.</li></ol><p>Log the result — you should get <code>["Ada", "Sam"]</code>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `You can write the chain across multiple lines (one method per line) for readability — JavaScript ignores the line breaks. This is exactly how you'd shape API data inside a React component before mapping it to JSX.`,
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode: `const orders = [
  { customer: "Ada", status: "paid" },
  { customer: "Lin", status: "pending" },
  { customer: "Sam", status: "paid" },
];

// Chain filter (status === "paid") then map (-> customer), and log it.
`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: [".filter(", ".map(", "console.log"] },
      },
      hints: [
        'Filter: <code>.filter((o) => o.status === "paid")</code>',
        "Then map and store: <code>const names = orders.filter(...).map((o) => o.customer);</code>",
      ],
    },
  ],
};
