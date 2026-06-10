import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-async-and-promise-all",
  slug: "async-and-promise-all",
  title: "Async Patterns & Promise.all",
  description:
    "Recap async/await, then run several async tasks at once with Promise.all — the difference between a snappy page and a slow one.",
  order: 11,
  steps: [
    {
      id: "sequential-vs-parallel",
      type: "explanation",
      instruction: {
        heading: "Don't wait in line when you can wait together",
        body: `<p>You met <code>async</code>/<code>await</code> in the Data Fetching module: mark a function <code>async</code>, then <code>await</code> a Promise to get its result. That's the foundation. Here's the upgrade that matters for real apps.</p><p>When a page needs <em>several</em> pieces of data, awaiting them one after another is wasteful — each waits for the previous to finish:</p><pre><code>const user = await fetchUser();    // wait 300ms...
const posts = await fetchPosts();  // ...THEN wait another 300ms = 600ms total</code></pre><p>If the requests don't depend on each other, start them <em>all at once</em> with <strong><code>Promise.all</code></strong>. It takes an array of Promises and resolves when they've <em>all</em> finished — in parallel:</p><pre><code>const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
// both run together — about 300ms total</code></pre><p>Notice the array destructuring on the left — <code>Promise.all</code> returns results in the same order you passed them in.</p>`,
        analogy: `Sequential awaits are like sending one friend to the store, waiting for them to return, <em>then</em> sending the next. <code>Promise.all</code> sends everyone out at once and waits for the last one back. Same errands, a fraction of the time.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `<code>Promise.all</code> rejects as soon as <em>any</em> one Promise fails — so wrap it in <code>try/catch</code>. If you'd rather get every result regardless of individual failures, use <code>Promise.allSettled</code>, which always resolves with the status of each.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Promise.all()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Sequential — slow: each await blocks the next (≈600ms)
async function loadSlow() {
  const user = await fetchUser();
  const posts = await fetchPosts();
  return { user, posts };
}

// Parallel with Promise.all — fast: both start together (≈300ms)
async function loadFast() {
  const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
  return { user, posts };
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "promise-all-practice",
      type: "js-console",
      instruction: {
        heading: "Your turn: fetch two things at once",
        body: `<p>The <code>fakeFetch(value, ms)</code> helper returns a Promise that resolves with <code>value</code> after <code>ms</code> milliseconds (a stand-in for a real network request). Inside <code>load</code>, use <code>Promise.all</code> to await <em>both</em> fake fetches together, destructure the results, and log them.</p><p>You should see <code>User: Ada</code> and <code>Posts: 2</code> appear together after a short wait.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Pass an <em>array</em> of Promises to <code>Promise.all([...])</code> and <code>await</code> the whole thing. The result is an array in the same order, so <code>const [user, posts] = ...</code> reads cleanly.`,
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode: `function fakeFetch(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function load() {
  // Use Promise.all to await fakeFetch("Ada", 300) and fakeFetch(2, 200)
  // Destructure into [user, posts], then log "User:" and "Posts:"
}

load();`,
        timeout: 8000,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["Promise.all", "await", "console.log"] },
      },
      hints: [
        'Inside load: <code>const [user, posts] = await Promise.all([fakeFetch("Ada", 300), fakeFetch(2, 200)]);</code>',
        'Then: <code>console.log("User:", user); console.log("Posts:", posts);</code>',
      ],
    },
  ],
};
