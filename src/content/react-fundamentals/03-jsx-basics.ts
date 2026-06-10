import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-jsx-basics",
  slug: "jsx-basics",
  title: "JSX: HTML Inside JavaScript",
  description:
    "Write markup that lives inside JavaScript, embed live values with curly braces, and learn why React uses className instead of class.",
  order: 3,
  steps: [
    {
      id: "what-is-jsx",
      type: "explanation",
      instruction: {
        heading: "JSX is markup that JavaScript understands",
        body: `<p>The HTML-looking code you returned from <code>App</code> is called <strong>JSX</strong>. It looks like HTML, but it lives <em>inside</em> a JavaScript file, and Babel translates it into regular function calls before the browser runs it.</p><p>Why invent JSX at all? Because UI is mostly markup, and writing markup as nested function calls by hand is unreadable. JSX lets you write the <em>shape</em> of your UI the way you already think about HTML, while still having the full power of JavaScript right next to it.</p><p>Three rules make JSX feel different from plain HTML:</p><ul><li><strong>One root element.</strong> A component must return a single top-level element. If you need siblings, wrap them in a <code>&lt;div&gt;</code> or an empty <em>Fragment</em> <code>&lt;&gt;...&lt;/&gt;</code>.</li><li><strong>Every tag must close.</strong> Even self-closing ones: <code>&lt;br /&gt;</code>, <code>&lt;img src="..." /&gt;</code>.</li><li><strong><code>className</code>, not <code>class</code>.</strong> <code>class</code> is a reserved word in JavaScript, so React uses <code>className</code> for the CSS class attribute.</li></ul>`,
        analogy: `JSX is like writing a letter where you can drop in live facts mid-sentence: "Dear {customerName}, your order ships in {daysLeft} days." The fixed words are the markup; the {curly braces} are where JavaScript fills in real values.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Because <code>class</code>, <code>for</code>, and a few other words are reserved in JavaScript, JSX renames them: <code>class</code> becomes <code>className</code> and the label <code>for</code> attribute becomes <code>htmlFor</code>. Everything else maps to the standard HTML attribute names you already know.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Writing markup with JSX",
            url: "https://react.dev/learn/writing-markup-with-jsx",
            type: "js-concept",
          },
          {
            label: "React.dev — JavaScript in JSX with curly braces",
            url: "https://react.dev/learn/javascript-in-jsx-with-curly-braces",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "jsx-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Fill in the JSX",
        body: `<p>This component should greet a person by name and give the heading a CSS class. Fill in the two blanks:</p><ul><li>the attribute React uses for a CSS class (it is <em>not</em> <code>class</code>);</li><li>the curly-brace expression that drops the <code>name</code> variable into the text.</li></ul>`,
      },
      config: {
        type: "gap-fill",
        template: `function Greeting() {
  const name = "Ada";
  return <h1 {{a}}="title">Hello, {{b}}!</h1>;
}`,
        gaps: [
          {
            id: "a",
            placeholder: "CSS class attribute",
            acceptedAnswers: ["className"],
            caseSensitive: true,
          },
          {
            id: "b",
            placeholder: "insert the name variable",
            acceptedAnswers: ["{name}"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b"] } },
      hints: [
        "JavaScript reserves the word <code>class</code>, so React spells the class attribute <code>className</code>.",
        "To show a variable inside JSX, wrap it in curly braces: <code>{name}</code>.",
      ],
    },
    {
      id: "jsx-interactive",
      type: "free-edit",
      instruction: {
        heading: "Drop live values into JSX",
        body: `<p>The editor has three variables — <code>product</code>, <code>price</code>, and <code>quantity</code> — and a <code>.card</code> style is ready in the CSS. Finish the <code>App</code> component so it shows a little receipt:</p><ol><li>Give the wrapping <code>&lt;div&gt;</code> a <code>className="card"</code> so it picks up the styling.</li><li>Add an <code>&lt;h2&gt;</code> that shows the product name with <code>{product}</code>.</li><li>Add a line showing the total — put the calculation right in the braces: <code>{price * quantity}</code>.</li></ol><p>JSX runs real JavaScript inside <code>{ }</code>, so math, string joins, and function calls all work there.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Anything between <code>{ }</code> is plain JavaScript that gets evaluated and shown. <code>{2 + 2}</code> renders <code>4</code>. But you can only put <em>expressions</em> (things with a value) there — not statements like <code>if</code> or <code>for</code>.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — JavaScript in JSX",
            url: "https://react.dev/learn/javascript-in-jsx-with-curly-braces",
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
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    .card { max-width: 260px; padding: 16px 20px; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.1); }
    .card h2 { margin: 0 0 8px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    function App() {
      const product = "Notebook";
      const price = 3;
      const quantity = 4;

      return (
        <div>
          {/* 1. Add className="card" to the div above
              2. Add an <h2> showing {product}
              3. Show the total with {price * quantity} */}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["className", "{product}"] },
      },
      hints: [
        'Change the opening tag to <code>&lt;div className="card"&gt;</code>.',
        "Inside the div, add <code>&lt;h2&gt;{product}&lt;/h2&gt;</code> and a <code>&lt;p&gt;Total: ${price * quantity}&lt;/p&gt;</code>.",
        "The braces run JavaScript: <code>{price * quantity}</code> shows <code>12</code>.",
      ],
    },
  ],
};
