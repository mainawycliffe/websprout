import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-codelab-decompose-ui",
  slug: "codelab-decompose-ui",
  title: "Codelab: Break a UI into Components",
  description:
    "Hands-on — take one giant profile card and refactor it into small, reusable components driven by props.",
  order: 10,
  steps: [
    {
      id: "codelab-a-brief",
      type: "explanation",
      instruction: {
        heading: "The brief: from one blob to a tree",
        body: `<p>In this codelab you'll start with a working but monolithic <strong>profile card</strong> — all of it crammed into a single component — and refactor it into a clean little tree: <code>&lt;ProfileCard /&gt;</code> made of an <code>&lt;Avatar /&gt;</code> and a <code>&lt;StatList /&gt;</code>, each driven by <strong>props</strong>.</p><p>This is the single most common real-world React task: spotting a chunk that should be its own component and pulling it out. By the end you'll render <em>two</em> different profiles from the same components — proof that you built something reusable.</p><p>Everything runs live in the preview using React from a CDN, so you can edit and see results instantly. Work through each step; the final step is a free build of your own.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — refactor in small, runnable steps",
            body: `Don't rewrite everything at once. Extract one component, confirm the preview still looks the same, then extract the next. Keeping it working at every step is how professionals refactor safely.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Extracting components",
            url: "https://react.dev/learn/your-first-component#nesting-and-organizing-components",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-a-extract-avatar",
      type: "free-edit",
      instruction: {
        heading: "Step 1 — extract an Avatar component",
        body: `<p>The card shows a circular avatar with initials and a name. Pull that into an <code>&lt;Avatar /&gt;</code> component that takes <code>initials</code> and <code>name</code> as props.</p><ol><li>Create <code>function Avatar(props)</code> returning the avatar markup, using <code>props.initials</code> and <code>props.name</code>.</li><li>In <code>ProfileCard</code>, replace the inline avatar with <code>&lt;Avatar initials="AL" name="Ada Lovelace" /&gt;</code>.</li></ol><p>Run it — the card should look identical, but the avatar is now reusable.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — props make a component flexible",
            body: `Hard-coding "Ada Lovelace" inside <code>Avatar</code> would make it useless for anyone else. Passing it as a prop is what turns a one-off into a reusable building block.`,
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
  <title>Codelab — decompose UI</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; background: #f8fafc; }
    .card { max-width: 280px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
    .avatar { width: 56px; height: 56px; border-radius: 50%; background: #22d3ee; color: #083344; font-weight: 700; display: flex; align-items: center; justify-content: center; }
    .name { font-weight: 600; margin-top: 8px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // TODO Step 1: create function Avatar(props) using props.initials and props.name

    function ProfileCard() {
      return (
        <div className="card">
          <div className="avatar">AL</div>
          <div className="name">Ada Lovelace</div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<ProfileCard />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["function Avatar", "props.initials", "<Avatar"] },
      },
      hints: [
        "<code>function Avatar(props) { return (&lt;div&gt;&lt;div className=\"avatar\"&gt;{props.initials}&lt;/div&gt;&lt;div className=\"name\"&gt;{props.name}&lt;/div&gt;&lt;/div&gt;); }</code>",
        "Then use it: <code>&lt;Avatar initials=\"AL\" name=\"Ada Lovelace\" /&gt;</code>",
      ],
    },
    {
      id: "codelab-a-statlist",
      type: "free-edit",
      instruction: {
        heading: "Step 2 — build a StatList from data",
        body: `<p>Real cards show stats — followers, projects, stars. Instead of writing each by hand, render them from an array with <code>.map()</code>.</p><ol><li>Create <code>function StatList(props)</code> that maps over <code>props.stats</code> (an array of <code>{ label, value }</code>) and renders each as a row.</li><li>Give each row a <code>key</code> (use the label).</li><li>Render <code>&lt;StatList stats={…} /&gt;</code> inside the card, passing the stats array.</li></ol>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — keys help React track list items",
            body: `Each item in a rendered list needs a stable <code>key</code> so React can tell items apart across re-renders. Without keys, React warns in the console and may update the wrong DOM nodes.`,
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
  <title>Codelab — StatList</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; background: #f8fafc; }
    .card { max-width: 280px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }
    .avatar { width: 56px; height: 56px; border-radius: 50%; background: #22d3ee; color: #083344; font-weight: 700; display: flex; align-items: center; justify-content: center; }
    .name { font-weight: 600; margin: 8px 0 12px; }
    .stat { display: flex; justify-content: space-between; padding: 4px 0; border-top: 1px solid #f1f5f9; }
    .stat b { color: #0891b2; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    function Avatar(props) {
      return (
        <div>
          <div className="avatar">{props.initials}</div>
          <div className="name">{props.name}</div>
        </div>
      );
    }

    // TODO Step 2: create function StatList(props) that maps props.stats to rows

    function ProfileCard() {
      const stats = [
        { label: "Followers", value: "2.1k" },
        { label: "Projects", value: 18 },
        { label: "Stars", value: 340 },
      ];
      return (
        <div className="card">
          <Avatar initials="AL" name="Ada Lovelace" />
          {/* TODO: render <StatList stats={stats} /> */}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<ProfileCard />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["function StatList", "props.stats", ".map", "key=", "<StatList"] },
      },
      hints: [
        "Map the stats: <code>props.stats.map((s) =&gt; &lt;div className=\"stat\" key={s.label}&gt;&lt;span&gt;{s.label}&lt;/span&gt;&lt;b&gt;{s.value}&lt;/b&gt;&lt;/div&gt;)</code>",
        "Render it in the card: <code>&lt;StatList stats={stats} /&gt;</code>",
      ],
    },
    {
      id: "codelab-a-reuse",
      type: "free-edit",
      instruction: {
        heading: "Step 3 (free build) — reuse the components for a second profile",
        body: `<p>Time to prove it's reusable. <code>ProfileCard</code> now takes its own props. Render <strong>two different people</strong> side by side using the very same <code>ProfileCard</code> — just different data.</p><ol><li>Make <code>ProfileCard(props)</code> accept <code>initials</code>, <code>name</code>, and <code>stats</code> and pass them through.</li><li>In <code>App</code>, render two <code>&lt;ProfileCard /&gt;</code>s with different data.</li></ol><p>This is the free-edit checkpoint — make it your own: change the people, the stats, the colors. One set of components, infinite cards.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — this is the whole point of components",
            body: `Two cards, zero duplicated markup. When you later need to change how a card looks, you edit <code>ProfileCard</code> once and every card updates. That leverage is why React scales to huge apps.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Your first component",
            url: "https://react.dev/learn/your-first-component",
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
  <title>Codelab — reuse</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; background: #f8fafc; }
    .grid { display: flex; gap: 16px; flex-wrap: wrap; }
    .card { width: 240px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }
    .avatar { width: 56px; height: 56px; border-radius: 50%; background: #22d3ee; color: #083344; font-weight: 700; display: flex; align-items: center; justify-content: center; }
    .name { font-weight: 600; margin: 8px 0 12px; }
    .stat { display: flex; justify-content: space-between; padding: 4px 0; border-top: 1px solid #f1f5f9; }
    .stat b { color: #0891b2; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    function Avatar(props) {
      return (<div><div className="avatar">{props.initials}</div><div className="name">{props.name}</div></div>);
    }
    function StatList(props) {
      return props.stats.map((s) => (
        <div className="stat" key={s.label}><span>{s.label}</span><b>{s.value}</b></div>
      ));
    }

    // TODO: make ProfileCard accept props (initials, name, stats) and pass them through
    function ProfileCard(props) {
      return (
        <div className="card">
          <Avatar initials="AL" name="Ada Lovelace" />
          <StatList stats={[{ label: "Stars", value: 340 }]} />
        </div>
      );
    }

    function App() {
      // TODO: render two different <ProfileCard /> with different data
      return (
        <div className="grid">
          <ProfileCard />
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
        criteria: { keywords: ["props.initials", "props.name", "props.stats"] },
      },
      hints: [
        "Pass props through: <code>&lt;Avatar initials={props.initials} name={props.name} /&gt;</code> and <code>&lt;StatList stats={props.stats} /&gt;</code>",
        "In App, render two: <code>&lt;ProfileCard initials=\"AL\" name=\"Ada Lovelace\" stats={[…]} /&gt;</code> and a second with different data.",
      ],
    },
  ],
};
