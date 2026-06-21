import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-first-render-cdn-setup",
  slug: "first-render-cdn-setup",
  title: "Your First Render",
  description:
    "Load React from a CDN and put your first component on the screen with ReactDOM.createRoot and root.render.",
  order: 2,
  steps: [
    {
      id: "the-three-scripts",
      type: "explanation",
      instruction: {
        heading: "What it takes to run React in a plain HTML page",
        body: `<p>To use React without installing anything, you load three scripts from a CDN (a free public file host) right inside your HTML:</p><ul><li><strong>react</strong> — the core library: how components and state work.</li><li><strong>react-dom</strong> — the part that actually puts React onto a real web page (the DOM).</li><li><strong>@babel/standalone</strong> — a translator. React code is usually written in <em>JSX</em> (HTML-looking markup inside JavaScript), and browsers do not understand JSX. Babel rewrites JSX into plain JavaScript the browser <em>can</em> run.</li></ul><p>You then add one special script tag — <code>&lt;script type="text/babel"&gt;</code> — and write your React code inside it. The <code>type="text/babel"</code> is what tells Babel "translate this one before running it."</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — this setup is for learning only",
            body: `Loading React and Babel from a CDN and translating in the browser is great for learning, but slow and not how real apps ship. Real projects translate the code <em>ahead of time</em> with a build tool — which is exactly what the <strong>Next.js for Beginners</strong> module teaches next.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Add React to an existing page",
            url: "https://react.dev/learn/add-react-to-an-existing-project",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!-- The three scripts that make React work in a plain HTML file -->
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>

<!-- Your React code goes in a script with type="text/babel" -->
<script type="text/babel">
  // React code here...
</script>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "create-root-and-render",
      type: "explanation",
      instruction: {
        heading: "createRoot and render: React's two-line startup",
        body: `<p>Every React app starts the same way. You give React one empty element on the page to take over — usually a <code>&lt;div id="root"&gt;&lt;/div&gt;</code> — and then tell it what to put inside.</p><ol><li><code>ReactDOM.createRoot(document.getElementById("root"))</code> — "React, this empty div is yours to manage."</li><li><code>root.render(&lt;App /&gt;)</code> — "Now show this on the screen."</li></ol><p>That <code>&lt;App /&gt;</code> is your first <strong>component</strong> — a function that returns what should appear. From now on, you describe components and React renders them into that root.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `<code>document.getElementById("root")</code> is the same DOM API you learned in the DOM module. React's entry point is built on the standard DOM — the <code>#root</code> div is a normal element React simply renders inside of.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — createRoot",
            url: "https://react.dev/reference/react-dom/client/createRoot",
            type: "js-method",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "first-render-interactive",
      type: "free-edit",
      instruction: {
        heading: "Render your first component",
        body: `<p>The editor already has the full setup: the three CDN scripts, the <code>#root</code> div, and a component called <code>App</code>. Look at the <code>App</code> function — it returns some markup, and the last two lines render it into the page.</p><p><strong>Your turn:</strong> change the text inside the <code>&lt;h1&gt;</code> to your own greeting, and add a <code>&lt;p&gt;</code> below it. Watch the PREVIEW update after you stop typing. You are now running React.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `If the preview goes blank, you probably have a typo in the markup (a missing <code>&lt;/h1&gt;</code> or a stray character). React is strict — every tag must be closed. Fix the typo and it reappears.`,
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
  <title>React Playground</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    function App() {
      return (
        <div>
          <h1>Hello, React!</h1>
          {/* Add a <p> with your own message below the heading */}
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
        criteria: { keywords: ["createRoot", "render"] },
      },
      hints: [
        "Add a paragraph inside the returned markup, e.g. <code>&lt;p&gt;I am learning React.&lt;/p&gt;</code>, right under the &lt;h1&gt;.",
        "Keep the last line — <code>ReactDOM.createRoot(...).render(&lt;App /&gt;)</code> — it is what shows your component on the page.",
      ],
    },
  ],
};
