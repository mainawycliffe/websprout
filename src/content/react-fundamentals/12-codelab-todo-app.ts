import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-codelab-todo-app",
  slug: "codelab-todo-app",
  title: "Codelab: Build a Todo App",
  description:
    "Put state, lists, keys, and events together to build a working todo list — add, display, and delete tasks, all in React.",
  order: 12,
  steps: [
    {
      id: "todo-brief",
      type: "explanation",
      instruction: {
        heading: "The todo app: the 'hello world' of state",
        body: `<p>A todo list is the classic project for learning a UI framework, because it exercises every core idea at once: an array in state, rendering a list with keys, adding items, and removing items. If you can build this, you can build a cart, a comment thread, or a playlist.</p><p>You'll manage two pieces of state: the <strong>list of todos</strong> (an array) and the <strong>draft text</strong> in the input. Adding and removing items means making a <em>new</em> array — never editing the old one in place.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — update state immutably",
            body: `Don't <code>push</code> into the existing array or change an item directly — React compares the old and new array by identity to decide whether to re-render. Instead, build a new array: <code>[...todos, newItem]</code> to add, and <code>todos.filter(...)</code> to remove. The spread <code>...</code> and <code>filter</code> both return fresh arrays.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Updating arrays in state",
            url: "https://react.dev/learn/updating-arrays-in-state",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "todo-build",
      type: "free-edit",
      instruction: {
        heading: "Build add and delete",
        body: `<p>The input and its draft state are already wired. Finish the three TODOs:</p><ol><li><strong>addTodo:</strong> append a new object <code>{ id: Date.now(), text: draft }</code> to the list with <code>setTodos([...todos, ...])</code>, then clear the draft with <code>setDraft("")</code>.</li><li><strong>removeTodo:</strong> use <code>setTodos(todos.filter((t) => t.id !== id))</code> to drop the matching todo.</li><li><strong>The list:</strong> inside the <code>&lt;ul&gt;</code>, <code>map</code> over <code>todos</code> and return an <code>&lt;li key={todo.id}&gt;</code> showing <code>{todo.text}</code> and a delete <code>&lt;button&gt;</code> that calls <code>removeTodo(todo.id)</code>.</li></ol><p>Add a few tasks, then delete one. Real, working software — built from the pieces you learned.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — why Date.now() for the id",
            body: `Each todo needs a stable, unique <code>key</code>. <code>Date.now()</code> (the current time in milliseconds) is a quick way to get a unique id for a learning project. Real apps usually get ids from a database or a library like <code>crypto.randomUUID()</code>.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Updating arrays in state",
            url: "https://react.dev/learn/updating-arrays-in-state",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "html-js",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Todo App</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    .card { max-width: 360px; margin: 0 auto; padding: 20px; border-radius: 14px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
    .row { display: flex; gap: 8px; }
    .row input { flex: 1; padding: 8px 10px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 8px; }
    .row button { padding: 8px 14px; border: none; border-radius: 8px; background: #61dafb; color: #0f172a; font-weight: 700; cursor: pointer; }
    ul { list-style: none; padding: 0; margin: 16px 0 0; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    li button { border: none; background: none; color: #ef4444; font-size: 18px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function TodoApp() {
      const [todos, setTodos] = useState([]);
      const [draft, setDraft] = useState("");

      function addTodo() {
        if (draft.trim() === "") return;
        // TODO 1: add { id: Date.now(), text: draft } to todos, then clear draft
      }

      function removeTodo(id) {
        // TODO 2: keep every todo whose id is NOT this one
      }

      return (
        <div className="card">
          <h2>My Todos</h2>
          <div className="row">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a task..."
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <ul>
            {/* TODO 3: map over todos -> <li key={todo.id}> with text and a delete button */}
          </ul>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<TodoApp />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["setTodos", "todos.map", "key=", "filter"] },
      },
      hints: [
        "addTodo: <code>setTodos([...todos, { id: Date.now(), text: draft }]); setDraft(\"\");</code>",
        "removeTodo: <code>setTodos(todos.filter((t) => t.id !== id));</code>",
        "List: <code>{todos.map((todo) => &lt;li key={todo.id}&gt;{todo.text} &lt;button onClick={() => removeTodo(todo.id)}&gt;✕&lt;/button&gt;&lt;/li&gt;)}</code>",
      ],
    },
    {
      id: "todo-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: make it yours",
        body: `<p>Here's a complete, working todo app. Now extend it — pick at least one:</p><ul><li><strong>Mark done:</strong> click a todo's text to toggle a <code>done</code> flag, and style done items with a line-through (<code>textDecoration</code>).</li><li><strong>Item count:</strong> show "3 tasks left" above the list.</li><li><strong>Clear all:</strong> add a button that empties the list with <code>setTodos([])</code>.</li><li><strong>Press Enter to add:</strong> add <code>onKeyDown</code> to the input and call <code>addTodo</code> when the key is "Enter".</li></ul><p>There's no single right answer here — experiment, break things, and fix them. That's how you learn.</p>`,
        docLinks: [
          {
            label: "React.dev — Updating objects in state",
            url: "https://react.dev/learn/updating-objects-in-state",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "html-js",
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Todo App</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    .card { max-width: 360px; margin: 0 auto; padding: 20px; border-radius: 14px; box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
    .row { display: flex; gap: 8px; }
    .row input { flex: 1; padding: 8px 10px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 8px; }
    .row button { padding: 8px 14px; border: none; border-radius: 8px; background: #61dafb; color: #0f172a; font-weight: 700; cursor: pointer; }
    ul { list-style: none; padding: 0; margin: 16px 0 0; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    li button { border: none; background: none; color: #ef4444; font-size: 18px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function TodoApp() {
      const [todos, setTodos] = useState([]);
      const [draft, setDraft] = useState("");

      function addTodo() {
        if (draft.trim() === "") return;
        setTodos([...todos, { id: Date.now(), text: draft }]);
        setDraft("");
      }

      function removeTodo(id) {
        setTodos(todos.filter((t) => t.id !== id));
      }

      return (
        <div className="card">
          <h2>My Todos</h2>
          <div className="row">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a task..."
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <span>{todo.text}</span>
                <button onClick={() => removeTodo(todo.id)}>✕</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<TodoApp />);
  </script>
</body>
</html>`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Clear all: add <code>&lt;button onClick={() => setTodos([])}&gt;Clear&lt;/button&gt;</code>.",
        "Count left: <code>&lt;p&gt;{todos.length} tasks&lt;/p&gt;</code> above the list.",
      ],
    },
  ],
};
