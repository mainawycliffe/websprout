import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-capstone-student-roster",
  slug: "capstone-student-roster",
  title: "Capstone: Student Roster",
  description:
    "Combine everything you've learned — strings, numbers, booleans, arrays, objects, loops, and template literals — to build a complete student roster system.",
  order: 9,
  steps: [
    {
      id: "capstone-intro",
      type: "explanation",
      instruction: {
        heading: "Let's build a student roster!",
        body: "You've learned all the fundamental data types and structures in JavaScript — strings for text, numbers for math, booleans for decisions, arrays for lists, and objects for labeled data. Now it's time to combine them into something real.\n\nWe'll build a student roster that stores student information as objects, keeps them in an array, loops through to display them, computes the class average grade, and finds the top scorer. This is exactly how real applications work — a contacts app, a grade book, a leaderboard — they all follow this same pattern of objects in arrays, processed with loops.",
        analogy:
          "Think of this like building a digital grade book. Each student is a card with their info (an object), all the cards go into a filing cabinet in order (an array), and you flip through them one by one (a loop) to calculate grades and find the best student.",
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-create-students",
      type: "gap-fill",
      instruction: {
        heading: "Step 1: Create student objects",
        body: "Each student has a name (string), an age (number), and a grade (number out of 100). Create two student objects with the correct data types. The object uses curly braces, and each property has a key followed by a colon and its value.",
        docLinks: [
          {
            label: "Object initializer",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "let student1 = {\n  name: {{name1}},\n  age: 16,\n  grade: 92\n};\n\nlet student2 = {\n  name: \"Bob\",\n  age: 17,\n  grade: {{grade2}}\n};\n\nconsole.log(student1.name); // \"Alice\"\nconsole.log(student2.grade); // 85",
        gaps: [
          {
            id: "name1",
            placeholder: "value",
            acceptedAnswers: ["\"Alice\"", "'Alice'"],
            caseSensitive: true,
          },
          {
            id: "grade2",
            placeholder: "value",
            acceptedAnswers: ["85"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["name1", "grade2"],
        },
      },
      hints: [
        "Names are strings — they need quotes around them.",
        "Look at the console.log output to know what Bob's grade should be.",
      ],
    },
    {
      id: "capstone-array-of-students",
      type: "gap-fill",
      instruction: {
        heading: "Step 2: Build the roster array",
        body: "Now put all the students into a single array. An array of objects is the most common data structure in real applications — think of it like a spreadsheet where each row is a student object.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "You can define objects directly inside the array literal — no need to create separate variables first. This is the most common pattern in practice.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "let roster = [\n  { name: \"Alice\", age: 16, grade: 92 },\n  { name: \"Bob\", age: 17, grade: 85 },\n  { name: \"Charlie\", age: 16, grade: 97 },\n  { name: \"Diana\", age: 17, grade: 78 }\n];\n\nconsole.log(roster.{{lengthProp}});     // 4\nconsole.log(roster[{{index}}].name); // \"Charlie\"",
        gaps: [
          {
            id: "lengthProp",
            placeholder: "property",
            acceptedAnswers: ["length"],
            caseSensitive: true,
          },
          {
            id: "index",
            placeholder: "number",
            acceptedAnswers: ["2"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["lengthProp", "index"],
        },
      },
      hints: [
        "What property tells you how many items are in an array?",
        "Charlie is the third student — but remember, arrays start at index 0.",
      ],
    },
    {
      id: "capstone-loop-display",
      type: "js-console",
      instruction: {
        heading: "Step 3: Loop and display the roster",
        body: "Use a loop (either `for` or `.forEach()`) to print each student's information in this format:\n\n`Alice (age 16) — Grade: 92`\n\nUse template literals to build the string. This is exactly how a real grade book app would render its student list.",
        docLinks: [
          {
            label: "Array.prototype.forEach()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
            type: "js-method",
          },
          {
            label: "Template literals",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "let roster = [\n  { name: \"Alice\", age: 16, grade: 92 },\n  { name: \"Bob\", age: 17, grade: 85 },\n  { name: \"Charlie\", age: 16, grade: 97 },\n  { name: \"Diana\", age: 17, grade: 78 }\n];\n\n// Loop through and display each student\n// Format: \"Name (age X) — Grade: Y\"\n",
        expectedOutput: [
          "Alice (age 16) — Grade: 92",
          "Bob (age 17) — Grade: 85",
          "Charlie (age 16) — Grade: 97",
          "Diana (age 17) — Grade: 78",
        ],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["forEach", "console.log"],
        },
      },
      hints: [
        "Use roster.forEach((student) => { ... });",
        "Inside the loop: console.log(`${student.name} (age ${student.age}) — Grade: ${student.grade}`);",
        "Make sure to use the em dash character — (or just use a regular dash -).",
      ],
    },
    {
      id: "capstone-average-and-best",
      type: "js-console",
      instruction: {
        heading: "Step 4: Compute the average and find the top scorer",
        body: "Now for the interesting part: use the data to answer questions.\n\n1. **Compute the class average**: Loop through the roster, add up all grades, then divide by the number of students.\n2. **Find the highest grade**: Loop through and track the student with the best score.\n\nLog the average grade (rounded to 1 decimal place using `.toFixed(1)`) and the name of the top scorer.\n\nThis pattern — looping through data to compute summaries — is at the heart of data processing in every application.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "In production code, you'd often use `.reduce()` to compute sums and aggregates from arrays. We're using a simple loop here because it's clearer for beginners. The concept is the same — iterate through data, accumulate a result.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "let roster = [\n  { name: \"Alice\", age: 16, grade: 92 },\n  { name: \"Bob\", age: 17, grade: 85 },\n  { name: \"Charlie\", age: 16, grade: 97 },\n  { name: \"Diana\", age: 17, grade: 78 }\n];\n\n// 1. Calculate the average grade\nlet totalGrade = 0;\n// Loop to add up all grades...\n\n// 2. Find the top scorer\nlet topStudent = roster[0];\n// Loop to find the student with the highest grade...\n\n// Log results\n",
        expectedOutput: ["88.0", "Charlie"],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["totalGrade", "topStudent", "console.log"],
        },
      },
      hints: [
        "Loop through roster and add each student.grade to totalGrade.",
        "After the loop: let average = totalGrade / roster.length;",
        "Use average.toFixed(1) to get one decimal place.",
        "For the top scorer: inside a loop, if student.grade > topStudent.grade, update topStudent = student;",
        "Log topStudent.name to show the winner.",
      ],
    },
  ],
};
