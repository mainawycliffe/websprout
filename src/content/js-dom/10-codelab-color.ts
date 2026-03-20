import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-codelab-color-picker",
  slug: "codelab-color-picker",
  title: "Codelab: Color Picker",
  description:
    "Build a visual color picker with RGB sliders, live preview, hex code display, and a copy-to-clipboard feature — all with vanilla JavaScript.",
  order: 10,
  steps: [
    {
      id: "codelab-color-setup",
      type: "explanation",
      instruction: {
        heading: "Step 1: Create the HTML structure",
        body: "Let's build a color picker! Create a new project folder with three files.\n\n```\nmkdir color-picker\ncd color-picker\ntouch index.html style.css app.js\n```\n\nOur HTML needs:\n- A large color preview `<div>` that shows the selected color\n- Three range `<input>` sliders — one each for Red, Green, and Blue (0-255)\n- Labels showing each slider's current value\n- A `<p>` to display the hex color code\n- A 'Copy' button to copy the hex code to the clipboard\n\nOpen `index.html` and add the structure shown below. Then open it in your browser to see the layout.",
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Color Picker</title>\n  <link rel="stylesheet" href="style.css">\n  <script defer src="app.js"></script>\n</head>\n<body>\n  <div class="container">\n    <h1>Color Picker</h1>\n\n    <div id="color-preview"></div>\n    <p id="hex-code">#000000</p>\n    <button id="copy-btn">Copy Hex</button>\n\n    <div class="slider-group">\n      <label>\n        R: <span id="r-value">0</span>\n        <input type="range" id="r-slider" min="0" max="255" value="0">\n      </label>\n      <label>\n        G: <span id="g-value">0</span>\n        <input type="range" id="g-slider" min="0" max="255" value="0">\n      </label>\n      <label>\n        B: <span id="b-value">0</span>\n        <input type="range" id="b-slider" min="0" max="255" value="0">\n      </label>\n    </div>\n  </div>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-color-select",
      type: "explanation",
      instruction: {
        heading: "Step 2: Select all elements in JavaScript",
        body: "Open `app.js` and select every element we need to interact with. We need the three sliders, the three value displays, the color preview div, the hex code paragraph, and the copy button.\n\nGroup related selections together so the code reads clearly. Add a `console.log` at the end to verify everything is connected before writing any logic.",
      },
      config: {
        type: "explanation",
        demoCode:
          '// app.js\n\n// Sliders\nconst rSlider = document.querySelector("#r-slider");\nconst gSlider = document.querySelector("#g-slider");\nconst bSlider = document.querySelector("#b-slider");\n\n// Value displays\nconst rValue = document.querySelector("#r-value");\nconst gValue = document.querySelector("#g-value");\nconst bValue = document.querySelector("#b-value");\n\n// Preview and output\nconst preview = document.querySelector("#color-preview");\nconst hexCode = document.querySelector("#hex-code");\nconst copyBtn = document.querySelector("#copy-btn");\n\nconsole.log("All elements selected:", {\n  rSlider, gSlider, bSlider, preview, hexCode\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-color-update",
      type: "explanation",
      instruction: {
        heading: "Step 3: Update the preview on slider change",
        body: "Now for the core logic. We'll write an `updateColor` function that:\n1. Reads the current value of each slider\n2. Builds an `rgb()` color string\n3. Sets the preview div's background color\n4. Updates the value labels\n\nWe attach an `input` event listener to each slider. The `input` event fires continuously as the slider is dragged — unlike `change`, which only fires when the user releases the slider. This gives us the smooth, real-time preview that makes color pickers feel responsive.",
        docLinks: [
          {
            label: "HTMLInputElement: input event",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Slider `.value` returns a string, not a number. For math operations you'd need `Number(slider.value)` or `parseInt(slider.value)`. For building the rgb() string, the string works fine since it gets concatenated.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'function updateColor() {\n  // Read slider values\n  const r = rSlider.value;\n  const g = gSlider.value;\n  const b = bSlider.value;\n\n  // Update the value labels\n  rValue.textContent = r;\n  gValue.textContent = g;\n  bValue.textContent = b;\n\n  // Build the rgb color string and apply to preview\n  const rgbColor = `rgb(${r}, ${g}, ${b})`;\n  preview.style.backgroundColor = rgbColor;\n}\n\n// Listen for input on all three sliders\nrSlider.addEventListener("input", updateColor);\ngSlider.addEventListener("input", updateColor);\nbSlider.addEventListener("input", updateColor);\n\n// Run once on page load to set initial state\nupdateColor();',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-color-hex",
      type: "explanation",
      instruction: {
        heading: "Step 4: Display the hex color code",
        body: "Designers and developers often use hex codes (#FF6600) rather than RGB values. Let's convert the slider values to a hex string.\n\nA hex color code is `#` followed by the red, green, and blue values each converted to a two-digit hexadecimal number. JavaScript's `Number.toString(16)` converts a number to its hex representation. We use `.padStart(2, '0')` to ensure single-digit values get a leading zero (e.g., `5` becomes `'05'`).\n\nUpdate the `updateColor` function to also compute and display the hex code.",
        docLinks: [
          {
            label: "Number.prototype.toString()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString",
            type: "js-method",
          },
          {
            label: "String.prototype.padStart()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Helper: convert a number (0-255) to a 2-digit hex string\nfunction toHex(value) {\n  return Number(value).toString(16).padStart(2, "0");\n}\n\n// Updated updateColor function\nfunction updateColor() {\n  const r = rSlider.value;\n  const g = gSlider.value;\n  const b = bSlider.value;\n\n  // Update value labels\n  rValue.textContent = r;\n  gValue.textContent = g;\n  bValue.textContent = b;\n\n  // Update preview background\n  preview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;\n\n  // Compute and display hex code\n  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;\n  hexCode.textContent = hex.toUpperCase();\n}\n\n// Example: toHex(255) → "ff", toHex(0) → "00", toHex(16) → "10"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-color-copy",
      type: "explanation",
      instruction: {
        heading: "Step 5: Copy hex code to clipboard",
        body: "Let's add a click handler to the copy button that copies the hex code to the user's clipboard. The modern Clipboard API makes this straightforward.\n\n`navigator.clipboard.writeText()` returns a Promise, so we use `.then()` for the success case. We'll briefly change the button text to 'Copied!' as visual feedback, then change it back after 1.5 seconds using `setTimeout`.",
        docLinks: [
          {
            label: "Clipboard.writeText()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The Clipboard API requires a secure context (HTTPS or localhost). If you're opening the HTML file directly (file:// protocol), the copy feature may not work in some browsers. Use a simple local server (`python3 -m http.server`) or open the file in a browser that allows clipboard access from file:// URLs.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'copyBtn.addEventListener("click", function () {\n  const hex = hexCode.textContent;\n\n  navigator.clipboard.writeText(hex).then(function () {\n    // Visual feedback: change button text temporarily\n    copyBtn.textContent = "Copied!";\n    copyBtn.classList.add("copied");\n\n    // Reset after 1.5 seconds\n    setTimeout(function () {\n      copyBtn.textContent = "Copy Hex";\n      copyBtn.classList.remove("copied");\n    }, 1500);\n  });\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-color-styles",
      type: "explanation",
      instruction: {
        heading: "Step 6: Style the color picker",
        body: "Add styles to make the color picker look polished. The preview box should be large enough to clearly see the color. The sliders should use accent colors matching their channel (red, green, blue). The hex code should use a monospace font for that 'code' look.\n\nSave all files, refresh your browser, and try dragging the sliders. The preview should update smoothly in real time, and the hex code should update with it.",
      },
      config: {
        type: "explanation",
        demoCode:
          '/* style.css */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: system-ui, sans-serif;\n  background: #f0f2f5;\n  display: flex;\n  justify-content: center;\n  padding: 40px 16px;\n}\n\n.container {\n  text-align: center;\n  width: 100%;\n  max-width: 400px;\n}\n\nh1 {\n  margin-bottom: 24px;\n  font-size: 1.8rem;\n}\n\n#color-preview {\n  width: 100%;\n  height: 200px;\n  border-radius: 16px;\n  background: #000000;\n  margin-bottom: 16px;\n  border: 3px solid #d1d5db;\n}\n\n#hex-code {\n  font-family: ui-monospace, monospace;\n  font-size: 1.5rem;\n  font-weight: bold;\n  margin-bottom: 12px;\n  letter-spacing: 1px;\n}\n\n#copy-btn {\n  padding: 8px 24px;\n  font-size: 1rem;\n  background: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  margin-bottom: 24px;\n}\n\n#copy-btn.copied {\n  background: #22c55e;\n}\n\n.slider-group {\n  text-align: left;\n}\n\n.slider-group label {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n  font-size: 1rem;\n  font-weight: 600;\n}\n\n.slider-group label span {\n  width: 36px;\n  text-align: right;\n  font-family: ui-monospace, monospace;\n}\n\ninput[type="range"] {\n  flex: 1;\n  height: 8px;\n  cursor: pointer;\n}\n\n#r-slider { accent-color: #ef4444; }\n#g-slider { accent-color: #22c55e; }\n#b-slider { accent-color: #3b82f6; }',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-color-challenge",
      type: "explanation",
      instruction: {
        heading: "Step 7: Challenge — add preset color buttons",
        body: "Your color picker is complete! For a bonus challenge, add a row of **preset color buttons** below the sliders. When clicked, a preset button should set all three sliders to the corresponding RGB values and update the preview.\n\nHints:\n- Create an array of preset colors: `[{name: 'Tomato', r: 255, g: 99, b: 71}, ...]`\n- Loop through the array and create a small `<button>` for each color\n- Set each button's `backgroundColor` to its color as a visual label\n- On click, set the three slider `.value` properties and call `updateColor()`\n\nBonus ideas to explore:\n- Add a 'Random' button that picks random R, G, B values\n- Display the `hsl()` equivalent alongside the hex code\n- Save the last-used color to `localStorage` so it persists on reload\n- Make the hex code text color automatically switch between black and white for readability based on the background brightness",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "To programmatically change a slider's value, set its `.value` property: `rSlider.value = 255`. Then call `updateColor()` to sync the preview. The `input` event does NOT fire when you set `.value` in JavaScript — only when the user interacts with the slider.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Challenge starter code:\nconst presets = [\n  { name: "Tomato",    r: 255, g: 99,  b: 71 },\n  { name: "Dodger Blue", r: 30, g: 144, b: 255 },\n  { name: "Gold",      r: 255, g: 215, b: 0 },\n  { name: "Medium Purple", r: 147, g: 112, b: 219 },\n  { name: "Spring Green", r: 0, g: 255, b: 127 },\n  { name: "Coral",     r: 255, g: 127, b: 80 },\n];\n\nconst presetContainer = document.createElement("div");\npresetContainer.classList.add("presets");\n\npresets.forEach(function (color) {\n  const btn = document.createElement("button");\n  btn.classList.add("preset-btn");\n  btn.title = color.name;\n  btn.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;\n\n  btn.addEventListener("click", function () {\n    rSlider.value = color.r;\n    gSlider.value = color.g;\n    bSlider.value = color.b;\n    updateColor();\n  });\n\n  presetContainer.appendChild(btn);\n});\n\ndocument.querySelector(".container").appendChild(presetContainer);',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
