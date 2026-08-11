import type { PracticeQuestionSeed } from "@/types/practice";

export const webFundamentalsQuestions: PracticeQuestionSeed[] = [
  {
    id: "web-status-codes",
    slug: "which-status-code",
    title: "Which status code belongs here?",
    topics: ["http", "web-fundamentals", "apis"],
    relatedModule: "js-fetch",
    step: {
      id: "web-status-codes",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Which status code belongs here?",
        body: "<p>A request arrives for a page that requires signing in, and the visitor is not signed in.</p><p>Two codes are commonly used here and only one is correct. Work out what each actually means — the names are famously misleading.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        options: [
          {
            id: "401",
            text: "<code>401 Unauthorized</code>",
            correct: true,
            explanation:
              "Correct, despite the name. <code>401</code> means \"not <em>authenticated</em>\" — we do not know who you are, so please provide credentials. It is the right response for a visitor who has not signed in, and it should carry a <code>WWW-Authenticate</code> header describing how to do so.",
          },
          {
            id: "403",
            text: "<code>403 Forbidden</code>",
            correct: false,
            explanation:
              "<code>403</code> means we know exactly who you are and you still may not have this — a signed-in non-admin hitting an admin page. Sending it to an anonymous visitor tells them retrying with credentials is pointless, which is wrong here.",
          },
          {
            id: "404",
            text: "<code>404 Not Found</code>",
            correct: false,
            explanation:
              "Sometimes used deliberately to avoid revealing that a resource exists, which is a legitimate security trade-off — but as a general answer it misdescribes the situation and makes debugging harder.",
          },
          {
            id: "400",
            text: "<code>400 Bad Request</code>",
            correct: false,
            explanation:
              "<code>400</code> means the request itself was malformed — broken syntax, invalid parameters. A perfectly well-formed request from an anonymous user is not a bad request.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "One of these means \"I do not know who you are\", the other \"I know, and no\".",
        "The name of the correct one is historically inaccurate.",
      ],
    },
  },

  {
    id: "web-get-vs-post",
    slug: "get-or-post",
    title: "GET or POST?",
    topics: ["http", "web-fundamentals", "forms"],
    relatedModule: "forms",
    step: {
      id: "web-get-vs-post",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "GET or POST?",
        body: "<p>The choice is not arbitrary — it changes what browsers, proxies and search-engine crawlers are permitted to do with the request.</p><p><strong>Select every reason a login form must use POST rather than GET.</strong></p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "<code>GET</code> is defined as <strong>safe</strong> (it must not change state) and <strong>idempotent</strong> (repeating it has the same effect as doing it once). Browsers, crawlers and caches rely on that — which is why a \"delete\" link fetched by a crawler can quietly destroy data.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "url-exposure",
            text: "A GET puts the password in the URL, where it lands in browser history and server logs",
            correct: true,
            explanation:
              "True, and the most immediate problem. Query strings are stored in history, sent in the <code>Referer</code> header to third parties, and written to access logs in plain text.",
          },
          {
            id: "state-change",
            text: "Signing in changes server state, and GET is defined as safe",
            correct: true,
            explanation:
              "True. Creating a session is a state change, so GET is the wrong verb by definition — regardless of whether anything visibly breaks.",
          },
          {
            id: "caching",
            text: "GET responses may be cached by browsers and proxies",
            correct: true,
            explanation:
              "True, and it produces genuinely dangerous bugs — a cached authenticated response can be served to a different user by a shared proxy. POST responses are not cached by default.",
          },
          {
            id: "size-limit",
            text: "GET cannot carry any data at all",
            correct: false,
            explanation:
              "False — GET carries data in the query string. There is no limit in the spec, though servers and browsers impose practical ones around 2–8KB. Capacity is not the issue here; semantics and exposure are.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Three of the four are genuine reasons.",
        "Think about where a query string ends up: history, logs, referrer headers, caches.",
      ],
    },
  },

  {
    id: "web-cors",
    slug: "what-is-a-cors-error-telling-you",
    title: "What is this CORS error telling you?",
    topics: ["http", "cors", "security", "debugging"],
    relatedModule: "js-fetch",
    step: {
      id: "web-cors",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "What is this CORS error telling you?",
        body: "<p>A fetch to a third-party API fails in the browser with a CORS message, but the identical request from the terminal with <code>curl</code> succeeds.</p><p>That discrepancy is the whole clue. Work out who is actually enforcing the rule.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "// Access to fetch at 'https://api.example.com/data' from origin\n// 'https://mysite.com' has been blocked by CORS policy:\n// No 'Access-Control-Allow-Origin' header is present.",
        codeLanguage: "javascript",
        options: [
          {
            id: "browser-enforced",
            text: "The request reached the server and it replied — but the browser withheld the response because the server did not opt in with an <code>Access-Control-Allow-Origin</code> header",
            correct: true,
            explanation:
              "Correct. CORS is enforced by the <em>browser</em>, not the server, which is why <code>curl</code> is unaffected — it has no origin to protect. The server must send the header to permit cross-origin reads. That means you cannot fix it from client code: either the API owner adds the header, or you proxy through your own backend, which is also why every \"CORS fix\" involving fetch options is snake oil.",
          },
          {
            id: "request-blocked",
            text: "The request never left the browser",
            correct: false,
            explanation:
              "For a simple request it is sent and answered normally — the browser only refuses to hand the response to your JavaScript. You can see the response arrive in the Network tab, which confuses people considerably. (A <em>preflighted</em> request is different: the <code>OPTIONS</code> check can fail before the real request is sent.)",
          },
          {
            id: "add-header-client",
            text: "Add <code>Access-Control-Allow-Origin</code> to your fetch request headers",
            correct: false,
            explanation:
              "That is a <em>response</em> header — the server sends it, not the client. Setting it on the request has no effect, and if clients could grant themselves permission the mechanism would be pointless.",
          },
          {
            id: "no-cors",
            text: "Use <code>mode: \"no-cors\"</code> to fix it",
            correct: false,
            explanation:
              "It removes the error by making the response <em>opaque</em> — status <code>0</code> and an unreadable body. The error goes away and so does your data, which is worse than the error.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Why does <code>curl</code> succeed where the browser fails?",
        "Is <code>Access-Control-Allow-Origin</code> sent by the client or the server?",
      ],
    },
  },

  {
    id: "web-render-blocking",
    slug: "why-is-the-page-blank-while-css-loads",
    title: "Why is the page blank while the CSS loads?",
    topics: ["performance", "browser", "rendering"],
    relatedModule: "course-overview",
    step: {
      id: "web-render-blocking",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Why is the page blank while the CSS loads?",
        body: "<p>The HTML arrives quickly but nothing paints until a large stylesheet finishes downloading.</p><p>Work out why the browser refuses to show the HTML it already has — the reason is deliberate rather than a limitation.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        options: [
          {
            id: "render-blocking",
            text: "CSS is render-blocking: painting unstyled content and then restyling it would cause a visible flash, so the browser waits",
            correct: true,
            explanation:
              "Correct. The browser needs the CSSOM before it can build the render tree, and showing unstyled text first (the old \"flash of unstyled content\") was judged worse than a brief delay. This is why critical CSS is inlined and non-critical stylesheets are loaded with a <code>media</code> trick or <code>preload</code>. Note that CSS also blocks the <em>execution</em> of any script that follows it, since scripts may read computed styles.",
          },
          {
            id: "parser-blocked",
            text: "The HTML parser stops completely until the CSS arrives",
            correct: false,
            explanation:
              "Parsing continues, and the preload scanner keeps fetching other resources in parallel. It is <em>rendering</em> that waits, not parsing — a distinction that matters when reasoning about what else is happening meanwhile.",
          },
          {
            id: "js-blocking",
            text: "Only JavaScript blocks rendering; CSS never does",
            correct: false,
            explanation:
              "Backwards for CSS. A classic <code>&lt;script&gt;</code> does block parsing — which is why <code>defer</code> exists — but stylesheets block rendering independently of any script.",
          },
          {
            id: "cache",
            text: "The browser is waiting to write the stylesheet to cache first",
            correct: false,
            explanation:
              "Caching happens alongside and never gates painting. The wait is for the styles themselves, not for storage.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "What would the user see if the browser painted the HTML before the CSS arrived?",
        "Is it the parsing that stops, or the painting?",
      ],
    },
  },

  {
    id: "web-storage-choice",
    slug: "localstorage-or-cookie",
    title: "localStorage or a cookie?",
    topics: ["browser", "storage", "security"],
    relatedModule: "js-integration",
    step: {
      id: "web-storage-choice",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "localStorage or a cookie?",
        body: "<p>Both persist data in the browser, and they are not interchangeable.</p><p><strong>Select every statement that is true.</strong></p>",
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "cookies-sent",
            text: "Cookies are sent with every matching request; <code>localStorage</code> never leaves the browser unless your code sends it",
            correct: true,
            explanation:
              "True, and it is the main practical difference. It makes cookies right for session tokens the server must see on each request — and it means a large cookie adds weight to every single request.",
          },
          {
            id: "httponly",
            text: "A cookie can be marked <code>HttpOnly</code> so JavaScript cannot read it; <code>localStorage</code> has no equivalent",
            correct: true,
            explanation:
              "True, and it is why session tokens belong in <code>HttpOnly</code> cookies. Anything in <code>localStorage</code> is readable by any script on the page, so one XSS flaw or one compromised dependency exposes it.",
          },
          {
            id: "localstorage-expires",
            text: "<code>localStorage</code> expires automatically after the session ends",
            correct: false,
            explanation:
              "False — it persists until explicitly cleared, surviving restarts indefinitely. You may be thinking of <code>sessionStorage</code>, which is cleared when the tab closes.",
          },
          {
            id: "localstorage-async",
            text: "<code>localStorage</code> is asynchronous, so it never blocks the main thread",
            correct: false,
            explanation:
              "False, and worth knowing: the API is entirely synchronous, so a large read or write blocks the main thread and can cause jank. <code>IndexedDB</code> is the asynchronous option for anything substantial.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two of the four are true. Ask what travels with each HTTP request.",
        "Which of the two can be hidden from JavaScript entirely?",
      ],
    },
  },

  {
    id: "web-url-parts",
    slug: "what-is-the-query-string",
    title: "Which part is the query string?",
    topics: ["web-fundamentals", "urls"],
    relatedModule: "course-overview",
    step: {
      id: "web-url-parts",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Which part is the query string?",
        body: "<p>Knowing the parts of a URL by name makes both server routing and the browser's <code>URL</code> API far easier to reason about.</p><p>Identify the query string in this address:</p><p><code>https://shop.example.com/products/shoes?size=42&amp;colour=red#reviews</code></p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        options: [
          {
            id: "query",
            text: "<code>?size=42&amp;colour=red</code>",
            correct: true,
            explanation:
              "Correct. The query string starts at the <code>?</code> and holds key/value pairs separated by <code>&amp;</code>. It is sent to the server, and in the browser you read it with <code>new URL(location.href).searchParams</code>. Note it stops at the <code>#</code>.",
          },
          {
            id: "path",
            text: "<code>/products/shoes</code>",
            correct: false,
            explanation:
              "That is the <strong>path</strong> — the hierarchical part that usually maps to a route on the server.",
          },
          {
            id: "hash",
            text: "<code>#reviews</code>",
            correct: false,
            explanation:
              "That is the <strong>fragment</strong>, or hash. Crucially it is never sent to the server — the browser uses it to scroll to a matching element, and client-side routers sometimes use it for navigation.",
          },
          {
            id: "host",
            text: "<code>shop.example.com</code>",
            correct: false,
            explanation:
              "That is the <strong>host</strong>. Together with the <code>https</code> scheme and the port it forms the <em>origin</em>, which is the unit CORS and cookies are scoped to.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "It begins with a <code>?</code>.",
        "One of the other parts is never sent to the server at all — worth knowing which.",
      ],
    },
  },
];
