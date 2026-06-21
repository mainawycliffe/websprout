import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-nextjs-layout-file",
  slug: "nextjs-layout-file",
  title: "The Next.js Layout File",
  description:
    "The layout.tsx file wraps your pages with shared UI that persists across navigation — see exactly what {children} means.",
  order: 7,
  steps: [
    {
      id: "layout-wraps-children",
      type: "explanation",
      instruction: {
        heading: "layout.tsx wraps every page with shared UI",
        body: `<p>Almost every site has parts that appear on <em>every</em> page: a top nav, a footer, a sidebar. You don't want to copy that into every <code>page.tsx</code>. In Next.js, that shared shell goes in a special file: <strong><code>layout.tsx</code></strong>.</p><p>A layout is a component that receives a <code>children</code> prop and renders it somewhere inside its own markup. Whatever page the user is on gets slotted in where <code>{children}</code> appears. The diagram shows it: the nav and footer (the layout) stay fixed while only the inner <code>{children}</code> area swaps as you navigate.</p><p>The big win is in that word <strong>persists</strong>. When you click from Home to About, React keeps the layout mounted and only replaces the page content. The nav doesn't flicker or reload — it's the same component instance the whole time.</p>`,
        analogy: `A layout is a picture frame; pages are the photos you slide in and out. The frame (nav, footer) stays hanging on the wall; you just change which photo (page) it's showing.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — the root layout owns <html> and <body>",
            body: `The top-level <code>app/layout.tsx</code> is required and must render the <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags — it's the document shell for your whole site. This keeps a single, valid <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html">HTML document structure</a> no matter which page renders inside it.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Layouts and pages",
            url: "https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `// File: app/layout.tsx — wraps EVERY page in the app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>My Site — Home · About · Blog</nav>

        {/* the current page renders right here */}
        {children}

        <footer>© 2026 My Site</footer>
      </body>
    </html>
  );
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "nested-layouts",
      type: "explanation",
      instruction: {
        heading: "Layouts nest, just like folders",
        body: `<p>Routing folders can be deep, and layouts follow them. A <code>layout.tsx</code> inside a subfolder wraps only the pages <em>below</em> it — and it sits <em>inside</em> the layouts above it. Layouts nest exactly like the folder tree.</p><p>The diagram shows a dashboard: the root layout (site nav + footer) wraps a dashboard layout (a sidebar), which wraps the actual dashboard pages. Navigate between <em>Overview</em>, <em>Billing</em>, and <em>Team</em> and the sidebar stays put — only the innermost content changes. Each layer persists across navigation within its section.</p><p>This is how real apps avoid repetition: shared chrome lives at the right level of the tree, and pages only describe what's unique to them. <strong>Gmail</strong>, <strong>Notion</strong>, and most dashboards are built exactly this way — an outer shell, an inner section shell, then the content.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — a layout never re-mounts its children on navigation",
            body: `Because a layout stays mounted, any state inside it (an open sidebar, a scroll position, a media player) survives as you move between its pages. That's a feature: put "should keep playing across pages" UI in a layout, not a page.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Nested layouts",
            url: "https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#nesting-layouts",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `// File: app/dashboard/layout.tsx
// Wraps only /dashboard/* pages, INSIDE the root layout.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <aside>Sidebar — Overview · Billing · Team</aside>
      <section>{children}</section>
    </div>
  );
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "complete-the-layout",
      type: "gap-fill",
      instruction: {
        heading: "Complete the layout",
        body: `<p>A layout is only useful if it renders its pages. Fill in the special prop name a layout receives, and the JSX expression that drops the current page into the markup.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — children is the page",
            body: `Forgetting to render <code>{children}</code> is a classic beginner bug: the nav and footer show up, but the actual page content vanishes. If a page looks blank, check that its layout renders <code>{children}</code>.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Root layout (required)",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/layout",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template: `export default function RootLayout({ {{prop}} }) {
  return (
    <body>
      <nav>My Site</nav>
      { {{slot}} }
      <footer>© 2026</footer>
    </body>
  );
}`,
        gaps: [
          { id: "prop", placeholder: "the prop a layout receives", acceptedAnswers: ["children"], caseSensitive: true },
          { id: "slot", placeholder: "render the current page", acceptedAnswers: ["children"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Both blanks are the same word — the prop a layout always receives.",
        "It's <code>children</code>. Destructure it in the params, then render <code>{children}</code> in the JSX.",
      ],
    },
  ],
};
