import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-race-conditions-and-cleanup",
  slug: "race-conditions-and-cleanup",
  title: "Race Conditions and Cleanup",
  description:
    "When you refetch quickly, responses can arrive out of order and show the wrong data. Fix it with an effect cleanup that ignores stale results.",
  order: 7,
  steps: [
    {
      id: "the-stale-response-bug",
      type: "explanation",
      instruction: {
        heading: "The bug: fast typing, wrong results",
        body: `<p>Here's a bug that hits almost every real search box. The user types "M", you fire a request. They quickly type "Mo", you fire another. The "Mo" request happens to come back first and you show its results. Then — a moment later — the slower "M" request finally arrives and <em>overwrites</em> the screen with results for "M". The user typed "Mo" but is staring at results for "M". The data is stale.</p><p>This is a <strong>race condition</strong>: two requests are in flight, and you can't control which finishes first. The network makes no promises about order. Whichever response calls <code>setState</code> last wins — even if it's the one you no longer care about. Watch the diagram: the older request finishes last and clobbers the newer one.</p>`,
        analogy: `Imagine sending two letters asking a friend a question, then a follow-up correction. Mail is unpredictable — the original might arrive <em>after</em> the correction. If your friend simply acts on whichever letter lands last, they'll act on the outdated one. You need a way to say "ignore the old letter if a newer one exists."`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — it's invisible on fast connections",
            body: `Race conditions hide on your fast dev machine and show up for users on slow mobile networks. That's what makes them dangerous: the bug "doesn't reproduce" for you but corrupts data for real users. Always write the cleanup.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Fetching data (race conditions)",
            url: "https://react.dev/reference/react/useEffect#fetching-data-with-effects",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "cleanup-to-the-rescue",
      type: "explanation",
      instruction: {
        heading: "The fix: an ignore flag in the cleanup",
        body: `<p>An effect can <strong>return a cleanup function</strong>. React runs it before the effect re-runs (and when the component unmounts). This is the hook we need. The trick: declare a local <code>ignore = false</code> flag inside the effect. Only apply the result if <code>ignore</code> is still false. In the cleanup, set <code>ignore = true</code>.</p><p>Now when <code>userId</code> changes, React runs the previous effect's cleanup first — flipping its <code>ignore</code> to true — <em>then</em> starts the new effect. The old request might still resolve later, but its <code>if (!ignore)</code> check fails, so it quietly does nothing. The newest request is the only one allowed to update state. The diagram shows the stale response arriving and being dropped — the screen keeps the correct, newest data.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — AbortController, the heavier hammer",
            body: `For the same problem you can pass an <code>AbortController</code>'s <code>signal</code> to <code>fetch</code> and call <code>controller.abort()</code> in the cleanup — this actually <em>cancels</em> the network request. The <code>ignore</code> flag is simpler and enough for most cases; <code>AbortController</code> also saves bandwidth by stopping the request entirely.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — AbortController",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `useEffect(() => {
  let ignore = false; // this effect's "is this still the current request?" flag

  async function load() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
    const data = await res.json();
    if (!ignore) setUser(data); // only the current request gets to update state
  }
  load();

  return () => {
    ignore = true; // a newer effect is starting — ignore this one's late result
  };
}, [userId]);`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fix-the-race",
      type: "free-edit",
      instruction: {
        heading: "Your turn: make the request safe",
        body: `<p>This profile switcher works, but it has the race-condition bug — switch fast and a stale response can win. Add the cleanup guard:</p><ol><li>Add <code>let ignore = false;</code> at the top of the effect.</li><li>Wrap the state update: <code>if (!ignore) setUser(data);</code>.</li><li>Return a cleanup function that sets <code>ignore = true;</code>.</li></ol><p>The code includes a randomized delay to simulate an unreliable network, so the bug is visible. With the guard in place, only the user you currently have selected can ever appear — no matter what order the responses arrive in.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the flag is per-effect-run",
            body: `Each time the effect runs it creates a <em>fresh</em> <code>ignore</code> variable in its own closure. That's why flipping the old one to <code>true</code> in cleanup doesn't affect the new run — they're separate variables. This is closures from <code>js-functions</code> doing real work.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Returning a cleanup function",
            url: "https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development",
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
  <title>Race Conditions</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    button { font-size: 14px; padding: 6px 12px; margin: 0 6px 12px 0; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; }
    .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; max-width: 340px; }
    h2 { margin: 0 0 4px; }
    .muted { color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function ProfileSwitcher() {
      const [userId, setUserId] = useState(1);
      const [user, setUser] = useState(null);

      useEffect(() => {
        // TODO 1: let ignore = false;

        async function load() {
          setUser(null);
          // random delay simulates an unreliable network so the race is visible
          await new Promise((r) => setTimeout(r, 300 + Math.random() * 1200));
          const res = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
          const data = await res.json();
          // TODO 2: only update if this request is still the current one
          setUser(data);
        }
        load();

        // TODO 3: return a cleanup that sets ignore = true
      }, [userId]);

      return (
        <div>
          <div>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setUserId(n)}>User {n}</button>
            ))}
          </div>
          <p className="muted">Selected: User {userId}</p>
          {!user ? (
            <p className="muted">Loading…</p>
          ) : (
            <div className="card">
              <h2>{user.name}</h2>
              <p className="muted">{user.email}</p>
            </div>
          )}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<ProfileSwitcher />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["ignore", "if (!ignore)", "return"] },
      },
      hints: [
        "Top of the effect: <code>let ignore = false;</code>",
        "Guard the update: <code>if (!ignore) setUser(data);</code> (replace the bare <code>setUser(data)</code>).",
        "Cleanup: <code>return () =&gt; { ignore = true; };</code> as the last statement in the effect.",
      ],
    },
  ],
};
