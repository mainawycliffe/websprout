import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-capstone-multipage-site",
  slug: "capstone-multipage-site",
  title: "Capstone: Build and Deploy a Multi-Page Site",
  description:
    "Combine everything — layout, routing, links, a client component, and server data fetching — into a real multi-page site, then deploy it to the web.",
  order: 12,
  steps: [
    {
      id: "capstone-brief",
      type: "explanation",
      instruction: {
        heading: "The brief",
        body: `<p>You'll build a small but complete website that uses every idea from this module, then put it online. It will have:</p><ol><li>A <strong>shared layout</strong> with a navigation bar on every page.</li><li>A <strong>Home</strong> page and an <strong>About</strong> page (file-system routing).</li><li>An <strong>interactive widget</strong> (a Client Component with state).</li><li>A <strong>Posts</strong> page that fetches data on the server (an async Server Component).</li><li>A <strong>deploy</strong> to the live web with Vercel.</li></ol><p>Work in your real project as you go, running <code>npm run dev</code> and checking each page in the browser. The code blocks in the next steps are your reference.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Build one piece at a time and check the browser after each. If a page breaks, the dev-server terminal and the browser usually show a clear error pointing at the file and line.`,
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-layout",
      type: "explanation",
      instruction: {
        heading: "Step 1 — the shared layout with navigation",
        body: `<p>Open <code>app/layout.js</code> and give it a nav bar that links to all your pages with <code>&lt;Link&gt;</code>. Because it's the root layout, this nav appears on every page automatically, and it keeps the required <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `// app/layout.js
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav style={{ display: "flex", gap: "16px" }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/posts">Posts</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>Built with Next.js</footer>
      </body>
    </html>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-pages",
      type: "explanation",
      instruction: {
        heading: "Step 2 — the Home and About pages",
        body: `<p>Create the two simple content pages. <code>app/page.js</code> is the home page; make the <code>about</code> folder with its own <code>page.js</code>. Both are Server Components — just content, no interactivity.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `// app/page.js  ->  "/"
export default function HomePage() {
  return (
    <section>
      <h1>My Next.js Site</h1>
      <p>A tiny site I built while learning Next.js.</p>
    </section>
  );
}

// app/about/page.js  ->  "/about"
export default function AboutPage() {
  return (
    <section>
      <h1>About</h1>
      <p>Hi! I'm learning to build real websites with React and Next.js.</p>
    </section>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-widget",
      type: "explanation",
      instruction: {
        heading: "Step 3 — an interactive Client Component",
        body: `<p>Add a touch of interactivity. Create <code>app/greeter.js</code> as a Client Component (note <code>"use client"</code> on the first line) that takes a name in an input and greets the user. Then render <code>&lt;Greeter /&gt;</code> from your home page.</p><p>This is the server/client split in action: the page around it is server-rendered content, and just this widget ships interactivity to the browser.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `A Server Component (like your home page) can import and render a Client Component (like <code>&lt;Greeter /&gt;</code>). The reverse needs care — but "server page renders a client widget" is the everyday pattern.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/greeter.js
"use client";

import { useState } from "react";

export default function Greeter() {
  const [name, setName] = useState("");
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <p>{name ? "Hello, " + name + "!" : "Type your name above."}</p>
    </div>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-data",
      type: "explanation",
      instruction: {
        heading: "Step 4 — a server-fetched Posts page",
        body: `<p>Create <code>app/posts/page.js</code> as an <code>async</code> Server Component that fetches a list and renders it. The data is loaded on the server before the page is sent, so there's no loading spinner to manage.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `// app/posts/page.js  ->  "/posts"
export default async function PostsPage() {
  const res = await fetch("https://api.vercel.app/blog");
  const posts = await res.json();

  return (
    <section>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </section>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-deploy",
      type: "explanation",
      instruction: {
        heading: "Step 5 — deploy it to the web",
        body: `<p>Your site runs locally — now put it online. First confirm it builds for production with <code>npm run build</code> (this catches errors that <code>npm run dev</code> might let slide). Then deploy with <strong>Vercel</strong>, the hosting platform built by the makers of Next.js — it deploys Next.js apps with zero configuration.</p><p>The usual flow: push your project to a GitHub repository, then import it at <a href="https://vercel.com">vercel.com</a>. Vercel builds it and gives you a live URL. Or use the Vercel CLI shown below for a one-command deploy.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `<code>npm run build</code> compiles your app ahead of time into optimized files — the production version of the in-browser translation you saw in the React module. If the build succeeds locally, it will succeed on the host.`,
          },
          {
            variant: "tip",
            title: "Tip",
            body: `Vercel is one of many hosts. A Next.js app can also run on Netlify, Cloudflare, your own Node.js server, or a Docker container — anywhere that runs Node. Vercel is just the quickest path for your first deploy.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Deploying",
            url: "https://nextjs.org/docs/app/getting-started/deploying",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `# 1. Make sure it builds for production:
npm run build

# 2a. Easiest: push to GitHub, then import the repo at vercel.com
git init
git add .
git commit -m "My first Next.js site"
# ...push to a GitHub repo, then "Import Project" on vercel.com

# 2b. Or deploy straight from the terminal with the Vercel CLI:
npx vercel`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: your root layout",
        body: `<p>You've shipped a real, multi-page, deployable Next.js site — congratulations! As a final check, paste your finished <code>app/layout.js</code> below. It should <code>import Link</code>, render a nav, and render <code>{children}</code> so every page shows inside the shared shell.</p><p>From here, keep going: add more pages, a real data source, CSS Modules for styling, and dynamic routes (<code>app/posts/[id]/page.js</code>) when you're ready. Everything you learned in React and Next.js scales straight up to professional apps.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — what to learn next",
            body: `Great next steps: dynamic routes with <code>[id]</code> segments, the <code>loading.js</code> file for instant loading states, route handlers (API endpoints), and a real database. The official Next.js "Learn" course is an excellent guided follow-up.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Learn course",
            url: "https://nextjs.org/learn",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/layout.js  —  paste your finished root layout
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* your nav with <Link> elements, then render {children} */}
      </body>
    </html>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["Link", "children", "export default"] },
      },
      hints: [
        "Render the page content with <code>{children}</code> inside the &lt;body&gt;.",
        'Add nav links above it: <code>&lt;Link href="/"&gt;Home&lt;/Link&gt;</code>, etc.',
      ],
    },
  ],
};
