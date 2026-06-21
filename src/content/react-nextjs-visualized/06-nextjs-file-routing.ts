import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-nextjs-file-routing",
  slug: "nextjs-file-routing",
  title: "Next.js File-Based Routing",
  description:
    "See how folders inside app/ turn into URLs automatically — no router config, just files in the right place.",
  order: 6,
  steps: [
    {
      id: "files-become-routes",
      type: "explanation",
      instruction: {
        heading: "Folders become URLs",
        body: `<p>In plain React you wire up routes by hand with a library. Next.js takes a different approach: <strong>the file system IS the router</strong>. The shape of your <code>app/</code> folder is the shape of your site's URLs.</p><p>The rule is simple: a folder is a URL segment, and a file named <code>page.tsx</code> inside it is what renders at that URL. Watch the diagram match files to addresses:</p><ul><li><code>app/page.tsx</code> → <code>/</code> (the homepage)</li><li><code>app/about/page.tsx</code> → <code>/about</code></li><li><code>app/dashboard/settings/page.tsx</code> → <code>/dashboard/settings</code></li></ul><p>To add a page to a Next.js site, you don't edit a config file — you create a folder and drop a <code>page.tsx</code> in it. The URL appears for free.</p>`,
        analogy: `Think of folders in a filing cabinet. The path to a document — <em>Cabinet → Taxes → 2024</em> — IS its address. Next.js routing works the same way: the folder path to your <code>page.tsx</code> is the web address that shows it.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — only page.tsx (and route.ts) create routes",
            body: `Other files in a folder — components, helpers, styles — don't become URLs. A folder only becomes a visitable page when it contains a <code>page.tsx</code> (or an API <code>route.ts</code>). That lets you colocate a route's private parts right next to it without exposing them.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Pages and routing fundamentals",
            url: "https://nextjs.org/docs/app/building-your-application/routing",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `// File: app/about/page.tsx
// This single file is everything needed to serve the URL /about

export default function AboutPage() {
  return (
    <main>
      <h1>About us</h1>
      <p>No route config anywhere — the folder path created this URL.</p>
    </main>
  );
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "dynamic-routes",
      type: "explanation",
      instruction: {
        heading: "Dynamic routes with [brackets]",
        body: `<p>A blog has one layout but thousands of posts. You can't create a folder per post by hand. So Next.js lets a folder name in <strong>square brackets</strong> match <em>anything</em> — a <strong>dynamic segment</strong>.</p><p><code>app/blog/[slug]/page.tsx</code> serves <code>/blog/hello-world</code>, <code>/blog/react-tips</code>, and every other <code>/blog/…</code> URL. The diagram shows one file handling many addresses, with the matched value handed to your component as <code>params.slug</code>.</p><p>This is exactly how real sites work: <strong>YouTube</strong>'s <code>/watch?v=…</code>, <strong>Amazon</strong>'s product pages, a news site's articles — one template, filled with different data based on the URL.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — clean, semantic URLs",
            body: `Dynamic segments produce readable paths like <code>/blog/learning-react</code> instead of opaque query strings. Descriptive URLs are better for users, for sharing, and for search engines — a long-standing <a href="https://developer.mozilla.org/en-US/docs/Web/URI">web best practice</a>.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Dynamic routes",
            url: "https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `// File: app/blog/[slug]/page.tsx
// Serves /blog/anything — the [slug] folder matches any value.

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <h1>Reading: {slug}</h1>;
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "map-files-to-routes",
      type: "gap-fill",
      instruction: {
        heading: "Map each file to its URL",
        body: `<p>You've seen the rule: folder path + <code>page.tsx</code> = URL. Fill in the URL each file produces. Start each answer with a <code>/</code>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the homepage is just /",
            body: `<code>app/page.tsx</code> with no folder around it is the root of your site: <code>/</code>. Every other folder adds a segment to that path.`,
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
        type: "gap-fill",
        template: `app/page.tsx               ->  {{home}}
app/contact/page.tsx       ->  {{contact}}
app/dashboard/settings/page.tsx  ->  {{settings}}`,
        gaps: [
          { id: "home", placeholder: "homepage URL", acceptedAnswers: ["/"], caseSensitive: false },
          { id: "contact", placeholder: "contact URL", acceptedAnswers: ["/contact"], caseSensitive: false },
          {
            id: "settings",
            placeholder: "settings URL",
            acceptedAnswers: ["/dashboard/settings"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Strip the leading <code>app</code> and the trailing <code>/page.tsx</code> — what's left is the URL.",
        "<code>app/contact/page.tsx</code> → <code>/contact</code>; nested folders just chain: <code>/dashboard/settings</code>.",
      ],
    },
  ],
};
