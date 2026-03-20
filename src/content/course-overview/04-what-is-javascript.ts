import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "course-overview-what-is-javascript",
  slug: "what-is-javascript",
  title: "What is JavaScript?",
  description:
    "Understand how JavaScript brings web pages to life with interactivity and dynamic behavior.",
  order: 4,
  steps: [
    {
      id: "why-js-exists",
      type: "explanation",
      instruction: {
        heading: "Why does JavaScript exist?",
        body: "In 1995, web pages were static documents — like printed posters pinned to a wall. You could read them, click links to go to other pages, but that was it. There was no way for the page to respond to you.\n\nNetscape (the most popular browser at the time) hired Brendan Eich to create a programming language that could run inside the browser. In just 10 days, he created JavaScript. The goal was simple: let web pages react to what users do.\n\nJavaScript is the <strong>behavior layer</strong> of the web. While HTML provides structure and CSS provides style, JavaScript provides interactivity. It can:\n\n<ul><li>Respond to clicks, key presses, and mouse movements</li>\n<li>Show and hide content without reloading the page</li>\n<li>Validate forms before submission (is that a real email address?)</li>\n<li>Fetch new data from a server in the background</li>\n<li>Create animations, games, and complex applications</li></ul>\n\nToday, JavaScript is the most widely used programming language in the world. Every major website — Google Maps, Gmail, Netflix, Spotify's web player — depends on it heavily.",
        analogy:
          "If a website were a car, HTML would be the body and frame (the structure), CSS would be the paint job and interior design (the appearance), and JavaScript would be the engine and electronics (what makes it actually <em>do</em> things when you press the gas pedal or turn the steering wheel).",
        docLinks: [
          {
            label: "MDN: JavaScript",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            type: "html-concept",
          },
          {
            label: "MDN: What is JavaScript?",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Despite the name, JavaScript has nothing to do with the Java programming language. It was named 'JavaScript' as a marketing decision because Java was popular in 1995. The official name of the language standard is ECMAScript (maintained by Ecma International).",
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
      id: "what-js-does",
      type: "explanation",
      instruction: {
        heading: "What JavaScript does on real websites",
        body: "Let's look at specific examples of JavaScript in action:\n\n<ul><li><strong>Google Search autocomplete</strong>: As you type in the search box, JavaScript listens to each keystroke, sends what you typed to Google's servers, receives suggestions, and displays them — all without reloading the page.</li>\n<li><strong>Instagram Stories</strong>: When you tap to move to the next story, JavaScript detects the tap, hides the current story, and shows the next one. The progress bar at the top is JavaScript counting time and updating the bar width.</li>\n<li><strong>Amazon 'Add to Cart'</strong>: When you click 'Add to Cart,' JavaScript intercepts the click, sends the item info to the server, updates the cart count in the header, and shows a confirmation — all without leaving the product page.</li>\n<li><strong>YouTube video player</strong>: Play, pause, skip, volume, fullscreen, quality settings, subtitles, playback speed — the entire video player interface is controlled by JavaScript.</li></ul>\n\nJavaScript is event-driven: it waits for something to happen (a click, a scroll, a timer, data arriving from a server) and then runs code in response.",
        analogy:
          "JavaScript is like a waiter at a restaurant. The waiter does not do anything until you signal them (an event). When you raise your hand (a click), the waiter comes over, takes your order (reads data), goes to the kitchen (processes it), and brings back your food (updates the page). Without the waiter, the food exists (HTML) and the restaurant looks nice (CSS), but nothing happens when you sit down.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "This course focuses on HTML and CSS first. JavaScript is introduced here so you understand the complete picture, but you will not write JavaScript in this course. Master the structure and style first — interactivity builds on top of that foundation.",
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
      id: "js-in-html",
      type: "explanation",
      instruction: {
        heading: "How JavaScript connects to HTML",
        body: "JavaScript code is added to an HTML page using the <script> tag, just like CSS uses the <style> tag. Here is the simplest example:\n\n```\n<script>\n  alert('Hello, World!');\n</script>\n```\n\nThis tells the browser: 'Run this JavaScript code.' The <code>alert()</code> function shows a pop-up dialog box with the message.\n\nIn real websites, JavaScript usually lives in separate .js files (just like CSS lives in .css files) and is linked from the HTML:\n\n```\n<script src=\"app.js\"></script>\n```\n\nThis separation keeps things organized — HTML for structure, CSS for style, JavaScript for behavior, each in their own file.\n\nBelow is a demo showing HTML with a button. In a full browser, clicking the button would trigger JavaScript to change the heading text. For now, just notice how the <script> tag sits alongside the HTML.",
        docLinks: [
          {
            label: "MDN: <script> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The <script> tag should be placed at the end of the <body>, or use the 'defer' attribute. This ensures the HTML is fully loaded before JavaScript tries to interact with it. Running JavaScript before the page loads is a common source of bugs.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<h1 id="greeting">Hello!</h1>\n<button onclick="document.getElementById(\'greeting\').textContent = \'You clicked the button!\'">Click Me</button>\n\n<!-- In a real page, JavaScript would make\n     the button actually work -->\n<script>\n  // JavaScript code goes here\n  console.log("Page loaded!");\n</script>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-js",
      type: "gap-fill",
      instruction: {
        heading: "Check your understanding",
        body: "Fill in the blanks about JavaScript.",
      },
      config: {
        type: "gap-fill",
        template:
          "JavaScript adds {{role}} to web pages.\nJavaScript code is included in HTML using the <{{tag}}> tag.\nJavaScript is {{driven}} — it waits for something to happen, then responds.",
        gaps: [
          {
            id: "role",
            placeholder: "what JS provides",
            acceptedAnswers: [
              "interactivity",
              "behavior",
              "interaction",
              "interactive behavior",
            ],
            caseSensitive: false,
          },
          {
            id: "tag",
            placeholder: "HTML tag name",
            acceptedAnswers: ["script"],
            caseSensitive: false,
          },
          {
            id: "driven",
            placeholder: "programming model",
            acceptedAnswers: ["event-driven", "event driven"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "JavaScript lets users interact with the page — it adds ____.",
        "Just like CSS uses <style>, JavaScript uses <____>.",
        "JavaScript waits for events (clicks, key presses) — this model is called ____-driven.",
      ],
    },
  ],
};
