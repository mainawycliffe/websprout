import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-ts-interfaces-aliases",
  slug: "ts-interfaces-aliases",
  title: "Interfaces vs Type Aliases",
  description:
    "Define object shapes with interface and type. When to use which, plus optional, readonly, extends, and intersections.",
  order: 12,
  steps: [
    {
      id: "two-shapes",
      type: "explanation",
      instruction: {
        heading: "Two ways to name an object shape",
        body: "<p>TypeScript gives you two tools for naming shapes:</p><ul><li><code>interface User { id: number; name: string }</code></li><li><code>type User = { id: number; name: string }</code></li></ul><p>For object shapes, they’re 95% interchangeable. Pick a convention and stick to it. The 5% where they differ matters when authoring libraries — covered later.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Interfaces support <strong>declaration merging</strong>: multiple <code>interface User { ... }</code> blocks in scope merge into one. Type aliases do not. Library authors use interfaces for public types so consumers can extend them; application code mostly doesn’t care.",
          },
        ],
        docLinks: [
          {
            label: "Interfaces (TS handbook)",
            url: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Both define the same shape.\ninterface User {\n  id: number;\n  name: string;\n}\n\ntype UserAlias = {\n  id: number;\n  name: string;\n};\n\nconst a: User      = { id: 1, name: "Asha" };\nconst b: UserAlias = { id: 2, name: "Ben" };',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fill-product",
      type: "gap-fill",
      instruction: {
        heading: "Define an interface Product",
        body: "<p>Fill in the field types for a product on a shopping site.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'interface Product {\n  id: {{a}};\n  title: {{b}};\n  price: {{c}};\n  inStock: {{d}};\n}\n\nconst pillow: Product = {\n  id: 12,\n  title: "Linen Pillow",\n  price: 1999, // cents\n  inStock: true,\n};',
        gaps: [
          { id: "a", placeholder: "type", acceptedAnswers: ["number"], caseSensitive: true },
          { id: "b", placeholder: "type", acceptedAnswers: ["string"], caseSensitive: true },
          { id: "c", placeholder: "type", acceptedAnswers: ["number"], caseSensitive: true },
          { id: "d", placeholder: "type", acceptedAnswers: ["boolean"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b", "c", "d"] } },
      hints: [
        "Lowercase primitive types: <code>number</code>, <code>string</code>, <code>boolean</code>.",
      ],
    },
    {
      id: "optional-readonly",
      type: "explanation",
      instruction: {
        heading: "Optional and readonly fields",
        body: "<p>Two everyday modifiers:</p><ul><li><code>name?: string</code> — the field may be missing or <code>undefined</code>. Use it for fields that aren’t always set, like <code>middleName</code>.</li><li><code>readonly id: number</code> — the field can be set on creation but not reassigned. Useful for IDs, timestamps, anything immutable after creation.</li></ul><p>API responses often have plenty of optional fields — the user might not have a profile picture, the post might not have tags. Modelling that in the type avoids <code>undefined</code> surprises later.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          'interface User {\n  readonly id: number;\n  name: string;\n  middleName?: string;  // optional\n  email: string;\n}\n\nconst u: User = { id: 1, name: "Asha", email: "asha@x.com" };\n// u.id = 2;       // Error: cannot reassign readonly\n// u.middleName    // string | undefined — TS forces you to handle the undefined case\n\nfunction welcome(u: User) {\n  if (u.middleName) {\n    return `Welcome, ${u.name} ${u.middleName}!`;\n  }\n  return `Welcome, ${u.name}!`;\n}',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "cart-total",
      type: "free-edit",
      instruction: {
        heading: "Type a cart and compute its total",
        body: "<p>Define a <code>Product</code> interface, build a typed <code>cart: Product[]</code>, and write <code>getTotal(cart)</code> returning a <code>number</code>. Use <code>reduce</code>.</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          'interface Product {\n  id: number;\n  title: string;\n  priceCents: number;\n  inStock: boolean;\n}\n\nconst cart: Product[] = [\n  { id: 1, title: "Tea",     priceCents: 250,  inStock: true },\n  { id: 2, title: "Mug",     priceCents: 1200, inStock: true },\n  { id: 3, title: "Pillow",  priceCents: 1999, inStock: false },\n];\n\nfunction getTotal(cart: Product[]): number {\n  // sum priceCents of in-stock items only\n}\n\n// Expected: 250 + 1200 = 1450 cents = $14.50\nconsole.log(getTotal(cart)); // 1450',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["interface", "Product", "reduce", "number"] },
      },
      hints: [
        "<code>cart.filter(p =&gt; p.inStock).reduce((sum, p) =&gt; sum + p.priceCents, 0)</code>",
        "Or chain a single <code>reduce</code> with an <code>if</code> inside.",
      ],
    },
    {
      id: "extends-vs-intersection",
      type: "explanation",
      instruction: {
        heading: "Extends (interfaces) and & (type aliases)",
        body: "<p>Extending an interface is the most common composition pattern: <code>interface Dog extends Animal { breed: string }</code>. Dog has every field of Animal plus its own.</p><p>Type aliases use intersection (<code>&</code>) for the same effect: <code>type Dog = Animal & { breed: string }</code>.</p><p>One real difference: type aliases can describe things interfaces cannot — primitives, unions, tuples. <code>type Id = string | number</code> is a type alias. There is no equivalent <code>interface</code>.</p><p>Rule of thumb: <strong>interface</strong> for object shapes (especially anything public), <strong>type</strong> for unions, intersections, primitives, tuples, and complex computed types.</p>",
        docLinks: [
          {
            label: "Type aliases vs interfaces (TS handbook)",
            url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'interface Animal {\n  name: string;\n  age: number;\n}\n\ninterface Dog extends Animal {\n  breed: string;\n}\n\nconst rex: Dog = { name: "Rex", age: 4, breed: "lab" };\n\n// Equivalent with type aliases\ntype AnimalT = { name: string; age: number };\ntype DogT = AnimalT & { breed: string };\n\n// Things only type aliases can do:\ntype Id = string | number;\ntype Pair = [number, number];',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-dog",
      type: "free-edit",
      instruction: {
        heading: "Define Animal, Dog, and a function that uses them",
        body: "<p>Write an <code>interface Animal</code> with <code>name</code> and <code>age</code>, then <code>interface Dog</code> that extends it with a <code>breed</code> field. Write <code>describe(d: Dog): string</code> returning a sentence using all three fields.</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          '// 1. interface Animal\n// 2. interface Dog extends Animal\n// 3. function describe(d: Dog): string\n\n// const rex: Dog = { name: "Rex", age: 4, breed: "lab" };\n// console.log(describe(rex));  // "Rex is a 4-year-old lab"',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["interface", "extends", "Dog", "Animal"] },
      },
      hints: [
        "<code>interface Dog extends Animal { breed: string }</code>",
        "<code>function describe(d: Dog): string { return `${d.name} is a ${d.age}-year-old ${d.breed}`; }</code>",
      ],
    },
  ],
};
