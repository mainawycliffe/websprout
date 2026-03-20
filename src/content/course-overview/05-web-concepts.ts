import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "course-overview-web-concepts",
  slug: "web-concepts",
  title: "Introduction to Web Concepts",
  description:
    "Understand URLs, browsers, HTTP, and DNS — the invisible infrastructure behind every click.",
  order: 5,
  steps: [
    {
      id: "urls",
      type: "explanation",
      instruction: {
        heading: "URLs: the addresses of the web",
        body: "Every page on the web has a unique address called a <strong>URL</strong> (Uniform Resource Locator). When you type <code>https://www.youtube.com/watch?v=abc123</code> into your browser, each part of that URL has a specific meaning:\n\n<ul><li><strong>https://</strong> — the protocol (how to communicate). Like choosing to send a letter vs. a phone call.</li>\n<li><strong>www.youtube.com</strong> — the domain name (which server to talk to). Like a street address.</li>\n<li><strong>/watch</strong> — the path (which page on that server). Like an apartment number within a building.</li>\n<li><strong>?v=abc123</strong> — the query string (extra info). Like a note attached to the letter: 'I want video abc123.'</li></ul>\n\nURLs were invented so that every resource on the web — every page, every image, every video — could have one unique, shareable address. You can send a URL to anyone in the world, and they will see the exact same resource. This was a revolutionary idea: before the web, sharing a specific document on a remote computer was extremely difficult.",
        analogy:
          "A URL is like a postal address. The country is the protocol, the city and street is the domain name, the house number is the path, and any special delivery instructions are the query string. Just like a postal address uniquely identifies one mailbox in the world, a URL uniquely identifies one resource on the web.",
        docLinks: [
          {
            label: "MDN: What is a URL?",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The 'S' in HTTPS stands for 'Secure.' HTTPS encrypts data between your browser and the server so nobody in between can read it. Modern browsers warn you when a site uses plain HTTP (without the S). Always look for HTTPS, especially when entering passwords or payment info.",
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
      id: "browsers",
      type: "explanation",
      instruction: {
        heading: "Browsers: the window to the web",
        body: "A <strong>web browser</strong> is the program that fetches web files and turns them into the visual pages you see. Chrome, Firefox, Safari, and Edge are all web browsers.\n\nHere is what a browser does every time you visit a page:\n\n<ol><li><strong>Fetches</strong> the HTML file from the server at the URL you entered</li>\n<li><strong>Parses</strong> (reads) the HTML from top to bottom, building a structure called the DOM (Document Object Model)</li>\n<li><strong>Discovers</strong> CSS and JavaScript files linked in the HTML and fetches those too</li>\n<li><strong>Applies</strong> CSS rules to the DOM elements, calculating colors, sizes, and positions</li>\n<li><strong>Paints</strong> the final result to your screen as pixels</li>\n<li><strong>Executes</strong> JavaScript, which can modify the DOM and CSS after the page loads</li></ol>\n\nAll of this happens in about 1-3 seconds for a typical website. The browser is doing an incredible amount of work behind the scenes — parsing multiple languages, calculating layout, and rendering millions of pixels — every time you click a link.",
        analogy:
          "A browser is like a translator at the United Nations. The HTML, CSS, and JavaScript files are documents written in different languages. The browser reads all three, understands them, and produces one unified result — the visual page you see. Without the translator (browser), the documents are meaningless to you.",
        docLinks: [
          {
            label: "MDN: How browsers work",
            url: "https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Every browser has built-in Developer Tools (DevTools). Press F12 or Ctrl+Shift+I (Cmd+Option+I on Mac) to open them. DevTools let you inspect HTML, edit CSS live, debug JavaScript, and see network requests. They are the most important tool a web developer has.",
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
      id: "http",
      type: "explanation",
      instruction: {
        heading: "HTTP: how browsers talk to servers",
        body: "<strong>HTTP</strong> (HyperText Transfer Protocol) is the language browsers and servers use to communicate. When your browser needs a web page, it sends an HTTP <strong>request</strong> to the server. The server processes it and sends back an HTTP <strong>response</strong> containing the HTML file.\n\nThe most common types of HTTP requests are:\n\n<ul><li><strong>GET</strong> — 'Give me this resource.' Used when you visit a page or load an image.</li>\n<li><strong>POST</strong> — 'Here is some data, process it.' Used when you submit a form (like a login or sign-up).</li></ul>\n\nEvery HTTP response includes a <strong>status code</strong> — a number that tells you what happened:\n\n<ul><li><strong>200</strong> — OK. Everything worked, here is your page.</li>\n<li><strong>404</strong> — Not Found. The page does not exist at this URL.</li>\n<li><strong>500</strong> — Server Error. Something went wrong on the server's side.</li></ul>\n\nYou have probably seen a '404 Not Found' page before — now you know it is an HTTP status code telling the browser the requested resource does not exist.",
        analogy:
          "HTTP is like ordering food at a drive-through. You pull up to the speaker (connect to the server), say what you want (send a request), and the kitchen prepares it and hands it through the window (sends a response). The receipt code is like the status code — it tells you if your order was successful or if something went wrong.",
        docLinks: [
          {
            label: "MDN: HTTP overview",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
            type: "html-concept",
          },
          {
            label: "MDN: HTTP status codes",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "HTTP was invented by Tim Berners-Lee alongside HTML in 1991. It is a 'stateless' protocol — each request is independent, and the server does not remember previous requests. Cookies and sessions were later invented to work around this limitation.",
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
      id: "dns",
      type: "explanation",
      instruction: {
        heading: "DNS: the phone book of the internet",
        body: "When you type <code>google.com</code> into your browser, your computer does not actually know where Google's servers are. Computers find each other using <strong>IP addresses</strong> — numbers like <code>142.250.80.46</code>. But nobody wants to memorize numbers like that.\n\n<strong>DNS</strong> (Domain Name System) is the system that translates human-friendly domain names (like <code>google.com</code>) into computer-friendly IP addresses (like <code>142.250.80.46</code>). Here is what happens:\n\n<ol><li>You type <code>google.com</code> in your browser</li>\n<li>Your computer asks a DNS server: 'What is the IP address for google.com?'</li>\n<li>The DNS server responds: '142.250.80.46'</li>\n<li>Your browser now knows where to send its HTTP request</li>\n<li>The connection is made, and the page loads</li></ol>\n\nThis happens automatically, in milliseconds, every time you visit a website. Your computer also caches (remembers) recent DNS lookups so it does not have to ask again for sites you visit frequently.",
        analogy:
          "DNS is exactly like a phone book (or your phone's contact list). You know your friend's name (<code>google.com</code>) but not their phone number (<code>142.250.80.46</code>). You look up the name in your contacts, get the number, and then you can call them. DNS does this for every website you visit.",
        docLinks: [
          {
            label: "MDN: What is a domain name?",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name",
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
      id: "gap-fill-concepts",
      type: "gap-fill",
      instruction: {
        heading: "Check your understanding",
        body: "Fill in the blanks about web concepts.",
      },
      config: {
        type: "gap-fill",
        template:
          "A {{url}} is the unique address of a resource on the web.\n{{dns}} translates domain names into IP addresses.\nBrowsers and servers communicate using the {{protocol}} protocol.\nA {{code}} status code means the page was not found.",
        gaps: [
          {
            id: "url",
            placeholder: "abbreviation",
            acceptedAnswers: ["URL", "url"],
            caseSensitive: false,
          },
          {
            id: "dns",
            placeholder: "system name",
            acceptedAnswers: ["DNS", "dns"],
            caseSensitive: false,
          },
          {
            id: "protocol",
            placeholder: "protocol name",
            acceptedAnswers: ["HTTP", "http", "HTTPS", "https"],
            caseSensitive: false,
          },
          {
            id: "code",
            placeholder: "number",
            acceptedAnswers: ["404"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The unique address of a web page is called a ____ (three letters).",
        "The system that converts 'google.com' to an IP address is called ____ (three letters).",
        "The communication protocol is ____ (four letters, the one in the URL bar).",
        "The famous 'Not Found' status code is a three-digit number starting with 4.",
      ],
    },
  ],
};
