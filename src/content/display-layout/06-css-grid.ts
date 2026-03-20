import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-css-grid",
  slug: "css-grid",
  title: "CSS Grid Basics",
  description:
    "Build two-dimensional layouts with rows and columns using CSS Grid.",
  order: 6,
  steps: [
    {
      id: "why-css-grid",
      type: "explanation",
      instruction: {
        heading: "Why CSS Grid exists",
        body: "Flexbox handles one-dimensional layout beautifully, but what about organizing content in rows AND columns simultaneously? That's where CSS Grid comes in. It lets you define a complete two-dimensional grid structure and place items precisely within it. You'll recognize grid layouts everywhere: Pinterest's masonry layout, any dashboard with card widgets (like Notion), photo galleries on Instagram's profile page, and CSS-Tricks' article grid.",
        analogy:
          "If flexbox is a single shelf where you arrange items in a line, CSS Grid is an entire bookcase — you define how many rows and columns it has, and then place books exactly where you want them.",
        docLinks: [
          {
            label: "CSS Grid Layout",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids",
            type: "css-concept",
          },
          {
            label: "display: grid",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Grid and Flexbox are complementary, not competing. Use Flexbox for one-dimensional layouts (a row of buttons, a vertical stack). Use Grid for two-dimensional layouts (a page layout with sidebar and main content, a card grid). Many real layouts use both.",
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
      id: "grid-template-columns-demo",
      type: "explanation",
      instruction: {
        heading: "display: grid + grid-template-columns",
        body: "display: grid turns a container into a grid. grid-template-columns: 1fr 1fr 1fr creates three equal columns. The 'fr' unit means 'fraction of available space' — 1fr 1fr 1fr divides the space into three equal parts. Items automatically flow into the grid cells, filling row by row. You don't need to tell each item where to go — the grid figures it out.",
        docLinks: [
          {
            label: "grid-template-columns",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The 'fr' unit only works inside grid containers. Think of it like slices of a pie — 1fr 1fr 1fr gives each column one equal slice. 1fr 2fr gives the first column one slice and the second column two slices of the available width.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; padding: 8px; background: #F1F5F9; }\n  .grid-item { padding: 24px; text-align: center; color: white; border-radius: 8px; font-weight: bold; }\n</style>\n<div class="grid">\n  <div class="grid-item" style="background:#3B82F6">1</div>\n  <div class="grid-item" style="background:#8B5CF6">2</div>\n  <div class="grid-item" style="background:#EC4899">3</div>\n  <div class="grid-item" style="background:#10B981">4</div>\n  <div class="grid-item" style="background:#F59E0B">5</div>\n  <div class="grid-item" style="background:#EF4444">6</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "create-a-grid",
      type: "gap-fill",
      instruction: {
        heading: "Create a grid",
        body: "What display value turns a container into a grid container? Just like display: flex creates a flex container, there's a value that creates a grid container.",
      },
      config: {
        type: "gap-fill",
        template: ".container {\n  display: {{display_value}};\n}",
        gaps: [
          {
            id: "display_value",
            placeholder: "display value",
            acceptedAnswers: ["grid"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "What display value creates a grid container?",
        "The answer is 'grid'.",
      ],
    },
    {
      id: "repeat-and-fr",
      type: "explanation",
      instruction: {
        heading: "repeat() and fr units",
        body: "repeat(3, 1fr) is shorthand for writing 1fr three times. It's cleaner and scales better — imagine writing 1fr twelve times! You can also mix fixed units (px) with flexible units (fr). A common pattern: a fixed sidebar with a flexible main area using grid-template-columns: 250px 1fr; — the sidebar stays 250px wide while the main content stretches to fill whatever space remains.",
        docLinks: [
          {
            label: "repeat()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/repeat",
            type: "css-property",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* These two lines do the same thing: */\ngrid-template-columns: 1fr 1fr 1fr;\ngrid-template-columns: repeat(3, 1fr);\n\n/* Different column sizes: */\ngrid-template-columns: 2fr 1fr;       /* First column is twice as wide */\ngrid-template-columns: 200px 1fr;      /* Fixed + flexible */\ngrid-template-columns: repeat(4, 1fr); /* Four equal columns */",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "two-equal-columns",
      type: "gap-fill",
      instruction: {
        heading: "Two equal columns",
        body: "Define two equal-width columns using fr units. Each column should take up the same fraction of available space.",
      },
      config: {
        type: "gap-fill",
        template:
          ".container {\n  display: grid;\n  grid-template-columns: {{columns}};\n}",
        gaps: [
          {
            id: "columns",
            placeholder: "column template",
            acceptedAnswers: ["1fr 1fr", "repeat(2, 1fr)"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Each column gets an equal fraction of the space.",
        "Try '1fr 1fr' or 'repeat(2, 1fr)'.",
      ],
    },
    {
      id: "gap-property",
      type: "explanation",
      instruction: {
        heading: "The gap property",
        body: "The gap property adds space between grid items without adding margin to the items themselves. This is much cleaner than using margins — no doubled margins, no first/last-child exceptions. Before gap existed, developers had to carefully manage margins and use negative margins on containers to compensate. gap works in both Grid and Flexbox.",
        docLinks: [
          {
            label: "gap",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "gap is a shorthand for row-gap and column-gap. You can set them separately: row-gap: 16px; column-gap: 8px; — or use the shorthand gap: 16px 8px; (row then column).",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .grid-gap { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 12px; background: #F1F5F9; }\n  .cell { padding: 20px; text-align: center; background: #8B5CF6; color: white; border-radius: 8px; }\n</style>\n<div class="grid-gap">\n  <div class="cell">A</div><div class="cell">B</div><div class="cell">C</div>\n  <div class="cell">D</div><div class="cell">E</div><div class="cell">F</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-photo-gallery",
      type: "free-edit",
      instruction: {
        heading: "Build a photo gallery",
        body: "Create a 3-column photo gallery using CSS Grid. Define three equal columns with grid-template-columns and add spacing between the photos with gap. This is the exact pattern used by image galleries across the web — from portfolio sites to e-commerce product grids.",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<div class="gallery">\n  <div class="photo" style="background:#3B82F6">Photo 1</div>\n  <div class="photo" style="background:#8B5CF6">Photo 2</div>\n  <div class="photo" style="background:#EC4899">Photo 3</div>\n  <div class="photo" style="background:#10B981">Photo 4</div>\n  <div class="photo" style="background:#F59E0B">Photo 5</div>\n  <div class="photo" style="background:#EF4444">Photo 6</div>\n</div>\n\n<style>\n.gallery {\n  /* Make this a 3-column grid with spacing */\n  \n}\n.photo {\n  padding: 40px;\n  text-align: center;\n  color: white;\n  font-weight: bold;\n  border-radius: 8px;\n}\n</style>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "grid-template-columns" },
      },
      hints: [
        "Start with display: grid;",
        "Use grid-template-columns: repeat(3, 1fr); for three equal columns.",
        "Add gap: 12px; for spacing between photos.",
      ],
    },
  ],
};
