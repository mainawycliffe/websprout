import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "box-model-codelab-box-sizing",
  slug: "codelab-box-sizing",
  title: "Codelab 3: Predictable Layouts with border-box",
  description:
    "Fix the box model's width surprise and build a clean card grid.",
  order: 10,
  steps: [
    {
      id: "width-surprise",
      type: "explanation",
      instruction: {
        heading: "The width surprise",
        body: "Open your project from Codelab 2: cd ~/box-model-lab && code . Open index.html in the browser — press Ctrl+R if it's already open, or run xdg-open index.html.\n\nIn style.css, make sure .card has these properties: width: 300px, padding: 20px, and border: 2px solid #ccc.\n\nSave the file and refresh the browser. Now here's the question: how wide is each card on screen? You set width to 300px, so it should be 300px... right?\n\nOpen DevTools (F12), hover over a card, and look at the dimensions shown. It says 344px wide! Where did the extra 44px come from?\n\nHere's the math:\n• 300px (content width you set)\n• + 20px (left padding)\n• + 20px (right padding)\n• + 2px (left border)\n• + 2px (right border)\n• = 344px total width on screen\n\nBy default, the CSS width property only controls the content area. Padding and border are added on top of that width. This default behavior is called content-box.",
        analogy:
          "It's like measuring a picture frame. If someone says the frame is \"300px wide,\" do they mean just the picture inside, or the whole thing including the wooden frame around it? CSS defaults to measuring just the picture (the content), which surprises almost everyone. You say 300px, but the box on screen is bigger — because the frame (border) and matting (padding) are extra.",
        docLinks: [
          {
            label: "width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width",
            type: "css-property",
          },
          {
            label: "box-sizing",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "This is not a bug — it's the original CSS specification from the 1990s. The width property was designed to control content width only. But it surprised so many developers that the CSS working group added the box-sizing property to fix it.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          ".card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #ccc;\n}\n\n/* On screen, each card is actually:\n   300 + 20 + 20 + 2 + 2 = 344px wide!\n   \n   width only sets the CONTENT area.\n   Padding and border are added outside it. */",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "overflow-bug",
      type: "explanation",
      instruction: {
        heading: "Why this matters: the overflow bug",
        body: "This isn't just a math curiosity — it causes real layout bugs. Let's see one in action.\n\nIn index.html, wrap all three of your cards inside a new <div> with the class row.\n\nIn style.css, add a flex layout for the row and change the card width to a percentage. Set .row to display: flex, and set .card to width: 50%, padding: 20px, and border: 2px solid #ccc.\n\nSave and refresh. You'd expect two cards to sit side by side — 50% + 50% = 100% of the container. But they overflow! They push past the container edge and cause a horizontal scrollbar.\n\nWhy? Because 50% only sets the content width. The actual rendered width is 50% + 20px + 20px + 2px + 2px. Two of those together add up to more than 100% of the container.\n\nThis is the exact bug that trips up beginners and professionals alike. Every CSS framework in existence had to solve this problem.",
        docLinks: [
          {
            label: "display: flex",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "width (percentages)",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Common Mistake",
            body: "This overflow bug is one of the most common CSS frustrations for beginners. If your layout is wider than expected, the box model is almost always the reason. When elements spill out of their container, check whether padding and border are being added to the width.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- index.html -->\n<div class="row">\n  <div class="card">Card 1</div>\n  <div class="card">Card 2</div>\n  <div class="card">Card 3</div>\n</div>\n\n/* style.css */\n.row {\n  display: flex;\n}\n\n.card {\n  width: 50%;\n  padding: 20px;\n  border: 2px solid #ccc;\n}\n\n/* Expected: two cards side by side (50% + 50% = 100%)\n   Actual:  they OVERFLOW because\n   50% + padding + border > half the container */',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fix-border-box",
      type: "explanation",
      instruction: {
        heading: "The fix: border-box",
        body: "Add this one line at the very top of style.css:\n\n* { box-sizing: border-box; }\n\nSave and refresh. The overflow is gone! The two 50%-width cards now sit perfectly side by side, exactly as you intended.\n\nWhat changed? With box-sizing: border-box, the width property now controls the total width of the box — content + padding + border all included. The browser automatically shrinks the content area to make room.\n\nSo with width: 300px and border-box:\n• Total box width: 300px (exactly what you set)\n• Content width: 300 - 20 - 20 - 2 - 2 = 256px (the browser calculates this)\n\nThe content area is smaller, but the overall box is exactly 300px — predictable and easy to reason about.\n\nThe * selector means \"every element on the page.\" This single rule fixes the box model behavior for your entire project.",
        docLinks: [
          {
            label: "box-sizing",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
            type: "css-property",
          },
          {
            label: "Universal selector (*)",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "With content-box (the default), width = content only. With border-box, width = content + padding + border. Margin is never included in either model — it always adds space outside the box.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Add this at the TOP of style.css */\n* {\n  box-sizing: border-box;\n}\n\n.row {\n  display: flex;\n}\n\n.card {\n  width: 50%;\n  padding: 20px;\n  border: 2px solid #ccc;\n}\n\n/* Now width: 50% means the TOTAL box is 50%.\n   Padding and border fit INSIDE that 50%.\n   Two cards = exactly 100%. No overflow! */",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "universal-reset",
      type: "explanation",
      instruction: {
        heading: "The universal reset",
        body: "That * { box-sizing: border-box; } line is so useful that nearly every professional CSS file starts with it. It's called a \"CSS reset\" — a rule that overrides the browser's default behavior to something more predictable.\n\nReal-world usage:\n• Bootstrap uses it — the most popular CSS framework in the world.\n• Tailwind CSS uses it — the utility-first framework that powers countless modern sites.\n• Every major CSS framework includes it as a foundational rule.\n\nThe full version that professionals use looks like this:\n\n*, *::before, *::after { box-sizing: border-box; }\n\nThe *::before and *::after selectors target pseudo-elements — special elements the browser can generate before and after content. You'll learn about those later, but for now, just know that this rule ensures everything on the page uses border-box, with no exceptions.\n\nUpdate your style.css to use this full reset pattern. It's a one-time setup that will save you hours of debugging layout issues on every project you build.",
        docLinks: [
          {
            label: "box-sizing",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
            type: "css-property",
          },
          {
            label: "::before",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/::before",
            type: "css-selector",
          },
          {
            label: "::after",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/::after",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Pro Tip",
            body: "Whenever you start a new CSS file, make * { box-sizing: border-box; } your very first line. It will save you hours of debugging layout issues. This is one of the few CSS rules that every developer agrees on.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* The professional box-sizing reset */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* This ensures EVERY element — including\n   pseudo-elements — uses border-box.\n   \n   Used by Bootstrap, Tailwind CSS, and\n   virtually every modern CSS framework. */",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "polish-layout",
      type: "explanation",
      instruction: {
        heading: "Polish the layout",
        body: "Let's make this card grid look professional — the kind of layout you'd see on a real website.\n\nUpdate .row in style.css to use display: flex, gap: 16px, and flex-wrap: wrap.\n\n• gap: 16px creates equal space between flex items without using margin. This is cleaner than margin for flex layouts because gap only adds space between items, never on the outside edges.\n• flex-wrap: wrap allows cards to move to the next line on small screens instead of squishing into one row.\n\nUpdate .card to use flex: 1, padding: 20px, border: 2px solid #ccc, border-radius: 8px, and background-color: #f9fafb.\n\n• flex: 1 makes all cards share the available space equally.\n• border-radius: 8px rounds the corners of the border — almost every card on the modern web has rounded corners.\n• background-color: #f9fafb adds a subtle off-white background to distinguish cards from the page.\n• We removed width and margin — flex: 1 handles sizing and gap handles spacing.\n\nSave and refresh. You now have a clean, professional card grid — the same pattern used on pricing pages, dashboards, and product listings across the web.",
        docLinks: [
          {
            label: "gap",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
            type: "css-property",
          },
          {
            label: "flex-wrap",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap",
            type: "css-property",
          },
          {
            label: "border-radius",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius",
            type: "css-property",
          },
          {
            label: "flex",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The gap property on flex containers is a modern alternative to using margins for spacing. It only adds space between items, not around the outer edges — making it cleaner and easier to manage. Supported in all modern browsers since 2021.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n.row {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.card {\n  flex: 1;\n  padding: 20px;\n  border: 2px solid #ccc;\n  border-radius: 8px;\n  background-color: #f9fafb;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "full-code-review",
      type: "explanation",
      instruction: {
        heading: "Full code review",
        body: "Here's everything we built, side by side. Let's walk through every line and connect each CSS property to the box model concept it controls.\n\nThe HTML (index.html):\n• A simple structure: a <div class=\"row\"> wrapping three <div class=\"card\"> elements.\n• No extra wrappers, no unnecessary complexity — just semantic containers.\n\nThe CSS (style.css), line by line:\n• box-sizing: border-box — changes how width is calculated. Width now includes padding and border, not just content.\n• display: flex — layout system that places children side by side. Beyond the box model itself, but enables the grid layout.\n• gap: 16px — space between elements (similar to margin, but applied on the parent instead of each child).\n• flex-wrap: wrap — responsive behavior so cards stack on narrow screens.\n• flex: 1 — flexible sizing so cards share space equally.\n• padding: 20px — space inside the border (the padding layer of the box model).\n• border: 2px solid #ccc — the visible frame (the border layer of the box model).\n• border-radius: 8px — rounds the border corners (a visual property on the border layer).\n• background-color: #f9fafb — fills the content + padding area with color.\n\nCongratulations! You've built a real card layout using plain CSS — the same foundation that powers every website's UI. Every CSS framework (Bootstrap, Tailwind, Material UI) is built on these exact properties. When you understand padding, border, margin, and box-sizing, you understand the foundation of all CSS layouts.",
        docLinks: [
          {
            label: "box-sizing",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
            type: "css-property",
          },
          {
            label: "CSS Box Model",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Every CSS framework (Bootstrap, Tailwind, Material UI) is built on these exact box model properties. When you understand padding, border, margin, and box-sizing, you understand the foundation of all CSS layouts. Everything else — Grid, animations, responsive design — builds on top of this.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- index.html -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Card Grid</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <div class="row">\n    <div class="card">\n      <h2>Card 1</h2>\n      <p>Content goes here.</p>\n    </div>\n    <div class="card">\n      <h2>Card 2</h2>\n      <p>Content goes here.</p>\n    </div>\n    <div class="card">\n      <h2>Card 3</h2>\n      <p>Content goes here.</p>\n    </div>\n  </div>\n</body>\n</html>\n\n/* style.css */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n  padding: 24px;\n}\n\n.row {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.card {\n  flex: 1;\n  padding: 20px;\n  border: 2px solid #ccc;\n  border-radius: 8px;\n  background-color: #f9fafb;\n}',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "checkpoint-border-box-card",
      type: "free-edit",
      instruction: {
        heading: "Test yourself: border-box card",
        body: "Write a complete .card CSS rule that uses border-box sizing with:\n\n• 300px width\n• 20px padding on all sides\n• 2px solid border\n• 8px border-radius\n\nAlso add the universal box-sizing reset at the top.\n\nThink about it: with border-box active, what will the total width of the card be on screen? The answer might surprise you — or by now, maybe it won't!",
        docLinks: [
          {
            label: "box-sizing",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
            type: "css-property",
          },
          {
            label: "width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width",
            type: "css-property",
          },
          {
            label: "border-radius",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Remember",
            body: "With border-box, the width you set IS the total width on screen. Padding and border fit inside that width. The content area shrinks to make room — but you don't have to do that math yourself.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "* {\n  /* Add the universal box-sizing reset */\n  \n}\n\n.card {\n  /* Width, padding, border, border-radius */\n  \n}\n\n/* Answer: The total width on screen will be ___px */\n",
        language: "css",
      },
      validation: { type: "contains-css", criteria: { property: "box-sizing" } },
      hints: [
        "Start with: * { box-sizing: border-box; }",
        "width: 300px;",
        "padding: 20px;",
        "border: 2px solid #ccc;",
        "border-radius: 8px;",
        "With border-box, the total width is exactly 300px — that's the whole point!",
      ],
    },
  ],
};
