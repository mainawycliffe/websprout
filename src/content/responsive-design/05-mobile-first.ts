import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-mobile-first",
  slug: "mobile-first",
  title: "Mobile-First Design",
  description:
    "Learn why starting with mobile styles and adding complexity for larger screens leads to better websites.",
  order: 5,
  steps: [
    {
      id: "desktop-first-problems",
      type: "explanation",
      instruction: {
        heading: "The problem with desktop-first",
        body: "Many developers instinctively design for desktop first — they build a complex multi-column layout, then try to squeeze it into a phone screen using max-width media queries. This approach has serious problems. First, mobile users (who make up the majority of web traffic) download all the complex desktop CSS even though they never use it. Second, it's much harder to simplify a complex layout than to enhance a simple one. You end up writing lots of override rules to undo desktop styles on mobile: hiding sidebars, unstacking columns, shrinking fonts. It feels like you're fighting your own code.\n\nMobile-first flips this approach: you write the simplest styles first (for mobile), then progressively add complexity for larger screens using min-width media queries. The base CSS is lean and fast — perfect for phones on slow connections. Larger screens add features: extra columns, visible sidebars, larger images. This strategy is called progressive enhancement — start with a solid foundation and layer on improvements. Google, GitHub, and most modern web teams design mobile-first because it produces smaller CSS files, fewer override hacks, and a better experience for the majority of users.",
        analogy:
          "Mobile-first is like packing for a trip. If you start with a huge suitcase (desktop), you'll bring everything and then struggle to fit it into a carry-on (mobile) at the last minute. But if you start with a carry-on (mobile) and pack only the essentials, you already have a working bag. If you later upgrade to a bigger suitcase (desktop), you just add nice-to-haves. Starting small and adding is always easier than starting big and cutting.",
        docLinks: [
          {
            label: "MDN: Mobile first",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design#mobile_first",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Progressive enhancement is a core web design philosophy. The basic content and functionality should work on the simplest devices, with enhanced experiences layered on for more capable devices. Mobile-first CSS is the practical application of this principle: the base styles are the mobile layout, and media queries progressively enhance for larger viewports.",
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
      id: "min-width-vs-max-width",
      type: "explanation",
      instruction: {
        heading: "min-width vs max-width",
        body: "The key technical difference between mobile-first and desktop-first is the media query direction:\n\nMobile-first uses min-width: 'When the screen is at least this wide, add these styles.' Base styles are mobile. You build up.\n\nDesktop-first uses max-width: 'When the screen is at most this wide, override with these styles.' Base styles are desktop. You tear down.\n\nHere's the same layout built both ways. Notice how the mobile-first version is cleaner — the base styles do the simplest thing (single column), and the media query adds the enhancement (two columns). The desktop-first version starts complex and has to undo it. In real projects with dozens of components, the mobile-first approach saves you from writing hundreds of override rules.",
        docLinks: [
          {
            label: "MDN: min-width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A quick rule of thumb: if you find yourself writing lots of 'undo' rules in your media queries (display: none, width: auto, margin: 0), you're probably using the wrong direction. Switch to mobile-first (min-width) and you'll write additive rules instead of subtractive ones.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* ✅ MOBILE-FIRST (min-width) — recommended */\n.layout {\n  display: flex;\n  flex-direction: column; /* Stacked on mobile */\n}\n@media (min-width: 768px) {\n  .layout {\n    flex-direction: row; /* Side-by-side on tablet+ */\n  }\n}\n\n/* ❌ DESKTOP-FIRST (max-width) — more overrides needed */\n.layout {\n  display: flex;\n  flex-direction: row; /* Side-by-side on desktop */\n}\n@media (max-width: 767px) {\n  .layout {\n    flex-direction: column; /* Undo for mobile */\n  }\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "identify-mobile-first",
      type: "gap-fill",
      instruction: {
        heading: "Write mobile-first media queries",
        body: "Complete this mobile-first navigation. The base (mobile) styles stack nav links vertically. The media query at 768px should switch them to horizontal. Remember: mobile-first means using min-width.",
      },
      config: {
        type: "gap-fill",
        template:
          "/* Mobile: stacked links */\n.nav {\n  display: flex;\n  flex-direction: {{mobile_dir}};\n  gap: 0.5rem;\n}\n\n/* Tablet and up: horizontal links */\n@media ({{query_type}}: 768px) {\n  .nav {\n    flex-direction: {{desktop_dir}};\n  }\n}",
        gaps: [
          {
            id: "mobile_dir",
            placeholder: "direction",
            acceptedAnswers: ["column"],
            caseSensitive: true,
          },
          {
            id: "query_type",
            placeholder: "query type",
            acceptedAnswers: ["min-width"],
            caseSensitive: true,
          },
          {
            id: "desktop_dir",
            placeholder: "direction",
            acceptedAnswers: ["row"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "On mobile, links stack in a column.",
        "Mobile-first uses min-width to add styles for larger screens.",
        "On wider screens, links sit in a row.",
      ],
    },
    {
      id: "mobile-first-layout",
      type: "free-edit",
      instruction: {
        heading: "Build a mobile-first layout",
        body: "Create a mobile-first page layout with a header, main content, and sidebar. On mobile, everything should stack vertically. At 768px, the main content and sidebar should sit side by side (using flexbox). Write the base styles first, then add the min-width media query.",
        docLinks: [
          {
            label: "MDN: Flexbox",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Test your mobile-first CSS by making the browser window narrow first — the base styles should work. Then slowly widen the window and check that the media query kicks in at 768px. If the narrow view looks wrong, fix your base styles before adding media queries.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* Mobile-first base styles */\n.page {\n  /* Stack everything vertically */\n}\n\n.header {\n  padding: 1rem;\n  background: #1E293B;\n  color: white;\n}\n\n.content-area {\n  /* This wraps main + sidebar */\n}\n\n.main {\n  padding: 1rem;\n}\n\n.sidebar {\n  padding: 1rem;\n  background: #F1F5F9;\n}\n\n/* Tablet and up — add side-by-side layout */\n",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "min-width" },
      },
      hints: [
        "The base .content-area can use display: flex with flex-direction: column.",
        "In the media query, change .content-area to flex-direction: row.",
        "Give .sidebar a fixed width like width: 250px and .main a flex: 1 to fill remaining space.",
      ],
    },
  ],
};
