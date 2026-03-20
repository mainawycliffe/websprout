import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-media-queries",
  slug: "media-queries",
  title: "Introduction to Media Queries",
  description:
    "Learn the @media syntax to apply different CSS rules at different screen widths.",
  order: 4,
  steps: [
    {
      id: "what-are-media-queries",
      type: "explanation",
      instruction: {
        heading: "What are media queries?",
        body: "Relative units alone can't solve every responsive problem. Sometimes you need to make a dramatic layout change at a certain screen size — switch from a sidebar layout to a stacked layout, hide a navigation menu and show a hamburger icon, or change from a 3-column grid to a single column. Media queries let you write CSS rules that only apply when certain conditions are met — most commonly, when the browser window is a certain width. Think of them as 'if statements' for CSS: 'If the screen is at least 768px wide, use this layout. Otherwise, use that layout.'\n\nWhen you visit Instagram on your phone, you see a single-column feed. On a desktop, you see the feed plus a sidebar with suggestions. Instagram doesn't serve a different website — it uses media queries to show different layouts based on the screen width. Every major website uses media queries: Google rearranges its search results page, YouTube switches from a grid to a stacked layout, and Amazon reorganizes its product pages.",
        analogy:
          "Media queries are like a thermostat. A thermostat says 'if the temperature drops below 68 degrees, turn on the heat.' A media query says 'if the screen width drops below 768 pixels, stack these columns vertically.' Both are conditional rules that trigger different behavior based on a measured value.",
        docLinks: [
          {
            label: "MDN: Using media queries",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries",
            type: "css-concept",
          },
          {
            label: "MDN: @media",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Media queries are part of the CSS3 specification (Media Queries Level 4). They can test for many conditions beyond width: screen orientation (portrait vs landscape), color scheme preference (light vs dark mode), reduced motion preference, pointer type (mouse vs touch), and more. Width-based queries are the most common for responsive design.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Base styles — apply to all screen sizes */\n.sidebar {\n  display: none; /* Hidden on small screens */\n}\n\n/* When the screen is at least 768px wide... */\n@media (min-width: 768px) {\n  .sidebar {\n    display: block; /* Show the sidebar */\n    width: 250px;\n  }\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "media-query-syntax",
      type: "explanation",
      instruction: {
        heading: "Anatomy of a media query",
        body: "A media query has three parts:\n\n<ol><li>The @media keyword — This tells the browser that what follows is a conditional rule.</li><li>The condition in parentheses — For example, (min-width: 768px). This is the test. min-width means 'the viewport is at least this wide.' max-width means 'the viewport is at most this wide.' You can combine conditions with 'and': @media (min-width: 768px) and (max-width: 1024px) targets screens between 768px and 1024px.</li><li>The CSS block in curly braces — The styles inside only apply when the condition is true. Everything outside media queries applies to all screen sizes.</li></ol>\n\nCommon breakpoints (the widths where layouts change) are:\n<ul><li>480px — Small phones</li><li>768px — Tablets</li><li>1024px — Small laptops</li><li>1200px — Desktops</li><li>1440px — Large desktops</li></ul>\n\nThese aren't magic numbers — they're rough guidelines based on common device sizes. Your breakpoints should be based on where your design actually breaks, not on device sizes.",
        docLinks: [
          {
            label: "MDN: @media",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Don't choose breakpoints based on specific devices ('iPhone 14 is 390px'). Devices come and go constantly. Instead, resize your browser window slowly and add a breakpoint where your design starts to look broken. Let the content dictate the breakpoints, not the devices.",
          },
          {
            variant: "standard",
            title: "Web Standard",
            body: "Media queries support logical operators: 'and' (both conditions must be true), 'or' using a comma (either condition can be true), and 'not' (inverts the query). For example: @media (min-width: 768px) and (orientation: landscape) targets tablets in landscape mode.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Styles for all screens (base) */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr; /* Single column */\n  gap: 1rem;\n}\n\n/* Tablets and up */\n@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr 1fr; /* Two columns */\n  }\n}\n\n/* Desktops and up */\n@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: 1fr 1fr 1fr; /* Three columns */\n  }\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "write-media-query",
      type: "gap-fill",
      instruction: {
        heading: "Write a media query",
        body: "Complete this media query to change the layout from a single column to two columns when the screen is at least 768px wide.",
      },
      config: {
        type: "gap-fill",
        template:
          ".container {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\n@{{keyword}} ({{condition}}: 768px) {\n  .container {\n    grid-template-columns: 1fr 1fr;\n  }\n}",
        gaps: [
          {
            id: "keyword",
            placeholder: "keyword",
            acceptedAnswers: ["media"],
            caseSensitive: true,
          },
          {
            id: "condition",
            placeholder: "condition",
            acceptedAnswers: ["min-width"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Media queries start with the @media keyword.",
        "To target screens 'at least' a certain width, use min-width.",
      ],
    },
    {
      id: "breakpoint-practice",
      type: "gap-fill",
      instruction: {
        heading: "Target a range of screen sizes",
        body: "Write a media query that targets only tablet-sized screens — at least 768px wide but no wider than 1024px. This requires combining two conditions.",
      },
      config: {
        type: "gap-fill",
        template:
          "@media (min-width: {{min}}) {{combiner}} (max-width: {{max}}) {\n  .sidebar {\n    width: 200px;\n  }\n}",
        gaps: [
          {
            id: "min",
            placeholder: "minimum width",
            acceptedAnswers: ["768px"],
            caseSensitive: false,
          },
          {
            id: "combiner",
            placeholder: "combiner",
            acceptedAnswers: ["and"],
            caseSensitive: true,
          },
          {
            id: "max",
            placeholder: "maximum width",
            acceptedAnswers: ["1024px"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The minimum tablet width is typically 768px.",
        "Use 'and' to combine two conditions.",
        "The maximum for tablet range is typically 1024px.",
      ],
    },
    {
      id: "responsive-grid",
      type: "free-edit",
      instruction: {
        heading: "Build a responsive grid",
        body: "Create a responsive grid that shows 1 column on phones, 2 columns on tablets (768px+), and 3 columns on desktops (1024px+). Write the base styles and two media queries to make the layout adapt.",
        docLinks: [
          {
            label: "MDN: grid-template-columns",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Put your media queries after the base styles. CSS reads top to bottom, so later rules override earlier ones. If the screen is 1200px wide, both media queries apply — the 1024px one overrides the 768px one because it comes later. This cascading behavior is what makes the system work.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* Base styles — phones */\n.product-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n/* Add media queries for tablet (768px) and desktop (1024px) */\n",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "grid-template-columns" },
      },
      hints: [
        "Add @media (min-width: 768px) { .product-grid { grid-template-columns: 1fr 1fr; } }",
        "Add @media (min-width: 1024px) { .product-grid { grid-template-columns: 1fr 1fr 1fr; } }",
      ],
    },
  ],
};
