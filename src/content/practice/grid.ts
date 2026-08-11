import type { PracticeQuestionSeed } from "@/types/practice";

export const gridQuestions: PracticeQuestionSeed[] = [
  {
    id: "grid-fr-unit",
    slug: "what-does-the-fr-unit-mean",
    title: "What does 1fr actually mean?",
    topics: ["grid", "css-layout", "units"],
    relatedModule: "display-layout",
    step: {
      id: "grid-fr-unit",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "What does 1fr actually mean?",
        body: "<p>This grid mixes a fixed column with two flexible ones inside a 600px container.</p><p>Work out how wide each flexible column ends up — the key is what the <code>fr</code> is a fraction <em>of</em>.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".grid {\n  display: grid;\n  width: 600px;\n  grid-template-columns: 200px 1fr 1fr;\n}",
        codeLanguage: "css",
        options: [
          {
            id: "leftover",
            text: "200px, then 200px and 200px — <code>fr</code> splits the space <em>left over</em> after fixed tracks",
            correct: true,
            explanation:
              "Correct. <code>fr</code> is a fraction of the <strong>free</strong> space, not of the container. The 200px column is taken out first, leaving 400px, which the two <code>1fr</code> tracks share equally. This is why <code>fr</code> composes so well with fixed sidebars — you never have to calculate percentages by hand.",
          },
          {
            id: "of-container",
            text: "200px, then 300px and 300px — each <code>1fr</code> is half the container",
            correct: false,
            explanation:
              "That would total 800px in a 600px container and overflow. The fixed track is subtracted before the fractions are worked out.",
          },
          {
            id: "thirds",
            text: "Three equal 200px columns, because <code>1fr</code> means one third",
            correct: false,
            explanation:
              "The arithmetic coincidentally lands on the right numbers here, but the reasoning fails as soon as the fixed column changes. Make it 300px and the <code>fr</code> tracks become 150px each, not 200px.",
          },
          {
            id: "content",
            text: "Each <code>1fr</code> track sizes itself to its content",
            correct: false,
            explanation:
              "That is what <code>auto</code> does. <code>fr</code> distributes free space regardless of content — though note a track will not shrink below its content's minimum unless you set <code>minmax(0, 1fr)</code>.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Subtract the fixed track first. What is left?",
        "Is <code>fr</code> a fraction of the container, or of what remains?",
      ],
    },
  },

  {
    id: "grid-auto-fit-fill",
    slug: "auto-fit-versus-auto-fill",
    title: "auto-fit or auto-fill?",
    topics: ["grid", "responsive", "css-layout"],
    relatedModule: "responsive-design",
    step: {
      id: "grid-auto-fit-fill",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "auto-fit or auto-fill?",
        body: "<p>This is the standard responsive-card-grid one-liner. Swapping <code>auto-fit</code> for <code>auto-fill</code> changes nothing on a full grid — but with only two cards in a wide container they behave quite differently.</p><p>Work out what each keyword does with the columns that have nothing in them.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n}\n/* container 1000px wide, only 2 cards */",
        codeLanguage: "css",
        options: [
          {
            id: "fit-collapses",
            text: "<code>auto-fit</code> collapses the empty tracks, so the two cards stretch to fill the row; <code>auto-fill</code> keeps them, so the cards stay ~200px",
            correct: true,
            explanation:
              "Correct. Both create as many tracks as fit, but <code>auto-fit</code> then collapses the empty ones to zero, letting <code>1fr</code> hand all the space to the real items. <code>auto-fill</code> keeps the empty tracks reserved, so the cards stay at their minimum and leave a gap on the right. Choose by intent: <code>auto-fit</code> to fill the row, <code>auto-fill</code> to keep a consistent column rhythm.",
          },
          {
            id: "reversed",
            text: "<code>auto-fill</code> stretches the cards and <code>auto-fit</code> keeps them narrow",
            correct: false,
            explanation:
              "The right distinction, backwards. Reading <code>fit</code> as \"fit the items to the space\" is a useful mnemonic for keeping them straight.",
          },
          {
            id: "identical",
            text: "They are identical; <code>auto-fill</code> is just an older alias",
            correct: false,
            explanation:
              "They are genuinely different, though only visibly so when there are fewer items than available tracks. On a full grid the two are indistinguishable, which is why the difference goes unnoticed for so long.",
          },
          {
            id: "minmax",
            text: "The difference is in <code>minmax</code>, not the keyword",
            correct: false,
            explanation:
              "<code>minmax(200px, 1fr)</code> is doing the same work in both cases. The keyword decides how many tracks exist and whether empty ones survive.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Both make the same number of tracks. The difference is what happens to the ones left empty.",
        "If empty tracks collapse to zero, what do the <code>1fr</code> tracks do with the freed space?",
      ],
    },
  },

  {
    id: "grid-vs-flex-choice",
    slug: "grid-or-flexbox",
    title: "Grid or flexbox?",
    topics: ["grid", "flexbox", "css-layout"],
    relatedModule: "display-layout",
    step: {
      id: "grid-vs-flex-choice",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Grid or flexbox?",
        body: "<p>Both tools can produce most layouts, so \"which is correct\" is usually really \"which fights you less\".</p><p><strong>Select every case where grid is the better fit.</strong> The deciding question: does the layout need alignment in <em>two</em> directions at once?</p>",
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "page-layout",
            text: "A page with a header, sidebar, main area and footer that must line up in both directions",
            correct: true,
            explanation:
              "Grid. This is two-dimensional by definition — rows and columns must align with each other — and <code>grid-template-areas</code> lets you draw the layout in the stylesheet almost pictorially. Doing it in flexbox means nested containers whose widths must be kept in sync by hand.",
          },
          {
            id: "card-grid",
            text: "A responsive gallery where cards wrap into neat aligned rows",
            correct: true,
            explanation:
              "Grid. With <code>repeat(auto-fit, minmax(...))</code> the columns stay aligned across every row automatically. Wrapped flex items align within their own line but not between lines, so the last row often looks ragged.",
          },
          {
            id: "nav-row",
            text: "A navigation bar: logo on the left, links on the right, vertically centred",
            correct: false,
            explanation:
              "Flexbox. This is one-dimensional — a single row where items size to their content — and <code>justify-content: space-between</code> handles it in one line. Grid would need column definitions that must be revised whenever a link is added.",
          },
          {
            id: "tag-list",
            text: "A row of tags of differing widths that wraps naturally",
            correct: false,
            explanation:
              "Flexbox. Each tag should be exactly as wide as its text, and there is no requirement for tags to line up between rows. Grid would force them into columns of equal width, which is not what a tag list wants.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Ask whether the layout is one-dimensional (a line of things) or two-dimensional (a matrix).",
        "Does anything need to align with an item on a <em>different</em> row?",
      ],
    },
  },

  {
    id: "grid-line-numbers",
    slug: "how-do-grid-line-numbers-work",
    title: "Where does column 3 start?",
    topics: ["grid", "placement"],
    relatedModule: "display-layout",
    step: {
      id: "grid-line-numbers",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Where does column 3 start?",
        body: "<p>Grid placement uses <em>line</em> numbers, not column numbers, and the off-by-one this causes is a rite of passage.</p><p>In a three-column grid, work out what <code>grid-column: 1 / 3</code> spans.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          ".grid { display: grid; grid-template-columns: repeat(3, 1fr); }\n.item { grid-column: 1 / 3; }",
        codeLanguage: "css",
        options: [
          {
            id: "two-columns",
            text: "The first two columns — lines are the edges between tracks, so 1 to 3 covers two tracks",
            correct: true,
            explanation:
              "Correct. Three columns have four lines: one before the first track, one between each pair, and one after the last. Spanning line 1 to line 3 covers the two tracks in between. If you want all three, go to line 4 — or use <code>grid-column: 1 / -1</code>, which means \"to the last line\" and survives the column count changing.",
          },
          {
            id: "three-columns",
            text: "All three columns",
            correct: false,
            explanation:
              "That would be <code>1 / 4</code>. Counting tracks rather than the lines between them is the classic off-by-one here.",
          },
          {
            id: "third-column",
            text: "Just the third column",
            correct: false,
            explanation:
              "The slash denotes start and end lines, not a single position. To place an item in the third track alone you would write <code>3 / 4</code>, or simply <code>grid-column: 3</code>.",
          },
          {
            id: "invalid",
            text: "Nothing — you must use <code>span</code> for multi-column items",
            correct: false,
            explanation:
              "<code>span</code> is an alternative spelling (<code>1 / span 2</code> here), not a requirement. Explicit line numbers are perfectly valid and often clearer about where an item ends.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "How many lines does a three-track grid have? Count the edges, including the outer ones.",
        "The two numbers are a start line and an end line, not a start column and a count.",
      ],
    },
  },

  {
    id: "grid-implicit-rows",
    slug: "where-did-the-extra-rows-come-from",
    title: "Where did these extra rows come from?",
    topics: ["grid", "implicit tracks", "debugging"],
    relatedModule: "display-layout",
    step: {
      id: "grid-implicit-rows",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Where did these extra rows come from?",
        body: "<p>The grid declares two rows of 100px, but six items are rendered. The last two rows are shorter than the first two.</p><p>Grid did not drop the extra items and did not error. Work out what it did instead.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          ".grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: 100px 100px;\n}\n/* six items */",
        codeLanguage: "css",
        options: [
          {
            id: "implicit-rows",
            text: "Grid created <strong>implicit</strong> rows for the overflow, sized to their content",
            correct: true,
            explanation:
              "Correct. <code>grid-template-rows</code> defines the <em>explicit</em> grid; anything that does not fit gets implicit tracks, which default to <code>auto</code> and so hug their content. That is why they look shorter. Set <code>grid-auto-rows: 100px</code> to give the implicit rows a size too.",
          },
          {
            id: "overflow",
            text: "The extra items overflow the container and are positioned outside it",
            correct: false,
            explanation:
              "Grid places every item somewhere by design. Overflow happens when content is too big for a track, not when there are more items than declared rows.",
          },
          {
            id: "wrap",
            text: "The items wrapped, like flexbox with <code>flex-wrap</code>",
            correct: false,
            explanation:
              "Grid has no wrapping — items are placed into cells by the auto-placement algorithm, which creates new tracks as needed rather than flowing onto a new line.",
          },
          {
            id: "ignored",
            text: "<code>grid-template-rows</code> is ignored once there are more items than rows",
            correct: false,
            explanation:
              "It is fully respected — the first two rows are exactly 100px, which is the visible clue. Only the additional rows fall outside its remit.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "The first two rows are the right height. Only the extras are wrong.",
        "There is a property named <code>grid-auto-rows</code>. What would it be for?",
      ],
    },
  },

  {
    id: "grid-gap-percentage",
    slug: "does-gap-count-in-the-track-sizes",
    title: "Do the gaps come out of the columns?",
    topics: ["grid", "spacing", "sizing"],
    relatedModule: "display-layout",
    step: {
      id: "grid-gap-percentage",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Do the gaps come out of the columns?",
        body: "<p>A 320px grid with two equal columns and a 20px gap. Work out the width of each column.</p><p>The question is whether the gap is taken from the free space before the fractions are calculated, or added on afterwards.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".grid {\n  display: grid;\n  width: 320px;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}",
        codeLanguage: "css",
        options: [
          {
            id: "150",
            text: "150px each — the gap is subtracted first, then the remainder is split",
            correct: true,
            explanation:
              "Correct. Gaps are reserved before track sizes are resolved: 320 − 20 = 300, split evenly gives 150px each. This is the practical advantage of <code>gap</code> over percentage widths — you never have to write <code>calc(50% - 10px)</code> to leave room for the gutter.",
          },
          {
            id: "160",
            text: "160px each, with the gap causing a 20px overflow",
            correct: false,
            explanation:
              "That is what happens with <code>width: 50%</code> plus a margin, and it is exactly the arithmetic <code>gap</code> exists to eliminate. Grid never overflows because of its own gaps.",
          },
          {
            id: "140",
            text: "140px each — 20px is taken off both sides of every column",
            correct: false,
            explanation:
              "<code>gap</code> applies only <em>between</em> tracks, never on the outer edges. With two columns there is exactly one gap, not two.",
          },
          {
            id: "depends",
            text: "It depends on the content, since <code>fr</code> respects minimum content size",
            correct: false,
            explanation:
              "A real caveat in general — <code>1fr</code> will not shrink below its content minimum unless you use <code>minmax(0, 1fr)</code> — but with ordinary short content the tracks resolve to 150px.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "How many gaps are there between two columns?",
        "Work out the free space first, then divide it.",
      ],
    },
  },
];
