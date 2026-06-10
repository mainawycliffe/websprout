import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-project-tour",
  slug: "project-tour",
  title: "A Tour of Your Project",
  description:
    "Get oriented in the files create-next-app generated — what app/, page.js, layout.js, public/, and package.json each do.",
  order: 4,
  steps: [
    {
      id: "the-tree",
      type: "explanation",
      instruction: {
        heading: "What create-next-app made for you",
        body: `<p>Open the <code>my-first-next-app</code> folder in your code editor (VS Code is free and popular: open it, then <em>File → Open Folder</em>). It can look like a lot, but only a few files matter to start. Here are the ones you'll touch most:</p><ul><li><code>app/</code> — your routes live here. This is where you'll spend almost all your time.</li><li><code>app/page.js</code> — the home page, shown at <code>/</code>.</li><li><code>app/layout.js</code> — the shared shell wrapped around every page (it holds the <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags).</li><li><code>app/globals.css</code> — global styles for the whole site.</li><li><code>public/</code> — static files like images, served from the site root (<code>/</code>).</li><li><code>package.json</code> — lists your dependencies and the <code>npm</code> scripts (<code>dev</code>, <code>build</code>, <code>start</code>).</li></ul><p>You can safely ignore <code>node_modules/</code> (the downloaded packages) and <code>.next/</code> (build output) — Next.js manages those for you.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — folder structure is your URL structure",
            body: `Everything inside <code>app/</code> maps to a URL. A folder is a path segment; a <code>page.js</code> inside it is the page shown at that path. This file-system routing is the heart of Next.js — once it clicks, the whole framework feels simple.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Project structure",
            url: "https://nextjs.org/docs/app/getting-started/project-structure",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `my-first-next-app/
├── app/
│   ├── layout.js     ← wraps every page (has <html> and <body>)
│   ├── page.js       ← the home page  ("/")
│   ├── globals.css   ← site-wide styles
│   └── favicon.ico
├── public/           ← images & static files, served at "/"
├── package.json      ← dependencies + npm scripts
├── next.config.js    ← Next.js settings (rarely touched at first)
├── node_modules/     ← installed packages (ignore this)
└── .next/            ← build output (auto-generated, ignore this)`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "default-page",
      type: "explanation",
      instruction: {
        heading: "The home page is just a component",
        body: `<p>Open <code>app/page.js</code>. Strip away the starter markup and the essence is this: a <strong>component that's the default export</strong> of the file. That's the entire contract — Next.js renders whatever <code>page.js</code> default-exports at that route.</p><p>It's the same React you already know: a function returning JSX. The only new rule is the <em>file's name and location</em> — being called <code>page.js</code> inside <code>app/</code> is what turns it into the home page.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Every routable page <strong>must</strong> use <code>export default</code>. Next.js looks for the default export of <code>page.js</code> to know what to render. A named export alone won't show up as a page.`,
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
        demoCode: `// app/page.js  —  the home page at "/"
export default function Page() {
  return (
    <main>
      <h1>Welcome to my first Next.js app</h1>
      <p>This component is rendered at the / route.</p>
    </main>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tour-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: make the home page yours",
        body: `<p>In your editor, open <code>app/page.js</code> and replace its contents with your own home page — a component that returns a heading and a paragraph about you. Save it (you'll run it in the next lesson). Paste your version below.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Keep the <code>export default</code> — without it, Next.js won't render your page.`,
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/page.js
export default function Page() {
  return (
    <main>
      {/* Write your own heading and paragraph here */}
    </main>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["export default", "return"] },
      },
      hints: [
        "Start with <code>export default function Page() { return ( ... ); }</code> and put an &lt;h1&gt; inside.",
      ],
    },
  ],
};
