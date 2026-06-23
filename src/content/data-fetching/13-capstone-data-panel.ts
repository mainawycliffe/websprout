import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-capstone-data-panel",
  slug: "capstone-data-panel",
  title: "Capstone: A Live Country Panel",
  description:
    "Combine everything — fetch on mount, loading and error states, a rendered list, selection, and animated detail — into one polished React panel powered by a real API.",
  order: 13,
  steps: [
    {
      id: "the-brief",
      type: "explanation",
      instruction: {
        heading: "The brief: a master–detail panel",
        body: `<p>Time to put the whole module together in one component. You'll build a <strong>master–detail panel</strong>: a list of countries on one side, and when you click one, its details animate in on the other. It's the single most common shape in real apps — email (inbox → message), Spotify (playlist → song), Slack (channels → messages), settings screens, dashboards.</p><p>This capstone uses the live <strong>REST Countries</strong> API — the same API you'll build a full Next.js dashboard with in the final codelab. So everything you do here is a warm-up for the real thing. You'll exercise: fetch on mount, loading and error UI, rendering a list with keys, selection state, and a CSS-animated detail reveal.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — animation without a library",
            body: `The in-browser preview only has React from a CDN — no Motion library. So we animate with pure CSS, exactly like the skeleton lesson: a tiny <code>@keyframes</code> fade-and-rise applied whenever the selected country changes. The trick is a React <code>key</code> on the detail card so it re-mounts (and re-animates) on each selection.`,
          },
        ],
        docLinks: [
          {
            label: "REST Countries — free countries API",
            url: "https://restcountries.com/",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-the-panel",
      type: "free-edit",
      instruction: {
        heading: "Your turn: wire up the panel",
        body: `<p>The layout, styles, and selection logic are ready. Three TODOs bring it to life — all skills from this module:</p><ol><li><strong>Fetch on mount:</strong> in the effect, <code>fetch</code> the European countries URL, check <code>res.ok</code>, parse JSON, sort by name, and <code>setCountries</code>. Use try/catch/finally to set <code>error</code> and turn off <code>loading</code>.</li><li><strong>Loading & error UI:</strong> show a message while <code>loading</code>, and the error if one occurred.</li><li><strong>Render the list:</strong> map over <code>countries</code> into clickable buttons, each calling <code>setSelected(country)</code>.</li></ol><p>Click around — the detail card on the right fades and rises in for each country. You just built a real, API-driven UI from scratch.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the API returns an array of country objects",
            body: `Each item has <code>name.common</code>, <code>capital</code> (an array), <code>population</code> (a number), <code>region</code>, and <code>flags.svg</code>. Use <code>country.capital?.[0]</code> since a few places have no capital, and <code>population.toLocaleString()</code> for nice comma formatting.`,
          },
        ],
        docLinks: [
          {
            label: "REST Countries — filter by region",
            url: "https://restcountries.com/v3.1/region/europe",
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
  <title>Country Panel</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; }
    .layout { display: grid; grid-template-columns: 200px 1fr; gap: 16px; max-width: 560px; }
    .list { max-height: 320px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 10px; padding: 6px; }
    .list button { display: block; width: 100%; text-align: left; padding: 8px 10px; border: none; background: none; border-radius: 8px; cursor: pointer; font-size: 14px; }
    .list button:hover { background: #f1f5f9; }
    .list button.active { background: #e0f2fe; font-weight: 600; }
    .detail { border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; min-height: 200px; }
    .detail img { width: 64px; border-radius: 4px; border: 1px solid #e2e8f0; }
    .detail h2 { margin: 8px 0 4px; }
    .muted { color: #64748b; font-size: 14px; }
    .error { color: #dc2626; font-weight: 600; }
    .reveal { animation: rise 0.35s ease both; }
    @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;
    const API = "https://restcountries.com/v3.1/region/europe?fields=name,capital,population,region,flags,cca3";

    function CountryPanel() {
      const [countries, setCountries] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [selected, setSelected] = useState(null);

      useEffect(() => {
        async function load() {
          try {
            // TODO 1: fetch(API), check res.ok, parse JSON,
            //         sort by a.name.common vs b.name.common, then setCountries(...)
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }
        load();
      }, []);

      // TODO 2: if (loading) return <p className="muted">Loading countries…</p>;
      //         if (error)   return <p className="error">Error: {error}</p>;

      return (
        <div className="layout">
          <div className="list">
            {/* TODO 3: countries.map(c => (
                  <button key={c.cca3}
                          className={selected && selected.cca3 === c.cca3 ? "active" : ""}
                          onClick={() => setSelected(c)}>
                    {c.name.common}
                  </button>
                )) */}
          </div>

          <div className="detail">
            {!selected ? (
              <p className="muted">Pick a country to see its details.</p>
            ) : (
              <div className="reveal" key={selected.cca3}>
                <img src={selected.flags.svg} alt={"Flag of " + selected.name.common} />
                <h2>{selected.name.common}</h2>
                <p className="muted">Capital: {selected.capital?.[0] || "—"}</p>
                <p className="muted">Region: {selected.region}</p>
                <p className="muted">Population: {selected.population.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<CountryPanel />);
  </script>
</body>
</html>`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["fetch", "setCountries", "countries.map"] },
      },
      hints: [
        "Fetch: <code>const res = await fetch(API); if (!res.ok) throw new Error(\"HTTP \" + res.status); const data = await res.json();</code>",
        "Sort then store: <code>data.sort((a, b) =&gt; a.name.common.localeCompare(b.name.common)); setCountries(data);</code>",
        "List: map countries to <code>&lt;button key={c.cca3} onClick={() =&gt; setSelected(c)}&gt;{c.name.common}&lt;/button&gt;</code> (add the active className for the selected one).",
      ],
    },
    {
      id: "make-it-yours",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: make it yours",
        body: `<p>Here's the finished panel, working end to end. Now extend it — pick at least one, there's no single right answer:</p><ul><li><strong>Search box:</strong> add an input and filter the list as you type (<code>name.common.toLowerCase().includes(query)</code>) — a client-side dependent render.</li><li><strong>Region switcher:</strong> add buttons for Europe / Asia / Africa that change the API URL and refetch (put the region in the effect's dependency array — lesson 6).</li><li><strong>Fetch deeper detail:</strong> on selection, fetch <code>/v3.1/alpha/{cca3}</code> for extra fields like languages or currencies, with its own loading state.</li><li><strong>Skeletons:</strong> swap the "Loading countries…" text for a list of shimmering skeleton rows (lesson 5).</li></ul><p>Experiment, break it, fix it. This is exactly the kind of component you'll build for real in the next codelab — just spread across multiple Next.js pages.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — add a race guard if you refetch",
            body: `If you add the region switcher (which refetches on change), add the <code>let ignore = false</code> cleanup from lesson 7 — switching regions quickly is exactly when a stale response could win.`,
          },
        ],
        docLinks: [
          {
            label: "REST Countries — all endpoints",
            url: "https://restcountries.com/#endpoints-all",
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
  <title>Country Panel — Complete</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #1e293b; }
    .layout { display: grid; grid-template-columns: 220px 1fr; gap: 16px; max-width: 580px; }
    input { width: 100%; box-sizing: border-box; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 8px; font-size: 14px; }
    .list { max-height: 300px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 10px; padding: 6px; }
    .list button { display: block; width: 100%; text-align: left; padding: 8px 10px; border: none; background: none; border-radius: 8px; cursor: pointer; font-size: 14px; }
    .list button:hover { background: #f1f5f9; }
    .list button.active { background: #e0f2fe; font-weight: 600; }
    .detail { border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; min-height: 220px; }
    .detail img { width: 64px; border-radius: 4px; border: 1px solid #e2e8f0; }
    .detail h2 { margin: 8px 0 4px; }
    .muted { color: #64748b; font-size: 14px; }
    .error { color: #dc2626; font-weight: 600; }
    .reveal { animation: rise 0.35s ease both; }
    @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;
    const API = "https://restcountries.com/v3.1/region/europe?fields=name,capital,population,region,flags,cca3";

    function CountryPanel() {
      const [countries, setCountries] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [selected, setSelected] = useState(null);
      const [query, setQuery] = useState("");

      useEffect(() => {
        async function load() {
          try {
            const res = await fetch(API);
            if (!res.ok) throw new Error("HTTP " + res.status);
            const data = await res.json();
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            setCountries(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }
        load();
      }, []);

      if (loading) return <p className="muted">Loading countries…</p>;
      if (error) return <p className="error">Error: {error}</p>;

      const visible = countries.filter((c) =>
        c.name.common.toLowerCase().includes(query.toLowerCase())
      );

      return (
        <div className="layout">
          <div>
            <input
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="list">
              {visible.map((c) => (
                <button
                  key={c.cca3}
                  className={selected && selected.cca3 === c.cca3 ? "active" : ""}
                  onClick={() => setSelected(c)}
                >
                  {c.name.common}
                </button>
              ))}
              {visible.length === 0 && <p className="muted" style={{ padding: 8 }}>No matches.</p>}
            </div>
          </div>

          <div className="detail">
            {!selected ? (
              <p className="muted">Pick a country to see its details.</p>
            ) : (
              <div className="reveal" key={selected.cca3}>
                <img src={selected.flags.svg} alt={"Flag of " + selected.name.common} />
                <h2>{selected.name.common}</h2>
                <p className="muted">Capital: {selected.capital?.[0] || "—"}</p>
                <p className="muted">Region: {selected.region}</p>
                <p className="muted">Population: {selected.population.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<CountryPanel />);
  </script>
</body>
</html>`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "For a region switcher, move the region into state and build the URL from it: <code>const API = base + region</code>, then add <code>region</code> to the effect's dependency array.",
        "For deeper detail, fetch <code>https://restcountries.com/v3.1/alpha/&#36;{selected.cca3}</code> in a second effect keyed on <code>selected</code>.",
        "There's no wrong answer here — try one extension, then another.",
      ],
    },
  ],
};
