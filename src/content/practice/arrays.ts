import type { PracticeQuestionSeed } from "@/types/practice";

export const arrayQuestions: PracticeQuestionSeed[] = [
  {
    id: "arrays-new-vs-mutate",
    slug: "which-array-methods-mutate",
    title: "Which one changes the original array?",
    topics: ["arrays", "mutation"],
    relatedModule: "js-data-types",
    step: {
      id: "arrays-new-vs-mutate",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Which one changes the original array?",
        body: "<p>You have <code>const scores = [3, 1, 2];</code> and you want to keep <code>scores</code> exactly as it is while working with a rearranged copy.</p><p><strong>Select every method below that would modify <code>scores</code> itself</strong> — the ones you would need to avoid. Reason it out from what each method returns: a method that has to give you a new array usually cannot also be rewriting the old one.</p>",
        analogy:
          "A photocopy versus a red pen. Some methods hand you a copy to mark up; others just take a pen to your original.",
        docLinks: [
          {
            label: "MDN: Array methods — copying vs mutating",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "sort",
            text: "<code>scores.sort()</code>",
            correct: true,
            explanation:
              "Mutates. <code>sort</code> rearranges the array in place <em>and</em> returns a reference to that same array — which is exactly why <code>const sorted = scores.sort()</code> fools people: <code>sorted</code> and <code>scores</code> are the same array. Use <code>[...scores].sort()</code> or <code>scores.toSorted()</code> to keep the original.",
          },
          {
            id: "push",
            text: "<code>scores.push(4)</code>",
            correct: true,
            explanation:
              "Mutates. <code>push</code> appends in place and returns the <em>new length</em>, not an array — a good clue that it is not handing you a copy.",
          },
          {
            id: "map",
            text: "<code>scores.map(n =&gt; n * 2)</code>",
            correct: false,
            explanation:
              "Safe. <code>map</code> builds and returns a brand-new array, leaving <code>scores</code> untouched. This is the behaviour you re-implemented by hand if you did the <code>myMap</code> challenge.",
          },
          {
            id: "slice",
            text: "<code>scores.slice(0, 2)</code>",
            correct: false,
            explanation:
              "Safe. <code>slice</code> copies a section into a new array. Its near-twin <code>splice</code> is the mutating one — one letter apart, opposite behaviour, and a very common source of bugs.",
          },
          {
            id: "reverse",
            text: "<code>scores.reverse()</code>",
            correct: true,
            explanation:
              "Mutates, and it is easy to miss because it also returns the array. Same trap as <code>sort</code>: reach for <code>[...scores].reverse()</code> or <code>scores.toReversed()</code>.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Three of the five mutate. Ask what each one <em>returns</em> — a new array, or something else?",
        "<code>push</code> returns a number. <code>sort</code> and <code>reverse</code> return the same array you gave them.",
      ],
    },
  },

  {
    id: "arrays-sum-even",
    slug: "sum-the-even-numbers",
    title: "Sum the even numbers",
    topics: ["arrays", "filter", "reduce"],
    relatedModule: "js-functions",
    step: {
      id: "arrays-sum-even",
      type: "code-challenge",
      difficulty: "intermediate",
      instruction: {
        heading: "Sum the even numbers",
        body: "<p>Write <code>sumEven(numbers)</code>. It takes an array of numbers and returns the total of just the even ones.</p><p>Break the problem in two before you write anything: <strong>which numbers do I keep</strong>, and <strong>how do I add them up</strong>. Solving both at once in a single loop works, but doing it in two named steps is usually the clearer read — and it is what you would reach for on a bigger dataset.</p><p>Think about what should come back for an empty array, and for an array with no even numbers at all. Both cases are tested.</p>",
        docLinks: [
          {
            label: "MDN: Array.prototype.filter()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
            type: "js-method",
          },
          {
            label: "MDN: Array.prototype.reduce()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
            type: "js-method",
          },
          {
            label: "MDN: Remainder (%)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — give reduce a starting value",
            body: "<code>reduce((a, b) =&gt; a + b, 0)</code>. Without that <code>0</code>, reducing an empty array throws <em>Reduce of empty array with no initial value</em> — which is exactly what the empty-array test is checking for.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "sumEven",
        language: "javascript",
        starterCode:
          "function sumEven(numbers) {\n  // 1. Keep only the even numbers (n % 2 === 0).\n  // 2. Add what's left together.\n  // 3. Return the total.\n}\n",
        tests: [
          { name: "adds the even numbers", args: [[1, 2, 3, 4, 5, 6]], expected: 12 },
          { name: "returns 0 when none are even", args: [[1, 3, 5]], expected: 0 },
          { name: "returns 0 for an empty array", args: [[]], expected: 0 },
          { name: "counts zero as even", args: [[0, 1]], expected: 0 },
          { name: "handles negative even numbers", args: [[-2, -3, 4]], expected: 2 },
        ],
        solution:
          "function sumEven(numbers) {\n  return numbers\n    .filter((n) => n % 2 === 0)\n    .reduce((total, n) => total + n, 0);\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "A number is even when <code>n % 2 === 0</code>.",
        "<code>const evens = numbers.filter((n) =&gt; n % 2 === 0);</code>",
        "<code>return evens.reduce((total, n) =&gt; total + n, 0);</code> — the <code>0</code> is what makes the empty case work.",
      ],
    },
  },

  {
    id: "arrays-chunk",
    slug: "split-an-array-into-chunks",
    title: "Split an array into chunks",
    topics: ["arrays", "loops", "slice"],
    relatedModule: "js-flow-control",
    step: {
      id: "arrays-chunk",
      type: "code-challenge",
      difficulty: "advanced",
      instruction: {
        heading: "Split an array into chunks",
        body: "<p>Write <code>chunk(items, size)</code>. It splits an array into groups of <code>size</code> and returns an array of those groups. So <code>chunk([1,2,3,4,5], 2)</code> gives <code>[[1,2],[3,4],[5]]</code>.</p><p>This is the kind of problem worth sketching on paper first. Walk through <code>[1,2,3,4,5]</code> with <code>size = 2</code> by hand and write down which indexes each group starts at. The pattern you find <em>is</em> your loop.</p><p>Then think about the ragged end: the last group is allowed to be short. If your loop only ever emits full groups, you will drop data — and one of the tests is built to catch exactly that.</p>",
        analogy:
          "Seating a party at tables of four. You fill table after table, and the last table takes whoever is left over — even if it is only one person.",
        docLinks: [
          {
            label: "MDN: Array.prototype.slice()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
            type: "js-method",
          },
          {
            label: "MDN: for statement",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — slice clamps for you",
            body: "<code>slice</code> never throws for running past the end: <code>[1,2,3].slice(2, 4)</code> is simply <code>[3]</code>. That is what makes the short final group fall out of the loop for free, with no special case.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "chunk",
        language: "javascript",
        starterCode:
          "function chunk(items, size) {\n  // Walk through items in steps of `size`,\n  // slicing out one group each time.\n}\n",
        tests: [
          { name: "splits evenly", args: [[1, 2, 3, 4], 2], expected: [[1, 2], [3, 4]] },
          { name: "keeps a short final group", args: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
          { name: "a size bigger than the array gives one group", args: [[1, 2], 5], expected: [[1, 2]] },
          { name: "an empty array gives an empty result", args: [[], 3], expected: [] },
          { name: "size 1 gives one group per item", args: [["a", "b"], 1], expected: [["a"], ["b"]] },
          {
            name: "does not mutate the input",
            expression: "const original = [1, 2, 3]; chunk(original, 2); return original;",
            expected: [1, 2, 3],
          },
        ],
        solution:
          "function chunk(items, size) {\n  const groups = [];\n  for (let i = 0; i < items.length; i += size) {\n    groups.push(items.slice(i, i + size));\n  }\n  return groups;\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Step the loop by <code>size</code> rather than by 1: <code>for (let i = 0; i &lt; items.length; i += size)</code>",
        "Each pass takes one group: <code>items.slice(i, i + size)</code>",
        "Push each group into a result array and return it. Because <code>slice</code> clamps at the end, the short last group needs no special handling.",
      ],
    },
  },
];
