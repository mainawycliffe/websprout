import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-http-methods",
  slug: "http-methods",
  title: "HTTP Methods Explained",
  description:
    "Understand what really happens when a form is submitted — HTTP requests, GET query strings, POST request bodies, and form encoding types.",
  order: 10,
  steps: [
    {
      id: "what-happens-on-submit",
      type: "explanation",
      instruction: {
        heading: "What happens when you click Submit — step by step",
        body: "You've been using forms that submit data, but what actually happens under the hood? Understanding this process removes the mystery and helps you build better forms.\n\nWhen a user clicks a submit button, the browser performs these steps in order:\n\n<strong>Step 1: Collect the data.</strong> The browser finds every form element inside the <code>&lt;form&gt;</code> that has a <code>name</code> attribute. For each one, it creates a name-value pair: the <code>name</code> is the key, and whatever the user entered (or selected) is the value. Elements without a <code>name</code> attribute are silently ignored.\n\n<strong>Step 2: Encode the data.</strong> The name-value pairs are converted into a specific text format. Special characters are encoded (spaces become <code>+</code> or <code>%20</code>, <code>&amp;</code> becomes <code>%26</code>, etc.). This encoding ensures the data can be safely transmitted over the internet.\n\n<strong>Step 3: Build the HTTP request.</strong> The browser creates an HTTP request using the form's <code>method</code> (GET or POST) and <code>action</code> (the destination URL). For GET, the encoded data is appended to the URL. For POST, it's placed in the request body.\n\n<strong>Step 4: Send the request.</strong> The browser sends the HTTP request to the server at the specified URL. This is exactly the same process as when you type a URL in the address bar and press Enter — the browser makes an HTTP request and waits for a response.\n\n<strong>Step 5: Display the response.</strong> The server processes the data, then sends back an HTTP response (usually a new HTML page). The browser displays this response, replacing the current page. This is why the page \"refreshes\" when you submit a traditional form.",
        analogy: "Think of form submission like packing a suitcase for a trip. First, you gather all the items you need (collecting form data). Then you fold and organize them neatly so they fit properly (encoding the data). Next, you choose how to travel — carry-on bag where everyone can see what you're carrying (GET), or a locked checked bag (POST). You hand the bag to the airline (sending the HTTP request), they transport it to your destination (the server), and your host unpacks it and responds to your arrival (the server's response).",
        docLinks: [
          {
            label: "MDN: Sending form data",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data",
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
      id: "get-method-detail",
      type: "explanation",
      instruction: {
        heading: "GET — data in the URL for all to see",
        body: "When a form uses <code>method=\"get\"</code>, the browser appends all form data to the URL as a <strong>query string</strong>. You can see this happening every time you use Google.\n\nType \"cute cats\" into Google and press Enter. Look at the URL:\n<code>https://www.google.com/search?q=cute+cats</code>\n\nThe <code>?</code> marks the start of the query string. <code>q=cute+cats</code> is the form data — <code>q</code> is the input's <code>name</code> attribute, and <code>cute+cats</code> is what you typed (with the space replaced by <code>+</code>).\n\nIf a form has multiple fields, they're separated by <code>&amp;</code>:\n<code>https://shop.com/search?category=shoes&amp;color=red&amp;size=10</code>\n\nThis URL contains three name-value pairs: <code>category=shoes</code>, <code>color=red</code>, and <code>size=10</code>.\n\n<strong>Advantages of GET:</strong>\n<ul><li><strong>Bookmarkable</strong> — users can save search results as a bookmark</li><li><strong>Shareable</strong> — users can copy the URL and send it to someone</li><li><strong>Browser history</strong> — the back button works naturally, returning to previous search results</li><li><strong>Cacheable</strong> — browsers and servers can cache GET responses for faster repeat visits</li></ul>\n\n<strong>Disadvantages of GET:</strong>\n<ul><li><strong>Visible</strong> — anyone can see the data in the URL bar, browser history, and server logs</li><li><strong>Size limited</strong> — URLs have a practical limit (around 2000-8000 characters depending on the browser)</li><li><strong>Not for sensitive data</strong> — passwords, credit cards, and personal info should never appear in a URL</li></ul>",
        docLinks: [
          {
            label: "MDN: GET method",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Never use <code>method=\"get\"</code> for login forms, registration forms, or any form that collects passwords or personal information. The data will appear in the browser's address bar, browsing history, and potentially in server access logs. A coworker glancing at your screen could see your password right there in the URL. Always use POST for sensitive data.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- GET form: data goes in URL -->\n<form action="/search" method="get">\n  <label for="q">Search:</label>\n  <input type="text" id="q" name="q" placeholder="cute cats">\n\n  <label for="cat">Category:</label>\n  <select id="cat" name="category">\n    <option value="all">All</option>\n    <option value="images">Images</option>\n    <option value="videos">Videos</option>\n  </select>\n\n  <button type="submit">Search</button>\n</form>\n\n<!-- Submitting with "cute cats" and "images" produces:\n     /search?q=cute+cats&category=images -->',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "post-method-detail",
      type: "explanation",
      instruction: {
        heading: "POST — data hidden in the request body",
        body: "When a form uses <code>method=\"post\"</code>, the browser sends the form data in the <strong>body</strong> of the HTTP request, not in the URL. The URL stays clean — you just see the action URL without any query string.\n\nWith POST, if you submit a login form at <code>/login</code>, the URL stays as just <code>https://example.com/login</code>. The data (<code>username=alex&amp;password=secret123</code>) travels inside the request body where it's not visible in the address bar, browser history, or bookmarks.\n\n<strong>Advantages of POST:</strong>\n<ul><li><strong>Hidden from URL</strong> — data doesn't appear in the address bar, browser history, or server logs (though it's still visible in browser dev tools and to network intermediaries)</li><li><strong>No size limit</strong> — you can send large amounts of data, including file uploads</li><li><strong>Side effects OK</strong> — POST is designed for actions that change something (creating an account, placing an order, sending a message)</li></ul>\n\n<strong>Disadvantages of POST:</strong>\n<ul><li><strong>Not bookmarkable</strong> — you can't save a POST submission as a bookmark</li><li><strong>Not cacheable</strong> — browsers don't cache POST responses by default</li><li><strong>Resubmission warning</strong> — refreshing a page after a POST submission triggers a browser warning (\"Are you sure you want to resubmit the form?\")</li></ul>\n\nIn practice, most forms use POST. Search forms and filters use GET because the results should be bookmarkable and shareable. Everything else — login, registration, checkout, contact forms, file uploads — uses POST.",
        analogy: "Remember the postcard vs sealed envelope analogy? GET is the postcard — the message is written on the outside for anyone to read. POST is the sealed envelope — the message is inside, hidden from casual observers. Note that the envelope isn't encrypted (for that you need HTTPS), but it's not openly displayed either. For truly private communication, you need both a sealed envelope (POST) and encryption (HTTPS) — which is why login pages should always use POST over HTTPS.",
        docLinks: [
          {
            label: "MDN: POST method",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- POST form: data goes in request body -->\n<form action="/login" method="post">\n  <label for="user">Username:</label>\n  <input type="text" id="user" name="username" required>\n\n  <label for="pw">Password:</label>\n  <input type="password" id="pw" name="password" required>\n\n  <button type="submit">Log In</button>\n</form>\n\n<!-- Submitting produces a POST request to /login\n     with body: username=alex&password=secret123\n     The URL stays as just /login (no query string) -->',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "enctype-attribute",
      type: "explanation",
      instruction: {
        heading: "Form encoding types (enctype)",
        body: "The <code>enctype</code> attribute on a <code>&lt;form&gt;</code> element specifies how the browser should encode the form data before sending it. There are three options:\n\n<strong><code>application/x-www-form-urlencoded</code></strong> (the default):\nThis is the standard encoding. Name-value pairs are formatted as <code>name1=value1&amp;name2=value2</code>, with special characters escaped. This is what you've been using in every form so far. It works perfectly for text data.\n\n<strong><code>multipart/form-data</code></strong>:\nThis encoding is required for file uploads. It splits the data into multiple parts, each with its own headers, allowing binary file data to be transmitted alongside text fields. If your form contains an <code>&lt;input type=\"file\"&gt;</code>, you <strong>must</strong> set <code>enctype=\"multipart/form-data\"</code> — otherwise the server receives the file name instead of the file contents.\n\n<code>&lt;form action=\"/upload\" method=\"post\" enctype=\"multipart/form-data\"&gt;<br>&nbsp;&nbsp;&lt;input type=\"file\" name=\"avatar\"&gt;<br>&nbsp;&nbsp;&lt;button type=\"submit\"&gt;Upload&lt;/button&gt;<br>&lt;/form&gt;</code>\n\n<strong><code>text/plain</code></strong>:\nRarely used. Sends data as plain text with no encoding. Not recommended because the data format is ambiguous and difficult for servers to parse reliably.\n\nIn practice, you'll use the default encoding for everything except file uploads. The moment you add a file input, switch to <code>multipart/form-data</code>.",
        docLinks: [
          {
            label: "MDN: form enctype attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#enctype",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "File uploads absolutely require <code>enctype=\"multipart/form-data\"</code> on the form and <code>method=\"post\"</code>. If you forget the enctype, the browser sends the file's name as a text string instead of the actual file contents. If you use GET instead of POST, the file data cannot be included in the URL. Both conditions must be met for file uploads to work correctly.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Default encoding (text data) -->\n<form action="/submit" method="post">\n  <input type="text" name="message">\n  <button type="submit">Send</button>\n</form>\n<!-- Sends: message=Hello+world -->\n\n<!-- File upload encoding -->\n<form action="/upload" method="post" enctype="multipart/form-data">\n  <label for="avatar">Profile Photo:</label>\n  <input type="file" id="avatar" name="avatar" accept="image/*">\n  <input type="text" name="caption" placeholder="Caption...">\n  <button type="submit">Upload</button>\n</form>\n<!-- Sends: multipart data with file contents -->',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-search-and-login",
      type: "free-edit",
      instruction: {
        heading: "Build a search form (GET) and a login form (POST)",
        body: "Create two forms on the same page to demonstrate the difference between GET and POST:\n\n<ul><li><strong>Search form</strong> using <code>method=\"get\"</code> with <code>action=\"/search\"</code> — include a text input named <code>q</code> and a category select</li><li><strong>Login form</strong> using <code>method=\"post\"</code> with <code>action=\"/login\"</code> — include username and password fields, both required</li></ul>\n\nThink about why each form uses its respective method. The search form uses GET because search results should be bookmarkable. The login form uses POST because passwords should never appear in URLs.",
        docLinks: [
          {
            label: "MDN: Sending form data",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<h2>Search (GET)</h2>\n<!-- Build a search form with method="get" -->\n\n\n<h2>Login (POST)</h2>\n<!-- Build a login form with method="post" -->\n\n',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "form" } },
      hints: [
        "Search form: <form action=\"/search\" method=\"get\"> with <input name=\"q\">.",
        "Login form: <form action=\"/login\" method=\"post\"> with username and password inputs.",
        "Use type=\"password\" for the password field so characters are masked.",
        "Add required to the login fields since both are mandatory.",
      ],
    },
  ],
};
