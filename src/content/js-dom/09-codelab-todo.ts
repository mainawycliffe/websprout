import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-codelab-todo-list",
  slug: "codelab-todo-list",
  title: "Codelab: To-Do List",
  description:
    "Build a fully functional to-do list app from scratch — create, complete, delete, and save tasks — using only HTML, CSS, and vanilla JavaScript.",
  order: 9,
  steps: [
    {
      id: "codelab-setup",
      type: "explanation",
      instruction: {
        heading: "Step 1: Set up the project files",
        body: "Let's build a real to-do list application! Open your terminal and create a project folder with three files. We'll write everything from scratch — no frameworks, no build tools.\n\nCreate a folder, then create `index.html`, `style.css`, and `app.js` inside it. Open the folder in your text editor.\n\n```\nmkdir todo-app\ncd todo-app\ntouch index.html style.css app.js\n```\n\nNow open `index.html` in your text editor and add the HTML structure shown below. This gives us:\n- An `<h1>` title\n- A `<form>` with an `<input>` and a submit `<button>`\n- An empty `<ul>` where to-do items will appear\n- A `<script defer>` tag linking our JS file",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The `touch` command creates empty files on Linux and macOS. If you're on Windows, you can create the files through your text editor's File > New menu instead.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>To-Do List</title>\n  <link rel="stylesheet" href="style.css">\n  <script defer src="app.js"></script>\n</head>\n<body>\n  <div class="container">\n    <h1>My To-Do List</h1>\n    <form id="todo-form">\n      <input\n        type="text"\n        id="todo-input"\n        placeholder="Add a new task..."\n        required\n      >\n      <button type="submit">Add</button>\n    </form>\n    <ul id="todo-list"></ul>\n  </div>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-select-elements",
      type: "explanation",
      instruction: {
        heading: "Step 2: Select the elements",
        body: "Open `app.js` and start by selecting the three elements we'll interact with: the form, the input field, and the unordered list. We store them in `const` variables because these references won't change.\n\nAlso add a `console.log` to verify everything is connected. Open `index.html` in your browser (double-click the file or drag it into a browser window), then open DevTools (F12 or Ctrl+Shift+I) and check the Console tab. You should see 'App loaded!' and three elements (not `null`).",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you see `null` for any element, double-check that your HTML `id` values match exactly what you wrote in `querySelector`. A typo like `todo-frm` instead of `todo-form` will silently return null.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// app.js\n\n// Select elements\nconst form = document.querySelector("#todo-form");\nconst input = document.querySelector("#todo-input");\nconst list = document.querySelector("#todo-list");\n\n// Verify everything is connected\nconsole.log("App loaded!");\nconsole.log(form, input, list);',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-add-task",
      type: "explanation",
      instruction: {
        heading: "Step 3: Add a task on form submit",
        body: "Now we'll listen for the form's `submit` event. When the user types a task and presses Enter (or clicks Add), we:\n1. Prevent the default form submission (which would reload the page)\n2. Read the input value\n3. Create a new `<li>` element with the task text\n4. Append it to the list\n5. Clear the input field\n\nSave the file, refresh the browser, and try adding tasks. Each one should appear in the list below the input.",
      },
      config: {
        type: "explanation",
        demoCode:
          '// Handle form submission\nform.addEventListener("submit", function (event) {\n  event.preventDefault(); // Stop page from reloading!\n\n  // Read and trim the input\n  const taskText = input.value.trim();\n\n  // Don\'t add empty tasks\n  if (taskText === "") return;\n\n  // Create a new list item\n  const li = document.createElement("li");\n  li.classList.add("todo-item");\n\n  // Add the task text inside a span\n  const span = document.createElement("span");\n  span.classList.add("task-text");\n  span.textContent = taskText;\n  li.appendChild(span);\n\n  // Add the item to the list\n  list.appendChild(li);\n\n  // Clear the input and refocus it\n  input.value = "";\n  input.focus();\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-delete-button",
      type: "explanation",
      instruction: {
        heading: "Step 4: Add a delete button to each task",
        body: "Each to-do item needs a way to be removed. We'll add a delete button inside every `<li>`. When clicked, it removes the entire list item from the DOM.\n\nUpdate your form submit handler to also create a delete button inside each `<li>`. We use event delegation on the list — one listener handles all delete button clicks, even for items added in the future.",
      },
      config: {
        type: "explanation",
        demoCode:
          '// Inside your form submit handler, after creating the span:\n\n  // Create delete button\n  const deleteBtn = document.createElement("button");\n  deleteBtn.classList.add("delete-btn");\n  deleteBtn.textContent = "Delete";\n  li.appendChild(deleteBtn);\n\n// --- Outside the form handler, add event delegation for delete ---\n\nlist.addEventListener("click", function (event) {\n  // If a delete button was clicked...\n  if (event.target.classList.contains("delete-btn")) {\n    // Remove the parent <li>\n    const listItem = event.target.parentElement;\n    listItem.remove();\n  }\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-toggle-complete",
      type: "explanation",
      instruction: {
        heading: "Step 5: Toggle completed state",
        body: "Clicking on a task's text should mark it as completed (with a line-through effect). We'll toggle a `completed` CSS class on the `<li>` element.\n\nAdd this to the same event delegation listener on the list. When the user clicks the task text span, we toggle the `completed` class on its parent `<li>`.\n\nAlso add the CSS for the completed state in your `style.css` file.",
      },
      config: {
        type: "explanation",
        demoCode:
          '// Update the list click handler to also handle completion toggle:\nlist.addEventListener("click", function (event) {\n  // Delete button click\n  if (event.target.classList.contains("delete-btn")) {\n    event.target.parentElement.remove();\n  }\n\n  // Task text click — toggle completed\n  if (event.target.classList.contains("task-text")) {\n    event.target.parentElement.classList.toggle("completed");\n  }\n});\n\n/* Add to style.css:\n.completed .task-text {\n  text-decoration: line-through;\n  opacity: 0.6;\n}\n*/',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-local-storage",
      type: "explanation",
      instruction: {
        heading: "Step 6: Save tasks to localStorage",
        body: "Right now, refreshing the page erases all tasks. Let's fix that using `localStorage` — a browser API that saves data as key-value pairs that persist between page loads.\n\nThe plan:\n1. Whenever the list changes (add, delete, or complete), save the current state to `localStorage`\n2. When the page loads, read from `localStorage` and rebuild the list\n\n`localStorage` only stores strings, so we use `JSON.stringify()` to save our array and `JSON.parse()` to read it back.",
        docLinks: [
          {
            label: "Window.localStorage",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
            type: "js-method",
          },
          {
            label: "JSON.stringify()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "`localStorage` stores up to about 5-10 MB of data per origin (depends on the browser). Data is stored per-domain and has no expiration date — it stays until the user clears their browser data or your code removes it.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Save all tasks to localStorage\nfunction saveTasks() {\n  const tasks = [];\n  const items = document.querySelectorAll(".todo-item");\n\n  items.forEach(function (item) {\n    tasks.push({\n      text: item.querySelector(".task-text").textContent,\n      completed: item.classList.contains("completed"),\n    });\n  });\n\n  localStorage.setItem("todos", JSON.stringify(tasks));\n}\n\n// Load tasks from localStorage on page load\nfunction loadTasks() {\n  const saved = localStorage.getItem("todos");\n  if (!saved) return;\n\n  const tasks = JSON.parse(saved);\n  tasks.forEach(function (task) {\n    addTaskToDOM(task.text, task.completed);\n  });\n}\n\n// Helper: add a task to the DOM (reusable for both new and loaded tasks)\nfunction addTaskToDOM(text, isCompleted) {\n  const li = document.createElement("li");\n  li.classList.add("todo-item");\n  if (isCompleted) li.classList.add("completed");\n\n  const span = document.createElement("span");\n  span.classList.add("task-text");\n  span.textContent = text;\n  li.appendChild(span);\n\n  const deleteBtn = document.createElement("button");\n  deleteBtn.classList.add("delete-btn");\n  deleteBtn.textContent = "Delete";\n  li.appendChild(deleteBtn);\n\n  list.appendChild(li);\n}\n\n// Call loadTasks when the page loads\nloadTasks();\n\n// Call saveTasks() after every add, delete, and toggle action',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-styles",
      type: "explanation",
      instruction: {
        heading: "Step 7: Style it with CSS",
        body: "Let's make the to-do list look polished. Open `style.css` and add styles for the container, form, list items, and buttons. Good CSS makes the difference between a prototype and something you'd actually want to use.\n\nAfter adding these styles, save all files and refresh your browser. You should have a fully functional, styled to-do list that persists across page reloads!",
      },
      config: {
        type: "explanation",
        demoCode:
          '/* style.css */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: system-ui, sans-serif;\n  background: #f0f2f5;\n  color: #1a1a1a;\n  display: flex;\n  justify-content: center;\n  padding: 40px 16px;\n}\n\n.container {\n  width: 100%;\n  max-width: 500px;\n}\n\nh1 {\n  margin-bottom: 20px;\n  font-size: 1.8rem;\n}\n\n#todo-form {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 20px;\n}\n\n#todo-input {\n  flex: 1;\n  padding: 10px 14px;\n  border: 2px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 1rem;\n}\n\n#todo-form button {\n  padding: 10px 20px;\n  background: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 1rem;\n}\n\n#todo-list {\n  list-style: none;\n}\n\n.todo-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 14px;\n  background: white;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n\n.task-text {\n  cursor: pointer;\n  flex: 1;\n}\n\n.completed .task-text {\n  text-decoration: line-through;\n  opacity: 0.5;\n}\n\n.delete-btn {\n  background: #ef4444;\n  color: white;\n  border: none;\n  padding: 4px 12px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 0.85rem;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-challenge",
      type: "explanation",
      instruction: {
        heading: "Step 8: Challenge — add edit functionality",
        body: "Your to-do list is fully functional! Now push yourself further. Try adding an **edit** feature: when the user double-clicks a task, it becomes an editable input field. When they press Enter or click away, the edit is saved.\n\nHints for implementing edit:\n- Listen for the `dblclick` event on task text spans\n- Replace the span with an `<input>` element pre-filled with the current text\n- Listen for `keydown` (Enter key) and `blur` (click away) events on the input\n- Replace the input back with a span containing the new text\n- Call `saveTasks()` to persist the change\n\nThis is a free-form challenge — there's no single right answer. Experiment, break things, and debug. That's how real developers work. Open your browser's DevTools console to see any errors and use `console.log()` to inspect values at each step.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "When replacing the span with an input, call `input.focus()` to immediately place the cursor in the field. Use `input.select()` to highlight all the text so the user can start typing a replacement immediately.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Challenge starter hint:\n// Add to your list click handler:\n\nlist.addEventListener("dblclick", function (event) {\n  if (event.target.classList.contains("task-text")) {\n    const span = event.target;\n    const currentText = span.textContent;\n\n    // Create an input to replace the span\n    const editInput = document.createElement("input");\n    editInput.type = "text";\n    editInput.value = currentText;\n    editInput.classList.add("edit-input");\n\n    // Replace span with input\n    span.replaceWith(editInput);\n    editInput.focus();\n    editInput.select();\n\n    // Save on Enter or blur — your code here!\n    // ...\n  }\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
