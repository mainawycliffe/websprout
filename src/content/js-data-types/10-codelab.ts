import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-codelab-recipe-book",
  slug: "codelab-recipe-book",
  title: "Codelab: Recipe Book Page",
  description:
    "Build a real recipe book page from scratch — define recipe data with objects and arrays, then render it to the browser using JavaScript.",
  order: 10,
  steps: [
    {
      id: "codelab-intro",
      type: "explanation",
      instruction: {
        heading: "In this codelab, you'll build a recipe book page that renders data from JavaScript to the browser!",
        body: "So far in this module, you've worked with data in the console. In this codelab, you'll take the next step: storing recipe data as JavaScript objects and arrays, then using code to create HTML elements and display them on a real web page.\n\nBy the end, you'll have a styled recipe book page with multiple recipes — each showing its name, cook time, and ingredients list. This is the exact same pattern that real web applications use to display dynamic data.",
        docLinks: [
          {
            label: "document.createElement()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
            type: "js-method",
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
        heading: "Step 1: Create your project folder and files",
        body: "Open your terminal and create a new project folder. Inside it, you'll create two files: `index.html` for the page structure and `script.js` for the JavaScript logic.\n\nThe `mkdir` command creates a new directory (folder), and `cd` moves you into it. Then create both files — you can use a code editor like VS Code, or any plain text editor.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you still have the project folder from the previous module's codelab, you can create this as a new folder next to it. Keep each project in its own folder to stay organized.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// Open your terminal and type:\n// mkdir recipe-book\n// cd recipe-book\n// Then create index.html and script.js in your editor",
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
        body: "Create `index.html` with the code below. This is a minimal page with a heading and an empty `<div>` with `id=\"recipes\"`. Our JavaScript will fill this div with recipe cards. Notice the `<script>` tag at the bottom of `<body>` — it loads our JavaScript file after the HTML is ready.\n\nWe're also adding a `<style>` block to make the recipe cards look nice. The CSS uses flexbox to arrange cards side by side and adds padding, borders, and rounded corners for a clean look.",
        docLinks: [
          {
            label: "<div> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
            type: "html-element",
          },
          {
            label: "<script> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Placing the `<script>` tag at the end of `<body>` ensures all HTML elements exist before JavaScript tries to find them with `document.getElementById()`. If the script ran before the HTML loaded, it would try to fill a div that doesn't exist yet.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Recipe Book</title>\n  <style>\n    body {\n      font-family: Arial, sans-serif;\n      max-width: 900px;\n      margin: 0 auto;\n      padding: 20px;\n      background-color: #fefefe;\n    }\n    h1 {\n      text-align: center;\n      color: #333;\n    }\n    #recipes {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 20px;\n      justify-content: center;\n    }\n    .recipe-card {\n      border: 1px solid #ddd;\n      border-radius: 12px;\n      padding: 20px;\n      width: 260px;\n      background-color: #fff;\n      box-shadow: 0 2px 8px rgba(0,0,0,0.08);\n    }\n    .recipe-card h2 {\n      margin-top: 0;\n      color: #e67e22;\n    }\n    .recipe-card .time {\n      color: #888;\n      font-size: 14px;\n      margin-bottom: 12px;\n    }\n    .recipe-card ul {\n      padding-left: 20px;\n    }\n    .recipe-card li {\n      margin-bottom: 4px;\n    }\n  </style>\n</head>\n<body>\n  <h1>My Recipe Book</h1>\n  <div id="recipes"></div>\n\n  <script src="script.js"></script>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-data",
      type: "explanation",
      instruction: {
        heading: "Step 3: Define your recipe data in JavaScript",
        body: "Open `script.js` and define your recipes as an array of objects. Each recipe object has three properties:\n\n- `name` — a string with the recipe title\n- `cookTime` — a string like \"30 mins\" or \"1 hour\"\n- `ingredients` — an array of strings, each being one ingredient\n\nThis is the pattern you'll see in every data-driven application: structured data stored as objects, collected into arrays. A social media feed is an array of post objects. A music library is an array of song objects. A recipe book is an array of recipe objects.\n\nStart with the three recipes shown below, and we'll add more later.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Pay close attention to the commas: each object in the array is separated by a comma, and each property inside an object is separated by a comma too. The last property in an object can optionally have a trailing comma — it's a good habit that prevents errors when adding new properties later.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// script.js\nconst recipes = [\n  {\n    name: \"Classic Pancakes\",\n    cookTime: \"20 mins\",\n    ingredients: [\"flour\", \"eggs\", \"milk\", \"butter\", \"sugar\"],\n  },\n  {\n    name: \"Pasta Marinara\",\n    cookTime: \"25 mins\",\n    ingredients: [\"spaghetti\", \"tomato sauce\", \"garlic\", \"olive oil\", \"basil\"],\n  },\n  {\n    name: \"Fruit Smoothie\",\n    cookTime: \"5 mins\",\n    ingredients: [\"banana\", \"strawberries\", \"yogurt\", \"honey\", \"ice\"],\n  },\n];\n\nconsole.log(`Loaded ${recipes.length} recipes`);",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-render",
      type: "explanation",
      instruction: {
        heading: "Step 4: Render recipes to the page",
        body: "Now for the exciting part: turning data into visible HTML. We'll loop through the recipes array and, for each recipe, create HTML elements and add them to the page.\n\nHere's the process for each recipe:\n1. Create a `<div>` for the card and add the CSS class `recipe-card`\n2. Create an `<h2>` for the recipe name\n3. Create a `<p>` for the cook time\n4. Create a `<ul>` for ingredients, then loop through the ingredients array and create an `<li>` for each one\n5. Assemble everything by appending children to parents\n6. Finally, append the card to the `#recipes` container on the page\n\nThis pattern — create element, set content, append to parent — is the fundamental way JavaScript builds dynamic pages. Add this code below your recipes array in `script.js`.",
        docLinks: [
          {
            label: "document.createElement()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
            type: "js-method",
          },
          {
            label: "Node.appendChild()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild",
            type: "js-method",
          },
          {
            label: "Element.classList",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "We use `.textContent` instead of `.innerHTML` to set text. This is safer because `.textContent` treats everything as plain text, while `.innerHTML` could execute HTML or scripts — a security risk called Cross-Site Scripting (XSS). Always prefer `.textContent` for plain text.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// Add this below the recipes array in script.js\nconst container = document.getElementById(\"recipes\");\n\nrecipes.forEach((recipe) => {\n  // Create the card\n  const card = document.createElement(\"div\");\n  card.classList.add(\"recipe-card\");\n\n  // Recipe name\n  const title = document.createElement(\"h2\");\n  title.textContent = recipe.name;\n  card.appendChild(title);\n\n  // Cook time\n  const time = document.createElement(\"p\");\n  time.classList.add(\"time\");\n  time.textContent = `Cook time: ${recipe.cookTime}`;\n  card.appendChild(time);\n\n  // Ingredients list\n  const list = document.createElement(\"ul\");\n  recipe.ingredients.forEach((ingredient) => {\n    const item = document.createElement(\"li\");\n    item.textContent = ingredient;\n    list.appendChild(item);\n  });\n  card.appendChild(list);\n\n  // Add the card to the page\n  container.appendChild(card);\n});",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-run",
      type: "explanation",
      instruction: {
        heading: "Step 5: Open in browser and verify",
        body: "Open `index.html` in your browser by double-clicking the file or dragging it into a browser window. You should see:\n\n- The heading \"My Recipe Book\" centered at the top\n- Three recipe cards side by side (or stacked on a narrow window)\n- Each card showing the recipe name in orange, the cook time in gray, and a bulleted list of ingredients\n\nOpen DevTools with **Ctrl+Shift+J** (Linux/Windows) or **Cmd+Option+J** (Mac) and check the console. You should see `Loaded 3 recipes` — that came from our `console.log()` at the end of the data definition.\n\nIf something doesn't look right, check:\n- Is `script.js` in the same folder as `index.html`?\n- Are all your commas, brackets, and braces balanced?\n- Did you copy both the recipes array AND the rendering code?",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If the page is blank, open the browser console to check for errors. A missing comma, bracket, or quote is the most common problem. JavaScript error messages include a line number — look there first.",
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
      id: "codelab-challenge",
      type: "explanation",
      instruction: {
        heading: "Challenge: Make it your own",
        body: "Your recipe book is working! Now extend it with these challenges:\n\n**Add more recipes**: Add 2-3 more recipe objects to the `recipes` array. Each needs `name`, `cookTime`, and `ingredients`. Save the file and refresh the browser — the new recipes should appear automatically because the loop handles any number of items.\n\n**Add a difficulty rating**: Add a `difficulty` property to each recipe (e.g., \"Easy\", \"Medium\", \"Hard\"). Then modify the rendering code to create a new `<p>` element that displays it on each card.\n\n**Count total ingredients**: After the rendering loop, add code that loops through all recipes, counts the total number of ingredients across all recipes, and displays it at the bottom of the page using `document.createElement()` and `container.appendChild()`.\n\n**Add a serving count**: Add a `servings` property (a number) to each recipe and display it on the card. Then calculate and log the average servings across all recipes.\n\nThere's no single right answer — experiment, break things, fix them, and make the recipe book your own!",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "What you just built — storing data in JavaScript and rendering it to the DOM — is the foundational pattern behind every modern web application. Frameworks automate this process, but the core concept is identical: data drives what appears on screen. Understanding this pattern makes learning any framework much easier.",
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
