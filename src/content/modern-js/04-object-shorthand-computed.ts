import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-object-shorthand-computed",
  slug: "object-shorthand-computed",
  title: "Object Shorthand & Computed Keys",
  description:
    "Write objects with less repetition using property shorthand, and build objects with dynamic keys using computed property names — both everywhere in React.",
  order: 4,
  steps: [
    {
      id: "shorthand",
      type: "explanation",
      instruction: {
        heading: "Property shorthand: stop repeating yourself",
        body: `<p>It's incredibly common to build an object from variables that already have the right names:</p><pre><code>const oldUser = { name: name, role: role };   // repetitive</code></pre><p>When the property name matches the variable name, modern JavaScript lets you write it once. This is <strong>property shorthand</strong>:</p><pre><code>const user = { name, role };   // same thing, no repetition</code></pre><p>You'll see this everywhere: returning data from functions, building props to pass to React components, assembling state. Less typing, less to read, fewer chances to mistype.</p>`,
        analogy: `It's like a name tag that just says your name once. The old way wrote "Name: Name" on every tag; shorthand trusts that "name" already tells you everything.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Shorthand only applies when the key and the variable share a name. <code>{ name }</code> is exactly <code>{ name: name }</code>. If they differ, write it in full: <code>{ fullName: name }</code>.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Object initializer (shorthand)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const name = "Ada";
const role = "admin";

// Old way — repeats each name:
const oldUser = { name: name, role: role };

// Shorthand — when key matches the variable:
const user = { name, role };

console.log(user);      // { name: "Ada", role: "admin" }
console.log(oldUser);   // identical result`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "computed",
      type: "explanation",
      instruction: {
        heading: "Computed keys: a property name from a variable",
        body: `<p>Sometimes you don't know the property name until the code runs — it comes from a variable. Wrap that variable in square brackets <code>[ ]</code> inside the object to use its <em>value</em> as the key. This is a <strong>computed property name</strong>:</p><pre><code>const field = "email";
const update = { [field]: "ada@example.com" };   // key becomes "email"</code></pre><p>This is the secret behind one form handler updating <em>any</em> field. In React you'll write <code>setForm({ ...form, [name]: value })</code> — spread to copy the form, then a computed key to update just the field that changed.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — brackets mean 'use the value'",
            body: `Without brackets, <code>{ field: "x" }</code> creates a property literally named <code>field</code>. With brackets, <code>{ [field]: "x" }</code> uses the <em>value</em> of <code>field</code> (here, <code>"email"</code>) as the key. The brackets are the whole difference.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Computed property names",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const field = "email";
const value = "ada@example.com";

const update = { [field]: value };
console.log(update);   // { email: "ada@example.com" }

// One helper handles ANY field, thanks to the computed key:
function setField(form, name, newValue) {
  return { ...form, [name]: newValue };
}

const form = { email: "", country: "KE" };
console.log(setField(form, "email", "ada@x.com"));
// { email: "ada@x.com", country: "KE" }`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "shorthand-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Use shorthand",
        body: `<p>Build a <code>movie</code> object from the two variables using <strong>property shorthand</strong> — no <code>key: value</code> repetition.</p>`,
      },
      config: {
        type: "gap-fill",
        template: `const title = "Inception";
const year = 2010;

const movie = { {{a}} };
console.log(movie);   // { title: "Inception", year: 2010 }`,
        gaps: [
          {
            id: "a",
            placeholder: "shorthand properties",
            acceptedAnswers: ["title, year", "title,year"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a"] } },
      hints: [
        "Because the variables are already named <code>title</code> and <code>year</code>, just list them: <code>{ title, year }</code>.",
      ],
    },
  ],
};
