import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-script-tag",
  slug: "script-tag",
  title: "The Script Tag",
  description:
    "Learn how the <script> tag connects JavaScript to your HTML page — and why where you place it matters more than you think.",
  order: 1,
  steps: [
    {
      id: "why-script-tag",
      type: "explanation",
      instruction: {
        heading: "Plugging JavaScript into HTML",
        body: "You've been writing JavaScript in the browser console, but real web pages need their JS code loaded automatically when the page opens. The `<script>` tag is how you connect JavaScript to an HTML document. Without it, your HTML page has no idea that any JavaScript exists. The browser reads your HTML file top-to-bottom, and when it encounters a `<script>` tag, it knows: 'Time to run some JavaScript.'",
        analogy:
          "The `<script>` tag is like plugging in a power cord — it connects your JavaScript brain to the HTML body. Where you plug it in matters: plug a lamp into a socket behind the couch and it works fine, but plug a refrigerator into a weak extension cord and you'll blow a fuse.",
        docLinks: [
          {
            label: "<script> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello!</h1>\n    <script>\n      console.log("JS is connected!");\n    </script>\n  </body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "inline-vs-external",
      type: "explanation",
      instruction: {
        heading: "Inline scripts vs. external files",
        body: "There are two ways to add JavaScript to a page. **Inline scripts** put the code directly between `<script>` and `</script>` tags — quick for small snippets. **External scripts** use the `src` attribute to load a separate `.js` file: `<script src=\"app.js\"></script>`. External files are the standard for real projects because they keep your HTML clean, let the browser cache the JS file (faster repeat visits), and let multiple pages share the same code.\n\nImportant rule: if a `<script>` tag has a `src` attribute, any code between the opening and closing tags is ignored. You cannot mix both.",
        analogy:
          "Inline scripts are like writing notes directly on a whiteboard — fast but messy for big ideas. External scripts are like printing a document and pinning it to the board — organized, reusable, and you can hand copies to other boards (pages).",
        docLinks: [
          {
            label: "Script: src attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/src",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If your `<script src=\"app.js\">` tag has code inside it too, that code will be silently ignored. Always use a separate `<script>` tag for inline code.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Inline script -->\n<script>\n  console.log("I am inline!");\n</script>\n\n<!-- External script -->\n<script src="app.js"></script>\n\n<!-- WRONG: code inside is IGNORED when src is present -->\n<script src="app.js">\n  console.log("I will never run!");\n</script>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "placement-matters",
      type: "explanation",
      instruction: {
        heading: "Why placement matters: the parsing problem",
        body: "The browser reads HTML from top to bottom. When it hits a `<script>` tag (without special attributes), it **stops parsing HTML**, downloads the script (if external), runs it, and only then continues building the page. If you put a script in the `<head>` that tries to find an element in the `<body>`, it will fail — that element doesn't exist yet!\n\nThis is why developers traditionally placed `<script>` tags at the very bottom of the `<body>`, right before `</body>`. By that point, all HTML elements are already built and available to JavaScript.",
        analogy:
          "Imagine reading a recipe and halfway through step 3 it says 'now stir the sauce from step 7.' You haven't made the sauce yet! That's what happens when a script in the `<head>` tries to access elements that the browser hasn't built yet.",
        docLinks: [
          {
            label: "Script loading strategies",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript#script_loading_strategies",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Problem: script runs before <h1> exists -->\n<head>\n  <script>\n    // This will be null! The <h1> hasn\'t been created yet.\n    const heading = document.querySelector("h1");\n    console.log(heading); // null\n  </script>\n</head>\n<body>\n  <h1>Hello!</h1>\n</body>\n\n<!-- Solution: script at bottom, after all elements -->\n<body>\n  <h1>Hello!</h1>\n  <script>\n    const heading = document.querySelector("h1");\n    console.log(heading.textContent); // "Hello!"\n  </script>\n</body>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "defer-async",
      type: "explanation",
      instruction: {
        heading: "defer and async: the modern solution",
        body: "Instead of moving scripts to the bottom, modern HTML uses two attributes that change when a script runs:\n\n**`defer`** — The browser downloads the script in the background while continuing to parse HTML. The script runs only after the entire HTML document is parsed. Multiple deferred scripts run in order. This is the go-to choice for most scripts.\n\n**`async`** — The browser downloads the script in the background, but runs it as soon as it finishes downloading — even if HTML parsing isn't complete. Multiple async scripts may run in any order. Use this only for independent scripts like analytics trackers.\n\n**`type=\"module\"`** — Module scripts are deferred by default. You get the benefits of `defer` automatically, plus modern import/export syntax.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Modern best practice is to use `<script defer>` in the `<head>` or `<script type=\"module\">` — both ensure HTML is parsed before JS runs. The `defer` and `async` attributes only work on external scripts (with a `src` attribute) — they have no effect on inline scripts.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Without `defer`, a script in the `<head>` blocks HTML parsing — the page appears blank until the script finishes loading! Always use `defer` for scripts in the `<head>` unless you have a specific reason not to.",
          },
        ],
        docLinks: [
          {
            label: "Script: defer attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/defer",
            type: "js-concept",
          },
          {
            label: "Script: async attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/async",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Best practice: defer in the head -->\n<head>\n  <script defer src="app.js"></script>\n</head>\n\n<!-- Also great: module scripts defer automatically -->\n<head>\n  <script type="module" src="app.js"></script>\n</head>\n\n<!-- async: for independent scripts only -->\n<head>\n  <script async src="analytics.js"></script>\n</head>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-script-tag",
      type: "gap-fill",
      instruction: {
        heading: "Check your understanding",
        body: "Fill in the blanks about how the `<script>` tag works.",
      },
      config: {
        type: "gap-fill",
        template:
          'To load an external JS file, use the {{attr}} attribute:\n<script {{attr}}="app.js"></script>\n\nTo ensure the HTML is fully parsed before the script runs,\nadd the {{loading}} attribute:\n<script {{loading}} src="app.js"></script>\n\nModule scripts are {{behavior}} by default.',
        gaps: [
          {
            id: "attr",
            placeholder: "attribute name",
            acceptedAnswers: ["src"],
            caseSensitive: true,
          },
          {
            id: "loading",
            placeholder: "loading strategy",
            acceptedAnswers: ["defer"],
            caseSensitive: true,
          },
          {
            id: "behavior",
            placeholder: "loading behavior",
            acceptedAnswers: ["deferred", "defer", "deferred automatically"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["attr", "loading", "behavior"],
        },
      },
      hints: [
        "The attribute that points to a file path is three letters long.",
        "The attribute that delays script execution until HTML is parsed rhymes with 'refer'.",
        "Module scripts behave as if they have the defer attribute.",
      ],
    },
  ],
};
