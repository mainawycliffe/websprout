import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-maps-sets-drills",
  slug: "maps-sets-drills",
  title: "Maps & Sets Drills",
  description:
    "When to reach for Map and Set instead of {} and []. Object keys, dedupe, ordered iteration, and a tiny groupBy.",
  order: 5,
  steps: [
    {
      id: "why-maps-sets",
      type: "explanation",
      instruction: {
        heading: "Why Map and Set exist",
        body: "<p>For years, JavaScript developers used plain objects as dictionaries: <code>const cache = {}; cache[key] = value;</code>. That works for small things, but it has sharp edges:</p><ul><li>Object keys are coerced to strings. <code>{}[1] = \"a\"</code> stores the key as the string <code>\"1\"</code>.</li><li>Objects inherit keys like <code>toString</code> and <code>constructor</code>. Looking up <code>cache.toString</code> gives you a function, not <code>undefined</code>.</li><li>Iteration order is mostly insertion order, but integer-like string keys (<code>\"0\"</code>, <code>\"1\"</code>) are surfaced first, in numeric order. Subtle and surprising.</li></ul><p>ES2015 added <code>Map</code> and <code>Set</code> to fix all of this. Use them whenever you need a real keyed collection or unique-set semantics.</p>",
        docLinks: [
          {
            label: "Map (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
            type: "js-concept",
          },
          {
            label: "Set (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "<code>Map</code> iteration order is guaranteed to be insertion order, full stop. Plain objects iterate string-integer keys (<code>\"0\"</code>, <code>\"1\"</code>) first, then string keys in insertion order, then symbols. Use <code>Map</code> when order matters.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "map-basics",
      type: "explanation",
      instruction: {
        heading: "Map: keyed by anything",
        body: "<p>A <code>Map</code> stores <code>(key, value)</code> pairs. Keys can be objects, numbers, booleans — anything. Use <code>set</code>, <code>get</code>, <code>has</code>, <code>delete</code>, and <code>size</code>.</p><p>Iterating a Map with <code>for...of</code> yields <code>[key, value]</code> pairs in insertion order.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Reach for <code>Map</code> when keys are non-strings (DOM nodes, IDs that might be numbers), when you care about iteration order, or when you need <code>.size</code>. For small string-keyed config, plain objects are still fine.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const visits = new Map();\nvisits.set("home", 12);\nvisits.set("about", 3);\nvisits.set("contact", 7);\n\nconsole.log(visits.get("home"));     // 12\nconsole.log(visits.has("about"));    // true\nconsole.log(visits.size);            // 3\n\nfor (const [page, count] of visits) {\n  console.log(`${page}: ${count}`);\n}\n// home: 12\n// about: 3\n// contact: 7',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "object-keys",
      type: "js-console",
      instruction: {
        heading: "Use a real object as a key",
        body: "<p>This is the headline feature of <code>Map</code>: you can use any value — including objects — as keys. Below, two <code>user</code> objects each get their own visit counter. With a plain <code>{}</code> you’d be stuck stringifying both users to the same <code>[object Object]</code>.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          'const alice = { id: 1, name: "Alice" };\nconst bob = { id: 2, name: "Bob" };\n\nconst visitCount = new Map();\n// Set both users to 0, then increment alice twice and bob once.\n// Print both counts.\n\n\nconsole.log(visitCount.get(alice)); // 2\nconsole.log(visitCount.get(bob));   // 1',
        expectedOutput: ["2", "1"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["2", "1"] },
      },
      hints: [
        "<code>visitCount.set(alice, 0); visitCount.set(bob, 0);</code>",
        "Increment with <code>visitCount.set(alice, visitCount.get(alice) + 1)</code>.",
      ],
    },
    {
      id: "set-dedupe",
      type: "js-console",
      instruction: {
        heading: "Set: unique values",
        body: "<p>A <code>Set</code> holds unique values. The classic one-liner — <code>[...new Set(arr)]</code> — dedupes an array and is used in real codebases all the time.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          'const tags = ["react", "ts", "react", "node", "ts", "next", "react"];\n\n// Dedupe `tags` into an array of unique tags using a Set.\nconst unique = /* your code */;\n\nconsole.log(unique.length); // 4\nconsole.log(unique);        // [ "react", "ts", "node", "next" ]',
        expectedOutput: ["4", '[ "react", "ts", "node", "next" ]'],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["4", '[ "react", "ts", "node", "next" ]'] },
      },
      hints: [
        "<code>new Set(tags)</code> builds a Set of unique values, preserving insertion order.",
        "<code>[...new Set(tags)]</code> spreads it back into an array.",
      ],
    },
    {
      id: "weak-mention",
      type: "explanation",
      instruction: {
        heading: "WeakMap and WeakSet (a one-liner)",
        body: "<p>You may see <code>WeakMap</code> and <code>WeakSet</code> in advanced code. They’re like <code>Map</code> and <code>Set</code>, but their keys (which must be objects) are <em>weakly</em> held — if no other code references the key, the engine can garbage-collect it.</p><p>You don’t need them often. They show up in libraries that want to attach metadata to DOM nodes or class instances without leaking memory. File this away and move on.</p>",
        docLinks: [
          {
            label: "WeakMap (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "group-by",
      type: "free-edit",
      instruction: {
        heading: "Build groupBy(arr, keyFn)",
        body: '<p><code>groupBy</code> takes an array and a function that returns a key for each item, and returns a <code>Map</code> from key to the list of items in that group.</p><p>Example: grouping users by role should produce a <code>Map</code> where <code>map.get("admin")</code> is the array of admins.</p>',
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "There is a built-in <code>Object.groupBy</code> in the latest browsers, but writing your own is the fastest way to internalise the pattern. Lodash, Ramda, and every major utility library ship a version of this.",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode:
          'function groupBy(arr, keyFn) {\n  const result = new Map();\n  // for each item, compute the key, push the item into result.get(key)\n  // (initialise the array if the key is new)\n  return result;\n}\n\nconst users = [\n  { name: "Asha", role: "admin" },\n  { name: "Ben",  role: "user" },\n  { name: "Cleo", role: "admin" },\n  { name: "Dax",  role: "guest" },\n];\n\nconst byRole = groupBy(users, u => u.role);\nconsole.log(byRole.get("admin").length); // 2\nconsole.log(byRole.get("user").length);  // 1\nconsole.log(byRole.get("guest").length); // 1',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["new Map", "keyFn", "set", "push"] },
      },
      hints: [
        "Loop with <code>for (const item of arr)</code>.",
        "Compute <code>const key = keyFn(item);</code>.",
        "If <code>!result.has(key)</code>, do <code>result.set(key, [])</code>. Then <code>result.get(key).push(item)</code>.",
      ],
    },
  ],
};
