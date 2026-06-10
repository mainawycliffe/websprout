import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-event-handling",
  slug: "event-handling",
  title: "Handling Events",
  description:
    "Respond to clicks and typing with onClick and onChange, and learn the #1 beginner gotcha: pass the handler, don't call it.",
  order: 7,
  steps: [
    {
      id: "why-events",
      type: "explanation",
      instruction: {
        heading: "Events the React way",
        body: `<p>In the DOM module you used <code>addEventListener("click", ...)</code>. React gives you a tidier way: you attach the handler right in the JSX with a prop like <code>onClick</code>, <code>onChange</code>, or <code>onSubmit</code>.</p><pre><code>&lt;button onClick={handleClick}&gt;Save&lt;/button&gt;</code></pre><p>The biggest beginner trap lives in that one line: you <strong>pass the function, you don't call it</strong>.</p><ul><li><code>onClick={handleClick}</code> ✅ — hands React the function to run <em>when</em> the click happens.</li><li><code>onClick={handleClick()}</code> ❌ — the parentheses call it <em>immediately</em>, during render, and hand React the leftover return value. Your button appears to "fire on load" and not on click.</li></ul><p>If you need to pass arguments, wrap it in an arrow function so it still runs later: <code>onClick={() => remove(id)}</code>.</p>`,
        analogy: `Think of giving someone your phone number versus calling them right now. <code>onClick={handleClick}</code> hands React your number to call later. <code>onClick={handleClick()}</code> dials immediately and hands React a dead line.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `React event names are <strong>camelCase</strong>: <code>onClick</code>, <code>onChange</code>, <code>onMouseEnter</code> — not the lowercase <code>onclick</code> you'd write in raw HTML. Under the hood React still uses the standard DOM events; it just wires them up for you.`,
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
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "events-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Wire up the click",
        body: `<p>This Like button has a <code>handleClick</code> function ready. Fill the blank so the button runs it <em>when clicked</em> — remember, pass the function, don't call it.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `function LikeButton() {
  function handleClick() {
    alert("Liked!");
  }

  return <button onClick={{a}}>Like</button>;
}`,
        gaps: [
          {
            id: "a",
            placeholder: "pass the handler (no parentheses)",
            acceptedAnswers: ["{handleClick}", "{ handleClick }"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a"] } },
      hints: [
        "Pass the function itself: <code>{handleClick}</code> — no parentheses, or it would run during render.",
      ],
    },
    {
      id: "events-interactive",
      type: "free-edit",
      instruction: {
        heading: "Echo what the user types",
        body: `<p>Build a <strong>controlled input</strong> — a text box whose value is driven by state. This is how every search bar and form field works in React.</p><ol><li>The state is ready: <code>const [text, setText] = useState("")</code>.</li><li>On the <code>&lt;input&gt;</code>, set <code>value={text}</code> so React controls what it shows.</li><li>Also add <code>onChange={(e) => setText(e.target.value)}</code> so every keystroke updates state.</li></ol><p>The <code>&lt;p&gt;</code> below already shows <code>{text}</code> — type in the box and watch it echo live.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — e.target.value",
            body: `<code>onChange</code> hands your function an <em>event</em> object. The text the user typed is at <code>e.target.value</code> — the same property you used with plain DOM inputs. Pass it straight to <code>setText</code>.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Reacting to input with state",
            url: "https://react.dev/learn/reacting-to-input-with-state",
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
    input { font-size: 16px; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; width: 100%; box-sizing: border-box; }
    .echo { margin-top: 12px; font-size: 20px; min-height: 28px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function Echo() {
      const [text, setText] = useState("");

      return (
        <div>
          <input placeholder="Type something..." />
          <p className="echo">You typed: {text}</p>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Echo />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["onChange", "setText", "value={text}"] },
      },
      hints: [
        "Make it controlled: <code>&lt;input value={text} ... /&gt;</code>",
        "Update on every keystroke: <code>onChange={(e) => setText(e.target.value)}</code>",
      ],
    },
  ],
};
