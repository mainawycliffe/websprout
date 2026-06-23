import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-custom-fetch-hook",
  slug: "custom-fetch-hook",
  title: "Extracting a useFetch Hook",
  description:
    "The loading/error/data pattern repeats in every component. Bundle it into a reusable custom hook so each component just says: const { data, loading, error } = useFetch(url).",
  order: 8,
  steps: [
    {
      id: "spot-the-repetition",
      type: "explanation",
      instruction: {
        heading: "You've written the same eight lines five times",
        body: `<p>Look back at the last few lessons. Every fetching component declared the same three states (<code>data</code>, <code>loading</code>, <code>error</code>), ran the same effect shape (try/catch/finally, set states, cleanup), and differed only in the URL. That repetition is a smell — and the React answer is a <strong>custom hook</strong>.</p><p>A custom hook is just a function whose name starts with <code>use</code> and that calls other hooks inside. It lets you extract stateful logic and reuse it across components, exactly like extracting a regular function — but one that's allowed to use <code>useState</code> and <code>useEffect</code>. You'll wrap the whole fetching dance into <code>useFetch(url)</code> and return <code>{ data, loading, error }</code>.</p>`,
        analogy: `It's like writing a recipe card. The first few times you make the dish, you look up each step. Once you've done it five times, you write the recipe down once and just follow the card. <code>useFetch</code> is the recipe card for "fetch a URL into state with loading and error handling."`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — the Rules of Hooks still apply",
            body: `Custom hooks must follow the same rules as built-in ones: call them at the top level of a component or another hook, never inside loops, conditions, or nested functions. The <code>use</code> prefix is how React's tooling knows a function is a hook and enforces these rules.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Reusing logic with custom Hooks",
            url: "https://react.dev/learn/reusing-logic-with-custom-hooks",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "extract-usefetch",
      type: "explanation",
      instruction: {
        heading: "useFetch, the whole thing in one function",
        body: `<p>Here is the extraction. Notice it's almost a copy-paste of what you already wrote — the only new idea is that it <code>return</code>s the three states as an object so any component can read them. The <code>url</code> goes in the dependency array, so the hook refetches if the caller passes a new URL (combining everything from lessons 3, 6, and 7).</p><p>Now a component that needs data shrinks to a single line: <code>const { data, loading, error } = useFetch(someUrl);</code>. The messy logic lives in one tested place, and your components stay focused on <em>rendering</em>. This is the same idea behind libraries like SWR and TanStack Query — they're essentially very powerful <code>useFetch</code> hooks, which is the next lesson.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — return an object, not an array",
            body: `Returning <code>{ data, loading, error }</code> lets callers destructure only what they need and rename freely (<code>const { data: user } = useFetch(...)</code>). It's clearer than a positional array once you have three or more values.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Custom Hooks: sharing logic",
            url: "https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        if (!ignore) setData(json);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [url]);

  return { data, loading, error };
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-usefetch",
      type: "free-edit",
      instruction: {
        heading: "Your turn: use your own hook",
        body: `<p>The <code>useFetch</code> hook is already defined at the top of the file. Your job is to <strong>use</strong> it in the <code>Album</code> component and render its result — proving how much smaller a component becomes once the logic is extracted.</p><ol><li>Call the hook: <code>const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/albums/1");</code></li><li>Return a loading message when <code>loading</code> is true.</li><li>Return the error when <code>error</code> is truthy.</li><li>Otherwise show <code>data.title</code>.</li></ol><p>Notice the component is now mostly rendering — no <code>useEffect</code>, no try/catch in sight. That's the payoff.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — guard before reading data",
            body: `Because <code>data</code> starts as <code>null</code>, you must return for the loading and error cases <em>before</em> you reach <code>data.title</code> — otherwise you risk reading a property of <code>null</code>.`,
          },
        ],
        docLinks: [
          {
            label: "JSONPlaceholder — /albums/{id}",
            url: "https://jsonplaceholder.typicode.com/albums/1",
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
  <title>useFetch Hook</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; max-width: 340px; }
    h2 { margin: 0; text-transform: capitalize; }
    .muted { color: #64748b; }
    .error { color: #dc2626; font-weight: 600; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    // --- Reusable custom hook (already written for you) ---
    function useFetch(url) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        let ignore = false;
        async function load() {
          try {
            setLoading(true);
            setError(null);
            const res = await fetch(url);
            if (!res.ok) throw new Error("HTTP " + res.status);
            const json = await res.json();
            if (!ignore) setData(json);
          } catch (err) {
            if (!ignore) setError(err.message);
          } finally {
            if (!ignore) setLoading(false);
          }
        }
        load();
        return () => { ignore = true; };
      }, [url]);

      return { data, loading, error };
    }

    // --- Your component ---
    function Album() {
      // TODO 1: call useFetch with the albums/1 URL and destructure data, loading, error
      // TODO 2: if (loading) return ...
      // TODO 3: if (error) return ...
      // TODO 4: return the album title in the card

      return <div className="card"><h2>Replace me</h2></div>;
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Album />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["useFetch", "loading", "data.title"] },
      },
      hints: [
        "Line 1: <code>const { data, loading, error } = useFetch(\"https://jsonplaceholder.typicode.com/albums/1\");</code>",
        "Guards: <code>if (loading) return &lt;p className=\"muted\"&gt;Loading…&lt;/p&gt;;</code> then <code>if (error) return &lt;p className=\"error\"&gt;{error}&lt;/p&gt;;</code>",
        "Success: <code>return &lt;div className=\"card\"&gt;&lt;h2&gt;{data.title}&lt;/h2&gt;&lt;/div&gt;;</code>",
      ],
    },
  ],
};
