import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-capstone-reading-an-app",
  slug: "capstone-reading-an-app",
  title: "Capstone: Reading a Real App",
  description:
    "Put it together — look at a small dashboard and reason about its component tree, what re-renders, where to memo, and which layout wraps it.",
  order: 9,
  steps: [
    {
      id: "map-the-tree",
      type: "explanation",
      instruction: {
        heading: "Step 1 — map the component tree",
        body: `<p>The best developers read a UI before they write one. Let's practice on a small dashboard with a header, a stats row, a filterable list, and a footer.</p><p>First, draw the tree. Looking at the code below, the structure is: <code>&lt;Dashboard /&gt;</code> contains a <code>&lt;Header /&gt;</code>, a <code>&lt;StatGrid /&gt;</code> (which renders several <code>&lt;StatCard /&gt;</code>s), a <code>&lt;ProjectList /&gt;</code> with a search box, and a <code>&lt;Footer /&gt;</code>. Notice the repetition — <code>&lt;StatCard /&gt;</code> appears multiple times — which is your cue that it deserves to be its own component, exactly as the diagram shows.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — name nodes by responsibility",
            body: `If you can describe a chunk in a short phrase — "the stat card", "the project row" — it's a good component. If a component is doing three unrelated jobs, that's a sign to split it.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Thinking in React",
            url: "https://react.dev/learn/thinking-in-react",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `function Dashboard() {
  return (
    <>
      <Header />
      <StatGrid />        {/* renders many <StatCard /> */}
      <ProjectList />     {/* has a search input + a filtered list */}
      <Footer />
    </>
  );
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "what-rerenders",
      type: "explanation",
      instruction: {
        heading: "Step 2 — reason about re-renders and memo",
        body: `<p>Now trace the data. The search box's text lives as <strong>state inside <code>&lt;ProjectList /&gt;</code></strong>. So when you type, only <code>&lt;ProjectList /&gt;</code> and its children re-render — the diagram shows the <code>&lt;Header /&gt;</code>, <code>&lt;StatGrid /&gt;</code>, and <code>&lt;Footer /&gt;</code> sitting calm because they don't use that state.</p><p>Inside <code>&lt;ProjectList /&gt;</code>, the filtered array is recomputed on every keystroke. If the project list were huge, that's the one place a <code>useMemo</code> keyed on the search text would earn its keep. Everywhere else, leave it alone — premature memoization just adds noise.</p><p>And the whole dashboard? It's slotted into a Next.js <code>app/dashboard/layout.tsx</code> that provides the persistent sidebar — so navigating between dashboard pages keeps that shell mounted while only the inner content swaps.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — measure before optimizing",
            body: `Don't sprinkle <code>useMemo</code> everywhere out of fear. Use the browser's <a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance">Performance tools</a> (and React DevTools' Profiler) to find a real bottleneck first, then memoize that specific spot.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — You Might Not Need an Effect (and friends)",
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
      id: "build-the-dashboard-piece",
      type: "free-edit",
      instruction: {
        heading: "Step 3 — build the filterable list",
        body: `<p>Bring the ideas together in code. Finish <code>ProjectList</code> so it:</p><ol><li>holds the search text in <strong>state</strong> (<code>useState</code>),</li><li>derives the visible projects with <strong><code>useMemo</code></strong> keyed on the query,</li><li>renders each project from a reusable <code>&lt;ProjectRow /&gt;</code> component with a <code>key</code>.</li></ol><p>This single component exercises components, props, state, re-rendering, and memoization — the whole module in one place.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — keys come from stable ids",
            body: `Give each item a <code>key</code> from a stable id (here, the project name), not the array index. Stable keys let React match items correctly across re-renders when the list is filtered or reordered.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Rendering lists",
            url: "https://react.dev/learn/rendering-lists",
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
  <title>Capstone — filterable list</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; }
    input { font-size: 16px; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1; width: 240px; }
    .row { padding: 8px 12px; margin-top: 6px; background: #f1f5f9; border-radius: 8px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useMemo } = React;
    const projects = ["Website redesign", "Mobile app", "Marketing site", "Internal tools", "Migration"];

    function ProjectRow(props) {
      return <div className="row">{props.name}</div>;
    }

    function ProjectList() {
      const [query, setQuery] = useState("");

      // TODO: derive 'visible' with useMemo, filtering projects by query (case-insensitive)
      const visible = projects;

      return (
        <div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter projects…" />
          {/* TODO: render a <ProjectRow /> for each visible project, with a key */}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<ProjectList />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["useMemo", "[query]", "<ProjectRow", "key="] },
      },
      hints: [
        "Filter with memo: <code>const visible = useMemo(() =&gt; projects.filter((p) =&gt; p.toLowerCase().includes(query.toLowerCase())), [query]);</code>",
        "Render the rows: <code>{visible.map((p) =&gt; &lt;ProjectRow key={p} name={p} /&gt;)}</code>",
      ],
    },
  ],
};
