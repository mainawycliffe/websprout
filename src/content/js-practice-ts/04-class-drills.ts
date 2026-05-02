import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-class-drills",
  slug: "class-drills",
  title: "Classes & Inheritance Drills",
  description:
    "Use classes to bundle state with behaviour. Constructors, methods, static, getters, inheritance, and private fields with #.",
  order: 4,
  steps: [
    {
      id: "why-classes",
      type: "explanation",
      instruction: {
        heading: "Why classes exist",
        body: "<p>You can model anything with plain objects and functions — but once a thing has both <em>state</em> and <em>behaviour</em> tied together, classes give you a clean shape for them.</p><p>Real-world examples you have already used:</p><ul><li>Every built-in <code>Error</code> in the browser is a class. <code>TypeError</code>, <code>RangeError</code>, and your own custom errors all <code>extend Error</code>.</li><li>The DOM’s <code>EventTarget</code>, <code>HTMLElement</code>, and <code>HTMLInputElement</code> are a class hierarchy.</li><li>Three.js scenes, React class components, and most game engines are class-heavy.</li></ul><p>This lesson is a tour of the syntax in the order you’ll need it: declaration, methods, <code>static</code>, getters/setters, <code>extends</code>/<code>super</code>, and private fields with <code>#</code>.</p>",
        analogy:
          "A class is a blueprint. The constructor is the assembly line — given some parts (the arguments), it builds an instance with state and methods baked in.",
        docLinks: [
          {
            label: "Classes (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "first-class",
      type: "explanation",
      instruction: {
        heading: "Anatomy of a class",
        body: "<p>A class declaration has three things: a name, a <code>constructor</code> that runs when you call <code>new</code>, and methods. Methods are written without the <code>function</code> keyword and without commas between them.</p><p>Read the demo carefully. We’ll fill in pieces of this exact shape in the next steps.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Class methods are not bound to the instance by default. If you write <code>button.addEventListener(\"click\", counter.inc)</code>, the <code>this</code> inside <code>inc</code> will be the button, not the counter. Either use an arrow method (<code>inc = () =&gt; { ... }</code>) or <code>.bind(this)</code> in the constructor.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "class Counter {\n  constructor(start = 0) {\n    this.value = start;\n  }\n\n  inc() {\n    this.value += 1;\n  }\n\n  reset() {\n    this.value = 0;\n  }\n}\n\nconst c = new Counter();\nc.inc();\nc.inc();\nconsole.log(c.value); // 2",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-counter",
      type: "gap-fill",
      instruction: {
        heading: "Fill in the Counter class",
        body: "<p>Complete the class so the test calls produce the expected output.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'class Counter {\n  {{ctor}}(start = 0) {\n    this.value = start;\n  }\n\n  inc() {\n    this.{{prop}} += 1;\n  }\n}\n\nconst c = {{kw}} Counter(10);\nc.inc();\nc.inc();\nconsole.log(c.value); // 12',
        gaps: [
          { id: "ctor", placeholder: "method name", acceptedAnswers: ["constructor"], caseSensitive: true },
          { id: "prop", placeholder: "property", acceptedAnswers: ["value"], caseSensitive: true },
          { id: "kw", placeholder: "keyword", acceptedAnswers: ["new"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["ctor", "prop", "kw"] } },
      hints: [
        "The setup method runs when you write <code>new Class(...)</code>.",
        "Inside methods, the instance is referenced with <code>this</code>.",
        "Without <code>new</code>, calling a class throws.",
      ],
    },
    {
      id: "static-and-getter",
      type: "js-console",
      instruction: {
        heading: "static and getters",
        body: "<p><strong>Static</strong> methods belong to the class itself, not an instance. They’re for utilities related to the class but that don’t need <code>this</code> — think <code>Math.max</code> or <code>Number.isInteger</code>.</p><p><strong>Getters</strong> let a property be computed on access. <code>circle.area</code> looks like a property but runs a calculation.</p><p>Build a <code>Circle</code> class with a <code>radius</code>, a getter <code>area</code>, and a static method <code>fromDiameter(d)</code> that returns a new Circle.</p>",
        docLinks: [
          {
            label: "static methods (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static",
            type: "js-concept",
          },
          {
            label: "getter (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          'class Circle {\n  constructor(radius) {\n    this.radius = radius;\n  }\n\n  // Add a getter called "area" that returns Math.PI * radius * radius.\n  // Add a static method fromDiameter(d) that returns new Circle(d / 2).\n}\n\nconst small = new Circle(1);\nconsole.log(small.area.toFixed(2)); // "3.14"\n\nconst big = Circle.fromDiameter(20);\nconsole.log(big.radius); // 10',
        expectedOutput: ["3.14", "10"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["3.14", "10"] },
      },
      hints: [
        "Getter syntax: <code>get area() { return Math.PI * this.radius * this.radius; }</code>.",
        "Static syntax: <code>static fromDiameter(d) { return new Circle(d / 2); }</code>.",
        "Notice you call the getter as <code>small.area</code>, not <code>small.area()</code>.",
      ],
    },
    {
      id: "extends-super",
      type: "explanation",
      instruction: {
        heading: "extends and super",
        body: "<p>One class can <code>extend</code> another to inherit its constructor and methods. Inside a subclass constructor, <code>super(...)</code> runs the parent constructor first — you must call it before touching <code>this</code>.</p><p>Read the demo: a <code>Dog</code> extends <code>Animal</code>, calls <code>super(name)</code>, and adds a <code>breed</code>.</p>",
        docLinks: [
          {
            label: "extends (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n\n  speak() {\n    return `${this.name} makes a sound.`;\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name); // call Animal\'s constructor first\n    this.breed = breed;\n  }\n\n  speak() {\n    return `${this.name} (a ${this.breed}) barks.`;\n  }\n}\n\nconst rex = new Dog("Rex", "lab");\nconsole.log(rex.speak()); // "Rex (a lab) barks."',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "private-fields",
      type: "explanation",
      instruction: {
        heading: "Private fields with #",
        body: "<p>A field starting with <code>#</code> is <strong>truly private</strong> — only accessible from inside the class. Reading <code>account.#balance</code> from outside is a syntax error caught by the engine.</p><p>This is a relatively new feature (2022) but it’s in every modern browser. It replaces the convention of leading-underscore names like <code>_balance</code>, which were only private by politeness.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Private fields are part of the ECMAScript spec. They are enforced by the engine, not by TypeScript or a linter — a hostile script cannot reach them with a string key either.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'class Wallet {\n  #balance = 0;\n\n  deposit(amount) {\n    this.#balance += amount;\n  }\n\n  getBalance() {\n    return this.#balance;\n  }\n}\n\nconst w = new Wallet();\nw.deposit(100);\nconsole.log(w.getBalance()); // 100\n// console.log(w.#balance); // SyntaxError outside the class',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-bank-account",
      type: "free-edit",
      instruction: {
        heading: "Build BankAccount and SavingsAccount",
        body: "<p>Put it all together:</p><ul><li><code>BankAccount</code> with a private <code>#balance</code> (starting at <code>0</code>), and methods <code>deposit(amount)</code>, <code>withdraw(amount)</code>, and <code>getBalance()</code>. Throw if a withdrawal exceeds the balance.</li><li><code>SavingsAccount extends BankAccount</code> with an extra method <code>addInterest(rate)</code> that deposits <code>balance * rate</code>.</li></ul><p>The script at the bottom should run without errors and log <code>1100</code>.</p>",
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode:
          'class BankAccount {\n  // private #balance, deposit, withdraw, getBalance\n}\n\nclass SavingsAccount extends BankAccount {\n  // addInterest(rate) deposits balance * rate\n}\n\nconst s = new SavingsAccount();\ns.deposit(1000);\ns.addInterest(0.10);\nconsole.log(s.getBalance()); // 1100',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["class", "extends", "#balance", "super"] },
      },
      hints: [
        "Inside <code>BankAccount</code>: <code>#balance = 0;</code> declares the private field.",
        "<code>withdraw</code> should <code>throw new Error(\"insufficient funds\")</code> when needed.",
        "<code>SavingsAccount</code>’s <code>addInterest</code> can call <code>this.deposit(this.getBalance() * rate)</code> — no need to touch <code>#balance</code> directly (you can’t from a subclass anyway).",
      ],
    },
  ],
};
