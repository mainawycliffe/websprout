import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-intro-what-is-js",
  slug: "what-is-js",
  title: "What is JavaScript?",
  description:
    "Discover why JavaScript was created and what role it plays on every web page you visit.",
  order: 1,
  steps: [
    {
      id: "why-js-exists",
      type: "explanation",
      instruction: {
        heading: "The web was frozen in place",
        body: "In the early 1990s, web pages could only display text and images. Clicking a button required a full page reload from the server. There was no way to react instantly to what the user did — no dropdown menus, no form checking, no animations. Brendan Eich created JavaScript in 1995 at Netscape to solve this exact problem: give web pages the ability to respond to user actions right inside the browser, without waiting for the server.",
        analogy:
          "Think of a web page like a printed poster on a wall. HTML is the paper and ink — it gives the poster its structure and words. CSS is the color scheme and layout — it makes the poster look good. But a poster can't do anything when you touch it. JavaScript is what turns that poster into a touchscreen: now tapping, swiping, and typing actually make things happen.",
        docLinks: [
          {
            label: "JavaScript overview",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "JavaScript follows a standard called ECMAScript, maintained by an international committee (TC39). When you hear 'ES6' or 'ES2015,' that refers to the 6th edition of this standard — a major update that added features like `let`, `const`, arrow functions, and more. Every browser maker implements the same standard so your code works everywhere.",
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
      id: "js-in-the-real-world",
      type: "explanation",
      instruction: {
        heading: "JavaScript is everywhere you look",
        body: "Almost every interactive feature you use on the web is powered by JavaScript. When you type into Google's search bar and suggestions appear instantly — that's JavaScript listening to your keystrokes and fetching results without reloading the page. When you scroll through Instagram stories and they auto-advance — JavaScript is running a timer. When you pause a YouTube video or adjust the volume slider — JavaScript handles those controls. Even the 'Add to Cart' button on Amazon updates your cart count without a page reload, thanks to JavaScript running behind the scenes.",
        analogy:
          "If a website were a restaurant, HTML would be the menu (the content), CSS would be the interior design (how it looks), and JavaScript would be the waitstaff — taking your order, bringing your food, responding to your requests in real time.",
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "js-runs-in-browser",
      type: "explanation",
      instruction: {
        heading: "JavaScript runs right inside your browser",
        body: "Every modern browser — Chrome, Firefox, Safari, Edge — has a built-in JavaScript engine that reads and executes JS code. Chrome uses an engine called V8, Firefox uses SpiderMonkey, and Safari uses JavaScriptCore. When a web page loads, the browser downloads the HTML, CSS, and JavaScript files, then the JS engine runs the code line by line. This means JavaScript executes on the user's computer, not on a distant server — which is why interactions feel instant.",
        analogy:
          "The JavaScript engine is like a translator who lives inside your browser. When a website sends JavaScript code, the translator reads it and immediately carries out the instructions — no need to call headquarters and wait for a response.",
        docLinks: [
          {
            label: "What is JavaScript?",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "JavaScript is the only programming language that browsers understand natively. Other languages (like Python or Java) cannot run directly in the browser. This is why JavaScript became so dominant on the web — if you want client-side interactivity, JavaScript is it.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: 'alert("Hello!");',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "check-understanding",
      type: "gap-fill",
      instruction: {
        heading: "Check your understanding",
        body: "Fill in the blanks to confirm what you've learned about JavaScript's role on the web.",
      },
      config: {
        type: "gap-fill",
        template:
          'JavaScript adds {{role}} to web pages.\n\nJS runs in the {{environment}}.',
        gaps: [
          {
            id: "role",
            placeholder: "what JS adds",
            acceptedAnswers: ["behavior", "interactivity"],
            caseSensitive: false,
          },
          {
            id: "environment",
            placeholder: "where JS runs",
            acceptedAnswers: ["browser"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["role", "environment"],
        },
      },
      hints: [
        "Think about the poster analogy — what does JavaScript add that HTML and CSS can't?",
        "JavaScript doesn't run on a server for web pages — it runs somewhere on your computer.",
      ],
    },
  ],
};
