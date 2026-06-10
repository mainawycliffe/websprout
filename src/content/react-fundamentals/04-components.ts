import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-components",
  slug: "components",
  title: "Components: Reusable Pieces of UI",
  description:
    "Build your own components — functions that return JSX — and reuse them to compose a page, the way every real app is built.",
  order: 4,
  steps: [
    {
      id: "why-components",
      type: "explanation",
      instruction: {
        heading: "A component is a function that returns UI",
        body: `<p>A <strong>component</strong> is just a JavaScript function that returns JSX. That is the whole idea. <code>App</code> from the last lessons was already a component.</p><p>Why does React build everything from components? Because real interfaces are made of the same pieces repeated over and over. The <strong>YouTube</strong> homepage is one video-card component shown a hundred times with different data. The <strong>Amazon</strong> results page is one product-card component in a grid. A chat app is one message component stacked down the screen.</p><p>Components let you build a piece <em>once</em>, give it a name, and reuse it everywhere — like a cookie cutter. Fix a bug in the component, and every place that uses it is fixed at once.</p>`,
        analogy: `Think of LEGO. A LEGO set is not one giant molded shape — it is small, reusable bricks snapped together. Components are your bricks: a Button, a Card, a Navbar. You build them once, then snap them together to make any page.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — capital letters matter",
            body: `Component names <strong>must</strong> start with a capital letter: <code>Welcome</code>, not <code>welcome</code>. React treats lowercase names like <code>&lt;div&gt;</code> as plain HTML tags, and capitalized names like <code>&lt;Welcome /&gt;</code> as your components. Get this wrong and your component silently won't render.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Your first component",
            url: "https://react.dev/learn/your-first-component",
            type: "js-concept",
          },
          {
            label: "React.dev — Importing and exporting components",
            url: "https://react.dev/learn/importing-and-exporting-components",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-and-reuse",
      type: "free-edit",
      instruction: {
        heading: "Build a component and reuse it",
        body: `<p>Right now <code>App</code> renders one welcome message. Let's turn that into a reusable component and use it more than once.</p><ol><li>Below <code>App</code>, create a new component: <code>function Greeting() { ... }</code> that returns an <code>&lt;p&gt;</code> with a friendly message.</li><li>Inside <code>App</code>, render it three times: <code>&lt;Greeting /&gt;</code> three times in a row.</li></ol><p>Notice you wrote the component <em>once</em> but it appears three times. Change the text inside <code>Greeting</code> and all three update together — that is reuse.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `A component like <code>&lt;Greeting /&gt;</code> ultimately renders standard HTML elements into the DOM. The browser never sees "Greeting" — it sees the <code>&lt;p&gt;</code> tags your component produced. Components are an organizing idea for you; the output is always plain web standards.`,
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
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    p { background: #eff6ff; padding: 10px 14px; border-radius: 8px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    function App() {
      return (
        <div>
          {/* Render <Greeting /> three times here */}
        </div>
      );
    }

    // Create your Greeting component below this line:


    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["function Greeting", "<Greeting"] },
      },
      hints: [
        "Define it like any function: <code>function Greeting() { return &lt;p&gt;Welcome aboard!&lt;/p&gt;; }</code>",
        "Use it inside App's div: <code>&lt;Greeting /&gt;&lt;Greeting /&gt;&lt;Greeting /&gt;</code> — capital G, and don't forget the self-closing slash.",
      ],
    },
  ],
};
