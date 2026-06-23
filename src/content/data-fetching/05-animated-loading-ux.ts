import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-animated-loading-ux",
  slug: "animated-loading-ux",
  title: "Loading UX: Spinners and Skeletons",
  description:
    "Loading states are where good apps feel polished. Learn why skeleton screens beat spinners, and build an animated placeholder that keeps the layout calm.",
  order: 5,
  steps: [
    {
      id: "why-skeletons",
      type: "explanation",
      instruction: {
        heading: "Why YouTube and Facebook show grey boxes, not spinners",
        body: `<p>Notice that <strong>YouTube</strong>, <strong>Facebook</strong>, and <strong>LinkedIn</strong> rarely show a spinning circle anymore. While content loads, they show <em>skeletons</em> — grey shapes in the exact size and position of the content that's coming. When the data arrives, the real thing fades in where the skeleton was.</p><p>This is a deliberate UX choice. A spinner says "something is happening, somewhere." A skeleton says "your content is loading, and it will look <em>exactly</em> like this." It sets expectations, and — crucially — it reserves the space, so when data lands, nothing jumps around. The diagram shows the difference: grey placeholders that match the shape, then a smooth swap to real content with no layout shift.</p>`,
        analogy: `A spinner is like a waiter saying "your food is coming" with no other information. A skeleton screen is like the table already being set with your plate, glass, and cutlery in place — you can see your meal is on its way and exactly where it'll go.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — avoid layout shift (CLS)",
            body: `When content pops in and shoves the page around, that's <strong>Cumulative Layout Shift</strong>, one of Google's Core Web Vitals — and a real annoyance (you tap a button, an ad loads, the button moves, you tap the wrong thing). Skeletons that reserve the final size keep CLS at zero.`,
          },
        ],
        docLinks: [
          {
            label: "web.dev — Cumulative Layout Shift",
            url: "https://web.dev/articles/cls",
            type: "css-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-a-skeleton",
      type: "free-edit",
      instruction: {
        heading: "Your turn: build a shimmering skeleton",
        body: `<p>This app fetches a user after a deliberate one-second delay so you can see the loading state clearly. Right now the loading branch shows plain text. Replace it with a <strong>skeleton card</strong> that matches the real card's shape.</p><p>In the loading branch, return the pre-styled skeleton markup (it's in a comment). The CSS already includes a <code>shimmer</code> animation — a moving highlight that signals "loading," built with a pure CSS <code>@keyframes</code> so it works anywhere, no library needed.</p><p>Watch the sequence: shimmering grey blocks for one second, then the real name and email slide into the same spot — no jump.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — match the skeleton to the real shape",
            body: `The skeleton's circle should be the same size as the real avatar, and the grey bars the same height as the text. The closer the placeholder matches the final layout, the more seamless the swap feels.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — CSS animation",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations",
            type: "css-concept",
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
  <title>Skeleton Loading</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; line-height: 1.6; }
    .card { display: flex; gap: 12px; align-items: center; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; max-width: 320px; }
    .avatar { width: 48px; height: 48px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; font-size: 22px; }
    h2 { margin: 0 0 2px; font-size: 16px; }
    .muted { color: #64748b; font-size: 14px; margin: 0; }

    /* Skeleton + shimmer (pure CSS, no library) */
    .sk-circle { width: 48px; height: 48px; border-radius: 50%; }
    .sk-line { height: 12px; border-radius: 6px; margin-bottom: 8px; }
    .shimmer {
      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.2s infinite linear;
    }
    @keyframes shimmer {
      from { background-position: 200% 0; }
      to   { background-position: -200% 0; }
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function Profile() {
      const [user, setUser] = useState(null);

      useEffect(() => {
        async function load() {
          // Artificial delay so the loading state is easy to see:
          await new Promise((r) => setTimeout(r, 1000));
          const res = await fetch("https://jsonplaceholder.typicode.com/users/2");
          const data = await res.json();
          setUser(data);
        }
        load();
      }, []);

      if (!user) {
        // TODO: replace this plain text with the skeleton card:
        // return (
        //   <div className="card">
        //     <div className="sk-circle shimmer"></div>
        //     <div style={{ flex: 1 }}>
        //       <div className="sk-line shimmer" style={{ width: "70%" }}></div>
        //       <div className="sk-line shimmer" style={{ width: "45%" }}></div>
        //     </div>
        //   </div>
        // );
        return <p className="muted">Loading…</p>;
      }

      return (
        <div className="card">
          <div className="avatar">🧑</div>
          <div>
            <h2>{user.name}</h2>
            <p className="muted">{user.email}</p>
          </div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<Profile />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["shimmer", "sk-circle", "card"] },
      },
      hints: [
        "Delete the <code>return &lt;p className=\"muted\"&gt;Loading…&lt;/p&gt;;</code> line and paste the skeleton markup from the comment.",
        "The <code>shimmer</code> class drives the moving-highlight animation — keep it on each grey block.",
        "Try changing the skeleton line widths or the shimmer duration to see how the feel changes.",
      ],
    },
  ],
};
