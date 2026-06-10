import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-creating-routes",
  slug: "creating-routes",
  title: "Creating Pages and Routes",
  description:
    "Add new pages by creating folders — each folder with a page.js becomes a real URL, so /about and /contact appear just by making files.",
  order: 6,
  steps: [
    {
      id: "folders-are-routes",
      type: "explanation",
      instruction: {
        heading: "A folder plus a page.js makes a URL",
        body: `<p>This is the payoff of file-system routing: to add a new page, you make a <strong>folder</strong> inside <code>app/</code> and put a <code>page.js</code> in it. The folder's name becomes the URL.</p><ul><li><code>app/about/page.js</code> → <code>/about</code></li><li><code>app/contact/page.js</code> → <code>/contact</code></li><li><code>app/blog/page.js</code> → <code>/blog</code></li></ul><p>No route table, no config, no registration step — the file's location <em>is</em> the route. Nest folders to nest paths: <code>app/blog/news/page.js</code> becomes <code>/blog/news</code>. This is exactly how big sites organize hundreds of pages.</p>`,
        analogy: `Think of <code>app/</code> as a filing cabinet. Each folder is a labeled drawer, and the <code>page.js</code> inside is the actual document people can pull out. Want a new section of the site? Add a new drawer.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — only page.js is public",
            body: `Just creating a folder doesn't make a URL — the folder needs a <code>page.js</code> to be reachable. You can keep helper files and components in route folders without exposing them; only <code>page.js</code> (and a few other special files) become routes.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Creating a nested route",
            url: "https://nextjs.org/docs/app/getting-started/layouts-and-pages",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "make-about",
      type: "explanation",
      instruction: {
        heading: "Create an About page",
        body: `<p>In your editor, create a new folder <code>about</code> inside <code>app/</code>, and add a file named <code>page.js</code> inside it. Give it the content below.</p><p>Save, then visit <code>http://localhost:3000/about</code> in your browser. There's your second page — created without touching any router configuration. Add a <code>contact</code> folder the same way and you've got a third.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — exact file name",
            body: `The file must be named <code>page.js</code> exactly (lowercase). A file named <code>About.js</code> or <code>index.js</code> in the folder will <em>not</em> create a route — Next.js specifically looks for <code>page.js</code>.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Pages",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/page",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/about/page.js  ->  becomes the /about route
export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <p>We teach web development, one small step at a time.</p>
    </main>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "routes-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: build a Contact page",
        body: `<p>On your own, create <code>app/contact/page.js</code> — a component that <code>export default</code>s a page with a heading and a way to reach you. Paste it below, then verify it loads at <code>localhost:3000/contact</code>.</p>`,
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/contact/page.js  ->  /contact
export default function ContactPage() {
  return (
    <main>
      {/* Add a heading and your contact details */}
    </main>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["export default", "<h1"] },
      },
      hints: [
        "Mirror the About page: <code>export default function ContactPage() { return (&lt;main&gt;&lt;h1&gt;Contact&lt;/h1&gt;...&lt;/main&gt;); }</code>",
      ],
    },
  ],
};
