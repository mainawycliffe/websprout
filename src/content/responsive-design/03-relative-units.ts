import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-relative-units",
  slug: "relative-units",
  title: "Relative Units",
  description:
    "Compare px, %, em, rem, vw, and vh — learn when to use each unit for responsive layouts.",
  order: 3,
  steps: [
    {
      id: "px-the-fixed-unit",
      type: "explanation",
      instruction: {
        heading: "Pixels: the fixed unit",
        body: "The px unit is absolute — 16px is always 16px, whether you're on a phone or a 4K monitor. This is great for things that should never change size, like borders (1px solid black) or small icon dimensions. But for layout widths, font sizes, and spacing, fixed pixels create problems. A sidebar set to width: 300px works fine on a 1920px desktop but takes up 80% of a 375px phone screen, leaving almost no room for content. That's why responsive design uses relative units — values that calculate their size based on something else (the parent element, the root font size, or the viewport). The trick is knowing which relative unit to use for which job.",
        analogy:
          "Pixels are like measuring in centimeters on paper — the measurement is always the same regardless of how large the paper is. Percentages are like saying 'half the page' — on a small page that's small, on a large page that's large. Responsive design needs measurements that stretch and shrink with the page, not fixed rulers.",
        docLinks: [
          {
            label: "MDN: CSS values and units",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "A CSS pixel is not the same as a device pixel. On a 2x Retina display, one CSS pixel maps to four device pixels (2 wide x 2 tall). The browser handles this scaling automatically. When we say '16px', we mean 16 CSS pixels — a consistent logical unit across all devices.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Fixed pixels — same size everywhere */\n.sidebar {\n  width: 300px;   /* Always 300px, even on a 375px phone */\n  font-size: 16px; /* Always 16px regardless of user preferences */\n}\n\n/* These are fine as fixed values */\n.border-example {\n  border: 1px solid #ccc;  /* Borders usually stay fixed */\n  border-radius: 8px;       /* Rounding is fine as fixed */\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "percentage-unit",
      type: "explanation",
      instruction: {
        heading: "Percentages: relative to the parent",
        body: "The % unit calculates its value relative to the parent element. If you set width: 50% on an element inside a 1000px container, it becomes 500px. Inside a 400px container, it becomes 200px. This makes percentages ideal for layout widths — columns, containers, and sidebars that should scale with their parent. Amazon's product grid uses percentage-based widths: each product card takes up a fraction of the row, and the number of columns changes based on how much space is available.\n\nPercentages work differently for different properties. For width, it's relative to the parent's width. For height, it's relative to the parent's height (but only if the parent has a defined height — otherwise it's ignored). For padding and margin, percentages are always relative to the parent's width, even for top/bottom padding. This last quirk catches many developers off guard.",
        docLinks: [
          {
            label: "MDN: percentage",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/percentage",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A common gotcha: percentage-based height (height: 50%) only works if the parent element has a defined height. If the parent's height is auto (the default), the percentage is ignored and the element sizes to its content. This is why percentage widths are much more common than percentage heights in responsive design.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Parent is 100% of the viewport -->\n<div style="width: 100%; background: #F1F5F9; padding: 16px;">\n  <!-- Child takes 50% of the parent -->\n  <div style="width: 50%; background: #DBEAFE; padding: 12px;">\n    I\'m 50% of my parent\n  </div>\n  <!-- Another child at 75% -->\n  <div style="width: 75%; background: #E0E7FF; padding: 12px; margin-top: 8px;">\n    I\'m 75% of my parent\n  </div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "em-and-rem",
      type: "explanation",
      instruction: {
        heading: "em and rem: font-relative units",
        body: "The em unit is relative to the font size of the element itself (or its parent, for font-size declarations). If an element has font-size: 16px, then 1em equals 16px, 2em equals 32px, and 0.5em equals 8px. This makes em great for component-level spacing — padding and margins that scale proportionally with the text size.\n\nThe rem unit (root em) is always relative to the root <html> element's font size, which defaults to 16px in most browsers. 1rem = 16px, 2rem = 32px, 0.75rem = 12px. Because rem is anchored to a single root value, it's more predictable than em. There's no compounding problem — if a parent sets font-size: 1.2em and a child also sets font-size: 1.2em, the child's actual size compounds (1.2 x 1.2 = 1.44 times the original). With rem, every element references the same root value.\n\nUse rem for global sizing (font sizes, section spacing, container padding). Use em for component-internal spacing (padding inside a button that should scale with the button's own text size). YouTube's interface uses rem-based font sizing — when you change your browser's default font size in settings, the entire YouTube interface scales proportionally.",
        docLinks: [
          {
            label: "MDN: em unit",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units#ems_and_rems",
            type: "css-concept",
          },
          {
            label: "MDN: rem unit",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units#ems_and_rems",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The browser's default font size is 16px, but users can change this in their browser settings (Settings > Appearance > Font size). Using rem units respects this preference — if a user sets their default to 20px, 1rem becomes 20px and your entire layout scales. Using px ignores user preferences, which is an accessibility problem for users with low vision.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Avoid deeply nested em values — they compound. A 1.2em font inside a 1.2em parent inside another 1.2em grandparent yields 1.728em (1.2 x 1.2 x 1.2). This 'compounding effect' makes em unpredictable for font sizes. Use rem for font sizes and em only for padding/margin that should scale with the element's own text.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '/* rem — relative to root (html) font size (default 16px) */\nh1 { font-size: 2rem; }    /* 32px */\np  { font-size: 1rem; }    /* 16px */\n\n/* em — relative to the element\'s own font size */\n.button {\n  font-size: 1rem;      /* 16px */\n  padding: 0.5em 1em;   /* 8px top/bottom, 16px left/right */\n}\n\n.button-large {\n  font-size: 1.5rem;    /* 24px */\n  padding: 0.5em 1em;   /* 12px top/bottom, 24px left/right — scales with font! */\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "vw-and-vh",
      type: "explanation",
      instruction: {
        heading: "vw and vh: viewport units",
        body: "The vw (viewport width) and vh (viewport height) units are relative to the browser window itself. 1vw equals 1% of the viewport width. 100vw is the full width of the browser window. Similarly, 1vh equals 1% of the viewport height. These units are powerful for creating elements that directly relate to the screen size — full-screen hero sections, full-width banners, or text that scales with the window.\n\nA common use case is a hero section: height: 100vh makes it exactly the height of the browser window, creating that dramatic full-screen first impression you see on sites like Apple's product pages or Stripe's landing page. For widths, 100vw gives you the full viewport width (useful for breaking out of a narrower parent container).\n\nBe careful with vh on mobile: mobile browsers have a disappearing address bar that changes the viewport height as you scroll. 100vh might be taller than the visible area when the address bar is showing. Modern CSS has new units — svh (small viewport height), lvh (large viewport height), and dvh (dynamic viewport height) — that handle this better.",
        docLinks: [
          {
            label: "MDN: Viewport units",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "CSS now defines svh/svw (small viewport), lvh/lvw (large viewport), and dvh/dvw (dynamic viewport) units. The dynamic viewport units account for mobile browser UI elements that appear and disappear. Use dvh instead of vh when you need precise full-height layouts on mobile.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "100vw includes the scrollbar width on desktop browsers, which can cause a horizontal scrollbar. If you want full-width without overflow, use width: 100% on a direct child of body instead of width: 100vw.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Full-screen hero section */\n.hero {\n  height: 100vh;        /* Full viewport height */\n  width: 100%;          /* Full width (safer than 100vw) */\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/* Text that scales with viewport */\n.hero-title {\n  font-size: 5vw;       /* Gets bigger as the window widens */\n}\n\n/* Modern mobile-safe alternative */\n.hero-modern {\n  height: 100dvh;       /* Dynamic viewport height */\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "pick-the-unit",
      type: "gap-fill",
      instruction: {
        heading: "Pick the right unit",
        body: "Fill in the correct relative unit for each use case. Think about what each value should be relative to.",
      },
      config: {
        type: "gap-fill",
        template:
          "/* A container that's 90% of its parent */\n.container { width: 90{{unit1}}; }\n\n/* A heading sized relative to the root font */\nh1 { font-size: 2{{unit2}}; }\n\n/* A hero section that fills the screen height */\n.hero { height: 100{{unit3}}; }",
        gaps: [
          {
            id: "unit1",
            placeholder: "unit",
            acceptedAnswers: ["%"],
            caseSensitive: false,
          },
          {
            id: "unit2",
            placeholder: "unit",
            acceptedAnswers: ["rem"],
            caseSensitive: false,
          },
          {
            id: "unit3",
            placeholder: "unit",
            acceptedAnswers: ["vh", "dvh"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "A container width relative to its parent uses the percentage unit.",
        "Font sizes relative to the root element use rem.",
        "Full-screen height relative to the browser window uses vh.",
      ],
    },
    {
      id: "convert-to-relative",
      type: "free-edit",
      instruction: {
        heading: "Convert fixed to relative",
        body: "This card component uses all fixed pixel values. Convert it to use relative units: rem for font sizes and padding, percentages or max-width for the container width. Make it responsive!",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A quick conversion guide when the root font size is 16px: 12px = 0.75rem, 16px = 1rem, 20px = 1.25rem, 24px = 1.5rem, 32px = 2rem, 48px = 3rem. Divide the pixel value by 16 to get rem.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          ".card {\n  width: 400px;\n  padding: 32px;\n  font-size: 16px;\n}\n\n.card h2 {\n  font-size: 24px;\n  margin-bottom: 16px;\n}\n\n.card p {\n  font-size: 14px;\n  line-height: 24px;\n}",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "rem" },
      },
      hints: [
        "Replace width: 400px with max-width: 25rem or width: 90% with a max-width.",
        "Replace font-size: 16px with font-size: 1rem.",
        "Replace padding: 32px with padding: 2rem.",
      ],
    },
  ],
};
