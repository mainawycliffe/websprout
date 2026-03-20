import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-viewport-meta",
  slug: "viewport-meta",
  title: "The Viewport Meta Tag",
  description:
    "Learn why mobile browsers zoom out by default and how the viewport meta tag fixes it.",
  order: 2,
  steps: [
    {
      id: "the-zoom-out-problem",
      type: "explanation",
      instruction: {
        heading: "Why mobile browsers zoom out your page",
        body: "When smartphones first appeared, most websites were designed for desktop screens — typically around 960px wide. Mobile browsers had a clever workaround: they pretended the screen was 980px wide (even though the phone was only 320px), rendered the page at that width, and then zoomed it out to fit the tiny screen. The result? You could see the whole page, but everything was microscopic. Text was unreadable without pinch-to-zoom. Buttons were impossible to tap. It was like looking at a poster through the wrong end of a telescope. This is still what happens today if you create an HTML page without a viewport meta tag. The browser assumes your page was designed for a 980px desktop and shrinks everything to fit. The viewport meta tag tells the browser: \"Stop pretending. Use the actual screen width.\" It's a single line of HTML that transforms the mobile experience from unusable to properly sized.",
        analogy:
          "Imagine you have a large wall map. If you try to display it on a small tablet, one approach is to shrink the entire map until it fits — but then you can't read any of the text. The better approach is to show just the section of the map that fits the screen at full size, and let the user scroll to see more. The viewport meta tag tells the browser to take the second approach: show content at real size, sized to the actual screen width.",
        docLinks: [
          {
            label: "MDN: Viewport meta tag",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The viewport meta tag was invented by Apple for the original iPhone in 2007. It was so useful that every other mobile browser adopted it. While it's not part of a formal W3C specification, it is a de facto web standard supported by every modern browser. The CSS specification later introduced @viewport, but it was never widely implemented and was eventually abandoned in favor of the meta tag approach.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Without this tag, mobile browsers assume a 980px-wide page -->\n<!-- and shrink everything to fit the small screen -->\n\n<!-- With this tag, the browser uses the real device width -->\n<meta name="viewport" content="width=device-width, initial-scale=1">',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "anatomy-of-viewport",
      type: "explanation",
      instruction: {
        heading: "Breaking down the viewport meta tag",
        body: "The viewport meta tag has two key parts in its content attribute:\n\n<ol><li>width=device-width — This tells the browser to set the viewport width to the actual width of the device's screen. On an iPhone 14, that's 390 CSS pixels. On a Samsung Galaxy S24, it's 412 CSS pixels. Without this, the browser defaults to a virtual 980px viewport and scales everything down.</li><li>initial-scale=1 — This sets the initial zoom level to 100% (no zoom). Without it, some browsers might start zoomed in or out, creating an inconsistent experience.</li></ol>\n\nYou might also see other properties like maximum-scale=1 or user-scalable=no — these restrict pinch-to-zoom. Avoid using them! They break accessibility for users who need to zoom in to read content. The web accessibility guidelines (WCAG) explicitly recommend allowing users to zoom to at least 200%.\n\nEvery HTML page you create should include this tag in the <head>. It's as essential as <!DOCTYPE html>. If you open any modern website — Google, YouTube, Instagram, Amazon — and view its source code, you'll find this exact meta tag.",
        docLinks: [
          {
            label: "MDN: Viewport meta tag",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag",
            type: "html-element",
          },
          {
            label: "MDN: <meta> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Never use user-scalable=no or maximum-scale=1 in your viewport meta tag. These prevent users from zooming in, which violates WCAG 2.1 Success Criterion 1.4.4 (Resize Text). Users with low vision depend on pinch-to-zoom. Many app stores and accessibility audits flag this as a failure.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "CSS pixels and device (hardware) pixels are different. A modern phone might have a 1170-pixel-wide screen but report a CSS width of 390px — that's a 3x device pixel ratio. The viewport meta tag works with CSS pixels, not hardware pixels. This is why text and buttons appear at a readable size on high-resolution screens.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- The essential viewport meta tag -->\n<meta name="viewport" content="width=device-width, initial-scale=1">\n\n<!-- AVOID these — they break accessibility -->\n<!-- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> -->\n<!-- <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"> -->',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "write-viewport-tag",
      type: "gap-fill",
      instruction: {
        heading: "Write the viewport meta tag",
        body: "Complete the viewport meta tag so the browser uses the device's real screen width and starts at 100% zoom.",
      },
      config: {
        type: "gap-fill",
        template:
          '<meta name="viewport" content="width={{width_val}}, initial-scale={{scale_val}}">',
        gaps: [
          {
            id: "width_val",
            placeholder: "width value",
            acceptedAnswers: ["device-width"],
            caseSensitive: true,
          },
          {
            id: "scale_val",
            placeholder: "scale value",
            acceptedAnswers: ["1"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The width should match the device's actual screen width.",
        "The initial scale of 1 means 100% zoom — no zoom in or out.",
      ],
    },
    {
      id: "full-head-section",
      type: "free-edit",
      instruction: {
        heading: "Write a complete responsive <head>",
        body: "Write a complete <head> section for a responsive web page. Include the charset meta tag, the viewport meta tag, a title, and a link to a stylesheet. This is the boilerplate you'll use for every responsive page you build.",
        docLinks: [
          {
            label: "MDN: <head> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The order inside <head> matters slightly: put <meta charset=\"UTF-8\"> first so the browser knows the encoding before reading anything else. The viewport meta tag should come early too. Title and stylesheet links can come after.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: "<head>\n  <!-- Add charset, viewport, title, and stylesheet link -->\n\n</head>",
        language: "html",
      },
      validation: {
        type: "contains-tag",
        criteria: { tag: "meta" },
      },
      hints: [
        "Start with <meta charset=\"UTF-8\">",
        "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
        "Don't forget a <title> and a <link rel=\"stylesheet\" href=\"style.css\">",
      ],
    },
  ],
};
