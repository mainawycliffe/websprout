import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-the-form-element",
  slug: "the-form-element",
  title: "The Form Element",
  description:
    "Learn how the <form> tag works as a container, and understand the action and method attributes that control where and how data is sent.",
  order: 2,
  steps: [
    {
      id: "form-as-container",
      type: "explanation",
      instruction: {
        heading: "The <form> element is a container",
        body: "The <code>&lt;form&gt;</code> element is the foundation of every HTML form. It serves as a container — a wrapper — that groups all the form fields together and tells the browser: \"Everything inside me is part of one form submission.\"\n\nWithout a <code>&lt;form&gt;</code> element, your input fields are just standalone widgets on the page. They look the same visually, but the browser does not know they belong together, and clicking a submit button does nothing meaningful. The <code>&lt;form&gt;</code> element is what connects all the fields into a single, submittable unit.\n\nHere is the simplest possible form:\n\n<code>&lt;form&gt;<br>&nbsp;&nbsp;&lt;input type=\"text\" name=\"query\"&gt;<br>&nbsp;&nbsp;&lt;button type=\"submit\"&gt;Search&lt;/button&gt;<br>&lt;/form&gt;</code>\n\nEven this minimal form works — when the user types something and clicks the button, the browser will collect the data from the input and attempt to submit it. The <code>&lt;form&gt;</code> element makes that possible.",
        analogy: "Think of the <code>&lt;form&gt;</code> element like a clipboard holding a questionnaire. The clipboard itself isn't a question — it's the thing that holds all the questions together in one place. Without the clipboard, you'd just have loose papers scattered around. The clipboard also has a label on top telling the receptionist where to file the completed form. Similarly, the <code>&lt;form&gt;</code> element holds all your inputs together and carries the instructions (attributes) for where to send the data.",
        docLinks: [
          {
            label: "MDN: <form> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "A page can contain multiple <code>&lt;form&gt;</code> elements, and each one submits independently. For example, a page might have a search form in the header and a login form in the main content. However, forms cannot be nested — you cannot put a <code>&lt;form&gt;</code> inside another <code>&lt;form&gt;</code>. The HTML specification explicitly forbids this, and browsers will produce unexpected behavior if you try.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form>\n  <input type="text" name="query">\n  <button type="submit">Search</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "action-attribute",
      type: "explanation",
      instruction: {
        heading: "The action attribute — where does the data go?",
        body: "The <code>action</code> attribute on a <code>&lt;form&gt;</code> element specifies the URL where the form data should be sent when the user submits the form. It answers the question: \"Where is this data going?\"\n\n<code>&lt;form action=\"/search\"&gt;</code> sends data to the <code>/search</code> page on the same website.\n<code>&lt;form action=\"https://example.com/api/submit\"&gt;</code> sends data to a completely different server.\n\nIf you omit the <code>action</code> attribute entirely, the form submits to the current page's URL — the browser reloads the same page with the form data attached. This is actually a common pattern for search pages and filters.\n\nThe <code>action</code> URL works just like the <code>href</code> on a link — it can be a relative path (like <code>/search</code>) or an absolute URL (like <code>https://google.com/search</code>). When the form is submitted, the browser navigates to that URL, carrying the form data along with it.\n\nReal-world example: Google's search form has <code>action=\"/search\"</code>. When you type \"cute cats\" and press Enter, the browser goes to <code>google.com/search?q=cute+cats</code>. The <code>action</code> told it to go to <code>/search</code>, and the form data (<code>q=cute+cats</code>) was attached automatically.",
        analogy: "The <code>action</code> attribute is like the mailing address on an envelope. When you write a letter, you put the recipient's address on the front so the postal service knows where to deliver it. Without an address, the letter goes nowhere (or gets returned to you). The <code>action</code> attribute is the address that tells the browser where to deliver the form data.",
        docLinks: [
          {
            label: "MDN: form action attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action",
            type: "html-attribute",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Google-style search form -->\n<form action="/search">\n  <input type="text" name="q" placeholder="Search...">\n  <button type="submit">Search</button>\n</form>\n\n<!-- Contact form sending to an API -->\n<form action="https://example.com/api/contact">\n  <input type="text" name="message">\n  <button type="submit">Send</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "method-attribute",
      type: "explanation",
      instruction: {
        heading: "The method attribute — GET vs POST",
        body: "The <code>method</code> attribute tells the browser <em>how</em> to send the form data. There are two options: <code>GET</code> and <code>POST</code>.\n\n<strong>GET</strong> attaches the form data to the URL as a query string. You can see the data right there in the address bar. For example, when you search on Google, the URL becomes <code>google.com/search?q=your+search+term</code>. The <code>?q=your+search+term</code> part is the form data, visible to everyone. GET is the default method if you don't specify one.\n\n<strong>POST</strong> sends the form data hidden inside the body of the HTTP request. The data does not appear in the URL, so it's not visible in the address bar, browser history, or server logs. This is what you use for login forms, registration forms, and anything involving sensitive or private data.\n\n<strong>When to use GET:</strong> Search forms, filters, any form where the result should be bookmarkable or shareable. If someone searches for \"cute cats\" on your site, they should be able to share that URL with a friend.\n\n<strong>When to use POST:</strong> Login forms, registration forms, payment forms, file uploads, any form that changes data on the server or sends sensitive information. You never want passwords appearing in the URL.",
        analogy: "Think of GET like writing a message on a <strong>postcard</strong> — anyone who handles the postcard can read what's written on it. The message is right there in the open. POST is like putting your message in a <strong>sealed envelope</strong> — the postal workers carry it, but they can't easily read the contents. For casual messages (\"Wish you were here!\"), a postcard is fine. For private information (bank details, passwords), you'd always use a sealed envelope.",
        docLinks: [
          {
            label: "MDN: form method attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Never use <code>GET</code> for forms that contain passwords, personal information, or credit card numbers. GET puts the data in the URL, which means it can appear in browser history, bookmarks, server access logs, and could be visible to anyone looking over the user's shoulder. Always use <code>POST</code> for sensitive data.",
          },
          {
            variant: "standard",
            title: "Web Standard",
            body: "GET requests have URL length limits (commonly 2048 characters in some browsers), so GET is unsuitable for large amounts of data. POST has no practical size limit. Additionally, GET requests should be \"safe\" — they should only retrieve data, never modify it. POST requests are used when the submission causes a side effect, like creating an account or placing an order.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- GET: data visible in URL (good for search) -->\n<form action="/search" method="get">\n  <input type="text" name="q">\n  <button type="submit">Search</button>\n</form>\n\n<!-- POST: data hidden in request body (good for login) -->\n<form action="/login" method="post">\n  <input type="text" name="username">\n  <input type="password" name="password">\n  <button type="submit">Log In</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "practice-form-tag",
      type: "gap-fill",
      instruction: {
        heading: "Complete the form tag",
        body: "Fill in the blanks to create a search form that sends data to <code>/search</code> using the <code>GET</code> method. Remember: the form element wraps the inputs, the <code>action</code> attribute specifies the destination URL, and the <code>method</code> attribute specifies how the data is sent.",
      },
      config: {
        type: "gap-fill",
        template:
          '<{{tag}} {{attr1}}="/search" {{attr2}}="get">\n  <input type="text" name="q" placeholder="Search...">\n  <button type="submit">Search</button>\n</{{tag}}>',
        gaps: [
          {
            id: "tag",
            placeholder: "element name",
            acceptedAnswers: ["form"],
            caseSensitive: false,
          },
          {
            id: "attr1",
            placeholder: "where to send",
            acceptedAnswers: ["action"],
            caseSensitive: false,
          },
          {
            id: "attr2",
            placeholder: "how to send",
            acceptedAnswers: ["method"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The element that wraps form fields is called <form>.",
        "The attribute that specifies the destination URL is \"action\".",
        "The attribute that specifies GET or POST is \"method\".",
      ],
    },
    {
      id: "write-form-element",
      type: "free-edit",
      instruction: {
        heading: "Write a form with action and method",
        body: "Now it's your turn! Write a complete login form from scratch. Your form should:\n\n<ul><li>Have an <code>action</code> attribute pointing to <code>/login</code></li><li>Use the <code>POST</code> method (because login data is sensitive)</li><li>Contain at least two input fields (username and password)</li><li>Have a submit button</li></ul>\n\nRemember: every input should have a <code>name</code> attribute so the server knows what each piece of data is.",
        docLinks: [
          {
            label: "MDN: <form> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<!-- Write your login form below -->\n",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "form" } },
      hints: [
        "Start with <form action=\"/login\" method=\"post\">.",
        "Add <input type=\"text\" name=\"username\"> for the username field.",
        "Add <input type=\"password\" name=\"password\"> for the password field.",
        "End with a <button type=\"submit\">Log In</button> before closing the form.",
      ],
    },
  ],
};
