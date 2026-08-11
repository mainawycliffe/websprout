import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-codelab-gradient-card",
  slug: "codelab-gradient-card",
  title: "Codelab: Build a Gradient Pricing Card",
  description:
    "Step out of the platform and build a real pricing card with gradient buttons in a local HTML file. End-to-end: terminal, editor, browser refresh.",
  order: 10,
  steps: [
    {
      id: "card-lab-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project folder",
        body: "<p>You will build a single HTML file with a small CSS file that ships a pricing card the way you might see one on a real product page.</p><p>Open a terminal on Linux with <strong>Ctrl + Alt + T</strong>, then run these commands one by one:</p><ul><li><code>mkdir ~/gradient-card-lab</code> — create a new project folder in your home directory</li><li><code>cd ~/gradient-card-lab</code> — move into that folder</li><li><code>touch index.html style.css</code> — create the HTML and CSS files</li><li><code>code .</code> — open the folder in VS Code</li></ul><p>Use any plain-text editor you like; saving plain HTML and CSS is the only requirement.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If <code>code .</code> does not work, open your editor manually and choose <strong>File → Open Folder</strong>, then select <code>~/gradient-card-lab</code>.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "card-lab-html",
      type: "explanation",
      instruction: {
        heading: "Write the HTML",
        body: "<p>Put this into <code>index.html</code>. The markup is intentionally small — three plans and one button per plan — so the gradient work has room to shine.</p><p>After saving, open the file in your browser with <code>xdg-open index.html</code> (Linux) or by double-clicking the file. It will look plain at first — that is expected.</p>",
        docLinks: [
          {
            label: "MDN: link rel=\"stylesheet\"",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link",
            type: "html-attribute",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Gradient Pricing</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <main class="page">\n    <h1>Choose your plan</h1>\n    <div class="plans">\n      <article class="plan">\n        <h2>Starter</h2>\n        <p class="price">Free</p>\n        <button class="cta cta-cool">Get started</button>\n      </article>\n      <article class="plan">\n        <h2>Grower</h2>\n        <p class="price">$9 / mo</p>\n        <button class="cta cta-warm">Upgrade</button>\n      </article>\n      <article class="plan">\n        <h2>Harvest</h2>\n        <p class="price">$29 / mo</p>\n        <button class="cta cta-rich">Go Harvest</button>\n      </article>\n    </div>\n  </main>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "card-lab-base-styles",
      type: "explanation",
      instruction: {
        heading: "Add the base styles",
        body: "<p>Open <code>style.css</code> and paste this in. These styles are deliberately calm — the page background is a subtle pale colour, the cards are clean white. The gradients will land on the buttons in the next step, so the contrast really pops.</p><p>Save and refresh your browser.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          'body {\n  margin: 0;\n  font-family: system-ui, -apple-system, sans-serif;\n  background-color: #f8fafc;\n  color: #0f172a;\n  padding: 32px 16px;\n}\n\n.page { max-width: 960px; margin: 0 auto; }\n\nh1 {\n  text-align: center;\n  margin-bottom: 32px;\n}\n\n.plans {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}\n\n.plan {\n  background-color: white;\n  border-radius: 16px;\n  padding: 24px;\n  text-align: center;\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);\n}\n\n.plan h2  { margin: 0 0 8px; }\n.price    { margin: 0 0 16px; font-size: 22px; font-weight: 700; }\n\n.cta {\n  display: inline-block;\n  border: none;\n  color: white;\n  font-weight: 700;\n  padding: 12px 20px;\n  border-radius: 999px;\n  cursor: pointer;\n  font-size: 15px;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "card-lab-gradients",
      type: "explanation",
      instruction: {
        heading: "Now add the gradient buttons",
        body: "<p>This is the part you came for. Each button gets a different gradient so the three plans feel visually distinct — the kind of polish you see on real pricing pages.</p><p>Add these rules to the bottom of <code>style.css</code>, save, and refresh.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Notice each button uses the same <em>structure</em> — <code>linear-gradient(direction, colorA, colorB)</code> — but different colour pairs. Once you have one, adapting it to a new palette is just changing the hex codes.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '/* Cool blue → violet */\n.cta-cool {\n  background-image: linear-gradient(135deg, #0ea5e9, #6366f1);\n}\n\n/* Warm orange → pink */\n.cta-warm {\n  background-image: linear-gradient(135deg, #f97316, #ec4899);\n}\n\n/* Rich purple → magenta */\n.cta-rich {\n  background-image: linear-gradient(135deg, #7c3aed, #db2777);\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "card-lab-hover",
      type: "explanation",
      instruction: {
        heading: "Add a hover effect that feels alive",
        body: "<p>One small extra: on hover, shift the gradient and lift the button slightly. This is where backgrounds meet animation — the gradient angle change creates a feeling of light moving across the surface.</p><p>Append this to <code>style.css</code> and refresh.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          '.cta {\n  transition: transform 0.18s ease, background-image 0.4s ease, box-shadow 0.18s ease;\n}\n\n.cta:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.18);\n}\n\n.cta-cool:hover { background-image: linear-gradient(135deg, #6366f1, #0ea5e9); }\n.cta-warm:hover { background-image: linear-gradient(135deg, #ec4899, #f97316); }\n.cta-rich:hover { background-image: linear-gradient(135deg, #db2777, #7c3aed); }',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "card-lab-checkpoint",
      type: "explanation",
      instruction: {
        heading: "Free-edit checkpoint: make it your own",
        body: "<p>Now experiment. Try at least two of these:</p><ul><li>Replace the colour palettes with your own brand colours.</li><li>Add a fourth plan with a <code>radial-gradient</code> button.</li><li>Add a layered hero at the top: a photo with a translucent gradient overlay, and put your <code>&lt;h1&gt;</code> inside it.</li><li>Switch the page background to a very subtle gradient — try <code>linear-gradient(180deg, #f8fafc, #e2e8f0)</code> on <code>body</code>.</li></ul><p>If you break it, undo (<code>Ctrl + Z</code>) and try again. Breaking and unbreaking is how you learn what each part actually does.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "When you use gradients on text-bearing elements, double-check contrast. Tools like the Chrome DevTools 'Color' picker show the contrast ratio against the background — aim for at least 4.5:1 for normal-sized text.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
