import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-post-requests",
  slug: "post-requests",
  title: "POST Requests and Sending Data",
  description:
    "Learn to send data to servers using POST requests — the same mechanism behind form submissions, creating accounts, and posting content.",
  order: 9,
  steps: [
    {
      id: "get-vs-post",
      type: "explanation",
      instruction: {
        heading: "GET vs. POST: Reading vs. Writing",
        body: `<p>So far, every fetch call we've made has been a <strong>GET request</strong> — asking the server to <em>give</em> us data. But the web is a two-way street. When you create an account, post a comment, submit a form, or upload a photo, your browser is <em>sending</em> data to the server. That's a <strong>POST request</strong>.</p>

<p>If you completed the Forms module, you've already seen this: when a form has <code>method="POST"</code>, the browser sends the form data to the server. With <code>fetch()</code>, you can do the same thing — and more — entirely from JavaScript, without a form and without reloading the page.</p>

<p>The main HTTP methods you'll encounter:</p>
<ul>
  <li><strong>GET</strong> — Read/retrieve data (the default for <code>fetch()</code>)</li>
  <li><strong>POST</strong> — Create new data (new user, new post, new comment)</li>
  <li><strong>PUT</strong> — Replace existing data entirely</li>
  <li><strong>PATCH</strong> — Update part of existing data</li>
  <li><strong>DELETE</strong> — Remove data</li>
</ul>`,
        analogy:
          "GET is like <strong>reading the menu</strong> at a restaurant — you're just looking at what's available. POST is like <strong>placing an order</strong> — you're sending information to the kitchen (the server) and asking them to create something new for you.",
        docLinks: [
          {
            label: "HTTP request methods",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
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
      id: "fetch-options",
      type: "explanation",
      instruction: {
        heading: "fetch() with Options: method, headers, body",
        body: `<p>To make a POST request with <code>fetch()</code>, you pass a second argument — an <strong>options object</strong> that configures the request. Three properties are essential:</p>

<ul>
  <li><strong><code>method: "POST"</code></strong> — Tells the server this is a POST request (fetch defaults to GET)</li>
  <li><strong><code>headers: { "Content-Type": "application/json" }</code></strong> — Tells the server the data is in JSON format</li>
  <li><strong><code>body: JSON.stringify(data)</code></strong> — The actual data, converted to a JSON string</li>
</ul>

<p>The <code>Content-Type</code> header is crucial. Without it, the server might not know how to read your data. It's like putting a label on a package: "Contains: JSON data." The server reads this header and knows to parse the body as JSON.</p>

<p>Notice we use <code>JSON.stringify()</code> for the body — you can't send a JavaScript object over the network. It has to be converted to a text string first. This is the <code>JSON.stringify()</code> from Lesson 2 in action!</p>`,
        docLinks: [
          {
            label: "Using Fetch - Supplying request options",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The <code>Content-Type: application/json</code> header follows the MIME type standard (RFC 6838). It tells the server that the request body is JSON-encoded. Without it, many servers will reject the request or misinterpret the data.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// POST request structure\nconst response = await fetch("https://api.example.com/posts", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n  },\n  body: JSON.stringify({\n    title: "My First Post",\n    body: "Hello, world!",\n    userId: 1,\n  }),\n});\n\nconst newPost = await response.json();\nconsole.log("Created post with ID:", newPost.id);`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "try-post",
      type: "js-console",
      instruction: {
        heading: "Try It: POST to JSONPlaceholder",
        body: `<p>Let's make a real POST request! JSONPlaceholder has a <code>/posts</code> endpoint that accepts POST requests. It simulates creating a new blog post — it won't actually save anything, but it responds as if it did, returning the new post with an assigned ID.</p>

<p>Run the code to see the server's response to your POST request.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `const response = await fetch("https://jsonplaceholder.typicode.com/posts", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n  },\n  body: JSON.stringify({\n    title: "Learning Fetch",\n    body: "POST requests are powerful!",\n    userId: 1,\n  }),\n});\n\nconst newPost = await response.json();\nconsole.log("Created post ID:", newPost.id);\nconsole.log("Title:", newPost.title);`,
        expectedOutput: ["Created post ID: 101", "Title: Learning Fetch"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Run the code to POST data to JSONPlaceholder. It always assigns ID 101 to new posts.",
        "The server echoes back the data you sent, plus the new ID.",
      ],
    },
    {
      id: "other-methods",
      type: "explanation",
      instruction: {
        heading: "Other HTTP Methods: PUT, PATCH, DELETE",
        body: `<p>POST creates new data, but you also need to <em>update</em> and <em>delete</em> existing data. The other HTTP methods work just like POST — you set the <code>method</code> in the options object:</p>

<ul>
  <li><strong>PUT</strong> — Replaces the entire resource. You send the complete updated object. Think of it as rewriting a document from scratch.</li>
  <li><strong>PATCH</strong> — Updates specific fields without touching the rest. Think of it as editing a few sentences in a document.</li>
  <li><strong>DELETE</strong> — Removes the resource. Usually needs no body — just the URL of what to delete.</li>
</ul>

<p>The syntax is identical to POST, just change the <code>method</code> value. DELETE requests often don't need <code>headers</code> or <code>body</code> since you're not sending data — you're just telling the server which resource to remove.</p>`,
        docLinks: [
          {
            label: "PUT",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT",
            type: "js-concept",
          },
          {
            label: "DELETE",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// PUT — replace entire resource\nawait fetch("/api/posts/1", {\n  method: "PUT",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ title: "New Title", body: "New body", userId: 1 }),\n});\n\n// PATCH — update specific fields\nawait fetch("/api/posts/1", {\n  method: "PATCH",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ title: "Updated Title Only" }),\n});\n\n// DELETE — remove resource (no body needed)\nawait fetch("/api/posts/1", { method: "DELETE" });`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-post",
      type: "gap-fill",
      instruction: {
        heading: "Complete the POST Request",
        body: `<p>Fill in the blanks to complete a POST request that sends a new user to the server.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `const response = await fetch("/api/users", {\n  {{GAP1}}: "POST",\n  headers: {\n    "{{GAP2}}": "application/json",\n  },\n  body: JSON.{{GAP3}}({\n    name: "Alice",\n    email: "alice@example.com",\n  }),\n});`,
        gaps: [
          {
            id: "GAP1",
            placeholder: "property",
            acceptedAnswers: ["method"],
            caseSensitive: true,
          },
          {
            id: "GAP2",
            placeholder: "header name",
            acceptedAnswers: ["Content-Type"],
            caseSensitive: false,
          },
          {
            id: "GAP3",
            placeholder: "method",
            acceptedAnswers: ["stringify"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The property that sets the HTTP method is called 'method'.",
        "The header that tells the server the data format is 'Content-Type'.",
        "To convert an object to a JSON string, use JSON.stringify().",
      ],
    },
    {
      id: "create-post-function",
      type: "js-console",
      instruction: {
        heading: "Practice: createPost Function with Error Handling",
        body: `<p>Build a reusable <code>createPost</code> function that sends a POST request with error handling. The function should accept a title and body, send them to JSONPlaceholder, and return the created post.</p>

<p>Run the starter code to test the function.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `async function createPost(title, body) {\n  try {\n    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({ title, body, userId: 1 }),\n    });\n    if (!response.ok) {\n      throw new Error("HTTP " + response.status);\n    }\n    return await response.json();\n  } catch (error) {\n    console.log("Failed to create post:", error.message);\n    return null;\n  }\n}\n\nconst post = await createPost("My Post", "This is great!");\nif (post) {\n  console.log("Created:", post.title, "(ID:", post.id + ")");\n}`,
        expectedOutput: ["Created: My Post (ID: 101)"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "The function wraps the POST fetch in try/catch for error handling.",
        "Don't forget to JSON.stringify the body and set the Content-Type header.",
      ],
    },
  ],
};
