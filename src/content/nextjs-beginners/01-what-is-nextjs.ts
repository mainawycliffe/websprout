import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-what-is-nextjs",
  slug: "what-is-nextjs",
  title: "What is Next.js (and Why)",
  description:
    "Understand what Next.js adds on top of React — routing, project structure, bundling, and server rendering — and why real teams reach for it.",
  order: 1,
  steps: [
    {
      id: "react-alone-gaps",
      type: "explanation",
      instruction: {
        heading: "React is a library, not a whole app",
        body: `<p>In the React module you built real, interactive UI — but everything lived in one HTML file loaded from a CDN. The moment you try to build a <em>real</em> website, gaps appear that React alone doesn't fill:</p><ul><li><strong>Routing</strong> — React has no built-in concept of pages or URLs. How does <code>/about</code> show different content from <code>/contact</code>?</li><li><strong>Project structure</strong> — where do components, pages, and styles live? React doesn't say.</li><li><strong>Bundling &amp; tooling</strong> — turning your JSX into fast, optimized files for the browser.</li><li><strong>Server rendering</strong> — sending ready-made HTML so the page appears instantly and search engines can read it, instead of a blank page that fills in later.</li></ul><p><strong>Next.js</strong> is a <em>framework</em> built on top of React that answers all of these — with sensible defaults — so you can focus on building features instead of wiring up tools.</p>`,
        analogy: `React is an engine; Next.js is the whole car built around it — chassis, wheels, steering, dashboard. You <em>could</em> bolt your own car around an engine, but most people want to just drive. Next.js gives React a body so you can ship a real product.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Next.js is still React — same components, JSX, props, state, and hooks you already learned. It doesn't replace React; it surrounds it with the structure and tooling a production site needs.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Documentation",
            url: "https://nextjs.org/docs",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "who-uses-it",
      type: "explanation",
      instruction: {
        heading: "Folders become your URLs",
        body: `<p>The single most important idea in Next.js is <strong>file-system routing</strong>: the structure of your <code>app/</code> folder <em>is</em> the structure of your website's URLs. A folder named <code>about</code> with a <code>page.js</code> inside becomes the <code>/about</code> page. No router config, no route list — you create files, and the URLs appear.</p><p>This is why so many products you use run on Next.js: <strong>Notion</strong>, <strong>Twitch</strong>, <strong>Hulu</strong>, <strong>OpenAI</strong>, and <strong>TikTok</strong>'s web app, to name a few. It scales from a one-page site to an app with thousands of pages, all from the same simple folder rules.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Don't worry about memorizing this tree — you'll build it piece by piece in the codelabs. For now, just notice that <strong>folders = routes</strong> and a file named <code>page.js</code> is what makes a folder show up as a real page.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `my-app/
├── app/                  ← everything here defines your routes
│   ├── layout.js         ← shared shell wrapped around every page
│   ├── page.js           ← the home page  ("/")
│   └── about/
│       └── page.js       ← the about page ("/about")
├── public/               ← images & static files, served at "/"
├── package.json          ← your project's dependencies & scripts
└── next.config.js        ← Next.js configuration`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
