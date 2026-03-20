import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "course-overview-capstone",
  slug: "capstone",
  title: "Capstone: How a Web Page Comes Together",
  description:
    "Trace the full journey from typing a URL to seeing a finished page — combining every concept.",
  order: 7,
  steps: [
    {
      id: "the-full-journey",
      type: "explanation",
      instruction: {
        heading: "Let's trace the entire journey",
        body: "You now understand all the individual pieces: HTML, CSS, JavaScript, URLs, DNS, HTTP, browsers, clients, and servers. Let's put them all together by tracing exactly what happens when you type <code>https://en.wikipedia.org/wiki/HTML</code> into your browser and press Enter.\n\nThis is the complete picture of how the web works — from a single keystroke to a fully rendered page. Every website you have ever visited followed this exact sequence. Understanding this journey is the foundation everything else in web development builds on.",
        analogy:
          "Think of this like tracing a letter from the moment you drop it in a mailbox to the moment the recipient reads it. Every step involves different people and systems, but together they form one seamless experience. The web works the same way — dozens of systems working together so fast it feels instant.",
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "step-1-dns",
      type: "explanation",
      instruction: {
        heading: "Step 1: DNS resolves the domain name",
        body: "You typed <code>https://en.wikipedia.org/wiki/HTML</code> and pressed Enter. The first thing your browser needs to figure out is: where in the world is <code>en.wikipedia.org</code>?\n\nYour computer sends a DNS query: 'What is the IP address for en.wikipedia.org?' The DNS system responds with something like <code>208.80.154.224</code>. Now your browser knows the exact server to contact.\n\nThis lookup is cached (remembered) by your computer, so if you visit Wikipedia again soon, it skips this step.\n\n<strong>Concepts used</strong>: DNS, domain names, IP addresses",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "DNS resolution usually takes 20-100 milliseconds — fast enough that you never notice it. But if a DNS server is slow or unreachable, websites seem to take forever to load. This is why some people use faster public DNS servers like Google's (8.8.8.8) or Cloudflare's (1.1.1.1).",
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
      id: "step-2-http",
      type: "explanation",
      instruction: {
        heading: "Step 2: Browser sends an HTTP request",
        body: "Now that the browser knows the server's IP address, it establishes a secure connection (the HTTPS part) and sends an HTTP GET request:\n\n```\nGET /wiki/HTML HTTP/2\nHost: en.wikipedia.org\nAccept: text/html\n```\n\nThis request says: 'I want the resource at the path /wiki/HTML from the server en.wikipedia.org, and I expect an HTML document in return.'\n\nThe request travels from your computer through your router, through your internet provider, through undersea cables or satellites, across potentially thousands of miles, to reach Wikipedia's server in a data center. This physical journey takes about 30-200 milliseconds depending on distance.\n\n<strong>Concepts used</strong>: HTTP, URLs, client-server architecture, request-response cycle",
        docLinks: [
          {
            label: "MDN: HTTP request methods",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
            type: "html-concept",
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
      id: "step-3-response",
      type: "explanation",
      instruction: {
        heading: "Step 3: Server sends back HTML, CSS, and JS",
        body: "Wikipedia's server receives the request, finds (or generates) the HTML for the 'HTML' article, and sends back an HTTP response:\n\n```\nHTTP/2 200 OK\nContent-Type: text/html\n\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>HTML - Wikipedia</title>\n    <link rel=\"stylesheet\" href=\"/styles/main.css\">\n  </head>\n  <body>\n    <h1>HTML</h1>\n    <p>HyperText Markup Language (HTML) is the standard\n       markup language for documents designed to be\n       displayed in a web browser...</p>\n    ...\n    <script src=\"/scripts/app.js\"></script>\n  </body>\n</html>\n```\n\nThe status code <code>200</code> means 'OK — here is your page.' The response contains the full HTML document. Notice the HTML references a CSS file (<code>main.css</code>) and a JavaScript file (<code>app.js</code>) — the browser will need to fetch those separately.\n\n<strong>Concepts used</strong>: HTTP response, status codes, HTML document structure, the three languages of the web",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The Content-Type header tells the browser what kind of file it received. 'text/html' means an HTML document. 'text/css' means a stylesheet. 'application/javascript' means JavaScript. The browser uses this to know how to process each file.",
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
      id: "step-4-render",
      type: "explanation",
      instruction: {
        heading: "Step 4: Browser renders the page",
        body: "Now the browser has the HTML. Here is what happens next, in rapid sequence:\n\n<ol><li><strong>Parse HTML</strong>: The browser reads the HTML from top to bottom, building the DOM (Document Object Model) — a tree-like structure of all the elements on the page.</li>\n<li><strong>Fetch CSS</strong>: When it encounters <code>&lt;link rel=\"stylesheet\" href=\"/styles/main.css\"&gt;</code>, it sends another HTTP request to fetch the CSS file. While waiting, it continues parsing HTML.</li>\n<li><strong>Apply CSS</strong>: Once the CSS arrives, the browser matches selectors to DOM elements and calculates every element's color, size, position, font, spacing — everything visual.</li>\n<li><strong>Layout</strong>: The browser figures out where every element goes on the screen — how wide, how tall, what position — based on the CSS rules.</li>\n<li><strong>Paint</strong>: Finally, the browser draws pixels to your screen. The heading is large and bold, paragraphs are regular-sized, links are blue and underlined — all because of CSS rules applied to HTML elements.</li>\n<li><strong>Execute JavaScript</strong>: The browser runs any JavaScript, which can modify the page after it has been painted — adding interactive features like collapsible sections, search-as-you-type, or edit buttons.</li></ol>\n\nYou see the finished Wikipedia article. The entire process — from pressing Enter to seeing the page — took about 1-3 seconds.\n\n<strong>Concepts used</strong>: Browser rendering, HTML parsing, CSS application, JavaScript execution, the three layers working together",
        docLinks: [
          {
            label: "MDN: How browsers work",
            url: "https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work",
            type: "html-concept",
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
      id: "gap-fill-journey",
      type: "gap-fill",
      instruction: {
        heading: "Trace the journey yourself",
        body: "Fill in the blanks to complete the sequence of events when you visit a web page.",
      },
      config: {
        type: "gap-fill",
        template:
          "First, {{step1}} translates the domain name into an IP address.\nThen, the browser sends an HTTP {{step2}} to the server.\nThe server responds with a status code of {{step3}} if everything is OK.\nFinally, the {{step4}} parses the HTML and renders the page on screen.",
        gaps: [
          {
            id: "step1",
            placeholder: "system name",
            acceptedAnswers: ["DNS", "dns"],
            caseSensitive: false,
          },
          {
            id: "step2",
            placeholder: "request type",
            acceptedAnswers: ["request", "GET", "get", "GET request"],
            caseSensitive: false,
          },
          {
            id: "step3",
            placeholder: "status code",
            acceptedAnswers: ["200"],
            caseSensitive: false,
          },
          {
            id: "step4",
            placeholder: "program",
            acceptedAnswers: ["browser"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The system that converts domain names to IP addresses is ____ (three letters).",
        "The browser sends a ____ to the server asking for the page.",
        "The HTTP status code for success is a three-digit number starting with 2.",
        "The program on your computer that renders web pages is your web ____.",
      ],
    },
  ],
};
