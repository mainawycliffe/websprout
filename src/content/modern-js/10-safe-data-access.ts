import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-safe-data-access",
  slug: "safe-data-access",
  title: "Safe Data Access: ?. and ??",
  description:
    "Read deeply nested or possibly-missing data without crashing using optional chaining (?.), and supply clean fallbacks with nullish coalescing (??).",
  order: 10,
  steps: [
    {
      id: "optional-chaining",
      type: "explanation",
      instruction: {
        heading: "Optional chaining: don't crash on missing data",
        body: `<p>Real data — especially from APIs — is messy. A field you expect might be missing. Reaching into it the normal way throws an error and breaks the page:</p><pre><code>user.profile.avatar   // 💥 if profile is undefined: "Cannot read properties of undefined"</code></pre><p><strong>Optional chaining</strong> (<code>?.</code>) makes the access safe. If anything before it is <code>null</code> or <code>undefined</code>, the whole expression simply returns <code>undefined</code> instead of throwing:</p><pre><code>user?.profile?.avatar   // undefined, no crash</code></pre><p>This is everywhere in React apps, where you render data that may still be loading or partially filled. One stray <code>?.</code> is the difference between a graceful blank and a white screen of death.</p>`,
        analogy: `<code>?.</code> is like checking if a door exists before walking through it. Without it, you stride confidently toward a doorway that isn't there and faceplant (the crash). With it, you peek first — no door, no problem, you just stop.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `<code>?.</code> short-circuits: the moment something is <code>null</code>/<code>undefined</code>, it stops and yields <code>undefined</code>. It works for properties (<code>a?.b</code>), array access (<code>list?.[0]</code>), and even method calls (<code>obj.method?.()</code>).`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Optional chaining (?.)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const user = { name: "Ada", address: { city: "Nairobi" } };
const guest = { name: "Visitor" };   // no address!

console.log(user?.address?.city);    // "Nairobi"
console.log(guest?.address?.city);   // undefined (no crash)

// Without ?. this line would throw:
// console.log(guest.address.city);  // 💥 TypeError`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "nullish-coalescing",
      type: "explanation",
      instruction: {
        heading: "Nullish coalescing: a smarter default",
        body: `<p>Optional chaining hands you <code>undefined</code> when data is missing — but you usually want to show <em>something</em> instead. <strong>Nullish coalescing</strong> (<code>??</code>) provides a fallback, but only when the left side is <code>null</code> or <code>undefined</code>:</p><pre><code>const city = user?.address?.city ?? "Unknown";</code></pre><p>Why not the older <code>||</code>? Because <code>||</code> falls back on <em>any</em> falsy value — including <code>0</code>, <code>""</code>, and <code>false</code>, which are often valid data. <code>??</code> only steps in for genuinely missing values, so a real <code>0</code> or empty string survives.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — ?? vs ||",
            body: `<code>count || 10</code> wrongly replaces a real <code>0</code> with <code>10</code>. <code>count ?? 10</code> keeps the <code>0</code> and only defaults when <code>count</code> is <code>null</code>/<code>undefined</code>. For numeric and boolean data, reach for <code>??</code>.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Nullish coalescing (??)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const guest = { name: "Visitor" };

const city = guest?.address?.city ?? "Unknown city";
console.log(city);   // "Unknown city"

// ?? respects real falsy values that || would wrongly replace:
const stock = 0;
console.log(stock || 5);   // 5  (|| treats 0 as "missing" — wrong here)
console.log(stock ?? 5);   // 0  (?? keeps the real zero — correct)`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "safe-access-practice",
      type: "js-console",
      instruction: {
        heading: "Your turn: read a profile safely",
        body: `<p>Two user objects are given — one full, one missing its <code>settings</code>. For <em>each</em>, log the theme using optional chaining and default it to <code>"light"</code> when missing:</p><p>Log <code>user?.settings?.theme ?? "light"</code> for both. You should see <code>"dark"</code> then <code>"light"</code> — and no crash.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `This exact one-liner — <code>data?.field ?? fallback</code> — is something you'll write hundreds of times when rendering API data in React. It's the safe way to show a value that might not have loaded yet.`,
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode: `const ada = { name: "Ada", settings: { theme: "dark" } };
const guest = { name: "Guest" };   // no settings

// Log each user's theme with ?. and default to "light" using ??
`,
        expectedOutput: ["dark", "light"],
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["?.", "??", "console.log"] },
      },
      hints: [
        'For Ada: <code>console.log(ada?.settings?.theme ?? "light");</code>',
        'For the guest: <code>console.log(guest?.settings?.theme ?? "light");</code>',
      ],
    },
  ],
};
