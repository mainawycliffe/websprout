import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-selectors",
  slug: "selectors",
  title: "CSS Selectors",
  description: "Target specific elements with element, class, and ID selectors.",
  order: 8,
  steps: [
    {
      id: "element-selector",
      type: "explanation",
      instruction: {
        heading: "Element selectors",
        body: "The simplest selector is just the tag name: p, h1, div. It targets ALL elements of that type on the page. This is useful for setting baseline styles — for example, most websites set a default font and color on the body or p selector so all text looks consistent without styling each paragraph individually.",
        analogy: 'It\'s like a school uniform — one rule that applies to everyone. When a website sets p { font-size: 16px; }, every paragraph on the site gets the same readable size, just like every student wears the same uniform.',
        docLinks: [
          { label: "Type selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors", type: "css-selector" },
        ],
      },
      config: {
        type: "explanation",
        demoCode: "/* Targets every paragraph */\np {\n  color: green;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "class-selector",
      type: "explanation",
      instruction: {
        heading: "Class selectors: target a group",
        body: 'A class selector starts with a DOT (.). Classes exist because you often want to style some elements differently from others of the same type. On a shopping site, regular product cards and "featured" product cards are both <div>s, but the featured ones need a different look. Adding class="featured" lets CSS target just those cards. In CSS, .featured targets all elements with that class.',
        analogy: 'Think of wristbands at a concert — general admission gets one color, VIP gets another. The wristband (class) determines what access (styles) you get, and multiple people can wear the same wristband color.',
        infoBoxes: [
          {
            variant: "standard",
            body: "Class names can be shared by many elements. This is the primary mechanism for reusable styles — define a style once, apply it anywhere with class=\"...\".",
          },
        ],
        docLinks: [
          { label: "Class selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors", type: "css-selector" },
          { label: "class attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class", type: "html-attribute" },
        ],
      },
      config: {
        type: "explanation",
        demoCode: '/* HTML: <p class="highlight">Important!</p> */\n\n.highlight {\n  background-color: yellow;\n  font-weight: bold;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fill-class",
      type: "gap-fill",
      instruction: {
        heading: "Use a class selector",
        body: 'Fill in the CSS selector to target elements with class="special".',
      },
      config: {
        type: "gap-fill",
        template: "{{selector}} {\n  color: purple;\n  font-size: 24px;\n}",
        gaps: [
          { id: "selector", placeholder: "class selector", acceptedAnswers: [".special"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Class selectors start with a dot (.)",
        "The answer is .special",
      ],
    },
    {
      id: "id-selector",
      type: "explanation",
      instruction: {
        heading: "ID selectors: target one specific element",
        body: 'An ID selector starts with a HASH (#). IDs exist for elements that are truly one-of-a-kind on a page — like the site logo, the main navigation, or a checkout button. On YouTube, the video player has a unique ID so JavaScript can control that specific element. In CSS, #main-title targets the one element with id="main-title".',
        analogy: "An ID is like a Social Security number — unique to one person. A class is like a job title — many people can share it.",
        infoBoxes: [
          {
            variant: "standard",
            body: "IDs must be unique per page — the HTML spec requires that no two elements share the same id. Browsers use this for fast lookups, and #id links in URLs jump to that element.",
          },
        ],
        docLinks: [
          { label: "ID selectors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors", type: "css-selector" },
          { label: "id attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id", type: "html-attribute" },
        ],
      },
      config: {
        type: "explanation",
        demoCode: '/* HTML: <h1 id="main-title">Welcome</h1> */\n\n#main-title {\n  color: navy;\n  text-align: center;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "write-selectors",
      type: "free-edit",
      instruction: {
        heading: "Practice all three selectors",
        body: "Write three CSS rules: one element selector (for baseline styles), one class selector (for reusable group styles), and one ID selector (for a unique element). This combination is how real websites are styled — broad rules first, specific overrides next.",
        infoBoxes: [
          {
            variant: "tip",
            body: "Prefer classes over IDs for styling. IDs have very high specificity, making them hard to override later. Save IDs for JavaScript targeting and anchor links.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: "/* Element selector */\n\n/* Class selector */\n\n/* ID selector */\n",
        language: "css",
      },
      validation: { type: "contains-css", criteria: { selector: "." } },
      hints: [
        "For element: just use the tag name like p { }",
        "For class: start with a dot like .myclass { }",
        "For ID: start with # like #myid { }",
      ],
    },
  ],
};
