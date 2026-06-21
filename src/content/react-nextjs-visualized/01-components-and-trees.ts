import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-components-and-trees",
  slug: "components-and-trees",
  title: "Components & the Component Tree",
  description:
    "See how a whole screen is really a tree of small, reusable components — and learn to break any UI down into pieces.",
  order: 1,
  steps: [
    {
      id: "what-is-a-component",
      type: "explanation",
      instruction: {
        heading: "A component is a reusable piece of UI",
        body: `<p>A <strong>component</strong> is a function that returns a piece of the screen. That's the whole idea — but it's the idea everything in React is built on, so it's worth seeing clearly.</p><p>Why does React work this way? Because real interfaces are made of the <em>same pieces repeated</em>. The <strong>YouTube</strong> homepage is one video-card component shown a hundred times with different data. An <strong>Amazon</strong> results page is one product-card in a grid. A chat app is one message bubble stacked down the screen.</p><p>Instead of one giant blob of HTML, you build a small piece <em>once</em>, give it a name, and reuse it everywhere. Watch the diagram: the same <code>&lt;Card /&gt;</code> appears three times on screen, but you only wrote it once.</p>`,
        analogy: `Think of LEGO. A LEGO castle isn't one giant molded shape — it's small, reusable bricks snapped together. Components are your bricks: a Button, a Card, a Navbar. Build each once, then snap them together into any page.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — it all becomes plain HTML",
            body: `A component like <code>&lt;Card /&gt;</code> ultimately renders standard HTML elements into the DOM. The browser never sees "Card" — it sees the <code>&lt;div&gt;</code> and <code>&lt;p&gt;</code> tags your component produced. Components are an organizing idea for <em>you</em>; the output is always conformant web standards.`,
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
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "break-it-down",
      type: "explanation",
      instruction: {
        heading: "Breaking a screen into a tree",
        body: `<p>The most useful skill in React isn't writing components — it's <strong>seeing</strong> them. When you look at any page, practice drawing boxes around the repeating and self-contained chunks.</p><p>The diagram shows a typical page becoming a <strong>component tree</strong>: <code>&lt;App /&gt;</code> at the top contains a <code>&lt;Header /&gt;</code>, three <code>&lt;Card /&gt;</code>s, and a <code>&lt;Footer /&gt;</code>. A parent contains its children, exactly like nested HTML — which is why we call it a tree.</p><p>How do you decide where to draw the boxes? A good component does <em>one thing</em> and has a name you'd happily say out loud: "the navbar", "a product card", "the sign-up form". If a chunk repeats, or could be reused, or is getting long enough to be hard to read — pull it into its own component.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — capital letters matter",
            body: `Component names <strong>must</strong> start with a capital letter: <code>Card</code>, not <code>card</code>. React reads lowercase names like <code>&lt;div&gt;</code> as plain HTML tags and capitalized names like <code>&lt;Card /&gt;</code> as <em>your</em> components. Get this wrong and the component silently won't render.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Thinking in React (break the UI into a hierarchy)",
            url: "https://react.dev/learn/thinking-in-react",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "extract-a-component",
      type: "free-edit",
      instruction: {
        heading: "Extract a component and reuse it",
        body: `<p>Right now <code>App</code> repeats the same card markup three times. That's a smell — repetition is a sign a component wants to be born.</p><ol><li>Create a <code>function Card()</code> that returns the card markup (the <code>&lt;div className="card"&gt;…&lt;/div&gt;</code>).</li><li>Inside <code>App</code>, replace the three repeated blocks with three <code>&lt;Card /&gt;</code> tags.</li></ol><p>Run it. The page looks identical — but now the card lives in <em>one</em> place. Change the markup once and all three update together. That's the payoff of components.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — one parent element",
            body: `A component must return a single root element. Wrap multiple siblings in one <code>&lt;div&gt;</code> (or an empty <code>&lt;&gt;…&lt;/&gt;</code> fragment) or you'll get a syntax error.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Importing and exporting components",
            url: "https://react.dev/learn/importing-and-exporting-components",
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
  <title>Component Tree</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; color: #1e293b; }
    .grid { display: flex; gap: 12px; flex-wrap: wrap; }
    .card { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 16px; flex: 1; min-width: 120px; }
    .card h3 { margin: 0 0 4px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // TODO: create a Card component here, then use <Card /> three times below.

    function App() {
      return (
        <div className="grid">
          <div className="card"><h3>Card</h3><p>Reusable piece</p></div>
          <div className="card"><h3>Card</h3><p>Reusable piece</p></div>
          <div className="card"><h3>Card</h3><p>Reusable piece</p></div>
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
        criteria: { keywords: ["function Card", "<Card"] },
      },
      hints: [
        "Define it like any function: <code>function Card() { return &lt;div className=\"card\"&gt;&lt;h3&gt;Card&lt;/h3&gt;&lt;p&gt;Reusable piece&lt;/p&gt;&lt;/div&gt;; }</code>",
        "Then inside App's grid div, use it three times: <code>&lt;Card /&gt;&lt;Card /&gt;&lt;Card /&gt;</code> — capital C, self-closing slash.",
      ],
    },
  ],
};
