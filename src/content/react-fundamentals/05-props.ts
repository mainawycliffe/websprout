import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-props",
  slug: "props",
  title: "Props: Passing Data to Components",
  description:
    "Make one component show different data by passing it props — the mechanism behind every reusable card, button, and list item.",
  order: 5,
  steps: [
    {
      id: "why-props",
      type: "explanation",
      instruction: {
        heading: "Same component, different data",
        body: `<p>A <code>Greeting</code> that always says the exact same thing isn't very useful. Real components take <strong>props</strong> — short for "properties" — which are values you pass in, exactly like attributes on an HTML tag.</p><p>This is how one component powers a whole feed. <strong>Netflix</strong> renders one <code>&lt;MovieCard /&gt;</code> component, but passes each one a different <code>title</code>, <code>image</code>, and <code>rating</code> prop. <strong>Twitter/X</strong> renders one <code>&lt;Tweet /&gt;</code> with a different <code>author</code> and <code>text</code> each time.</p><p>You pass props like attributes: <code>&lt;MovieCard title="Dune" year={2021} /&gt;</code>. Inside the component, you receive them as an object — and the clean way to read them is to destructure: <code>function MovieCard({ title, year }) { ... }</code>.</p>`,
        analogy: `A component is a cookie cutter; props are the dough and icing. The cutter (shape) stays the same, but each cookie can be a different flavor and color. One <code>&lt;ProductCard /&gt;</code> cutter, a hundred different products.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Props flow <strong>one way</strong>: from parent down to child. And they are <strong>read-only</strong> — a component must never change its own props. If you need a value that changes over time, that's <em>state</em> (the next lesson), not props.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Passing props to a component",
            url: "https://react.dev/learn/passing-props-to-a-component",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "props-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Receive and use a prop",
        body: `<p>This badge component should be used like <code>&lt;UserBadge name="Ada" /&gt;</code>. Fill in the two blanks so it:</p><ul><li>destructures the <code>name</code> prop from the props object in the function's parentheses;</li><li>shows that name inside the <code>&lt;span&gt;</code>.</li></ul>`,
      },
      config: {
        type: "gap-fill",
        template: `function UserBadge({{a}}) {
  return <span className="badge">{{b}}</span>;
}

// Used like: <UserBadge name="Ada" />`,
        gaps: [
          {
            id: "a",
            placeholder: "destructure the name prop",
            acceptedAnswers: ["{ name }", "{name}"],
            caseSensitive: true,
          },
          {
            id: "b",
            placeholder: "show the name",
            acceptedAnswers: ["{name}", "{ name }"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b"] } },
      hints: [
        "Destructuring in the parameter list pulls the prop out by name: <code>function UserBadge({ name }) {</code>",
        "Then show it in JSX with curly braces: <code>{name}</code>.",
      ],
    },
    {
      id: "props-interactive",
      type: "free-edit",
      instruction: {
        heading: "One card, many movies",
        body: `<p>Build a reusable movie card and use it for several films.</p><ol><li>Create <code>function Movie({ title, year })</code> that returns a card showing the title in an <code>&lt;h3&gt;</code> and the year below it.</li><li>In <code>App</code>, render <code>&lt;Movie /&gt;</code> three times, each with a different <code>title=</code> and <code>year=</code>.</li></ol><p>Pass text props in quotes (<code>title="Dune"</code>) and number props in braces (<code>year={2021}</code>).</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Text values use quotes: <code>title="Dune"</code>. Anything that isn't a plain string — numbers, booleans, arrays, variables — goes in braces: <code>year={2021}</code>. Mixing these up is the most common beginner props mistake.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Passing props to a component",
            url: "https://react.dev/learn/passing-props-to-a-component",
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
    .movie { display: inline-block; width: 150px; margin: 6px; padding: 12px; border-radius: 10px; background: #f1f5f9; vertical-align: top; }
    .movie h3 { margin: 0 0 4px; font-size: 16px; }
    .movie span { color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // 1. Create the Movie component here. It receives { title, year } and
    //    returns a <div className="movie"> with an <h3> and a <span>.


    function App() {
      return (
        <div>
          {/* 2. Render <Movie /> three times with different title and year props */}
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
        criteria: { keywords: ["function Movie", "title=", "<Movie"] },
      },
      hints: [
        "Component: <code>function Movie({ title, year }) { return &lt;div className=\"movie\"&gt;&lt;h3&gt;{title}&lt;/h3&gt;&lt;span&gt;{year}&lt;/span&gt;&lt;/div&gt;; }</code>",
        'Use it: <code>&lt;Movie title="Dune" year={2021} /&gt;</code> — string in quotes, number in braces.',
      ],
    },
  ],
};
