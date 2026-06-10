import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-conditional-rendering",
  slug: "conditional-rendering",
  title: "Showing Things Conditionally",
  description:
    "Render different UI depending on state using the && operator and the ternary — the pattern behind every toggle, spinner, and empty state.",
  order: 8,
  steps: [
    {
      id: "why-conditional",
      type: "explanation",
      instruction: {
        heading: "The UI depends on the data",
        body: `<p>Interfaces constantly switch between versions of themselves. <strong>Instagram</strong> shows a filled heart if you liked a post, an outline if you didn't. <strong>Gmail</strong> shows your inbox if you're logged in, a sign-in screen if you're not. While data loads, apps show a spinner, then swap in the content. This is <strong>conditional rendering</strong>: choosing what to show based on state.</p><p>Because JSX expressions are just JavaScript, you use ordinary JavaScript logic:</p><ul><li><strong>Logical AND (<code>&&</code>)</strong> — show something only when a condition is true: <code>{isLoading && &lt;Spinner /&gt;}</code>. If the left side is false, nothing renders.</li><li><strong>Ternary (<code>? :</code>)</strong> — choose between two options: <code>{loggedIn ? &lt;Logout /&gt; : &lt;Login /&gt;}</code>.</li></ul>`,
        analogy: `Conditional rendering is the bouncer at a club. <code>isMember && &lt;VipRoom /&gt;</code> — only members get shown the VIP room. <code>over18 ? &lt;Enter /&gt; : &lt;GoHome /&gt;</code> — everyone gets one of two outcomes.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the zero gotcha",
            body: `<code>&&</code> is for booleans. If the left side is the number <code>0</code> — like <code>{items.length && &lt;List /&gt;}</code> when the list is empty — React renders a stray <code>0</code> on the screen. Guard with a real boolean instead: <code>{items.length > 0 && &lt;List /&gt;}</code>.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Conditional rendering",
            url: "https://react.dev/learn/conditional-rendering",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "conditional-interactive",
      type: "free-edit",
      instruction: {
        heading: "Build a show/hide toggle",
        body: `<p>Make a button that reveals and hides a secret message.</p><ol><li>The state is ready: <code>const [show, setShow] = useState(false)</code>.</li><li>On the button, add <code>onClick={() => setShow(!show)}</code> to flip it true/false.</li><li>Below the button, conditionally render the message: <code>{show && &lt;p&gt;The answer is 42.&lt;/p&gt;}</code>.</li></ol><p>Click the button — the message appears and disappears. Bonus: make the button label change with a ternary: <code>{show ? "Hide" : "Show"}</code>.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `When <code>{show && ...}</code> is false, React renders <em>nothing</em> for that spot — no empty element, no hidden node. The DOM only ever contains what's currently true, which is why React UIs stay clean and in sync.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Conditional rendering",
            url: "https://react.dev/learn/conditional-rendering",
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
    p { font-size: 20px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function Secret() {
      const [show, setShow] = useState(false);

      return (
        <div>
          <button>Show</button>
          {/* Conditionally render the secret message here */}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Secret />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["setShow", "&&"] },
      },
      hints: [
        "Toggle on click: <code>&lt;button onClick={() => setShow(!show)}&gt;...&lt;/button&gt;</code>",
        "Reveal conditionally: <code>{show && &lt;p&gt;The answer is 42.&lt;/p&gt;}</code>",
        'Optional: change the label with a ternary — <code>{show ? "Hide" : "Show"}</code>.',
      ],
    },
  ],
};
