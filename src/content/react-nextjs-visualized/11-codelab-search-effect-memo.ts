import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-codelab-search-effect-memo",
  slug: "codelab-search-effect-memo",
  title: "Codelab: Search with Effects & Memos",
  description:
    "Hands-on — build a live search box that loads data with useEffect and filters it with useMemo, watching renders along the way.",
  order: 11,
  steps: [
    {
      id: "codelab-b-brief",
      type: "explanation",
      instruction: {
        heading: "The brief: load, then filter",
        body: `<p>You'll build a small <strong>search box</strong> that does two very common jobs: it <strong>loads</strong> a list of items once when the screen opens (a side effect), and it <strong>filters</strong> that list as you type (a derived value worth memoizing).</p><p>This pairs the two hooks from this module: <code>useEffect</code> for the one-time load, and <code>useMemo</code> for the per-keystroke filter. Along the way you'll log renders so you can <em>see</em> the difference memoization makes.</p><p>It runs live in the preview with React from a CDN. Build it step by step; the last step is yours to extend.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — load is an effect, filter is not",
            body: `Loading data reaches outside React (a fetch, a timer) → that's a <code>useEffect</code>. Filtering an array you already have is pure computation from state → that's just a value (optionally wrapped in <code>useMemo</code>), never an effect.`,
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
      id: "codelab-b-load",
      type: "free-edit",
      instruction: {
        heading: "Step 1 — load items once with useEffect",
        body: `<p>We'll simulate loading from a server with a short timer. When the component mounts, kick off the "fetch" and store the result in state.</p><ol><li>In a <code>useEffect</code> with an empty <code>[]</code> dependency array, call <code>setItems(DATA)</code> after a <code>setTimeout</code> of 500ms to mimic a network delay.</li><li>While <code>items</code> is empty, show "Loading…".</li></ol><p>The empty array is doing the work: it means "run this once, after the first render" — exactly the behavior you visualized in the useEffect lesson.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — clear the timer in cleanup",
            body: `Return <code>() =&gt; clearTimeout(id)</code> from the effect so that if the component unmounts before the timer fires, you don't call <code>setItems</code> on a component that's gone.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Fetching data in an Effect",
            url: "https://react.dev/learn/synchronizing-with-effects#fetching-data",
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
  <title>Codelab — load with effect</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; }
    li { padding: 3px 0; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;
    const DATA = ["React", "Next.js", "Svelte", "Vue", "Angular", "Solid", "Astro", "Remix"];

    function Search() {
      const [items, setItems] = useState([]);

      useEffect(() => {
        // TODO: after 500ms, setItems(DATA); return a cleanup that clears the timer
      }, []);

      if (items.length === 0) return <p>Loading…</p>;

      return <ul>{items.map((it) => <li key={it}>{it}</li>)}</ul>;
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Search />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["setTimeout", "setItems(DATA)", "clearTimeout", "return"] },
      },
      hints: [
        "Inside the effect: <code>const id = setTimeout(() =&gt; setItems(DATA), 500);</code>",
        "Then return cleanup: <code>return () =&gt; clearTimeout(id);</code>",
      ],
    },
    {
      id: "codelab-b-filter",
      type: "free-edit",
      instruction: {
        heading: "Step 2 — filter with useMemo and watch renders",
        body: `<p>Now add the search input and derive the visible list with <code>useMemo</code>. We'll log inside the memo so you can see it only runs when it should.</p><ol><li>Add a <code>query</code> state and an <code>&lt;input&gt;</code> bound to it.</li><li>Compute <code>visible</code> with <code>useMemo(() =&gt; { console.log("filtering"); return items.filter(…); }, [items, query])</code>.</li><li>Render <code>visible</code> instead of <code>items</code>.</li></ol><p>Open the console and type: you'll see "filtering" only when <code>items</code> or <code>query</code> change — not on every unrelated render. That's the memo earning its place.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — case-insensitive matching",
            body: `Lowercase both sides before comparing (<code>.toLowerCase()</code>) so "RE" matches "React". Users expect search to ignore case — a small touch that follows how every real search box behaves.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — useMemo",
            url: "https://react.dev/reference/react/useMemo",
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
  <title>Codelab — filter with memo</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; }
    input { font-size: 16px; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1; width: 220px; }
    li { padding: 3px 0; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useMemo } = React;
    const DATA = ["React", "Next.js", "Svelte", "Vue", "Angular", "Solid", "Astro", "Remix"];

    function Search() {
      const [items, setItems] = useState([]);
      const [query, setQuery] = useState("");

      useEffect(() => {
        const id = setTimeout(() => setItems(DATA), 500);
        return () => clearTimeout(id);
      }, []);

      // TODO: derive 'visible' with useMemo, logging "filtering" inside it
      const visible = items;

      if (items.length === 0) return <p>Loading…</p>;

      return (
        <div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search frameworks…" />
          <ul>{visible.map((it) => <li key={it}>{it}</li>)}</ul>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Search />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["useMemo", "[items, query]", "filter", "console.log"] },
      },
      hints: [
        "<code>const visible = useMemo(() =&gt; { console.log(\"filtering\"); return items.filter((it) =&gt; it.toLowerCase().includes(query.toLowerCase())); }, [items, query]);</code>",
        "Make sure the list renders <code>visible</code>, and watch the console as you type.",
      ],
    },
    {
      id: "codelab-b-extend",
      type: "free-edit",
      instruction: {
        heading: "Step 3 (free build) — add a result count and empty state",
        body: `<p>Polish it like a real feature. Starting from the finished search, add two touches of your own:</p><ol><li>Show a live <strong>count</strong>: "Showing N of M" using <code>visible.length</code> and <code>items.length</code>.</li><li>Show a friendly <strong>empty state</strong> ("No matches") when <code>visible.length === 0</code> but the user has typed something.</li></ol><p>This is the free-edit checkpoint — experiment freely. Try memoizing the count too, or sorting the results. You've now got data-loading, derived state, and memoization working together.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — derived values don't need their own state",
            body: `The count is just <code>visible.length</code> — derive it during render, don't store it in a separate <code>useState</code>. Extra state that mirrors other state is a common source of bugs (the two can drift out of sync).`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Choosing the state structure",
            url: "https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state",
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
  <title>Codelab — extend search</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; }
    input { font-size: 16px; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1; width: 220px; }
    .count { color: #64748b; font-size: 14px; margin: 8px 0; }
    li { padding: 3px 0; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useMemo } = React;
    const DATA = ["React", "Next.js", "Svelte", "Vue", "Angular", "Solid", "Astro", "Remix"];

    function Search() {
      const [items, setItems] = useState([]);
      const [query, setQuery] = useState("");

      useEffect(() => {
        const id = setTimeout(() => setItems(DATA), 500);
        return () => clearTimeout(id);
      }, []);

      const visible = useMemo(
        () => items.filter((it) => it.toLowerCase().includes(query.toLowerCase())),
        [items, query]
      );

      if (items.length === 0) return <p>Loading…</p>;

      return (
        <div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search frameworks…" />
          {/* TODO: add a count line "Showing N of M" and an empty state */}
          <ul>{visible.map((it) => <li key={it}>{it}</li>)}</ul>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Search />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["visible.length", "items.length"] },
      },
      hints: [
        "Count line: <code>&lt;p className=\"count\"&gt;Showing {visible.length} of {items.length}&lt;/p&gt;</code>",
        "Empty state: <code>{visible.length === 0 &amp;&amp; &lt;p&gt;No matches&lt;/p&gt;}</code>",
      ],
    },
  ],
};
