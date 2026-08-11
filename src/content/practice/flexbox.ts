import type { PracticeQuestionSeed } from "@/types/practice";

export const flexboxQuestions: PracticeQuestionSeed[] = [
  {
    id: "flex-center-both-axes",
    slug: "centre-a-box-with-flexbox",
    title: "Centre a box both ways",
    topics: ["flexbox", "css-layout", "alignment"],
    relatedModule: "display-layout",
    step: {
      id: "flex-center-both-axes",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Centre a box both ways",
        body: "<p>You want the child perfectly centred inside a container that already has a fixed height.</p><p>Two properties are needed. Work out which axis each one controls before choosing.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".container {\n  display: flex;\n  height: 300px;\n  /* ??? */\n}",
        codeLanguage: "css",
        options: [
          {
            id: "justify-align",
            text: "<code>justify-content: center; align-items: center;</code>",
            correct: true,
            explanation:
              "Correct. <code>justify-content</code> positions items along the <strong>main</strong> axis (horizontal by default), and <code>align-items</code> along the <strong>cross</strong> axis (vertical by default). The pair covers both directions. Note that these names follow the axes, not the screen — flip <code>flex-direction</code> to <code>column</code> and their effects swap.",
          },
          {
            id: "text-align-vertical",
            text: "<code>text-align: center; vertical-align: middle;</code>",
            correct: false,
            explanation:
              "These are the pre-flexbox tools and neither works here. <code>text-align</code> only centres inline content, and <code>vertical-align</code> applies to inline elements and table cells — it does nothing to a flex item.",
          },
          {
            id: "align-content",
            text: "<code>justify-content: center; align-content: center;</code>",
            correct: false,
            explanation:
              "Very close, and a genuinely easy mix-up. <code>align-content</code> distributes <em>lines</em> in a multi-line flex container and has no effect at all unless <code>flex-wrap: wrap</code> is set. For a single line you want <code>align-items</code>.",
          },
          {
            id: "margin-auto-only",
            text: "<code>margin: 0 auto;</code> on the child",
            correct: false,
            explanation:
              "In a flex container <code>margin: auto</code> genuinely does absorb free space, so <code>margin: auto</code> alone would in fact centre it both ways — but <code>margin: 0 auto</code> pins the vertical margins to zero, so it only handles the horizontal.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Flexbox thinks in terms of a main axis and a cross axis, not left/right and up/down.",
        "One property name starts with <code>justify</code>, the other with <code>align</code>.",
      ],
    },
  },

  {
    id: "flex-basis-vs-width",
    slug: "why-does-the-item-shrink",
    title: "Debug: why is my 300px item narrower than 300px?",
    topics: ["flexbox", "sizing", "debugging"],
    relatedModule: "display-layout",
    step: {
      id: "flex-basis-vs-width",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: why is my 300px item narrower than 300px?",
        body: "<p>Three cards with <code>width: 300px</code> sit in a flex row 700px wide. Each one renders at roughly 233px.</p><p>Nothing has overridden the width. Ask what flexbox is allowed to do to an item when its container runs out of room.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".row { display: flex; width: 700px; }\n.card { width: 300px; }",
        codeLanguage: "css",
        options: [
          {
            id: "flex-shrink",
            text: "<code>flex-shrink</code> defaults to <code>1</code>, so items are allowed to shrink below their width when space runs short",
            correct: true,
            explanation:
              "Correct. The default is <code>flex: 0 1 auto</code> — do not grow, <strong>do</strong> shrink, base size from <code>width</code>. Three 300px cards need 900px in a 700px row, so each gives up a proportional share of the 200px overflow. Set <code>flex-shrink: 0</code> to forbid it (they will overflow instead), or <code>min-width: 300px</code> to set a floor.",
          },
          {
            id: "border-box",
            text: "<code>box-sizing: border-box</code> is subtracting padding from the width",
            correct: false,
            explanation:
              "<code>border-box</code> makes padding and border count <em>inside</em> the declared width, so the element would still occupy exactly 300px. It also cannot explain a shortfall when no padding is declared.",
          },
          {
            id: "width-ignored",
            text: "Flex items ignore <code>width</code> entirely; only <code>flex-basis</code> works",
            correct: false,
            explanation:
              "<code>width</code> is respected — it supplies the base size when <code>flex-basis</code> is <code>auto</code>, which is the default. It is used as the starting point and then shrunk, not ignored.",
          },
          {
            id: "needs-wrap",
            text: "The row needs <code>flex-wrap: wrap</code> to respect the widths",
            correct: false,
            explanation:
              "Wrapping would indeed preserve the widths by pushing the third card onto a new line — a legitimate fix for some layouts, but it changes the design rather than explaining the shrinking.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "3 × 300px is 900px, but the row is only 700px. Something has to give.",
        "What is the default value of <code>flex-shrink</code>?",
      ],
    },
  },

  {
    id: "flex-shorthand-meaning",
    slug: "what-does-flex-1-mean",
    title: "What does flex: 1 actually set?",
    topics: ["flexbox", "shorthand"],
    relatedModule: "display-layout",
    step: {
      id: "flex-shorthand-meaning",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "What does flex: 1 actually set?",
        body: "<p><code>flex: 1</code> is written constantly, usually without much thought about what it expands to.</p><p>It is a shorthand for three properties. Work out all three values — the third is the one that surprises people, and it is why <code>flex: 1</code> makes items equal width even when their content differs wildly.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        options: [
          {
            id: "one-one-zero",
            text: "<code>flex-grow: 1; flex-shrink: 1; flex-basis: 0%;</code>",
            correct: true,
            explanation:
              "Correct — and <code>flex-basis: 0%</code> is the important part. It tells the item to start from zero width and take a share of <em>all</em> the space, rather than starting from its content size. That is why <code>flex: 1</code> on several items makes them exactly equal regardless of content length, while <code>flex-grow: 1</code> on its own (leaving basis at <code>auto</code>) makes them merely share the <em>leftover</em> space and stay unequal.",
          },
          {
            id: "one-one-auto",
            text: "<code>flex-grow: 1; flex-shrink: 1; flex-basis: auto;</code>",
            correct: false,
            explanation:
              "This is the single most common misconception. It is what you get from writing <code>flex-grow: 1</code> by itself — items keep their content size and split only the surplus, so a longer item stays wider. The <code>flex</code> shorthand deliberately resets basis to <code>0%</code>.",
          },
          {
            id: "one-zero-auto",
            text: "<code>flex-grow: 1; flex-shrink: 0; flex-basis: auto;</code>",
            correct: false,
            explanation:
              "The shorthand never disables shrinking. Omitted values in <code>flex</code> default to <code>1</code> for shrink, so items stay able to shrink.",
          },
          {
            id: "grow-only",
            text: "Only <code>flex-grow: 1</code>; the other two keep whatever they had",
            correct: false,
            explanation:
              "Shorthands always reset every property they cover — that is what makes them shorthands. Any value you set earlier for <code>flex-basis</code> is overwritten.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "The shorthand covers grow, shrink and basis, and always resets all three.",
        "Why do <code>flex: 1</code> items come out equal, while <code>flex-grow: 1</code> items do not?",
      ],
    },
  },

  {
    id: "flex-gap-vs-margin",
    slug: "spacing-between-flex-items",
    title: "Spacing items without a trailing gap",
    topics: ["flexbox", "spacing"],
    relatedModule: "display-layout",
    step: {
      id: "flex-gap-vs-margin",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Spacing items without a trailing gap",
        body: "<p>You want 16px between each item — but not before the first or after the last.</p><p><strong>Select every approach that achieves exactly that.</strong> Some of these work but carry a cost worth naming.</p>",
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "gap",
            text: "<code>gap: 16px</code> on the flex container",
            correct: true,
            explanation:
              "The right answer today. <code>gap</code> puts space only <em>between</em> items by definition, so there is nothing to strip off the ends, and it needs no knowledge of how many items there are. It works in flexbox, grid and multi-column, and has been supported in every major browser since 2021.",
          },
          {
            id: "margin-not-last",
            text: "<code>margin-right: 16px</code> on every item, then <code>:last-child { margin-right: 0 }</code>",
            correct: true,
            explanation:
              "This genuinely works and was the standard technique before <code>gap</code>. The cost is that it takes two rules instead of one, and breaks quietly if the visual order changes — with <code>flex-direction: row-reverse</code> the untouched margin ends up on the wrong side.",
          },
          {
            id: "margin-all",
            text: "<code>margin: 0 8px</code> on every item",
            correct: false,
            explanation:
              "This does give 16px between neighbours, since adjacent margins sit side by side — but it also leaves 8px hanging off both outer edges, which is exactly what the question ruled out.",
          },
          {
            id: "space-between",
            text: "<code>justify-content: space-between</code>",
            correct: false,
            explanation:
              "This distributes <em>leftover</em> space, so the gap depends on the container width and the items' own sizes. You cannot get a guaranteed 16px from it, and with a single item it does nothing at all.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two of these give exactly the spacing asked for.",
        "Which property was designed for precisely this and needs no exceptions?",
      ],
    },
  },

  {
    id: "flex-direction-axis-swap",
    slug: "which-axis-after-flex-direction-column",
    title: "What happens when direction is column?",
    topics: ["flexbox", "alignment", "axes"],
    relatedModule: "display-layout",
    step: {
      id: "flex-direction-axis-swap",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "What happens when direction is column?",
        body: "<p>This container stacks its children vertically and the developer wants them horizontally centred.</p><p>The axes have swapped. Work out which property now controls the horizontal direction.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".stack {\n  display: flex;\n  flex-direction: column;\n  /* centre the children horizontally */\n}",
        codeLanguage: "css",
        options: [
          {
            id: "align-items",
            text: "<code>align-items: center</code>",
            correct: true,
            explanation:
              "Correct. With <code>flex-direction: column</code> the main axis runs vertically, so the <strong>cross</strong> axis is now horizontal — and <code>align-items</code> always controls the cross axis. This is why the properties are named after axes rather than directions: the names stay valid when the direction flips.",
          },
          {
            id: "justify-content",
            text: "<code>justify-content: center</code>",
            correct: false,
            explanation:
              "This is the instinctive answer and it is now the vertical one. <code>justify-content</code> follows the main axis, which is vertical in a column — so this would centre the stack top-to-bottom instead.",
          },
          {
            id: "text-align",
            text: "<code>text-align: center</code>",
            correct: false,
            explanation:
              "This centres inline content <em>inside</em> each child rather than positioning the children themselves. A child with a set width would stay stubbornly on the left with its text centred within it.",
          },
          {
            id: "margin-auto",
            text: "<code>align-content: center</code>",
            correct: false,
            explanation:
              "<code>align-content</code> only does anything when there are multiple flex lines, which requires <code>flex-wrap: wrap</code>. In a single-line column it has no effect.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "In a column, which direction is the main axis?",
        "<code>align-items</code> always follows the cross axis — work out where the cross axis points now.",
      ],
    },
  },

  {
    id: "flex-min-width-auto",
    slug: "why-does-my-flex-item-overflow",
    title: "Debug: why won't this flex item shrink?",
    topics: ["flexbox", "sizing", "debugging", "overflow"],
    relatedModule: "display-layout",
    step: {
      id: "flex-min-width-auto",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Debug: why won't this flex item shrink?",
        body: "<p>A flex item containing a long unbroken string — a URL, say — refuses to shrink and pushes its container into horizontal overflow, even though <code>flex-shrink</code> is at its default of <code>1</code>.</p><p>Something is putting a floor under it. This is one of flexbox's genuinely obscure defaults, and it catches nearly everyone once.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          ".row { display: flex; width: 400px; }\n.item { flex: 1; }\n\n<!-- <div class=\"item\">averyveryverylongunbrokenstring…</div> -->",
        codeLanguage: "css",
        options: [
          {
            id: "min-width-auto",
            text: "Flex items default to <code>min-width: auto</code>, which refuses to go below the content's intrinsic minimum size",
            correct: true,
            explanation:
              "Correct. Unlike ordinary block boxes, flex items get <code>min-width: auto</code>, meaning \"never shrink below what the content needs\" — and for an unbreakable string that minimum is the whole string. The fix is <code>min-width: 0</code> on the item (or <code>overflow: hidden</code>, which has the same effect). This is the single most common cause of mysterious flexbox overflow.",
          },
          {
            id: "flex-shrink-zero",
            text: "<code>flex: 1</code> sets <code>flex-shrink: 0</code>",
            correct: false,
            explanation:
              "<code>flex: 1</code> expands to <code>1 1 0%</code> — shrink is <code>1</code>, so shrinking is permitted. The item is willing to shrink; it is being <em>prevented</em> by a minimum.",
          },
          {
            id: "white-space",
            text: "The container needs <code>white-space: normal</code>",
            correct: false,
            explanation:
              "<code>normal</code> is already the default, and it only allows breaking at existing spaces. A single unbroken string has none, so this changes nothing — you would need <code>overflow-wrap: anywhere</code> to break mid-word.",
          },
          {
            id: "needs-width",
            text: "Flex items need an explicit <code>width</code> before they can shrink",
            correct: false,
            explanation:
              "They do not — <code>flex-basis: 0%</code> from the shorthand already gives a base size to shrink from. Adding a width would not lift the <code>min-width: auto</code> floor anyway.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "The item is permitted to shrink, so something must be setting a lower bound.",
        "Flex items have a different default <code>min-width</code> from ordinary blocks.",
      ],
    },
  },
];
