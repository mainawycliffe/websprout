import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-reading-changing",
  slug: "reading-changing",
  title: "Reading & Changing Content",
  description:
    "Once you've selected an element, learn how to read its content, change its text, update attributes, and even create brand-new elements from scratch.",
  order: 4,
  steps: [
    {
      id: "text-content",
      type: "explanation",
      instruction: {
        heading: "textContent: read and write text",
        body: "Every element has a `.textContent` property. Reading it gives you all the text inside the element (including text in child elements). Setting it replaces all the element's content with plain text.\n\nThis is the safest way to change text on a page because it treats everything as plain text — even if you accidentally include HTML tags, they'll appear as literal text, not rendered HTML. On sites like Twitter, YouTube, and Gmail, `textContent` is used constantly to update labels, counters, timestamps, and messages.",
        analogy:
          "Reading content is like looking at a sign on a door. Changing `textContent` is like replacing that sign with a new one — the door stays, but the message changes. No matter what you write on the sign, it's always treated as plain text.",
        docLinks: [
          {
            label: "Node.textContent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Reading text\nconst heading = document.querySelector("h1");\nconsole.log(heading.textContent); // "Welcome to My Site"\n\n// Writing text (replaces everything inside)\nheading.textContent = "New Title";\n\n// Safe: HTML tags are shown as text, not rendered\nheading.textContent = "<em>Bold?</em>";\n// Shows literally: <em>Bold?</em>',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "inner-html",
      type: "explanation",
      instruction: {
        heading: "innerHTML: read and write HTML (with caution)",
        body: "`.innerHTML` is similar to `textContent`, but it treats the string as HTML — tags will be parsed and rendered. This lets you insert formatted content, links, lists, and other HTML structures.\n\nHowever, `innerHTML` comes with a serious security risk. If you insert user-provided text (like from a form input) using `innerHTML`, a malicious user could inject a `<script>` tag that runs harmful code. This attack is called Cross-Site Scripting (XSS).",
        docLinks: [
          {
            label: "Element.innerHTML",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Prefer `textContent` over `innerHTML` when inserting user-provided text. `innerHTML` can execute scripts (XSS attack risk). Only use `innerHTML` with content you fully control — never with user input.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Setting `innerHTML` destroys all existing child elements and recreates them from scratch. This means any event listeners attached to those children are lost. For small updates, prefer `textContent` or `createElement`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Reading HTML\nconst div = document.querySelector(".content");\nconsole.log(div.innerHTML);\n// "<p>Hello <strong>world</strong></p>"\n\n// Writing HTML — tags are rendered\ndiv.innerHTML = "<p>New <em>formatted</em> content</p>";\n\n// DANGER: never do this with user input!\nconst userInput = \'<img src=x onerror="alert(\'hacked\')">\';\ndiv.innerHTML = userInput; // XSS vulnerability!\n\n// SAFE alternative for user input:\ndiv.textContent = userInput; // Shown as harmless text',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "value-and-attributes",
      type: "explanation",
      instruction: {
        heading: "Form values and attributes",
        body: "Form elements like `<input>`, `<textarea>`, and `<select>` don't use `textContent` — their content is accessed through the `.value` property. This is how you read what a user typed into a form field.\n\nFor HTML attributes, use `.getAttribute()` to read them and `.setAttribute()` to change or add them. Common uses include updating `src` on images, `href` on links, `disabled` on buttons, and `data-*` custom attributes.",
        docLinks: [
          {
            label: "HTMLInputElement.value",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value",
            type: "js-method",
          },
          {
            label: "Element.setAttribute()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute",
            type: "js-method",
          },
          {
            label: "Element.getAttribute()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Reading form input value\nconst input = document.querySelector("#username");\nconsole.log(input.value); // whatever the user typed\n\n// Setting form input value\ninput.value = "default name";\n\n// Reading an attribute\nconst link = document.querySelector("a");\nconsole.log(link.getAttribute("href")); // "https://..."\n\n// Setting/changing an attribute\nconst img = document.querySelector("img");\nimg.setAttribute("src", "new-photo.jpg");\nimg.setAttribute("alt", "A new photo");\n\n// Removing an attribute\nconst btn = document.querySelector("button");\nbtn.removeAttribute("disabled");',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "create-element",
      type: "explanation",
      instruction: {
        heading: "Creating new elements",
        body: "JavaScript can create entirely new HTML elements that didn't exist in the original page. This is a three-step process:\n\n1. **Create** the element: `document.createElement('tag')`\n2. **Configure** it: set its text, classes, attributes\n3. **Attach** it to the page: `parentElement.appendChild(newElement)`\n\nThis is how dynamic content works everywhere. When you post a comment on YouTube, JavaScript creates a new `<div>` for your comment, fills it with your text and avatar, and appends it to the comment list — no page reload needed.",
        docLinks: [
          {
            label: "document.createElement()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
            type: "js-method",
          },
          {
            label: "Node.appendChild()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "`createElement` returns an element that exists only in memory — it's invisible until you attach it to the page with `appendChild`, `append`, `prepend`, `before`, or `after`. Forgetting this step is a very common beginner mistake.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Step 1: Create the element\nconst newItem = document.createElement("li");\n\n// Step 2: Configure it\nnewItem.textContent = "Buy groceries";\nnewItem.classList.add("todo-item");\nnewItem.setAttribute("data-priority", "high");\n\n// Step 3: Attach it to the page\nconst list = document.querySelector("#todo-list");\nlist.appendChild(newItem);\n\n// Other ways to attach:\n// list.prepend(newItem)    — add as first child\n// list.append(newItem)     — add as last child (same as appendChild)\n// someElement.before(newItem)  — add before someElement\n// someElement.after(newItem)   — add after someElement\n\n// Remove an element\nnewItem.remove();',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-content",
      type: "gap-fill",
      instruction: {
        heading: "Practice: read and change content",
        body: "Fill in the blanks to read form input, update text, and create a new element.",
      },
      config: {
        type: "gap-fill",
        template:
          '// Read what the user typed into an input\nconst name = document.querySelector("#name").{{valueProp}};\n\n// Update a heading\'s text safely\nconst heading = document.querySelector("h1");\nheading.{{textProp}} = "Hello, " + name;\n\n// Create a new paragraph and add it to the page\nconst p = document.{{createMethod}}("p");\np.textContent = "Welcome!";\ndocument.body.{{attachMethod}}(p);',
        gaps: [
          {
            id: "valueProp",
            placeholder: "property",
            acceptedAnswers: ["value"],
            caseSensitive: true,
          },
          {
            id: "textProp",
            placeholder: "property",
            acceptedAnswers: ["textContent"],
            caseSensitive: true,
          },
          {
            id: "createMethod",
            placeholder: "method",
            acceptedAnswers: ["createElement"],
            caseSensitive: true,
          },
          {
            id: "attachMethod",
            placeholder: "method",
            acceptedAnswers: ["appendChild", "append"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["valueProp", "textProp", "createMethod", "attachMethod"],
        },
      },
      hints: [
        "Form inputs store what the user typed in a 5-letter property.",
        "The safe way to set text (not HTML) uses a property with 'text' and 'Content' in the name.",
        "To make a brand-new element, you 'create' it — combine that word with 'Element'.",
        "To attach a child to a parent, you 'append' the 'Child'.",
      ],
    },
  ],
};
