import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-useeffect-basics",
  slug: "useeffect-basics",
  title: "Side Effects with useEffect",
  description:
    "Run code that reaches outside React — timers, the document title, subscriptions — after a render, and control when it runs with the dependency array.",
  order: 10,
  steps: [
    {
      id: "why-effects",
      type: "explanation",
      instruction: {
        heading: "Talking to the world outside React",
        body: `<p>So far your components just calculate JSX from props and state — pure and predictable. But real apps also need to reach <em>outside</em>: set the browser tab title, start a timer, focus an input, connect to a chat server, save to <code>localStorage</code>. These are <strong>side effects</strong> — work that isn't "return the UI."</p><p>You can't do that work directly in the component body, because React runs that code on every render and you'd fire the effect over and over. The <code>useEffect</code> hook gives effects a proper home: React runs them <em>after</em> it has updated the screen.</p><pre><code>useEffect(() =&gt; {
  document.title = "Clicked " + count + " times";
}, [count]);</code></pre><p>The second argument — <code>[count]</code> — is the <strong>dependency array</strong>. It tells React "only re-run this effect when <code>count</code> changes." That control is the whole point.</p>`,
        analogy: `A component's job is to paint the picture. An effect is the chore you do <em>after</em> hanging the painting: turn on the gallery light, update the little plaque, start the background music. The dependency array is your note saying "only redo the plaque if the painting's title changed."`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — the dependency array",
            body: `<ul><li><code>[count]</code> — run after renders where <code>count</code> changed.</li><li><code>[]</code> — run <strong>once</strong>, after the first render (great for setup like starting a timer).</li><li>No array at all — run after <em>every</em> render (rarely what you want).</li></ul>`,
          },
          {
            variant: "tip",
            title: "Tip — clean up after yourself",
            body: `If your effect starts something ongoing (a <code>setInterval</code>, an event listener, a connection), return a function from it that stops it. React runs that cleanup before the next effect and when the component is removed: <code>return () => clearInterval(id);</code>`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Synchronizing with effects",
            url: "https://react.dev/learn/synchronizing-with-effects",
            type: "js-concept",
          },
          {
            label: "React.dev — useEffect",
            url: "https://react.dev/reference/react/useEffect",
            type: "js-method",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "effect-interactive",
      type: "free-edit",
      instruction: {
        heading: "Sync the page title to your counter",
        body: `<p>This counter works, but the browser tab title stays the same. Add an effect that keeps the tab title in sync with the count.</p><ol><li>Below the state line, add a <code>useEffect</code>.</li><li>Inside it, set <code>document.title = "Clicked " + count + " times";</code></li><li>Pass <code>[count]</code> as the dependency array so it re-runs whenever the count changes.</li></ol><p>Click the button and watch the browser tab's title update (look at the PREVIEW tab's document title). You've connected React state to something outside React.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Forgetting the <code>[count]</code> dependency makes the effect run after <em>every</em> render; passing the wrong dependencies can make it run too rarely. Match the array to the values your effect actually reads.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — useEffect",
            url: "https://react.dev/reference/react/useEffect",
            type: "js-method",
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
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; text-align: center; }
    h1 { font-size: 48px; margin: 12px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function Counter() {
      const [count, setCount] = useState(0);

      // Add a useEffect here that updates document.title when count changes.

      return (
        <div>
          <p>Look at the preview's tab title as you click.</p>
          <h1>{count}</h1>
          <button onClick={() => setCount(count + 1)}>Click me</button>
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
        criteria: { keywords: ["useEffect", "document.title", "[count]"] },
      },
      hints: [
        'Add: <code>useEffect(() => { document.title = "Clicked " + count + " times"; }, [count]);</code>',
        "The <code>[count]</code> at the end is the dependency array — it limits when the effect re-runs.",
      ],
    },
  ],
};
