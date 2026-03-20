import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-loading-states",
  slug: "loading-states",
  title: "Loading States and UX",
  description:
    "Learn to manage loading, success, and error states so your users always know what's happening.",
  order: 10,
  steps: [
    {
      id: "why-loading-states",
      type: "explanation",
      instruction: {
        heading: "Why Loading States Matter",
        body: `<p>Network requests take time. Even on a fast connection, fetching data from a server takes at least 50-200 milliseconds. On a slow connection, it could take several seconds. During that time, what does the user see? If the answer is "nothing" — a blank space where data should be — that's a terrible experience. Users won't know if the app is working, frozen, or broken.</p>

<p>Every data-fetching operation should communicate <strong>three possible states</strong> to the user:</p>
<ol>
  <li><strong>Loading</strong> — "We're getting your data, hang on." Show a spinner, skeleton, or "Loading..." text.</li>
  <li><strong>Success</strong> — "Here's your data!" Replace the loading indicator with the actual content.</li>
  <li><strong>Error</strong> — "Something went wrong." Show a helpful message, maybe with a retry button.</li>
</ol>

<p>Think about apps you use. When you open the YouTube app, you see placeholder rectangles where videos will appear (loading state). Then the thumbnails pop in (success state). If your connection drops, you see "No internet connection" with a retry button (error state). This three-state pattern is universal across all well-built web and mobile apps.</p>`,
        analogy:
          "It's like ordering at a restaurant. After you order, the waiter says 'Coming right up!' (<strong>loading</strong> — acknowledgment). If the food arrives, great (<strong>success</strong>). If there's a problem, the waiter comes back and explains: 'Sorry, we're out of salmon. Would you like something else?' (<strong>error</strong> — with a recovery option). The worst experience is when the waiter just disappears and you have no idea what's happening.",
        docLinks: [
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
      id: "loading-pattern",
      type: "explanation",
      instruction: {
        heading: "The Loading State Pattern",
        body: `<p>The pattern is straightforward: before starting the fetch, show "Loading...". When the fetch succeeds, replace the loading message with the actual data. If the fetch fails, replace it with an error message.</p>

<p>In code, this translates to updating the DOM at three points:</p>
<ol>
  <li><strong>Before <code>fetch()</code></strong> — Set the container's content to a loading indicator</li>
  <li><strong>After successful parse</strong> — Clear the container and render the data</li>
  <li><strong>In the <code>catch</code> block</strong> — Set the container's content to an error message</li>
</ol>

<p>You can also use this pattern to <strong>disable buttons</strong> during a fetch. If the user clicks a "Load More" button, disable it while the request is in progress so they can't spam clicks and send dozens of identical requests. Re-enable it once the fetch completes (whether success or failure).</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always put the loading state BEFORE the fetch call, and always restore the UI in BOTH the success and error paths. A common bug is forgetting to hide the loading indicator when an error occurs, leaving the user stuck on a 'Loading...' screen forever.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `async function loadUsers() {\n  const container = document.getElementById("output");\n\n  // 1. LOADING STATE\n  container.textContent = "Loading...";\n\n  try {\n    const response = await fetch(\n      "https://jsonplaceholder.typicode.com/users"\n    );\n    if (!response.ok) throw new Error("HTTP " + response.status);\n    const users = await response.json();\n\n    // 2. SUCCESS STATE\n    container.textContent = "";\n    users.forEach((user) => {\n      const p = document.createElement("p");\n      p.textContent = user.name;\n      container.appendChild(p);\n    });\n\n  } catch (error) {\n    // 3. ERROR STATE\n    container.textContent = "Failed to load: " + error.message;\n  }\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-loading-states",
      type: "free-edit",
      instruction: {
        heading: "Build It: Page with All Three States",
        body: `<p>Build a page with a button that fetches users on click, showing all three states: loading, success, and error. The starter code provides the HTML with a button and output area. Complete the JavaScript to:</p>

<ol>
  <li>Show "Loading users..." when the button is clicked</li>
  <li>Disable the button during the fetch</li>
  <li>Display user names on success</li>
  <li>Show an error message on failure</li>
  <li>Re-enable the button when done</li>
</ol>`,
      },
      config: {
        type: "free-edit",
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Loading States</title>\n  <style>\n    body { font-family: sans-serif; padding: 20px; }\n    button {\n      padding: 10px 20px; font-size: 1rem; cursor: pointer;\n      background: #3b82f6; color: white; border: none; border-radius: 6px;\n    }\n    button:disabled { background: #94a3b8; cursor: not-allowed; }\n    .loading { color: #6366f1; font-style: italic; }\n    .error { color: #ef4444; font-weight: bold; }\n    #output { margin-top: 16px; }\n  </style>\n</head>\n<body>\n  <h1>User Directory</h1>\n  <button id="loadBtn">Load Users</button>\n  <div id="output"></div>\n\n  <script>\n    const btn = document.getElementById("loadBtn");\n    const output = document.getElementById("output");\n\n    btn.addEventListener("click", async () => {\n      // Loading state\n      btn.disabled = true;\n      output.innerHTML = '<p class="loading">Loading users...</p>';\n\n      try {\n        const response = await fetch("https://jsonplaceholder.typicode.com/users");\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        const users = await response.json();\n\n        // Success state\n        output.textContent = "";\n        const list = document.createElement("ul");\n        users.forEach((user) => {\n          const li = document.createElement("li");\n          li.textContent = user.name + " — " + user.email;\n          list.appendChild(li);\n        });\n        output.appendChild(list);\n\n      } catch (error) {\n        // Error state\n        output.innerHTML = '<p class="error">Failed: ' + error.message + "</p>";\n      } finally {\n        btn.disabled = false;\n      }\n    });\n  </script>\n</body>\n</html>`,
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["fetch", "disabled"] },
      },
      hints: [
        "Set btn.disabled = true before the fetch and false in a finally block.",
        "Use try/catch/finally to handle all three states cleanly.",
        "The 'finally' block runs whether the fetch succeeded or failed — perfect for re-enabling the button.",
      ],
    },
    {
      id: "disabling-buttons",
      type: "explanation",
      instruction: {
        heading: "Disabling Buttons During Fetch",
        body: `<p>A common UX problem: the user clicks "Submit" and nothing seems to happen for a second, so they click again. And again. Now three identical requests are flying to the server. This can create duplicate data, cause errors, or waste resources.</p>

<p>The fix is simple: <strong>disable the button</strong> as soon as the user clicks it, and <strong>re-enable it</strong> when the operation completes. Combined with a loading indicator, this tells the user "I heard you, I'm working on it."</p>

<p>The <code>finally</code> block is perfect for re-enabling buttons. It runs whether the operation succeeded or failed, so the button always becomes clickable again. Without <code>finally</code>, you'd need to re-enable the button in both the success path and the error path — and if you forget one, the button stays permanently disabled.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always re-enable buttons in a <code>finally</code> block, not just in the success handler. If you only re-enable on success, a failed request will leave the button permanently disabled — the user can't even retry!",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `btn.addEventListener("click", async () => {\n  btn.disabled = true;\n  btn.textContent = "Submitting...";\n\n  try {\n    await submitForm(formData);\n    showSuccess("Form submitted!");\n  } catch (error) {\n    showError("Submission failed. Please try again.");\n  } finally {\n    // ALWAYS runs — whether success or failure\n    btn.disabled = false;\n    btn.textContent = "Submit";\n  }\n});`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "recap",
      type: "explanation",
      instruction: {
        heading: "The Complete Data-Fetching Pattern",
        body: `<p>Let's put everything together. Here's the complete, production-ready pattern for fetching and displaying data. This combines every technique from the module so far:</p>

<ol>
  <li><strong>Show loading state</strong> and disable interactive elements</li>
  <li><strong>Fetch</strong> the data with <code>await fetch(url)</code></li>
  <li><strong>Check <code>response.ok</code></strong> and throw if not successful</li>
  <li><strong>Parse JSON</strong> with <code>await response.json()</code></li>
  <li><strong>Render</strong> data into the DOM using <code>createElement</code> and <code>textContent</code></li>
  <li><strong>Catch errors</strong> and show a user-friendly error message</li>
  <li><strong>Restore UI</strong> in a <code>finally</code> block (re-enable buttons, hide spinners)</li>
</ol>

<p>This pattern applies whether you're building a social media feed, a product catalog, a dashboard, or any feature that displays server data. Master this flow and you have the foundation for every data-driven web application.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `async function loadAndDisplay(url, container) {\n  // 1. Loading state\n  container.textContent = "Loading...";\n\n  try {\n    // 2. Fetch\n    const response = await fetch(url);\n\n    // 3. Check response\n    if (!response.ok) {\n      throw new Error("Server error: " + response.status);\n    }\n\n    // 4. Parse\n    const data = await response.json();\n\n    // 5. Render\n    container.textContent = "";\n    data.forEach((item) => {\n      const el = document.createElement("p");\n      el.textContent = item.name;\n      container.appendChild(el);\n    });\n\n  } catch (error) {\n    // 6. Error state\n    container.textContent = "Error: " + error.message;\n  }\n  // 7. finally block for cleanup (if needed)\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
