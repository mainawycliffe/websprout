import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-intro-codelab",
  slug: "codelab-first-script",
  title: "Codelab: Your First JS File",
  description:
    "Create a real JavaScript file on your computer and run it in the browser to build a working tip calculator page.",
  order: 7,
  steps: [
    {
      id: "codelab-intro",
      type: "explanation",
      instruction: {
        heading: "In this codelab, you'll create a real JavaScript file on your computer and run it in the browser!",
        body: "So far, you've been writing JavaScript inside the WebSprout playground. That's great for learning, but real websites use separate .js files that the browser downloads and executes. In this codelab, you'll create an HTML page and a JavaScript file from scratch, open them in your browser, and see your tip calculator come to life — just like a real web developer would.",
        docLinks: [
          {
            label: "JavaScript basics",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity",
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
      id: "codelab-setup",
      type: "explanation",
      instruction: {
        heading: "Step 1: Create your project folder",
        body: "Before writing any code, you need a folder to keep your files organized. Open your terminal (the program where you type commands) and create a new folder, then move into it. The `mkdir` command creates a new directory (folder), and `cd` changes your current directory so you're working inside it.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you don't have a code editor, VS Code is free and beginner-friendly. Download it at https://code.visualstudio.com. You can also use any plain text editor — just don't use a word processor like Google Docs or Microsoft Word, which add hidden formatting.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// Open your terminal and type:\n// mkdir my-first-js\n// cd my-first-js",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-html",
      type: "explanation",
      instruction: {
        heading: "Step 2: Create the HTML file",
        body: "Create a new file called `index.html` in your project folder and paste in the code shown below. This is a minimal HTML page with a heading, a paragraph where we'll display our results, and — crucially — a `<script>` tag at the bottom that links to our JavaScript file. The `src` attribute tells the browser which file to load and run.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The `<script>` tag should go at the bottom of `<body>` so the HTML loads first. If the script runs before the HTML elements exist, it won't be able to find them. Placing scripts at the end ensures all your content is ready before JavaScript tries to interact with it.",
          },
        ],
        docLinks: [
          {
            label: "<script> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First JS Page</title>\n</head>\n<body>\n  <h1>Tip Calculator</h1>\n  <p id="result">Calculating...</p>\n\n  <script src="script.js"></script>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-js",
      type: "explanation",
      instruction: {
        heading: "Step 3: Create the JavaScript file",
        body: "Create a new file called `script.js` in the same folder as your `index.html`. This is where all your JavaScript code lives. Line by line, here's what the code does:\n\n- `const billAmount = 42.50;` — stores the bill amount in a constant.\n- `const tipRate = 0.18;` — stores the tip percentage (18%) as a decimal.\n- `const tipAmount = billAmount * tipRate;` — multiplies the bill by the rate to get the tip.\n- `const total = billAmount + tipAmount;` — adds the bill and tip together.\n- `console.log(\"Tip:\", tipAmount);` — prints the tip to the browser console.\n- `console.log(\"Total:\", total);` — prints the total to the console.",
        docLinks: [
          {
            label: "console.log()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/console/log_static",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// script.js\nconst billAmount = 42.50;\nconst tipRate = 0.18;\nconst tipAmount = billAmount * tipRate;\nconst total = billAmount + tipAmount;\n\nconsole.log("Tip:", tipAmount);\nconsole.log("Total:", total);',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-run",
      type: "explanation",
      instruction: {
        heading: "Step 4: Open in browser and check the console",
        body: "Open `index.html` in your browser — you can double-click the file in your file manager or drag it directly into a browser window. You'll see the heading \"Tip Calculator\" and the text \"Calculating...\" but you won't see the tip results on the page yet — they're in the console!\n\nOpen DevTools with **Ctrl+Shift+J** (Linux/Windows) or **Cmd+Option+J** (Mac). Click the \"Console\" tab if it isn't already selected. You should see two lines:\n\n`Tip: 7.65`\n`Total: 50.15`\n\nThose numbers came from your `script.js` file — the browser loaded it, ran your code, and printed the results to the console.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you see an error like \"Failed to load resource\" or \"script.js not found,\" check that script.js is in the same folder as index.html and that the filename is spelled exactly the same in your `<script>` tag.",
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
      id: "codelab-display",
      type: "explanation",
      instruction: {
        heading: "Step 5: Show results on the page",
        body: "Console output is useful for debugging, but real users need to see results on the page itself. Update your `script.js` to include two extra lines at the bottom. `document.getElementById(\"result\")` finds the HTML element with `id=\"result\"` — that's our `<p>` tag. Then `.textContent` lets us change the text inside it. The `.toFixed(2)` method rounds a number to two decimal places, so you get clean dollar amounts like $7.65 instead of long decimals. We'll cover `document.getElementById` in depth in a later module — for now, just know it's how JavaScript talks to HTML.",
        docLinks: [
          {
            label: "document.getElementById()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById",
            type: "js-method",
          },
          {
            label: "Number.toFixed()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Using `.textContent` is the safest way to set text on an element. There's also `.innerHTML`, but it can execute HTML and scripts — which is a security risk. Stick with `.textContent` whenever you're inserting plain text.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Update script.js to also show results on the page\nconst billAmount = 42.50;\nconst tipRate = 0.18;\nconst tipAmount = billAmount * tipRate;\nconst total = billAmount + tipAmount;\n\n// Show in console\nconsole.log("Tip:", tipAmount);\nconsole.log("Total:", total);\n\n// Show on the page\nconst resultElement = document.getElementById("result");\nresultElement.textContent = "Tip: $" + tipAmount.toFixed(2) + " | Total: $" + total.toFixed(2);',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-challenge",
      type: "explanation",
      instruction: {
        heading: "Challenge: Make it your own",
        body: "Try changing the bill amount and tip rate to different values. Save the file and refresh the browser to see updated results. Experiment!\n\nHere are some ideas to push yourself further:\n\n- Change the bill to $85.00 and the tip to 20% (0.20). Do the numbers on the page update correctly?\n- Add a second `<p>` element in your HTML with a different id (e.g., `id=\"tip-only\"`). In your JavaScript, use `document.getElementById(\"tip-only\")` to show just the tip amount separately.\n- Try adding a third variable for the number of people splitting the bill, then calculate and display each person's share.\n\nThere's no single right answer here — the goal is to experiment, break things, fix them, and build confidence writing real JavaScript files.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Every time you change your JavaScript file, you need to refresh the browser page to see the updated results. The browser only runs the script once when the page loads.",
          },
        ],
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
