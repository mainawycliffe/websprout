import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-fetch-in-useeffect",
  slug: "fetch-in-useeffect",
  title: "Fetching in useEffect",
  description:
    "The foundational React pattern: store the result in useState, run the fetch in useEffect after the component mounts, and let the re-render show the data.",
  order: 2,
  steps: [
    {
      id: "where-fetch-goes",
      type: "explanation",
      instruction: {
        heading: "Why you can't just fetch in the component body",
        body: `<p>Your first instinct might be to call <code>fetch()</code> right inside the component function, next to your JSX. Don't — and here's why. A component function runs <strong>every time the component renders</strong>, and it must be fast and predictable (React calls this being "pure"). Fetching is slow and has side effects. If you fetched in the body, you'd fire a new request on <em>every</em> render, and each response would trigger another render, which fires another request… an infinite loop.</p><p>The right home for "do something with the outside world, after rendering" is <code>useEffect</code>. You pass it a function to run and a <strong>dependency array</strong> that controls when it runs. An empty array <code>[]</code> means "run once, right after the component first appears on screen" — exactly when you want to fetch initial data.</p>`,
        analogy: `Rendering is like a chef plating a dish — it should be quick and repeatable. Calling the supplier to order more ingredients is a different kind of task; you do it <em>after</em> service, on a schedule, not in the middle of plating every plate. <code>useEffect</code> is that scheduled "after render" slot.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the empty dependency array",
            body: `<code>useEffect(() => { ... }, [])</code> — the <code>[]</code> is the key. It tells React "no dependencies, so run this once after mount and never again." Forget the array entirely and the effect runs after <em>every</em> render — the classic infinite-fetch bug.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — You Might Not Need an Effect",
            url: "https://react.dev/learn/you-might-not-need-an-effect",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "the-fetch-effect",
      type: "explanation",
      instruction: {
        heading: "The pattern, line by line",
        body: `<p>Here is the canonical shape. Read it slowly — you'll write some version of this hundreds of times:</p><ol><li><code>useState(null)</code> holds the data. It starts <code>null</code> because there <em>is</em> no data yet.</li><li><code>useEffect(..., [])</code> runs the fetch once after mount.</li><li>Inside, an <code>async</code> function does the familiar <code>fetch</code> → <code>await response.json()</code> dance from <code>js-fetch</code>.</li><li><code>setUser(data)</code> drops the result into state, which re-renders the component with the data.</li><li>The JSX shows a fallback (<code>"Loading…"</code>) while <code>user</code> is still <code>null</code>.</li></ol><p>Notice we define the <code>async</code> function <em>inside</em> the effect and call it. The effect callback itself can't be <code>async</code> (it must return either nothing or a cleanup function), so we nest one.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — effects run after paint",
            body: `<code>useEffect</code> deliberately runs <em>after</em> the browser paints the screen. That's why the user sees your <code>"Loading…"</code> fallback first, then the data a moment later. The diagram shows this exact sequence — idle, loading, response, data on screen.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Fetching data in an Effect",
            url: "https://react.dev/reference/react/useEffect#fetching-data-with-effects",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `function UserProfile() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // The effect callback can't be async, so nest one:
    async function load() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      setUser(data); // -> re-renders with the data
    }
    load();
  }, []); // [] = run once, after the first render

  if (!user) return <p>Loading…</p>;
  return <h2>{user.name}</h2>;
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fetch-it-yourself",
      type: "free-edit",
      instruction: {
        heading: "Your turn: fetch a real user",
        body: `<p>The editor has a live React app wired to the free <strong>JSONPlaceholder</strong> API (a fake-but-real REST API developers use for practice). Finish the <code>load</code> function inside the effect:</p><ol><li><code>await fetch("https://jsonplaceholder.typicode.com/users/1")</code> and store it in <code>res</code>.</li><li><code>await res.json()</code> to parse the body, store it in <code>data</code>.</li><li>Call <code>setUser(data)</code>.</li></ol><p>When you stop typing, the PREVIEW will briefly show "Loading…", then the real user's name and email. You just fetched live data into a React component.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — if it stays on Loading…",
            body: `Make sure you called <code>setUser(data)</code> — without it, the data never reaches state and the screen is stuck on the fallback forever. Also check your URL is spelled exactly right.`,
          },
        ],
        docLinks: [
          {
            label: "JSONPlaceholder — free fake API",
            url: "https://jsonplaceholder.typicode.com/",
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
  <title>Fetch in useEffect</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; max-width: 320px; }
    h2 { margin: 0 0 4px; }
    .muted { color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function UserProfile() {
      const [user, setUser] = useState(null);

      useEffect(() => {
        async function load() {
          // TODO 1: fetch the user from
          //   https://jsonplaceholder.typicode.com/users/1
          // TODO 2: parse the JSON body
          // TODO 3: setUser(data)
        }
        load();
      }, []);

      if (!user) return <p className="muted">Loading…</p>;

      return (
        <div className="card">
          <h2>{user.name}</h2>
          <p className="muted">{user.email}</p>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<UserProfile />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["fetch", "json", "setUser"] },
      },
      hints: [
        "Line 1: <code>const res = await fetch(\"https://jsonplaceholder.typicode.com/users/1\");</code>",
        "Line 2: <code>const data = await res.json();</code>",
        "Line 3: <code>setUser(data);</code> — this is what swaps the screen from Loading… to the card.",
      ],
    },
  ],
};
