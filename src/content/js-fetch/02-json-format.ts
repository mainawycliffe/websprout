import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-json-format",
  slug: "json-format",
  title: "JSON — The Language of Data",
  description:
    "Learn JSON, the universal format that APIs use to send and receive structured data between browsers and servers.",
  order: 2,
  steps: [
    {
      id: "what-is-json",
      type: "explanation",
      instruction: {
        heading: "What Is JSON and Why Does It Exist?",
        body: `<p>When a server needs to send data to your browser, it can't just send a JavaScript object — that's a concept that only exists inside a running JavaScript program. The server and browser need a <strong>text format</strong> they both understand. That format is <strong>JSON</strong> (JavaScript Object Notation).</p>

<p>JSON was created to be <em>human-readable</em> and <em>easy for machines to parse</em>. Before JSON, the web used <strong>XML</strong> — a much more verbose format with opening and closing tags everywhere (like HTML). JSON won because it's dramatically simpler. Compare these two ways of representing a user:</p>

<p>XML: <code>&lt;user&gt;&lt;name&gt;Alice&lt;/name&gt;&lt;age&gt;25&lt;/age&gt;&lt;/user&gt;</code><br>
JSON: <code>{"name": "Alice", "age": 25}</code></p>

<p>Today, JSON is the <strong>universal language of web APIs</strong>. When you fetch data from Instagram, Google Maps, Amazon, or any modern service, the server almost always responds with JSON. Learning to read and work with JSON is essential for data fetching.</p>`,
        analogy:
          "JSON is like a <strong>standardized shipping label</strong>. It doesn't matter whether the package is coming from New York or Tokyo — if everyone uses the same label format, any postal service can read it. JSON is that universal label format for data on the web.",
        docLinks: [
          {
            label: "JSON",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
            type: "js-concept",
          },
          {
            label: "Working with JSON",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// This is JSON — a text format for data\n{\n  "name": "Alice",\n  "age": 25,\n  "hobbies": ["reading", "coding"],\n  "address": {\n    "city": "Portland",\n    "state": "OR"\n  }\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "json-syntax",
      type: "explanation",
      instruction: {
        heading: "JSON Syntax Rules",
        body: `<p>JSON looks a lot like JavaScript objects, but it has <strong>stricter rules</strong>. Getting these wrong is the #1 source of bugs when beginners work with JSON:</p>

<ul>
  <li><strong>Keys must be in double quotes</strong>: <code>"name"</code> is valid, <code>name</code> or <code>'name'</code> is not.</li>
  <li><strong>Strings must use double quotes</strong>: <code>"hello"</code> is valid, <code>'hello'</code> is not.</li>
  <li><strong>No trailing commas</strong>: The last item in an object or array must NOT have a comma after it.</li>
  <li><strong>No comments</strong>: Unlike JavaScript, JSON does not allow <code>//</code> or <code>/* */</code> comments.</li>
  <li><strong>No functions</strong>: JSON can only hold data — strings, numbers, booleans, null, arrays, and objects.</li>
</ul>

<p>The allowed value types are: <code>"string"</code>, <code>42</code> (number), <code>true</code>/<code>false</code> (boolean), <code>null</code>, <code>[arrays]</code>, and <code>{objects}</code>. That's it — no <code>undefined</code>, no functions, no dates, no special JavaScript types.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Common Mistake",
            body: "Using single quotes for keys or values is the most common JSON error. Always use <strong>double quotes</strong>. <code>{'name': 'Alice'}</code> is NOT valid JSON. <code>{\"name\": \"Alice\"}</code> is correct.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// VALID JSON:\n{\n  "name": "Alice",\n  "age": 25,\n  "active": true,\n  "score": null,\n  "tags": ["student", "developer"]\n}\n\n// INVALID JSON (common mistakes):\n{\n  name: "Alice",        // keys not quoted\n  'age': 25,            // single quotes\n  "active": true,       // trailing comma!\n  // this is a comment  // no comments allowed\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "stringify",
      type: "js-console",
      instruction: {
        heading: "JSON.stringify() — Object to Text",
        body: `<p>JavaScript gives you two built-in methods to convert between objects and JSON text. The first is <code>JSON.stringify()</code> — it takes a JavaScript object and converts it into a JSON <strong>string</strong>.</p>

<p>Why would you need this? When you send data to a server (like submitting a form as JSON), you need to convert your JavaScript object into a text string that can travel over the network. <code>JSON.stringify()</code> does exactly that.</p>

<p>Run the code below to see an object converted to a JSON string:</p>`,
        docLinks: [
          {
            label: "JSON.stringify()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode: `const user = { name: "Alice", age: 25 };\nconsole.log(JSON.stringify(user));`,
        expectedOutput: ['{"name":"Alice","age":25}'],
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Just click Run to see how JSON.stringify converts the object to a string.",
        "The output will be the object as a JSON text string with no spaces.",
      ],
    },
    {
      id: "parse",
      type: "js-console",
      instruction: {
        heading: "JSON.parse() — Text to Object",
        body: `<p>The opposite of <code>JSON.stringify()</code> is <code>JSON.parse()</code>. It takes a JSON <strong>string</strong> and converts it back into a JavaScript <strong>object</strong> that you can work with — access properties, loop over arrays, and so on.</p>

<p>This is what you'll use most often with <code>fetch()</code>. The server sends back JSON text, and you need to parse it into a real JavaScript object before you can use it.</p>

<p>Run the code to parse a JSON string and access a property:</p>`,
        docLinks: [
          {
            label: "JSON.parse()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode: `const jsonString = '{"name": "Bob", "score": 42}';\nconst data = JSON.parse(jsonString);\nconsole.log(data.name);`,
        expectedOutput: ["Bob"],
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Run the code as-is to see JSON.parse in action.",
        "JSON.parse converts the text string into a real object, then you can use dot notation to access properties.",
      ],
    },
    {
      id: "gap-fill-json",
      type: "gap-fill",
      instruction: {
        heading: "Fill in the JSON Methods",
        body: `<p>Complete the code below by filling in the correct JSON methods. Remember: <code>stringify</code> converts an object to a string, and <code>parse</code> converts a string to an object.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `const product = { name: "Laptop", price: 999 };\n\n// Convert object to JSON string\nconst jsonText = JSON.{{GAP1}}(product);\nconsole.log(jsonText);\n\n// Convert JSON string back to object\nconst parsed = JSON.{{GAP2}}(jsonText);\nconsole.log(parsed.price);`,
        gaps: [
          {
            id: "GAP1",
            placeholder: "method",
            acceptedAnswers: ["stringify"],
            caseSensitive: true,
          },
          {
            id: "GAP2",
            placeholder: "method",
            acceptedAnswers: ["parse"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "To convert an object INTO a string, you stringify it.",
        "To convert a string INTO an object, you parse it.",
      ],
    },
    {
      id: "practice-roundtrip",
      type: "js-console",
      instruction: {
        heading: "Practice: The Full Round Trip",
        body: `<p>Now try the full cycle yourself. Create an object with a nested property, stringify it, parse it back, and access the nested value. This round-trip pattern is exactly what happens when you send data to a server and receive it back.</p>

<p>Modify the starter code to:</p>
<ol>
  <li>Create an object with a nested <code>address</code> property that has a <code>city</code> field</li>
  <li>Stringify it and store in a variable</li>
  <li>Parse it back and log the city name</li>
</ol>`,
      },
      config: {
        type: "js-console",
        starterCode: `const person = { name: "Charlie", address: { city: "Seattle" } };\nconst jsonText = JSON.stringify(person);\nconst restored = JSON.parse(jsonText);\nconsole.log(restored.address.city);`,
        expectedOutput: ["Seattle"],
      },
      validation: { type: "console-output-match", criteria: {} },
      hints: [
        "Run the starter code to see how nested objects survive the stringify/parse round trip.",
        "The nested object structure is preserved through JSON conversion.",
      ],
    },
  ],
};
