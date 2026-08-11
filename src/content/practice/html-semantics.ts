import type { PracticeQuestionSeed } from "@/types/practice";

export const htmlSemanticsQuestions: PracticeQuestionSeed[] = [
  {
    id: "html-button-vs-link",
    slug: "button-or-link",
    title: "Button or link?",
    topics: ["html-semantics", "accessibility"],
    relatedModule: "web-accessibility",
    step: {
      id: "html-button-vs-link",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Button or link?",
        body: "<p>They can be styled to look identical, so the choice has to come from behaviour rather than appearance.</p><p><strong>Select every case that should be a <code>&lt;button&gt;</code></strong> rather than an <code>&lt;a&gt;</code>.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The rule is about destination: a link <strong>navigates</strong> to a URL, a button <strong>acts</strong> on the current page. It is not cosmetic — links can be opened in a new tab, copied and bookmarked, and screen-reader users can list all links on a page. A button offers none of that, and rightly so.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "open-modal",
            text: "Opens a dialog on the current page",
            correct: true,
            explanation:
              "Button. Nothing is navigated to, so there is no URL to give a link. Using <code>&lt;a href=\"#\"&gt;</code> here adds a stray history entry and lets users pointlessly open it in a new tab.",
          },
          {
            id: "submit-form",
            text: "Submits a form",
            correct: true,
            explanation:
              "Button — specifically <code>&lt;button type=\"submit\"&gt;</code>. It also enables the expected behaviour of pressing <kbd>Enter</kbd> in a text field to submit.",
          },
          {
            id: "go-to-about",
            text: "Takes the user to the About page",
            correct: false,
            explanation:
              "Link. There is a real destination, so users should be able to middle-click it, copy the address and see it in their history.",
          },
          {
            id: "toggle-theme",
            text: "Toggles dark mode",
            correct: true,
            explanation:
              "Button. It changes state on the page you are already on. A common mistake is <code>&lt;a href=\"#\"&gt;</code>, which jumps to the top of the page as a side effect.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Ask whether there is a URL the user could sensibly bookmark.",
        "Three of the four act on the current page.",
      ],
    },
  },

  {
    id: "html-heading-order",
    slug: "why-not-skip-heading-levels",
    title: "Why does skipping heading levels matter?",
    topics: ["html-semantics", "accessibility", "structure"],
    relatedModule: "web-accessibility",
    step: {
      id: "html-heading-order",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Why does skipping heading levels matter?",
        body: "<p>A developer wants smaller text under the page title, so they use an <code>&lt;h4&gt;</code> straight after the <code>&lt;h1&gt;</code>.</p><p>Work out what is genuinely harmed here — and what the correct fix is.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: "<h1>Annual Report</h1>\n<h4>Summary</h4>",
        codeLanguage: "html",
        options: [
          {
            id: "outline-broken",
            text: "Headings form a document outline that assistive tech navigates by; a gap implies two missing levels of structure",
            correct: true,
            explanation:
              "Correct. Screen-reader users routinely jump heading to heading to survey a page, and the levels tell them how sections nest. Skipping from 1 to 4 suggests two intermediate sections that do not exist, so the structure reads as broken. The fix is to use the correct level for the <em>structure</em> and set the size in CSS — the two concerns are independent.",
          },
          {
            id: "seo-only",
            text: "It only affects SEO ranking",
            correct: false,
            explanation:
              "Search engines do read structure, but the real cost is to users navigating by headings right now. Framing this as an SEO issue understates it.",
          },
          {
            id: "invalid-html",
            text: "It is invalid HTML and will fail validation",
            correct: false,
            explanation:
              "It validates fine — the HTML spec does not require sequential levels. It is an accessibility guideline rather than a syntax rule, which is exactly why validators do not catch it.",
          },
          {
            id: "rendering",
            text: "Browsers will render the <code>h4</code> at <code>h2</code> size to compensate",
            correct: false,
            explanation:
              "Browsers apply each level's own default size and never renumber anything. What you write is what you get visually — and structurally.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "How does a screen-reader user get an overview of a long page?",
        "If the goal is smaller text, which language should express that — HTML or CSS?",
      ],
    },
  },

  {
    id: "html-alt-text",
    slug: "what-alt-text-for-this-image",
    title: "What alt text does this image need?",
    topics: ["html-semantics", "accessibility", "images"],
    relatedModule: "web-accessibility",
    step: {
      id: "html-alt-text",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "What alt text does this image need?",
        body: "<p>A company logo sits inside a link back to the homepage. There is no other text in the link.</p><p>Alt text describes <em>purpose</em>, not appearance — and inside a link the purpose is the link's destination.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: '<a href="/">\n  <img src="logo.svg" alt="???">\n</a>',
        codeLanguage: "html",
        options: [
          {
            id: "home",
            text: '<code>alt="Acme home"</code>',
            correct: true,
            explanation:
              "Correct. The image is the only content of the link, so its alt text becomes the link's accessible name — and a link's name should say where it goes. Describing the artwork would leave the user knowing there is a logo but not what activating it does.",
          },
          {
            id: "logo",
            text: '<code>alt="Acme logo"</code>',
            correct: false,
            explanation:
              "This is the instinctive answer and the most common mistake. It describes the picture rather than the link, so a screen-reader user hears \"Acme logo, link\" and has to guess the destination. Outside a link it would be fine.",
          },
          {
            id: "empty",
            text: '<code>alt=""</code>',
            correct: false,
            explanation:
              "An empty alt is right for purely decorative images — it tells assistive tech to skip them. Here it would leave the link with no accessible name at all, so it is announced as just \"link\".",
          },
          {
            id: "description",
            text: '<code>alt="Blue circular logo with a stylised A"</code>',
            correct: false,
            explanation:
              "Describes appearance in detail that does not help anyone act. Visual description is only the goal when the image's content <em>is</em> the information, such as a chart or a photograph being discussed.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "If the image is the only thing in the link, whose name does its alt text become?",
        "What does a user need to know before deciding whether to activate a link?",
      ],
    },
  },

  {
    id: "html-section-vs-div",
    slug: "section-or-div",
    title: "section or div?",
    topics: ["html-semantics", "structure"],
    relatedModule: "tag-builder",
    step: {
      id: "html-section-vs-div",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "section or div?",
        body: "<p>Semantic elements are not automatically better — used wrongly they add noise for assistive technology.</p><p>Work out the actual rule for reaching past <code>&lt;div&gt;</code>.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        options: [
          {
            id: "needs-heading",
            text: "Use <code>&lt;section&gt;</code> for a thematic grouping that has its own heading; use <code>&lt;div&gt;</code> when the element exists purely for styling or layout",
            correct: true,
            explanation:
              "Correct. <code>&lt;section&gt;</code> is a landmark in the document outline, and a landmark with no heading is a section a user cannot identify. If you cannot write a sensible heading for it, it is a <code>&lt;div&gt;</code> — and there is nothing wrong with that. A flex wrapper is a <code>&lt;div&gt;</code>.",
          },
          {
            id: "always-section",
            text: "Always prefer <code>&lt;section&gt;</code>; <code>&lt;div&gt;</code> is deprecated",
            correct: false,
            explanation:
              "<code>&lt;div&gt;</code> is not deprecated and remains the correct choice for non-semantic grouping. Blanket <code>&lt;section&gt;</code> use produces a page full of unnamed landmarks, which is worse for screen-reader users than plain divs.",
          },
          {
            id: "styling",
            text: "<code>&lt;section&gt;</code> when you need padding or a background, <code>&lt;div&gt;</code> otherwise",
            correct: false,
            explanation:
              "Both accept identical CSS, so appearance cannot be the deciding factor. The choice is about meaning.",
          },
          {
            id: "nesting",
            text: "<code>&lt;section&gt;</code> can be nested; <code>&lt;div&gt;</code> cannot",
            correct: false,
            explanation:
              "Both nest freely. Nested sections are common in long documents, and nested divs are the everyday reality of layout.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "One of these elements appears in the document outline. What does an entry in an outline need?",
        "Would a flex wrapper around two buttons pass that test?",
      ],
    },
  },

  {
    id: "html-label-association",
    slug: "why-does-clicking-the-label-do-nothing",
    title: "Debug: clicking the label doesn't focus the input",
    topics: ["html-semantics", "forms", "accessibility", "debugging"],
    relatedModule: "forms",
    step: {
      id: "html-label-association",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: clicking the label doesn't focus the input",
        body: "<p>A working label focuses its field when clicked and is announced with the field by screen readers. This one does neither.</p><p>Look at what connects the two elements — or fails to.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: '<label for="email">Email</label>\n<input type="text" name="email">',
        codeLanguage: "html",
        options: [
          {
            id: "id-missing",
            text: "<code>for</code> points at an <code>id</code>, and the input has only a <code>name</code> — add <code>id=\"email\"</code>",
            correct: true,
            explanation:
              "Correct. <code>for</code> matches the target's <code>id</code>, and <code>name</code> is a different attribute entirely — it is what gets submitted with the form. They often hold the same string, which is exactly why this is missed. The alternative is to wrap the input inside the label, which needs no attributes at all.",
          },
          {
            id: "for-name",
            text: "<code>for</code> should be spelled <code>htmlFor</code>",
            correct: false,
            explanation:
              "<code>htmlFor</code> is the React/JSX spelling, needed because <code>for</code> is a reserved word in JavaScript. In plain HTML the attribute is <code>for</code>.",
          },
          {
            id: "type-wrong",
            text: 'The input needs <code>type="email"</code>',
            correct: false,
            explanation:
              "That improves validation and the mobile keyboard, and is worth doing — but label association works with any input type, so it is unrelated to this bug.",
          },
          {
            id: "aria-needed",
            text: 'You must add <code>aria-label="Email"</code> instead',
            correct: false,
            explanation:
              "An <code>aria-label</code> would give the input an accessible name, but it would not restore the click-to-focus behaviour, and it duplicates the visible text. A correctly wired <code>&lt;label&gt;</code> is better than ARIA here — the first rule of ARIA is to use the native element where one exists.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Which attribute does <code>for</code> look for on the target element?",
        "The input has a <code>name</code>. Is that the same thing?",
      ],
    },
  },

  {
    id: "html-list-markup",
    slug: "which-list-element",
    title: "Which list element belongs here?",
    topics: ["html-semantics", "lists"],
    relatedModule: "tag-builder",
    step: {
      id: "html-list-markup",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Which list element belongs here?",
        body: "<p>You are marking up a recipe's steps, which must be followed in order.</p><p>Pick the element whose meaning matches, and note why the visual styling is not the deciding factor.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        options: [
          {
            id: "ol",
            text: "<code>&lt;ol&gt;</code> with <code>&lt;li&gt;</code> for each step",
            correct: true,
            explanation:
              "Correct. <code>&lt;ol&gt;</code> means the order is meaningful, which is exactly true of recipe steps — and assistive technology announces the position (\"3 of 7\"), which genuinely helps someone cooking. You can restyle or hide the numbers in CSS without losing that meaning.",
          },
          {
            id: "ul",
            text: "<code>&lt;ul&gt;</code>, then add numbers with CSS counters",
            correct: false,
            explanation:
              "This would look identical and mean the wrong thing. <code>&lt;ul&gt;</code> declares the order to be irrelevant, and CSS-generated numbers are not reliably announced — so a screen-reader user is told the sequence does not matter when it very much does.",
          },
          {
            id: "divs",
            text: "A <code>&lt;div&gt;</code> per step with a number typed into the text",
            correct: false,
            explanation:
              "This loses the list semantics entirely — no item count, no way to jump between items — and hardcoded numbers have to be renumbered by hand whenever a step is inserted.",
          },
          {
            id: "dl",
            text: "<code>&lt;dl&gt;</code> with each step as a term and description",
            correct: false,
            explanation:
              "A description list pairs terms with definitions — glossaries, metadata, key/value pairs. Recipe steps are a plain ordered sequence with no term to define.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Does the order of the items carry meaning?",
        "Two options render the same. Which one <em>says</em> the right thing?",
      ],
    },
  },
];
