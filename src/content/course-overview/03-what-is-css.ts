import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "course-overview-what-is-css",
  slug: "what-is-css",
  title: "What is CSS?",
  description:
    "Learn how CSS transforms plain HTML into beautiful, styled web pages.",
  order: 3,
  steps: [
    {
      id: "why-css-exists",
      type: "explanation",
      instruction: {
        heading: "Why does CSS exist?",
        body: "In the early days of the web (early 1990s), there was no CSS. If you wanted colored text, you had to put style instructions directly inside your HTML tags. Every single heading, every paragraph, every link had style information mixed in with the content. Imagine writing an essay where every sentence also included instructions about its font and color — it would be unreadable.\n\nCSS was created in 1996 to solve this problem. It separates <em>what the content is</em> (HTML) from <em>how it looks</em> (CSS). This separation is one of the most important ideas in web development, called <strong>separation of concerns</strong>.\n\nWith CSS, you write your styles in one place and they apply across your entire website. Want to change every heading on your 500-page site from blue to red? With CSS, you change one line. Without CSS, you would have to edit all 500 pages.",
        analogy:
          "Think of CSS like a dress code at a school. The students (HTML elements) are the content — they exist regardless of what they wear. The dress code (CSS) tells everyone how to look: 'shirts must be white, pants must be navy, shoes must be black.' Change the dress code, and everyone's appearance changes at once — you do not have to visit each student individually.",
        docLinks: [
          {
            label: "MDN: CSS",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            type: "css-concept",
          },
          {
            label: "MDN: What is CSS?",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/What_is_CSS",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The 'Cascading' in CSS refers to how styles are applied when there are conflicts. If two rules try to set the color of the same element, CSS has a precise set of rules for which one wins. You will learn about this cascade later in the course.",
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
      id: "how-css-works",
      type: "explanation",
      instruction: {
        heading: "How CSS works: selectors, properties, and values",
        body: "A CSS rule has three parts:\n\n<ol><li><strong>Selector</strong> — picks which HTML elements to style. For example, <code>h1</code> selects all headings, <code>p</code> selects all paragraphs.</li>\n<li><strong>Property</strong> — what aspect you want to change. For example, <code>color</code> changes text color, <code>font-size</code> changes text size.</li>\n<li><strong>Value</strong> — what you want to set it to. For example, <code>red</code>, <code>20px</code>, <code>bold</code>.</li></ol>\n\nA CSS rule looks like this:\n```\nh1 {\n  color: blue;\n  font-size: 32px;\n}\n```\n\nThis rule says: 'Find every <h1> element, make its text blue, and set its font size to 32 pixels.' The selector is <code>h1</code>, the properties are <code>color</code> and <code>font-size</code>, and the values are <code>blue</code> and <code>32px</code>.\n\nYou can think of CSS as giving instructions to a painter: 'For all the headings (selector), paint the text (property) blue (value).'",
        analogy:
          "CSS works like a paint-by-numbers kit. The numbers on the canvas are the selectors (they identify which areas to paint). The legend tells you which color each number gets (property: value). You do not paint each section individually — the legend applies to every section with that number.",
        docLinks: [
          {
            label: "MDN: CSS selectors",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors",
            type: "css-selector",
          },
          {
            label: "MDN: CSS properties reference",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference",
            type: "css-property",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  h1 { color: blue; font-size: 32px; }\n  p { color: gray; line-height: 1.6; }\n</style>\n\n<h1>Styled Heading</h1>\n<p>This paragraph has gray text and comfortable line spacing.</p>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "css-real-world",
      type: "explanation",
      instruction: {
        heading: "CSS in the real world",
        body: "CSS is responsible for everything visual on the web:\n\n<ul><li><strong>Wikipedia</strong> uses CSS to create its clean, readable layout — the content column width, the sans-serif font, the blue link color, and the table-of-contents sidebar are all CSS.</li>\n<li><strong>YouTube's dark mode</strong> is just CSS changing background colors from white to dark gray and text from black to white. The HTML content stays exactly the same.</li>\n<li><strong>Instagram's grid layout</strong> — where photos appear in rows of three on your profile — is CSS Grid or Flexbox (layout tools you will learn later). The photos are HTML; how they are arranged is CSS.</li>\n<li><strong>Responsive design</strong> — when a website rearranges itself to look good on your phone vs. your laptop — is CSS detecting the screen size and applying different rules.</li></ul>\n\nModern CSS is incredibly powerful. It can create animations, 3D effects, complex layouts, and even some interactive features — all without JavaScript.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Try this experiment: on any webpage, press F12 to open DevTools, go to the Elements panel, and uncheck some CSS rules. You will see the page's appearance change instantly — but the content remains the same. This proves the separation between HTML (content) and CSS (style).",
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
      id: "gap-fill-css",
      type: "gap-fill",
      instruction: {
        heading: "Check your understanding",
        body: "Fill in the blanks about CSS fundamentals.",
      },
      config: {
        type: "gap-fill",
        template:
          "CSS stands for Cascading Style {{word}}.\nA CSS rule starts with a {{part}} that picks which elements to style.\nCSS was created to separate content from {{concern}}.",
        gaps: [
          {
            id: "word",
            placeholder: "last word of CSS",
            acceptedAnswers: ["Sheets", "sheets"],
            caseSensitive: false,
          },
          {
            id: "part",
            placeholder: "CSS concept",
            acceptedAnswers: ["selector"],
            caseSensitive: false,
          },
          {
            id: "concern",
            placeholder: "what CSS handles",
            acceptedAnswers: [
              "style",
              "styling",
              "appearance",
              "presentation",
            ],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "CSS is an abbreviation for three words: Cascading Style ____.",
        "The first part of a CSS rule picks elements — it is called a ____.",
        "CSS separates content from how things look — another word for visual appearance.",
      ],
    },
    {
      id: "free-edit-css",
      type: "free-edit",
      instruction: {
        heading: "Try adding some CSS",
        body: "Below is an HTML heading and paragraph with a <style> block. Try changing the color value from 'blue' to another color like 'red', 'green', or 'purple'. Then try changing the font-size value. Watch the preview update as you experiment.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "CSS color names include common words like red, blue, green, purple, orange, gray, and many more. You can also use hex codes like #FF5733, but we will cover that later.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  h1 {\n    color: blue;\n    font-size: 28px;\n  }\n</style>\n\n<h1>My Styled Heading</h1>\n<p>Try changing the CSS above!</p>',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "style|h1" } },
      hints: [
        "Change the word 'blue' to another color name like 'red' or 'green'.",
        "Try changing 28px to a bigger number like 48px.",
      ],
    },
  ],
};
