import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-loading-and-error-states",
  slug: "loading-and-error-states",
  title: "Loading and Error States",
  description:
    "Real fetches are slow and sometimes fail. Track loading, error, and data as three pieces of state so the UI is honest at every moment.",
  order: 3,
  steps: [
    {
      id: "every-fetch-has-three-states",
      type: "explanation",
      instruction: {
        heading: "Every fetch has three states, not one",
        body: `<p>Beginners write code for the happy path only: fetch, show data. But a network request lives in time, and at any instant it's in exactly one of three states:</p><ul><li><strong>Loading</strong> — the request is in flight; we have nothing to show yet.</li><li><strong>Error</strong> — the request failed (no internet, server down, a 404).</li><li><strong>Success</strong> — we have the data.</li></ul><p>So we track three pieces of state — <code>loading</code>, <code>error</code>, and <code>data</code> — and render a different branch for each. The diagram shows the decision: <code>if (loading) … else if (error) … else show data</code>. Exactly one branch wins; the user is never staring at a blank screen wondering if the app is broken.</p>`,
        analogy: `It's like ordering a package online. The tracking page never just shows "delivered" from the start. It shows "preparing" (loading), maybe "delivery failed — we'll retry" (error), or finally "delivered" (success). A good UI is honest about which of these is true right now.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — accessible loading and errors",
            body: `Don't make loading and error states purely visual. Screen-reader users benefit from text like "Loading users…" and a clear error message. A spinner with no text is invisible to assistive tech — pair it with a label.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Conditional rendering",
            url: "https://react.dev/learn/conditional-rendering",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "always-handle-errors",
      type: "explanation",
      instruction: {
        heading: "fetch() doesn't throw on 404 — you must check",
        body: `<p>A subtle trap you met in <code>js-fetch</code> bites here too: <code>fetch()</code> only rejects on a <em>network</em> failure (no connection, DNS error). A response of <strong>404 Not Found</strong> or <strong>500 Server Error</strong> is still a "successful" fetch as far as the promise is concerned. So you must check <code>response.ok</code> yourself and <code>throw</code> if it's false — otherwise you'll try to read JSON that isn't there.</p><p>Wrap the whole thing in <code>try/catch/finally</code>: the <code>catch</code> sets your <code>error</code> state, and the <code>finally</code> always sets <code>loading</code> to <code>false</code> — whether the fetch succeeded or failed. Watch the diagram cycle through a failing request: idle, loading, the request fails, and the error message lands in state.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — finally is your friend",
            body: `Put <code>setLoading(false)</code> in a <code>finally</code> block, not at the end of the <code>try</code>. If you only turn off loading on success, a failed request leaves the spinner spinning forever.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Response.ok",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `useEffect(() => {
  async function load() {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Request failed: " + res.status);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message); // network error OR our thrown !res.ok error
    } finally {
      setLoading(false);     // always runs, success or failure
    }
  }
  load();
}, []);`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-three-states",
      type: "free-edit",
      instruction: {
        heading: "Your turn: render all three states",
        body: `<p>The fetch logic is already written and working. Your job is the <strong>rendering</strong> — make the component honest about all three states. Add these early returns above the success markup:</p><ol><li>If <code>loading</code> is true, return a loading message.</li><li>If <code>error</code> is truthy, return the error message (use <code>{error}</code>).</li><li>Otherwise, the existing list renders.</li></ol><p>To see the error path in action, change the URL to a broken one (e.g. add a typo) and watch the error branch take over. Then fix it and the list returns.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — order matters",
            body: `Check <code>loading</code> first, then <code>error</code>, then render data. If you render data first, you might hit <code>users.map</code> while <code>users</code> is still its initial empty value during the error case.`,
          },
        ],
        docLinks: [
          {
            label: "JSONPlaceholder — /users",
            url: "https://jsonplaceholder.typicode.com/users",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "html-js",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Loading & Error States</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    ul { list-style: none; padding: 0; }
    li { padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 6px; }
    .muted { color: #64748b; }
    .error { color: #dc2626; font-weight: 600; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function UserList() {
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        async function load() {
          try {
            setLoading(true);
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!res.ok) throw new Error("Request failed: " + res.status);
            const data = await res.json();
            setUsers(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }
        load();
      }, []);

      // TODO 1: if (loading) return <p className="muted">Loading users…</p>;
      // TODO 2: if (error) return <p className="error">Error: {error}</p>;

      return (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<UserList />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["loading", "error", "return"] },
      },
      hints: [
        "Loading branch: <code>if (loading) return &lt;p className=\"muted\"&gt;Loading users…&lt;/p&gt;;</code>",
        "Error branch: <code>if (error) return &lt;p className=\"error\"&gt;Error: {error}&lt;/p&gt;;</code>",
        "Put both lines just above the <code>return ( &lt;ul&gt; … )</code>. To test the error path, break the URL on purpose.",
      ],
    },
  ],
};
