import type { PracticeQuestionSeed } from "@/types/practice";

export const reactQuestions: PracticeQuestionSeed[] = [
  {
    id: "react-stale-state",
    slug: "why-is-the-count-one-behind",
    title: "Debug: why is the count one behind?",
    topics: ["react", "state", "debugging"],
    relatedModule: "react-fundamentals",
    step: {
      id: "react-stale-state",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: why is the count one behind?",
        body: "<p>The handler calls <code>setCount</code> and then logs. The log always shows the <em>previous</em> value.</p><p>Ask what <code>count</code> refers to inside this particular function call.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "function handleClick() {\n  setCount(count + 1);\n  console.log(count); // still the old value\n}",
        codeLanguage: "javascript",
        options: [
          {
            id: "snapshot",
            text: "<code>count</code> is a constant captured for this render — <code>setCount</code> schedules a re-render rather than mutating the variable",
            correct: true,
            explanation:
              "Correct. Each render produces its own <code>count</code> binding, and the handler closes over the one from the render it was created in. <code>setCount</code> asks React to render again with a new value; it cannot reach back and change the constant this closure already captured. To see the new value, read it in the next render or compute it yourself: <code>const next = count + 1;</code>.",
          },
          {
            id: "async-set",
            text: "<code>setCount</code> is asynchronous, so you must <code>await</code> it",
            correct: false,
            explanation:
              "\"Asynchronous\" is a common shorthand and it does not return a promise — awaiting it does nothing. Even after React re-renders, <em>this</em> function's <code>count</code> never changes, because it is a constant in a closure that has already been created.",
          },
          {
            id: "needs-effect",
            text: "You must read the value inside a <code>useEffect</code>",
            correct: false,
            explanation:
              "An effect would indeed see the new value on the next render, so it works — but it is a heavy way to learn a number you could compute directly, and it adds a render cycle.",
          },
          {
            id: "use-ref",
            text: "State should be a <code>useRef</code> so it updates immediately",
            correct: false,
            explanation:
              "A ref does mutate immediately, but changing one does not trigger a re-render, so the UI would stop updating. Refs are for values the render output does not depend on.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "How many separate <code>count</code> variables exist across several renders?",
        "Can a function reach back and reassign a <code>const</code> it already closed over?",
      ],
    },
  },

  {
    id: "react-key-index",
    slug: "why-not-use-the-index-as-key",
    title: "Why not use the array index as a key?",
    topics: ["react", "lists", "keys"],
    relatedModule: "react-fundamentals",
    step: {
      id: "react-key-index",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Why not use the array index as a key?",
        body: "<p>A to-do list renders with <code>key={index}</code>. Everything looks fine until a row is deleted from the middle, at which point a checkbox appears to \"move\" to the wrong task.</p><p>Work out what React uses keys for, and why an index breaks that.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: "{todos.map((todo, index) => (\n  <TodoRow key={index} todo={todo} />\n))}",
        codeLanguage: "javascript",
        options: [
          {
            id: "identity-shifts",
            text: "Keys tell React which item is which across renders; when an item is removed every later index shifts, so React reuses the wrong component's internal state",
            correct: true,
            explanation:
              "Correct. React matches old and new children by key to decide what to reuse, move or discard. Delete item 0 and what was index 1 becomes index 0 — so React thinks item 0 merely changed its props and keeps its existing DOM and state, including a checked checkbox or a half-typed input. A stable id from the data fixes it. Indexes are safe only when the list is never reordered, filtered or spliced.",
          },
          {
            id: "performance",
            text: "It is purely a performance concern — React re-renders more rows than necessary",
            correct: false,
            explanation:
              "Understates it considerably. Extra renders would be harmless; state landing on the wrong row is a correctness bug users can see.",
          },
          {
            id: "duplicate-keys",
            text: "Indexes are not unique, so React warns about duplicate keys",
            correct: false,
            explanation:
              "Indexes within one list are unique by construction, so no warning appears. The trouble is that they are not <em>stable</em> — the same key refers to different data after a change.",
          },
          {
            id: "must-be-string",
            text: "Keys must be strings, and an index is a number",
            correct: false,
            explanation:
              "Numbers are perfectly acceptable and React converts them internally. The type was never the issue.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Delete the first item. Which key now points at the second item?",
        "What does React do when it sees the same key in the old and new list?",
      ],
    },
  },

  {
    id: "react-effect-dependencies",
    slug: "why-does-this-effect-loop-forever",
    title: "Debug: why does this effect run forever?",
    topics: ["react", "effects", "debugging"],
    relatedModule: "react-fundamentals",
    step: {
      id: "react-effect-dependencies",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Debug: why does this effect run forever?",
        body: "<p>The dependency array is not empty, so this should not run on every render — and yet the network tab fills with requests.</p><p>Ask how React compares the dependencies between renders, and whether the value in the array survives a re-render unchanged.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "const options = { userId };\n\nuseEffect(() => {\n  fetchData(options);\n}, [options]);",
        codeLanguage: "javascript",
        options: [
          {
            id: "new-object-each-render",
            text: "<code>options</code> is a new object every render, and React compares dependencies with <code>Object.is</code>, so it always looks changed",
            correct: true,
            explanation:
              "Correct. The object literal is rebuilt on each render, giving a fresh reference with identical contents — and reference comparison says \"different\", so the effect re-runs, which sets state, which re-renders, and round it goes. Fix it by depending on the primitive (<code>[userId]</code>), or by wrapping the object in <code>useMemo</code>. Depending on primitives is nearly always simpler.",
          },
          {
            id: "missing-cleanup",
            text: "The effect has no cleanup function",
            correct: false,
            explanation:
              "Cleanup matters for subscriptions and for cancelling stale requests, but its absence does not cause re-runs. The effect would run exactly once with a stable dependency, cleanup or not.",
          },
          {
            id: "needs-empty-array",
            text: "The dependency array must be empty to run only once",
            correct: false,
            explanation:
              "An empty array would stop the loop but also stop the effect ever responding to a changed <code>userId</code> — trading a loop for a stale-data bug. The goal is a dependency that is stable when nothing meaningful has changed.",
          },
          {
            id: "deep-compare",
            text: "React deep-compares dependencies, and the nested <code>userId</code> keeps changing",
            correct: false,
            explanation:
              "React does <em>not</em> deep-compare — if it did, this code would work fine. It uses <code>Object.is</code> on each entry, which is why reference identity is what matters.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Is the <code>options</code> object on this render the same object as on the last one?",
        "Does React compare the contents of a dependency, or the reference?",
      ],
    },
  },

  {
    id: "react-controlled-input",
    slug: "why-cant-i-type-in-this-input",
    title: "Debug: why can't I type in this input?",
    topics: ["react", "forms", "state", "debugging"],
    relatedModule: "react-fundamentals",
    step: {
      id: "react-controlled-input",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: why can't I type in this input?",
        body: "<p>The field displays its initial value but refuses every keystroke. No error appears.</p><p>Work out what makes an input \"controlled\" and what that obliges you to provide.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: "const [name, setName] = useState('Ada');\n\nreturn <input value={name} />;",
        codeLanguage: "javascript",
        options: [
          {
            id: "no-onchange",
            text: "Setting <code>value</code> makes it controlled, so React keeps forcing the DOM back to what state says — it needs an <code>onChange</code> that updates state",
            correct: true,
            explanation:
              "Correct. A controlled input must show exactly what state says. Typing does briefly change the DOM value and fire the change event, but nothing updates <code>name</code> — so React restores the value it was given and the keystroke is discarded. (No re-render is even involved: state never changed. React restores it directly.) Adding <code>onChange={e =&gt; setName(e.target.value)}</code> completes the loop. If you want the DOM to own the value instead, use <code>defaultValue</code> for an uncontrolled input.",
          },
          {
            id: "readonly",
            text: "The input needs <code>readOnly={false}</code>",
            correct: false,
            explanation:
              "<code>readOnly</code> already defaults to false, so the input is genuinely editable — the DOM value does change momentarily. React simply overwrites it on the following render.",
          },
          {
            id: "usestate-wrong",
            text: "<code>useState</code> cannot hold a string",
            correct: false,
            explanation:
              "It holds any value at all. The initial string displays correctly, which is proof the state is fine.",
          },
          {
            id: "needs-ref",
            text: "Inputs must be wired with <code>useRef</code>, not state",
            correct: false,
            explanation:
              "A ref is one valid approach — the uncontrolled pattern — but controlled inputs backed by state are the common React idiom, and they work as soon as the handler is supplied.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "What does React render the input's value from, on every single render?",
        "Which half of the loop — display or update — is missing?",
      ],
    },
  },

  {
    id: "react-conditional-zero",
    slug: "why-is-a-zero-rendering",
    title: "Debug: why is a stray 0 on the page?",
    topics: ["react", "jsx", "conditionals", "debugging"],
    relatedModule: "react-fundamentals",
    step: {
      id: "react-conditional-zero",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Debug: why is a stray 0 on the page?",
        body: "<p>When the cart is empty, a bare <code>0</code> appears where the list should be hidden.</p><p>Recall what <code>&&</code> returns — not <code>true</code> or <code>false</code>, but one of its operands — and what React does with each type of value.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: "{items.length && <CartList items={items} />}",
        codeLanguage: "javascript",
        options: [
          {
            id: "zero-renders",
            text: "<code>&&</code> returns the falsy left operand, so React receives <code>0</code> — and React renders <code>0</code> rather than skipping it",
            correct: true,
            explanation:
              "Correct. React skips <code>false</code>, <code>null</code> and <code>undefined</code>, but <code>0</code> is a legitimate number to display, so it appears. The fix is to hand it a real boolean: <code>items.length &gt; 0 && …</code>, or use a ternary with <code>null</code>. This is the most common bug caused by the difference between falsy and boolean.",
          },
          {
            id: "react-bug",
            text: "React should skip all falsy values; this is a known bug",
            correct: false,
            explanation:
              "It is deliberate. Skipping every falsy value would make <code>{count}</code> silently vanish whenever the count was zero — far worse. React only skips the values that clearly mean \"nothing\".",
          },
          {
            id: "needs-fragment",
            text: "The expression needs wrapping in a fragment",
            correct: false,
            explanation:
              "Fragments group sibling elements without adding a DOM node. They have no bearing on what a falsy expression evaluates to.",
          },
          {
            id: "length-undefined",
            text: "<code>items.length</code> is <code>undefined</code>, and React renders that as <code>0</code>",
            correct: false,
            explanation:
              "React renders <code>undefined</code> as nothing at all. The visible <code>0</code> is an actual number — the real length of an empty array.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "What is the value of <code>0 && anything</code>?",
        "Which falsy values does React refuse to render, and is <code>0</code> among them?",
      ],
    },
  },

  {
    id: "react-derived-state",
    slug: "do-i-need-state-for-this",
    title: "Does this need to be state?",
    topics: ["react", "state", "design"],
    relatedModule: "react-fundamentals",
    step: {
      id: "react-derived-state",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Does this need to be state?",
        body: "<p>A component holds a list of items in state, plus a second state holding the filtered subset, kept in sync by an effect.</p><p><strong>Select every statement that is true</strong> about this arrangement.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — if you can calculate it, do not store it",
            body: "Anything derivable from existing state or props should be computed during render, not mirrored into another state variable. Two sources of truth can disagree; one cannot.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        codeSnippet:
          "const [items, setItems] = useState([]);\nconst [visible, setVisible] = useState([]);\n\nuseEffect(() => {\n  setVisible(items.filter((i) => i.active));\n}, [items]);",
        codeLanguage: "javascript",
        options: [
          {
            id: "derive",
            text: "<code>visible</code> should be computed during render instead: <code>const visible = items.filter(…)</code>",
            correct: true,
            explanation:
              "True, and it removes both the second state and the effect. The filtered list is a pure function of <code>items</code>, so recomputing it is cheap, always correct, and impossible to leave stale.",
          },
          {
            id: "extra-render",
            text: "As written, every change to <code>items</code> causes two renders",
            correct: true,
            explanation:
              "True. The first render shows the new items with the <em>old</em> filtered list, then the effect fires and triggers a second render. That intermediate frame is where inconsistent UI briefly appears.",
          },
          {
            id: "needs-memo",
            text: "Computing it during render requires <code>useMemo</code> or it will be slow",
            correct: false,
            explanation:
              "False as a general rule. Filtering a normal list costs far less than an extra render — reach for <code>useMemo</code> only when profiling shows a genuinely expensive computation.",
          },
          {
            id: "effect-required",
            text: "An effect is required because filtering is a side effect",
            correct: false,
            explanation:
              "False. <code>filter</code> is pure — it reads an array and returns a new one, touching nothing outside. Effects are for synchronising with systems <em>outside</em> React, such as the DOM, timers or the network.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two of the four are true. Ask whether <code>visible</code> can ever hold information <code>items</code> does not already contain.",
        "Count the renders caused by one change to <code>items</code>.",
      ],
    },
  },
];
