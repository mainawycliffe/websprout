import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-server-vs-client-components",
  slug: "server-vs-client-components",
  title: "Server vs Client Components",
  description:
    "Learn the App Router's biggest idea: components run on the server by default, and you opt into browser interactivity with 'use client'.",
  order: 9,
  steps: [
    {
      id: "two-worlds",
      type: "explanation",
      instruction: {
        heading: "Server by default, client when you need it",
        body: `<p>Here's something new that the CDN-React setup never had: in the App Router, your components run on the <strong>server</strong> by default. They're called <strong>Server Components</strong>. They render to HTML on the server and send it to the browser ready-made — fast, and great for content.</p><p>But the server has no clicks, no typing, no <code>useState</code> — that interactivity only exists in the browser. When a component needs state, event handlers, or effects, you mark it as a <strong>Client Component</strong> by adding <code>"use client"</code> as the very first line of the file.</p><ul><li><strong>Server Component (default):</strong> a blog article, a product description, a page that fetches data. No interactivity.</li><li><strong>Client Component (<code>"use client"</code>):</strong> a like button, a search box, a counter, anything using <code>useState</code>/<code>useEffect</code>/<code>onClick</code>.</li></ul><p>Real-world: on a product page, the description and price are a Server Component (just content), while the "Add to cart" button is a Client Component (it reacts to clicks).</p>`,
        analogy: `Think of a restaurant menu (Server Component) versus the "call the waiter" button (Client Component). The menu is printed once and handed to you — no interactivity needed. The button has to respond the moment you press it, so it needs to live where the action is.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — why split at all?",
            body: `Server Components ship <strong>less JavaScript</strong> to the browser (the user downloads HTML, not your component code) and can safely use secrets like API keys, because that code never reaches the browser. You only pay the cost of shipping JS for the parts that truly need to be interactive.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Server and Client Components",
            url: "https://nextjs.org/docs/app/getting-started/server-and-client-components",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/page.js  —  a Server Component (the default, no directive)
export default function Page() {
  // No state, no onClick — just content rendered on the server.
  return <h1>Welcome to our shop</h1>;
}


// app/like-button.js  —  a Client Component (note the first line)
"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>♥ {likes}</button>;
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "client-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: a client component",
        body: `<p>Write an interactive counter as a Client Component. The very first line must be <code>"use client"</code>, then import and use <code>useState</code>, and wire a button's <code>onClick</code> to update it. Paste it below, then save it as a file like <code>app/counter.js</code> and render it from a page.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the error you'll eventually hit",
            body: `If you use <code>useState</code> or <code>onClick</code> in a file <em>without</em> <code>"use client"</code> at the top, Next.js throws an error saying hooks can only be used in Client Components. The fix is always the same: add <code>"use client"</code> as the first line.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — use client directive",
            url: "https://nextjs.org/docs/app/api-reference/directives/use-client",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/counter.js
// (add the directive that makes this a Client Component on the first line)

import { useState } from "react";

export default function Counter() {
  // Add state and a button that increments it
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["use client", "useState", "onClick"] },
      },
      hints: [
        'The first line must be <code>"use client";</code> (with the quotes).',
        "Then: <code>const [count, setCount] = useState(0);</code> and <code>&lt;button onClick={() => setCount(count + 1)}&gt;{count}&lt;/button&gt;</code>.",
      ],
    },
  ],
};
