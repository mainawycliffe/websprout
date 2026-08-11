import type { PracticeQuestionSeed } from "@/types/practice";

export const boxModelQuestions: PracticeQuestionSeed[] = [
  {
    id: "box-border-box-total",
    slug: "how-wide-is-this-box",
    title: "How wide is this box on screen?",
    topics: ["box-model", "sizing"],
    relatedModule: "box-model",
    step: {
      id: "box-border-box-total",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "How wide is this box on screen?",
        body: "<p>Work out the total rendered width — the space the element actually occupies horizontally.</p><p>Note which box-sizing model is in play; it changes what the declared width refers to.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          ".card {\n  box-sizing: content-box;\n  width: 300px;\n  padding: 20px;\n  border: 5px solid;\n}",
        codeLanguage: "css",
        options: [
          {
            id: "350",
            text: "350px",
            correct: true,
            explanation:
              "Correct. Under <code>content-box</code>, <code>width</code> describes the <em>content</em> only — padding and border are added on top. So 300 + (20 × 2) + (5 × 2) = 350px. This surprise is exactly why almost every codebase starts with <code>*, *::before, *::after { box-sizing: border-box }</code>.",
          },
          {
            id: "300",
            text: "300px",
            correct: false,
            explanation:
              "This is the <code>border-box</code> answer, where padding and border are absorbed <em>inside</em> the declared width. The rule here explicitly sets <code>content-box</code>.",
          },
          {
            id: "340",
            text: "340px",
            correct: false,
            explanation:
              "This adds the padding but forgets the border. Both sides of both properties count — four additions in total.",
          },
          {
            id: "325",
            text: "325px",
            correct: false,
            explanation:
              "This counts each property once rather than on both sides. <code>padding: 20px</code> is shorthand for all four edges, so 20px appears on the left <em>and</em> the right.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Under <code>content-box</code>, what does the <code>width</code> value actually measure?",
        "Padding and border each appear on both the left and the right.",
      ],
    },
  },

  {
    id: "box-margin-collapse",
    slug: "why-is-the-gap-only-30px",
    title: "Debug: why is the gap 30px and not 50px?",
    topics: ["box-model", "margins", "debugging"],
    relatedModule: "box-model",
    step: {
      id: "box-margin-collapse",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: why is the gap 30px and not 50px?",
        body: "<p>One paragraph has a 20px bottom margin, the next a 30px top margin. The measured gap between them is 30px.</p><p>The margins did not disappear. Work out what happened to them.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".first { margin-bottom: 20px; }\n.second { margin-top: 30px; }",
        codeLanguage: "css",
        options: [
          {
            id: "collapse",
            text: "Adjacent vertical margins <strong>collapse</strong>, and the larger of the two wins",
            correct: true,
            explanation:
              "Correct. Vertical margins between block-level siblings collapse into a single margin equal to the larger — so 30px, not 50px. It is deliberate: it stops stacked paragraphs accumulating enormous gaps. Note it applies only vertically, and a flex or grid container disables it entirely, which is one more reason <code>gap</code> is easier to reason about.",
          },
          {
            id: "overridden",
            text: "The 20px margin was overridden by a more specific rule",
            correct: false,
            explanation:
              "Both rules apply to different elements, so they never compete. Devtools would show both margins present — they simply overlap rather than stack.",
          },
          {
            id: "border-box",
            text: "<code>box-sizing: border-box</code> absorbed the smaller margin",
            correct: false,
            explanation:
              "<code>box-sizing</code> governs how width and height relate to padding and border. Margin is outside the box in every model and is never affected.",
          },
          {
            id: "averaged",
            text: "The browser averages the two margins",
            correct: false,
            explanation:
              "Averaging 20 and 30 would give 25px, not the observed 30px. Collapsing takes the maximum, not the mean.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "30px happens to be one of the two values. Which one?",
        "Would the same thing happen with left and right margins?",
      ],
    },
  },

  {
    id: "box-percentage-padding",
    slug: "what-is-percentage-padding-relative-to",
    title: "What is percentage padding measured against?",
    topics: ["box-model", "units", "spacing"],
    relatedModule: "box-model",
    step: {
      id: "box-percentage-padding",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "What is percentage padding measured against?",
        body: "<p>A child has <code>padding-top: 10%</code> inside a container 400px wide and 200px tall.</p><p>Work out the resulting padding. The answer is the basis of a well-known trick for fixed-aspect-ratio boxes.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".parent { width: 400px; height: 200px; }\n.child { padding-top: 10%; }",
        codeLanguage: "css",
        options: [
          {
            id: "width-based",
            text: "40px — percentage padding is always relative to the containing block's <strong>width</strong>, even vertically",
            correct: true,
            explanation:
              "Correct, and it is genuinely counter-intuitive. Every percentage padding and margin — including <code>top</code> and <code>bottom</code> — resolves against the container's <em>width</em>. It exists so a percentage box keeps its proportions when the height is unknown, and it is what made the old <code>padding-top: 56.25%</code> trick produce a 16:9 video box. Modern CSS has <code>aspect-ratio</code> for that.",
          },
          {
            id: "height-based",
            text: "20px — vertical padding uses the container's height",
            correct: false,
            explanation:
              "The intuitive answer, and wrong. If vertical padding used height, a container with <code>height: auto</code> would be circular — its height would depend on the padding that depends on its height.",
          },
          {
            id: "own-size",
            text: "It resolves against the element's own size",
            correct: false,
            explanation:
              "Percentages in the box model always resolve against the <em>containing block</em>, never the element itself — which again avoids a circular definition.",
          },
          {
            id: "invalid",
            text: "Percentages are not valid for padding",
            correct: false,
            explanation:
              "They are valid for both padding and margin. Only <code>border-width</code> refuses percentages.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "If vertical padding used the height, what would happen when the height is <code>auto</code>?",
        "This rule is what made the old 56.25% video-embed trick work.",
      ],
    },
  },

  {
    id: "box-outline-vs-border",
    slug: "outline-versus-border",
    title: "Why does the border shift the layout?",
    topics: ["box-model", "borders", "accessibility"],
    relatedModule: "box-model",
    step: {
      id: "box-outline-vs-border",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Why does the border shift the layout?",
        body: "<p>Adding a 2px border on focus makes buttons jump by 2px. Switching to <code>outline</code> fixes it.</p><p>Work out why — and which property you should be using for focus rings in the first place.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: "button:focus { border: 2px solid blue; } /* jumps */\nbutton:focus { outline: 2px solid blue; } /* does not */",
        codeLanguage: "css",
        options: [
          {
            id: "outline-no-space",
            text: "<code>outline</code> is drawn outside the box and takes up no space, so it cannot affect layout",
            correct: true,
            explanation:
              "Correct. Border is part of the box model and contributes to the element's size; outline is painted over the top and is invisible to layout. That is precisely why it is the right tool for focus indicators — and why you should never write <code>outline: none</code> without providing a visible replacement, since keyboard users rely on it to know where they are.",
          },
          {
            id: "outline-inside",
            text: "<code>outline</code> is drawn inside the padding, so it replaces existing space",
            correct: false,
            explanation:
              "It is drawn outside the border edge by default, and <code>outline-offset</code> can push it further out or pull it in. Either way it never participates in layout.",
          },
          {
            id: "border-box-fix",
            text: "Adding <code>box-sizing: border-box</code> would have fixed the border version",
            correct: false,
            explanation:
              "It would stop the element's <em>outer</em> size changing — a real improvement — but only for elements with an explicit width. A button sized by its content would still grow, and outline avoids the question entirely.",
          },
          {
            id: "outline-not-visible",
            text: "<code>outline</code> only appears in some browsers, so nothing moves",
            correct: false,
            explanation:
              "It is well supported everywhere and very much visible. Browsers even draw a default focus outline for you, which is why removing it without a replacement is such a common accessibility failure.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Which of the two is part of the box model?",
        "If something takes no space, can it push its neighbours around?",
      ],
    },
  },

  {
    id: "box-height-percent",
    slug: "why-is-height-100-percent-ignored",
    title: "Debug: why is height: 100% doing nothing?",
    topics: ["box-model", "sizing", "debugging"],
    relatedModule: "box-model",
    step: {
      id: "box-height-percent",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Debug: why is height: 100% doing nothing?",
        body: "<p><code>width: 100%</code> works as expected on the same element. <code>height: 100%</code> collapses to the content height.</p><p>The asymmetry is the clue: ask what a percentage needs in order to resolve, and whether width and height are equally able to supply it.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".parent { /* no height set */ }\n.child { width: 100%; height: 100%; }",
        codeLanguage: "css",
        options: [
          {
            id: "parent-auto-height",
            text: "A percentage height needs a resolved parent height, and the parent's is <code>auto</code>",
            correct: true,
            explanation:
              "Correct. The parent's height depends on its content — which includes this child — so resolving the child's percentage against it would be circular, and CSS declines. Width has no such problem because a block's width comes from its container independently of content. Fix it by giving the parent a real height, or by using <code>100dvh</code>, flexbox or grid, all of which give the child a definite box to fill.",
          },
          {
            id: "not-supported",
            text: "Percentage heights are not supported on block elements",
            correct: false,
            explanation:
              "They work perfectly once the parent has a definite height. Set <code>height: 400px</code> on the parent and the child immediately fills it.",
          },
          {
            id: "needs-position",
            text: "The child needs <code>position: absolute</code>",
            correct: false,
            explanation:
              "That is one workaround — an absolutely positioned element resolves against the padding box of its positioned ancestor — but it is a consequence of the same rule, not the underlying reason.",
          },
          {
            id: "box-sizing",
            text: "<code>box-sizing</code> is wrong on the child",
            correct: false,
            explanation:
              "<code>box-sizing</code> only decides whether padding and border sit inside or outside the declared size. It cannot make an unresolvable percentage resolve.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Why does <code>width: 100%</code> work on the very same element?",
        "What would the parent's height be, if it depended on a child whose height depended on the parent?",
      ],
    },
  },

  {
    id: "box-inline-padding",
    slug: "why-does-inline-padding-overlap",
    title: "Why does padding on a span overlap the line above?",
    topics: ["box-model", "display", "inline"],
    relatedModule: "display-layout",
    step: {
      id: "box-inline-padding",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Why does padding on a span overlap the line above?",
        body: "<p>A <code>&lt;span&gt;</code> inside a paragraph is given vertical padding. The background grows, but the surrounding lines do not move apart — the highlight overlaps them.</p><p>Ask which box-model properties an inline box genuinely honours.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: "span.highlight {\n  padding: 10px;\n  background: yellow;\n}",
        codeLanguage: "css",
        options: [
          {
            id: "inline-no-vertical",
            text: "Inline boxes paint vertical padding but it does not affect line height, so neighbouring lines ignore it",
            correct: true,
            explanation:
              "Correct — and the split behaviour is what makes it confusing. Horizontal padding and margin on an inline box <em>do</em> push surrounding content along; vertical ones are painted but contribute nothing to line box height, so the highlight bleeds over its neighbours. Use <code>display: inline-block</code> to make the box reserve vertical space, and note that <code>width</code> and <code>height</code> are ignored on inline boxes altogether.",
          },
          {
            id: "padding-ignored",
            text: "Padding is ignored entirely on inline elements",
            correct: false,
            explanation:
              "It is not ignored — the yellow background visibly grows, and horizontal padding shifts the text after it. Only its effect on line height is dropped.",
          },
          {
            id: "collapse",
            text: "The padding collapsed with the paragraph's line height",
            correct: false,
            explanation:
              "Collapsing applies to <em>margins</em> between block boxes. Padding never collapses, in any context.",
          },
          {
            id: "needs-block",
            text: "You must use <code>display: block</code> to see any padding",
            correct: false,
            explanation:
              "<code>block</code> would also break the span onto its own line, destroying the inline highlight. <code>inline-block</code> keeps it in the flow of text while making the box reserve its vertical space.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "The background did grow — so the padding is being applied. What is not responding to it?",
        "Do horizontal and vertical padding behave the same way here?",
      ],
    },
  },
];
