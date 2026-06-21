import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-capstone-tip-calculator",
  slug: "capstone-tip-calculator",
  title: "Capstone: A Live Tip Calculator",
  description:
    "Combine state, events, props of derived values, and live rendering into one real component — a tip calculator that updates as you type.",
  order: 11,
  steps: [
    {
      id: "capstone-brief",
      type: "explanation",
      instruction: {
        heading: "The brief",
        body: `<p>Time to combine everything. You'll build a <strong>tip calculator</strong> — the kind of small, useful widget that lives on real sites. It must:</p><ol><li>Take a <strong>bill amount</strong> from an input.</li><li>Let the user pick a <strong>tip percentage</strong> from buttons (10%, 15%, 20%).</li><li>Take the <strong>number of people</strong> splitting the bill.</li><li>Show the <strong>amount each person pays</strong>, updating live as any input changes.</li></ol><p>Every concept from this module shows up here: <code>useState</code> for the three inputs, <code>onChange</code> and <code>onClick</code> for events, a derived calculation, and live rendering with no manual DOM work.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `The per-person amount is not stored in state — it's <em>derived</em> from the bill, tip, and people on every render. Whenever you can compute a value from existing state, do that instead of adding another <code>useState</code>. Fewer pieces of state, fewer ways to get out of sync.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Choosing the state structure",
            url: "https://react.dev/learn/choosing-the-state-structure",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-build",
      type: "free-edit",
      instruction: {
        heading: "Build the calculator",
        body: `<p>The layout, styles, and state are scaffolded. Finish the four TODOs:</p><ol><li><strong>Bill input:</strong> add <code>onChange={(e) => setBill(Number(e.target.value))}</code>.</li><li><strong>Tip buttons:</strong> give each an <code>onClick</code> that calls <code>setTipPercent</code> with 10, 15, or 20.</li><li><strong>People input:</strong> add <code>onChange={(e) => setPeople(Number(e.target.value))}</code>.</li><li><strong>The calculation:</strong> replace <code>perPerson</code> with <code>(bill * (1 + tipPercent / 100)) / people</code>.</li></ol><p>As soon as it's wired, typing a bill and clicking a tip updates the total instantly.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — inputs give you strings",
            body: `An <code>&lt;input&gt;</code> value is always a <em>string</em>, even <code>type="number"</code>. Wrap it in <code>Number(...)</code> before doing math, or <code>"10" + 5</code> becomes <code>"105"</code> instead of <code>15</code>.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Managing state",
            url: "https://react.dev/learn/managing-state",
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
  <title>Tip Calculator</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    .card { max-width: 320px; margin: 0 auto; padding: 20px; border-radius: 14px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
    .card h2 { margin: 0 0 12px; }
    label { display: block; font-weight: 600; margin: 12px 0 4px; }
    input { width: 100%; box-sizing: border-box; padding: 8px 10px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 8px; }
    .tips { display: flex; gap: 8px; }
    .tips button { flex: 1; padding: 8px; border: none; border-radius: 8px; background: #61dafb; color: #0f172a; font-weight: 700; cursor: pointer; }
    .result { margin-top: 16px; font-size: 28px; font-weight: 800; }
    .result span { font-size: 14px; font-weight: 500; color: #64748b; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function TipCalculator() {
      const [bill, setBill] = useState(0);
      const [tipPercent, setTipPercent] = useState(15);
      const [people, setPeople] = useState(1);

      // TODO 4: compute the amount each person pays.
      const perPerson = 0;

      return (
        <div className="card">
          <h2>Tip Calculator</h2>

          <label>Bill amount</label>
          {/* TODO 1: add onChange to update the bill */}
          <input type="number" value={bill} />

          <label>Tip ({tipPercent}%)</label>
          <div className="tips">
            {/* TODO 2: each button sets the tip percent */}
            <button>10%</button>
            <button>15%</button>
            <button>20%</button>
          </div>

          <label>People</label>
          {/* TODO 3: add onChange to update the people count */}
          <input type="number" min="1" value={people} />

          <div className="result">
            {"$" + perPerson.toFixed(2)} <span>per person</span>
          </div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<TipCalculator />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["onChange", "setTipPercent", "toFixed"] },
      },
      hints: [
        "Bill: <code>&lt;input type=\"number\" value={bill} onChange={(e) => setBill(Number(e.target.value))} /&gt;</code>",
        "Tip button: <code>&lt;button onClick={() => setTipPercent(15)}&gt;15%&lt;/button&gt;</code> (10 and 20 for the others).",
        "Calculation: <code>const perPerson = (bill * (1 + tipPercent / 100)) / people;</code>",
      ],
    },
    {
      id: "capstone-recap",
      type: "explanation",
      instruction: {
        heading: "What you just shipped",
        body: `<p>This calculator is a complete, real React component. Look at what it does <em>not</em> contain: no <code>document.querySelector</code>, no <code>textContent =</code>, no manual "remember to update the screen" lines. You changed state; React kept the display in sync. That's the promise from lesson 1, delivered.</p><p>The shape here scales to anything: swap the tip buttons for product options, the per-person math for a shipping calculator, and you have a checkout widget. The pattern — <em>state → events change state → UI derives from state</em> — is the entire job of a frontend.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Notice every input is <strong>controlled</strong> — its value comes from state. This is the React-recommended way to handle forms: state is the single source of truth, and the input just reflects it. It makes validation, resets, and pre-filling trivial.`,
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
