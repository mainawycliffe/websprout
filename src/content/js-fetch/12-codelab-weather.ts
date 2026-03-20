import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-fetch-codelab-weather",
  slug: "codelab-weather",
  title: "Codelab: Weather Dashboard",
  description:
    "Build a Weather Dashboard from scratch — a complete project using the free Open-Meteo API, practiced in a real code editor and browser.",
  order: 12,
  steps: [
    {
      id: "setup",
      type: "explanation",
      instruction: {
        heading: "Project Setup",
        body: `<p>In this codelab, you'll build a <strong>Weather Dashboard</strong> that fetches real weather data and displays it in a clean interface. Unlike previous lessons that used our sandbox, this project is designed to be built in a real code editor on your computer.</p>

<p><strong>What you'll need:</strong></p>
<ul>
  <li>A code editor (VS Code, or any text editor)</li>
  <li>A modern web browser (Chrome, Firefox, Edge, or Safari)</li>
  <li>An internet connection (to fetch weather data)</li>
</ul>

<p><strong>Setup steps:</strong></p>
<ol>
  <li>Create a new folder on your computer called <code>weather-dashboard</code></li>
  <li>Inside that folder, create a single file: <code>index.html</code></li>
  <li>Open <code>index.html</code> in your code editor</li>
  <li>We'll write all HTML, CSS, and JavaScript in this one file</li>
</ol>

<p>We'll use the <strong>Open-Meteo API</strong> — a completely free, no-signup-required weather API. It provides real weather data for any location using latitude/longitude coordinates. No API key needed!</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "To open your HTML file in the browser, you can simply double-click it in your file manager. Or right-click and choose 'Open with' and select your browser. The URL will start with <code>file:///</code> — that's normal for local files.",
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
      id: "html-structure",
      type: "explanation",
      instruction: {
        heading: "Step 1: HTML Structure",
        body: `<p>Start by typing the HTML skeleton. Our weather dashboard needs:</p>

<ul>
  <li>A <strong>header</strong> with the app title</li>
  <li>A <strong>city selector</strong> — we'll use a dropdown (<code>&lt;select&gt;</code>) with a few preset cities (since Open-Meteo needs coordinates, we'll store lat/lon as data attributes)</li>
  <li>A <strong>fetch button</strong> to trigger the weather request</li>
  <li>A <strong>weather display area</strong> for temperature, wind speed, and conditions</li>
  <li>A <strong>status area</strong> for loading and error messages</li>
</ul>

<p>Type the following into your <code>index.html</code> file. Don't copy-paste — typing it out builds muscle memory and helps you notice every detail:</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Weather Dashboard</title>\n</head>\n<body>\n  <div class="container">\n    <h1>Weather Dashboard</h1>\n\n    <div class="controls">\n      <select id="citySelect">\n        <option value="" disabled selected>Choose a city...</option>\n        <option data-lat="40.7128" data-lon="-74.0060">New York</option>\n        <option data-lat="51.5074" data-lon="-0.1278">London</option>\n        <option data-lat="35.6762" data-lon="139.6503">Tokyo</option>\n        <option data-lat="48.8566" data-lon="2.3522">Paris</option>\n        <option data-lat="-33.8688" data-lon="151.2093">Sydney</option>\n        <option data-lat="-1.2921" data-lon="36.8219">Nairobi</option>\n      </select>\n      <button id="fetchBtn">Get Weather</button>\n    </div>\n\n    <div id="status"></div>\n    <div id="weather" class="weather-card" hidden></div>\n  </div>\n\n  <!-- CSS goes in a <style> tag next -->\n  <!-- JavaScript goes in a <script> tag at the end -->\n</body>\n</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "css-styling",
      type: "explanation",
      instruction: {
        heading: "Step 2: CSS Styling",
        body: `<p>Add a <code>&lt;style&gt;</code> tag inside the <code>&lt;head&gt;</code> of your HTML, after the <code>&lt;title&gt;</code> tag. We'll create a clean, modern design with a gradient background and card-based weather display.</p>

<p>Key CSS decisions:</p>
<ul>
  <li><strong>CSS custom properties</strong> (variables) for consistent colors</li>
  <li><strong>Flexbox</strong> for centering and spacing the controls</li>
  <li><strong>CSS Grid</strong> for the weather stats layout</li>
  <li>A <strong>hidden attribute</strong> on the weather card — we'll remove it with JavaScript when data loads</li>
  <li>Specific classes for <strong>loading</strong> and <strong>error</strong> states</li>
</ul>

<p>Add this CSS inside a <code>&lt;style&gt;</code> tag in the <code>&lt;head&gt;</code>:</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `<style>\n  :root {\n    --primary: #3b82f6;\n    --error: #ef4444;\n    --bg: #f0f4f8;\n    --card: #ffffff;\n    --text: #1e293b;\n    --muted: #64748b;\n  }\n\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n\n  body {\n    font-family: system-ui, -apple-system, sans-serif;\n    background: var(--bg);\n    color: var(--text);\n    min-height: 100vh;\n    padding: 40px 20px;\n  }\n\n  .container {\n    max-width: 520px;\n    margin: 0 auto;\n  }\n\n  h1 {\n    text-align: center;\n    margin-bottom: 24px;\n    font-size: 2rem;\n    color: var(--text);\n  }\n\n  .controls {\n    display: flex;\n    gap: 8px;\n    margin-bottom: 20px;\n  }\n\n  select {\n    flex: 1;\n    padding: 12px;\n    font-size: 1rem;\n    border: 2px solid #ddd;\n    border-radius: 8px;\n    background: white;\n    cursor: pointer;\n  }\n\n  button {\n    padding: 12px 24px;\n    font-size: 1rem;\n    font-weight: 600;\n    background: var(--primary);\n    color: white;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: background 0.2s;\n  }\n\n  button:hover { background: #2563eb; }\n  button:disabled {\n    background: #94a3b8;\n    cursor: not-allowed;\n  }\n\n  #status {\n    text-align: center;\n    margin-bottom: 16px;\n    min-height: 24px;\n  }\n\n  .loading { color: var(--primary); font-style: italic; }\n  .error { color: var(--error); font-weight: 500; }\n\n  .weather-card {\n    background: var(--card);\n    border-radius: 16px;\n    padding: 32px;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  }\n\n  .weather-card h2 {\n    text-align: center;\n    margin-bottom: 20px;\n    font-size: 1.4rem;\n  }\n\n  .temp-display {\n    text-align: center;\n    font-size: 4rem;\n    font-weight: 700;\n    color: var(--primary);\n    margin-bottom: 20px;\n  }\n\n  .stats {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 16px;\n  }\n\n  .stat {\n    text-align: center;\n    padding: 12px;\n    background: var(--bg);\n    border-radius: 8px;\n  }\n\n  .stat-label {\n    font-size: 0.85rem;\n    color: var(--muted);\n    margin-bottom: 4px;\n  }\n\n  .stat-value {\n    font-size: 1.2rem;\n    font-weight: 600;\n  }\n\n  [hidden] { display: none; }\n</style>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "select-elements",
      type: "explanation",
      instruction: {
        heading: "Step 3: Select Elements and Add Listeners",
        body: `<p>Now add a <code>&lt;script&gt;</code> tag just before the closing <code>&lt;/body&gt;</code> tag. Start by selecting all the elements we need and adding an event listener to the button.</p>

<p>For the city selector, we need to read the <code>data-lat</code> and <code>data-lon</code> attributes from the selected option. These are <strong>data attributes</strong> — custom attributes that store extra information on HTML elements. You access them via the <code>dataset</code> property: <code>option.dataset.lat</code> and <code>option.dataset.lon</code>.</p>

<p>We also validate that a city has been selected before making the request — don't let the user fetch weather for "Choose a city..."!</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `<script>\n  // Select elements\n  const citySelect = document.getElementById("citySelect");\n  const fetchBtn = document.getElementById("fetchBtn");\n  const status = document.getElementById("status");\n  const weatherCard = document.getElementById("weather");\n\n  // Add click listener\n  fetchBtn.addEventListener("click", () => {\n    const selectedOption = citySelect.selectedOptions[0];\n\n    if (!selectedOption || !selectedOption.dataset.lat) {\n      status.textContent = "Please select a city first.";\n      status.className = "error";\n      return;\n    }\n\n    const lat = selectedOption.dataset.lat;\n    const lon = selectedOption.dataset.lon;\n    const cityName = selectedOption.textContent;\n\n    fetchWeather(lat, lon, cityName);\n  });\n</script>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fetch-weather",
      type: "explanation",
      instruction: {
        heading: "Step 4: The fetchWeather Function",
        body: `<p>Now write the async function that fetches weather data from Open-Meteo. The API URL takes latitude, longitude, and a list of weather variables you want. We'll request current temperature, wind speed, humidity, and weather condition code.</p>

<p>The Open-Meteo API URL format is:</p>
<p><code>https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code</code></p>

<p>The response looks like this:</p>
<pre><code>{
  "current": {
    "temperature_2m": 22.5,
    "wind_speed_10m": 12.3,
    "relative_humidity_2m": 65,
    "weather_code": 1
  },
  "current_units": {
    "temperature_2m": "\u00b0C",
    "wind_speed_10m": "km/h"
  }
}</code></pre>

<p>This function follows the same robust pattern: loading state, fetch, check response, parse, display, catch errors, restore UI.</p>`,
        docLinks: [
          {
            label: "Open-Meteo API Docs",
            url: "https://open-meteo.com/en/docs",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `async function fetchWeather(lat, lon, cityName) {\n  // Loading state\n  status.textContent = "Fetching weather...";\n  status.className = "loading";\n  fetchBtn.disabled = true;\n  weatherCard.hidden = true;\n\n  try {\n    const url = "https://api.open-meteo.com/v1/forecast"\n      + "?latitude=" + lat\n      + "&longitude=" + lon\n      + "&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code";\n\n    const response = await fetch(url);\n\n    if (!response.ok) {\n      throw new Error("Weather API error: " + response.status);\n    }\n\n    const data = await response.json();\n    displayWeather(data, cityName);\n    status.textContent = "";\n\n  } catch (error) {\n    status.textContent = "Failed to load weather: " + error.message;\n    status.className = "error";\n    weatherCard.hidden = true;\n  } finally {\n    fetchBtn.disabled = false;\n  }\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "parse-display",
      type: "explanation",
      instruction: {
        heading: "Step 5: Parse and Display the Weather",
        body: `<p>The <code>displayWeather()</code> function extracts the values from the API response and renders them into the weather card. We use the <code>current</code> object for values and <code>current_units</code> for the units (like \u00b0C, km/h).</p>

<p>For the weather condition, the API returns a <strong>WMO weather code</strong> (a number). We'll map these to human-readable descriptions using a simple helper function. Common codes:</p>
<ul>
  <li><code>0</code> = Clear sky</li>
  <li><code>1-3</code> = Partly cloudy</li>
  <li><code>45, 48</code> = Foggy</li>
  <li><code>51-67</code> = Rain/drizzle</li>
  <li><code>71-77</code> = Snow</li>
  <li><code>95-99</code> = Thunderstorm</li>
</ul>

<p>We build the weather card content using DOM creation methods and <code>textContent</code>, then remove the <code>hidden</code> attribute to show the card.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `function getWeatherDescription(code) {\n  if (code === 0) return "Clear sky";\n  if (code <= 3) return "Partly cloudy";\n  if (code <= 48) return "Foggy";\n  if (code <= 57) return "Drizzle";\n  if (code <= 67) return "Rain";\n  if (code <= 77) return "Snow";\n  if (code <= 82) return "Rain showers";\n  if (code <= 86) return "Snow showers";\n  if (code >= 95) return "Thunderstorm";\n  return "Unknown";\n}\n\nfunction displayWeather(data, cityName) {\n  const current = data.current;\n  const units = data.current_units;\n\n  weatherCard.innerHTML = "";\n\n  // City name\n  const title = document.createElement("h2");\n  title.textContent = cityName;\n  weatherCard.appendChild(title);\n\n  // Temperature (big display)\n  const tempDiv = document.createElement("div");\n  tempDiv.className = "temp-display";\n  tempDiv.textContent = Math.round(current.temperature_2m) + units.temperature_2m;\n  weatherCard.appendChild(tempDiv);\n\n  // Stats grid\n  const statsDiv = document.createElement("div");\n  statsDiv.className = "stats";\n\n  const stats = [\n    { label: "Condition", value: getWeatherDescription(current.weather_code) },\n    { label: "Wind", value: current.wind_speed_10m + " " + units.wind_speed_10m },\n    { label: "Humidity", value: current.relative_humidity_2m + "%" },\n    { label: "Weather Code", value: current.weather_code },\n  ];\n\n  stats.forEach((s) => {\n    const stat = document.createElement("div");\n    stat.className = "stat";\n\n    const label = document.createElement("div");\n    label.className = "stat-label";\n    label.textContent = s.label;\n\n    const value = document.createElement("div");\n    value.className = "stat-value";\n    value.textContent = s.value;\n\n    stat.appendChild(label);\n    stat.appendChild(value);\n    statsDiv.appendChild(stat);\n  });\n\n  weatherCard.appendChild(statsDiv);\n  weatherCard.hidden = false;\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "error-polish",
      type: "explanation",
      instruction: {
        heading: "Step 6: Error States and Polish",
        body: `<p>Let's review the error handling in our Weather Dashboard. We handle three scenarios:</p>

<ul>
  <li><strong>No city selected</strong> — Caught before the fetch even starts, with a clear message.</li>
  <li><strong>API error</strong> — The fetch succeeds but the server returns a non-OK status (unlikely with Open-Meteo, but good practice).</li>
  <li><strong>Network error</strong> — The user is offline or the API is unreachable. Caught by the <code>catch</code> block.</li>
</ul>

<p>Some polish ideas to try on your own:</p>
<ul>
  <li>Add weather emojis based on the weather code (sun for clear, cloud for cloudy, etc.)</li>
  <li>Add a "Last updated" timestamp</li>
  <li>Save the last selected city to <code>localStorage</code> and restore it on page load</li>
  <li>Add more cities to the dropdown</li>
  <li>Style the card differently based on the weather condition (blue for rain, yellow for sunny)</li>
</ul>

<p>This is your <strong>free-edit checkpoint</strong>: experiment with the code. Break things, fix them, add features. The best way to learn is by tinkering.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Open your browser's DevTools (F12 or Cmd+Option+I) and go to the Network tab. You can see the actual HTTP request going out to Open-Meteo and inspect the response. This is an invaluable debugging tool.",
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
        heading: "Complete Weather Dashboard Code",
        body: `<p>Here's the complete, working Weather Dashboard. Copy this entire file into your <code>index.html</code>, save it, and open it in a browser to test.</p>

<p>This codelab covered:</p>
<ul>
  <li>Building a complete HTML/CSS/JS application in one file</li>
  <li>Using <code>&lt;select&gt;</code> with <code>data-*</code> attributes for structured data</li>
  <li>Making real API requests to Open-Meteo</li>
  <li>Parsing complex JSON responses with nested objects</li>
  <li>Dynamic DOM creation for the weather display</li>
  <li>Three-state UI pattern: loading, success, error</li>
  <li>Robust error handling for all failure scenarios</li>
</ul>

<p>Congratulations! You've built a real, working web application that fetches live data from the internet and displays it in a polished interface. This is exactly how professional web developers build features every day.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Weather Dashboard</title>\n  <style>\n    :root {\n      --primary: #3b82f6;\n      --error: #ef4444;\n      --bg: #f0f4f8;\n      --card: #ffffff;\n      --text: #1e293b;\n      --muted: #64748b;\n    }\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body {\n      font-family: system-ui, -apple-system, sans-serif;\n      background: var(--bg);\n      color: var(--text);\n      min-height: 100vh;\n      padding: 40px 20px;\n    }\n    .container { max-width: 520px; margin: 0 auto; }\n    h1 {\n      text-align: center;\n      margin-bottom: 24px;\n      font-size: 2rem;\n      color: var(--text);\n    }\n    .controls { display: flex; gap: 8px; margin-bottom: 20px; }\n    select {\n      flex: 1; padding: 12px; font-size: 1rem;\n      border: 2px solid #ddd; border-radius: 8px;\n      background: white; cursor: pointer;\n    }\n    button {\n      padding: 12px 24px; font-size: 1rem; font-weight: 600;\n      background: var(--primary); color: white;\n      border: none; border-radius: 8px; cursor: pointer;\n      transition: background 0.2s;\n    }\n    button:hover { background: #2563eb; }\n    button:disabled { background: #94a3b8; cursor: not-allowed; }\n    #status { text-align: center; margin-bottom: 16px; min-height: 24px; }\n    .loading { color: var(--primary); font-style: italic; }\n    .error { color: var(--error); font-weight: 500; }\n    .weather-card {\n      background: var(--card); border-radius: 16px;\n      padding: 32px;\n      box-shadow: 0 4px 12px rgba(0,0,0,0.08);\n    }\n    .weather-card h2 { text-align: center; margin-bottom: 20px; font-size: 1.4rem; }\n    .temp-display {\n      text-align: center; font-size: 4rem;\n      font-weight: 700; color: var(--primary);\n      margin-bottom: 20px;\n    }\n    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }\n    .stat {\n      text-align: center; padding: 12px;\n      background: var(--bg); border-radius: 8px;\n    }\n    .stat-label { font-size: 0.85rem; color: var(--muted); margin-bottom: 4px; }\n    .stat-value { font-size: 1.2rem; font-weight: 600; }\n    [hidden] { display: none; }\n  </style>\n</head>\n<body>\n  <div class="container">\n    <h1>Weather Dashboard</h1>\n    <div class="controls">\n      <select id="citySelect">\n        <option value="" disabled selected>Choose a city...</option>\n        <option data-lat="40.7128" data-lon="-74.0060">New York</option>\n        <option data-lat="51.5074" data-lon="-0.1278">London</option>\n        <option data-lat="35.6762" data-lon="139.6503">Tokyo</option>\n        <option data-lat="48.8566" data-lon="2.3522">Paris</option>\n        <option data-lat="-33.8688" data-lon="151.2093">Sydney</option>\n        <option data-lat="-1.2921" data-lon="36.8219">Nairobi</option>\n      </select>\n      <button id="fetchBtn">Get Weather</button>\n    </div>\n    <div id="status"></div>\n    <div id="weather" class="weather-card" hidden></div>\n  </div>\n\n  <script>\n    const citySelect = document.getElementById("citySelect");\n    const fetchBtn = document.getElementById("fetchBtn");\n    const status = document.getElementById("status");\n    const weatherCard = document.getElementById("weather");\n\n    fetchBtn.addEventListener("click", () => {\n      const selectedOption = citySelect.selectedOptions[0];\n      if (!selectedOption || !selectedOption.dataset.lat) {\n        status.textContent = "Please select a city first.";\n        status.className = "error";\n        return;\n      }\n      const lat = selectedOption.dataset.lat;\n      const lon = selectedOption.dataset.lon;\n      const cityName = selectedOption.textContent;\n      fetchWeather(lat, lon, cityName);\n    });\n\n    async function fetchWeather(lat, lon, cityName) {\n      status.textContent = "Fetching weather...";\n      status.className = "loading";\n      fetchBtn.disabled = true;\n      weatherCard.hidden = true;\n\n      try {\n        const url = "https://api.open-meteo.com/v1/forecast"\n          + "?latitude=" + lat\n          + "&longitude=" + lon\n          + "&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code";\n\n        const response = await fetch(url);\n        if (!response.ok) {\n          throw new Error("Weather API error: " + response.status);\n        }\n\n        const data = await response.json();\n        displayWeather(data, cityName);\n        status.textContent = "";\n      } catch (error) {\n        status.textContent = "Failed to load weather: " + error.message;\n        status.className = "error";\n        weatherCard.hidden = true;\n      } finally {\n        fetchBtn.disabled = false;\n      }\n    }\n\n    function getWeatherDescription(code) {\n      if (code === 0) return "Clear sky";\n      if (code <= 3) return "Partly cloudy";\n      if (code <= 48) return "Foggy";\n      if (code <= 57) return "Drizzle";\n      if (code <= 67) return "Rain";\n      if (code <= 77) return "Snow";\n      if (code <= 82) return "Rain showers";\n      if (code <= 86) return "Snow showers";\n      if (code >= 95) return "Thunderstorm";\n      return "Unknown";\n    }\n\n    function displayWeather(data, cityName) {\n      const current = data.current;\n      const units = data.current_units;\n\n      weatherCard.innerHTML = "";\n\n      const title = document.createElement("h2");\n      title.textContent = cityName;\n      weatherCard.appendChild(title);\n\n      const tempDiv = document.createElement("div");\n      tempDiv.className = "temp-display";\n      tempDiv.textContent = Math.round(current.temperature_2m) + units.temperature_2m;\n      weatherCard.appendChild(tempDiv);\n\n      const statsDiv = document.createElement("div");\n      statsDiv.className = "stats";\n\n      const stats = [\n        { label: "Condition", value: getWeatherDescription(current.weather_code) },\n        { label: "Wind", value: current.wind_speed_10m + " " + units.wind_speed_10m },\n        { label: "Humidity", value: current.relative_humidity_2m + "%" },\n        { label: "Weather Code", value: current.weather_code },\n      ];\n\n      stats.forEach((s) => {\n        const stat = document.createElement("div");\n        stat.className = "stat";\n        const label = document.createElement("div");\n        label.className = "stat-label";\n        label.textContent = s.label;\n        const value = document.createElement("div");\n        value.className = "stat-value";\n        value.textContent = s.value;\n        stat.appendChild(label);\n        stat.appendChild(value);\n        statsDiv.appendChild(stat);\n      });\n\n      weatherCard.appendChild(statsDiv);\n      weatherCard.hidden = false;\n    }\n  </script>\n</body>\n</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
