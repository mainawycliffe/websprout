import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-create-next-app",
  slug: "create-next-app",
  title: "Scaffolding with create-next-app",
  description:
    "Generate a complete, ready-to-run Next.js project with one command — and learn every prompt so you get the JavaScript setup this module uses.",
  order: 3,
  steps: [
    {
      id: "why-scaffolder",
      type: "explanation",
      instruction: {
        heading: "One command sets up everything",
        body: `<p>Remember the last React lesson — the CDN scripts, the in-browser Babel, the "this doesn't scale" warning? A real project needs a bundler, a dev server, a linter, and a folder structure, all configured correctly. Setting that up by hand is tedious and error-prone.</p><p><strong>create-next-app</strong> does it all in one command. It creates a folder, installs React and Next.js, and writes a working starter project you can run immediately. This is the standard way every Next.js project begins — from a weekend hobby site to apps at OpenAI.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `<code>npx</code> (which comes with npm) runs a package <em>without installing it permanently</em>. <code>npx create-next-app@latest</code> fetches the newest scaffolder, runs it once, and is done — perfect for a one-time setup tool.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Installation",
            url: "https://nextjs.org/docs/app/getting-started/installation",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "run-the-command",
      type: "explanation",
      instruction: {
        heading: "Run it and answer the prompts",
        body: `<p>In your terminal, run the command below. Next.js will ask a few questions. The first asks whether to use the recommended defaults — but those defaults turn on <strong>TypeScript</strong>, and this module uses plain <strong>JavaScript</strong>. So choose <strong>"No, customize settings"</strong>, then answer the follow-up prompts exactly as shown in the comments.</p><p>The key answer is <strong>"Would you like to use TypeScript? → No"</strong>. Everything else below keeps your first project simple: plain CSS (no Tailwind), <code>app/</code> at the project root (no <code>src/</code> folder), and the App Router.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — pick JavaScript",
            body: `If you accidentally pick the recommended defaults (TypeScript), don't panic — your code would just need type annotations. But to follow this module's examples 1:1, re-run the command and choose <strong>"No, customize settings" → TypeScript: No</strong>.`,
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
        demoCode: `# Create a new Next.js project:
npx create-next-app@latest my-first-next-app

# You'll be asked a series of questions. Answer them like this:
#
#   Would you like to use the recommended Next.js defaults?
#     -> No, customize settings        (defaults use TypeScript; we want JavaScript)
#
#   Would you like to use TypeScript?         -> No
#   Which linter would you like to use?       -> ESLint
#   Would you like to use React Compiler?     -> No
#   Would you like to use Tailwind CSS?       -> No
#   Would you like your code inside a src/ directory?  -> No
#   Would you like to use App Router?         -> Yes   (recommended)
#   Customize the import alias (@/* by default)?       -> No
#   Include AGENTS.md to guide coding agents?          -> Yes

# When it finishes, move into the folder:
cd my-first-next-app`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "cna-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: record your choices",
        body: `<p>After the command finishes, you should have a new <code>my-first-next-app</code> folder. List the settings you chose below (especially confirming <strong>TypeScript: No</strong>). This keeps a record that your project matches the module's examples.</p>`,
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// My create-next-app choices:
// TypeScript: No
// Linter: ESLint
// Tailwind: No
// src/ directory: No
// App Router: Yes`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "If you don't see a my-first-next-app folder, the command may have failed — scroll up in the terminal for an error message and re-run it.",
      ],
    },
  ],
};
