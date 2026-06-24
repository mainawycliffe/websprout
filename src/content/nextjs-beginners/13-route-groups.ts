import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-route-groups",
  slug: "route-groups",
  title: "Route Groups: Organize Without Changing the URL",
  description:
    "Group related routes by section — marketing, shop, dashboard — and give each its own layout, all without adding anything to the URL.",
  order: 13,
  steps: [
    {
      id: "the-parens",
      type: "explanation",
      instruction: {
        heading: "Folders in (parentheses) don't show up in the URL",
        body: `<p>Folder names normally become URL segments — that's the rule you learned in <a href="/nextjs-beginners/creating-routes">Creating Pages and Routes</a>. But what if you want to <em>group</em> pages for your own sanity without that group appearing in the address bar?</p><p>Wrap the folder name in <strong>parentheses</strong> — <code>(marketing)</code> — and Next.js treats it as a <strong>route group</strong>: a folder that's purely organizational and is <strong>left out of the URL</strong>. So <code>app/(marketing)/about/page.js</code> still serves <code>/about</code>, not <code>/marketing/about</code>.</p><p>This lets you sort a big <code>app/</code> folder into tidy sections — <code>(marketing)</code>, <code>(shop)</code>, <code>(dashboard)</code> — while keeping clean, short URLs. Big sites do exactly this to keep dozens of routes manageable.</p>`,
        analogy: `Route groups are like the labeled dividers in a binder. The "Invoices" divider helps <em>you</em> find things fast, but it isn't part of any page's number. The pages keep their own numbering; the divider is just for organizing.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — the parentheses are stripped from the path",
            body: `Only the folder names <em>without</em> parentheses become URL segments. <code>app/(shop)/cart/page.js</code> → <code>/cart</code>. The <code>(shop)</code> part organizes your files but never reaches the browser.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Route groups",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/route-groups",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `app/
├── (marketing)/        ← group: NOT in the URL
│   ├── about/
│   │   └── page.js     → /about     (not /marketing/about)
│   └── pricing/
│       └── page.js     → /pricing
└── (shop)/             ← another group, also invisible in URLs
    ├── cart/
    │   └── page.js     → /cart
    └── checkout/
        └── page.js     → /checkout`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "per-section-layouts",
      type: "explanation",
      instruction: {
        heading: "Give one section its own layout",
        body: `<p>Here's where route groups really earn their keep. In <a href="/nextjs-beginners/nested-layouts">Nested Layouts</a> you learned a <code>layout.js</code> wraps the pages beneath it. Drop a <code>layout.js</code> <strong>inside a route group</strong>, and it wraps only that group's pages — even though the group adds nothing to the URL.</p><p>That means your marketing pages can share a big hero header and a "Sign up" footer, while your shop pages share a cart icon and a checkout banner — each group with its own shell, all at the top level of your site. No awkward URL prefix required.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — group layouts wrap, the root layout still applies",
            body: `A group's <code>layout.js</code> is wrapped by your root <code>app/layout.js</code>, just like any nested layout. The root shell stays; the group layout adds a section-specific frame inside it.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Organizing routes without affecting the URL",
            url: "https://nextjs.org/docs/app/getting-started/project-structure",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `app/
├── (marketing)/
│   ├── layout.js       ← big hero nav + "Sign up" footer
│   ├── about/page.js   → /about    (gets the marketing layout)
│   └── pricing/page.js → /pricing  (gets the marketing layout)
└── (shop)/
    ├── layout.js       ← cart icon + checkout banner
    ├── cart/page.js    → /cart      (gets the shop layout)
    └── checkout/page.js→ /checkout  (gets the shop layout)`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "multiple-root-layouts",
      type: "explanation",
      instruction: {
        heading: "Going further: multiple root layouts",
        body: `<p>Sometimes two sections of a site feel like <em>different apps</em> — a public marketing site and a logged-in dashboard, say, with totally different fonts, colors, and structure. Route groups let you give each its own <strong>root layout</strong>.</p><p>To do it, <strong>remove</strong> the top-level <code>app/layout.js</code> and put a <code>layout.js</code> inside each group instead. Each group's layout becomes a root of its own.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — each root layout needs <html> and <body>",
            body: `Every page needs exactly one <code>&lt;html&gt;</code> and one <code>&lt;body&gt;</code>. So when you split into multiple root layouts, <strong>each</strong> root <code>layout.js</code> must render its own <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags — there's no shared top-level layout doing it for them anymore.`,
          },
          {
            variant: "tip",
            title: "Tip — two groups can't claim the same URL",
            body: `Groups change organization, not URLs. So <code>(a)/about/page.js</code> and <code>(b)/about/page.js</code> both resolve to <code>/about</code> — a conflict Next.js will error on. Within a level, each final path must still be unique.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Creating multiple root layouts",
            url: "https://nextjs.org/docs/app/getting-started/project-structure",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `app/
├── (marketing)/
│   ├── layout.js       ← its own <html><body> (marketing look)
│   └── page.js         → /
└── (app)/
    ├── layout.js       ← its own <html><body> (dashboard look)
    └── dashboard/page.js → /dashboard

// Notice: NO app/layout.js at the top level.
// Each group provides its own root.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "route-groups-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: write a group layout",
        body: `<p>Write the layout for a marketing route group — <code>app/(marketing)/layout.js</code>. Like any layout, it must accept <code>{ children }</code> and render it, wrapped in some shared marketing UI (a nav, a footer, whatever you like). Paste your version below.</p><p>Once it's in place, any page you add under <code>(marketing)/</code> gets this shell automatically — and the URL stays clean, with no <code>/marketing</code> prefix.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `A group layout is just a nested layout — it does <strong>not</strong> need <code>&lt;html&gt;</code> or <code>&lt;body&gt;</code> unless it's acting as a <em>root</em> layout (the multiple-root-layouts case).`,
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/(marketing)/layout.js
export default function MarketingLayout({ children }) {
  return (
    <section>
      {/* Add shared marketing UI (a nav, a footer), then render {children} */}
    </section>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["children", "export default"] },
      },
      hints: [
        "The component must accept <code>{ children }</code> and render <code>{children}</code> somewhere inside.",
        "Add a <code>&lt;nav&gt;</code> above <code>{children}</code> and a <code>&lt;footer&gt;</code> below it.",
      ],
    },
  ],
};
