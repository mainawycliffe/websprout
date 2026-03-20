import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "course-overview-client-server",
  slug: "client-server",
  title: "Client-Server Architecture",
  description:
    "Learn how the request-response cycle works — the fundamental pattern behind every web interaction.",
  order: 6,
  steps: [
    {
      id: "what-are-clients-servers",
      type: "explanation",
      instruction: {
        heading: "What are clients and servers?",
        body: "The web runs on a simple idea: one computer asks for something, and another computer provides it.\n\n<strong>Client</strong>: The program asking for data — usually your web browser (Chrome, Firefox, Safari). Your phone's browser, a mobile app, even a smart TV's Netflix app are all clients.\n\n<strong>Server</strong>: A computer that stores website files (HTML, CSS, JS, images) and sends them to clients when asked. Servers run 24/7, waiting for requests. Companies like Google, Amazon, and Netflix run thousands of servers in huge buildings called data centers.\n\nThis arrangement is called <strong>client-server architecture</strong>, and it is the foundation of the web. Every time you visit a website, watch a video, or check your email, the same pattern plays out: your client sends a request, a server sends a response.\n\nWhy not just have everything on your own computer? Because the web needs shared, centralized data. When you post a photo on Instagram, it goes to Instagram's servers so that your friends' clients can fetch it. If it only lived on your phone, nobody else could see it.",
        analogy:
          "Think of a restaurant. You (the client) sit at a table and place an order (send a request). The kitchen (the server) receives your order, prepares the food, and sends it out to you (the response). You do not go into the kitchen yourself — you communicate through a structured system (the waiter, which is like HTTP).",
        docLinks: [
          {
            label: "MDN: Client-server overview",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "A single computer can be both a client and a server. When a web developer runs a 'local server' on their laptop for testing, their browser (client) talks to a server program running on the same machine. This is how developers test websites before publishing them.",
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
        heading: "The request-response cycle",
        body: "Every web interaction follows the same pattern — the <strong>request-response cycle</strong>:\n\n<strong>1. You type a URL</strong> (or click a link)\nYour browser prepares an HTTP request.\n\n<strong>2. DNS lookup</strong>\nThe browser asks DNS to translate the domain name into an IP address.\n\n<strong>3. Browser sends the request</strong>\nThe HTTP request travels across the internet to the server at that IP address. The request says: 'Please give me the file at /index.html' (a GET request).\n\n<strong>4. Server processes the request</strong>\nThe server finds the requested file (or generates it dynamically) and prepares a response.\n\n<strong>5. Server sends the response</strong>\nThe response travels back across the internet to your browser. It contains the HTML file and a status code (like 200 for success).\n\n<strong>6. Browser renders the page</strong>\nThe browser reads the HTML, discovers linked CSS and JS files, makes additional requests for those, and finally paints the page on your screen.\n\nThis entire cycle typically takes less than 2 seconds. For a single web page, your browser might make 20-100 separate requests (HTML, CSS, JS, images, fonts) — all following this same pattern.",
        analogy:
          "The request-response cycle is like ordering from a catalog. You fill out an order form (the request) and mail it to the company (the server). The company finds your items in the warehouse, packs them up (the response), and ships them back to you. When the package arrives, you unpack and enjoy it (the browser renders the page).",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "You can see every request your browser makes. Open DevTools (F12), go to the Network tab, and reload a page. You will see dozens of requests — each one is a separate trip to a server. Click any request to see its full details: the URL, status code, response headers, and content.",
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
      id: "static-vs-dynamic",
      type: "explanation",
      instruction: {
        heading: "Static vs. dynamic websites",
        body: "Not all servers work the same way. There are two main approaches:\n\n<strong>Static websites</strong>: The server stores pre-made HTML, CSS, and JS files and simply hands them to the browser as-is. Think of a restaurant with a fixed menu — every customer gets the same options. A personal portfolio site or a documentation site is often static.\n\n<strong>Dynamic websites</strong>: The server generates HTML on the fly based on who is asking, what they want, and what data is available. Think of a restaurant where the chef cooks custom meals based on your dietary needs. Amazon generates a unique page for each product. YouTube generates a unique homepage for each user based on their watch history.\n\nMost modern websites are dynamic. When you log into Gmail, the server knows who you are and generates HTML showing <em>your</em> emails — not someone else's. The HTML, CSS, and JS languages are the same either way; the difference is whether the files are pre-made or generated per request.\n\nThe websites you will build in this course start as static — you write the HTML and CSS files yourself, and the browser displays them directly. This is the best way to learn the fundamentals.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Static sites are making a comeback through 'static site generators' and 'JAMstack' architecture. These tools pre-build pages at deploy time, resulting in extremely fast websites. Many developer blogs and documentation sites use this approach.",
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
      id: "gap-fill-client-server",
      type: "gap-fill",
      instruction: {
        heading: "Check your understanding",
        body: "Fill in the blanks about client-server architecture.",
      },
      config: {
        type: "gap-fill",
        template:
          "Your web browser is an example of a {{role1}}.\nThe computer that stores and sends website files is called a {{role2}}.\nThe communication pattern is called the request-{{pattern}} cycle.\nA website that generates unique pages for each user is called {{type}}.",
        gaps: [
          {
            id: "role1",
            placeholder: "role name",
            acceptedAnswers: ["client"],
            caseSensitive: false,
          },
          {
            id: "role2",
            placeholder: "role name",
            acceptedAnswers: ["server"],
            caseSensitive: false,
          },
          {
            id: "pattern",
            placeholder: "second half",
            acceptedAnswers: ["response"],
            caseSensitive: false,
          },
          {
            id: "type",
            placeholder: "website type",
            acceptedAnswers: ["dynamic"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Your browser requests data — it is the ____.",
        "The computer that responds with files is the ____.",
        "The pattern is request and ____.",
        "A website that builds custom pages per user is ____ (opposite of static).",
      ],
    },
  ],
};
