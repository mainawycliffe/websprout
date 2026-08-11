import type { PracticeQuestionSeed } from "@/types/practice";

export const eventQuestions: PracticeQuestionSeed[] = [
  {
    id: "events-prevent-default",
    slug: "why-does-the-page-reload",
    title: "Debug: why does the page reload on submit?",
    topics: ["events", "forms", "debugging"],
    relatedModule: "forms",
    step: {
      id: "events-prevent-default",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Debug: why does the page reload on submit?",
        body: "<p>The handler runs — a <code>console.log</code> inside it appears briefly — but then the page reloads and the logged data vanishes.</p><p>Ask what the browser does with a form submission when nothing tells it otherwise.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'form.addEventListener("submit", (event) => {\n  const data = new FormData(form);\n  sendToApi(data);\n});',
        codeLanguage: "javascript",
        options: [
          {
            id: "prevent-default",
            text: "The form's default action still runs — you need <code>event.preventDefault()</code>",
            correct: true,
            explanation:
              "Correct. Submitting a form navigates the browser by default, which is how forms worked before JavaScript. Your handler runs first, then the navigation happens and throws away the page. <code>event.preventDefault()</code> cancels that default while leaving the event to finish propagating.",
          },
          {
            id: "stop-propagation",
            text: "You need <code>event.stopPropagation()</code>",
            correct: false,
            explanation:
              "That stops the event travelling to <em>other</em> handlers further up the tree. It has no effect on the browser's built-in default action, which is a separate mechanism — a genuinely easy pair to confuse.",
          },
          {
            id: "return-false",
            text: "The handler must <code>return false</code>",
            correct: false,
            explanation:
              "That works in old inline <code>onsubmit=\"…\"</code> attributes and in jQuery, but a return value from an <code>addEventListener</code> callback is ignored entirely.",
          },
          {
            id: "async",
            text: "<code>sendToApi</code> is asynchronous, so the page reloads before it finishes",
            correct: false,
            explanation:
              "The timing is a real consequence, but not the cause — the reload would happen even if <code>sendToApi</code> were instant. Cancel the default and the timing problem disappears with it.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "What did a form do before JavaScript existed?",
        "Your handler is not replacing the browser's behaviour — it runs alongside it.",
      ],
    },
  },

  {
    id: "events-bubbling-order",
    slug: "which-handler-fires-first",
    title: "Which handler fires first?",
    topics: ["events", "bubbling", "propagation"],
    relatedModule: "js-dom",
    step: {
      id: "events-bubbling-order",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Which handler fires first?",
        body: "<p>A button sits inside a div, and both have a click handler. The user clicks the button.</p><p>Work out the order — and note that the third option describes a real mechanism that is simply not the default.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "A DOM event travels in three phases: <strong>capture</strong> from the window down to the target, then the <strong>target</strong> itself, then <strong>bubble</strong> back up. <code>addEventListener</code> listens during bubbling unless you pass <code>{ capture: true }</code>.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'div.addEventListener("click", () => console.log("div"));\nbutton.addEventListener("click", () => console.log("button"));\n\n// <div><button>Click</button></div>',
        codeLanguage: "javascript",
        options: [
          {
            id: "button-div",
            text: "<code>button</code>, then <code>div</code>",
            correct: true,
            explanation:
              "Correct. Both listeners are registered for the bubble phase, which runs from the target outward — so the button (the target) fires first, then the event bubbles to the div. Registration order in the source is irrelevant; position in the DOM tree is what decides.",
          },
          {
            id: "div-button",
            text: "<code>div</code>, then <code>button</code>",
            correct: false,
            explanation:
              "That is the <em>capture</em> order, outermost first. You would get it by registering with <code>{ capture: true }</code>, but that is not the default.",
          },
          {
            id: "registration-order",
            text: "<code>div</code>, then <code>button</code> — because the div's listener was added first",
            correct: false,
            explanation:
              "Registration order only breaks ties between listeners on the <em>same</em> element. Across different elements, tree position and phase decide.",
          },
          {
            id: "button-only",
            text: "Only <code>button</code> — the event stops at the element that was clicked",
            correct: false,
            explanation:
              "Events bubble by default, which is what makes event delegation possible. You would need <code>stopPropagation()</code> to get this behaviour.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Which phase does <code>addEventListener</code> use unless told otherwise?",
        "In that phase, does the event travel inward or outward?",
      ],
    },
  },

  {
    id: "events-target-vs-currenttarget",
    slug: "target-versus-currenttarget",
    title: "target or currentTarget?",
    topics: ["events", "delegation"],
    relatedModule: "js-dom",
    step: {
      id: "events-target-vs-currenttarget",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "target or currentTarget?",
        body: "<p>A delegated listener sits on a list. The user clicks the <code>&lt;span&gt;</code> inside one of the buttons.</p><p>Two properties describe \"the element\" and they disagree here. Work out what each one holds — this is the distinction that makes or breaks a delegated handler.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'list.addEventListener("click", (event) => {\n  console.log(event.target.tagName);\n  console.log(event.currentTarget.tagName);\n});\n\n// <ul id="list"><li><button><span>×</span></button></li></ul>',
        codeLanguage: "javascript",
        options: [
          {
            id: "span-ul",
            text: "<code>SPAN</code>, then <code>UL</code>",
            correct: true,
            explanation:
              "Correct. <code>target</code> is the deepest element the event actually started on — the span the user's pointer was over. <code>currentTarget</code> is whichever element the running listener is attached to, so it is the list. This is exactly why delegated handlers use <code>event.target.closest(\".delete\")</code>: <code>target</code> may be a child of the thing you care about.",
          },
          {
            id: "button-ul",
            text: "<code>BUTTON</code>, then <code>UL</code>",
            correct: false,
            explanation:
              "Reasonable, since the button is what feels clicked — but the browser does not stop at interactive elements. The event originates on the innermost element under the pointer, which is the span.",
          },
          {
            id: "ul-ul",
            text: "<code>UL</code>, then <code>UL</code>",
            correct: false,
            explanation:
              "That would make <code>target</code> useless and delegation impossible — you could never tell which row was clicked.",
          },
          {
            id: "span-span",
            text: "<code>SPAN</code>, then <code>SPAN</code>",
            correct: false,
            explanation:
              "<code>currentTarget</code> is always the element whose listener is currently running, which is the list. It is also why it becomes <code>null</code> if you read it later from an async callback.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "One is about where the event started; the other is about which listener is running.",
        "What is the innermost element under the pointer?",
      ],
    },
  },

  {
    id: "events-debounce",
    slug: "write-debounce",
    title: "Write debounce(fn, wait)",
    topics: ["events", "timers", "performance", "closures"],
    relatedModule: "js-dom",
    step: {
      id: "events-debounce",
      type: "code-challenge",
      difficulty: "advanced",
      instruction: {
        heading: "Write debounce(fn, wait)",
        body: "<p>Write <code>debounce(fn, wait)</code>. It returns a function that delays calling <code>fn</code> until <code>wait</code> milliseconds have passed <strong>with no further calls</strong>. Rapid calls collapse into one, and only the final call's arguments are used.</p><p>This is what stops a search box firing a request on every keystroke.</p><p>The mechanism to work out: each new call has to cancel the previously scheduled one. That means remembering the pending timer somewhere that survives between calls — and clearing it before scheduling the next.</p><p>Note the difference from throttling: debounce waits for the storm to <em>stop</em>, throttle fires at a steady rate <em>during</em> it.</p>",
        analogy:
          "A lift holding its doors. Every new passenger resets the countdown; it only departs once nobody new has arrived for a few seconds.",
        docLinks: [
          {
            label: "MDN: clearTimeout()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout",
            type: "js-method",
          },
          {
            label: "MDN: Closures",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — one timer id, held in the closure",
            body: "Declare <code>let timer;</code> outside the returned function. Every call does <code>clearTimeout(timer)</code> first — harmless when there is nothing pending — then assigns a fresh <code>setTimeout</code>.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "debounce",
        language: "javascript",
        starterCode:
          "function debounce(fn, wait) {\n  // Remember the pending timer here.\n  return function (...args) {\n    // Cancel anything pending, then schedule a fresh call.\n  };\n}\n",
        tests: [
          {
            name: "calls fn after the wait",
            expression:
              "let calls = 0; const d = debounce(() => { calls++; }, 20); d(); await new Promise(r => setTimeout(r, 60)); return calls;",
            expected: 1,
          },
          {
            name: "does not call fn immediately",
            expression: "let calls = 0; const d = debounce(() => { calls++; }, 20); d(); return calls;",
            expected: 0,
          },
          {
            name: "collapses a burst into one call",
            expression:
              "let calls = 0; const d = debounce(() => { calls++; }, 20); d(); d(); d(); await new Promise(r => setTimeout(r, 60)); return calls;",
            expected: 1,
          },
          {
            name: "uses the arguments from the last call",
            expression:
              "let seen; const d = debounce((v) => { seen = v; }, 20); d('first'); d('last'); await new Promise(r => setTimeout(r, 60)); return seen;",
            expected: "last",
          },
          {
            name: "separate calls after the wait each fire",
            expression:
              "let calls = 0; const d = debounce(() => { calls++; }, 20); d(); await new Promise(r => setTimeout(r, 60)); d(); await new Promise(r => setTimeout(r, 60)); return calls;",
            expected: 2,
          },
        ],
        solution:
          "function debounce(fn, wait) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), wait);\n  };\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "<code>let timer;</code> goes inside <code>debounce</code> but outside the returned function.",
        "Every call starts with <code>clearTimeout(timer);</code> — calling it with <code>undefined</code> is safe.",
        "Capture the arguments in the scheduled callback: <code>setTimeout(() =&gt; fn(...args), wait)</code>.",
      ],
    },
  },

  {
    id: "events-once-remove",
    slug: "removing-an-event-listener",
    title: "Why won't this listener come off?",
    topics: ["events", "cleanup", "debugging"],
    relatedModule: "js-dom",
    step: {
      id: "events-once-remove",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Why won't this listener come off?",
        body: "<p><code>removeEventListener</code> runs without error, but the handler keeps firing.</p><p>Look carefully at the two function expressions. They look identical — ask whether that is enough.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'button.addEventListener("click", () => save());\nbutton.removeEventListener("click", () => save());',
        codeLanguage: "javascript",
        options: [
          {
            id: "different-function",
            text: "The two arrow functions are different objects, and removal matches by identity",
            correct: true,
            explanation:
              "Correct. Every arrow function expression creates a <em>new</em> function object, so the one passed to <code>removeEventListener</code> was never registered. Identical source is not identity. Store the handler in a variable and pass that same reference to both calls — or use <code>{ once: true }</code> when it should fire only once, or an <code>AbortController</code> signal to remove several at a stroke.",
          },
          {
            id: "wrong-event",
            text: "You must remove the listener before the event fires",
            correct: false,
            explanation:
              "There is no such ordering rule. A listener can be removed at any point, including from inside its own handler.",
          },
          {
            id: "needs-capture",
            text: "The capture flag must match, and it is missing here",
            correct: false,
            explanation:
              "The capture flag <em>does</em> have to match — a real gotcha worth knowing — but both calls here omit it, so both default to <code>false</code>. The mismatch is in the function reference.",
          },
          {
            id: "arrow-functions",
            text: "Arrow functions cannot be removed; you need <code>function</code> syntax",
            correct: false,
            explanation:
              "Arrow functions remove fine as long as you keep a reference. A <code>function</code> expression written inline twice would fail in exactly the same way.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Are the two arrow functions the same object, or two objects with the same code?",
        "How would <code>removeEventListener</code> know which listener you meant?",
      ],
    },
  },

  {
    id: "events-keyboard-accessibility",
    slug: "clickable-div-accessibility",
    title: "What breaks when a div is the button?",
    topics: ["events", "accessibility", "semantics"],
    relatedModule: "web-accessibility",
    step: {
      id: "events-keyboard-accessibility",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "What breaks when a div is the button?",
        body: "<p>A designer wanted no default styling, so the control is a <code>&lt;div&gt;</code> with a click handler.</p><p><strong>Select everything that is genuinely lost</strong> compared with a real <code>&lt;button&gt;</code>. Each one is something you would have to rebuild by hand.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "A <code>&lt;button&gt;</code> is focusable, activates on both <kbd>Enter</kbd> and <kbd>Space</kbd>, exposes the <em>button</em> role to assistive technology, and can submit a form — all specified behaviour you get for nothing. A <code>&lt;div&gt;</code> has none of it. Resetting its appearance takes one line of CSS; replacing its behaviour takes considerably more.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        codeSnippet: '<div class="btn" onclick="save()">Save</div>',
        codeLanguage: "html",
        options: [
          {
            id: "keyboard",
            text: "Keyboard users cannot reach or activate it",
            correct: true,
            explanation:
              "A <code>div</code> is not in the tab order and does not respond to <kbd>Enter</kbd> or <kbd>Space</kbd>. Restoring this needs <code>tabindex=\"0\"</code> plus a keydown handler that checks for both keys — and remembering that Space scrolls the page by default.",
          },
          {
            id: "screen-reader",
            text: "Screen readers do not announce it as a button",
            correct: true,
            explanation:
              "It is announced as plain text, so a user navigating by controls never finds it. You would need <code>role=\"button\"</code> to restore the semantics.",
          },
          {
            id: "form-submit",
            text: "It cannot submit a form",
            correct: true,
            explanation:
              "A real <code>&lt;button&gt;</code> inside a form submits by default, which also enables submit-on-Enter from a text field. A div can never do this — you would have to call <code>form.requestSubmit()</code> yourself.",
          },
          {
            id: "click-handler",
            text: "The click handler will not fire at all",
            correct: false,
            explanation:
              "It fires perfectly well for mouse and touch users, which is exactly why this bug ships — it works fine for the developer testing it, and fails for everyone navigating by keyboard or screen reader.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Three of the four are genuinely lost. Try reaching the control with the <kbd>Tab</kbd> key.",
        "One option describes something that still works — which is why the problem goes unnoticed.",
      ],
    },
  },
];
