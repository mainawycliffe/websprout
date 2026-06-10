import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-codelab-cart-module",
  slug: "codelab-cart-module",
  title: "Codelab: A Shopping-Cart Module",
  description:
    "Build a real shopping-cart data layer in a plain HTML file — immutable add/remove with spread and filter, totals with reduce — and run it in your browser.",
  order: 13,
  steps: [
    {
      id: "codelab-setup",
      type: "explanation",
      instruction: {
        heading: "Step 1 — set up the project",
        body: `<p>Let's build a working cart you can open in a browser — no build tools, just one HTML file. Open a terminal (on Linux, <code>Ctrl + Alt + T</code>) and run the commands below to make a folder and an empty file, then open the folder in your editor.</p><p>The commands: <code>mkdir</code> makes a directory, <code>cd</code> moves into it, <code>touch</code> creates an empty file, and <code>code .</code> opens the current folder in VS Code (use your editor of choice if different).</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `If <code>code .</code> doesn't work, just open the <code>cart</code> folder from your editor's <em>File → Open Folder</em> menu instead. The terminal commands only create the folder and file.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir cart
cd cart
touch cart.html
code .`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-write",
      type: "explanation",
      instruction: {
        heading: "Step 2 — write the cart",
        body: `<p>Open <code>cart.html</code> and type the code below. The script is the star: three small functions that each use a modern technique you learned, and never mutate the cart:</p><ul><li><code>addItem</code> uses <strong>spread</strong> to return a new array with the item added.</li><li><code>removeItem</code> uses <strong>filter</strong> to return a new array without the named item.</li><li><code>cartTotal</code> uses <strong>reduce</strong> to add up the prices into one number.</li></ul><p>The bottom of the script runs a few operations and renders the cart into the page with <code>map</code> + <code>join</code>. Save the file when you're done.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Notice <code>cart = addItem(cart, ...)</code> reassigns <code>cart</code> to the new array each function returns, rather than changing the old one in place. This immutable style is exactly how you'll manage a cart in React state with <code>setCart</code>.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Array.prototype.join()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Cart</title>
</head>
<body>
  <h1>Shopping Cart</h1>
  <ul id="items"></ul>
  <p id="total"></p>

  <script>
    // Immutable cart operations
    function addItem(cart, item) {
      return [...cart, item];                          // spread: new array
    }
    function removeItem(cart, name) {
      return cart.filter((i) => i.name !== name);      // filter: new array
    }
    function cartTotal(cart) {
      return cart.reduce((sum, i) => sum + i.price, 0); // reduce: one number
    }

    // Use them — each step reassigns cart to a fresh array
    let cart = [];
    cart = addItem(cart, { name: "Pen", price: 5 });
    cart = addItem(cart, { name: "Mug", price: 20 });
    cart = addItem(cart, { name: "Desk", price: 150 });
    cart = removeItem(cart, "Mug");

    // Render with map + join
    document.querySelector("#items").innerHTML = cart
      .map((i) => "<li>" + i.name + " — KSh " + i.price + "</li>")
      .join("");
    document.querySelector("#total").textContent = "Total: KSh " + cartTotal(cart);
  </script>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-run",
      type: "explanation",
      instruction: {
        heading: "Step 3 — run it in the browser",
        body: `<p>Open <code>cart.html</code> in your browser. On Linux you can run <code>xdg-open cart.html</code> from the terminal, or just double-click the file in your file manager.</p><p>You should see the cart with <strong>Pen</strong> and <strong>Desk</strong> (the Mug was removed) and <strong>Total: KSh 155</strong>. Open the browser's developer console (<code>F12</code>) — if something's blank, an error there will point you to the line. Try editing the items in the script and refreshing to watch the total update.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `No server needed — a plain HTML file with a <code>&lt;script&gt;</code> runs straight from the file system. (You only need a server when code does <code>fetch</code> of local files, like the TypeScript codelab in another module.)`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `xdg-open cart.html`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: extend the cart",
        body: `<p>Here are the cart functions, runnable right here. Extend them — pick at least one:</p><ul><li><strong>Quantities:</strong> let items have a <code>qty</code> and make <code>cartTotal</code> sum <code>price * qty</code>.</li><li><strong>Discount:</strong> write <code>applyDiscount(cart, percent)</code> that <code>map</code>s to new items with reduced prices (immutably!).</li><li><strong>Count:</strong> log how many items are in the cart.</li></ul><p>Experiment freely and log your results. This is the same logic you'll later move into React state.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Keep everything immutable: a discount function should <code>return cart.map((i) => ({ ...i, price: i.price * (1 - percent) }))</code> — a new array of new objects, originals untouched.`,
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode: `function addItem(cart, item) {
  return [...cart, item];
}
function removeItem(cart, name) {
  return cart.filter((i) => i.name !== name);
}
function cartTotal(cart) {
  return cart.reduce((sum, i) => sum + i.price, 0);
}

let cart = [];
cart = addItem(cart, { name: "Pen", price: 5 });
cart = addItem(cart, { name: "Desk", price: 150 });

console.log("Items:", cart.length);
console.log("Total:", cartTotal(cart));

// Your turn: add an item, remove one, or write applyDiscount(cart, percent)
// using .map() and spread. Log the new total.
`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Discount: <code>function applyDiscount(cart, percent) { return cart.map((i) => ({ ...i, price: i.price * (1 - percent) })); }</code>",
        "Then: <code>cart = applyDiscount(cart, 0.1); console.log(cartTotal(cart));</code>",
      ],
    },
  ],
};
