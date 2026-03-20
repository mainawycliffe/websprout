import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-capstone-quiz-game",
  slug: "capstone-quiz-game",
  title: "Capstone: Quiz Game",
  description:
    "Combine everything you've learned — arrays, objects, loops, conditionals, and comparisons — to build an interactive quiz game.",
  order: 9,
  steps: [
    {
      id: "capstone-intro",
      type: "explanation",
      instruction: {
        heading: "Let's build a quiz game!",
        body: "You now know how to compare values, make decisions with if/else and switch, repeat actions with loops, and handle errors. It's time to combine all of these skills to build something real: a **quiz game engine**.\n\nHere's what the game will do:\n1. Store questions in an array of objects\n2. Loop through each question\n3. Check the player's answer using conditionals\n4. Track the score\n5. Display the final result\n\nThis is exactly how real quiz apps work — platforms like Kahoot, Duolingo, and Google Forms all follow this same pattern: data structure → loop → compare → score → display.\n\nWe'll build it step by step. By the end, you'll have a working quiz engine that you could customize with your own questions.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "This capstone uses only standard JavaScript features — arrays, objects, for loops, if/else, and template literals. These are all part of the ECMAScript specification and work in every modern browser without any additional libraries.",
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
      id: "define-questions",
      type: "explanation",
      instruction: {
        heading: "Step 1: Define the questions",
        body: "Every quiz needs questions. We'll store them as an **array of objects**, where each object represents one question with three properties:\n\n- `question` — The question text\n- `answer` — The correct answer\n- `options` — An array of possible choices (for display purposes)\n\nThis data structure is clean and extensible. Want to add a new question? Just add another object to the array. Want to add a difficulty rating? Add a `difficulty` property. This pattern — arrays of objects — is how virtually all data-driven apps store their content.",
      },
      config: {
        type: "explanation",
        demoCode: `let questions = [\n  {\n    question: "What does HTML stand for?",\n    options: ["Hyper Text Markup Language", "Hot Mail", "How To Make Links"],\n    answer: "Hyper Text Markup Language"\n  },\n  {\n    question: "What symbol starts a CSS ID selector?",\n    options: [".", "#", "@"],\n    answer: "#"\n  },\n  {\n    question: "Which keyword declares a variable that can be reassigned?",\n    options: ["const", "let", "var"],\n    answer: "let"\n  },\n  {\n    question: "What does === check?",\n    options: ["Value only", "Type only", "Value and type"],\n    answer: "Value and type"\n  }\n];\n\nconsole.log("Quiz has " + questions.length + " questions.");`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "loop-and-check",
      type: "explanation",
      instruction: {
        heading: "Step 2: Loop through and check answers",
        body: "Now we loop through the questions array, simulate a player's answers, and check each one using `if/else` and `===`. We keep a `score` variable that starts at 0 and increases by 1 for each correct answer.\n\nIn a real quiz app, the player's answer would come from clicking a button or typing in an input. For our console version, we'll simulate the answers in an array.\n\nNotice how we combine multiple concepts:\n- **Array access** (`questions[i]`) to get each question object\n- **Dot notation** (`.answer`) to read the correct answer\n- **Strict equality** (`===`) to compare the player's answer\n- **Increment** (`score++`) to update the running total",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Keep your index in sync",
            body: "When using two parallel arrays (questions and playerAnswers), make sure they have the same length and that index `i` refers to the same question in both. Mismatched indices are a common source of bugs in quiz-style applications.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `let questions = [\n  { question: "What does HTML stand for?", answer: "Hyper Text Markup Language" },\n  { question: "What symbol starts a CSS ID selector?", answer: "#" },\n  { question: "Which keyword declares a reassignable variable?", answer: "let" },\n  { question: "What does === check?", answer: "Value and type" }\n];\n\n// Simulated player answers\nlet playerAnswers = ["Hyper Text Markup Language", "#", "const", "Value and type"];\n\nlet score = 0;\n\nfor (let i = 0; i < questions.length; i++) {\n  let correct = questions[i].answer;\n  let given = playerAnswers[i];\n\n  if (given === correct) {\n    console.log("Q" + (i + 1) + ": Correct!");\n    score++;\n  } else {\n    console.log("Q" + (i + 1) + ": Wrong. The answer was: " + correct);\n  }\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "display-results",
      type: "explanation",
      instruction: {
        heading: "Step 3: Display the final results",
        body: "After the loop, we have the total score. Now we use `if/else` (or a ternary) to display a final message based on how well the player did.\n\nThis step brings together everything: the loop finished counting, and now conditionals decide the feedback message. It's the same pattern Netflix uses after you finish a series — based on your watch data, it decides what to recommend next.",
      },
      config: {
        type: "explanation",
        demoCode: `// (continuing from previous step)\n// score = 3 out of 4\n\nlet total = questions.length;\nlet percentage = Math.round((score / total) * 100);\n\nconsole.log("\\n--- Results ---");\nconsole.log("Score: " + score + "/" + total + " (" + percentage + "%)");\n\nif (percentage === 100) {\n  console.log("Perfect score! You're a web expert!");\n} else if (percentage >= 75) {\n  console.log("Great job! You know your stuff.");\n} else if (percentage >= 50) {\n  console.log("Not bad! Review the ones you missed.");\n} else {\n  console.log("Keep studying! You'll get there.");\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-your-quiz",
      type: "js-console",
      instruction: {
        heading: "Build the complete quiz game",
        body: "Now it's your turn! Build the entire quiz game from scratch:\n\n1. Create a `questions` array with at least 3 question objects (each with `question` and `answer` properties)\n2. Create a `playerAnswers` array with simulated answers (get at least one wrong!)\n3. Loop through the questions, compare answers, and track the score\n4. After the loop, display the score as `\"Score: X/Y\"`\n5. Add an if/else that prints a message based on performance\n\nMake the questions about anything you like! The expected output format for the final line should be `\"Score: X/Y\"` where X is correct answers and Y is total questions.",
      },
      config: {
        type: "js-console",
        starterCode: `// Step 1: Create your questions array\nlet questions = [\n  // Add at least 3 question objects with { question, answer } properties\n];\n\n// Step 2: Simulate player answers\nlet playerAnswers = [\n  // Add answers (get at least one wrong!)\n];\n\n// Step 3: Loop, compare, and track score\nlet score = 0;\n\n// Write your for loop here\n\n// Step 4: Display the score\n\n// Step 5: Add a performance message with if/else\n`,
        expectedOutput: ["Score:"],
      },
      validation: {
        type: "console-output-match",
        criteria: { requiredOutputCount: 2 },
      },
      hints: [
        'Each question object needs two properties: { question: "...", answer: "..." }',
        "Make sure your playerAnswers array has the same number of entries as your questions array.",
        "Inside the loop, use questions[i].answer === playerAnswers[i] to check each answer.",
        'After the loop, console.log("Score: " + score + "/" + questions.length)',
      ],
    },
  ],
};
