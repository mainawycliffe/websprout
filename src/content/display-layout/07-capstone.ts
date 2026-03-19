import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-capstone",
  slug: "capstone",
  title: "Build a Dashboard Layout",
  description:
    "Combine everything you've learned to build a complete dashboard with header, sidebar, cards, and hidden panels.",
  order: 7,
  steps: [
    {
      id: "what-were-building",
      type: "explanation",
      instruction: {
        heading: "What we're building",
        body: "In this capstone you will combine every display and layout concept from this module into a single project: a dashboard layout. The dashboard has four parts. A header bar with the logo on the left and navigation links on the right — built with flexbox and justify-content: space-between. A sidebar on the left — a plain block-level element with a fixed width, containing stacked navigation links. A main content area — a CSS Grid of six cards arranged in three columns. And two hidden elements: an admin panel removed entirely with display: none, and a draft card made invisible (but space-preserving) with visibility: hidden.\n\nReal dashboards work exactly this way. Open Notion, Trello, or GitHub's project board and you will see the same structure: a flex header pinning a logo and actions to opposite edges, a block sidebar for navigation, a grid of cards for the main content, and panels that appear and disappear without breaking the layout. Stripe's dashboard uses a flex header, a fixed-width sidebar, and a grid of metric cards. Vercel's deployment page toggles panels in and out with display: none. You are about to build the same thing from scratch.",
        docLinks: [
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "flexbox",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
            type: "css-concept",
          },
          {
            label: "CSS Grid",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
            type: "css-concept",
          },
          {
            label: "visibility",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/visibility",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Real-world dashboards at companies like Stripe, Vercel, and GitHub use exactly these techniques: a flex header for the top bar, a sidebar using block layout, CSS Grid for the card area, and display: none to conditionally show/hide panels.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Dashboard Layout Structure -->\n<header class="dashboard-header">\n  <span class="logo">MyApp</span>\n  <nav class="header-nav">\n    <a href="#">Dashboard</a>\n    <a href="#">Settings</a>\n    <a href="#">Profile</a>\n  </nav>\n</header>\n\n<div class="dashboard-body">\n  <aside class="sidebar">\n    <a href="#">Overview</a>\n    <a href="#">Analytics</a>\n    <a href="#">Reports</a>\n  </aside>\n  <main class="content-grid">\n    <div class="card">Revenue</div>\n    <div class="card">Users</div>\n    <div class="card draft">Traffic (Draft)</div>\n    <div class="card">Orders</div>\n    <div class="card">Feedback</div>\n    <div class="card">Growth</div>\n  </main>\n</div>\n\n<div class="admin-panel">\n  <p>Admin-only settings here</p>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "flex-the-header",
      type: "gap-fill",
      instruction: {
        heading: "Flex the header",
        body: "The header needs the logo on the left and navigation links on the right — a classic pattern you see on almost every website. To achieve this, the header becomes a flex container, and a single justify-content value pushes the two children to opposite ends. Think of it like two people on a park bench: the bench (flex container) tells them to sit as far apart as possible.",
        docLinks: [
          {
            label: "justify-content",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content",
            type: "css-property",
          },
          {
            label: "display: flex",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display#flex",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "justify-content only works on the main axis of a flex container. If your items are not spreading out, double-check that the parent has display: flex first.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          ".dashboard-header {\n  display: {{display_val}};\n  justify-content: {{justify_val}};\n  align-items: center;\n  padding: 12px 24px;\n  background: #1E293B;\n  color: white;\n}",
        gaps: [
          {
            id: "display_val",
            placeholder: "display value",
            acceptedAnswers: ["flex"],
            caseSensitive: false,
          },
          {
            id: "justify_val",
            placeholder: "justify value",
            acceptedAnswers: ["space-between"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The header needs to be a flex container.",
        "To push items to opposite ends, use 'space-between'.",
      ],
    },
    {
      id: "grid-the-content",
      type: "gap-fill",
      instruction: {
        heading: "Grid the content cards",
        body: "The main content area should display cards in a 3-column grid with even spacing. CSS Grid is the perfect tool here — it gives you precise control over columns and gutters in a single declaration. The grid-template-columns property defines how many columns you want and how wide each one should be. Using the repeat() function with the fr unit creates equal, flexible columns that share the available space evenly.",
        docLinks: [
          {
            label: "display: grid",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display#grid",
            type: "css-property",
          },
          {
            label: "grid-template-columns",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns",
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
            variant: "standard",
            title: "Web Standard",
            body: "The fr unit stands for 'fraction of the remaining space.' Writing repeat(3, 1fr) means 'create three columns that each take one equal fraction of the available width.' This is the most common pattern for card grids on the modern web.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          ".content-grid {\n  display: {{display_val}};\n  grid-template-columns: {{columns}};\n  gap: 16px;\n  padding: 16px;\n}",
        gaps: [
          {
            id: "display_val",
            placeholder: "display value",
            acceptedAnswers: ["grid"],
            caseSensitive: false,
          },
          {
            id: "columns",
            placeholder: "column definition",
            acceptedAnswers: ["repeat(3, 1fr)", "1fr 1fr 1fr"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The content area needs to be a grid container.",
        "Use repeat(3, 1fr) for three equal columns.",
      ],
    },
    {
      id: "hide-the-admin-panel",
      type: "gap-fill",
      instruction: {
        heading: "Hide and ghost",
        body: "The admin panel should be completely removed from the layout — no space left behind, as if it were never in the HTML. The draft card is different: it should be invisible, but it must keep its space in the grid so the other cards do not shift around. This is the core distinction you learned earlier: one property removes the element from the document flow, and the other makes it transparent while preserving its footprint.",
        docLinks: [
          {
            label: "display: none",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display#none",
            type: "css-property",
          },
          {
            label: "visibility",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/visibility",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you use display: none on the draft card instead of visibility: hidden, the grid will collapse that cell and the remaining cards will reflow — your 3-column layout will look broken. Always think about whether you want surrounding content to shift or stay in place.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          ".admin-panel {\n  display: {{hide_value}};\n}\n\n.draft {\n  {{visibility_prop}}: hidden;\n}",
        gaps: [
          {
            id: "hide_value",
            placeholder: "value",
            acceptedAnswers: ["none"],
            caseSensitive: false,
          },
          {
            id: "visibility_prop",
            placeholder: "property",
            acceptedAnswers: ["visibility"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "display: ___ removes an element entirely.",
        "The property that hides without removing space is 'visibility'.",
      ],
    },
    {
      id: "style-the-sidebar",
      type: "free-edit",
      instruction: {
        heading: "Style the sidebar",
        body: "The sidebar and content area need to sit side by side — sidebar on the left, content grid filling the remaining space on the right. To achieve this, the .dashboard-body wrapper becomes a flex container. The sidebar gets a fixed width (so it does not grow or shrink), and the content grid takes up the rest. The sidebar links are already set to display: block, so they stack vertically. Your job is to write the flexbox rules that make the two-column layout work.",
        docLinks: [
          {
            label: "flex",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex",
            type: "css-property",
          },
          {
            label: "width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If the sidebar and content stack vertically instead of sitting side by side, you forgot display: flex on the parent. Remember: child elements only become flex items when their parent is a flex container.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          ".dashboard-body {\n  /* Use flexbox to place sidebar and content side by side */\n\n}\n\n.sidebar {\n  /* Fixed-width block sidebar */\n\n}\n\n.sidebar a {\n  display: block;\n  padding: 8px 16px;\n  color: #334155;\n  text-decoration: none;\n}",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "display" },
      },
      hints: [
        "Set .dashboard-body to display: flex;",
        "Give .sidebar a fixed width like width: 200px;",
        "The sidebar links are already display: block, so they stack vertically.",
      ],
    },
    {
      id: "complete-the-dashboard",
      type: "free-edit",
      instruction: {
        heading: "Complete the dashboard",
        body: "Fill in all the empty CSS rules to build the complete dashboard. You need: a flex header with space-between to push the logo and nav apart, a flex body to place the sidebar and content side by side, a fixed-width sidebar, a 3-column grid for the content cards, a hidden admin panel (display: none), and an invisible draft card (visibility: hidden). This is everything from the module in one layout. Take your time — when you are done, you will have built a production-style dashboard from scratch using only CSS display and layout properties.",
        docLinks: [
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "flexbox guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox",
            type: "css-concept",
          },
          {
            label: "CSS Grid guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout",
            type: "css-concept",
          },
          {
            label: "visibility",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/visibility",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "This dashboard uses only standard CSS layout techniques — no JavaScript, no frameworks, no hacks. Flexbox and Grid are supported in every modern browser and are the recommended way to build layouts according to the W3C CSS specification.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Work from the outside in: start with the header, then the body (sidebar + content), then the grid, and finally the hidden elements. Testing after each rule makes it easier to spot mistakes.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<header class="dashboard-header">\n  <span class="logo">MyApp</span>\n  <nav class="header-nav">\n    <a href="#">Dashboard</a>\n    <a href="#">Settings</a>\n    <a href="#">Profile</a>\n  </nav>\n</header>\n\n<div class="dashboard-body">\n  <aside class="sidebar">\n    <a href="#">Overview</a>\n    <a href="#">Analytics</a>\n    <a href="#">Reports</a>\n  </aside>\n  <main class="content-grid">\n    <div class="card">Revenue</div>\n    <div class="card">Users</div>\n    <div class="card draft">Traffic (Draft)</div>\n    <div class="card">Orders</div>\n    <div class="card">Feedback</div>\n    <div class="card">Growth</div>\n  </main>\n</div>\n\n<div class="admin-panel">\n  <p>Admin-only settings</p>\n</div>\n\n<style>\n/* Header: flex, space-between, dark background */\n.dashboard-header {\n  \n}\n.logo { font-weight: bold; font-size: 1.2em; }\n.header-nav a { color: #94A3B8; text-decoration: none; margin-left: 16px; }\n\n/* Body: sidebar + content side by side */\n.dashboard-body {\n  \n}\n\n/* Sidebar: fixed width, light background */\n.sidebar {\n  \n}\n.sidebar a { display: block; padding: 8px 16px; color: #334155; text-decoration: none; }\n\n/* Content: 3-column grid */\n.content-grid {\n  \n}\n\n/* Cards */\n.card {\n  padding: 24px;\n  background: #F1F5F9;\n  border-radius: 8px;\n  text-align: center;\n  font-weight: 600;\n}\n\n/* Hidden elements */\n.admin-panel {\n  \n}\n.draft {\n  \n}\n</style>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "grid-template-columns" },
      },
      hints: [
        "Header: display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; background: #1E293B; color: white;",
        "Body: display: flex;",
        "Sidebar: width: 200px; background: #F8FAFC; padding: 8px 0;",
        "Content grid: display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 16px; flex: 1;",
        "Admin: display: none; | Draft: visibility: hidden;",
      ],
    },
  ],
};
