import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-one-way-data-flow",
  slug: "one-way-data-flow",
  title: "One-Way Data Flow: Props Down, Events Up",
  description:
    "Watch data travel down the component tree as props, and events travel back up through callbacks — React's golden rule.",
  order: 2,
  steps: [
    {
      id: "props-flow-down",
      type: "explanation",
      instruction: {
        heading: "Props flow DOWN the tree",
        body: `<p>Components are reusable because you can feed them different data. That data is passed in as <strong>props</strong> — short for "properties". A parent hands props to a child the same way you pass arguments to a function.</p><p>The diagram shows a <code>name="Ada"</code> prop travelling <em>down</em> from <code>&lt;App /&gt;</code> into <code>&lt;Greeting /&gt;</code>. This is React's most important rule: <strong>data flows one way — downward</strong>. A parent can give data to a child, but a child can never reach up and change its parent's data directly.</p><p>Why enforce one direction? Because it makes apps predictable. When something on screen is wrong, you know the data came from <em>above</em>, so there's exactly one place to look. This is the same idea behind why <strong>Instagram</strong> or <strong>Twitter</strong> feeds stay consistent — data has a single, traceable source.</p>`,
        analogy: `Props are like a shipping label on a package. The sender (parent) writes the address and contents; the receiver (child) reads them but can't rewrite the label and send it back changed. To change anything, you send a <em>new</em> package.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — props are read-only",
            body: `Never reassign a prop inside a child (<code>props.name = "Bob"</code> is a bug). Props are a read-only snapshot for this render. If a value needs to change over time, it should be <strong>state</strong> in the parent, passed down as a prop.`,
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
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "events-flow-up",
      type: "explanation",
      instruction: {
        heading: "Events flow UP via callbacks",
        body: `<p>If a child can't change its parent, how does a button inside a child update the whole app? The answer: the parent passes a <strong>function</strong> down as a prop, and the child <em>calls</em> it. The data still lives in the parent; the child just politely asks it to change.</p><p>The diagram shows an <code>onLike()</code> call travelling <em>up</em>. The parent owns the data and the function that updates it. The child receives that function as a prop and triggers it on a click. Data goes down; notifications go up. The loop is complete and still one-directional.</p><p>This pattern — <strong>"lift state up"</strong> — is how two components stay in sync. Put the shared data in their closest common parent, then pass it (and the updater) down to both.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — it's just the DOM event model",
            body: `An <code>onClick</code> handler in React maps to a real DOM <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event">click event</a>. React adds a consistent, cross-browser wrapper (a synthetic event), but underneath it's the same event-driven model the web has always used.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Sharing state between components (lifting state up)",
            url: "https://react.dev/learn/sharing-state-between-components",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "wire-prop-and-callback",
      type: "free-edit",
      instruction: {
        heading: "Pass a prop down, lift an event up",
        body: `<p>The parent <code>App</code> owns a <code>liked</code> count. The <code>LikeButton</code> child should <em>display</em> the count (a prop down) and <em>increase</em> it on click (an event up).</p><ol><li>Pass two props into <code>&lt;LikeButton /&gt;</code>: <code>count={liked}</code> and <code>onLike={() =&gt; setLiked(liked + 1)}</code>.</li><li>Inside <code>LikeButton</code>, read <code>props.count</code> in the label and call <code>props.onLike</code> in <code>onClick</code>.</li></ol><p>Click the button — the count lives in the parent, but the child drives it. That's the full down-and-up loop.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — pass the function, don't call it",
            body: `Write <code>onClick={props.onLike}</code>, not <code>onClick={props.onLike()}</code>. The parentheses would call it immediately during render instead of waiting for the click.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Responding to events",
            url: "https://react.dev/learn/responding-to-events",
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
  <title>Props down, events up</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; }
    button { font-size: 16px; padding: 8px 16px; border-radius: 10px; border: 1px solid #bfdbfe; background: #eff6ff; cursor: pointer; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function LikeButton(props) {
      // TODO: read props.count in the label and call props.onLike on click
      return <button>♥ Like (0)</button>;
    }

    function App() {
      const [liked, setLiked] = useState(0);
      return (
        <div>
          <h2>Likes: {liked}</h2>
          {/* TODO: pass count and onLike props */}
          <LikeButton />
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
        criteria: { keywords: ["props.onLike", "props.count", "onLike=", "count="] },
      },
      hints: [
        "In App: <code>&lt;LikeButton count={liked} onLike={() =&gt; setLiked(liked + 1)} /&gt;</code>",
        "In LikeButton: <code>&lt;button onClick={props.onLike}&gt;♥ Like ({props.count})&lt;/button&gt;</code>",
      ],
    },
  ],
};
