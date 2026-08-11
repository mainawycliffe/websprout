import type { PracticeQuestionSeed } from "@/types/practice";

export const cssSelectorQuestions: PracticeQuestionSeed[] = [
  {
    id: "css-descendant-vs-child",
    slug: "descendant-vs-child-selector",
    title: "Space or angle bracket?",
    topics: ["css-selectors", "combinators"],
    relatedModule: "css-positioning",
    step: {
      id: "css-descendant-vs-child",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Space or angle bracket?",
        body: "<p>Only the top-level items of this menu should be bold — not the ones in the nested submenu.</p><p>Work out which selector reaches only the direct children.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          '<ul class="menu">\n  <li>Home</li>\n  <li>Products\n    <ul>\n      <li>Shoes</li>\n    </ul>\n  </li>\n</ul>',
        codeLanguage: "html",
        options: [
          {
            id: "child",
            text: "<code>.menu &gt; li</code>",
            correct: true,
            explanation:
              "Correct. The <code>&gt;</code> child combinator matches only elements that are <strong>direct</strong> children, so <code>Shoes</code> is excluded — it is a grandchild, nested one level deeper inside the submenu.",
          },
          {
            id: "descendant",
            text: "<code>.menu li</code>",
            correct: false,
            explanation:
              "A plain space is the descendant combinator: it matches at <em>any</em> depth. That styles <code>Shoes</code> too, which is precisely the problem being solved here.",
          },
          {
            id: "adjacent",
            text: "<code>.menu + li</code>",
            correct: false,
            explanation:
              "<code>+</code> is the adjacent sibling combinator — it matches an <code>li</code> that comes immediately <em>after</em> the menu, not inside it. This selects nothing here.",
          },
          {
            id: "comma",
            text: "<code>.menu, li</code>",
            correct: false,
            explanation:
              "A comma is not a combinator at all — it separates two independent selectors. This would style the menu itself and every <code>li</code> on the entire page.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "One combinator means \"anywhere inside\", another means \"immediately inside\".",
        "How deep is <code>Shoes</code> compared to <code>Home</code>?",
      ],
    },
  },

  {
    id: "css-specificity-order",
    slug: "rank-these-selectors-by-specificity",
    title: "Which selectors beat which?",
    topics: ["css-selectors", "specificity", "cascade"],
    relatedModule: "css-positioning",
    step: {
      id: "css-specificity-order",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Which selectors beat which?",
        body: "<p>All four selectors below match the same element, and each sets a different colour.</p><p><strong>Select every selector that beats <code>.card .title</code></strong> — that is, every one whose colour would win over it. Compare specificity tier by tier rather than counting characters.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Specificity is a three-part value — (ids, classes/attributes/pseudo-classes, elements/pseudo-elements) — compared left to right like a version number. A single id beats any number of classes, because the comparison never reaches the second column if the first already differs.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "id",
            text: "<code>#title</code>",
            correct: true,
            explanation:
              "Wins. One id is <code>1-0-0</code> against <code>.card .title</code>'s <code>0-2-0</code>. The first column decides it, so the two classes never get compared.",
          },
          {
            id: "three-classes",
            text: "<code>.page .card .title</code>",
            correct: true,
            explanation:
              "Wins, narrowly. Three classes is <code>0-3-0</code> versus <code>0-2-0</code> — same first column, so the comparison moves to the second, where three beats two.",
          },
          {
            id: "element-class",
            text: "<code>h2.title</code>",
            correct: false,
            explanation:
              "Loses. This is <code>0-1-1</code>: one class plus one element. The second column (1 versus 2) already decides it, and the element in the third column cannot make up the difference — columns never carry.",
          },
          {
            id: "attribute-class",
            text: '<code>.title[data-featured]</code>',
            correct: false,
            explanation:
              "Does not beat it — this is an exact <strong>tie</strong>. Attribute selectors count in the same column as classes, so <code>.title[data-featured]</code> is <code>0-2-0</code>, the same as <code>.card .title</code>. Specificity alone cannot separate them; whichever appears later in the stylesheet wins, which is a different rule from the one this question is asking about. Worth remembering that attributes and pseudo-classes weigh exactly as much as classes.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Write each selector as (ids, classes, elements) and compare left to right.",
        "One of these ties exactly on specificity — and a tie does not beat anything.",
      ],
    },
  },

  {
    id: "css-nth-child-vs-type",
    slug: "nth-child-vs-nth-of-type",
    title: "Debug: why is no paragraph selected?",
    topics: ["css-selectors", "pseudo-classes", "debugging"],
    relatedModule: "css-positioning",
    step: {
      id: "css-nth-child-vs-type",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Debug: why is no paragraph selected?",
        body: "<p>The intent is to style the first paragraph. Nothing gets styled at all.</p><p>Read what <code>:first-child</code> literally asks, then look at what is actually first inside the container.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "/* CSS */\narticle p:first-child { font-weight: bold; }\n\n/* HTML */\n/* <article>\n     <h2>Title</h2>\n     <p>First paragraph</p>\n   </article> */",
        codeLanguage: "css",
        options: [
          {
            id: "first-of-type",
            text: "<code>:first-child</code> means \"is the first child\", and the first child is the <code>h2</code> — use <code>p:first-of-type</code>",
            correct: true,
            explanation:
              "Correct. <code>p:first-child</code> reads as \"a <code>p</code> that is also its parent's first child\", and here the first child is the <code>h2</code>, so nothing matches. <code>:first-of-type</code> asks the different question — \"the first <code>p</code> among its siblings\" — which is what was meant.",
          },
          {
            id: "needs-child-combinator",
            text: "It needs the child combinator: <code>article &gt; p:first-child</code>",
            correct: false,
            explanation:
              "The paragraph <em>is</em> a direct child, so this changes nothing — it still requires the <code>p</code> to be the first child overall, and the <code>h2</code> still holds that position.",
          },
          {
            id: "specificity",
            text: "The selector is too low in specificity and is being overridden",
            correct: false,
            explanation:
              "Nothing is overriding it, because it never matched in the first place. A useful habit: check whether the rule appears at all in devtools before assuming a cascade problem.",
          },
          {
            id: "pseudo-element",
            text: "<code>:first-child</code> is a pseudo-element and needs double colons",
            correct: false,
            explanation:
              "<code>:first-child</code> is a pseudo-<em>class</em> — it selects an existing element based on its position. Pseudo-<em>elements</em> like <code>::before</code> create something that was not in the markup, and those take the double colon.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Read it literally: \"a p that is the first child\". Is the paragraph the first child of the article?",
        "There is a sibling pseudo-class that counts only elements of the same tag.",
      ],
    },
  },

  {
    id: "css-attribute-selector",
    slug: "select-external-links",
    title: "Select only the external links",
    topics: ["css-selectors", "attributes"],
    relatedModule: "css-positioning",
    step: {
      id: "css-attribute-selector",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Select only the external links",
        body: "<p>You want to add an outward-arrow icon to links that leave your site — those whose <code>href</code> starts with <code>http</code> — while leaving internal links like <code>/about</code> alone.</p><p>Attribute selectors have several matching operators. Pick the one that says \"starts with\".</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        options: [
          {
            id: "starts-with",
            text: '<code>a[href^="http"]</code>',
            correct: true,
            explanation:
              'Correct. <code>^=</code> means "attribute value begins with". Think of it as the same <code>^</code> that anchors the start of a regular expression. Internal links starting with <code>/</code> are untouched.',
          },
          {
            id: "contains",
            text: '<code>a[href*="http"]</code>',
            correct: false,
            explanation:
              '<code>*=</code> means "contains anywhere", which over-matches — a link to <code>/articles/what-is-http</code> would wrongly get the icon. Close, but not anchored.',
          },
          {
            id: "ends-with",
            text: '<code>a[href$="http"]</code>',
            correct: false,
            explanation:
              '<code>$=</code> means "ends with" — the mirror image of what you want. Almost no URL ends in <code>http</code>, so this matches essentially nothing.',
          },
          {
            id: "equals",
            text: '<code>a[href="http"]</code>',
            correct: false,
            explanation:
              "Plain <code>=</code> demands the value be <em>exactly</em> <code>http</code>. Since no real link has that as its complete href, nothing matches.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Three of the four operators are about position within the value.",
        "Which symbol anchors the beginning of a string in a regular expression?",
      ],
    },
  },

  {
    id: "css-not-selector",
    slug: "specificity-of-not",
    title: "What is the specificity of :not()?",
    topics: ["css-selectors", "specificity", "pseudo-classes"],
    relatedModule: "css-positioning",
    step: {
      id: "css-not-selector",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "What is the specificity of :not()?",
        body: "<p>Two rules both match a <code>&lt;button class=\"btn\"&gt;</code> that has no <code>disabled</code> attribute. Work out which colour wins.</p><p>The question turns on whether <code>:not()</code> itself adds weight, and whether what is <em>inside</em> it counts.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: ".btn:not([disabled]) { color: green; }\n.btn { color: red; }",
        codeLanguage: "css",
        options: [
          {
            id: "green-wins",
            text: "Green — <code>:not()</code> adds nothing itself, but its argument counts, making it <code>0-2-0</code>",
            correct: true,
            explanation:
              "Correct. The <code>:not()</code> wrapper contributes zero, but the selector inside it counts normally — so <code>[disabled]</code> adds one to the class column. That gives <code>0-2-0</code> against the plain <code>.btn</code>'s <code>0-1-0</code>, and green wins regardless of source order.",
          },
          {
            id: "red-wins",
            text: "Red — it comes later in the file and both are single-class selectors",
            correct: false,
            explanation:
              "This would be right if the two were equally specific, but they are not — the argument inside <code>:not()</code> tips it. Source order only breaks genuine ties.",
          },
          {
            id: "not-is-free",
            text: "Green — because <code>:not()</code> counts as a whole extra class on its own",
            correct: false,
            explanation:
              "Right answer, wrong mechanism — and the distinction matters. The pseudo-class wrapper is worth zero; all the weight comes from its argument. With <code>:not(div)</code> you would gain an <em>element</em>, not a class.",
          },
          {
            id: "invalid",
            text: "Neither — you cannot put an attribute selector inside <code>:not()</code>",
            correct: false,
            explanation:
              "You can. Modern <code>:not()</code> accepts a full selector list, including attributes, classes and even complex selectors.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Does the <code>:not()</code> wrapper itself carry weight, or only what is inside it?",
        "Count the specificity of <code>.btn[disabled]</code> and compare.",
      ],
    },
  },

  {
    id: "css-universal-inherit",
    slug: "why-is-the-colour-not-inherited",
    title: "Debug: why did the link stay blue?",
    topics: ["css-selectors", "inheritance", "debugging"],
    relatedModule: "css-positioning",
    step: {
      id: "css-universal-inherit",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: why did the link stay blue?",
        body: "<p>A colour is set on <code>body</code>, and every piece of text on the page picks it up — except the links, which stay browser-blue.</p><p>Inheritance is working correctly here. Ask what could beat it.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: "body { color: #333; }\n\n<!-- <p>Some text <a href=\"/x\">a link</a></p> -->",
        codeLanguage: "css",
        options: [
          {
            id: "ua-stylesheet",
            text: "The browser's own stylesheet sets a colour on <code>a</code>, and a direct rule always beats an inherited value",
            correct: true,
            explanation:
              "Correct. Inheritance is the weakest source of a value: any rule that targets the element directly wins, including the browser's default stylesheet. Every browser ships <code>a:-webkit-any-link { color: -webkit-link }</code> or similar, so you must set <code>a { color: inherit; }</code> explicitly if you want links to follow the body colour.",
          },
          {
            id: "not-inheritable",
            text: "<code>color</code> is not an inheritable property",
            correct: false,
            explanation:
              "It very much is — that is why the paragraph text changed. If <code>color</code> did not inherit, nothing on the page would have picked up <code>#333</code>.",
          },
          {
            id: "specificity-body",
            text: "<code>body</code> has too low specificity to reach the link",
            correct: false,
            explanation:
              "Specificity only compares rules that match the <em>same</em> element. The <code>body</code> rule never competes for the link — it simply passes a value down, and that inherited value loses to any direct rule.",
          },
          {
            id: "needs-important",
            text: "You need <code>!important</code> on the body rule",
            correct: false,
            explanation:
              "That would work but is the wrong tool, and it does not address the cause. Setting <code>a { color: inherit; }</code> targets the link directly and keeps the cascade sane.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "The paragraph text did change colour, so inheritance is working.",
        "What already sets a colour on links before your stylesheet loads?",
      ],
    },
  },
];
