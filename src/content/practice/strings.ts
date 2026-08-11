import type { PracticeQuestionSeed } from "@/types/practice";

export const stringQuestions: PracticeQuestionSeed[] = [
  {
    id: "strings-reverse",
    slug: "reverse-a-string",
    title: "Reverse a string",
    topics: ["strings", "arrays"],
    relatedModule: "js-data-types",
    step: {
      id: "strings-reverse",
      type: "code-challenge",
      difficulty: "easy",
      instruction: {
        heading: "Reverse a string",
        body: "<p>Write <code>reverseString(text)</code> that returns the characters of <code>text</code> in reverse order — <code>\"hello\"</code> becomes <code>\"olleh\"</code>.</p><p>Here is the wrinkle worth thinking about: strings in JavaScript are <strong>immutable</strong>, so there is no <code>text.reverse()</code>. Arrays, on the other hand, do have <code>reverse</code>. That gap suggests the shape of the solution — get from a string to an array, do the work, then get back again.</p>",
        docLinks: [
          {
            label: "MDN: String.prototype.split()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
            type: "js-method",
          },
          {
            label: "MDN: Array.prototype.join()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "<code>split(\"\")</code> splits by UTF-16 code unit, not by what a human calls a character. It reverses plain text fine, but it will scramble emoji and some scripts. <code>[...text]</code> iterates by code point and handles far more of them — worth knowing the moment you touch real user input.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "reverseString",
        language: "javascript",
        starterCode:
          "function reverseString(text) {\n  // Strings have no .reverse() — but arrays do.\n}\n",
        tests: [
          { name: "reverses a word", args: ["hello"], expected: "olleh" },
          { name: "handles a single character", args: ["a"], expected: "a" },
          { name: "handles an empty string", args: [""], expected: "" },
          { name: "keeps spaces in place", args: ["ab cd"], expected: "dc ba" },
          { name: "a palindrome comes back unchanged", args: ["racecar"], expected: "racecar" },
        ],
        solution: 'function reverseString(text) {\n  return text.split("").reverse().join("");\n}\n',
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Three steps: string → array → reversed array → string.",
        "<code>text.split(\"\")</code> gives you an array of characters.",
        "<code>return text.split(\"\").reverse().join(\"\");</code>",
      ],
    },
  },

  {
    id: "strings-chain-predict",
    slug: "predict-the-string-chain",
    title: "Debug: why is this name still wrong?",
    topics: ["strings", "debugging", "immutability"],
    relatedModule: "js-data-types",
    step: {
      id: "strings-chain-predict",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: why is this name still wrong?",
        body: "<p>A teammate expects this to log <code>ADA</code>, but it does not. Read it carefully and work out what actually reaches the console.</p><p>Do not skim — the bug here is one that survives code review precisely because every individual line <em>looks</em> right.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'let name = "  ada  ";\nname.trim();\nname.toUpperCase();\nconsole.log(name);',
        codeLanguage: "javascript",
        options: [
          {
            id: "ada-upper",
            text: "<code>ADA</code>",
            correct: false,
            explanation:
              "This is what the code <em>looks</em> like it does, which is why the bug is so easy to ship. Both methods ran — but nothing captured what they returned.",
          },
          {
            id: "unchanged",
            text: '<code>"  ada  "</code> — unchanged, spaces and all',
            correct: true,
            explanation:
              "Correct. Strings are <strong>immutable</strong>, so <code>trim</code> and <code>toUpperCase</code> cannot change <code>name</code> — they each return a <em>new</em> string, and both of those return values were thrown away. The fix is to reassign: <code>name = name.trim().toUpperCase();</code>. This is the same trap in reverse from array methods like <code>sort</code>, which <em>do</em> mutate.",
          },
          {
            id: "trimmed",
            text: '<code>"ada"</code> — trimmed but not uppercased',
            correct: false,
            explanation:
              "That would mean <code>trim</code> mutates while <code>toUpperCase</code> does not. Neither mutates — string methods are consistent about this, which is at least a mercy.",
          },
          {
            id: "error",
            text: "It throws a TypeError",
            correct: false,
            explanation:
              "No error — this is the frustrating part. Both calls are perfectly legal; the results are simply discarded. Silent wrong answers are harder to find than crashes.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Ask what <code>trim()</code> <em>returns</em>, and where that return value goes.",
        "Nothing on those two middle lines is assigned to anything.",
      ],
    },
  },

  {
    id: "strings-palindrome",
    slug: "palindrome-ignoring-punctuation",
    title: "Palindrome, ignoring punctuation",
    topics: ["strings", "regex", "normalisation"],
    relatedModule: "js-data-types",
    step: {
      id: "strings-palindrome",
      type: "code-challenge",
      difficulty: "advanced",
      instruction: {
        heading: "Palindrome, ignoring punctuation",
        body: "<p>Write <code>isPalindrome(text)</code> that returns <code>true</code> when <code>text</code> reads the same forwards and backwards — <strong>ignoring case, spaces and punctuation</strong>. So <code>\"A man, a plan, a canal: Panama\"</code> is <code>true</code>.</p><p>The comparison is the easy half. The real work is <strong>normalising</strong> first: deciding what counts as a character you care about, and stripping everything else. Solve that half on its own and the rest is three lines.</p><p>Get the normalisation right and every test passes at once. Get it wrong and you will see a scattered mix of passes and failures — which is itself a useful signal about where the bug is.</p>",
        analogy:
          "Comparing two signatures. First you strip away the smudges and the differently-coloured ink, then you check whether the shapes match.",
        docLinks: [
          {
            label: "MDN: String.prototype.replace()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
            type: "js-method",
          },
          {
            label: "MDN: Regular expressions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — decide what you keep, not what you remove",
            body: "Listing every punctuation mark to delete is an endless game. Inverting it — keep only letters and digits, drop everything else — is one small pattern that handles marks you never thought of.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "isPalindrome",
        language: "javascript",
        starterCode:
          "function isPalindrome(text) {\n  // 1. Normalise: lowercase, and keep only letters and digits.\n  // 2. Compare the result with its own reverse.\n}\n",
        tests: [
          { name: "a simple palindrome", args: ["racecar"], expected: true },
          { name: "a simple non-palindrome", args: ["hello"], expected: false },
          { name: "ignores case", args: ["RaceCar"], expected: true },
          { name: "ignores spaces and punctuation", args: ["A man, a plan, a canal: Panama"], expected: true },
          { name: "an empty string counts as a palindrome", args: [""], expected: true },
          { name: "digits work too", args: ["12321"], expected: true },
          { name: "punctuation alone is not a free pass", args: ["ab,ba"], expected: true },
          { name: "still says no when it genuinely differs", args: ["A man, a plan, a canal: Panamas"], expected: false },
        ],
        solution:
          'function isPalindrome(text) {\n  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return clean === clean.split("").reverse().join("");\n}\n',
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Normalise first, compare second. Do not try to do both in one pass.",
        "<code>const clean = text.toLowerCase().replace(/[^a-z0-9]/g, \"\");</code> — the <code>^</code> inside the brackets means <em>not</em> these.",
        "<code>return clean === clean.split(\"\").reverse().join(\"\");</code>",
      ],
    },
  },
];
