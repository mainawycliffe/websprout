import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-error-handling",
  slug: "error-handling",
  title: "Error Handling",
  description:
    "Learn to handle both network failures and HTTP errors gracefully so your app stays reliable.",
  order: 7,
  steps: [
    {
      id: "two-kinds-of-errors",
      type: "explanation",
      instruction: {
        heading: "Two Kinds of Errors",
        body: `<p>When making HTTP requests, two fundamentally different things can go wrong, and they require different handling:</p>

<p><strong>1. Network errors</strong> — The request never reached the server at all. The user's WiFi dropped, the server is down, or there's a DNS failure. In this case, <code>fetch()</code> <em>rejects</em> its Promise, and your <code>catch</code> block will fire. The user literally could not connect.</p>

<p><strong>2. HTTP errors</strong> — The request reached the server, and the server responded, but the response indicates a problem: 404 (not found), 403 (forbidden), 500 (server error), etc. Here's the tricky part: <code>fetch()</code> considers this a <em>successful</em> exchange because the network worked fine. The Promise resolves normally. You have to check <code>response.ok</code> yourself to detect these.</p>

<p>This distinction is critical. If you only use <code>try/catch</code>, you'll catch network errors but miss HTTP errors entirely. If you only check <code>response.ok</code>, you'll catch HTTP errors but crash on network failures. You need <strong>both</strong> for robust error handling.</p>`,
        analogy:
          "Imagine sending a letter. A <strong>network error</strong> is like the letter getting lost in the mail — it never arrived, and you never got any reply. An <strong>HTTP error</strong> is like the letter arriving, but the recipient writing back 'Wrong address' or 'I can't help you.' In both cases something went wrong, but the nature of the failure is completely different.",
        docLinks: [
          {
            label: "Fetch API - Checking that the fetch was successful",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful",
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
      id: "catching-network",
      type: "explanation",
      instruction: {
        heading: "Catching Network Errors with try/catch",
        body: `<p>Network errors are caught by wrapping your fetch call in a <code>try/catch</code> block. When the browser cannot connect to the server at all, the <code>fetch()</code> Promise rejects, and execution jumps to the <code>catch</code> block.</p>

<p>Common causes of network errors:</p>
<ul>
  <li>The user has no internet connection</li>
  <li>The server domain doesn't exist (typo in the URL)</li>
  <li>The server is completely down</li>
  <li>A firewall or CORS policy blocks the request</li>
</ul>

<p>In your <code>catch</code> block, the error object will have a <code>message</code> property describing what went wrong. Common messages include "Failed to fetch" (Chrome) and "NetworkError when attempting to fetch resource" (Firefox). These messages aren't very user-friendly, so you'll want to show your own error message to users.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "CORS errors also trigger the catch block, not an HTTP error response. If you see 'Failed to fetch' in development, check the browser console for CORS-related messages.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    // This catches NETWORK errors\n    // (no internet, server unreachable, CORS, etc.)\n    console.log("Network error:", error.message);\n    return null;\n  }\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "handling-http-errors",
      type: "explanation",
      instruction: {
        heading: "Handling HTTP Errors: Check Before You Parse",
        body: `<p>For HTTP errors (4xx and 5xx status codes), you need to explicitly check <code>response.ok</code> and throw your own error. This converts an HTTP error into a JavaScript error that your <code>catch</code> block can handle.</p>

<p>The complete pattern combines both strategies: <code>try/catch</code> wraps the entire operation, and inside the <code>try</code> block, you check <code>response.ok</code> and throw if something's wrong. This way, your <code>catch</code> block handles <em>both</em> network errors and HTTP errors in one place.</p>

<p>This is the pattern you should use for <strong>every</strong> fetch call in production code. It might seem like a lot of boilerplate, but it's the difference between an app that shows helpful error messages and one that silently fails or shows confusing errors.</p>`,
        docLinks: [
          {
            label: "Response.ok",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `async function fetchUser(id) {\n  try {\n    const response = await fetch(\n      "https://jsonplaceholder.typicode.com/users/" + id\n    );\n\n    // Check for HTTP errors (404, 500, etc.)\n    if (!response.ok) {\n      throw new Error("Server returned " + response.status);\n    }\n\n    const user = await response.json();\n    return user;\n\n  } catch (error) {\n    // Catches BOTH network errors AND our thrown HTTP errors\n    console.log("Failed to load user:", error.message);\n    return null;\n  }\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "try-robust-fetch",
      type: "js-console",
      instruction: {
        heading: "Try It: Robust Fetch with Full Error Handling",
        body: `<p>The starter code implements the complete error-handling pattern. It fetches a user, checks for HTTP errors, and catches all failures. Run it first with the valid URL, then try changing the user ID to <code>9999</code> (which returns a 404) to see the HTTP error handling kick in.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `async function fetchUser(id) {\n  try {\n    const response = await fetch(\n      "https://jsonplaceholder.typicode.com/users/" + id\n    );\n    if (!response.ok) {\n      throw new Error("HTTP " + response.status);\n    }\n    const user = await response.json();\n    console.log("User:", user.name);\n  } catch (error) {\n    console.log("Error:", error.message);\n  }\n}\n\nawait fetchUser(1);`,
        expectedOutput: ["User: Leanne Graham"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Run the code as-is for a successful fetch, then change the ID to 9999 to see error handling.",
        "The catch block handles both network errors and the HTTP error we throw manually.",
      ],
    },
    {
      id: "gap-fill-errors",
      type: "gap-fill",
      instruction: {
        heading: "Complete the Error Handling",
        body: `<p>Fill in the blanks to complete the error-handling pattern. Check the response, throw an error if it's not OK, and catch any failures.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `async function loadPost(id) {\n  {{GAP1}} {\n    const response = await fetch("/api/posts/" + id);\n    if (!response.{{GAP2}}) {\n      {{GAP3}} new Error("Failed: " + response.status);\n    }\n    return await response.json();\n  } catch (error) {\n    console.log(error.message);\n  }\n}`,
        gaps: [
          {
            id: "GAP1",
            placeholder: "keyword",
            acceptedAnswers: ["try"],
            caseSensitive: true,
          },
          {
            id: "GAP2",
            placeholder: "property",
            acceptedAnswers: ["ok"],
            caseSensitive: true,
          },
          {
            id: "GAP3",
            placeholder: "keyword",
            acceptedAnswers: ["throw"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Start with 'try' to wrap code that might fail.",
        "Check response.ok to detect HTTP errors.",
        "Use 'throw' to create an error that the catch block will handle.",
      ],
    },
    {
      id: "safe-fetch-helper",
      type: "js-console",
      instruction: {
        heading: "Practice: Build a safeFetch Helper",
        body: `<p>In real projects, you don't want to repeat the error-checking code for every fetch call. A common pattern is to create a <strong>helper function</strong> that wraps <code>fetch()</code> with error handling built in.</p>

<p>The starter code defines a <code>safeFetch</code> function that handles both error types and returns parsed JSON. Run it to verify it works, then try calling it with different URLs.</p>`,
      },
      config: {
        type: "js-console",
        starterCode: `async function safeFetch(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error("HTTP " + response.status);\n    }\n    return await response.json();\n  } catch (error) {\n    console.log("safeFetch error:", error.message);\n    return null;\n  }\n}\n\nconst user = await safeFetch("https://jsonplaceholder.typicode.com/users/1");\nif (user) {\n  console.log("Got:", user.name);\n}`,
        expectedOutput: ["Got: Leanne Graham"],
        timeout: 8000,
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "The safeFetch function wraps the entire fetch-check-parse pattern.",
        "It returns null on failure so the caller can check with a simple if statement.",
      ],
    },
  ],
};
