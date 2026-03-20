import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-why-fetching",
  slug: "why-fetching",
  title: "Why Data Fetching Matters",
  description:
    "Understand why websites need to fetch data from servers — and how the web evolved from static pages to dynamic, real-time experiences.",
  order: 1,
  steps: [
    {
      id: "static-vs-dynamic",
      type: "explanation",
      instruction: {
        heading: "Static Pages vs. Dynamic Data",
        body: `<p>Think about the websites you use every day. When you open <strong>Instagram</strong>, your feed is different from anyone else's — and it updates every time you pull to refresh. When you search on <strong>Google</strong>, the results are generated on the fly based on what you typed. When you check <strong>Amazon</strong>, the prices and availability can change from minute to minute.</p>

<p>None of this content is baked into the HTML file that your browser downloads. The HTML is just a <em>shell</em> — a skeleton that says "put the feed here, put the search results there." The actual data (posts, search results, product listings) comes from <strong>servers</strong> via separate requests that happen <em>after</em> the page loads.</p>

<p>This is the fundamental difference between <strong>static</strong> and <strong>dynamic</strong> websites. A static site delivers the same content to everyone — like a printed brochure. A dynamic site fetches fresh data and assembles the page in real time. Almost every modern website you use is dynamic, and <strong>data fetching</strong> is how it works.</p>`,
        analogy:
          "A static website is like a <strong>printed textbook</strong> — the content was decided at print time and never changes. A dynamic website is like a <strong>live news ticker</strong> — it constantly reaches out for the latest information and updates what you see.",
        docLinks: [
          {
            label: "Fetching data from the server",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Network_requests",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The Fetch API is the modern, standards-based way to make HTTP requests from JavaScript. It is supported in all modern browsers and is part of the WHATWG specification.",
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
      id: "request-response",
      type: "explanation",
      instruction: {
        heading: "The Browser-Server Conversation",
        body: `<p>Every time your browser needs data, it has a <strong>conversation</strong> with a server. This conversation follows a strict protocol called <strong>HTTP</strong> (HyperText Transfer Protocol). You've already seen this in action — when you type a URL, your browser sends an HTTP <strong>request</strong>, and the server sends back a <strong>response</strong> containing the HTML page.</p>

<p>Data fetching works exactly the same way, but instead of asking for an entire HTML page, your JavaScript code asks for just the <em>data</em> it needs. The server responds — usually with <strong>JSON</strong> (which we'll learn about next lesson) — and your JavaScript takes that data and updates the page.</p>

<p>This request-response pattern is the backbone of the web. If you worked through the Forms module, you've already seen the browser send data to a server when a form is submitted. Data fetching is the other direction — your JavaScript <em>asking</em> the server for data and doing something with the answer.</p>`,
        analogy:
          "It's like calling a restaurant to ask about tonight's specials. You (the browser) pick up the phone and make a <strong>request</strong>: 'What's on the menu?' The restaurant (the server) gives a <strong>response</strong>: 'We have pasta, steak, and salmon.' You then decide what to do with that information.",
        docLinks: [
          {
            label: "HTTP overview",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// The conversation in code:\n// 1. Browser sends a REQUEST\nfetch("https://api.example.com/users")\n\n// 2. Server sends back a RESPONSE\n//    containing data (usually JSON)\n//    { "users": [{ "name": "Alice" }, ...] }\n\n// 3. JavaScript uses the data\n//    to update the page`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "old-vs-new",
      type: "explanation",
      instruction: {
        heading: "From Page Reloads to Background Fetching",
        body: `<p>In the early web (the 1990s and early 2000s), every time you needed new data, the <strong>entire page reloaded</strong>. Click a link? Full reload. Submit a search? Full reload. The screen would flash white, the browser would download a brand new HTML page, and everything would re-render from scratch. It worked, but it was slow and jarring.</p>

<p>Then in the mid-2000s, a technique called <strong>AJAX</strong> (Asynchronous JavaScript and XML) changed everything. It let JavaScript fetch data from a server <em>in the background</em> without reloading the page. Google Maps was one of the first big sites to use this — you could drag the map and new tiles would load seamlessly. Gmail loaded new emails without refreshing. This was revolutionary.</p>

<p>The original tool for AJAX was <code>XMLHttpRequest</code> — a powerful but awkward API with lots of boilerplate code. In 2015, browsers introduced the <strong>Fetch API</strong>: a cleaner, Promise-based replacement. Today, <code>fetch()</code> is the standard way to make HTTP requests from JavaScript. It's simpler, more readable, and works beautifully with modern <code>async/await</code> syntax that we'll learn in this module.</p>`,
        docLinks: [
          {
            label: "Fetch API",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
            type: "js-concept",
          },
          {
            label: "XMLHttpRequest (legacy)",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "You may see <code>XMLHttpRequest</code> (XHR) in older tutorials and legacy codebases. For all new code, use the <code>fetch()</code> API instead. It is the modern standard and much easier to work with.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// OLD WAY: XMLHttpRequest (verbose and confusing)\nconst xhr = new XMLHttpRequest();\nxhr.open("GET", "/api/users");\nxhr.onload = function() {\n  const data = JSON.parse(xhr.responseText);\n  console.log(data);\n};\nxhr.send();\n\n// NEW WAY: Fetch API (clean and modern)\nconst response = await fetch("/api/users");\nconst data = await response.json();\nconsole.log(data);`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "module-overview",
      type: "explanation",
      instruction: {
        heading: "What You'll Learn in This Module",
        body: `<p>This module will take you from zero to confidently fetching, sending, and displaying data from real APIs. Here's the roadmap:</p>

<ol>
  <li><strong>JSON</strong> — The universal data format that APIs use to send and receive information.</li>
  <li><strong>Promises</strong> — How JavaScript handles operations that take time (like waiting for a server response).</li>
  <li><strong>Async/Await</strong> — A cleaner way to write Promise-based code that reads like normal, step-by-step instructions.</li>
  <li><strong>Your First Fetch</strong> — Making real HTTP requests to live APIs and getting data back.</li>
  <li><strong>The Response Object</strong> — Understanding HTTP status codes and response metadata.</li>
  <li><strong>Error Handling</strong> — Gracefully dealing with network failures and server errors.</li>
  <li><strong>Displaying Data</strong> — Taking fetched data and rendering it into the DOM.</li>
  <li><strong>POST Requests</strong> — Sending data to a server (creating, updating, deleting).</li>
  <li><strong>Loading States</strong> — Giving users feedback while data is being fetched.</li>
</ol>

<p>By the end, you'll build a <strong>Pokemon Explorer</strong> and a <strong>Weather Dashboard</strong> — real projects that combine everything you've learned. Let's start with the language that servers use to talk: JSON.</p>`,
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
