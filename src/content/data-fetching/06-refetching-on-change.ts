import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-refetching-on-change",
  slug: "refetching-on-change",
  title: "Refetching When Inputs Change",
  description:
    "Fetching once on mount is just the start. Put a value in the dependency array to refetch whenever the user picks, searches, or paginates.",
  order: 6,
  steps: [
    {
      id: "fetch-when-things-change",
      type: "explanation",
      instruction: {
        heading: "The dependency array controls when you refetch",
        body: `<p>So far the effect ran once with an empty <code>[]</code>. But real apps fetch <em>again</em> when something changes: you pick a different city on a weather app, open another user's profile, switch to page 2, or type in a search box. The data depends on a value, and when that value changes, the data must change too.</p><p>You express this by putting the value in the <strong>dependency array</strong>. <code>useEffect(fetchIt, [userId])</code> means: run the effect on mount, <em>and</em> re-run it every time <code>userId</code> changes. React compares the array between renders; if anything inside differs, the effect fires again. This is the same dependency-array rule from <code>react-fundamentals</code>, now doing real work.</p>`,
        analogy: `Think of a vending machine. You press a different button (change the input) and it dispenses a different snack (refetches). The machine doesn't keep handing you the same thing — it reacts to your selection. The dependency array is the wiring from "button pressed" to "go get the matching item."`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — list every value the effect uses",
            body: `React's lint rule (<code>react-hooks/exhaustive-deps</code>) insists that every prop or state value used <em>inside</em> the effect appears in the dependency array. This isn't bureaucracy — a missing dependency means the effect uses a stale value and fetches the wrong thing.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Specifying reactive dependencies",
            url: "https://react.dev/reference/react/useEffect#specifying-reactive-dependencies",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const [userId, setUserId] = useState(1);
const [user, setUser] = useState(null);

useEffect(() => {
  async function load() {
    setUser(null); // clear the old user so we show a loading state
    const res = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
    setUser(await res.json());
  }
  load();
}, [userId]); // <-- refetch every time userId changes`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "search-as-you-type",
      type: "free-edit",
      instruction: {
        heading: "Your turn: switch users with a dropdown",
        body: `<p>This app shows one user's details and has a dropdown to pick which user (1–5). The dropdown already updates <code>userId</code> state. Your job: make the effect <strong>refetch when <code>userId</code> changes</strong>.</p><ol><li>Finish the <code>load</code> function: fetch <code>https://jsonplaceholder.typicode.com/users/&#36;{userId}</code> and <code>setUser</code> the parsed result.</li><li>Add <code>userId</code> to the dependency array so the effect re-runs on every change.</li></ol><p>Pick different users from the dropdown and watch the card update each time. That's a dependent fetch — the heart of search, filters, and detail pages.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — clear old data on change",
            body: `Calling <code>setUser(null)</code> at the start of the effect makes the card show "Loading…" between selections, instead of briefly showing the <em>previous</em> user's data while the new request is in flight. Small touch, big polish.`,
          },
        ],
        docLinks: [
          {
            label: "JSONPlaceholder — /users/{id}",
            url: "https://jsonplaceholder.typicode.com/users/1",
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
  <title>Refetch on Change</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    select { font-size: 15px; padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1; margin-bottom: 12px; }
    .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; max-width: 340px; }
    h2 { margin: 0 0 4px; }
    .muted { color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function UserSwitcher() {
      const [userId, setUserId] = useState(1);
      const [user, setUser] = useState(null);

      useEffect(() => {
        async function load() {
          setUser(null);
          // TODO 1: fetch user number {userId} and setUser(...)
        }
        load();
      }, [/* TODO 2: add userId here */]);

      return (
        <div>
          <label>
            Pick a user:{" "}
            <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>User {n}</option>
              ))}
            </select>
          </label>

          {!user ? (
            <p className="muted">Loading…</p>
          ) : (
            <div className="card">
              <h2>{user.name}</h2>
              <p className="muted">{user.email} · {user.company.name}</p>
            </div>
          )}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<UserSwitcher />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["fetch", "setUser", "[userId]"] },
      },
      hints: [
        "Inside load: <code>const res = await fetch(\"https://jsonplaceholder.typicode.com/users/\" + userId);</code> then <code>setUser(await res.json());</code>",
        "Set the dependency array to <code>[userId]</code> so the effect re-runs whenever the dropdown changes it.",
        "If the card never changes, you probably left the dependency array empty — React thinks nothing changed.",
      ],
    },
  ],
};
