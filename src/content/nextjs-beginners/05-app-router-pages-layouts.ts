import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-app-router-pages-layouts",
  slug: "app-router-pages-layouts",
  title: "The App Router: page.js and layout.js",
  description:
    "Run the dev server and learn the two special files that define every Next.js route: page.js for a route's UI and layout.js for shared structure.",
  order: 5,
  steps: [
    {
      id: "start-the-server",
      type: "explanation",
      instruction: {
        heading: "Start the development server",
        body: `<p>Time to see your app live. In the terminal, inside your project folder, run <code>npm run dev</code>. This starts the <strong>development server</strong> — a local web server (powered by Node) that compiles your code on the fly and serves it at <code>http://localhost:3000</code>.</p><p>Open that address in your browser and you'll see your home page. Now change the text in <code>app/page.js</code>, save, and watch the browser update <em>instantly</em> without a refresh. That live updating is called <strong>Fast Refresh</strong>, and it's one of the biggest reasons developers love Next.js.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — leave it running",
            body: `Keep the dev server running in its terminal while you work. To stop it, press <code>Ctrl + C</code> in that terminal. To start again, run <code>npm run dev</code>. If port 3000 is busy, Next.js will offer the next free port (like 3001).`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Installation (run the dev server)",
            url: "https://nextjs.org/docs/app/getting-started/installation",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `# Inside your project folder:
npm run dev

# You'll see something like:
#   ▲ Next.js 16
#   - Local:  http://localhost:3000
#
# Open http://localhost:3000 in your browser.
# Edit app/page.js, save, and the page updates instantly.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "page-vs-layout",
      type: "explanation",
      instruction: {
        heading: "page.js renders a route; layout.js wraps it",
        body: `<p>The App Router is built from two special filenames. Learn these two and you understand the core of Next.js:</p><ul><li><strong><code>page.js</code></strong> — the UI for one specific route. <code>app/page.js</code> is the home page (<code>/</code>); <code>app/about/page.js</code> is <code>/about</code>.</li><li><strong><code>layout.js</code></strong> — UI <em>shared</em> across many pages: a header, footer, or nav that should appear on every page. A layout receives the current page as its <code>children</code> prop and renders it somewhere inside.</li></ul><p>The <code>app/layout.js</code> that <code>create-next-app</code> made is the <strong>root layout</strong> — it's required, and it's the only place the <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags live. Every page in your app renders inside it.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `The root <code>layout.js</code> owns the document's <code>&lt;html lang="en"&gt;</code> and <code>&lt;body&gt;</code> tags — set them here, not in individual pages. Pages render into the <code>{children}</code> slot, so you write the page-specific markup and the layout provides the wrapper.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Layouts and Pages",
            url: "https://nextjs.org/docs/app/getting-started/layouts-and-pages",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/layout.js  —  the required root layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>My Site</header>
        {/* the current page is rendered here */}
        {children}
      </body>
    </html>
  );
}

// app/page.js  —  the home page, rendered into {children}
export default function Page() {
  return <h1>Home</h1>;
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "page-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: write a page",
        body: `<p>Write a <code>page.js</code> component for your home route. It must <code>export default</code> a function that returns some JSX, including an <code>&lt;h1&gt;</code> heading. Paste your version below, then try it in your real <code>app/page.js</code> and view it at <code>localhost:3000</code>.</p>`,
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/page.js
export default function Page() {
  return (
    <main>
      {/* Add an <h1> and a <p> describing your site */}
    </main>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["export default", "<h1"] },
      },
      hints: [
        "Return an &lt;h1&gt; inside the &lt;main&gt;: <code>&lt;h1&gt;My Site&lt;/h1&gt;</code>.",
      ],
    },
  ],
};
