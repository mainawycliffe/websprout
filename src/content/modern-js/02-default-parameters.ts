import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-default-parameters",
  slug: "default-parameters",
  title: "Default Parameters",
  description:
    "Give function parameters fallback values so callers can leave them out — the clean modern replacement for the old `x = x || fallback` trick.",
  order: 2,
  steps: [
    {
      id: "why-defaults",
      type: "explanation",
      instruction: {
        heading: "Fallback values, built into the function",
        body: `<p>Functions often need a sensible default when an argument is left out. Before 2015, you faked it inside the function body:</p><pre><code>function greet(name) {
  name = name || "friend";   // old workaround
  return "Hi, " + name;
}</code></pre><p>That <code>|| "friend"</code> trick is noisy and has a subtle bug (it also replaces valid values like <code>0</code> or <code>""</code>). Modern JavaScript lets you declare the default <em>right in the parameter list</em>:</p><pre><code>function greet(name = "friend") {
  return "Hi, " + name;
}</code></pre><p>If the caller passes a value, it's used; if they leave it out (or pass <code>undefined</code>), the default kicks in. You'll see this constantly in React components and configuration functions.</p>`,
        analogy: `A default parameter is like a coffee order's standard size. If you just say "a latte," you get the regular. Ask for "a large latte" and your choice overrides the default. The shop never has to guess.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Defaults apply only when the argument is <code>undefined</code> (including when it's omitted). Passing <code>null</code>, <code>0</code>, or <code>""</code> does <em>not</em> trigger the default — those are real values. That's exactly why defaults are safer than the old <code>||</code> trick.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Default parameters",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `function createButton(label = "Click me", color = "blue") {
  return "[" + color + " button: " + label + "]";
}

console.log(createButton());                  // both defaults
console.log(createButton("Save"));            // override label only
console.log(createButton("Delete", "red"));   // override both`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "defaults-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Add a default",
        body: `<p>This function builds a greeting. Give the <code>greeting</code> parameter a default value of <code>"Hello"</code>, so calling <code>welcome("Ada")</code> still works.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `function welcome(name, greeting {{a}} "Hello") {
  return greeting + ", " + name + "!";
}

// welcome("Ada")            -> "Hello, Ada!"
// welcome("Ada", "Habari")  -> "Habari, Ada!"`,
        gaps: [
          {
            id: "a",
            placeholder: "default assignment",
            acceptedAnswers: ["="],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a"] } },
      hints: [
        "A default parameter is just an assignment in the parameter list: <code>greeting = \"Hello\"</code>.",
      ],
    },
    {
      id: "defaults-console",
      type: "js-console",
      instruction: {
        heading: "Your turn: a price-with-tax helper",
        body: `<p>Write a function <code>total(price, taxRate = 0.16)</code> that returns <code>price + price * taxRate</code>. The default tax rate is <code>0.16</code> (16%).</p><p>Then log two calls: <code>total(100)</code> (uses the default) and <code>total(100, 0.1)</code> (overrides it). You should see <code>116</code> and <code>110</code>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Real apps lean on defaults for optional settings — a fetch helper with <code>method = "GET"</code>, a component with <code>size = "medium"</code>. The caller only specifies what's different from the norm.`,
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode: `// Write total(price, taxRate = 0.16) and log total(100) and total(100, 0.1)
`,
        expectedOutput: ["116", "110"],
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["taxRate", "=", "console.log"] },
      },
      hints: [
        "Declare the default in the parameter list: <code>function total(price, taxRate = 0.16) {</code>",
        "Return the math: <code>return price + price * taxRate;</code>",
        "Then <code>console.log(total(100));</code> and <code>console.log(total(100, 0.1));</code>",
      ],
    },
  ],
};
