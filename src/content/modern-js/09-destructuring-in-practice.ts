import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-destructuring-in-practice",
  slug: "destructuring-in-practice",
  title: "Destructuring in Practice",
  description:
    "Pull values straight out of objects and arrays — in function parameters (the React props pattern), in the useState shape, and while looping objects with Object.entries.",
  order: 9,
  steps: [
    {
      id: "destructuring-recap",
      type: "explanation",
      instruction: {
        heading: "Unpack values where you need them",
        body: `<p>Destructuring pulls properties out of an object (or items out of an array) into their own variables. You've met it before — here's how it shows up constantly in real apps:</p><ul><li><strong>In function parameters</strong> — the React props pattern. Instead of <code>function Card(props)</code> then <code>props.title</code> everywhere, you destructure right in the parentheses: <code>function Card({ title, price })</code>.</li><li><strong>Array destructuring</strong> — the exact shape of React's <code>useState</code>: <code>const [count, setCount] = useState(0)</code> unpacks a two-item array into two named variables.</li></ul><p>Same tool, two everyday uses. Recognizing them now means React's syntax won't surprise you.</p>`,
        analogy: `Destructuring is unpacking a delivery box and putting each item straight onto its shelf, instead of carrying the whole box around and reaching in every time you need something.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Array destructuring is <strong>positional</strong> (the first variable gets the first item), which is why <code>useState</code> returns <code>[value, setter]</code> in that order. Object destructuring is <strong>by name</strong>, which is why prop order never matters.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Destructuring assignment",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Object destructuring in a parameter (the React "props" pattern):
function describe({ name, role }) {
  return name + " is an " + role;
}
console.log(describe({ name: "Ada", role: "admin" }));   // "Ada is an admin"

// Array destructuring (the useState shape):
const pair = ["dark", true];
const [theme, enabled] = pair;
console.log(theme, enabled);   // dark true`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "object-iteration",
      type: "explanation",
      instruction: {
        heading: "Looping objects with keys, values, entries",
        body: `<p>Arrays have <code>map</code>/<code>filter</code>, but plain objects don't loop directly. The <code>Object</code> helpers turn an object into arrays you <em>can</em> loop:</p><ul><li><code>Object.keys(obj)</code> → array of the property names.</li><li><code>Object.values(obj)</code> → array of the values.</li><li><code>Object.entries(obj)</code> → array of <code>[key, value]</code> pairs.</li></ul><p><code>Object.entries</code> pairs beautifully with destructuring: loop the pairs and unpack each <code>[key, value]</code> right in the callback. This is how you'd render a settings panel or a key/value table from an object.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `<code>Object.entries(obj).map(([key, value]) => ...)</code> is a workhorse pattern — it converts an object into an array of UI rows, ready to render. Note the <code>[key, value]</code> destructuring inside the callback's parentheses.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Object.entries()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const scores = { math: 90, science: 85, art: 95 };

console.log(Object.keys(scores));     // ["math", "science", "art"]
console.log(Object.values(scores));   // [90, 85, 95]

// entries + destructuring: loop key/value pairs
Object.entries(scores).forEach(([subject, score]) => {
  console.log(subject + ": " + score);
});`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "destructuring-practice",
      type: "js-console",
      instruction: {
        heading: "Your turn: print a price list",
        body: `<p>You have a <code>prices</code> object. Use <code>Object.entries</code> with destructuring to log one line per item like <code>"pen costs 5"</code>. You should see all three lines.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `const prices = { pen: 5, mug: 20, desk: 150 };

// Use Object.entries(prices) and destructure [item, price] to log
// "pen costs 5", "mug costs 20", "desk costs 150"
`,
        expectedOutput: ["pen costs 5", "mug costs 20", "desk costs 150"],
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["Object.entries", "console.log"] },
      },
      hints: [
        "Loop the pairs: <code>Object.entries(prices).forEach(([item, price]) => { ... });</code>",
        'Log inside: <code>console.log(item + " costs " + price);</code>',
      ],
    },
  ],
};
