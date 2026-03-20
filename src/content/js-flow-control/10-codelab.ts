import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-codelab-number-guesser",
  slug: "codelab-number-guesser",
  title: "Codelab: Number Guessing Game",
  description:
    "Build a real number guessing game in your browser using HTML, CSS, and JavaScript — no frameworks, no build tools.",
  order: 10,
  steps: [
    {
      id: "codelab-intro",
      type: "explanation",
      instruction: {
        heading: "What we're building",
        body: "In this codelab, you'll build a **Number Guessing Game** that runs in a real browser. The game picks a random number between 1 and 100, and the player guesses until they get it right. After each guess, the game tells them if the number is too high, too low, or correct — and tracks how many attempts it took.\n\nThis project uses everything from this module: comparison operators, if/else, loops (conceptually — the user drives the loop by clicking), and error handling. You'll write real HTML for the interface and real JavaScript for the logic.\n\n**What you need:**\n- A text editor (VS Code, or even Notepad)\n- A web browser (Chrome, Firefox, etc.)\n- A folder on your computer to save files\n\n**No build tools, no installs, no terminal commands** — just create files and open them in your browser.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Set up your workspace",
            body: "Create a new folder called `number-guesser` on your Desktop or in your Documents folder. All the files for this project go in that one folder. On Linux, you can run: `mkdir ~/Desktop/number-guesser`",
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
      id: "create-html",
      type: "explanation",
      instruction: {
        heading: "Step 1: Create the HTML page",
        body: "Create a file called `index.html` in your `number-guesser` folder. This file defines the game's user interface — an input field for the guess, a button to submit it, and areas to display feedback and attempt count.\n\nType (don't copy-paste!) the following code into your file. Typing it helps you internalize the patterns:\n\nThe HTML structure is straightforward:\n- A heading that tells the player what to do\n- An `<input>` field where they type their guess (we use `type=\"number\"` so only numbers are allowed)\n- A `<button>` they click to submit the guess\n- Two `<p>` elements: one for feedback ('Too high!', 'Too low!', 'Correct!') and one for the attempt counter\n\nAfter creating this file, open it in your browser by double-clicking it. You should see the heading, input, and button — but nothing works yet because we haven't added JavaScript.",
        docLinks: [
          {
            label: "input type=\"number\"",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Number Guessing Game</title>\n  <style>\n    body {\n      font-family: Arial, sans-serif;\n      max-width: 500px;\n      margin: 50px auto;\n      text-align: center;\n    }\n    input {\n      font-size: 1.2rem;\n      padding: 8px;\n      width: 100px;\n      text-align: center;\n    }\n    button {\n      font-size: 1.2rem;\n      padding: 8px 20px;\n      cursor: pointer;\n      background-color: #4CAF50;\n      color: white;\n      border: none;\n      border-radius: 4px;\n    }\n    button:hover { background-color: #45a049; }\n    #feedback {\n      font-size: 1.3rem;\n      font-weight: bold;\n      margin-top: 20px;\n      min-height: 40px;\n    }\n    .too-high { color: #e74c3c; }\n    .too-low { color: #3498db; }\n    .correct { color: #27ae60; }\n  </style>\n</head>\n<body>\n  <h1>Guess the Number!</h1>\n  <p>I'm thinking of a number between 1 and 100.</p>\n\n  <input type="number" id="guessInput" min="1" max="100" placeholder="?">\n  <button id="guessButton">Guess</button>\n\n  <p id="feedback"></p>\n  <p id="attempts">Attempts: 0</p>\n\n  <script src="game.js"></script>\n</body>\n</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "generate-random-number",
      type: "explanation",
      instruction: {
        heading: "Step 2: Generate a random number",
        body: "Create a new file called `game.js` in the same folder. This is where all the game logic goes.\n\nFirst, we need to pick a random number between 1 and 100. JavaScript's `Math.random()` generates a decimal between 0 (inclusive) and 1 (exclusive). To convert that to a whole number in our range:\n\n1. `Math.random()` → e.g., `0.7342`\n2. `* 100` → `73.42` (scale to our range)\n3. `Math.floor()` → `73` (round down to whole number)\n4. `+ 1` → `74` (shift from 0-99 to 1-100)\n\nThe formula `Math.floor(Math.random() * 100) + 1` gives you a random integer from 1 to 100. We also set up variables to track attempts and whether the game is over.",
        docLinks: [
          {
            label: "Math.random()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random",
            type: "js-method",
          },
          {
            label: "Math.floor()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// game.js — Step 2: Set up game state\n\nlet secretNumber = Math.floor(Math.random() * 100) + 1;\nlet attempts = 0;\nlet gameOver = false;\n\n// Grab references to HTML elements\nlet guessInput = document.getElementById("guessInput");\nlet guessButton = document.getElementById("guessButton");\nlet feedback = document.getElementById("feedback");\nlet attemptsDisplay = document.getElementById("attempts");\n\nconsole.log("Game started! (Secret: " + secretNumber + ")");\n// The console.log above is for debugging — remove it before sharing!`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "add-event-listener",
      type: "explanation",
      instruction: {
        heading: "Step 3: Listen for guesses",
        body: "Now we connect the button to our game logic. When the player clicks 'Guess,' we need to:\n1. Read the number they typed\n2. Validate it (make sure it's actually a number between 1-100)\n3. Compare it to the secret number\n4. Update the feedback message\n5. Increment the attempt counter\n\nWe use `addEventListener` to run a function every time the button is clicked. This is the 'loop' of our game — but instead of a `for` or `while` loop running automatically, the *player* drives the loop by clicking.\n\nWe also use `parseInt()` to convert the input value (which is always a string) to a number, and `isNaN()` to check if the conversion failed (the user typed something that isn't a number).",
        docLinks: [
          {
            label: "addEventListener",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
            type: "js-method",
          },
          {
            label: "parseInt()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Always validate user input",
            body: "Never assume the user will type what you expect. They might type nothing, letters, negative numbers, or 999. Always check with `isNaN()` and range comparisons before using the value. This is a key habit for any programmer.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// game.js — Step 3: Add the guess handler\n\nguessButton.addEventListener("click", function() {\n  // Don't allow guesses after the game is over\n  if (gameOver) return;\n\n  // Read and validate the input\n  let guess = parseInt(guessInput.value);\n\n  if (isNaN(guess) || guess < 1 || guess > 100) {\n    feedback.textContent = "Please enter a number between 1 and 100.";\n    feedback.className = "";\n    return;\n  }\n\n  // Increment attempts\n  attempts++;\n  attemptsDisplay.textContent = "Attempts: " + attempts;\n\n  // Compare the guess to the secret number\n  if (guess === secretNumber) {\n    feedback.textContent = "Correct! The number was " + secretNumber + "!";\n    feedback.className = "correct";\n    gameOver = true;\n    guessButton.textContent = "Play Again";\n  } else if (guess < secretNumber) {\n    feedback.textContent = "Too low! Try higher.";\n    feedback.className = "too-low";\n  } else {\n    feedback.textContent = "Too high! Try lower.";\n    feedback.className = "too-high";\n  }\n\n  // Clear the input and refocus for the next guess\n  guessInput.value = "";\n  guessInput.focus();\n});`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "play-again",
      type: "explanation",
      instruction: {
        heading: "Step 4: Add a 'Play Again' feature",
        body: "Right now, after the player guesses correctly, the game just stops. Let's make the 'Guess' button transform into a 'Play Again' button that resets everything.\n\nWe modify the click handler to check if the game is over. If it is, instead of blocking the click, we reset the game state: pick a new number, reset the score, clear the feedback, and change the button text back to 'Guess.'\n\nThis is a common pattern in game development — a state machine where the same button does different things depending on the current state.\n\nReplace the `if (gameOver) return;` line at the top of your click handler with the reset logic shown below.",
      },
      config: {
        type: "explanation",
        demoCode: `// Replace the "if (gameOver) return;" line with this:\n\n  if (gameOver) {\n    // Reset the game\n    secretNumber = Math.floor(Math.random() * 100) + 1;\n    attempts = 0;\n    gameOver = false;\n    feedback.textContent = "";\n    feedback.className = "";\n    attemptsDisplay.textContent = "Attempts: 0";\n    guessButton.textContent = "Guess";\n    guessInput.value = "";\n    guessInput.focus();\n    return;\n  }`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "keyboard-support",
      type: "explanation",
      instruction: {
        heading: "Step 5: Add keyboard support",
        body: "Good user experience means the player shouldn't have to reach for the mouse every time. Let's add Enter key support so they can type a guess and press Enter to submit.\n\nWe add a `keydown` event listener to the input field. When the key pressed is 'Enter,' we programmatically click the guess button. This is the same technique that search engines like Google use — you can type your search and press Enter instead of clicking the search button.\n\nAdd this code to the bottom of your `game.js` file:\n\nNow save both files, refresh your browser, and play! Try to guess the number. The game should tell you 'Too high' or 'Too low' after each guess, track your attempts, and let you play again after winning.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The `keydown` event fires for every key press. The `event.key` property returns a string like 'Enter', 'Escape', 'a', 'ArrowUp', etc. This is the modern, recommended way to detect key presses — older approaches like `event.keyCode` are deprecated.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// game.js — Step 5: Keyboard support\n\nguessInput.addEventListener("keydown", function(event) {\n  if (event.key === "Enter") {\n    guessButton.click();\n  }\n});`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "challenge-extensions",
      type: "explanation",
      instruction: {
        heading: "Challenge: Make it your own!",
        body: "Congratulations — you've built a working number guessing game! Here are some challenges to take it further. Try as many as you like:\n\n**Easy:**\n- Change the range from 1-100 to 1-50 (or 1-1000 for a harder game)\n- Add a 'hint' that tells the player if they're very close (within 5) vs. far away\n- Change the colors for too-high and too-low feedback\n\n**Medium:**\n- Add a maximum number of attempts (e.g., 10). If they run out, reveal the number and show 'Game Over'\n- Keep track of the best score (fewest attempts) using a variable, and display it\n- Add difficulty levels: Easy (1-50), Medium (1-100), Hard (1-500) with buttons to choose\n\n**Hard:**\n- Store the best score in `localStorage` so it persists across page refreshes\n- Add a visual 'hot/cold' meter that shows how close the guess is\n- Add a timer that counts how many seconds the game takes\n\nEvery one of these challenges uses concepts you've already learned — conditionals, comparisons, variables, and DOM manipulation. Open your `game.js` file and start experimenting!",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Use the browser console for debugging",
            body: "If something isn't working, open your browser's Developer Tools (F12 or Ctrl+Shift+I) and check the Console tab for error messages. You can also add `console.log()` statements to your code to see what values your variables hold at different points. This is how professional developers debug!",
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
