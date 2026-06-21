import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-state-usestate",
  slug: "state-usestate",
  title: "State: Making Components Remember",
  description:
    "Use the useState hook to give a component memory that survives between renders — and watch React re-render automatically when it changes.",
  order: 6,
  steps: [
    {
      id: "why-state",
      type: "explanation",
      instruction: {
        heading: "Props come in; state lives inside",
        body: `<p>Props are data passed <em>in</em> from a parent, and they're read-only. But lots of things need to change <em>inside</em> a component over time: a like count, the text in a search box, whether a menu is open. That changing, component-owned data is called <strong>state</strong>.</p><p>You might think "I'll just use a normal variable." The problem: a plain variable change doesn't tell React to update the screen, and the variable resets to its starting value every time the component re-runs. State solves both: React remembers it between renders, and <strong>changing it tells React to re-render</strong>.</p><p>You create state with the <code>useState</code> hook:</p><pre><code>const [count, setCount] = useState(0);</code></pre><ul><li><code>count</code> — the current value (starts at <code>0</code>).</li><li><code>setCount</code> — the function you call to change it.</li><li><code>useState(0)</code> — sets the starting value.</li></ul><p>When you call <code>setCount(count + 1)</code>, React updates the value <em>and</em> re-runs the component so the screen matches. This is the magic from lesson 1, finally in your hands.</p>`,
        analogy: `State is a whiteboard a component keeps next to its desk. Props are a memo handed to it from the boss (can't be edited). The whiteboard is the component's own — it can wipe and rewrite it, and whenever it does, React repaints the part of the screen that showed it.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — the Rules of Hooks",
            body: `Functions starting with <code>use</code> (like <code>useState</code>) are called <strong>hooks</strong>. Call them only at the <strong>top level</strong> of your component — never inside an <code>if</code>, a loop, or a nested function. React relies on hooks being called in the same order every render.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — State: a component's memory",
            url: "https://react.dev/learn/state-a-components-memory",
            type: "js-concept",
          },
          {
            label: "React.dev — useState",
            url: "https://react.dev/reference/react/useState",
            type: "js-method",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "counter-interactive",
      type: "free-edit",
      instruction: {
        heading: "Build a working counter",
        body: `<p>The counter already has its state set up: <code>const [count, setCount] = useState(0)</code> and a heading that shows <code>{count}</code>. But the buttons do nothing yet — wire them up:</p><ol><li>On the <strong>+</strong> button, add <code>onClick={() => setCount(count + 1)}</code>.</li><li>On the <strong>−</strong> button, add <code>onClick={() => setCount(count - 1)}</code>.</li></ol><p>Click the buttons and watch the number change. You never touched the DOM — you changed state, and React re-rendered the heading for you.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — never change state directly",
            body: `Writing <code>count = count + 1</code> or <code>count++</code> does nothing useful — React won't notice and won't re-render. Always go through the setter: <code>setCount(count + 1)</code>. The setter is what triggers the re-render.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Responding to events",
            url: "https://react.dev/learn/responding-to-events",
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
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; text-align: center; }
    h1 { font-size: 48px; margin: 12px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function Counter() {
      const [count, setCount] = useState(0);

      return (
        <div>
          <h1>{count}</h1>
          <button>−</button>
          <button>+</button>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Counter />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["onClick", "setCount"] },
      },
      hints: [
        "On the + button: <code>&lt;button onClick={() => setCount(count + 1)}&gt;+&lt;/button&gt;</code>",
        "The arrow function matters: <code>onClick={() => setCount(count + 1)}</code>, not <code>onClick={setCount(count + 1)}</code> (which would run instantly on render).",
      ],
    },
  ],
};
