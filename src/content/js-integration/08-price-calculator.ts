import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-price-calculator",
  slug: "price-calculator",
  title: "Build a Sukuma Price Calculator",
  description:
    "The same vegetable, two units. Build a calculator that switches between Per kg and Bunch pricing and recomputes the total whenever the user changes anything.",
  order: 8,
  steps: [
    {
      id: "calc-explain",
      type: "explanation",
      instruction: {
        heading: "Two units of measure, one item",
        body: "<p>At any market, sukuma is sold two ways:</p><ul><li><strong>Per kg</strong> — KSh 60 per kilogram. The customer specifies weight.</li><li><strong>Per bunch</strong> — KSh 30 per pre-tied bunch. The customer specifies count.</li></ul><p>The interface is the same shape both times: a quantity input and a total. Only the price-per-unit and the unit label change. This is a perfect place to practice an <code>if</code> branch, object lookup, and event-driven recalculation.</p>",
        analogy:
          "It is the same vegetable in two different packaging units — like buying maize as flour (per kg) versus a single cob (per piece). The price logic is identical; the multiplier differs.",
        docLinks: [
          {
            label: "MDN: change event",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event",
            type: "js-concept",
          },
          {
            label: "MDN: parseFloat",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Form input values are <em>always</em> strings, even when the input type is <code>number</code>. Convert with <code>Number(value)</code> or <code>parseFloat(value)</code> before doing maths, or you will end up concatenating strings instead of adding.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "calc-fix-broken",
      type: "gap-fill",
      instruction: {
        heading: "Fix the broken if branch",
        body: "<p>This handler is supposed to compute the total based on the unit. But the comparison uses the wrong operator and always falls into the <code>else</code> branch. Fill in the correct equality operator.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'function computeTotal(unit, qty) {\n  let pricePerUnit;\n  if (unit {{op}} "kg") {\n    pricePerUnit = 60;\n  } else {\n    pricePerUnit = 30;\n  }\n  return pricePerUnit * qty;\n}',
        gaps: [
          {
            id: "op",
            placeholder: "operator",
            acceptedAnswers: ["===", "=="],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["op"] } },
      hints: [
        "A single = is assignment, not comparison.",
        "Use === for strict equality (preferred) or == for loose equality.",
      ],
    },
    {
      id: "calc-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: full price calculator",
        body: "<p>Wire two listeners (one on the <code>&lt;select&gt;</code>, one on the <code>&lt;input&gt;</code>) so the total recalculates whenever either changes.</p><p>Logic: if unit is <code>kg</code>, multiply quantity by 60. If unit is <code>bunch</code>, multiply quantity by 30. Render the result inside <code>#total</code>.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Extract the recalculation into one function (<code>render()</code>) and call it from both listeners. That way you avoid duplicating logic and you can also call it once on page load to set the initial total.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { font-family: system-ui, sans-serif; max-width: 380px; margin: 0 auto; padding: 32px; }\n  h1 { font-size: 22px; }\n  label { display: block; margin-top: 12px; font-weight: 600; }\n  select, input { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 16px; box-sizing: border-box; }\n  .total { margin-top: 20px; padding: 16px; background: #f1f5f9; border-radius: 8px; font-weight: 700; font-size: 20px; text-align: center; }\n</style>\n</head>\n<body>\n  <h1>Sukuma Price Calculator</h1>\n  <label for="unit">Unit</label>\n  <select id="unit">\n    <option value="kg">Per kg (KSh 60)</option>\n    <option value="bunch">Per bunch (KSh 30)</option>\n  </select>\n  <label for="qty">Quantity</label>\n  <input type="number" id="qty" value="1" min="0" step="0.5">\n  <div class="total">Total: KSh <span id="total">0</span></div>\n\n  <script>\n    // TODO:\n    // 1. select #unit, #qty, #total\n    // 2. write a render() function: read both values, compute total based on unit, write into #total\n    // 3. wire input/change listeners on #unit and #qty that call render()\n    // 4. call render() once on load so the initial value is correct\n  </script>\n</body>\n</html>',
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["addEventListener", "===", "textContent"] },
      },
      hints: [
        "const unit = document.querySelector('#unit'); const qty = document.querySelector('#qty'); const total = document.querySelector('#total');",
        "function render() { const price = unit.value === 'kg' ? 60 : 30; total.textContent = price * Number(qty.value); }",
        "unit.addEventListener('change', render); qty.addEventListener('input', render); render();",
      ],
    },
  ],
};
