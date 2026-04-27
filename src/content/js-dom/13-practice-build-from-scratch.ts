import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-practice-build-from-scratch",
  slug: "practice-build-from-scratch",
  title: "Practice: Build from Scratch",
  description:
    "Stack everything you have learned about the DOM into small, end-to-end builds. Each step gives you an empty editor and a goal — you write the code, run it, and read the console to confirm it worked.",
  order: 13,
  steps: [
    {
      id: "build-intro",
      type: "explanation",
      instruction: {
        heading: "Build, run, read the console, repeat",
        body: "<p>You have read code and fixed buggy code. Now write code from a blank line.</p><p>Each of the next four steps gives you a goal and an empty editor. The console runs your code in a tiny page that already has an empty <code>&lt;body&gt;</code> — anything you create with <code>document.createElement</code> can be appended to <code>document.body</code>.</p><p>To prove your build works, the goal asks for a specific <code>console.log</code> output. If your output matches, the step passes. If not, read the actual log carefully — it will tell you what your code is really doing.</p>",
        analogy:
          "It is the difference between watching someone fix a tap and fixing one yourself. The first time the wrench feels awkward; by the third tap, the moves are automatic.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "When in doubt, add an extra <code>console.log</code> to inspect a value mid-flight. Reading the actual state of the page (via <code>document.body.innerHTML</code> for example) is the fastest way to spot what is off.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-counter",
      type: "js-console",
      instruction: {
        heading: "Build 1: A click counter",
        body: "<p>Create a <code>&lt;button&gt;</code> with the text <code>Click me</code>, add a click listener that increments a counter, and append the button to <code>document.body</code>. Then call <code>button.click()</code> three times and log the final count.</p><p>Goal: the console should print exactly <code>3</code>.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "<code>button.click()</code> programmatically triggers the click event — perfect for testing your handler without a real mouse.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          '// Build a click counter that ends with the count being 3.\n// Steps:\n// 1. Create a button element with createElement.\n// 2. Set its textContent to "Click me".\n// 3. Add a click listener that increments a counter variable.\n// 4. Append it to document.body.\n// 5. Call button.click() three times.\n// 6. console.log the final count.\n\n',
        expectedOutput: ["3"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["3"] },
      },
      hints: [
        "Declare let count = 0; outside the listener so it persists between clicks.",
        "Inside the listener, do count = count + 1 (or count++).",
        "After three calls to button.click(), the listener has run three times.",
      ],
    },
    {
      id: "build-class-toggler",
      type: "js-console",
      instruction: {
        heading: "Build 2: A class toggler",
        body: "<p>Create a <code>&lt;div&gt;</code> and start it with class <code>card</code>. Toggle the class <code>active</code> on it twice. After each toggle, log the element's <code>className</code>.</p><p>Goal: the console should print:</p><pre>card active\ncard</pre>",
      },
      config: {
        type: "js-console",
        starterCode:
          '// Toggle "active" twice on a div that starts with class "card".\n// Log className after each toggle.\n// Steps:\n// 1. createElement("div").\n// 2. Set className to "card".\n// 3. classList.toggle("active") — log className.\n// 4. classList.toggle("active") — log className.\n\n',
        expectedOutput: ["card active", "card"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["card active", "card"] },
      },
      hints: [
        "After the first toggle, 'active' is added — className becomes 'card active'.",
        "After the second toggle, 'active' is removed — className becomes 'card' again.",
        "className stores all classes joined by single spaces.",
      ],
    },
    {
      id: "build-input-length",
      type: "js-console",
      instruction: {
        heading: "Build 3: Read input length",
        body: "<p>Create an <code>&lt;input&gt;</code> element, set its <code>.value</code> to <code>Sukuma per kg</code>, and log how many characters that value has.</p><p>Goal: the console should print exactly <code>13</code>.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          '// Create an input, give it a value, log the length.\n// Steps:\n// 1. createElement("input").\n// 2. Set its .value to "Sukuma per kg".\n// 3. console.log the .length of the value.\n\n',
        expectedOutput: ["13"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["13"] },
      },
      hints: [
        "Form inputs use the .value property (not textContent).",
        "Strings have a .length property — input.value.length gives the character count.",
        "\"Sukuma per kg\" has 13 characters including spaces.",
      ],
    },
    {
      id: "build-list",
      type: "js-console",
      instruction: {
        heading: "Build 4: Build a shopping list",
        body: "<p>Create a <code>&lt;ul&gt;</code>, then create three <code>&lt;li&gt;</code> elements with the texts <code>Sukuma</code>, <code>Tomatoes</code>, and <code>Onions</code>. Append all three to the <code>ul</code>. Finally, log <code>ul.children.length</code>.</p><p>Goal: the console should print exactly <code>3</code>.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          '// Build a <ul> with three <li> children, then log how many children it has.\n// Steps:\n// 1. createElement("ul").\n// 2. For each name (Sukuma, Tomatoes, Onions): createElement("li"), set textContent, appendChild to the ul.\n// 3. console.log the ul.children.length.\n\n',
        expectedOutput: ["3"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["3"] },
      },
      hints: [
        "An array of names with forEach makes the loop short and clear.",
        "Each iteration: createElement('li'), set its textContent, then ul.appendChild(li).",
        ".children is a live collection of the element's child elements; .length gives the count.",
      ],
    },
  ],
};
