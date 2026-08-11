import type { PracticeQuestionSeed } from "@/types/practice";

export const domQuestions: PracticeQuestionSeed[] = [
  {
    id: "dom-query-return-values",
    slug: "queryselector-vs-queryselectorall",
    title: "Why does .textContent fail here?",
    topics: ["dom", "selectors", "debugging"],
    relatedModule: "js-dom",
    step: {
      id: "dom-query-return-values",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Why does .textContent fail here?",
        body: "<p>The heading never updates. Nothing is logged, nothing throws, and there is exactly one element with the class <code>title</code> on the page — so the selector is not the problem.</p><p>The silence is the clue. Work out what the selected value actually <em>is</em>, and what assigning a property to it really does.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const title = document.querySelectorAll(".title");\ntitle.textContent = "Updated";',
        codeLanguage: "javascript",
        options: [
          {
            id: "nodelist",
            text: "<code>querySelectorAll</code> returns a <strong>list</strong>, not an element — even when only one thing matches",
            correct: true,
            explanation:
              "Correct. <code>querySelectorAll</code> always returns a <code>NodeList</code>, which has no <code>textContent</code> to set — so the assignment quietly adds a meaningless property to the list object and no element is touched. That silence is what makes it slippery: no error, no clue. Either use <code>querySelector</code> (singular — the first match, or <code>null</code>), or index in with <code>title[0]</code>. The <code>All</code> suffix is the whole tell.",
          },
          {
            id: "not-found",
            text: "The element does not exist yet, so the selector found nothing",
            correct: false,
            explanation:
              "A fair guess — and a very common real cause of DOM bugs — but not this one. When <code>querySelectorAll</code> finds nothing it returns an <em>empty</em> list rather than <code>null</code>, so the symptom would be identical; here the element genuinely exists and the list is not empty.",
          },
          {
            id: "innertext",
            text: "You have to use <code>innerText</code>; <code>textContent</code> is not a real property",
            correct: false,
            explanation:
              "Both are real. <code>textContent</code> is the standards-based one and returns all text including hidden elements; <code>innerText</code> is layout-aware and slower. Swapping them here changes nothing, because the problem is the object you are setting it on.",
          },
          {
            id: "const",
            text: "<code>title</code> is a <code>const</code>, so it cannot be modified",
            correct: false,
            explanation:
              "<code>const</code> stops you <em>reassigning</em> the variable (<code>title = something</code>). Changing a property <em>on</em> the object it points at is always allowed — that distinction is worth locking in early.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Look closely at the method name. What does the <code>All</code> promise to give you?",
        "Would <code>title[0].textContent</code> work?",
      ],
    },
  },

  {
    id: "dom-listener-timing",
    slug: "listener-added-before-element-exists",
    title: "Debug: the button does nothing",
    topics: ["dom", "events", "debugging", "script loading"],
    relatedModule: "js-dom",
    step: {
      id: "dom-listener-timing",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: the button does nothing",
        body: "<p>Clicking the button does nothing, and the console shows <em>Cannot read properties of null</em>. The selector matches the button's real id, and the JavaScript file definitely loads.</p><p>Look at the <em>order</em> in which the browser works through this document, not just at whether each piece is correct in isolation.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          '<head>\n  <script src="app.js"></script>\n</head>\n<body>\n  <button id="save">Save</button>\n</body>\n\n// app.js\ndocument.getElementById("save")\n  .addEventListener("click", handleSave);',
        codeLanguage: "html",
        options: [
          {
            id: "parse-order",
            text: "The script runs while the browser is still in <code>&lt;head&gt;</code>, before the button has been parsed — so <code>getElementById</code> returns <code>null</code>",
            correct: true,
            explanation:
              "Correct. The browser builds the page top to bottom, and a plain <code>&lt;script&gt;</code> blocks parsing and runs immediately. At that moment <code>&lt;body&gt;</code> does not exist yet, so there is no button to find. Three standard fixes: move the tag to the end of <code>&lt;body&gt;</code>, add <code>defer</code>, or wrap the code in a <code>DOMContentLoaded</code> listener. <code>defer</code> is usually the best of the three — it keeps the script in <code>&lt;head&gt;</code> while running it after parsing.",
          },
          {
            id: "wrong-event",
            text: '<code>"click"</code> is the wrong event name for a button',
            correct: false,
            explanation:
              "<code>click</code> is exactly right, and it fires for keyboard activation too — one of the good reasons to use a real <code>&lt;button&gt;</code>. In any case the error happens on the line <em>before</em> the event name is ever considered.",
          },
          {
            id: "async-needed",
            text: "The script needs <code>async</code> so it does not block the page",
            correct: false,
            explanation:
              "<code>async</code> makes the download non-blocking, but it can still execute <em>before</em> parsing finishes — sometimes even earlier than it does now. It is the wrong tool here; <code>defer</code> is the one that guarantees the DOM is ready.",
          },
          {
            id: "id-hash",
            text: 'You need <code>getElementById("#save")</code> with the hash',
            correct: false,
            explanation:
              "Careful — that is a real distinction, just not this bug. <code>getElementById</code> takes a bare id; the <code>#</code> belongs to <code>querySelector</code>, which takes a CSS selector. Adding the hash here would break code that currently finds the element fine once timing is fixed.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "The error is <em>null</em>, which means the lookup ran but found nothing. Ask <em>when</em> it ran.",
        "Trace the browser's path through the document: head first, then body.",
      ],
    },
  },

  {
    id: "dom-delegation",
    slug: "listeners-on-elements-added-later",
    title: "New rows ignore the click handler",
    topics: ["dom", "events", "delegation", "bubbling"],
    relatedModule: "js-dom",
    step: {
      id: "dom-delegation",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "New rows ignore the click handler",
        body: "<p>A to-do list attaches a delete handler to every <code>.delete</code> button on load. It works — until the user adds a new item, whose delete button does nothing. The script has not errored and has not re-run.</p><p><strong>Select every approach that would genuinely fix this.</strong> Three of the four work, and they are not equally good — read every explanation, including for the ones you did not pick, to see which you would actually reach for and why.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Most DOM events <em>bubble</em>: a click on a button fires on that button, then on its parent, then its parent's parent, all the way up. Event delegation is built directly on this guarantee, which is why it works for elements that did not exist when you attached the listener.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        codeSnippet:
          'document.querySelectorAll(".delete").forEach((btn) => {\n  btn.addEventListener("click", removeRow);\n});\n\n// Later: a new <li> with a .delete button is appended.\n// Its button does nothing.',
        codeLanguage: "javascript",
        options: [
          {
            id: "delegate",
            text: "Attach one listener to the parent <code>&lt;ul&gt;</code> and check <code>event.target.closest(\".delete\")</code> inside it",
            correct: true,
            explanation:
              "This is event delegation, and it is the right answer. One listener on a container that already exists catches clicks from any descendant, including ones added later, because the event bubbles up to it. It also scales better — one listener instead of hundreds. Use <code>closest</code> rather than checking <code>target</code> directly so a click on an icon <em>inside</em> the button still matches.",
          },
          {
            id: "attach-on-create",
            text: "Call <code>addEventListener</code> on the new button at the moment you create it",
            correct: true,
            explanation:
              "This genuinely works, and for a single well-defined creation point it is perfectly reasonable. The catch is discipline: every future code path that creates a row must remember to do it, and the day one forgets, you get this exact bug back. Delegation removes that requirement entirely.",
          },
          {
            id: "rerun-query",
            text: "Re-run the original <code>querySelectorAll</code> loop after adding each row",
            correct: true,
            explanation:
              "This does work, for a reason worth knowing: <code>addEventListener</code> <strong>discards a duplicate</strong> when the type, the callback and the capture flag all match an existing registration. The loop passes the same <code>removeRow</code> reference every time, so re-running it attaches to the new button and is a no-op for the rest — no double-firing. The catch is that this protection vanishes the moment the callback is written inline, since <code>(e) =&gt; removeRow(e)</code> is a new function object each pass and <em>would</em> stack up. It is also O(n) work on every insertion.",
          },
          {
            id: "stop-propagation",
            text: "Add <code>event.stopPropagation()</code> to the handler",
            correct: false,
            explanation:
              "This is the opposite of what you need. <code>stopPropagation</code> halts bubbling — it would <em>break</em> a delegated listener further up. It solves a different problem (an outer handler firing when you did not want it to).",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "<code>addEventListener</code> attaches to the specific elements that exist at that moment. Nothing retroactively applies it to future ones.",
        "Three of the four work. One relies on a container that already exists; another relies on you never forgetting a step. The remaining wrong answer would break bubbling rather than use it.",
      ],
    },
  },
];
