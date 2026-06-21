import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-usememo-and-usecallback",
  slug: "usememo-and-usecallback",
  title: "useMemo & useCallback: Caching and Identity",
  description:
    "Why a fresh value or function every render can cause waste — and how memoization and referential equality fix it.",
  order: 5,
  steps: [
    {
      id: "why-usememo",
      type: "explanation",
      instruction: {
        heading: "useMemo caches an expensive result",
        body: `<p>Remember the last lesson: a component re-runs top to bottom on every render. That means every calculation in its body runs again, too — even ones whose inputs didn't change.</p><p>Usually that's fine (re-running JavaScript is cheap). But occasionally you have genuinely <strong>expensive</strong> work — filtering a 10,000-item list, a heavy calculation — and redoing it on every keystroke is wasteful. <code>useMemo</code> <strong>caches</strong> the result and only recomputes when its dependencies change.</p><p>The diagram shows two lanes. "Without useMemo" recomputes on every render. "With useMemo" returns a <strong>cache hit</strong> when the input is unchanged, and only recomputes the one render where the input actually changes. Same answer, far less work.</p>`,
        analogy: `useMemo is like keeping the answer to a hard sum on a sticky note. As long as the numbers haven't changed, you read the note instead of re-doing the arithmetic. Change a number, and you work it out once more — then save the new note.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — don't memoize everything",
            body: `<code>useMemo</code> isn't free: React stores the value and compares dependencies each render. For cheap work it can be slower than just recomputing. Reach for it only when the work is measurably expensive, or when you need a <em>stable identity</em> (next step).`,
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
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "usecallback-and-identity",
      type: "explanation",
      instruction: {
        heading: "useCallback keeps a function's identity stable",
        body: `<p>Here's the subtle part beginners trip on: in JavaScript, two functions (or objects) that look identical are <strong>not equal</strong>. <code>() =&gt; {}</code> created now is a different reference from <code>() =&gt; {}</code> created a moment ago. This is <strong>referential equality</strong>.</p><p>Why does it matter? When a component re-renders, every function defined in its body is <em>brand new</em>. If you pass that function as a prop to a child wrapped in <code>React.memo</code> (which skips re-rendering when its props are "the same"), the child sees a <em>new</em> function every time and re-renders anyway — defeating the optimization.</p><p>The diagram shows it: "Without useCallback", the function's identity changes every render (<code>fn@0x17</code> → <code>fn@0x34</code> → …). "With useCallback", the identity is frozen (<code>fn@0x4a</code> every time) until its dependencies change. <code>useMemo</code> caches a <em>value</em>; <code>useCallback</code> caches a <em>function</em>.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — reference vs value equality",
            body: `In JavaScript, primitives compare by value (<code>2 === 2</code> is true) but objects and functions compare by <em>reference</em> (<code>{} === {}</code> is false). This is core <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness">language behavior</a>, not a React quirk — React just exposes it through memoization.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — useCallback",
            url: "https://react.dev/reference/react/useCallback",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "memoize-a-filter",
      type: "free-edit",
      instruction: {
        heading: "Memoize a derived list",
        body: `<p>This app filters a list as you type. Right now the filtering recomputes on every render. Wrap it in <code>useMemo</code> so it only recomputes when the search text changes.</p><ol><li>Replace the plain <code>const visible = …filter(…)</code> with <code>const visible = useMemo(() =&gt; fruits.filter(f =&gt; f.includes(query)), [query]);</code></li></ol><p>The dependency array <code>[query]</code> is the key: the filter re-runs only when <code>query</code> changes, not on unrelated renders. For a short list this is overkill — but for a huge list, it's the difference between smooth and janky.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — useMemo returns the value, not a function",
            body: `<code>useMemo(() =&gt; compute(), [deps])</code> gives you back the <em>result</em> of <code>compute()</code>. Don't call it again — use <code>visible</code> directly. (If you wanted to cache the function itself, that's <code>useCallback</code>.)`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Array.prototype.filter()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
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
  <title>Memoized filter</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; }
    input { font-size: 16px; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1; }
    li { padding: 2px 0; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useMemo } = React;
    const fruits = ["apple", "apricot", "banana", "cherry", "grape", "mango", "melon", "orange"];

    function Search() {
      const [query, setQuery] = useState("");

      // TODO: wrap this in useMemo with [query] as the dependency
      const visible = fruits.filter((f) => f.includes(query));

      return (
        <div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to filter…" />
          <ul>{visible.map((f) => <li key={f}>{f}</li>)}</ul>
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
        criteria: { keywords: ["useMemo", "[query]"] },
      },
      hints: [
        "Wrap the filter: <code>const visible = useMemo(() =&gt; fruits.filter((f) =&gt; f.includes(query)), [query]);</code>",
        "The dependency array <code>[query]</code> tells React to recompute only when the search text changes.",
      ],
    },
  ],
};
