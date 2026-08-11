import type { PracticeQuestionSeed } from "@/types/practice";

export const cssLayoutQuestions: PracticeQuestionSeed[] = [
  {
    id: "css-row-layout",
    slug: "put-items-in-a-row",
    title: "Put the items in a row",
    topics: ["css-layout", "flexbox", "display"],
    relatedModule: "display-layout",
    step: {
      id: "css-row-layout",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Put the items in a row",
        body: "<p>Three <code>&lt;div&gt;</code>s inside <code>.nav</code> are stacking vertically, one per line. You want them side by side.</p><p>Ask yourself why they stack in the first place — the answer points straight at which property to change.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          '.nav { /* ??? */ }\n\n<div class="nav">\n  <div>Home</div>\n  <div>About</div>\n  <div>Contact</div>\n</div>',
        codeLanguage: "css",
        options: [
          {
            id: "flex",
            text: "<code>display: flex;</code> on <code>.nav</code>",
            correct: true,
            explanation:
              "Correct. <code>&lt;div&gt;</code>s stack because they are block-level and take the full width available. Making the <em>parent</em> a flex container lays its children out along a row by default. Note where the property goes: on the container, not on the items — that is the part people most often get backwards.",
          },
          {
            id: "inline",
            text: "<code>display: inline;</code> on <code>.nav</code>",
            correct: false,
            explanation:
              "This changes how <code>.nav</code> itself sits in <em>its</em> parent, not how its children are arranged — so the three items keep stacking. It also makes width and vertical padding stop behaving, which usually makes things worse.",
          },
          {
            id: "float",
            text: "<code>float: left;</code> on each child",
            correct: false,
            explanation:
              "This does technically put them in a row, and it is how the web did it for a decade — but floats leave the parent with no height (the classic collapse) and need clearing hacks. Flexbox exists precisely to replace this; reach for floats only when wrapping text around an image.",
          },
          {
            id: "position",
            text: "<code>position: absolute;</code> on each child",
            correct: false,
            explanation:
              "Absolute positioning pulls all three out of normal flow, so without individual coordinates they pile up on top of each other at the same spot. It also collapses the parent's height.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "The children are block-level, which is why each takes its own line.",
        "The property that arranges children belongs on the <em>parent</em>.",
      ],
    },
  },

  {
    id: "css-margin-auto",
    slug: "why-margin-auto-does-not-center",
    title: "Debug: margin auto is not centring",
    topics: ["css-layout", "box-model", "debugging"],
    relatedModule: "box-model",
    step: {
      id: "css-margin-auto",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: margin auto is not centring",
        body: "<p><code>margin: 0 auto</code> is the standard way to centre a block, but this card is not moving. The CSS is applied — devtools confirms the rule is active and not overridden.</p><p>Think about what <code>auto</code> has to calculate, and what information it needs in order to calculate anything at all.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".card {\n  margin: 0 auto;\n  background: #eee;\n}",
        codeLanguage: "css",
        options: [
          {
            id: "no-width",
            text: "The element has no <code>width</code>, so it already fills the container and there is no leftover space to split",
            correct: true,
            explanation:
              "Correct. <code>auto</code> means \"share the leftover horizontal space equally\". A block-level element with no width is already as wide as its parent, so the leftover is zero and splitting it changes nothing. Give it a <code>width</code> (or <code>max-width</code>) and the same rule centres it instantly — the rule was never broken, it just had nothing to work with.",
          },
          {
            id: "text-align",
            text: "You need <code>text-align: center</code> instead",
            correct: false,
            explanation:
              "Different job. <code>text-align</code> centres <em>inline content inside</em> this element — the text would move, the box would not. Distinguishing \"centre the box\" from \"centre what is in the box\" saves a lot of confusion.",
          },
          {
            id: "flex-parent",
            text: "<code>margin: auto</code> only works inside a flex container",
            correct: false,
            explanation:
              "Backwards — <code>margin: 0 auto</code> is a normal-flow technique that long predates flexbox. It does <em>also</em> work in flex containers (where <code>auto</code> margins can absorb space on any side), but it does not require one.",
          },
          {
            id: "display-block",
            text: "The element needs <code>display: block</code> added",
            correct: false,
            explanation:
              "Worth checking in general — <code>auto</code> margins do nothing on an inline element — but <code>.card</code> is presumably a <code>&lt;div&gt;</code>, which is already block. Adding it changes nothing while the width is still missing.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "<code>auto</code> divides the <em>leftover</em> space. How much is left over if the element is already full width?",
        "What single declaration would create some leftover space?",
      ],
    },
  },

  {
    id: "css-specificity",
    slug: "which-rule-wins",
    title: "Which rule wins?",
    topics: ["css-layout", "specificity", "cascade", "debugging"],
    relatedModule: "css-positioning",
    step: {
      id: "css-specificity",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Which rule wins?",
        body: "<p>The button renders <strong>blue</strong>, and a teammate cannot work out why — the green rule is further down the file, and they were told later rules win.</p><p>Work out the actual precedence order here. \"Later wins\" is only the <em>last</em> tiebreaker, not the first.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          '#save { color: blue; }\n.btn.primary { color: red; }\n.btn { color: green; }\n\n<button id="save" class="btn primary">Save</button>',
        codeLanguage: "css",
        options: [
          {
            id: "id-wins",
            text: "The <code>#save</code> id selector is more specific than any number of classes, so it wins regardless of order",
            correct: true,
            explanation:
              "Correct. Specificity is compared in tiers — ids beat classes, classes beat elements — and only within the <em>same</em> specificity does source order decide. One id (1-0-0) outranks two classes (0-2-0), so no amount of moving the green rule down will change it. This is exactly why ids are discouraged for styling: they win arguments you may later need to lose.",
          },
          {
            id: "last-wins",
            text: "The last rule always wins, so it should be green — the blue must be coming from somewhere else",
            correct: false,
            explanation:
              "This is the belief that produces the bug. Source order only breaks ties <em>between equally specific</em> selectors. Here the selectors are not equal, so order never gets consulted.",
          },
          {
            id: "two-classes",
            text: "<code>.btn.primary</code> has two classes, which beats one id",
            correct: false,
            explanation:
              "Specificity does not add up across tiers — it is compared tier by tier, left to right, like version numbers. <code>1-0-0</code> beats <code>0-2-0</code> the same way 1.0.0 beats 0.2.0. Even a hundred classes would still lose to one id.",
          },
          {
            id: "important",
            text: "You would need <code>!important</code> on the green rule; nothing else can beat an id",
            correct: false,
            explanation:
              "<code>!important</code> would win, but it is the wrong lesson to take away — it starts an escalation that ends with <code>!important</code> everywhere. The real fix is to lower the winner's specificity: style the button by class and stop using <code>#save</code> for appearance.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Count the selector types: ids, then classes, then elements — and compare them tier by tier.",
        "Does source order get consulted at all when the specificities differ?",
      ],
    },
  },
];
