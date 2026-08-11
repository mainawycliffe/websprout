import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-lists-and-keys",
  slug: "lists-and-keys",
  title: "Rendering Lists with map and keys",
  description:
    "Turn an array of data into a list of elements with .map(), and learn why React needs a key on every list item.",
  order: 9,
  steps: [
    {
      id: "why-lists",
      type: "explanation",
      instruction: {
        heading: "From an array of data to a list of UI",
        body: `<p>Almost every screen is a list: the <strong>YouTube</strong> grid of videos, <strong>Google</strong>'s search results, the rows in your email inbox. You don't write each one by hand — you have an <em>array</em> of data and turn it into UI.</p><p>React uses plain JavaScript for this: the array <code>.map()</code> method, which transforms each item into a piece of JSX.</p><pre><code>const fruits = ["Apple", "Mango", "Lime"];

&lt;ul&gt;
  {fruits.map((fruit) =&gt; (
    &lt;li key={fruit}&gt;{fruit}&lt;/li&gt;
  ))}
&lt;/ul&gt;</code></pre><p>You'll notice each <code>&lt;li&gt;</code> has a <code>key</code> prop. That's required for lists — and the next step explains why.</p>`,
        analogy: `<code>.map()</code> is an assembly line. Raw parts (data) go in one end; each one gets stamped into the same finished product (a list item); a row of identical-shaped products comes out. You design the stamp once.`,
        docLinks: [
          {
            label: "React.dev — Rendering lists",
            url: "https://react.dev/learn/rendering-lists",
            type: "js-concept",
          },
          {
            label: "MDN — Array.prototype.map()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
            type: "js-method",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "why-keys",
      type: "explanation",
      instruction: {
        heading: "Why every list item needs a key",
        body: `<p>When a list changes — an item is added, removed, or reordered — React needs to figure out <em>which</em> items changed so it can update only those, instead of rebuilding the whole list. The <code>key</code> is a stable ID that tells React "this is the same item as before."</p><p>Without keys, React can't track items reliably: it may reuse the wrong DOM node, lose an input's text, or animate the wrong row. With good keys, updates are fast and correct.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — choose stable keys",
            body: `A key should be a <strong>stable, unique ID</strong> from your data — a database id, a username, a product SKU. Avoid using the array <em>index</em> as the key when the list can reorder or items can be inserted/removed, because the index of an item changes and React gets confused.`,
          },
          {
            variant: "tip",
            title: "Tip",
            body: `The key goes on the <em>outermost</em> element returned inside <code>.map()</code>, and it's just for React — you can't read it back as a prop inside the component.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Keeping list items in order with key",
            url: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "lists-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Add the key",
        body: `<p>This list maps over an array of fruit names. Fill in the prop name React needs on each list item so it can track them.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `function FruitList() {
  const fruits = ["Apple", "Mango", "Lime"];
  return (
    <ul>
      {fruits.map((fruit) => (
        <li {{a}}={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}`,
        gaps: [
          {
            id: "a",
            placeholder: "the list-tracking prop",
            acceptedAnswers: ["key"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a"] } },
      hints: [
        "React needs a stable id on each item: the <code>key</code> prop.",
      ],
    },
    {
      id: "lists-interactive",
      type: "free-edit",
      instruction: {
        heading: "Render a list from data",
        body: `<p>The <code>tasks</code> array is ready. Render it as a bulleted list:</p><ol><li>Inside the <code>&lt;ul&gt;</code>, call <code>{tasks.map((task) => ...)}</code>.</li><li>For each task, return an <code>&lt;li&gt;</code> with the task text inside.</li><li>Give each <code>&lt;li&gt;</code> a <code>key={task}</code>.</li></ol><p>Try adding another string to the <code>tasks</code> array — your list grows automatically, because the UI is built from the data.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Here the strings are unique, so <code>key={task}</code> works. With real data you'd usually map objects and use <code>key={item.id}</code>.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Rendering lists",
            url: "https://react.dev/learn/rendering-lists",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "html-js",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>React Playground</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    li { margin: 4px 0; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    function TaskList() {
      const tasks = ["Water the plants", "Read a chapter", "Call a friend"];

      return (
        <div>
          <h2>Today</h2>
          <ul>
            {/* Map over tasks: return an <li key={task}>{task}</li> for each */}
          </ul>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<TaskList />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["tasks.map", "key=", "<li"] },
      },
      hints: [
        "Inside the &lt;ul&gt;: <code>{tasks.map((task) => &lt;li key={task}&gt;{task}&lt;/li&gt;)}</code>",
        "Each item needs a key so React can track it: <code>key={task}</code>.",
      ],
    },
    {
      id: "lists-challenge",
      type: "code-challenge",
      difficulty: "intermediate",
      instruction: {
        heading: "Challenge: show only what is in stock",
        body: `<p>Write a <code>ProductList</code> component that receives a single prop, <code>products</code> — an array of objects shaped like <code>{ id, name, inStock }</code>.</p><p>Render a <code>&lt;ul&gt;</code> containing one <code>&lt;li&gt;</code> per product, showing the product's <code>name</code>. But only the products where <code>inStock</code> is <code>true</code> should appear.</p><p>This is two problems stacked, and the order you solve them in matters: <strong>narrow the array first, then turn what is left into elements.</strong> Trying to do both inside one <code>map</code> is where this usually goes wrong — <code>map</code> always returns one output per input, so it cannot drop anything on its own.</p><p>One test passes an empty array. Decide what your component should do with it before you run the tests.</p>`,
        analogy:
          "Sorting the post. First you throw out the junk mail (filter), then you put what is left into pigeonholes (map). Doing it in one pass means junk ends up in a pigeonhole.",
        docLinks: [
          {
            label: "React.dev — Rendering lists",
            url: "https://react.dev/learn/rendering-lists",
            type: "js-concept",
          },
          {
            label: "MDN: Array.prototype.filter()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "A <code>&lt;ul&gt;</code> may only contain <code>&lt;li&gt;</code> elements as children. Screen readers announce the list and its item count from that structure, so wrapping items in stray <code>&lt;div&gt;</code>s breaks the announcement even though it looks identical on screen.",
          },
          {
            variant: "tip",
            title: "Tip — keys come from the data, not the loop",
            body: "Use <code>key={product.id}</code>, not the map index. When the filtered list changes, indexes shift and React reuses the wrong DOM node — the classic symptom is a checkbox or input staying with the wrong row.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "ProductList",
        componentName: "ProductList",
        language: "react",
        starterCode:
          "function ProductList({ products }) {\n  // 1. Keep only the products where inStock is true.\n  // 2. Turn each remaining product into an <li> showing its name.\n  // 3. Give every <li> a key from the product's id.\n  return (\n    <ul>\n    </ul>\n  );\n}\n",
        tests: [
          {
            name: "renders one item per in-stock product",
            render: {
              props: {
                products: [
                  { id: 1, name: "Keyboard", inStock: true },
                  { id: 2, name: "Mouse", inStock: true },
                ],
              },
              assert: "return container.querySelectorAll('li').length;",
            },
            expected: 2,
          },
          {
            name: "leaves out the out-of-stock ones",
            render: {
              props: {
                products: [
                  { id: 1, name: "Keyboard", inStock: true },
                  { id: 2, name: "Mouse", inStock: false },
                  { id: 3, name: "Monitor", inStock: true },
                ],
              },
              assert: "return [...container.querySelectorAll('li')].map(li => li.textContent);",
            },
            expected: ["Keyboard", "Monitor"],
          },
          {
            name: "renders an empty list when nothing is in stock",
            render: {
              props: { products: [{ id: 1, name: "Keyboard", inStock: false }] },
              assert: "return container.querySelectorAll('li').length;",
            },
            expected: 0,
          },
          {
            name: "survives an empty array",
            render: { props: { products: [] }, assert: "return container.querySelectorAll('li').length;" },
            expected: 0,
          },
          {
            name: "still uses a real <ul>",
            render: { props: { products: [{ id: 1, name: "Keyboard", inStock: true }] }, assert: "return container.querySelector('ul') !== null;" },
            expected: true,
          },
        ],
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Filter first, then map: <code>products.filter((p) => p.inStock).map(...)</code>",
        "Each item: <code>&lt;li key={p.id}&gt;{p.name}&lt;/li&gt;</code>",
        "Put the whole expression inside the <code>&lt;ul&gt;</code> in braces. An empty array maps to an empty list all on its own — you do not need a special case for it.",
      ],
    },
  ],
};
