import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-useeffect-visualized",
  slug: "useeffect-visualized",
  title: "useEffect on a Timeline",
  description:
    "Effects, the dependency array, and cleanup — visualized as a timeline so you finally see when each part runs.",
  order: 4,
  steps: [
    {
      id: "effect-lifecycle",
      type: "explanation",
      instruction: {
        heading: "Effects run AFTER the browser paints",
        body: `<p>Most of your component is about <em>describing</em> the UI from state and props. But sometimes you need to reach <strong>outside</strong> React — fetch data, start a timer, subscribe to something, or touch the DOM directly. That "outside the render" work is a <strong>side effect</strong>, and it belongs in <code>useEffect</code>.</p><p>The timeline shows the order: React <strong>renders</strong> (runs your function), <strong>commits</strong> the result to the DOM, the <strong>browser paints</strong> it on screen, and only <em>then</em> your <strong>effect runs</strong>. Effects are deliberately last so they never block the user from seeing the UI.</p><p>This is why you don't fetch data in the middle of the render body — you'd be doing side-effect work during the "describe the UI" phase. <code>useEffect</code> gives that work a proper, predictable home.</p>`,
        analogy: `Rendering is like setting the dinner table — laying out exactly what should be there. An effect is the thing you do <em>after</em> everyone's seated: turn on the music, light the candles. It happens once the scene is already in place.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — don't set state unconditionally in an effect",
            body: `An effect that always calls a state setter triggers a render, which runs the effect, which sets state again — an infinite loop. Effects should react to <em>changes</em>, gated by the dependency array you'll meet next.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Synchronizing with Effects",
            url: "https://react.dev/learn/synchronizing-with-effects",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "the-dependency-array",
      type: "explanation",
      instruction: {
        heading: "The dependency array decides when it re-runs",
        body: `<p>The second argument to <code>useEffect</code> is the <strong>dependency array</strong>, and it's the part everyone gets wrong at first. It answers one question: <em>"since the last render, did anything the effect cares about change?"</em> If yes, run the effect again. If no, skip it.</p><p>The timeline shows all three modes:</p><ul><li><code>useEffect(fn, [])</code> — empty array: run <strong>once</strong> after the first render. Perfect for "load data when this screen opens".</li><li><code>useEffect(fn, [query])</code> — run again <strong>only when <code>query</code> changes</strong>. The effect is skipped on renders where it stayed the same.</li><li><code>useEffect(fn)</code> — no array: run after <strong>every</strong> render. Rarely what you want.</li></ul><p>Watch the diagram skip the effect when the dependency is unchanged, and re-run it when it changes. That gate is the whole point.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — list every value the effect uses",
            body: `If your effect reads a prop or state value, it belongs in the array. Leaving things out causes "stale" bugs where the effect uses an old value. The official ESLint rule <code>react-hooks/exhaustive-deps</code> catches these for you in a real project.`,
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
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "cleanup-functions",
      type: "explanation",
      instruction: {
        heading: "Cleanup runs before the next effect (and on unmount)",
        body: `<p>Some effects set up something ongoing: an interval, an event listener, a subscription, a WebSocket. If you never tear those down, they pile up — duplicate timers, memory leaks, listeners firing on dead components.</p><p>So an effect can <strong>return a function</strong>, and React runs that <strong>cleanup</strong> at exactly the right moments: just before the effect runs again (because a dependency changed), and once more when the component is removed from the screen (unmounts).</p><p>The timeline shows the rhythm: <em>effect → cleanup → effect → cleanup…</em> Each setup is always paired with its teardown. Subscribe in the effect, unsubscribe in the cleanup, and you never leak.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — pair add/remove listeners",
            body: `If you call <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener">addEventListener</a> in an effect, return a cleanup that calls <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener">removeEventListener</a> with the same handler. Same goes for <code>setInterval</code>/<code>clearInterval</code>. This mirrors how the DOM has always expected listeners to be managed.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Cleanup function",
            url: "https://react.dev/reference/react/useEffect#disconnecting-from-a-server",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "effect-with-cleanup",
      type: "free-edit",
      instruction: {
        heading: "Build an interval with a cleanup",
        body: `<p>Let's make a "seconds elapsed" ticker. It needs to start a timer when it mounts and stop it when it unmounts — a textbook effect-with-cleanup.</p><ol><li>In the effect, start a timer: <code>const id = setInterval(() =&gt; setSeconds(s =&gt; s + 1), 1000);</code></li><li><strong>Return</strong> a cleanup: <code>return () =&gt; clearInterval(id);</code></li><li>Use an empty dependency array <code>[]</code> so it sets up once.</li></ol><p>Without the cleanup, every re-render could stack another interval and the number would race. The cleanup keeps exactly one timer alive.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — use the updater form in timers",
            body: `Inside the interval, write <code>setSeconds(s =&gt; s + 1)</code>, not <code>setSeconds(seconds + 1)</code>. The arrow form always uses the latest value, so your timer doesn't get stuck on the <code>seconds</code> captured when the effect first ran.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — setInterval()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/setInterval",
            type: "js-method",
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
  <title>Effect with cleanup</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; }
    .clock { font-size: 40px; font-weight: 700; color: #0891b2; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function Timer() {
      const [seconds, setSeconds] = useState(0);

      useEffect(() => {
        // TODO: start an interval, and return a cleanup that clears it
      }, []);

      return <div className="clock">{seconds}s</div>;
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Timer />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["setInterval", "clearInterval", "return"] },
      },
      hints: [
        "Inside the effect: <code>const id = setInterval(() =&gt; setSeconds(s =&gt; s + 1), 1000);</code>",
        "Then return the cleanup: <code>return () =&gt; clearInterval(id);</code>",
      ],
    },
  ],
};
