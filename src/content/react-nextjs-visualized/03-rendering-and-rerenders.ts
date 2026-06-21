import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-rendering-and-rerenders",
  slug: "rendering-and-rerenders",
  title: "Rendering & Re-renders: When and Why",
  description:
    "The #1 thing that confuses beginners — when does a component re-run, and what actually changes on screen?",
  order: 3,
  steps: [
    {
      id: "what-triggers-a-render",
      type: "explanation",
      instruction: {
        heading: "A state change re-runs the component",
        body: `<p>"Rendering" sounds mysterious, but it just means: <strong>React calls your component function and looks at what it returns.</strong> A render is a function call.</p><p>React re-runs a component for exactly two reasons: its <strong>state</strong> changed (you called a <code>set…</code> function), or its <strong>props</strong> changed (its parent re-rendered and passed something new). Nothing else. Not a mouse moving, not a timer ticking — unless that event calls a state setter.</p><p>The diagram shows <code>setCount</code> firing: the <code>&lt;Counter /&gt;</code> function runs again, produces fresh JSX, and the render count climbs. This is why your component body runs over and over — every state update is a brand-new call.</p>`,
        analogy: `Think of a spreadsheet cell with a formula. When a value it depends on changes, the cell recalculates automatically. A React component is that formula: change its inputs (state or props) and it recomputes its output (the UI).`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — state setters schedule, they don't mutate",
            body: `Calling <code>setCount(count + 1)</code> doesn't change <code>count</code> on the spot. It <em>schedules</em> a re-render with the new value. That's why reading <code>count</code> right after setting it still shows the old value — the new one arrives on the next render.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Render and commit",
            url: "https://react.dev/learn/render-and-commit",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "only-the-subtree-rerenders",
      type: "explanation",
      instruction: {
        heading: "Re-render ≠ repaint the whole page",
        body: `<p>A common fear: "if my component re-renders constantly, isn't that slow?" Usually no — and the diagram shows why.</p><p>When state changes, React re-runs that component <em>and its children</em>, but it leaves unrelated branches (like <code>&lt;Sidebar /&gt;</code>) alone. Then it compares the new output to the old one and updates only the actual DOM nodes that differ. Re-running a function is cheap; touching the DOM is the expensive part, and React minimizes that for you.</p><p>So "re-render" means "re-run the function and reconcile," not "rebuild the page from scratch." Understanding this kills a lot of premature-optimization anxiety — most re-renders are completely fine.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — the DOM is the slow part",
            body: `Reading and writing the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model">DOM</a> forces the browser to recalculate layout and repaint. React's job is to batch and minimize those DOM operations. Re-running your JavaScript function is comparatively trivial.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Keeping components pure",
            url: "https://react.dev/learn/keeping-components-pure",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "watch-renders",
      type: "free-edit",
      instruction: {
        heading: "Make a render visible",
        body: `<p>You can't see renders directly, so let's log them. Each time a component function runs, the line at the top of its body runs too.</p><ol><li>Add <code>console.log("Counter rendered");</code> as the first line inside <code>Counter</code>.</li><li>Add a button that calls <code>setCount(count + 1)</code>.</li></ol><p>Open the preview, click the button a few times, and watch the console: one log per click. Each click changed state, which re-ran the function. <strong>That</strong> is a render.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — double logs in development are normal",
            body: `React's Strict Mode intentionally runs components twice in development to help you catch bugs. If you see two logs per render in a real project, that's the safety check — it doesn't happen in production.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — useState",
            url: "https://react.dev/reference/react/useState",
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
  <title>Watch renders</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; }
    button { font-size: 16px; padding: 8px 16px; border-radius: 10px; border: 1px solid #bbf7d0; background: #f0fdf4; cursor: pointer; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function Counter() {
      // TODO: log here so you can see each render
      const [count, setCount] = useState(0);
      return (
        <div>
          <h2>Count: {count}</h2>
          {/* TODO: a button that calls setCount(count + 1) */}
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
        criteria: { keywords: ["console.log", "setCount(count + 1)", "onClick"] },
      },
      hints: [
        "First line inside Counter: <code>console.log(\"Counter rendered\");</code>",
        "Add the button: <code>&lt;button onClick={() =&gt; setCount(count + 1)}&gt;Add&lt;/button&gt;</code>",
      ],
    },
  ],
};
