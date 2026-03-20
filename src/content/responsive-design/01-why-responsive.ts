import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-why-responsive",
  slug: "why-responsive",
  title: "Why Responsive Design Matters",
  description:
    "Understand why websites need to adapt to different screen sizes and what happens when they don't.",
  order: 1,
  steps: [
    {
      id: "the-problem",
      type: "explanation",
      instruction: {
        heading: "One website, a thousand screen sizes",
        body: "In the early days of the web, everyone used a desktop computer with a similar-sized monitor. Designers could pick a fixed width — say 960 pixels — and call it a day. But today, people browse the web on phones, tablets, laptops, ultrawide monitors, smart TVs, and even smart watches. Over 60% of all web traffic now comes from mobile devices. When you visit Google, YouTube, or Amazon on your phone, notice how the layout looks completely different from the desktop version — yet you're viewing the exact same website. The content rearranges itself to fit your screen. That's responsive design: building websites that automatically adapt their layout, sizing, and spacing to look good on any screen size. Without it, mobile users would see a tiny, shrunken version of a desktop page — text too small to read, buttons too small to tap, and horizontal scrolling to see the full page. Responsive design was created to solve this exact problem.",
        analogy:
          "Think of water. When you pour water into a tall glass, it takes the shape of a tall glass. Pour the same water into a wide bowl, and it spreads out to fill the bowl. The water (your content) is the same — but it adapts to whatever container (screen) it's in. Responsive design makes your website flow like water, filling whatever screen it lands on.",
        docLinks: [
          {
            label: "MDN: Responsive design",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Responsive web design was coined by Ethan Marcotte in 2010. It combines three techniques: fluid grids (using relative units instead of fixed pixels), flexible images (that scale with their containers), and media queries (CSS rules that activate at specific screen widths). These three pillars are now fundamental to how the web works.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Google uses mobile-friendliness as a ranking factor. If your website doesn't work well on phones, it will rank lower in search results. Responsive design isn't just about user experience — it directly affects how many people find your site.",
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
      id: "fixed-vs-fluid",
      type: "explanation",
      instruction: {
        heading: "Fixed layouts vs. fluid layouts",
        body: "A fixed-width layout uses absolute pixel values — for example, setting a container to exactly 960px wide. On a desktop monitor, this looks fine. But on a 375px-wide phone screen, the page extends way beyond the right edge, forcing users to scroll horizontally. On a 2560px ultrawide monitor, the content sits in a narrow strip in the center with huge empty margins. A fluid layout, on the other hand, uses relative units like percentages. If you set a container to width: 90%, it always takes up 90% of whatever screen it's on — 337px on a phone, 864px on a laptop, or 2304px on an ultrawide. The content stretches and shrinks to fill the available space. Open Wikipedia on your phone and then on your laptop. The same article content reflows: on desktop you see a wide column with a sidebar; on mobile the sidebar disappears and the content takes the full width. That's the shift from fixed to fluid thinking.",
        docLinks: [
          {
            label: "MDN: CSS values and units",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "You can test different screen sizes without owning multiple devices. In Chrome or Firefox, press F12 to open DevTools, then click the device toggle icon (a phone/tablet icon) to simulate any screen size. This is how professional developers test responsive layouts.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '/* Fixed layout - breaks on small screens */\n.container-fixed {\n  width: 960px;\n  margin: 0 auto;\n}\n\n/* Fluid layout - adapts to any screen */\n.container-fluid {\n  width: 90%;\n  max-width: 1200px;\n  margin: 0 auto;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fill-fluid-container",
      type: "gap-fill",
      instruction: {
        heading: "Make a container fluid",
        body: "Convert this fixed-width container to a fluid one. Use a percentage for the width so it adapts to any screen, and add a max-width so it doesn't stretch too wide on large monitors.",
      },
      config: {
        type: "gap-fill",
        template:
          ".container {\n  width: {{width_value}};\n  max-width: {{max_width}};\n  margin: 0 auto;\n}",
        gaps: [
          {
            id: "width_value",
            placeholder: "percentage width",
            acceptedAnswers: ["90%", "80%", "95%", "100%"],
            caseSensitive: false,
          },
          {
            id: "max_width",
            placeholder: "maximum width",
            acceptedAnswers: ["1200px", "1100px", "1000px", "960px"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "A common fluid width is 90%.",
        "A common max-width for readability is 1200px.",
      ],
    },
    {
      id: "try-fluid-layout",
      type: "free-edit",
      instruction: {
        heading: "Build a fluid container",
        body: "Edit the CSS to make this card container responsive. Replace the fixed 800px width with a percentage-based width and add a max-width to keep it readable on large screens. Try resizing the preview to see how it adapts.",
        docLinks: [
          {
            label: "MDN: max-width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/max-width",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The combination of width: 90% and max-width: 1200px is one of the most common patterns on the web. The element takes 90% of its parent on small screens (leaving a small gutter), but never exceeds 1200px on large screens for comfortable reading.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* This container is fixed at 800px — it won't adapt! */\n.card-container {\n  width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n  background: #F8FAFC;\n  border-radius: 8px;\n}",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "max-width" },
      },
      hints: [
        "Replace width: 800px with a percentage like width: 90%.",
        "Add max-width: 1200px to cap the width on large screens.",
      ],
    },
  ],
};
