import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-responsive-typography",
  slug: "responsive-typography",
  title: "Responsive Typography",
  description:
    "Learn to create fluid text that scales smoothly between screen sizes using clamp() and viewport units.",
  order: 7,
  steps: [
    {
      id: "why-font-sizes-fail",
      type: "explanation",
      instruction: {
        heading: "Why fixed font sizes fail on mobile",
        body: "A heading set to font-size: 48px looks great on a desktop monitor with 1200px of width. But on a 375px phone screen, that same 48px heading might take up two or three lines and dominate the viewport, pushing actual content below the fold. The obvious fix — using a media query to set a smaller font size on mobile — works but creates a jarring jump. At 767px the heading is 48px; at 768px it suddenly snaps to 32px. There's no smooth transition.\n\nViewport units (vw) seem like the answer: font-size: 5vw scales smoothly with the screen. But they have a critical flaw — on very small screens the text becomes microscopic, and on very large screens it becomes comically huge. A 5vw heading is 18.75px on a 375px phone (barely readable) and 96px on a 1920px monitor (absurdly large). You need a way to scale smoothly while setting a minimum and maximum size. That's exactly what clamp() does.\n\nLook at any well-designed website — Apple.com, Stripe.com, or Medium — and resize your browser window slowly. The headings scale smoothly, never too small to read and never too large to look ridiculous. That's fluid typography in action.",
        analogy:
          "Fixed font sizes are like wearing the same size shoes everywhere — they fit one place but hurt everywhere else. Viewport units are like shoes that grow and shrink with the room — great in theory, but they might become too big in a warehouse or too small in a closet. Clamp() is like shoes with a size range: 'be at least size 8, grow up to size 12, but scale with the room in between.'",
        docLinks: [
          {
            label: "MDN: clamp()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp",
            type: "css-concept",
          },
          {
            label: "MDN: font-size",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-size",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.1 Success Criterion 1.4.4 requires that text can be resized up to 200% without loss of content or functionality. Using relative units (rem, em, vw) for font sizes respects user preferences. If you use only px, users who increase their browser's default font size won't see any change.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Fixed — looks great at one size only */\nh1 { font-size: 48px; }\n\n/* Viewport units — scales but no limits */\nh1 { font-size: 5vw; } /* Too small on phones, too big on desktops */\n\n/* clamp() — smooth scaling with guardrails */\nh1 { font-size: clamp(1.5rem, 4vw + 0.5rem, 3rem); }",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "how-clamp-works",
      type: "explanation",
      instruction: {
        heading: "How clamp() works",
        body: "clamp() takes exactly three values: a minimum, a preferred (fluid) value, and a maximum.\n\nclamp(MIN, PREFERRED, MAX)\n\n<ul><li>MIN: The smallest the value can ever be. Even on the tiniest screen, the font won't go below this.</li><li>PREFERRED: A fluid calculation, typically using viewport units (vw) mixed with rem. This is the value the browser tries to use.</li><li>MAX: The largest the value can ever be. Even on an ultrawide monitor, the font won't exceed this.</li></ul>\n\nThe browser picks whichever of the three values is in the 'middle' — it uses the preferred value unless it would go below the minimum or above the maximum.\n\nFor example: clamp(1rem, 2.5vw + 0.5rem, 2rem)\n<ul><li>On a 375px phone: 2.5vw = 9.375px, plus 0.5rem (8px) = 17.375px = ~1.08rem. That's above 1rem minimum, so it's used.</li><li>On a 1920px monitor: 2.5vw = 48px, plus 8px = 56px = 3.5rem. That exceeds 2rem maximum, so the browser caps it at 2rem (32px).</li></ul>\n\nThe preferred value usually combines vw (for fluid scaling) with rem (for a baseline that respects user preferences). The + 0.5rem ensures the text stays readable even if the viewport is very narrow.",
        docLinks: [
          {
            label: "MDN: clamp()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp",
            type: "css-concept",
          },
          {
            label: "MDN: calc()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/calc",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "There are online calculators (like utopia.fyi) that generate clamp() values for you. You input the minimum screen width, maximum screen width, minimum font size, and maximum font size, and it outputs the exact clamp() formula. This is much easier than calculating the vw values by hand.",
          },
          {
            variant: "standard",
            title: "Web Standard",
            body: "clamp() is part of the CSS Values and Units Level 4 specification. It works in all modern browsers (Chrome 79+, Firefox 75+, Safari 13.1+). It's not just for font sizes — you can use clamp() for any CSS property that accepts a length: padding, margin, width, gap, and more.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* clamp(MINIMUM, PREFERRED, MAXIMUM) */\n\n/* Heading: 24px minimum, scales with viewport, 48px maximum */\nh1 {\n  font-size: clamp(1.5rem, 4vw + 0.5rem, 3rem);\n}\n\n/* Subheading: 18px min, fluid, 32px max */\nh2 {\n  font-size: clamp(1.125rem, 2.5vw + 0.5rem, 2rem);\n}\n\n/* Body text: 16px min, slightly fluid, 20px max */\np {\n  font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "write-clamp",
      type: "gap-fill",
      instruction: {
        heading: "Write a clamp() value",
        body: "Complete the clamp() function for a heading that should be at minimum 1.5rem, scale fluidly, and cap at 3rem.",
      },
      config: {
        type: "gap-fill",
        template:
          "h1 {\n  font-size: {{func}}(1.5rem, 4vw + 0.5rem, {{max}});\n}",
        gaps: [
          {
            id: "func",
            placeholder: "function name",
            acceptedAnswers: ["clamp"],
            caseSensitive: true,
          },
          {
            id: "max",
            placeholder: "maximum value",
            acceptedAnswers: ["3rem"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The CSS function that takes a min, preferred, and max is clamp().",
        "The maximum size should be 3rem.",
      ],
    },
    {
      id: "fluid-type-scale",
      type: "explanation",
      instruction: {
        heading: "Building a fluid type scale",
        body: "A type scale is a set of harmonious font sizes for your entire site — from small captions to large display headings. A fluid type scale uses clamp() for every level, creating smooth, proportional scaling across all screen sizes. Here's a practical scale you can use in real projects:\n\nThe key insight is that larger text should scale more aggressively than smaller text. A heading might go from 24px to 48px (doubling), while body text only goes from 16px to 20px (25% increase). This is because large text has more room to grow without looking awkward, and small text that changes too dramatically becomes hard to read. Line height should also be slightly responsive — tighter on larger screens where lines are wider, and looser on smaller screens for readability.",
        docLinks: [
          {
            label: "MDN: line-height",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/line-height",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Use CSS custom properties (variables) for your type scale so you can reference them throughout your stylesheet. Define them once on :root and use var(--font-size-lg) everywhere. If you need to adjust the scale later, you change one value instead of dozens.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          ":root {\n  /* Fluid type scale */\n  --text-xs:    clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);\n  --text-sm:    clamp(0.875rem, 0.8rem + 0.35vw, 1rem);\n  --text-base:  clamp(1rem, 0.9rem + 0.5vw, 1.125rem);\n  --text-lg:    clamp(1.125rem, 1rem + 0.75vw, 1.5rem);\n  --text-xl:    clamp(1.25rem, 1rem + 1.25vw, 2rem);\n  --text-2xl:   clamp(1.5rem, 1rem + 2vw, 2.5rem);\n  --text-3xl:   clamp(2rem, 1.5rem + 2.5vw, 3rem);\n  --text-4xl:   clamp(2.5rem, 1.5rem + 4vw, 4rem);\n}\n\nh1 { font-size: var(--text-4xl); }\nh2 { font-size: var(--text-3xl); }\nh3 { font-size: var(--text-2xl); }\np  { font-size: var(--text-base); }",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-type-scale",
      type: "free-edit",
      instruction: {
        heading: "Create a fluid type system",
        body: "Build a fluid type system using clamp(). Define font sizes for h1, h2, h3, and p that scale smoothly from mobile to desktop. Use rem for the minimum and maximum, and include vw in the preferred value. Also set appropriate line-height values.",
        docLinks: [
          {
            label: "MDN: clamp()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "For body text, keep the scaling range small (1rem to 1.25rem). For display headings, you can be more dramatic (2rem to 4rem). The bigger the text, the more room it has to scale without looking wrong.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* Build a fluid type system using clamp() */\n\nh1 {\n  font-size: 48px; /* Replace with clamp() */\n  line-height: 1.1;\n}\n\nh2 {\n  font-size: 36px; /* Replace with clamp() */\n  line-height: 1.2;\n}\n\nh3 {\n  font-size: 24px; /* Replace with clamp() */\n  line-height: 1.3;\n}\n\np {\n  font-size: 16px; /* Replace with clamp() */\n  line-height: 1.6;\n}",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "clamp" },
      },
      hints: [
        "Replace font-size: 48px with something like clamp(2rem, 4vw + 1rem, 3rem).",
        "Remember: clamp(minimum, preferred, maximum).",
        "The preferred value should include a vw unit for fluid scaling.",
      ],
    },
  ],
};
