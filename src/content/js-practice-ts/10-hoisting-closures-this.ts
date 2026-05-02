import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-hoisting-closures-this",
  slug: "hoisting-closures-this",
  title: "Hoisting, Closures, and the this Mystery",
  description:
    "The famous var-in-loop bug, closures as private state, and why this means different things in regular vs arrow functions.",
  order: 10,
  steps: [
    {
      id: "tdz-recap",
      type: "explanation",
      instruction: {
        heading: "Quick recap: TDZ",
        body: "<p>You learned about hoisting and the Temporal Dead Zone in <strong>Function Factory</strong>. Quick refresher:</p><ul><li><code>var</code> declarations are hoisted with <code>undefined</code> — accessing them early returns <code>undefined</code>, no error.</li><li><code>let</code> and <code>const</code> are hoisted but in the TDZ — accessing them early throws a <code>ReferenceError</code>. This is a feature, not a bug — it surfaces mistakes early.</li><li>Function declarations are fully hoisted, body and all.</li></ul><p>This lesson uses that as a stepping stone to two harder topics: closures and <code>this</code>.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "var-loop-bug",
      type: "explanation",
      instruction: {
        heading: "The var-in-loop closure bug",
        body: "<p>This is one of the most famous JavaScript interview questions. It traps roughly half the candidates who haven’t seen it.</p><p>Run the demo. <code>var i</code> is hoisted to function scope, so all three timeouts share the SAME <code>i</code>. By the time they fire, <code>i</code> is already <code>3</code>.</p><p>Switch <code>var</code> to <code>let</code>: each iteration gets its own block-scoped <code>i</code>, captured separately by each closure. Now you get <code>0 1 2</code>.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Pre-2015, the workaround was to wrap the loop body in an immediately invoked function. With <code>let</code> the language solves it for you. This is one of the strongest reasons <code>let</code> exists.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// With var: prints 3 3 3\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n\n// With let: prints 0 1 2\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 0);\n}',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fix-the-loop",
      type: "js-console",
      instruction: {
        heading: "Fix the buggy logger",
        body: "<p>Below, the loop logs <code>3 3 3</code> because of the <code>var</code> bug. Fix it so it logs <code>0 1 2</code> with a one-character change.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          "// BUG: this prints 3 three times.\n// Fix it without changing the loop body.\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
        expectedOutput: ["0", "1", "2"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["0", "1", "2"] },
      },
      hints: [
        "Replace <code>var</code> with <code>let</code>.",
      ],
    },
    {
      id: "closures-explainer",
      type: "explanation",
      instruction: {
        heading: "Closures: a function plus the variables it remembers",
        body: "<p>When a function is created, it holds on to the variables in scope where it was defined. That bundle is a <strong>closure</strong>.</p><p>You use closures every day without naming them: every <code>useState</code> setter in React captures its component instance via a closure. Every event handler that references a local variable is a closure.</p><p>Below is the canonical demo: a counter with truly private state. Nobody outside <code>makeCounter</code> can read or change <code>count</code> — it lives in a closure.</p>",
        docLinks: [
          {
            label: "Closures (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'function makeCounter() {\n  let count = 0;\n  return {\n    inc()   { count += 1; return count; },\n    get()   { return count; },\n    reset() { count = 0; },\n  };\n}\n\nconst c = makeCounter();\nc.inc();\nc.inc();\nconsole.log(c.get()); // 2\n// console.log(c.count); // undefined — private!',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-make-counter",
      type: "js-console",
      instruction: {
        heading: "Build makeCounter from scratch",
        body: "<p>Without scrolling back, write <code>makeCounter()</code> that returns an object with <code>inc()</code>, <code>get()</code>, and <code>reset()</code>. Use a closure variable for the count.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          'function makeCounter() {\n  // your code\n}\n\nconst c = makeCounter();\nc.inc();\nc.inc();\nc.inc();\nconsole.log(c.get()); // 3\nc.reset();\nconsole.log(c.get()); // 0',
        expectedOutput: ["3", "0"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["3", "0"] },
      },
      hints: [
        "Declare <code>let count = 0;</code> inside <code>makeCounter</code>.",
        "Return <code>{ inc, get, reset }</code> as method shorthand.",
      ],
    },
    {
      id: "this-rules",
      type: "explanation",
      instruction: {
        heading: "this: it depends on how you call",
        body: "<p>Inside a <strong>regular function</strong>, <code>this</code> is determined by the <em>call site</em>, not the function itself. Four call patterns:</p><ul><li><code>obj.fn()</code> — <code>this</code> is <code>obj</code>.</li><li><code>fn()</code> — <code>this</code> is <code>undefined</code> (in strict mode; the global object in sloppy mode).</li><li><code>new Fn()</code> — <code>this</code> is the new instance.</li><li><code>fn.call(x)</code> / <code>fn.apply(x)</code> / <code>fn.bind(x)()</code> — <code>this</code> is whatever you pass.</li></ul><p><strong>Arrow functions</strong> are different. They have no <code>this</code> of their own; they inherit it from the surrounding scope when they are defined. That’s why arrow methods are the standard fix for &quot;<code>this</code> is wrong in my event handler&quot;.</p>",
        docLinks: [
          {
            label: "this (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const obj = {\n  name: "Sara",\n  greetRegular() { return `Hi, ${this.name}`; },\n  greetArrow:  () => `Hi, ${this?.name}`, // arrow inherits from outer scope\n};\n\nconsole.log(obj.greetRegular());          // "Hi, Sara"  — this === obj\n\nconst fn = obj.greetRegular;\nconsole.log(fn());                        // "Hi, undefined" — lost this\n\nconsole.log(obj.greetArrow());            // "Hi, undefined" — outer scope\n\nconst bound = obj.greetRegular.bind(obj);\nconsole.log(bound());                     // "Hi, Sara" — bound forever',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "predict-this",
      type: "gap-fill",
      instruction: {
        heading: "Predict the output",
        body: '<p>Given the object below, fill in what each call returns.</p>',
      },
      config: {
        type: "gap-fill",
        template:
          'const counter = {\n  count: 5,\n  show() { return this.count; },\n};\n\ncounter.show();           // returns: {{a}}\nconst f = counter.show;\nf();                      // returns: {{b}}   (TypeError or undefined-like)\nf.call({ count: 99 });    // returns: {{c}}',
        gaps: [
          { id: "a", placeholder: "value", acceptedAnswers: ["5"], caseSensitive: true },
          { id: "b", placeholder: "value", acceptedAnswers: ["undefined", "TypeError", "error"], caseSensitive: false },
          { id: "c", placeholder: "value", acceptedAnswers: ["99"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b", "c"] } },
      hints: [
        "<code>obj.fn()</code> — <code>this</code> is <code>obj</code>.",
        "Bare <code>f()</code> in strict mode — <code>this</code> is <code>undefined</code>, so <code>this.count</code> throws.",
        "<code>f.call(x)</code> binds <code>this</code> to <code>x</code> for that call.",
      ],
    },
    {
      id: "fix-event-handler",
      type: "free-edit",
      instruction: {
        heading: "Fix the broken handler",
        body: "<p>This is a real-world frustration: the <code>handleClick</code> method works when called as <code>btn.handleClick()</code>, but when passed as an event listener it loses <code>this</code>. Fix it. Two acceptable solutions: use <code>.bind(this)</code> in the constructor, or write <code>handleClick</code> as an arrow method.</p>",
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode:
          'class Button {\n  constructor(label) {\n    this.label = label;\n    // FIX: bind handleClick to this here, OR rewrite it as an arrow method below\n  }\n\n  handleClick() {\n    return `Clicked: ${this.label}`;\n  }\n}\n\nconst btn = new Button("Submit");\nconst onClick = btn.handleClick;\n\nconsole.log(onClick()); // "Clicked: Submit"   <-- must work even after detaching',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["this"] },
      },
      hints: [
        "Option 1: in the constructor, <code>this.handleClick = this.handleClick.bind(this);</code>.",
        "Option 2: replace the method with an arrow: <code>handleClick = () =&gt; `Clicked: ${this.label}`;</code>",
      ],
    },
  ],
};
