import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-practice-predict-output",
  slug: "practice-predict-output",
  title: "Practice: Predict the Output",
  description:
    "Read short DOM scripts and predict exactly what each console.log will print. Reading code is half of writing code — train your eyes before your fingers.",
  order: 11,
  steps: [
    {
      id: "predict-intro",
      type: "explanation",
      instruction: {
        heading: "Read first, predict second",
        body: "<p>Before you write more DOM code, slow down and <strong>read</strong> some. Real engineers spend more time reading code (their own from a month ago, a teammate's, a library's) than writing fresh lines.</p><p>In this lesson you will see short DOM snippets. Your job: predict what <code>console.log</code> would print. No running the code — type your prediction into the blank that appears in the comment.</p><p>If you get it wrong, that is great information: the snippet is teaching you something about how <code>textContent</code>, <code>value</code>, attributes, and live element references actually behave.</p>",
        analogy:
          "It is like reading a recipe before you cook. You imagine the dish in your head — what colour is it, how does it smell, would it match what you wanted? Skipping that step is how you end up with a sweet curry by accident.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Type your prediction <em>exactly</em> as it would appear in the browser console. Strings keep their original casing; numbers stay as numbers; <code>null</code> stays lowercase.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "predict-textcontent",
      type: "gap-fill",
      instruction: {
        heading: "What does textContent print?",
        body: "<p>The HTML page contains <code>&lt;h1 id=\"title\"&gt;Hello there&lt;/h1&gt;</code>.</p><p>Read the script, then fill in the comment with what would appear in the console.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const heading = document.querySelector("#title");\nheading.textContent = "Goodbye";\nconsole.log(heading.textContent);\n// Prints: {{output}}',
        gaps: [
          {
            id: "output",
            placeholder: "console output",
            acceptedAnswers: ["Goodbye"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["output"] } },
      hints: [
        "Look at the line right before the log — what was just assigned to textContent?",
        "Once you assign a new value, that is what the property holds.",
        "The answer is the new string: Goodbye.",
      ],
    },
    {
      id: "predict-input-value",
      type: "gap-fill",
      instruction: {
        heading: "What does .value print?",
        body: "<p>The HTML page contains <code>&lt;input id=\"name\" value=\"Asha\"&gt;</code>. The user has not typed anything yet.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const input = document.querySelector("#name");\nconsole.log(input.value);\n// Prints: {{output}}',
        gaps: [
          {
            id: "output",
            placeholder: "console output",
            acceptedAnswers: ["Asha"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["output"] } },
      hints: [
        "Form inputs read their current value from the .value property.",
        "If the user has not typed yet, .value falls back to the initial HTML attribute.",
      ],
    },
    {
      id: "predict-classlist",
      type: "gap-fill",
      instruction: {
        heading: "What does classList look like after toggle?",
        body: "<p>The HTML page contains <code>&lt;div id=\"box\" class=\"card\"&gt;&lt;/div&gt;</code>.</p><p>Predict the final string of class names after this script runs.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const box = document.querySelector("#box");\nbox.classList.add("active");\nbox.classList.toggle("active");\nbox.classList.add("highlighted");\nconsole.log(box.className);\n// Prints: {{output}}',
        gaps: [
          {
            id: "output",
            placeholder: "console output",
            acceptedAnswers: ["card highlighted"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["output"] } },
      hints: [
        "Trace it line by line. Start with what the HTML gives you: card.",
        "add('active') makes it 'card active'. toggle('active') removes it because it is already there.",
        "Then add('highlighted') gives the final answer. className joins classes with single spaces.",
      ],
    },
    {
      id: "predict-querySelector-missing",
      type: "gap-fill",
      instruction: {
        heading: "What if the element does not exist?",
        body: "<p>The HTML page does <em>not</em> contain any element with the id <code>ghost</code>.</p><p>What does the first log print? (Use lowercase for the JavaScript value.)</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const ghost = document.querySelector("#ghost");\nconsole.log(ghost);\n// Prints: {{output}}',
        gaps: [
          {
            id: "output",
            placeholder: "console output",
            acceptedAnswers: ["null"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["output"] } },
      hints: [
        "querySelector returns one of two things: the element, or a special 'no match' value.",
        "It is a four-letter, all-lowercase JavaScript primitive.",
      ],
    },
    {
      id: "predict-attribute-vs-property",
      type: "gap-fill",
      instruction: {
        heading: "Attribute vs property",
        body: "<p>The HTML page contains <code>&lt;a id=\"home\" href=\"/about\"&gt;Home&lt;/a&gt;</code>.</p><p>Two reads of the same link — predict each output.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const link = document.querySelector("#home");\nconsole.log(link.getAttribute("href"));\n// Prints: {{attr}}\nconsole.log(link.textContent);\n// Prints: {{text}}',
        gaps: [
          {
            id: "attr",
            placeholder: "first output",
            acceptedAnswers: ["/about"],
            caseSensitive: true,
          },
          {
            id: "text",
            placeholder: "second output",
            acceptedAnswers: ["Home"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: { gaps: ["attr", "text"] },
      },
      hints: [
        "getAttribute returns the literal string from the HTML attribute, exactly as written.",
        "textContent returns the text inside the element's tags.",
      ],
    },
    {
      id: "predict-data-flow",
      type: "gap-fill",
      instruction: {
        heading: "Live element references",
        body: "<p>The HTML page contains <code>&lt;p id=\"price\"&gt;100&lt;/p&gt;</code>.</p><p>The variable <code>el</code> holds a <em>reference</em> to the element. Both reads see the latest state — predict the second output.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const el = document.querySelector("#price");\nconsole.log(el.textContent);\n// Prints: 100\nel.textContent = "250";\nconsole.log(el.textContent);\n// Prints: {{output}}',
        gaps: [
          {
            id: "output",
            placeholder: "second output",
            acceptedAnswers: ["250"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["output"] } },
      hints: [
        "el is not a snapshot. It is a live pointer to the same element on the page.",
        "After you assign a new textContent, the next read sees that new value.",
      ],
    },
  ],
};
