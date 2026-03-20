import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-response-object",
  slug: "response-object",
  title: "Understanding Responses",
  description:
    "Learn to read HTTP status codes, check response success, and inspect headers — essential skills for robust data fetching.",
  order: 6,
  steps: [
    {
      id: "status-codes",
      type: "explanation",
      instruction: {
        heading: "HTTP Status Codes: What the Server Tells You",
        body: `<p>Every HTTP response comes with a <strong>status code</strong> — a three-digit number that tells you what happened. You've probably seen "404 Not Found" before (maybe on a broken link). That 404 is a status code. Understanding these codes is essential because your JavaScript needs to react differently depending on what the server says.</p>

<p>Status codes are grouped by their first digit:</p>
<ul>
  <li><strong>2xx (Success)</strong> — Everything worked. <code>200 OK</code> is the most common: "Here's the data you asked for."</li>
  <li><strong>3xx (Redirect)</strong> — The resource moved. The browser usually handles these automatically.</li>
  <li><strong>4xx (Client Error)</strong> — You made a mistake. <code>404 Not Found</code> means the URL doesn't exist. <code>401 Unauthorized</code> means you need to log in. <code>403 Forbidden</code> means you don't have permission.</li>
  <li><strong>5xx (Server Error)</strong> — The server broke. <code>500 Internal Server Error</code> means something went wrong on the server's end, and there's nothing you can do except try again later.</li>
</ul>

<p>Here's the important part: <code>fetch()</code> does <strong>NOT</strong> reject on HTTP errors like 404 or 500. It only rejects on <em>network</em> failures (the server is unreachable). A 404 response is still a successful HTTP exchange — the server responded, it just said "I don't have that." This is a common source of confusion for beginners.</p>`,
        analogy:
          "Status codes are like <strong>delivery receipts</strong>. A 200 is a signed receipt: 'Package delivered successfully.' A 404 is 'Address not found — returning to sender.' A 500 is 'Delivery truck broke down.' Just because the postal service delivers a 'not found' notice doesn't mean the postal service failed — it completed its job of telling you the outcome.",
        docLinks: [
          {
            label: "HTTP response status codes",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "HTTP status codes are defined in RFC 9110. The <code>fetch()</code> specification deliberately chose not to reject on HTTP errors to give developers full control over error handling. Always check <code>response.ok</code> yourself.",
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
      id: "checking-ok",
      type: "explanation",
      instruction: {
        heading: "Checking response.ok and response.status",
        body: `<p>Since <code>fetch()</code> doesn't throw on HTTP errors, you need to check the response yourself before trying to parse the data. The Response object gives you two key properties:</p>

<ul>
  <li><code>response.ok</code> — A boolean: <code>true</code> if status is 200-299, <code>false</code> otherwise. This is the simplest check.</li>
  <li><code>response.status</code> — The actual numeric status code (200, 404, 500, etc.) for more detailed handling.</li>
</ul>

<p>The standard pattern is: fetch, check <code>response.ok</code>, then parse. If <code>response.ok</code> is <code>false</code>, you should throw an error or handle it — otherwise you'll try to parse an error page as JSON and get confusing results.</p>

<p>This pattern protects your code. Imagine fetching user data, but the server returns a 404. Without checking, you'd try to read <code>user.name</code> from whatever the server sent (maybe an error HTML page), and your code would crash with a puzzling error. Always check first, then parse.</p>`,
        docLinks: [
          {
            label: "Response.ok",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok",
            type: "js-concept",
          },
          {
            label: "Response.status",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/status",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always check <code>response.ok</code> before calling <code>response.json()</code>. If the server returned an error page (HTML instead of JSON), calling <code>.json()</code> will throw a confusing parse error.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `async function fetchUser(id) {\n  const response = await fetch(\n    "https://jsonplaceholder.typicode.com/users/" + id\n  );\n\n  // Always check before parsing!\n  if (!response.ok) {\n    throw new Error("HTTP " + response.status);\n  }\n\n  const user = await response.json();\n  return user;\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "try-status",
      type: "js-console",
      instruction: {
        heading: "Try It: Check Response Status",
        body: `<p>Let's make two requests — one to a valid URL and one to an invalid one — to see the difference in status codes. The first request will succeed (200), and the second will return a 404 because there's no user with ID 9999.</p>

<p>Run the code and compare the <code>ok</code> and <code>status</code> values.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `// Valid URL - will succeed\nconst good = await fetch("https://jsonplaceholder.typicode.com/users/1");\nconsole.log("Good - ok:", good.ok, "status:", good.status);\n\n// Invalid URL - will return 404\nconst bad = await fetch("https://jsonplaceholder.typicode.com/users/9999");\nconsole.log("Bad - ok:", bad.ok, "status:", bad.status);`,
        expectedOutput: ["Good - ok: true status: 200", "Bad - ok: false status: 404"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Run the code to see the difference between a successful and failed HTTP response.",
        "Note that fetch() did NOT throw an error for the 404 — it resolved normally with ok: false.",
      ],
    },
    {
      id: "response-headers",
      type: "explanation",
      instruction: {
        heading: "Response Headers",
        body: `<p>Along with the status code and body, every HTTP response includes <strong>headers</strong> — metadata about the response. Headers tell you things like what type of data is being sent, how long you can cache it, and when the server processed the request.</p>

<p>You can access headers using <code>response.headers.get("header-name")</code>. Some commonly useful headers:</p>
<ul>
  <li><code>content-type</code> — What format the data is in (e.g., <code>application/json</code>)</li>
  <li><code>content-length</code> — How many bytes the response body is</li>
  <li><code>date</code> — When the server sent the response</li>
  <li><code>cache-control</code> — How long the browser can cache this response</li>
</ul>

<p>You won't need headers for most basic data fetching, but they become important when you're debugging problems or building more advanced features like caching or progress bars.</p>`,
        docLinks: [
          {
            label: "Headers",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Headers",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n\n// Access specific headers\nconsole.log(response.headers.get("content-type"));\n// "application/json; charset=utf-8"\n\nconsole.log(response.headers.get("cache-control"));\n// "max-age=43200" (cached for 12 hours)`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-check-ok",
      type: "gap-fill",
      instruction: {
        heading: "Complete the Response Check",
        body: `<p>Fill in the blanks to complete a fetch function that checks if the response is OK before parsing, and throws an error with the status code if it's not.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `async function safeFetch(url) {\n  const response = await fetch(url);\n\n  if (!response.{{GAP1}}) {\n    throw new Error("HTTP error: " + response.{{GAP2}});\n  }\n\n  const data = await response.json();\n  return data;\n}`,
        gaps: [
          {
            id: "GAP1",
            placeholder: "property",
            acceptedAnswers: ["ok"],
            caseSensitive: true,
          },
          {
            id: "GAP2",
            placeholder: "property",
            acceptedAnswers: ["status"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The boolean property that tells you if the status is 200-299 is .ok",
        "The numeric status code property is .status",
      ],
    },
  ],
};
