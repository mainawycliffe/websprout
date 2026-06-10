import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-spread-and-rest",
  slug: "spread-and-rest",
  title: "Spread and Rest (...)",
  description:
    "Use the ... operator to copy and combine arrays and objects without mutating them — the exact technique React state updates rely on — and to collect extra arguments.",
  order: 3,
  steps: [
    {
      id: "spread-arrays",
      type: "explanation",
      instruction: {
        heading: "Spread: unpack an array into a new one",
        body: `<p>The <strong>spread operator</strong> — three dots <code>...</code> — takes the items inside an array and "spreads" them into a new array. It's the modern way to <em>copy</em> and <em>combine</em> arrays without touching the originals.</p><pre><code>const fruits = ["apple", "mango"];
const more = [...fruits, "lime"];   // a NEW array: apple, mango, lime</code></pre><p>This matters enormously in React. When you update state, you must create a <em>new</em> array rather than changing the old one — and spread is how you do it. Adding a todo is <code>[...todos, newTodo]</code>; the original <code>todos</code> stays untouched.</p>`,
        analogy: `Spreading an array is like emptying a bag of groceries onto the counter and then packing a fresh bag with those items plus a few more. The original bag isn't modified — you built a new one.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — copy, don't mutate",
            body: `<code>[...fruits, "lime"]</code> creates a brand-new array. The original <code>fruits</code> is unchanged. This "make a new copy instead of editing in place" habit is the foundation of how React (and tools like Redux) track changes.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Spread syntax (...)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const fruits = ["apple", "mango"];

const more = [...fruits, "lime"];    // copy + add to the end
console.log(more);                    // ["apple", "mango", "lime"]
console.log(fruits);                  // ["apple", "mango"] — unchanged!

const a = [1, 2];
const b = [3, 4];
console.log([...a, ...b]);            // combine -> [1, 2, 3, 4]`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "spread-objects",
      type: "explanation",
      instruction: {
        heading: "Spread objects: copy and override",
        body: `<p>Spread works on objects too, and this is the pattern you'll use most in React. <code>{ ...user }</code> copies all of <code>user</code>'s properties into a new object. List a property <em>after</em> the spread to override it:</p><pre><code>const upgraded = { ...user, role: "admin" };</code></pre><p>This copies every field from <code>user</code>, then sets <code>role</code> to <code>"admin"</code> — producing a new object while leaving the original alone. Updating React state looks exactly like this: <code>setUser({ ...user, role: "admin" })</code>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — order matters",
            body: `Properties are applied left to right, so a later one wins. <code>{ ...user, role: "admin" }</code> overrides <code>role</code>; <code>{ role: "admin", ...user }</code> would let <code>user</code>'s original role overwrite it. Put your overrides <em>after</em> the spread.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Spread in object literals",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const user = { name: "Ada", role: "member", active: true };

const upgraded = { ...user, role: "admin" };   // copy, then override role
console.log(upgraded);   // { name: "Ada", role: "admin", active: true }
console.log(user);       // unchanged — role is still "member"

// Merge two objects (later wins on conflicts):
const defaults = { theme: "light", fontSize: 14 };
const settings = { ...defaults, theme: "dark" };
console.log(settings);   // { theme: "dark", fontSize: 14 }`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "rest-params",
      type: "explanation",
      instruction: {
        heading: "Rest: collect many arguments into one array",
        body: `<p>The same <code>...</code> syntax does the <em>opposite</em> job in a function's parameter list: it <strong>collects</strong> any number of arguments into a single array. That's a <strong>rest parameter</strong>.</p><pre><code>function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3);        // numbers is [1, 2, 3]  -> 6</code></pre><p>Now your function accepts as many arguments as the caller wants. Spread <em>expands</em> an array; rest <em>gathers</em> values. Same three dots, opposite directions — context tells them apart.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `A rest parameter must be the <strong>last</strong> parameter, and there can be only one. <code>function log(label, ...values)</code> is fine; <code>function log(...values, label)</code> is an error.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Rest parameters",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));          // 6
console.log(sum(10, 20, 30, 40));   // 100
console.log(sum());                 // 0`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "spread-practice",
      type: "free-edit",
      instruction: {
        heading: "Practice: immutable updates",
        body: `<p>This is the single most important habit for React. Given a <code>todos</code> array and a <code>settings</code> object, create <em>new</em> versions without changing the originals:</p><ol><li>Make a new array <code>moreTodos</code> with all of <code>todos</code> plus <code>"Build an app"</code> at the end (use <code>...todos</code>).</li><li>Make a new object <code>darkSettings</code> that copies <code>settings</code> but sets <code>theme</code> to <code>"dark"</code> (use <code>...settings</code>).</li></ol><p>Log all four (both new values and both originals) to prove the originals didn't change.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `If you ever see React state "not updating," the usual cause is mutating the old value (like <code>todos.push(...)</code>) instead of building a new one with spread. New copy = React notices the change.`,
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode: `const todos = ["Learn JS", "Learn React"];
const settings = { theme: "light", fontSize: 14 };

// 1. moreTodos = all todos + "Build an app"  (use ...todos)
// 2. darkSettings = copy of settings with theme "dark"  (use ...settings)

// Then log moreTodos, darkSettings, todos, settings
`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["...todos", "...settings", "console.log"] },
      },
      hints: [
        'Array: <code>const moreTodos = [...todos, "Build an app"];</code>',
        'Object: <code>const darkSettings = { ...settings, theme: "dark" };</code>',
        "Log the originals too — notice they're identical to before.",
      ],
    },
  ],
};
