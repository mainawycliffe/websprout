import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-logical-operators",
  slug: "logical-operators",
  title: "Logical Operators",
  description:
    "Combine multiple conditions with AND, OR, and NOT to build complex decision-making logic.",
  order: 3,
  steps: [
    {
      id: "why-combine-conditions",
      type: "explanation",
      instruction: {
        heading: "When one condition isn't enough",
        body: "Real-world decisions rarely depend on a single yes-or-no question. To board a plane, you need a valid ticket AND a photo ID. To get a student discount, you must be under 25 OR have a student card. To enter a members-only area, you must NOT be on the banned list.\n\nJavaScript gives you three **logical operators** to combine conditions:\n- `&&` — **AND**: Are *both* conditions true?\n- `||` — **OR**: Is *at least one* condition true?\n- `!` — **NOT**: Flip true to false, or false to true.\n\nThese operators let you build sophisticated conditions inside a single `if` statement, instead of nesting multiple if/else blocks.",
        analogy:
          "Logical operators are like combining questions. AND means 'Are BOTH things true?' — like a bouncer checking that you have a ticket AND you're on the guest list. OR means 'Is AT LEAST one thing true?' — like a store accepting cash OR card. NOT flips the answer — like asking 'Is this seat NOT taken?'",
        docLinks: [
          {
            label: "Logical AND (&&)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND",
            type: "js-operator",
          },
          {
            label: "Logical OR (||)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR",
            type: "js-operator",
          },
          {
            label: "Logical NOT (!)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Logical operators in JavaScript follow the same truth table rules used in formal logic and every other programming language. If you learn AND, OR, NOT here, the concepts transfer directly to Python, Java, SQL, and beyond.",
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
      id: "and-or-not",
      type: "explanation",
      instruction: {
        heading: "How &&, ||, and ! work",
        body: "**AND (&&)** — Returns `true` only if *both* sides are true:\n- `true && true` → `true`\n- `true && false` → `false`\n- `false && true` → `false`\n- `false && false` → `false`\n\n**OR (||)** — Returns `true` if *either* side (or both) is true:\n- `true || true` → `true`\n- `true || false` → `true`\n- `false || true` → `true`\n- `false || false` → `false`\n\n**NOT (!)** — Flips the value:\n- `!true` → `false`\n- `!false` → `true`\n\nReal-world example: On YouTube, a comment is shown if `(!isDeleted && !isSpam)` — it must NOT be deleted AND NOT be spam.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Readability with parentheses",
            body: "When combining && and || in the same condition, use parentheses to make your intent crystal clear: `if ((age >= 18 && hasID) || isVIP)`. Without parentheses, operator precedence rules apply (&& binds tighter than ||), which can produce unexpected results.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `let age = 20;\nlet hasTicket = true;\nlet isVIP = false;\n\n// AND: both must be true\nconsole.log(age >= 18 && hasTicket); // true\n\n// OR: at least one must be true\nconsole.log(isVIP || hasTicket);     // true\n\n// NOT: flips the value\nconsole.log(!isVIP);                 // true`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "short-circuit",
      type: "explanation",
      instruction: {
        heading: "Short-circuit evaluation",
        body: "JavaScript is lazy in a smart way. With `&&`, if the left side is `false`, JavaScript doesn't even check the right side — the result is already guaranteed to be `false`. With `||`, if the left side is `true`, the right side is skipped because the result is already `true`.\n\nThis is called **short-circuit evaluation**, and it's not just a performance trick — developers use it intentionally:\n\n```\n// Only call greet() if user exists\nuser && greet(user);\n\n// Use a default value if name is empty\nlet displayName = username || \"Anonymous\";\n```\n\nYou'll see these patterns constantly in real-world JavaScript. For now, just know that JavaScript stops evaluating as soon as the outcome is certain.",
        docLinks: [
          {
            label: "Short-circuit evaluation",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Short-circuit with &&\nlet isLoggedIn = false;\nisLoggedIn && console.log("Welcome!"); // nothing happens — skipped!\n\n// Short-circuit with ||\nlet username = "";\nlet displayName = username || "Anonymous";\nconsole.log(displayName); // "Anonymous"`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "combine-conditions-gap",
      type: "gap-fill",
      instruction: {
        heading: "Combine conditions",
        body: "Fill in the correct logical operator (`&&`, `||`, or `!`) for each scenario.",
      },
      config: {
        type: "gap-fill",
        template:
          '// Can ride the rollercoaster: must be tall enough AND old enough\nif (height >= 120 {{op1}} age >= 12) {\n  console.log("Enjoy the ride!");\n}\n\n// Free entry: children under 5 OR seniors over 65\nif (age < 5 {{op2}} age > 65) {\n  console.log("Free entry!");\n}\n\n// Show notification only if NOT muted\nif ({{op3}}isMuted) {\n  console.log("You have a new message!");\n}',
        gaps: [
          {
            id: "op1",
            placeholder: "operator",
            acceptedAnswers: ["&&"],
            caseSensitive: true,
          },
          {
            id: "op2",
            placeholder: "operator",
            acceptedAnswers: ["||"],
            caseSensitive: true,
          },
          {
            id: "op3",
            placeholder: "operator",
            acceptedAnswers: ["!"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["op1", "op2", "op3"],
        },
      },
      hints: [
        "The rollercoaster requires BOTH conditions — which operator means 'both must be true'?",
        "Free entry applies to either children OR seniors — which operator means 'at least one'?",
        "We want to show the notification when muted is NOT true — which operator flips a boolean?",
      ],
    },
    {
      id: "ticket-price-calculator",
      type: "js-console",
      instruction: {
        heading: "Build a ticket price calculator",
        body: "Write a program that calculates a movie ticket price based on age and membership:\n\n- **Base price**: $12\n- **Child discount** (age < 12): $6\n- **Senior discount** (age >= 65): $8\n- **Member discount**: If the person is a member AND between 12–64, the price is $10\n- Everyone else pays full price ($12)\n\nUse the starter variables. The expected output for a 30-year-old member is `\"Ticket price: $10\"`.",
      },
      config: {
        type: "js-console",
        starterCode: `let age = 30;\nlet isMember = true;\n\n// Calculate the ticket price using if/else and logical operators\n// Output should be like: "Ticket price: $10"\n`,
        expectedOutput: ["Ticket price: $10"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["Ticket price: $10"] },
      },
      hints: [
        "Check child and senior discounts first, since they apply regardless of membership.",
        "For the member discount, combine two conditions with &&: isMember && age >= 12 && age < 65",
        "The else at the end catches everyone who doesn't qualify for any discount.",
      ],
    },
  ],
};
