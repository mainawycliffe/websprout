import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-why-react-data-fetching",
  slug: "why-react-data-fetching",
  title: "Why Data Fetching Is Different in React",
  description:
    "You already know how to fetch with plain JavaScript. In React, the rules change: data isn't poked into the DOM — it lives in state, and the UI follows automatically.",
  order: 1,
  steps: [
    {
      id: "the-empty-screen-problem",
      type: "explanation",
      instruction: {
        heading: "Almost every app you use starts empty",
        body: `<p>Open <strong>Twitter/X</strong>, <strong>Instagram</strong>, <strong>Spotify</strong>, or <strong>GitHub</strong> and watch closely for the first half-second: the screen is empty, or full of grey shimmering boxes. Then — pop — the real content appears. You just watched a <em>data fetch</em>.</p><p>None of that content ships with the app. The app is a shell; the posts, songs, and repos live on a server far away. The job of the front-end is to <strong>ask the server for data, wait, and then show it</strong> — while keeping the screen sensible the whole time.</p><p>In the <code>js-fetch</code> module you learned the asking part with plain JavaScript: <code>fetch()</code>, <code>await</code>, JSON. That knowledge still applies. What changes in React is <em>where the answer goes</em>.</p>`,
        analogy: `Think of a restaurant. The dining room (your UI) is set up and ready before any food exists. A waiter takes your order to the kitchen (the server), and you wait. The food doesn't teleport onto the table — it arrives later, and the table updates. Data fetching is that round trip, and React's job is to keep the table looking right at every moment: empty, "your food is coming," or served.`,
        docLinks: [
          {
            label: "MDN — Fetching data from the server",
            url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "data-lives-in-state",
      type: "explanation",
      instruction: {
        heading: "The big shift: data goes into state, not the DOM",
        body: `<p>With plain JavaScript and the DOM, you fetched data and then <em>imperatively</em> shoved it onto the page: <code>element.textContent = user.name</code>. You were responsible for finding the right element and updating it by hand.</p><p>React flips this around. You don't touch the DOM. Instead, fetched data goes into <strong>state</strong> with <code>useState</code>, and your component <em>describes</em> what the UI should look like for that state. When the data arrives and you call the state setter, React re-renders and updates the screen for you.</p><p>So a fetch in React is really four moments in time, and your component must have an answer for each one: <strong>no data yet</strong>, <strong>loading</strong>, <strong>got the data</strong>, and <strong>something failed</strong>. Watch them cycle in the diagram.</p>`,
        analogy: `The DOM way is like manually rewriting a scoreboard every time the score changes — find the digit, erase it, write the new one. The React way is like a digital scoreboard wired to the game: you just update the <em>number</em> (the state), and the display recalculates itself.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — the UI is a function of state",
            body: `React's core idea is <code>UI = f(state)</code>. You never describe the <em>steps</em> to change the screen; you describe what the screen <em>is</em> for the current data. Fetching just means putting new data into state and letting React redraw.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — State: a component's memory",
            url: "https://react.dev/learn/state-a-components-memory",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "three-questions",
      type: "explanation",
      instruction: {
        heading: "Three questions every fetch must answer",
        body: `<p>Before you write a single line, internalize the three questions that every data-fetching component answers. The rest of this module is just learning the tools to answer them well:</p><ul><li><strong>Where do I store the result?</strong> → in state, with <code>useState</code>.</li><li><strong>When do I run the fetch?</strong> → after the component appears, with <code>useEffect</code>.</li><li><strong>What does the user see while waiting or if it breaks?</strong> → loading and error UI.</li></ul><p>Get these three right and you can fetch anything — a weather forecast, a user profile, a list of products, a live feed. Get them wrong and you get blank screens, spinners that never stop, and the dreaded "cannot read property of undefined" crash.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — you are not starting from zero",
            body: `Everything from <code>js-fetch</code> carries over: <code>fetch()</code>, <code>await</code>, <code>response.ok</code>, <code>response.json()</code>, <code>try/catch</code>. This module wraps those exact skills in React's <code>useState</code> + <code>useEffect</code>, then shows how Next.js can skip the whole dance by fetching on the server.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Synchronizing with Effects",
            url: "https://react.dev/learn/synchronizing-with-effects",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
