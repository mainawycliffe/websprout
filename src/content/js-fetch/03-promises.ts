import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-promises",
  slug: "promises",
  title: "Promises — Waiting for Things",
  description:
    "Understand how JavaScript handles operations that take time using Promises — the foundation of all data fetching.",
  order: 3,
  steps: [
    {
      id: "why-promises",
      type: "explanation",
      instruction: {
        heading: "Why We Need Promises",
        body: `<p>JavaScript runs code <strong>one line at a time</strong>, top to bottom. But what happens when you need to do something that takes time — like fetching data from a server? The server might take 200 milliseconds or 3 seconds to respond. Should JavaScript just freeze and wait? Absolutely not — that would make the entire page unresponsive. No scrolling, no clicking, nothing.</p>

<p>Instead, JavaScript uses an <strong>asynchronous</strong> model. When you start a time-consuming operation (like a network request), JavaScript doesn't wait around. It says, "I'll start this, and when it's done, call me back." Then it continues running the rest of your code. This is why you can scroll a webpage while images are still loading.</p>

<p>A <strong>Promise</strong> is JavaScript's way of representing a value that doesn't exist yet but will (or won't) in the future. It's literally a promise: "I promise I'll give you the data when the server responds." The <code>fetch()</code> API returns a Promise, which is why understanding Promises is essential before we start fetching data.</p>`,
        analogy:
          "Ordering food at a restaurant is a perfect analogy. You give your order to the waiter (start the async operation). The waiter gives you a <strong>ticket number</strong> (a Promise). You don't stand at the counter waiting — you go sit down, chat with friends, check your phone (other code runs). When your food is ready, they call your number (the Promise resolves). If the kitchen is out of an ingredient, they come tell you there's a problem (the Promise rejects).",
        docLinks: [
          {
            label: "Promise",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
            type: "js-concept",
          },
          {
            label: "Using Promises",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "promise-states",
      type: "explanation",
      instruction: {
        heading: "The Three States of a Promise",
        body: `<p>A Promise is always in one of three states:</p>

<ul>
  <li><strong>Pending</strong> — The operation has started but hasn't finished yet. Like waiting for your food order.</li>
  <li><strong>Fulfilled</strong> (resolved) — The operation succeeded and produced a value. Your food arrived!</li>
  <li><strong>Rejected</strong> — The operation failed with an error. The kitchen is closed, no food tonight.</li>
</ul>

<p>Once a Promise moves from <em>pending</em> to either <em>fulfilled</em> or <em>rejected</em>, it's <strong>settled</strong> — it can never change state again. A fulfilled Promise stays fulfilled; a rejected Promise stays rejected. This is important because it means you can rely on a Promise giving you exactly one outcome.</p>

<p>You can create a Promise with <code>new Promise()</code>, passing a function that receives two callbacks: <code>resolve</code> (call when successful) and <code>reject</code> (call when something goes wrong). In practice, you rarely create Promises yourself — APIs like <code>fetch()</code> return them for you. But understanding how they work underneath helps you debug problems.</p>`,
        docLinks: [
          {
            label: "Promise() constructor",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Creating a Promise manually\nconst myPromise = new Promise((resolve, reject) => {\n  // Simulate something that takes time\n  setTimeout(() => {\n    const success = true;\n    if (success) {\n      resolve("Here's your data!"); // Fulfilled\n    } else {\n      reject("Something went wrong"); // Rejected\n    }\n  }, 1000);\n});\n\n// At this point, myPromise is PENDING\nconsole.log(myPromise); // Promise { <pending> }`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "then-catch",
      type: "explanation",
      instruction: {
        heading: ".then() and .catch() — Reacting to Results",
        body: `<p>A Promise by itself just holds a future value. To actually <em>do something</em> when that value arrives, you use <code>.then()</code>. The <code>.then()</code> method takes a callback function that runs when the Promise is fulfilled. Whatever value the Promise resolves with gets passed to your callback as an argument.</p>

<p>For errors, you use <code>.catch()</code>. It takes a callback that runs if the Promise is rejected. This is how you handle failures gracefully — show an error message to the user instead of crashing.</p>

<p>You can also chain <code>.then()</code> calls. Each <code>.then()</code> returns a new Promise, so you can transform data step by step. This is called <strong>Promise chaining</strong>, and it's how <code>fetch()</code> is typically used: first <code>.then()</code> to get the response, then another <code>.then()</code> to parse the JSON.</p>`,
        docLinks: [
          {
            label: "Promise.prototype.then()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then",
            type: "js-method",
          },
          {
            label: "Promise.prototype.catch()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always add a <code>.catch()</code> at the end of your Promise chain. Without it, errors won't be handled properly, making bugs hard to find. Modern browsers log unhandled rejections to the console, but your code still won't recover gracefully.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve("Pizza is ready!"), 1000);\n});\n\n// .then() runs when fulfilled\npromise\n  .then((message) => {\n    console.log(message); // "Pizza is ready!"\n    return message.toUpperCase();\n  })\n  .then((upper) => {\n    console.log(upper); // "PIZZA IS READY!"\n  })\n  .catch((error) => {\n    console.log("Error:", error);\n  });`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "try-then",
      type: "js-console",
      instruction: {
        heading: "Try It: Create and Resolve a Promise",
        body: `<p>Let's create a Promise that resolves after a short delay, then use <code>.then()</code> to handle the result. The starter code creates a Promise that resolves with a greeting. Run it to see the message appear.</p>

<p>Notice how <code>"Code after promise"</code> prints <em>before</em> the greeting — that's asynchronous behavior in action! JavaScript doesn't wait for the Promise; it moves on to the next line.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `const greeting = new Promise((resolve) => {\n  setTimeout(() => resolve("Hello from the future!"), 500);\n});\n\ngreeting.then((message) => {\n  console.log(message);\n});\n\nconsole.log("Code after promise");`,
        expectedOutput: ["Code after promise", "Hello from the future!"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Run the code as-is to observe the asynchronous order.",
        "Notice 'Code after promise' appears first because the Promise resolves after 500ms delay.",
      ],
    },
    {
      id: "chaining-explanation",
      type: "explanation",
      instruction: {
        heading: "Promise Chaining: Transforming Data Step by Step",
        body: `<p>One of the most powerful features of Promises is <strong>chaining</strong>. When you return a value from a <code>.then()</code> callback, that value gets wrapped in a new Promise and passed to the next <code>.then()</code> in the chain. This lets you transform data in stages, like an assembly line.</p>

<p>This is exactly how you'll use <code>fetch()</code>:</p>
<ol>
  <li>First <code>.then()</code> — get the Response object</li>
  <li>Second <code>.then()</code> — parse the JSON data</li>
  <li>Third <code>.then()</code> — use the actual data</li>
</ol>

<p>If any step in the chain throws an error or returns a rejected Promise, the chain skips all remaining <code>.then()</code> calls and jumps straight to the nearest <code>.catch()</code>. Think of it like a conveyor belt — if one machine breaks, the product gets diverted to the error-handling station instead of continuing down the line.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `// Chaining: each .then() transforms the data\nfetch("https://api.example.com/user/1")\n  .then((response) => response.json())  // Step 1: parse JSON\n  .then((user) => user.name)             // Step 2: extract name\n  .then((name) => {\n    console.log("Hello, " + name);       // Step 3: use it\n  })\n  .catch((error) => {\n    console.log("Something failed:", error);\n  });`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-promise",
      type: "gap-fill",
      instruction: {
        heading: "Fill in the Promise Chain",
        body: `<p>Complete the Promise chain below. The Promise resolves with the number <code>10</code>. The first <code>.then()</code> doubles it, the second logs the result, and the <code>.catch()</code> handles any errors.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `const myPromise = new Promise((resolve) => {\n  resolve(10);\n});\n\nmyPromise\n  .{{GAP1}}((num) => {\n    return num * 2;\n  })\n  .then((result) => {\n    console.log(result);\n  })\n  .{{GAP2}}((error) => {\n    console.log("Error:", error);\n  });`,
        gaps: [
          {
            id: "GAP1",
            placeholder: "method",
            acceptedAnswers: ["then"],
            caseSensitive: true,
          },
          {
            id: "GAP2",
            placeholder: "method",
            acceptedAnswers: ["catch"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The method that runs when a Promise succeeds is .then()",
        "The method that catches errors is .catch()",
      ],
    },
    {
      id: "practice-chain",
      type: "js-console",
      instruction: {
        heading: "Practice: Build a Promise Chain",
        body: `<p>Build a Promise chain that processes a number through multiple steps. The starter code creates a Promise that resolves with <code>5</code>. Add <code>.then()</code> calls to triple it, then add 1, then log the final result. Don't forget <code>.catch()</code>!</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `const start = new Promise((resolve) => resolve(5));\n\nstart\n  .then((num) => num * 3)\n  .then((num) => num + 1)\n  .then((result) => console.log(result))\n  .catch((err) => console.log("Error:", err));`,
        expectedOutput: ["16"],
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "5 * 3 = 15, then 15 + 1 = 16.",
        "Each .then() receives the return value of the previous .then().",
      ],
    },
  ],
};
