import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-array-reduce",
  slug: "array-reduce",
  title: "Boiling Down Data with reduce",
  description:
    "Use .reduce() to collapse an array into a single value — a total, a maximum, a count, or a grouped object. The most powerful (and most feared) array method, made simple.",
  order: 7,
  steps: [
    {
      id: "why-reduce",
      type: "explanation",
      instruction: {
        heading: "reduce: many values into one",
        body: `<p><code>map</code> and <code>filter</code> give you arrays back. <code>reduce</code> is different: it boils an entire array down to a <strong>single value</strong> — a total, an average, the largest item, a count, even a new object.</p><p>It walks through the array carrying a running result called the <strong>accumulator</strong>. Your function receives the accumulator so far and the current item, and returns the new accumulator:</p><pre><code>const total = prices.reduce((sum, price) => sum + price, 0);
//                                  ^acc  ^item            ^start value</code></pre><p>That last argument (<code>0</code>) is the starting value. <code>reduce</code> has a scary reputation, but it's just "carry a result as you walk the list." Totals in shopping carts, summing scores, counting tags — all <code>reduce</code>.</p>`,
        analogy: `<code>reduce</code> is a snowball rolling downhill. It starts small (your initial value) and each item it rolls over adds to it. At the bottom, you have one big snowball — your single final result.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — always pass the start value",
            body: `Give <code>reduce</code> a starting value as the second argument (<code>0</code> for a sum, <code>[]</code> to build an array, <code>{}</code> for an object). It makes the behavior predictable and handles empty arrays gracefully — <code>[].reduce((s, n) => s + n, 0)</code> correctly returns <code>0</code>.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Array.prototype.reduce()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const prices = [10, 20, 30];

// Sum: start at 0, add each price
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total);   // 60

// Largest: start at the first guess, keep the bigger one
const nums = [4, 9, 2, 7];
const max = nums.reduce((biggest, n) => (n > biggest ? n : biggest), nums[0]);
console.log(max);     // 9`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "reduce-practice",
      type: "js-console",
      instruction: {
        heading: "Your turn: total a cart",
        body: `<p>You have a cart of items, each with a <code>price</code>. Use <code>reduce</code> to add up all the prices into a single <code>total</code>, then log it. With the given items you should get <code>175</code>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `When reducing an array of objects, reach into each item for the field you need: <code>(sum, item) => sum + item.price</code>. And don't forget the starting <code>0</code>.`,
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode: `const cart = [
  { name: "Pen", price: 5 },
  { name: "Mug", price: 20 },
  { name: "Desk", price: 150 },
];

// Use reduce to sum the prices into a "total", then log it (expect 175)
`,
        expectedOutput: ["175"],
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: [".reduce(", "price", "console.log"] },
      },
      hints: [
        "Start the accumulator at 0: <code>cart.reduce((sum, item) => sum + item.price, 0)</code>",
        "Store it and log it: <code>const total = ...; console.log(total);</code>",
      ],
    },
  ],
};
