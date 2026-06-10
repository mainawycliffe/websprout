import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-nested-layouts",
  slug: "nested-layouts",
  title: "Layouts and Nested Layouts",
  description:
    "Share UI across pages with layouts, and give one section of your site its own wrapper with a nested layout — all through the children prop.",
  order: 8,
  steps: [
    {
      id: "shared-ui",
      type: "explanation",
      instruction: {
        heading: "One layout, shared by every page",
        body: `<p>A navigation bar shouldn't be copy-pasted into every page. That's what <code>layout.js</code> is for: UI that wraps its pages. You already have the <strong>root layout</strong> (<code>app/layout.js</code>) — put your site-wide header and nav there, and every page gets them automatically.</p><p>A layout is a component that receives a <code>children</code> prop and renders it. <code>children</code> is "whatever page is currently being shown." Put your shared header above <code>{children}</code> and a footer below it, and the page slots into the middle.</p>`,
        analogy: `A layout is a picture frame; <code>{children}</code> is the photo. The frame stays on the wall while you swap photos in and out. Navigating between pages swaps the photo without rebuilding the frame.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — layouts preserve state",
            body: `When you navigate between pages that share a layout, the layout <strong>doesn't re-render</strong> — a video keeps playing, a sidebar keeps its scroll position, an open menu stays open. Only the <code>{children}</code> part changes. This is a big usability win you get for free.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Layouts",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/layout",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/layout.js  —  shared by EVERY page
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </header>

        {children}

        <footer>© My Site</footer>
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
      id: "nesting",
      type: "explanation",
      instruction: {
        heading: "Nested layouts for one section",
        body: `<p>Sometimes only <em>part</em> of your site needs an extra wrapper — say, a sidebar that appears on every <code>/blog</code> page but nowhere else. Add a <code>layout.js</code> <strong>inside</strong> the <code>blog</code> folder. It wraps only the pages under <code>/blog</code>, and it itself is wrapped by the root layout.</p><p>So the page ends up nested: root layout → blog layout → blog page. Real apps use this constantly — think of a dashboard where the top nav (root layout) stays, and a settings sidebar (nested layout) appears only under <code>/settings</code>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `A nested <code>layout.js</code> does <strong>not</strong> repeat the <code>&lt;html&gt;</code> or <code>&lt;body&gt;</code> tags — those belong only to the root layout. A nested layout just returns its own wrapper (like a <code>&lt;section&gt;</code> with a sidebar) around <code>{children}</code>.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Nesting layouts",
            url: "https://nextjs.org/docs/app/getting-started/layouts-and-pages",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/blog/layout.js  —  wraps only the pages under /blog
export default function BlogLayout({ children }) {
  return (
    <section style={{ display: "flex", gap: "24px" }}>
      <aside>
        <h2>Blog menu</h2>
        {/* links to blog categories... */}
      </aside>
      <div>{children}</div>
    </section>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "layout-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: write a layout",
        body: `<p>Write a layout component. It must accept <code>{ children }</code> and render it somewhere inside — with some shared UI (a header or footer) around it. Paste it below, then try adding a nested <code>layout.js</code> to one of your route folders and watch only those pages get the extra wrapper.</p>`,
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/blog/layout.js
export default function BlogLayout({ children }) {
  return (
    <section>
      {/* Add some shared UI (e.g. an <aside> menu), then render {children} */}
    </section>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["children", "export default"] },
      },
      hints: [
        "The component must use <code>{ children }</code> in its parameters and render <code>{children}</code> in the JSX.",
      ],
    },
  ],
};
