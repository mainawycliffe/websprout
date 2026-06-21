import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-codelab-nextjs-layout-routes",
  slug: "codelab-nextjs-layout-routes",
  title: "Codelab: Next.js Layouts & Nested Routes",
  description:
    "A guided local project — scaffold a Next.js app, build a shared root layout, add pages, and prove the layout persists while pages swap.",
  order: 12,
  steps: [
    {
      id: "layout-codelab-brief",
      type: "explanation",
      instruction: {
        heading: "What you'll build",
        body: `<p>Set aside about an <strong>hour</strong>. You'll build a small multi-page site in a <strong>real Next.js project on your computer</strong> to feel, first-hand, how layouts and file-based routing work together.</p><p>By the end you'll have: a shared <strong>root layout</strong> (a nav bar + footer on every page), three pages reached by clean URLs (<code>/</code>, <code>/about</code>, <code>/projects</code>), and a <strong>nested layout</strong> for a dashboard section that keeps its own sidebar while inner pages swap. You'll watch the nav <em>not</em> reload as you click around — the whole point of layouts.</p><p>Watch for <strong>🔧 Your turn</strong> boxes — that's where you make it yours. Keep <code>npm run dev</code> running and check the browser after every step.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — keep two windows side by side",
            body: `This lesson on one side, your project in VS Code with <code>npm run dev</code> running on the other. The code blocks are your reference — type them into your own files and watch <code>localhost:3000</code> update.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Routing fundamentals",
            url: "https://nextjs.org/docs/app/building-your-application/routing",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "layout-codelab-create",
      type: "explanation",
      instruction: {
        heading: "Part 1 — scaffold the app",
        body: `<p>You'll need <strong>Node.js 20.9+</strong> (which includes npm). If you've done the Next.js for Beginners module you already have it; if not, grab it from <a href="https://nodejs.org">nodejs.org</a> first.</p><p>In a terminal, move to where your projects live, then scaffold a new app. The flags pick the simplest first-project setup: JavaScript, plain CSS, the App Router. Then start the dev server and open <code>http://localhost:3000</code>.</p><p>📚 More on WebSprout: <a href="/nextjs-beginners/create-next-app">Scaffolding with create-next-app</a>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — accept the defaults",
            body: `If <code>create-next-app</code> asks extra questions, press Enter to accept defaults. If it asks about TypeScript or Tailwind, choose <strong>No</strong> to keep this project minimal.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — create-next-app reference",
            url: "https://nextjs.org/docs/app/api-reference/cli/create-next-app",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `# Move to where your projects live (the Desktop is fine):
cd Desktop

# Scaffold a new app called "layouts-lab":
npx create-next-app@latest layouts-lab --js --eslint --app --no-tailwind --no-src-dir --import-alias "@/*"

# Go in and start the dev server:
cd layouts-lab
npm run dev

# Open http://localhost:3000 in your browser.`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "layout-codelab-root-layout",
      type: "explanation",
      instruction: {
        heading: "Part 2 — build the root layout",
        body: `<p>Open <code>app/layout.js</code>. Next.js created it for you — it's the shell that wraps every page. Replace its body so it renders a <strong>nav</strong> and a <strong>footer</strong> around <code>{children}</code>, with <code>&lt;Link&gt;</code> for navigation.</p><p>The crucial line is <code>{children}</code>: that's where the current page gets slotted in. Everything outside it — the nav, the footer — stays mounted on every page. Save, and you'll see the nav and footer appear on the homepage immediately.</p><p>📚 More on WebSprout: <a href="/react-nextjs-visualized/nextjs-layout-file">The Next.js Layout File</a>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — navigate with <Link>, not <a>",
            body: `Use Next.js's <code>&lt;Link href="/about"&gt;</code> for internal links. It does a fast client-side transition — the layout stays mounted and only the page swaps. A plain <code>&lt;a&gt;</code> would do a full page reload and throw away that benefit.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — <Link> component",
            url: "https://nextjs.org/docs/app/api-reference/components/link",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `// app/layout.js
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ display: "flex", gap: 16, padding: 16, background: "#0f172a", color: "#fff" }}>
          <Link href="/" style={{ color: "#fff" }}>Home</Link>
          <Link href="/about" style={{ color: "#fff" }}>About</Link>
          <Link href="/projects" style={{ color: "#fff" }}>Projects</Link>
        </nav>

        <main style={{ padding: 24 }}>{children}</main>

        <footer style={{ padding: 16, color: "#64748b" }}>© 2026 — built with Next.js</footer>
      </body>
    </html>
  );
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "layout-codelab-pages",
      type: "explanation",
      instruction: {
        heading: "Part 3 — add pages and watch the layout persist",
        body: `<p>Now create the pages the nav links to. Each is a folder with a <code>page.js</code> inside — the file-based routing you visualized earlier.</p><p>Create <code>app/about/page.js</code> and <code>app/projects/page.js</code> (the homepage <code>app/page.js</code> already exists — simplify it). Then click between the three links in your browser. <strong>Watch closely:</strong> the nav and footer never flicker or reload — only the middle content changes. That's the layout persisting.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "🔧 Your turn",
            body: `Make these pages about <em>you</em>: your real bio on About, your actual projects or hobbies on Projects. Add a heading and a paragraph or two to each. The structure is the lesson; the content is yours.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Defining routes",
            url: "https://nextjs.org/docs/app/building-your-application/routing/defining-routes",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `// app/page.js  → URL "/"
export default function Home() {
  return <h1>Welcome home 👋</h1>;
}

// app/about/page.js  → URL "/about"
export default function About() {
  return (
    <div>
      <h1>About me</h1>
      <p>A short bio goes here.</p>
    </div>
  );
}

// app/projects/page.js  → URL "/projects"
export default function Projects() {
  return (
    <div>
      <h1>My projects</h1>
      <p>A few things I've built.</p>
    </div>
  );
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "layout-codelab-nested",
      type: "explanation",
      instruction: {
        heading: "Part 4 — add a nested layout",
        body: `<p>Now nest a layout. Create a <code>dashboard</code> section that has its <em>own</em> sidebar layout, sitting inside the root layout. Add <code>app/dashboard/layout.js</code> with a sidebar, plus two pages: <code>app/dashboard/page.js</code> and <code>app/dashboard/settings/page.js</code>.</p><p>Visit <code>/dashboard</code> and <code>/dashboard/settings</code>. Now there are <strong>two</strong> persistent shells: the site nav/footer (root layout) <em>and</em> the dashboard sidebar (nested layout). Move between the two dashboard pages and the sidebar stays put while only the inner content swaps — layouts nesting exactly like the folders.</p><p>📚 More on WebSprout: <a href="/react-nextjs-visualized/nextjs-layout-file">Nested layouts</a>.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — one valid document, many shells",
            body: `Only the root layout renders <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code>. Nested layouts return plain elements (a <code>&lt;div&gt;</code> with a sidebar). The browser still receives one well-formed HTML document — the layers just compose inside the body.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Nesting layouts",
            url: "https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#nesting-layouts",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `// app/dashboard/layout.js — wraps only /dashboard/* pages
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <aside style={{ minWidth: 140 }}>
        <Link href="/dashboard">Overview</Link><br />
        <Link href="/dashboard/settings">Settings</Link>
      </aside>
      <section style={{ flex: 1 }}>{children}</section>
    </div>
  );
}

// app/dashboard/page.js  → "/dashboard"
export default function Overview() {
  return <h2>Dashboard overview</h2>;
}

// app/dashboard/settings/page.js  → "/dashboard/settings"
export default function Settings() {
  return <h2>Settings</h2>;
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "layout-codelab-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: your nested route",
        body: `<p>You built a multi-page site with a shared layout and a nested layout — and saw the shells persist as pages swap. As a final record, sketch one more page of your own design below.</p><p>Pick any new route — say <code>app/dashboard/billing/page.js</code> — and write its component. Then add a matching <code>&lt;Link&gt;</code> to the dashboard sidebar in your real project so you can reach it.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — what to learn next",
            body: `Great next steps from here: a dynamic route (<code>app/dashboard/[id]/page.js</code>), a <code>loading.js</code> for instant loading UI, and fetching real data in a server component. The official Next.js "Learn" course is an excellent guided follow-up.`,
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
        starterCode: `// app/dashboard/billing/page.js — your new nested page
export default function Billing() {
  return (
    <div>
      <h2>Billing</h2>
      {/* your content here */}
    </div>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["export default", "function", "return"] },
      },
      hints: [
        "Every page is a component that <code>export default</code>s a function returning JSX.",
        "Remember to add a <code>&lt;Link href=\"/dashboard/billing\"&gt;Billing&lt;/Link&gt;</code> to your dashboard sidebar so you can navigate to it.",
      ],
    },
  ],
};
