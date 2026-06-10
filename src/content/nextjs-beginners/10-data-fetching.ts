import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-data-fetching",
  slug: "data-fetching",
  title: "Fetching Data on the Server",
  description:
    "Load data directly inside an async Server Component with await fetch — no useEffect, no loading flash, and your API keys stay safe.",
  order: 10,
  steps: [
    {
      id: "server-fetch",
      type: "explanation",
      instruction: {
        heading: "Server Components can fetch data directly",
        body: `<p>In the Data Fetching module you fetched data in the browser with <code>useEffect</code> and managed loading and error states by hand. In Next.js, a <strong>Server Component can be <code>async</code></strong> and simply <code>await</code> the data <em>before</em> it renders.</p><p>Because this runs on the server, the page arrives at the browser already filled with data — no spinner flash, and search engines see the real content. And since the fetch code never reaches the browser, you can use secret API keys safely.</p><pre><code>export default async function Page() {
  const res = await fetch("https://api.vercel.app/blog");
  const posts = await res.json();
  // ...render posts
}</code></pre><p>That's the whole pattern: mark the component <code>async</code>, <code>await</code> your data, render it. No hooks required.</p>`,
        analogy: `Client-side fetching (the old way) is like getting an empty plate, then waiting at the table while the kitchen cooks. Server fetching is like the meal arriving fully plated — the work happened in the kitchen (server) before it ever reached you.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Only <strong>Server Components</strong> can be <code>async</code> and <code>await</code> data this way. A Client Component (<code>"use client"</code>) can't — it still fetches in the browser, using <code>useEffect</code> or a library. So put your data fetching in Server Components whenever you can.`,
          },
          {
            variant: "tip",
            title: "Tip — caching changed in Next.js 16",
            body: `In Next.js 16, <code>fetch</code> results are <strong>not cached by default</strong> — each request gets fresh data. When you want to store a result and reuse it, you opt in with the <code>use cache</code> directive. For now, the default (always fresh) is the simplest thing to learn.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Fetching data",
            url: "https://nextjs.org/docs/app/getting-started/fetching-data",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/blog/page.js  —  an async Server Component
export default async function BlogPage() {
  // Runs on the server. The page renders only after the data arrives.
  const res = await fetch("https://api.vercel.app/blog");
  const posts = await res.json();

  return (
    <main>
      <h1>Latest posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fetch-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: fetch and render a list",
        body: `<p>Write an <code>async</code> Server Component page that <code>await</code>s data from <code>https://api.vercel.app/blog</code>, turns the response into JSON, and renders the titles in a list (with a <code>key</code> on each item). Paste it below, then drop it into a real route like <code>app/blog/page.js</code> and load it in the browser.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — two awaits",
            body: `Fetching is two steps: <code>await fetch(url)</code> gets the response, then <code>await res.json()</code> reads the body as JSON. Forgetting the second <code>await</code> is a classic mistake — you'd be trying to map over a Promise.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Fetching data",
            url: "https://nextjs.org/docs/app/getting-started/fetching-data",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/blog/page.js
export default async function BlogPage() {
  // 1. await fetch the blog API
  // 2. await res.json()
  // 3. map the posts into a list with keys
  return (
    <main>
      <h1>Latest posts</h1>
      {/* render the list here */}
    </main>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["async", "await", "fetch", ".json()"] },
      },
      hints: [
        'Fetch: <code>const res = await fetch("https://api.vercel.app/blog");</code>',
        "Parse: <code>const posts = await res.json();</code> then <code>{posts.map((p) => &lt;li key={p.id}&gt;{p.title}&lt;/li&gt;)}</code>",
      ],
    },
  ],
};
