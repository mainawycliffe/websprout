import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-async-await",
  slug: "async-await",
  title: "Async/Await — Cleaner Promises",
  description:
    "Learn async/await — modern syntax that makes asynchronous code read like normal, step-by-step instructions.",
  order: 4,
  steps: [
    {
      id: "problem-with-then",
      type: "explanation",
      instruction: {
        heading: "The Problem with .then() Chains",
        body: `<p>Promise chains with <code>.then()</code> work well, but they can get messy when you have multiple steps that depend on each other. Each step adds another level of nesting or another <code>.then()</code>, and reading the code becomes harder. When you need to use a value from an earlier step inside a later one, things get especially awkward.</p>

<p>Consider a real-world example: you need to fetch a user, then fetch their posts, then fetch the comments on the first post. With <code>.then()</code> chains, each step is a callback function — the data flows through a series of anonymous functions, and it's hard to see the big picture at a glance.</p>

<p>In 2017, JavaScript introduced <code>async/await</code> — syntactic sugar on top of Promises that makes asynchronous code look and behave like synchronous code. You write code that reads top-to-bottom, step-by-step, just like normal instructions. Under the hood, it's still using Promises, but the developer experience is dramatically better.</p>`,
        analogy:
          "Using <code>.then()</code> chains is like passing notes back and forth — each note contains instructions for what to do next, and you have to keep track of the conversation across many small slips of paper. <code>async/await</code> is like having a face-to-face conversation — you ask a question, wait for the answer, then ask the next one. Much easier to follow.",
        docLinks: [
          {
            label: "async function",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
            type: "js-concept",
          },
          {
            label: "await",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// With .then() chains — harder to follow\nfetch("/api/user/1")\n  .then((res) => res.json())\n  .then((user) => {\n    return fetch("/api/posts?userId=" + user.id);\n  })\n  .then((res) => res.json())\n  .then((posts) => {\n    console.log(posts);\n  });\n\n// With async/await — reads like normal code\nasync function loadUserPosts() {\n  const res1 = await fetch("/api/user/1");\n  const user = await res1.json();\n  const res2 = await fetch("/api/posts?userId=" + user.id);\n  const posts = await res2.json();\n  console.log(posts);\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "async-await-syntax",
      type: "explanation",
      instruction: {
        heading: "The async and await Keywords",
        body: `<p>Two keywords make this work:</p>

<ul>
  <li><strong><code>async</code></strong> — Put this before a function declaration to mark it as asynchronous. An async function always returns a Promise, even if you return a plain value.</li>
  <li><strong><code>await</code></strong> — Put this before any Promise to pause execution until that Promise settles. It "unwraps" the Promise and gives you the resolved value directly. You can <strong>only</strong> use <code>await</code> inside an <code>async</code> function.</li>
</ul>

<p>When JavaScript hits an <code>await</code>, it pauses <em>that function</em> (not the whole program!) and lets other code run. When the Promise resolves, the function picks up right where it left off. This gives you the best of both worlds: code that reads sequentially but doesn't block the browser.</p>

<p>One important detail: at the top level of a module (not inside a function), you can use <code>await</code> directly — this is called <strong>top-level await</strong>. But inside regular functions, you must mark them <code>async</code> first.</p>`,
        docLinks: [
          {
            label: "Making asynchronous programming easier with async and await",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises#async_and_await",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "<code>async/await</code> is part of the ECMAScript 2017 (ES8) specification and is supported in all modern browsers. It is the recommended way to write asynchronous JavaScript.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Marking a function as async\nasync function getData() {\n  // await pauses until the Promise resolves\n  const response = await fetch("https://api.example.com/data");\n  const data = await response.json();\n  return data; // This gets wrapped in a Promise automatically\n}\n\n// Arrow function version\nconst getData2 = async () => {\n  const response = await fetch("https://api.example.com/data");\n  return await response.json();\n};`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "try-async-await",
      type: "js-console",
      instruction: {
        heading: "Try It: async/await in Action",
        body: `<p>Let's convert a <code>.then()</code> chain to <code>async/await</code>. The starter code uses an async function that waits for a Promise to resolve. Run it to see how <code>await</code> pauses the function until the value is ready, then continues to the next line.</p>

<p>Notice how the code reads like a simple, step-by-step recipe — no callbacks, no nesting.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `async function greet() {\n  const message = await new Promise((resolve) => {\n    setTimeout(() => resolve("Hello, async world!"), 500);\n  });\n  console.log(message);\n}\n\ngreet();`,
        expectedOutput: ["Hello, async world!"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Run the code to see await pause the function until the Promise resolves.",
        "The function waits at the await line for 500ms, then continues.",
      ],
    },
    {
      id: "try-catch-explanation",
      type: "explanation",
      instruction: {
        heading: "Error Handling with try/catch",
        body: `<p>With <code>.then()</code> chains, you handle errors using <code>.catch()</code>. With <code>async/await</code>, you use the familiar <code>try/catch</code> blocks that work just like in synchronous code. This is one of the biggest advantages of <code>async/await</code> — error handling uses the same pattern you already know.</p>

<p>Wrap your <code>await</code> calls in a <code>try</code> block. If any awaited Promise rejects, execution jumps straight to the <code>catch</code> block — just like when a synchronous function throws an error. You can then handle the error however you want: log it, show a message to the user, or try again.</p>

<p>This makes your code much easier to reason about. The happy path goes in <code>try</code>, the error handling goes in <code>catch</code>, and you can even add a <code>finally</code> block for cleanup code that runs no matter what (like hiding a loading spinner).</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always wrap <code>await</code> calls in <code>try/catch</code> when the operation can fail (like network requests). An unhandled Promise rejection will show a warning in the console and can cause subtle bugs.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `async function fetchUser() {\n  try {\n    const response = await fetch("/api/user/1");\n    const user = await response.json();\n    console.log("Got user:", user.name);\n  } catch (error) {\n    console.log("Failed to fetch user:", error.message);\n  } finally {\n    console.log("Done — whether it worked or not");\n  }\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-async",
      type: "gap-fill",
      instruction: {
        heading: "Fill in the async/await Keywords",
        body: `<p>Complete the function below with the correct keywords. The function should be asynchronous, wait for the Promise to resolve, and handle any errors.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `{{GAP1}} function loadData() {\n  {{GAP2}} {\n    const result = {{GAP3}} fetchFromServer();\n    console.log(result);\n  } {{GAP4}} (error) {\n    console.log("Error:", error.message);\n  }\n}`,
        gaps: [
          {
            id: "GAP1",
            placeholder: "keyword",
            acceptedAnswers: ["async"],
            caseSensitive: true,
          },
          {
            id: "GAP2",
            placeholder: "keyword",
            acceptedAnswers: ["try"],
            caseSensitive: true,
          },
          {
            id: "GAP3",
            placeholder: "keyword",
            acceptedAnswers: ["await"],
            caseSensitive: true,
          },
          {
            id: "GAP4",
            placeholder: "keyword",
            acceptedAnswers: ["catch"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The function must be marked with 'async' to use 'await' inside it.",
        "Use 'try' and 'catch' to handle errors, just like in synchronous code.",
        "Use 'await' before the function that returns a Promise.",
      ],
    },
    {
      id: "practice-async",
      type: "js-console",
      instruction: {
        heading: "Practice: Write an async Function with try/catch",
        body: `<p>Write an async function that creates a Promise, awaits it, and handles potential errors. The starter code outlines the pattern — run it to verify it works, then try modifying the Promise to reject instead and watch the catch block fire.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `async function processOrder() {\n  try {\n    const result = await new Promise((resolve) => {\n      setTimeout(() => resolve("Order #42 confirmed!"), 300);\n    });\n    console.log(result);\n  } catch (error) {\n    console.log("Order failed:", error);\n  }\n}\n\nprocessOrder();`,
        expectedOutput: ["Order #42 confirmed!"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Run the starter code as-is to see the happy path.",
        "Try changing resolve to reject to see the catch block in action.",
      ],
    },
  ],
};
