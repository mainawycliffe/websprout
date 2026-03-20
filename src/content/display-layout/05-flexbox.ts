import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-flexbox",
  slug: "flexbox",
  title: "Flexbox Basics",
  description:
    "Master one-dimensional layout — align, distribute, and reorder elements with flexbox.",
  order: 5,
  steps: [
    {
      id: "why-flexbox",
      type: "explanation",
      instruction: {
        heading: "Why flexbox was invented",
        body: "Before flexbox, centering things in CSS was notoriously difficult. Developers used hacks like float, negative margins, and table-cell display just to put things side by side or center them. Flexbox (Flexible Box Layout) was created specifically to solve these layout problems. It gives you precise control over how items are distributed along a single axis — whether that's horizontal or vertical. You'll see flexbox everywhere: Spotify's playlist rows (songs laid out horizontally), YouTube's video suggestion sidebar, and Instagram's story bubbles at the top of the feed.",
        analogy:
          "Flexbox is like a shelf organizer — you tell the shelf (the flex container) how to arrange the items, and each item adjusts its size and position automatically. You can say \"spread them evenly,\" \"push them to the right,\" or \"center everything.\"",
        docLinks: [
          {
            label: "Flexbox",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox",
            type: "css-concept",
          },
          {
            label: "display: flex",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Flexbox is a one-dimensional layout method — it deals with layout in one direction at a time, either as a row or a column. For two-dimensional layouts (rows AND columns), you'll use CSS Grid in the next lesson.",
          },
        ],
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "display-flex-demo",
      type: "explanation",
      instruction: {
        heading: "display: flex",
        body: "Adding display: flex to the container immediately lays its children out in a horizontal row. Without it, the three divs would stack vertically (because divs are block elements). That single property changes everything — items that were stacked now sit side by side, ready to be aligned and distributed however you like.",
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .flex-container { display: flex; gap: 8px; padding: 8px; background: #F1F5F9; }\n  .flex-item { padding: 16px 24px; background: #3B82F6; color: white; border-radius: 8px; }\n</style>\n<div class="flex-container">\n  <div class="flex-item">One</div>\n  <div class="flex-item">Two</div>\n  <div class="flex-item">Three</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "activate-flexbox",
      type: "gap-fill",
      instruction: {
        heading: "Activate flexbox",
        body: "What display value turns a container into a flex container, laying its children out in a row?",
      },
      config: {
        type: "gap-fill",
        template: ".container {\n  display: {{display_value}};\n}",
        gaps: [
          {
            id: "display_value",
            placeholder: "display value",
            acceptedAnswers: ["flex"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "What display value creates a flex container?",
        "The answer is 'flex'.",
      ],
    },
    {
      id: "flex-direction",
      type: "explanation",
      instruction: {
        heading: "flex-direction: row vs column",
        body: "flex-direction controls the main axis — the direction items flow. 'row' (the default) lays items left-to-right. 'column' lays them top-to-bottom, like normal block flow but with all the alignment powers of flexbox. Think of a navigation bar (row) versus a sidebar menu (column) — same flexbox tool, different direction.",
        docLinks: [
          {
            label: "flex-direction",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction",
            type: "css-property",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .row { display: flex; flex-direction: row; gap: 8px; padding: 8px; background: #F1F5F9; margin-bottom: 12px; }\n  .col { display: flex; flex-direction: column; gap: 8px; padding: 8px; background: #F1F5F9; }\n  .item { padding: 12px 20px; background: #8B5CF6; color: white; border-radius: 8px; text-align: center; }\n</style>\n<p style="font-weight:bold; margin-bottom:4px;">flex-direction: row (default)</p>\n<div class="row">\n  <div class="item">A</div><div class="item">B</div><div class="item">C</div>\n</div>\n<p style="font-weight:bold; margin-bottom:4px;">flex-direction: column</p>\n<div class="col">\n  <div class="item">A</div><div class="item">B</div><div class="item">C</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "center-justify-content",
      type: "gap-fill",
      instruction: {
        heading: "Center with justify-content",
        body: "justify-content controls how items are distributed along the main axis. What value centers them? Think of centering text in a document — the same idea applies to flex items along the main axis.",
        docLinks: [
          {
            label: "justify-content",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content",
            type: "css-property",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          ".container {\n  display: flex;\n  justify-content: {{justify_value}};\n}",
        gaps: [
          {
            id: "justify_value",
            placeholder: "value",
            acceptedAnswers: ["center"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Think of it literally — you want items in the ___ of the container.",
        "The answer is 'center'.",
      ],
    },
    {
      id: "align-items-demo",
      type: "explanation",
      instruction: {
        heading: "align-items",
        body: "align-items controls alignment on the cross axis (perpendicular to the main axis). With flex-direction: row, the cross axis is vertical. 'center' vertically centers items. Other values: 'flex-start' (top), 'flex-end' (bottom), 'stretch' (fill the container height — the default). Together, justify-content and align-items give you full control over both axes.",
        docLinks: [
          {
            label: "align-items",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/align-items",
            type: "css-property",
          },
          {
            label: "gap",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The classic CSS centering trick: display: flex; justify-content: center; align-items: center; — this centers content both horizontally and vertically. It's one of the most-used CSS patterns on the web. Memorize it!",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .demo { display: flex; align-items: center; gap: 8px; padding: 8px; background: #F1F5F9; height: 120px; }\n  .tall { padding: 30px 20px; background: #3B82F6; color: white; border-radius: 8px; }\n  .short { padding: 10px 20px; background: #EC4899; color: white; border-radius: 8px; }\n</style>\n<div class="demo">\n  <div class="tall">Tall</div>\n  <div class="short">Short</div>\n  <div class="tall">Tall</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "center-navbar",
      type: "free-edit",
      instruction: {
        heading: "Center a navigation bar",
        body: "Build a horizontally centered navigation bar using flexbox. Make the navbar a flex container, center the links along the main axis, and add some spacing between them. This is a pattern you'll see on nearly every website — from documentation sites to personal portfolios.",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<nav class="navbar">\n  <a href="#">Home</a>\n  <a href="#">About</a>\n  <a href="#">Blog</a>\n  <a href="#">Contact</a>\n</nav>\n\n<style>\n.navbar {\n  /* Make this a flex container and center the links */\n  \n}\n.navbar a {\n  padding: 8px 16px;\n  text-decoration: none;\n  color: #1E293B;\n}\n</style>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "display" },
      },
      hints: [
        "Start with display: flex;",
        "Add justify-content: center; to center the links.",
        "Add gap: 8px; for spacing between links.",
      ],
    },
    {
      id: "centered-card",
      type: "free-edit",
      instruction: {
        heading: "Centered card",
        body: "Create a card with its content centered both horizontally and vertically. Use the classic flexbox centering pattern you just learned. The heading and paragraph should stack vertically (hint: flex-direction) and be centered within the card's fixed dimensions.",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<div class="card">\n  <h2>Welcome</h2>\n  <p>Content goes here</p>\n</div>\n\n<style>\n.card {\n  width: 300px;\n  height: 200px;\n  background: #F1F5F9;\n  border-radius: 12px;\n  /* Center the content inside */\n  \n}\n</style>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "justify-content" },
      },
      hints: [
        "Use display: flex; to make the card a flex container.",
        "Add flex-direction: column; so heading and paragraph stack vertically.",
        "Add justify-content: center; and align-items: center; for both-axis centering.",
      ],
    },
  ],
};
