import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-colocation",
  slug: "colocation",
  title: "Colocation: Keep Files Next to Where They're Used",
  description:
    "As your app grows, where do components and helpers go? Learn how Next.js lets you safely keep non-page files right next to the routes that use them.",
  order: 12,
  steps: [
    {
      id: "the-problem",
      type: "explanation",
      instruction: {
        heading: "Where do all the other files go?",
        body: `<p>So far every file you've made in <code>app/</code> has been a <code>page.js</code> or a <code>layout.js</code>. But real pages need <em>more</em>: a chart component, a helper that formats a date, a little CSS file. Where should those live?</p><p>Here's the good news: Next.js is <strong>unopinionated</strong> — it doesn't force a structure on you. And there's one rule that makes everything click: <strong>a folder only becomes a real URL when it contains a <code>page.js</code> (or <code>route.js</code>).</strong> Any <em>other</em> file you drop into a route folder is invisible to the router. So you can keep a page's helpers right beside it.</p><p>Putting related files together — the page and the pieces it needs — is called <strong>colocation</strong>. Instead of hunting through a far-away <code>components/</code> folder, everything a route needs sits in one place.</p>`,
        analogy: `Think of a route folder like a kitchen drawer with a labeled "menu" card facing the customer. Only the menu (<code>page.js</code>) is shown to diners. The whisks and spatulas (your components and helpers) sit in the same drawer, handy for the cook, but no customer ever sees them.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — colocation keeps changes small",
            body: `When everything a page needs lives in its own folder, deleting that feature is as easy as deleting the folder. No orphaned helper files left scattered across the project.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Project structure & organization",
            url: "https://nextjs.org/docs/app/getting-started/project-structure",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `app/
└── dashboard/
    ├── page.js          ← the /dashboard route (public)
    ├── Chart.js         ← a component, used only here (NOT a route)
    ├── formatData.js    ← a helper, used only here (NOT a route)
    └── dashboard.css     ← styles for this page (NOT a route)

// Only page.js becomes a URL. The other three files
// sit right next to it — colocated — but stay private.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "special-files",
      type: "explanation",
      instruction: {
        heading: "The special files Next.js looks for",
        body: `<p>A few file names are <strong>special</strong> inside <code>app/</code> — Next.js gives each a job. You've met <code>page</code> and <code>layout</code>; here are the rest:</p><ul><li><code>page.js</code> — the page shown at this URL.</li><li><code>layout.js</code> — shared shell wrapped around the page (and its children).</li><li><code>loading.js</code> — a loading skeleton shown while the page loads.</li><li><code>error.js</code> — a friendly error screen if the page crashes.</li><li><code>not-found.js</code> — what to show for a missing item (a 404).</li><li><code>route.js</code> — an API endpoint (returns data, not a page).</li></ul><p>When several of these live in the same folder, Next.js <strong>nests them in a fixed order</strong>: the layout wraps the error boundary, which wraps the loading boundary, which wraps your page. You get loading states and error handling for free, just by adding the right file name.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — only page.js and route.js are public",
            body: `A folder with <em>only</em> a <code>Chart.js</code> in it is <strong>not</strong> a URL — visiting it gives a 404. The route exists only once a <code>page.js</code> or <code>route.js</code> is added. And even then, only the markup those files <em>return</em> is sent to the browser — your helper files never ship as their own pages.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Routing files",
            url: "https://nextjs.org/docs/app/getting-started/project-structure",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `app/
└── products/
    ├── layout.js       ← wraps everything below
    ├── loading.js      ← skeleton while the page loads
    ├── error.js        ← shown if the page throws
    ├── not-found.js    ← shown for a missing product
    └── page.js         ← the actual /products page

// Render order (outermost → innermost):
// layout → error → loading → page`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "private-folders",
      type: "explanation",
      instruction: {
        heading: "Private folders: opt out of routing with _",
        body: `<p>Colocation already keeps stray files from becoming pages. But sometimes you want to be <em>explicit</em> — to say "this whole folder is internal, never a route." Prefix the folder name with an <strong>underscore</strong>: <code>_components</code>, <code>_lib</code>, <code>_utils</code>.</p><p>An underscore-prefixed folder (and everything inside it) is <strong>opted out of routing entirely</strong>. It's a clear signal to you and your teammates: "implementation details live here." Common uses: <code>app/_components/</code> for shared UI, or <code>app/dashboard/_lib/</code> for that route's data helpers.</p><p>Why bother if colocation already works? Because private folders <strong>separate UI from routing at a glance</strong>, keep your files grouped neatly in the editor, and protect you from clashing with a future Next.js special file name.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — need a real underscore in the URL?",
            body: `On the rare occasion you actually want a URL segment that starts with an underscore, name the folder <code>%5FfolderName</code> — <code>%5F</code> is the URL-encoded underscore. The plain <code>_folder</code> form is always treated as private.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Private folders",
            url: "https://nextjs.org/docs/app/getting-started/project-structure",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `app/
├── _components/        ← private: shared UI, never a route
│   ├── Button.js
│   └── Navbar.js
└── dashboard/
    ├── _lib/           ← private: helpers for /dashboard only
    │   └── getStats.js
    └── page.js         ← the /dashboard route

// Visiting /_components or /dashboard/_lib → 404.
// They're invisible to the router.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "colocation-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: colocate a component",
        body: `<p>Imagine you have <code>app/dashboard/page.js</code>. Right next to it, create a small <code>StatCard</code> component in <code>app/dashboard/StatCard.js</code>, then <code>import</code> it into the page. Write the page below — it should <code>import</code> the colocated component and use it.</p><p>Because <code>StatCard.js</code> has no <code>page.js</code> role, it stays private — it never becomes a <code>/dashboard/StatCard</code> URL.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `A relative import like <code>./StatCard</code> means "the file sitting next to me." That's colocation in action.`,
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/dashboard/page.js
// import the StatCard that lives right next to this file,
// then render it.

export default function DashboardPage() {
  return (
    <main>
      {/* import StatCard from "./StatCard" above, then use <StatCard /> here */}
    </main>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["import", "export default"] },
      },
      hints: [
        "At the top: <code>import StatCard from \"./StatCard\";</code>",
        "Then render it inside &lt;main&gt;: <code>&lt;StatCard /&gt;</code>",
      ],
    },
  ],
};
