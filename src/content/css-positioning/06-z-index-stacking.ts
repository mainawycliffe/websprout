import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-positioning-z-index",
  slug: "z-index-stacking",
  title: "z-index: Who Sits on Top?",
  description:
    "When elements overlap, z-index decides which one wins. Predict the result, learn the rules, and use the smallest values that solve the problem.",
  order: 6,
  steps: [
    {
      id: "z-index-explain",
      type: "explanation",
      instruction: {
        heading: "z-index orders overlapping elements",
        body: "<p>When two positioned elements overlap, the browser needs to decide which one paints on top. By default, the later element in the HTML wins. <code>z-index</code> overrides that: elements with a higher z-index paint on top of elements with a lower z-index.</p><p><code>z-index</code> only affects elements whose <code>position</code> is not <code>static</code>. On a static element it does nothing.</p>",
        analogy:
          "Think of stacking pancakes. The one you put down last sits on top by default. <code>z-index</code> lets you cheat — you can mark a pancake 'always-on-top' or 'always-on-bottom' regardless of when it was added.",
        docLinks: [
          {
            label: "MDN: z-index",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/z-index",
            type: "css-property",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { font-family: system-ui, sans-serif; padding: 24px; }\n  .stage { position: relative; height: 180px; }\n  .square { position: absolute; width: 90px; height: 90px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; }\n  .a { background: #ef4444; top: 0;  left: 0;   z-index: 1; }\n  .b { background: #6366f1; top: 30px; left: 40px; z-index: 3; }\n  .c { background: #10b981; top: 60px; left: 80px; z-index: 2; }\n</style>\n<div class="stage">\n  <div class="square a">A · 1</div>\n  <div class="square b">B · 3</div>\n  <div class="square c">C · 2</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "z-index-predict",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Predict the output: who wins?",
        body: "<p>Three boxes overlap. All three have <code>position: absolute</code>, so <code>z-index</code> applies to every one of them. Which box paints on top?</p><p>Read the values before you answer — then read <em>every</em> explanation, including the ones you did not pick.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          ".box-a { position: absolute; z-index: 5; }\n.box-b { position: absolute; z-index: 2; }\n.box-c { position: absolute; z-index: 9; }",
        codeLanguage: "css",
        options: [
          {
            id: "a",
            text: "<code>.box-a</code>",
            correct: false,
            explanation:
              "<code>5</code> beats <code>.box-b</code>'s <code>2</code>, but loses to <code>.box-c</code>'s <code>9</code>. So <code>.box-a</code> lands in the middle of the stack, not on top.",
          },
          {
            id: "b",
            text: "<code>.box-b</code>",
            correct: false,
            explanation:
              "<code>2</code> is the smallest value here, so <code>.box-b</code> sits at the <em>bottom</em> — it is the one most likely to be hidden behind the others.",
          },
          {
            id: "c",
            text: "<code>.box-c</code>",
            correct: true,
            explanation:
              "Correct — <code>9</code> is the highest value, so <code>.box-c</code> paints on top. Within a single stacking context the browser sorts by <code>z-index</code> and paints the highest last, which is why it ends up visually in front.",
          },
          {
            id: "last",
            text: "<code>.box-c</code>, but only because it is last in the HTML",
            correct: false,
            explanation:
              "Right box, wrong reason — and the reason is the part that matters. Source order <em>is</em> the tiebreaker, but only when <code>z-index</code> values are <strong>equal</strong>. Here they differ, so <code>z-index</code> decides on its own and source order never comes into it. Give all three the same <code>z-index</code> and then, and only then, the last one in the HTML would win.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Higher <code>z-index</code> paints on top.",
        "Compare <code>5</code>, <code>2</code>, and <code>9</code>. The biggest number wins — but make sure you can say <em>why</em>.",
      ],
    },
    {
      id: "z-index-keep-it-small",
      type: "explanation",
      instruction: {
        heading: "Use the smallest values that work",
        body: "<p>It is tempting to write <code>z-index: 9999</code> 'just to be safe'. Resist. Large random values cause an arms race — every new component has to top the previous one, and the codebase ends up with z-indexes like <code>99999</code> and <code>2147483647</code>. Future developers (including you next year) cannot tell which layer should be where.</p><p>Better: pick a small set of intentional layers and document them. Many design systems use a scale like <code>1</code>, <code>10</code>, <code>50</code>, <code>100</code>, <code>500</code>, <code>1000</code> for things like 'tooltip', 'dropdown', 'modal', 'snackbar', etc.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you find yourself reaching for <code>z-index: 9999</code>, that is a clue the real bug is somewhere else — probably a missing positioned ancestor or an unexpected stacking context (next lesson).",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
