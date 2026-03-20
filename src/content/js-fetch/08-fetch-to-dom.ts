import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-fetch-to-dom",
  slug: "fetch-to-dom",
  title: "Displaying Fetched Data in the DOM",
  description:
    "Learn the complete pattern: fetch data from an API, parse it, and render it into the page using DOM manipulation.",
  order: 8,
  steps: [
    {
      id: "full-pattern",
      type: "explanation",
      instruction: {
        heading: "The Complete Pattern: Fetch, Parse, Render",
        body: `<p>So far you've learned to fetch data and parse JSON. But data sitting in a JavaScript variable doesn't help your users — they need to <em>see</em> it on the page. The final step is taking fetched data and turning it into DOM elements that appear in the browser.</p>

<p>The complete data-fetching pattern has three stages:</p>
<ol>
  <li><strong>Fetch</strong> — Make the HTTP request and wait for the response</li>
  <li><strong>Parse</strong> — Convert the JSON response into a JavaScript object or array</li>
  <li><strong>Render</strong> — Create DOM elements, fill them with data, and add them to the page</li>
</ol>

<p>This is exactly what apps like Instagram, Twitter, and YouTube do. When you open Instagram, the app fetches your feed data as JSON from Instagram's servers, then creates DOM elements (images, captions, like buttons) for each post. The HTML that arrives from the server is just a skeleton — all the actual content gets injected by JavaScript after the data is fetched.</p>`,
        analogy:
          "Think of it like cooking a meal. <strong>Fetching</strong> is going to the grocery store and bringing ingredients home. <strong>Parsing</strong> is unpacking the bags and laying everything out on the counter. <strong>Rendering</strong> is cooking the food and plating it beautifully for your guest. Each step depends on the one before it, and you can't skip any of them.",
        docLinks: [
          {
            label: "Document.createElement()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
            type: "js-method",
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
      id: "demo-list",
      type: "explanation",
      instruction: {
        heading: "Demo: Fetching Users into a List",
        body: `<p>Let's walk through a concrete example. We'll fetch a list of users from JSONPlaceholder and render each user's name as a list item. The code below shows the entire flow:</p>

<ol>
  <li>Select the container element where we want to display the data</li>
  <li>Fetch the users array from the API</li>
  <li>Check the response is OK</li>
  <li>Parse the JSON into a JavaScript array</li>
  <li>Loop through the array and create a <code>&lt;li&gt;</code> for each user</li>
  <li>Append each <code>&lt;li&gt;</code> to a <code>&lt;ul&gt;</code>, then add the <code>&lt;ul&gt;</code> to the page</li>
</ol>

<p>Notice we use <code>textContent</code> to set the text — never <code>innerHTML</code> with user data. We'll explain why at the end of this lesson.</p>`,
        docLinks: [
          {
            label: "Node.textContent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// HTML: <div id="output"></div>\n\nasync function loadUsers() {\n  const response = await fetch(\n    "https://jsonplaceholder.typicode.com/users"\n  );\n  if (!response.ok) throw new Error("HTTP " + response.status);\n  const users = await response.json();\n\n  const list = document.createElement("ul");\n  users.forEach((user) => {\n    const li = document.createElement("li");\n    li.textContent = user.name;\n    list.appendChild(li);\n  });\n\n  document.getElementById("output").appendChild(list);\n}\n\nloadUsers();`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-user-list",
      type: "free-edit",
      instruction: {
        heading: "Build It: User Name List",
        body: `<p>Build a page that fetches users from JSONPlaceholder and displays their names as a list. The starter code provides the HTML structure with a <code>&lt;div id="output"&gt;</code> where your list should appear.</p>

<p>Your JavaScript should:</p>
<ol>
  <li>Fetch from <code>https://jsonplaceholder.typicode.com/users</code></li>
  <li>Parse the JSON response</li>
  <li>Create a <code>&lt;ul&gt;</code> element</li>
  <li>Loop through the users and create a <code>&lt;li&gt;</code> for each name</li>
  <li>Append the list to the <code>#output</code> div</li>
</ol>`,
      },
      config: {
        type: "free-edit",
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <title>User List</title>\n  <style>\n    body { font-family: sans-serif; padding: 20px; }\n    h1 { color: #333; }\n    li { padding: 4px 0; }\n  </style>\n</head>\n<body>\n  <h1>Users</h1>\n  <div id="output">Loading...</div>\n\n  <script>\n    async function loadUsers() {\n      const response = await fetch("https://jsonplaceholder.typicode.com/users");\n      if (!response.ok) throw new Error("HTTP " + response.status);\n      const users = await response.json();\n\n      const list = document.createElement("ul");\n      users.forEach((user) => {\n        const li = document.createElement("li");\n        li.textContent = user.name;\n        list.appendChild(li);\n      });\n\n      const output = document.getElementById("output");\n      output.textContent = "";\n      output.appendChild(list);\n    }\n\n    loadUsers();\n  </script>\n</body>\n</html>`,
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["fetch"] },
      },
      hints: [
        "Use document.createElement('ul') to create the list container.",
        "Use forEach to loop through the users array and create an li for each one.",
        "Set li.textContent = user.name to display each user's name safely.",
      ],
    },
    {
      id: "rendering-cards",
      type: "explanation",
      instruction: {
        heading: "Rendering Objects with Multiple Properties",
        body: `<p>In the real world, you rarely display just one property. User profiles show a name, email, avatar, and location. Product listings show a title, price, image, and rating. You need to create more complex DOM structures for each item.</p>

<p>The pattern is the same, but instead of a single <code>&lt;li&gt;</code>, you create a <strong>card</strong> — a <code>&lt;div&gt;</code> with multiple child elements inside it. For each piece of data, you create an element, set its content, and append it to the card. Then the card gets appended to the page.</p>

<p>When building cards, it helps to think in layers:</p>
<ul>
  <li><strong>Container</strong> — A <code>&lt;div&gt;</code> with a class for styling (e.g., <code>"user-card"</code>)</li>
  <li><strong>Children</strong> — Individual elements for each data field (<code>&lt;h2&gt;</code> for name, <code>&lt;p&gt;</code> for email, <code>&lt;span&gt;</code> for city)</li>
  <li><strong>Assembly</strong> — Append children to the container, then container to the page</li>
</ul>`,
      },
      config: {
        type: "explanation",
        demoCode: `function createUserCard(user) {\n  const card = document.createElement("div");\n  card.className = "user-card";\n\n  const name = document.createElement("h2");\n  name.textContent = user.name;\n\n  const email = document.createElement("p");\n  email.textContent = user.email;\n\n  const city = document.createElement("p");\n  city.textContent = "City: " + user.address.city;\n\n  card.appendChild(name);\n  card.appendChild(email);\n  card.appendChild(city);\n\n  return card;\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-user-cards",
      type: "free-edit",
      instruction: {
        heading: "Build It: User Profile Cards",
        body: `<p>Build a page that fetches users and displays <strong>profile cards</strong> with the user's name, email, and city. The starter code includes CSS for styled cards. Complete the JavaScript to fetch and render the data.</p>

<p>Each card should contain:</p>
<ul>
  <li>An <code>&lt;h2&gt;</code> with the user's name</li>
  <li>A <code>&lt;p&gt;</code> with the user's email</li>
  <li>A <code>&lt;p&gt;</code> with the user's city (from <code>user.address.city</code>)</li>
</ul>`,
      },
      config: {
        type: "free-edit",
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <title>User Cards</title>\n  <style>\n    body { font-family: sans-serif; padding: 20px; background: #f5f5f5; }\n    h1 { color: #333; }\n    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }\n    .user-card {\n      background: white; border-radius: 8px; padding: 16px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n    }\n    .user-card h2 { margin: 0 0 8px; color: #1a1a1a; font-size: 1.1rem; }\n    .user-card p { margin: 4px 0; color: #666; font-size: 0.9rem; }\n  </style>\n</head>\n<body>\n  <h1>User Profiles</h1>\n  <div id="cards" class="cards">Loading...</div>\n\n  <script>\n    function createUserCard(user) {\n      const card = document.createElement("div");\n      card.className = "user-card";\n\n      const name = document.createElement("h2");\n      name.textContent = user.name;\n\n      const email = document.createElement("p");\n      email.textContent = user.email;\n\n      const city = document.createElement("p");\n      city.textContent = "City: " + user.address.city;\n\n      card.appendChild(name);\n      card.appendChild(email);\n      card.appendChild(city);\n      return card;\n    }\n\n    async function loadUsers() {\n      try {\n        const response = await fetch("https://jsonplaceholder.typicode.com/users");\n        if (!response.ok) throw new Error("HTTP " + response.status);\n        const users = await response.json();\n\n        const container = document.getElementById("cards");\n        container.textContent = "";\n        users.forEach((user) => {\n          container.appendChild(createUserCard(user));\n        });\n      } catch (error) {\n        document.getElementById("cards").textContent = "Failed to load users.";\n      }\n    }\n\n    loadUsers();\n  </script>\n</body>\n</html>`,
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["fetch", "createElement"] },
      },
      hints: [
        "Create a function that takes a user object and returns a card element.",
        "Use document.createElement for each part of the card (div, h2, p).",
        "Access nested data with user.address.city.",
      ],
    },
    {
      id: "security-textcontent",
      type: "explanation",
      instruction: {
        heading: "Security: Always Use textContent, Never innerHTML",
        body: `<p>When displaying data that comes from a server (or from user input), you must <strong>always</strong> use <code>textContent</code> instead of <code>innerHTML</code>. This is a critical security practice.</p>

<p>Why? Because <code>innerHTML</code> parses its content as HTML. If the data contains HTML tags — especially <code>&lt;script&gt;</code> tags — the browser will execute them. An attacker could craft a username like <code>&lt;script&gt;stealCookies()&lt;/script&gt;</code>, and if you use <code>innerHTML</code>, that script runs in your user's browser. This attack is called <strong>Cross-Site Scripting (XSS)</strong> and it's one of the most common web security vulnerabilities.</p>

<p><code>textContent</code> is safe because it treats everything as plain text — even if the string contains HTML tags, they'll be displayed as literal text, not parsed as HTML. The only time to use <code>innerHTML</code> is with content you've written yourself (hardcoded strings), never with data from an API or user input.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Cross-Site Scripting (XSS) is listed in the OWASP Top 10 web security risks. Using <code>textContent</code> instead of <code>innerHTML</code> for user-supplied data is one of the most basic and important security practices in web development.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "If you need to build complex HTML from data, create elements with <code>document.createElement()</code> and set <code>textContent</code> on each one. Never concatenate data into an HTML string and set it with <code>innerHTML</code>.",
          },
        ],
        docLinks: [
          {
            label: "Node.textContent",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
            type: "js-concept",
          },
          {
            label: "Element.innerHTML (security considerations)",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// DANGEROUS — never do this with external data!\nconst username = '<script>alert("hacked!")</script>';\nelement.innerHTML = username; // Script would execute!\n\n// SAFE — textContent treats everything as plain text\nelement.textContent = username;\n// Displays: <script>alert("hacked!")</script>\n// as literal text, script does NOT execute`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
