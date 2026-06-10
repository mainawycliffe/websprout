import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-capstone-data-dashboard",
  slug: "capstone-data-dashboard",
  title: "Capstone: A Sales Summary",
  description:
    "Combine filter, map, reduce, and object shorthand to turn a raw array of orders into a clean summary — exactly the data-shaping a real dashboard does.",
  order: 12,
  steps: [
    {
      id: "capstone-brief",
      type: "explanation",
      instruction: {
        heading: "The brief",
        body: `<p>You're handed a raw array of <code>orders</code> — the kind of data an API returns. Your job is to boil it down into a small <strong>summary object</strong> a dashboard could display. You'll use the whole modern toolkit at once:</p><ol><li><code>filter</code> the orders down to the ones that are <code>"paid"</code>.</li><li><code>reduce</code> those paid orders into a total <code>revenue</code>.</li><li><code>map</code> them to a list of <code>customers</code>.</li><li>Assemble a <code>summary</code> object using property <strong>shorthand</strong>.</li></ol><p>This "raw data in, clean summary out" transformation is what a React component does before it renders. Same data work, whether it ends in <code>console.log</code> or in JSX.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Build it one variable at a time and log as you go. Get <code>paidOrders</code> right first, then compute <code>revenue</code> and <code>customers</code> from it, then bundle them into <code>summary</code>.`,
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-build",
      type: "free-edit",
      instruction: {
        heading: "Build the summary",
        body: `<p>Using the <code>orders</code> array, produce and log a <code>summary</code> object shaped like this:</p><pre><code>{ paidCount: 3, revenue: 370, customers: ["Ada", "Sam", "Ada"] }</code></pre><ol><li><code>const paidOrders = orders.filter(...)</code> — keep <code>status === "paid"</code>.</li><li><code>const revenue = paidOrders.reduce(...)</code> — sum each order's <code>amount</code>, starting at <code>0</code>.</li><li><code>const customers = paidOrders.map(...)</code> — each order's <code>customer</code>.</li><li><code>const summary = { paidCount: paidOrders.length, revenue, customers }</code> — note <code>revenue</code> and <code>customers</code> use shorthand.</li></ol><p>Then <code>console.log(summary)</code>.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Every step here builds a <em>new</em> value and never mutates <code>orders</code>. That immutable, pipeline style is exactly how you'll prepare data inside React components — and why those components stay predictable.`,
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
        type: "free-edit",
        language: "javascript",
        starterCode: `const orders = [
  { id: 1, customer: "Ada", amount: 120, status: "paid" },
  { id: 2, customer: "Lin", amount: 80, status: "pending" },
  { id: 3, customer: "Sam", amount: 200, status: "paid" },
  { id: 4, customer: "Ada", amount: 50, status: "paid" },
];

// 1. paidOrders = filter status === "paid"
// 2. revenue   = reduce paidOrders' amount (start at 0)
// 3. customers = map paidOrders -> customer
// 4. summary   = { paidCount, revenue, customers }  (use shorthand)
// 5. log summary
`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: [".filter(", ".reduce(", ".map(", "console.log"] },
      },
      hints: [
        'Filter: <code>const paidOrders = orders.filter((o) => o.status === "paid");</code>',
        "Revenue: <code>const revenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);</code>",
        "Customers + summary: <code>const customers = paidOrders.map((o) => o.customer); const summary = { paidCount: paidOrders.length, revenue, customers };</code>",
      ],
    },
    {
      id: "capstone-recap",
      type: "explanation",
      instruction: {
        heading: "What you just did",
        body: `<p>You took messy, raw data and shaped it into exactly what a screen needs — using <code>filter</code>, <code>reduce</code>, <code>map</code>, and object shorthand together, without mutating the original. That's not a toy exercise; it's the daily work of frontend development.</p><p>In the React module, this same <code>summary</code> would feed straight into JSX: <code>{summary.customers.map((c) => &lt;li&gt;{c}&lt;/li&gt;)}</code>, with <code>summary.revenue</code> shown in a header. The data work is identical — you've already learned the hard part. You're ready for React.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — where to go next",
            body: `This is the perfect on-ramp to the <strong>React Fundamentals</strong> module. Every pattern you practiced here — spread for immutable updates, <code>map</code> for lists, destructuring for props, <code>?.</code> for safe data — is used on nearly every line of React code.`,
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
