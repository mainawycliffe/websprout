import type { PracticeQuestionSeed } from "@/types/practice";

export const accessibilityQuestions: PracticeQuestionSeed[] = [
  {
    id: "a11y-hiding-content",
    slug: "how-to-hide-content-from-screen-readers",
    title: "Which way of hiding is right?",
    topics: ["accessibility", "css", "screen readers"],
    relatedModule: "web-accessibility",
    step: {
      id: "a11y-hiding-content",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Which way of hiding is right?",
        body: "<p>You want text that is <strong>invisible on screen but still read by screen readers</strong> — the classic \"skip to content\" link or a label for an icon-only button.</p><p>Each option below hides content in a different sense. Pick the one that hides it visually only.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        options: [
          {
            id: "sr-only",
            text: "A visually-hidden utility: <code>position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%);</code>",
            correct: true,
            explanation:
              "Correct. The element stays in the accessibility tree and is announced normally, but occupies a 1px clipped box nobody can see. This is what Tailwind's <code>sr-only</code> and Bootstrap's <code>visually-hidden</code> compile to. Keep <code>width</code> and <code>height</code> at 1px rather than 0 — some screen readers skip genuinely zero-sized elements.",
          },
          {
            id: "display-none",
            text: "<code>display: none</code>",
            correct: false,
            explanation:
              "Removes the element from the accessibility tree entirely, so screen readers do not announce it either. That is the right choice for content nobody should reach yet, and the wrong one here.",
          },
          {
            id: "opacity",
            text: "<code>opacity: 0</code>",
            correct: false,
            explanation:
              "It is still announced, so it half works — but the element keeps its full size and stays clickable, so it leaves an invisible box that pushes layout around and can swallow clicks.",
          },
          {
            id: "aria-hidden",
            text: '<code>aria-hidden="true"</code>',
            correct: false,
            explanation:
              "Exactly backwards: this hides content from assistive technology while leaving it visible on screen. It is right for decorative icons that sit beside real text, not for text meant to be heard.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two of these remove the content from screen readers — rule those out first.",
        "Of the remaining two, which one also stops the element affecting layout?",
      ],
    },
  },

  {
    id: "a11y-colour-contrast",
    slug: "is-this-contrast-good-enough",
    title: "Is this contrast good enough?",
    topics: ["accessibility", "colour", "wcag"],
    relatedModule: "web-accessibility",
    step: {
      id: "a11y-colour-contrast",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Is this contrast good enough?",
        body: "<p>WCAG sets minimum contrast ratios, and the threshold depends on the text size.</p><p><strong>Select every statement that is true</strong> about the AA level requirements.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.1 level AA requires a contrast ratio of at least <strong>4.5:1</strong> for normal text and <strong>3:1</strong> for large text — 18.66px bold or 24px regular and above. Non-text UI such as input borders and focus indicators also needs 3:1.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "normal-45",
            text: "Normal body text needs at least 4.5:1 against its background",
            correct: true,
            explanation:
              "True — this is the core AA requirement, and the one most often missed by light grey placeholder text on white.",
          },
          {
            id: "large-3",
            text: "Large text needs only 3:1",
            correct: true,
            explanation:
              "True. Larger glyphs have thicker strokes and stay legible at lower contrast, so headings get a lower bar. \"Large\" means at least 24px, or 18.66px if bold.",
          },
          {
            id: "icons-exempt",
            text: "Icons and input borders are exempt because they are not text",
            correct: false,
            explanation:
              "False. WCAG 1.4.11 requires 3:1 for non-text content that conveys meaning, which covers icon buttons, input borders and focus indicators. A focus ring nobody can see fails the criterion it exists to satisfy.",
          },
          {
            id: "colour-alone",
            text: "Meeting the ratio means you may use colour alone to convey meaning",
            correct: false,
            explanation:
              "False, and these are separate criteria. Contrast is 1.4.3; using colour alone is 1.4.1. A red-only error message with perfect contrast still fails, because a colour-blind user cannot tell it apart from ordinary text — add an icon or wording.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two of the four are true, and both are about ratios.",
        "Does the standard say anything about non-text elements like borders?",
      ],
    },
  },

  {
    id: "a11y-aria-first-rule",
    slug: "when-should-you-add-aria",
    title: "When should you reach for ARIA?",
    topics: ["accessibility", "aria", "semantics"],
    relatedModule: "web-accessibility",
    step: {
      id: "a11y-aria-first-rule",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "When should you reach for ARIA?",
        body: "<p>ARIA attributes can describe roles, states and relationships that HTML cannot express — but they are also a common way to make a page <em>less</em> accessible.</p><p>Work out the guiding principle.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: '<div role="button" tabindex="0" onclick="save()">Save</div>\n<button onclick="save()">Save</button>',
        codeLanguage: "html",
        options: [
          {
            id: "native-first",
            text: "Use the native element when one exists; reach for ARIA only when no HTML element expresses what you need",
            correct: true,
            explanation:
              "Correct — this is the first rule of ARIA. The <code>&lt;button&gt;</code> is focusable, keyboard-operable and correctly announced with no attributes at all. The <code>div</code> version needs <code>role</code>, <code>tabindex</code>, and a keydown handler for <kbd>Enter</kbd> and <kbd>Space</kbd> just to reach parity — three chances to get it wrong. ARIA earns its place for things HTML lacks, like <code>aria-live</code> regions and <code>aria-expanded</code>.",
          },
          {
            id: "always-aria",
            text: "Add ARIA roles to every element, since more information always helps",
            correct: false,
            explanation:
              "Redundant roles can actively harm — <code>&lt;button role=\"button\"&gt;</code> is noise, and a wrong role overrides correct native semantics. \"No ARIA is better than bad ARIA\" is the standing advice.",
          },
          {
            id: "aria-replaces",
            text: "<code>role=\"button\"</code> makes a div fully keyboard accessible",
            correct: false,
            explanation:
              "A role only changes how the element is <em>announced</em>. It adds no behaviour whatsoever — no focusability, no keyboard activation. That is precisely why the div version also needs <code>tabindex</code> and key handlers.",
          },
          {
            id: "only-spa",
            text: "ARIA is only needed in single-page apps",
            correct: false,
            explanation:
              "Framework choice is irrelevant. What matters is whether native HTML already expresses the semantics — and SPAs do have more custom widgets, which is a reason for care, not a special rule.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Count what you have to add to the div to match the button.",
        "Does a <code>role</code> attribute change behaviour, or only how the element is described?",
      ],
    },
  },

  {
    id: "a11y-focus-visible",
    slug: "removing-the-focus-outline",
    title: "Is outline: none ever acceptable?",
    topics: ["accessibility", "focus", "css"],
    relatedModule: "web-accessibility",
    step: {
      id: "a11y-focus-visible",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Is outline: none ever acceptable?",
        body: "<p>A designer objects to the focus ring appearing when a button is clicked with a mouse.</p><p>Work out how to satisfy that without stranding keyboard users, who need a visible indicator to know where they are.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        options: [
          {
            id: "focus-visible",
            text: "Use <code>:focus-visible</code>, which the browser applies only when it judges a visible indicator is needed — typically keyboard focus, not mouse clicks",
            correct: true,
            explanation:
              "Correct, and it is the answer this whole argument was waiting for. The browser applies <code>:focus-visible</code> using its own heuristic, so a mouse click gets no ring while <kbd>Tab</kbd> does. Style <code>:focus-visible</code> and everyone is served. If you must reset, pair it: <code>:focus { outline: none } :focus-visible { outline: 2px solid }</code>.",
          },
          {
            id: "outline-none",
            text: "Set <code>outline: none</code> on everything — most users navigate with a mouse",
            correct: false,
            explanation:
              "This strands keyboard and switch users with no way to tell where focus is, and fails WCAG 2.4.7. \"Most users\" is not a standard the rest can be excluded by.",
          },
          {
            id: "outline-none-hover",
            text: "Remove the outline and show a hover style instead",
            correct: false,
            explanation:
              "Hover requires a pointer, so it never fires for keyboard navigation. It is not a substitute for a focus indicator.",
          },
          {
            id: "tabindex-minus",
            text: "Set <code>tabindex=\"-1\"</code> so the element cannot be focused by keyboard",
            correct: false,
            explanation:
              "This removes the button from the tab order entirely, making it unreachable by keyboard. It solves the visual complaint by breaking the control.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Is there a pseudo-class that distinguishes keyboard focus from mouse focus?",
        "Any answer that makes focus invisible for keyboard users is wrong.",
      ],
    },
  },

  {
    id: "a11y-live-region",
    slug: "announcing-dynamic-updates",
    title: "How do you announce a dynamic update?",
    topics: ["accessibility", "aria", "dynamic content"],
    relatedModule: "web-accessibility",
    step: {
      id: "a11y-live-region",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "How do you announce a dynamic update?",
        body: "<p>A form shows \"Saved\" beneath the button after an async request. Sighted users see it appear; screen-reader users are told nothing, because focus never moved.</p><p>Work out which mechanism informs them without stealing focus.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: '<p id="status"></p>\n\n// status.textContent = "Saved";',
        codeLanguage: "html",
        options: [
          {
            id: "aria-live",
            text: 'Add <code>aria-live="polite"</code> to the status element so changes are announced when the user is idle',
            correct: true,
            explanation:
              "Correct. A live region tells assistive technology to watch that element and announce changes without moving focus. <code>polite</code> waits for a pause in speech; <code>assertive</code> interrupts and should be reserved for genuine emergencies. Note the container must exist in the DOM <em>before</em> the text changes — adding the element and its text together often goes unannounced.",
          },
          {
            id: "focus-status",
            text: "Move focus to the status element with <code>status.focus()</code>",
            correct: false,
            explanation:
              "This does announce the text, but yanking focus away from where the user was is disorienting — and a <code>&lt;p&gt;</code> is not focusable without adding <code>tabindex</code>. Live regions exist to avoid exactly this.",
          },
          {
            id: "alert-role-only",
            text: "Nothing is needed — screen readers announce all DOM changes automatically",
            correct: false,
            explanation:
              "They do not, and could not usefully: a page updating a clock or a chart would become unlistenable. Announcements are opt-in, which is what live regions are for.",
          },
          {
            id: "title",
            text: 'Add <code>title="Saved"</code> to the element',
            correct: false,
            explanation:
              "<code>title</code> produces an inconsistently-supported tooltip, is invisible to touch users, and does not trigger any announcement when its value changes.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Focus did not move, so nothing prompted the screen reader to speak.",
        "Is there an attribute that marks a region as worth watching?",
      ],
    },
  },

  {
    id: "a11y-skip-link",
    slug: "what-is-a-skip-link-for",
    title: "What problem does a skip link solve?",
    topics: ["accessibility", "navigation", "keyboard"],
    relatedModule: "web-accessibility",
    step: {
      id: "a11y-skip-link",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "What problem does a skip link solve?",
        body: "<p>Many sites begin with a hidden link that becomes visible when focused, reading \"Skip to main content\".</p><p>Work out who benefits and from what.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: '<a href="#main" class="sr-only-focusable">Skip to main content</a>\n<nav>… 30 links …</nav>\n<main id="main">…</main>',
        codeLanguage: "html",
        options: [
          {
            id: "bypass-nav",
            text: "Keyboard and screen-reader users would otherwise have to tab through every navigation link on every page before reaching the content",
            correct: true,
            explanation:
              "Correct. A mouse user's eye jumps straight to the content, but keyboard focus moves strictly in order — thirty links on every page becomes thirty presses of <kbd>Tab</kbd>, repeatedly. The skip link is the first focusable element and jumps past the lot. It satisfies WCAG 2.4.1, and it must become visible on focus or it helps only screen-reader users.",
          },
          {
            id: "seo",
            text: "It helps search engines identify the main content",
            correct: false,
            explanation:
              "Search engines use the <code>&lt;main&gt;</code> element and heading structure. The skip link exists for people navigating in real time.",
          },
          {
            id: "mobile",
            text: "It gives mobile users a shortcut past the header",
            correct: false,
            explanation:
              "Touch users scroll directly and typically never trigger the link, since it only appears on keyboard focus.",
          },
          {
            id: "print",
            text: "It improves the printed version of the page",
            correct: false,
            explanation:
              "Print layout is handled with print stylesheets. Skip links are usually hidden from print entirely, since there is nothing to skip on paper.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Imagine reaching the third link in the body using only <kbd>Tab</kbd>.",
        "Why is it the very first focusable element on the page?",
      ],
    },
  },
];
