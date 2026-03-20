import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-first-fetch",
  slug: "first-fetch",
  title: "Your First Fetch",
  description:
    "Make your first real HTTP request using the Fetch API and receive live data from a public API.",
  order: 5,
  steps: [
    {
      id: "what-is-fetch",
      type: "explanation",
      instruction: {
        heading: "What Is fetch()?",
        body: `<p>The <code>fetch()</code> function is a built-in browser API for making HTTP requests. It's the modern replacement for the older <code>XMLHttpRequest</code> and is now the standard way to talk to servers from JavaScript. You don't need to install anything — <code>fetch()</code> is available in every modern browser.</p>

<p>At its simplest, you pass <code>fetch()</code> a URL, and it returns a <strong>Promise</strong> that resolves with a <code>Response</code> object. That Response object contains everything the server sent back: the status code, headers, and the actual data (which you still need to extract).</p>

<p>Think about what this means: with just one line of code — <code>fetch("https://some-api.com/data")</code> — your JavaScript can reach out across the internet, ask a server for information, and bring it back into your webpage. This is what makes modern web apps possible. Every time you scroll Instagram, search YouTube, or check your Gmail, <code>fetch()</code> (or something like it) is working behind the scenes.</p>`,
        analogy:
          "Calling <code>fetch()</code> is like <strong>sending a letter</strong> and waiting for a reply. You write the address (URL), drop it in the mailbox (the browser sends the request), and wait (the Promise is pending). Eventually, a reply arrives in your mailbox (the Promise resolves with a Response). But the letter is still sealed — you need to open it (<code>.json()</code>) to read what's inside.",
        docLinks: [
          {
            label: "fetch()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch",
            type: "js-method",
          },
          {
            label: "Fetch API",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
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
      id: "basic-syntax",
      type: "explanation",
      instruction: {
        heading: "Basic Fetch Syntax",
        body: `<p>The simplest fetch call takes one argument — a URL string — and makes a <strong>GET request</strong> (asking the server for data). Here are both ways to handle the result:</p>

<p>The <strong>.then() version</strong> chains callbacks to process the response step by step. The <strong>async/await version</strong> does the same thing but reads like normal code. Both are valid; async/await is generally preferred for readability.</p>

<p>We'll practice with <strong>JSONPlaceholder</strong> — a free, public API that returns fake but realistic data. It's perfect for learning because it requires no API key, no signup, and always responds. The URL <code>https://jsonplaceholder.typicode.com/users/1</code> returns a fake user object with name, email, address, and more.</p>`,
        docLinks: [
          {
            label: "Using Fetch",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The Fetch API is a WHATWG Living Standard. Unlike libraries such as Axios, <code>fetch()</code> is built into the browser — no downloads needed. It uses Promises by design and supports streaming, CORS, and all HTTP methods.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// .then() version\nfetch("https://jsonplaceholder.typicode.com/users/1")\n  .then((response) => response.json())\n  .then((user) => console.log(user.name));\n\n// async/await version (preferred)\nasync function getUser() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const user = await response.json();\n  console.log(user.name);\n}\ngetUser();`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "first-real-fetch",
      type: "js-console",
      instruction: {
        heading: "Try It: Your First Real Fetch",
        body: `<p>This is the moment — you're about to make a <strong>real HTTP request</strong> to a live server on the internet! The code below fetches a user from JSONPlaceholder and logs the entire response object. Run it and inspect what comes back.</p>

<p>Notice that we await <code>fetch()</code> to get the Response, then await <code>response.json()</code> to parse the body. Two awaits for two asynchronous steps.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "This is a real HTTP request",
            body: "The code below makes a real network request to a server. It may take a moment to respond depending on your connection. If it fails, check that you're connected to the internet.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode: `const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\nconsole.log("Status:", response.status);\nconsole.log("OK:", response.ok);`,
        expectedOutput: ["Status: 200", "OK: true"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Click Run to make a real HTTP request. It may take a moment.",
        "You should see Status: 200 and OK: true, confirming a successful response.",
      ],
    },
    {
      id: "response-object",
      type: "explanation",
      instruction: {
        heading: "The Response Object and .json()",
        body: `<p>When <code>fetch()</code> resolves, it gives you a <strong>Response</strong> object — not the data itself. The Response is like a sealed envelope: it tells you whether the delivery was successful (status code, headers) but you still need to <em>open</em> it to read the contents.</p>

<p>Key properties of the Response object:</p>
<ul>
  <li><code>response.ok</code> — <code>true</code> if the status code is 200-299 (success)</li>
  <li><code>response.status</code> — the HTTP status code (200, 404, 500, etc.)</li>
  <li><code>response.headers</code> — the response headers</li>
</ul>

<p>To get the actual data, you call <code>response.json()</code>. This method reads the response body and parses it as JSON. Crucially, <code>.json()</code> itself returns a <strong>Promise</strong> — parsing can take time for large responses. That's why you need a second <code>await</code>: one for the fetch, one for the parsing.</p>`,
        docLinks: [
          {
            label: "Response",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Response",
            type: "js-concept",
          },
          {
            label: "Response.json()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/json",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Common Mistake",
            body: "Forgetting the second <code>await</code> on <code>response.json()</code> is one of the most common fetch mistakes. Without it, you'll get a <code>Promise</code> object instead of your actual data. Always <code>await</code> both <code>fetch()</code> and <code>.json()</code>.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// TWO awaits — one for the fetch, one for parsing\nconst response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n// response is a Response object (the sealed envelope)\n\nconst user = await response.json();\n// user is now a JavaScript object (the letter inside)\n\nconsole.log(user.name);  // "Leanne Graham"\nconsole.log(user.email); // "Sincere@april.biz"`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fetch-and-parse",
      type: "js-console",
      instruction: {
        heading: "Try It: Fetch and Parse JSON",
        body: `<p>Now let's do the full pattern: fetch a user from JSONPlaceholder, parse the JSON, and access a specific property. The URL <code>https://jsonplaceholder.typicode.com/users/1</code> returns a user whose name is "Leanne Graham".</p>

<p>Run the code to make a real request and see the user's name printed to the console.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\nconst user = await response.json();\nconsole.log(user.name);`,
        expectedOutput: ["Leanne Graham"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Run the code as-is. The user at /users/1 has the name 'Leanne Graham'.",
        "Make sure you have two awaits: one for fetch() and one for .json().",
      ],
    },
    {
      id: "gap-fill-fetch",
      type: "gap-fill",
      instruction: {
        heading: "Fill in the Fetch Pattern",
        body: `<p>Complete the code below to fetch a post from JSONPlaceholder and log its title. Fill in the missing keywords and methods.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `const response = {{GAP1}} {{GAP2}}("https://jsonplaceholder.typicode.com/posts/1");\nconst post = {{GAP3}} response.{{GAP4}}();\nconsole.log(post.title);`,
        gaps: [
          {
            id: "GAP1",
            placeholder: "keyword",
            acceptedAnswers: ["await"],
            caseSensitive: true,
          },
          {
            id: "GAP2",
            placeholder: "function",
            acceptedAnswers: ["fetch"],
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
            placeholder: "method",
            acceptedAnswers: ["json"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "You need 'await' before both fetch() and .json() because both return Promises.",
        "The method to parse JSON from a Response is .json().",
      ],
    },
  ],
};
