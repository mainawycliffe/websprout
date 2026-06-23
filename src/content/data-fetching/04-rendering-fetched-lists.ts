import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-rendering-fetched-lists",
  slug: "rendering-fetched-lists",
  title: "Rendering Fetched Lists",
  description:
    "APIs love to return arrays. Turn them into UI with .map() and stable keys, and handle the awkward case where the array comes back empty.",
  order: 4,
  steps: [
    {
      id: "map-the-array",
      type: "explanation",
      instruction: {
        heading: "Arrays become elements with .map()",
        body: `<p>Most API endpoints return a <strong>list</strong>: a feed of posts, a page of products, a roster of users. In React you turn an array of data into an array of elements with <code>.map()</code> — the same <code>.map()</code> you learned in <code>modern-js</code>, now producing JSX instead of strings.</p><p>Every item you render in a list needs a <code>key</code> prop. The key must be <strong>stable and unique</strong> among siblings — almost always the item's database <code>id</code>. React uses keys to track which item is which between renders, so it can update, reorder, or remove just the changed rows instead of rebuilding the whole list.</p>`,
        analogy: `Keys are like the seat numbers on a flight. If the airline reshuffles passengers, it doesn't rebuild the whole plane — it uses seat numbers to know exactly who moved where. Without keys, React would have to redraw the entire list on every change, and could mix up which row is which.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — don't use the array index as a key",
            body: `Reaching for <code>key={index}</code> seems easy, but it breaks when the list reorders, filters, or has items inserted — React confuses one row for another. Use a real unique id from the data: <code>key={item.id}</code>.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Rendering lists",
            url: "https://react.dev/learn/rendering-lists",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// posts is an array fetched from the API
return (
  <ul>
    {posts.map((post) => (
      <li key={post.id}>
        <strong>{post.title}</strong>
      </li>
    ))}
  </ul>
);`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "render-a-list",
      type: "free-edit",
      instruction: {
        heading: "Your turn: render a feed of posts",
        body: `<p>This component fetches the first posts from JSONPlaceholder. The data is already in <code>posts</code>. Build the list:</p><ol><li>Inside the <code>&lt;ul&gt;</code>, <code>.map()</code> over <code>posts</code>.</li><li>Return an <code>&lt;li&gt;</code> for each post with <code>key={post.id}</code>.</li><li>Show the <code>post.title</code> in a <code>&lt;strong&gt;</code> and the <code>post.body</code> below it.</li></ol><p>You'll see a feed of placeholder articles appear — the same shape as a real blog or news app.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — map returns, so use parentheses",
            body: `When your <code>.map()</code> callback returns JSX across multiple lines, wrap it in parentheses: <code>(post) =&gt; ( &lt;li&gt;…&lt;/li&gt; )</code>. Curly braces <code>{}</code> without a <code>return</code> will render nothing.`,
          },
        ],
        docLinks: [
          {
            label: "JSONPlaceholder — /posts",
            url: "https://jsonplaceholder.typicode.com/posts",
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
  <title>Rendering Lists</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    ul { list-style: none; padding: 0; }
    li { padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; margin-bottom: 8px; }
    strong { text-transform: capitalize; display: block; margin-bottom: 4px; }
    .body { color: #475569; font-size: 14px; }
    .muted { color: #64748b; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function Feed() {
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        async function load() {
          const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
          const data = await res.json();
          setPosts(data);
          setLoading(false);
        }
        load();
      }, []);

      if (loading) return <p className="muted">Loading posts…</p>;

      return (
        <ul>
          {/* TODO: map over posts. For each post render:
               <li key={post.id}>
                 <strong>{post.title}</strong>
                 <span className="body">{post.body}</span>
               </li>
          */}
        </ul>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Feed />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["posts.map", "key=", "post.title"] },
      },
      hints: [
        "Start with <code>{posts.map((post) =&gt; ( … ))}</code> inside the &lt;ul&gt;.",
        "Give the &lt;li&gt; a key: <code>&lt;li key={post.id}&gt;</code>.",
        "Render <code>&lt;strong&gt;{post.title}&lt;/strong&gt;</code> and <code>&lt;span className=\"body\"&gt;{post.body}&lt;/span&gt;</code> inside it.",
      ],
    },
    {
      id: "empty-states",
      type: "explanation",
      instruction: {
        heading: "The fourth state: empty",
        body: `<p>There's a state beginners forget because it's invisible in testing: the API succeeds, but the array comes back <strong>empty</strong>. A user with no orders, a search with no matches, a brand-new account with no posts. If you only handle loading, error, and "has data," an empty array renders as… nothing. A blank void that looks broken.</p><p>Always add an explicit empty state: a friendly message like "No results yet" or "You haven't posted anything." It reassures the user that the app works and there's simply nothing to show. You check it with <code>array.length === 0</code> after loading finishes.</p>`,
        analogy: `Walk into a library and find a shelf with a little card that says "This section is being restocked." That card is an empty state — it tells you the shelf isn't broken, it's just empty right now. A bare empty shelf with no sign makes you wonder if something went wrong.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — design the zero case",
            body: `Professional products treat the empty state as a real screen, not an afterthought — often with an illustration and a call to action ("Create your first project"). At minimum, never let a successful-but-empty response render a blank page.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Array.prototype.length",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `if (loading) return <p>Loading…</p>;
if (error) return <p>Error: {error}</p>;
if (items.length === 0) return <p>No results yet.</p>; // the empty state
return <ul>{items.map((i) => <li key={i.id}>{i.name}</li>)}</ul>;`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
