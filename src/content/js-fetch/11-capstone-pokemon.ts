import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-capstone-pokemon",
  slug: "capstone-pokemon",
  title: "Capstone: Pokemon Explorer",
  description:
    "Combine everything you've learned to build a Pokemon Explorer that fetches data from the PokeAPI and displays it with loading states and error handling.",
  order: 11,
  steps: [
    {
      id: "overview",
      type: "explanation",
      instruction: {
        heading: "Project Overview: Pokemon Explorer",
        body: `<p>Time to put everything together! In this capstone, we'll build a <strong>Pokemon Explorer</strong> — a mini-app where the user types a Pokemon name, clicks Search, and sees the Pokemon's image, name, and types fetched from a real API.</p>

<p>This project uses every concept from the module:</p>
<ul>
  <li><strong>JSON</strong> — Parsing the API response</li>
  <li><strong>Promises &amp; async/await</strong> — Handling the asynchronous fetch</li>
  <li><strong>fetch()</strong> — Making a real GET request to the PokeAPI</li>
  <li><strong>Response checking</strong> — Handling 404 for invalid Pokemon names</li>
  <li><strong>Error handling</strong> — try/catch for network and HTTP errors</li>
  <li><strong>DOM rendering</strong> — Creating elements and displaying data</li>
  <li><strong>Loading states</strong> — Showing feedback during the fetch</li>
</ul>

<p>We'll use the <strong>PokeAPI</strong> (<code>https://pokeapi.co/api/v2/pokemon/{name}</code>) — a free, open API with data about every Pokemon. No API key needed!</p>`,
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "html-structure",
      type: "explanation",
      instruction: {
        heading: "Step 1: HTML and CSS Structure",
        body: `<p>Every project starts with the HTML structure. Our Pokemon Explorer needs:</p>

<ul>
  <li>A <strong>heading</strong> for the page title</li>
  <li>An <strong>input field</strong> where the user types a Pokemon name</li>
  <li>A <strong>search button</strong> to trigger the fetch</li>
  <li>A <strong>result area</strong> where we'll display the Pokemon data (or loading/error messages)</li>
</ul>

<p>The CSS uses a simple card-based design with a centered layout. The result area starts empty and will be populated by JavaScript. Notice the different CSS classes for loading, error, and Pokemon display states — these correspond to the three UI states we discussed in the previous lesson.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Pokemon Explorer</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body {\n      font-family: system-ui, sans-serif;\n      background: #f0f4f8; padding: 40px 20px;\n      min-height: 100vh;\n    }\n    .container { max-width: 480px; margin: 0 auto; text-align: center; }\n    h1 { color: #1a1a2e; margin-bottom: 24px; font-size: 1.8rem; }\n    .search-bar {\n      display: flex; gap: 8px; margin-bottom: 24px;\n    }\n    input {\n      flex: 1; padding: 12px 16px; font-size: 1rem;\n      border: 2px solid #ddd; border-radius: 8px;\n      outline: none;\n    }\n    input:focus { border-color: #6366f1; }\n    button {\n      padding: 12px 24px; font-size: 1rem; font-weight: 600;\n      background: #6366f1; color: white; border: none;\n      border-radius: 8px; cursor: pointer;\n    }\n    button:disabled { background: #94a3b8; cursor: not-allowed; }\n    .pokemon-card {\n      background: white; border-radius: 16px; padding: 24px;\n      box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n    }\n    .pokemon-card img { width: 160px; height: 160px; }\n    .pokemon-card h2 {\n      text-transform: capitalize; margin: 8px 0;\n      font-size: 1.5rem; color: #1a1a2e;\n    }\n    .types { display: flex; gap: 8px; justify-content: center; margin-top: 8px; }\n    .type-badge {\n      padding: 4px 16px; border-radius: 20px;\n      background: #e0e7ff; color: #4338ca;\n      font-size: 0.85rem; font-weight: 600;\n      text-transform: capitalize;\n    }\n    .loading { color: #6366f1; font-style: italic; }\n    .error { color: #ef4444; font-weight: 500; }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <h1>Pokemon Explorer</h1>\n    <div class="search-bar">\n      <input type="text" id="nameInput" placeholder="Enter Pokemon name...">\n      <button id="searchBtn">Search</button>\n    </div>\n    <div id="result"></div>\n  </div>\n  <!-- JavaScript goes below -->\n</body>\n</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "select-elements",
      type: "explanation",
      instruction: {
        heading: "Step 2: Select Elements and Add Listener",
        body: `<p>With the HTML in place, the JavaScript starts by selecting the elements we need to interact with: the input, the button, and the result area. Then we add a click event listener to the search button.</p>

<p>We also add a <code>keydown</code> listener to the input so users can press Enter to search — a small UX touch that makes the app feel polished. Both the button click and the Enter key call the same <code>searchPokemon()</code> function.</p>

<p>Notice we get the input value with <code>.value.trim().toLowerCase()</code>. The <code>trim()</code> removes accidental spaces, and <code>toLowerCase()</code> ensures the search works regardless of capitalization (the PokeAPI expects lowercase names).</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `// Select elements\nconst nameInput = document.getElementById("nameInput");\nconst searchBtn = document.getElementById("searchBtn");\nconst result = document.getElementById("result");\n\n// Add click listener\nsearchBtn.addEventListener("click", () => {\n  searchPokemon();\n});\n\n// Add Enter key listener\nnameInput.addEventListener("keydown", (e) => {\n  if (e.key === "Enter") {\n    searchPokemon();\n  }\n});`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fetch-function",
      type: "explanation",
      instruction: {
        heading: "Step 3: The Async Fetch Function",
        body: `<p>The <code>searchPokemon()</code> function is the heart of the app. It follows the complete pattern we've been building throughout this module:</p>

<ol>
  <li>Get the user's input and validate it (don't fetch if empty)</li>
  <li>Show loading state and disable the button</li>
  <li>Fetch from the PokeAPI using the Pokemon name</li>
  <li>Check <code>response.ok</code> — a 404 means the Pokemon doesn't exist</li>
  <li>Parse the JSON response</li>
  <li>Pass the data to a display function</li>
  <li>Catch errors and show a user-friendly message</li>
  <li>Re-enable the button in a <code>finally</code> block</li>
</ol>

<p>The PokeAPI URL pattern is <code>https://pokeapi.co/api/v2/pokemon/{name}</code>. So for Pikachu, the URL is <code>https://pokeapi.co/api/v2/pokemon/pikachu</code>. It returns a large JSON object with the Pokemon's name, sprites (images), types, stats, and much more.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `async function searchPokemon() {\n  const name = nameInput.value.trim().toLowerCase();\n  if (!name) {\n    result.innerHTML = '<p class="error">Please enter a Pokemon name.</p>';\n    return;\n  }\n\n  // Loading state\n  result.innerHTML = '<p class="loading">Searching...</p>';\n  searchBtn.disabled = true;\n\n  try {\n    const response = await fetch(\n      "https://pokeapi.co/api/v2/pokemon/" + name\n    );\n\n    if (!response.ok) {\n      if (response.status === 404) {\n        throw new Error('Pokemon "' + name + '" not found.');\n      }\n      throw new Error("Server error: " + response.status);\n    }\n\n    const data = await response.json();\n    displayPokemon(data);\n\n  } catch (error) {\n    result.innerHTML = '<p class="error">' + error.message + "</p>";\n  } finally {\n    searchBtn.disabled = false;\n  }\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "display-function",
      type: "explanation",
      instruction: {
        heading: "Step 4: The Display Function",
        body: `<p>The <code>displayPokemon()</code> function takes the parsed API data and creates DOM elements to show the Pokemon. From the API response, we extract:</p>

<ul>
  <li><strong>Name</strong> — <code>data.name</code> (e.g., "pikachu")</li>
  <li><strong>Image</strong> — <code>data.sprites.front_default</code> (URL to the Pokemon's front sprite)</li>
  <li><strong>Types</strong> — <code>data.types</code> (an array of objects, each with a <code>.type.name</code>)</li>
</ul>

<p>The types array requires a bit of mapping. Each entry looks like <code>{ slot: 1, type: { name: "electric" } }</code>. We need to dig into <code>.type.name</code> to get the type string. This is very common with real APIs — data is often nested several levels deep.</p>

<p>We build the card using <code>createElement</code> and <code>textContent</code> for safety. For the image, we use <code>img.src</code> to set the URL and <code>img.alt</code> for accessibility — always provide alt text for images!</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `function displayPokemon(data) {\n  // Clear previous results\n  result.textContent = "";\n\n  // Create the card\n  const card = document.createElement("div");\n  card.className = "pokemon-card";\n\n  // Image\n  const img = document.createElement("img");\n  img.src = data.sprites.front_default;\n  img.alt = data.name;\n\n  // Name\n  const name = document.createElement("h2");\n  name.textContent = data.name;\n\n  // Types\n  const typesDiv = document.createElement("div");\n  typesDiv.className = "types";\n  data.types.forEach((t) => {\n    const badge = document.createElement("span");\n    badge.className = "type-badge";\n    badge.textContent = t.type.name;\n    typesDiv.appendChild(badge);\n  });\n\n  // Assemble\n  card.appendChild(img);\n  card.appendChild(name);\n  card.appendChild(typesDiv);\n  result.appendChild(card);\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "loading-error-states",
      type: "explanation",
      instruction: {
        heading: "Step 5: Loading and Error States",
        body: `<p>Let's review how the three states work in our Pokemon Explorer:</p>

<p><strong>Loading state</strong> — When the user clicks Search, we immediately show "Searching..." in italics and disable the button. The user knows something is happening.</p>

<p><strong>Success state</strong> — When the fetch completes and the Pokemon is found, we clear the loading message and render the Pokemon card with the image, name, and types.</p>

<p><strong>Error states</strong> — We handle two error scenarios differently:</p>
<ul>
  <li><strong>404 (Not Found)</strong> — The user typed a name that doesn't match any Pokemon. We show: 'Pokemon "xyz" not found.'</li>
  <li><strong>Network error</strong> — The user is offline or the API is down. We show the error message from the catch block.</li>
  <li><strong>Empty input</strong> — The user clicked Search without typing anything. We show: "Please enter a Pokemon name." This is handled before the fetch even starts.</li>
</ul>

<p>Each error message is specific and helpful — the user knows what went wrong and what to try next. Generic "Something went wrong" messages frustrate users because they don't know if they did something wrong or if the system is broken.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always provide specific error messages. 'Pokemon not found' is much more helpful than 'An error occurred.' When possible, suggest what the user should do: 'Check the spelling and try again.'",
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
      id: "complete-code",
      type: "explanation",
      instruction: {
        heading: "Complete Pokemon Explorer Code",
        body: `<p>Here's the complete, working Pokemon Explorer. It brings together every concept from this module: <code>fetch()</code>, <code>async/await</code>, JSON parsing, <code>response.ok</code> checking, error handling with <code>try/catch/finally</code>, DOM creation with <code>textContent</code>, and the three-state loading pattern.</p>

<p>Study this code carefully — it's a template you can adapt for any data-fetching project. The structure is always the same: select elements, listen for user action, fetch data, check response, parse JSON, render to DOM, handle errors, clean up.</p>

<p>Try searching for: <strong>pikachu</strong>, <strong>charizard</strong>, <strong>eevee</strong>, <strong>mewtwo</strong>, or <strong>snorlax</strong>. Then try a fake name to see error handling in action.</p>`,
        docLinks: [
          {
            label: "PokeAPI Documentation",
            url: "https://pokeapi.co/docs/v2",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Pokemon Explorer</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body {\n      font-family: system-ui, sans-serif;\n      background: #f0f4f8; padding: 40px 20px;\n      min-height: 100vh;\n    }\n    .container { max-width: 480px; margin: 0 auto; text-align: center; }\n    h1 { color: #1a1a2e; margin-bottom: 24px; font-size: 1.8rem; }\n    .search-bar { display: flex; gap: 8px; margin-bottom: 24px; }\n    input {\n      flex: 1; padding: 12px 16px; font-size: 1rem;\n      border: 2px solid #ddd; border-radius: 8px; outline: none;\n    }\n    input:focus { border-color: #6366f1; }\n    button {\n      padding: 12px 24px; font-size: 1rem; font-weight: 600;\n      background: #6366f1; color: white; border: none;\n      border-radius: 8px; cursor: pointer;\n    }\n    button:disabled { background: #94a3b8; cursor: not-allowed; }\n    .pokemon-card {\n      background: white; border-radius: 16px; padding: 24px;\n      box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n    }\n    .pokemon-card img { width: 160px; height: 160px; }\n    .pokemon-card h2 {\n      text-transform: capitalize; margin: 8px 0;\n      font-size: 1.5rem; color: #1a1a2e;\n    }\n    .types { display: flex; gap: 8px; justify-content: center; margin-top: 8px; }\n    .type-badge {\n      padding: 4px 16px; border-radius: 20px;\n      background: #e0e7ff; color: #4338ca;\n      font-size: 0.85rem; font-weight: 600; text-transform: capitalize;\n    }\n    .loading { color: #6366f1; font-style: italic; }\n    .error { color: #ef4444; font-weight: 500; }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <h1>Pokemon Explorer</h1>\n    <div class="search-bar">\n      <input type="text" id="nameInput" placeholder="Enter Pokemon name...">\n      <button id="searchBtn">Search</button>\n    </div>\n    <div id="result"></div>\n  </div>\n\n  <script>\n    const nameInput = document.getElementById("nameInput");\n    const searchBtn = document.getElementById("searchBtn");\n    const result = document.getElementById("result");\n\n    searchBtn.addEventListener("click", searchPokemon);\n    nameInput.addEventListener("keydown", (e) => {\n      if (e.key === "Enter") searchPokemon();\n    });\n\n    async function searchPokemon() {\n      const name = nameInput.value.trim().toLowerCase();\n      if (!name) {\n        result.innerHTML = '<p class="error">Please enter a Pokemon name.</p>';\n        return;\n      }\n\n      result.innerHTML = '<p class="loading">Searching...</p>';\n      searchBtn.disabled = true;\n\n      try {\n        const response = await fetch(\n          "https://pokeapi.co/api/v2/pokemon/" + name\n        );\n        if (!response.ok) {\n          if (response.status === 404) {\n            throw new Error('Pokemon "' + name + '" not found. Check spelling!');\n          }\n          throw new Error("Server error: " + response.status);\n        }\n\n        const data = await response.json();\n        displayPokemon(data);\n      } catch (error) {\n        result.innerHTML = '<p class="error">' + error.message + "</p>";\n      } finally {\n        searchBtn.disabled = false;\n        nameInput.focus();\n      }\n    }\n\n    function displayPokemon(data) {\n      result.textContent = "";\n\n      const card = document.createElement("div");\n      card.className = "pokemon-card";\n\n      const img = document.createElement("img");\n      img.src = data.sprites.front_default;\n      img.alt = data.name;\n\n      const nameEl = document.createElement("h2");\n      nameEl.textContent = data.name;\n\n      const typesDiv = document.createElement("div");\n      typesDiv.className = "types";\n      data.types.forEach((t) => {\n        const badge = document.createElement("span");\n        badge.className = "type-badge";\n        badge.textContent = t.type.name;\n        typesDiv.appendChild(badge);\n      });\n\n      card.appendChild(img);\n      card.appendChild(nameEl);\n      card.appendChild(typesDiv);\n      result.appendChild(card);\n    }\n  </script>\n</body>\n</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
