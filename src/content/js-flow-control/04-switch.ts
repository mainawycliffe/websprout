import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-switch",
  slug: "switch",
  title: "Switch Statements",
  description:
    "Use switch for cleaner code when comparing one value against many possible matches.",
  order: 4,
  steps: [
    {
      id: "when-switch-is-better",
      type: "explanation",
      instruction: {
        heading: "When if/else chains get too long",
        body: "Imagine you're building a language selector for a website. The user picks a language code, and you need to display a greeting:\n\n```\nif (lang === \"en\") { ... }\nelse if (lang === \"es\") { ... }\nelse if (lang === \"fr\") { ... }\nelse if (lang === \"de\") { ... }\nelse if (lang === \"ja\") { ... }\nelse { ... }\n```\n\nWhen you're comparing **one value** against **many possible matches**, this pattern gets repetitive. Every line repeats `lang ===`. The `switch` statement was designed for exactly this scenario — it's cleaner, easier to read, and makes the intent obvious: 'I have one value and several cases to match against.'",
        analogy:
          "A switch is like a vending machine — you press a button (provide a value), and the machine checks which slot matches to give you the right item. You don't ask 'Is it A? Is it B? Is it C?' one by one — you just look up the slot directly.",
        docLinks: [
          {
            label: "switch",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "switch-syntax",
      type: "explanation",
      instruction: {
        heading: "Switch syntax and the break keyword",
        body: "Here's the anatomy of a switch statement:\n\n```\nswitch (expression) {\n  case value1:\n    // code if expression === value1\n    break;\n  case value2:\n    // code if expression === value2\n    break;\n  default:\n    // code if no case matched\n}\n```\n\n**How it works:**\n1. JavaScript evaluates the `expression` once.\n2. It compares the result to each `case` value using strict equality (`===`).\n3. When a match is found, it runs that case's code.\n4. The `break` statement exits the switch. **Without it, execution 'falls through' into the next case!**\n5. The `default` case is like `else` — it runs if nothing matched.\n\nThe `default` case is optional but recommended. Always include it to handle unexpected values gracefully.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Don't forget break!",
            body: "Forgetting `break` is one of the most common bugs with switch. Without it, JavaScript runs the matching case AND every case below it until it hits a break or the end of the switch. This is called 'fall-through.' While fall-through is occasionally useful on purpose, 99% of the time it's a bug. Always add break after each case.",
          },
          {
            variant: "standard",
            title: "Web Standard",
            body: "Switch uses strict equality (===) for comparisons, just like the === operator. The value `5` will NOT match the case `\"5\"` because they are different types. This is consistent with JavaScript's strict comparison behavior.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `let fruit = "apple";\n\nswitch (fruit) {\n  case "apple":\n    console.log("Apples are $1.50/lb");\n    break;\n  case "banana":\n    console.log("Bananas are $0.75/lb");\n    break;\n  case "orange":\n    console.log("Oranges are $2.00/lb");\n    break;\n  default:\n    console.log("Sorry, we don't carry that fruit.");\n}\n// Output: "Apples are $1.50/lb"`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "complete-switch",
      type: "gap-fill",
      instruction: {
        heading: "Complete the switch statement",
        body: "Fill in the missing keywords to make this traffic light switch statement work correctly.",
      },
      config: {
        type: "gap-fill",
        template:
          'let light = "red";\n\n{{keyword1}} (light) {\n  {{keyword2}} "green":\n    console.log("Go!");\n    {{keyword3}};\n  case "yellow":\n    console.log("Slow down!");\n    break;\n  case "red":\n    console.log("Stop!");\n    break;\n  {{keyword4}}:\n    console.log("Invalid light color.");\n}',
        gaps: [
          {
            id: "keyword1",
            placeholder: "keyword",
            acceptedAnswers: ["switch"],
            caseSensitive: true,
          },
          {
            id: "keyword2",
            placeholder: "keyword",
            acceptedAnswers: ["case"],
            caseSensitive: true,
          },
          {
            id: "keyword3",
            placeholder: "keyword",
            acceptedAnswers: ["break"],
            caseSensitive: true,
          },
          {
            id: "keyword4",
            placeholder: "keyword",
            acceptedAnswers: ["default"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["keyword1", "keyword2", "keyword3", "keyword4"],
        },
      },
      hints: [
        "The statement that compares one value against many cases is called...",
        "Each possible match is labeled with the keyword...",
        "To prevent fall-through, you exit each case with...",
        "The catch-all case (like else) is called...",
      ],
    },
    {
      id: "day-formatter",
      type: "js-console",
      instruction: {
        heading: "Build a day-of-the-week formatter",
        body: "Write a switch statement that converts a day number (1-7) to its name:\n- 1 → `\"Monday\"`\n- 2 → `\"Tuesday\"`\n- 3 → `\"Wednesday\"`\n- 4 → `\"Thursday\"`\n- 5 → `\"Friday\"`\n- 6 → `\"Saturday\"`\n- 7 → `\"Sunday\"`\n- Anything else → `\"Invalid day\"`\n\nThe starter code gives you day = 3. Your output should be `\"Wednesday\"`. Don't forget `break` after each case!",
      },
      config: {
        type: "js-console",
        starterCode: `let day = 3;\n\n// Write a switch statement that converts the day number to a name\n// and console.log() the result\n`,
        expectedOutput: ["Wednesday"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["Wednesday"] },
      },
      hints: [
        "Start with: switch (day) {",
        "Each case matches a number: case 1: ... break;",
        "Don't forget the default case for invalid numbers.",
        "Make sure to console.log() the day name inside each case.",
      ],
    },
  ],
};
