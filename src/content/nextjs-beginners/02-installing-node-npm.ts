import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-installing-node-npm",
  slug: "installing-node-npm",
  title: "Installing Node and npm",
  description:
    "Set up the toolchain every real React project needs: Node.js to run JavaScript outside the browser, and npm to install packages.",
  order: 2,
  steps: [
    {
      id: "why-node",
      type: "explanation",
      instruction: {
        heading: "Why you need Node and npm",
        body: `<p>Until now, your JavaScript only ran <em>inside a browser</em>. But a Next.js project needs to run JavaScript on your computer too — to start a development server, bundle your code, and render pages on the server. The program that runs JavaScript outside the browser is <strong>Node.js</strong>.</p><p>Bundled with Node is <strong>npm</strong> (Node Package Manager). It does two jobs:</p><ul><li><strong>Installs packages</strong> — downloads code other developers share, like React and Next.js itself, into your project.</li><li><strong>Runs scripts</strong> — commands like <code>npm run dev</code> (start the dev server) and <code>npm run build</code> (build for production).</li></ul><p>Install the <strong>LTS</strong> ("Long-Term Support") version — Next.js 16 needs Node 20.9 or newer. Get it from <a href="https://nodejs.org">nodejs.org</a>, or use a version manager like <code>nvm</code> if you'll juggle multiple projects.</p>`,
        analogy: `If the browser is a kitchen that cooks your food for diners (users), Node is your <em>home kitchen</em> where you prep, test, and package everything first. npm is the grocery delivery service that brings you ingredients (packages) other chefs already made.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Node.js runs the same JavaScript language you already know, just outside the browser. The difference: there's no <code>window</code> or <code>document</code> on the server — those only exist in the browser. Server code works with files, networks, and data instead.`,
          },
        ],
        docLinks: [
          {
            label: "Node.js — Download",
            url: "https://nodejs.org",
            type: "js-concept",
          },
          {
            label: "Next.js — Installation & system requirements",
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
      id: "verify-install",
      type: "explanation",
      instruction: {
        heading: "Verify your install",
        body: `<p>After installing Node, open a terminal and check that both Node and npm are available. Each command prints a version number. As long as Node is <strong>20.9 or higher</strong>, you're ready.</p><p>If the terminal says "command not found", Node didn't install correctly or your terminal needs to be reopened — close it and open a fresh one, then try again.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — opening a terminal",
            body: `On <strong>Linux</strong>, press <code>Ctrl + Alt + T</code>. On <strong>macOS</strong>, open the <em>Terminal</em> app. On <strong>Windows</strong>, use <em>PowerShell</em> or the Windows Terminal. The commands are the same on all three.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `# Check your Node version (must be 20.9 or higher):
node -v
# Example output: v20.11.0

# Check your npm version (installed automatically with Node):
npm -v
# Example output: 10.2.4`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "node-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: confirm your setup",
        body: `<p>Run <code>node -v</code> and <code>npm -v</code> in your terminal, then paste the two version numbers below to confirm your toolchain is ready. (This box just records your result — there's nothing to run here.)</p>`,
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// Paste your versions here, for example:
// node: v20.11.0
// npm: 10.2.4`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "If <code>node -v</code> shows a number below 20.9, install the latest LTS from nodejs.org and check again.",
      ],
    },
  ],
};
