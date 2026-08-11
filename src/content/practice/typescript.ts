import type { PracticeQuestionSeed } from "@/types/practice";

export const typescriptQuestions: PracticeQuestionSeed[] = [
  {
    id: "ts-any-vs-unknown",
    slug: "any-versus-unknown",
    title: "any or unknown?",
    topics: ["typescript", "types", "safety"],
    relatedModule: "js-practice-ts",
    step: {
      id: "ts-any-vs-unknown",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "any or unknown?",
        body: "<p>Both accept any value. Only one of them keeps the compiler working for you afterwards.</p><p>Work out which line is rejected, and why that rejection is desirable.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "let a: any = JSON.parse(input);\nlet u: unknown = JSON.parse(input);\n\na.foo.bar();   // ?\nu.foo.bar();   // ?",
        codeLanguage: "typescript",
        options: [
          {
            id: "unknown-errors",
            text: "The <code>any</code> line compiles; the <code>unknown</code> line is rejected until you narrow the type",
            correct: true,
            explanation:
              "Correct. <code>any</code> switches type checking off for that value — every property access is permitted and any resulting crash is a runtime surprise. <code>unknown</code> accepts any value coming <em>in</em> but permits nothing going <em>out</em> until you prove what it is with a <code>typeof</code> check, an <code>in</code> check or a type guard. For anything crossing a trust boundary — <code>JSON.parse</code>, a fetch response, user input — <code>unknown</code> is the right default.",
          },
          {
            id: "both-error",
            text: "Both are rejected, since neither type has a <code>foo</code> property",
            correct: false,
            explanation:
              "<code>any</code> deliberately suppresses that error. It is an escape hatch from the type system rather than a type with no members.",
          },
          {
            id: "both-fine",
            text: "Both compile; the two types are interchangeable",
            correct: false,
            explanation:
              "They are opposites in one important respect. <code>any</code> is assignable both ways and unchecked; <code>unknown</code> accepts anything but lets you do nothing with it until narrowed.",
          },
          {
            id: "unknown-any",
            text: "The <code>unknown</code> line compiles; <code>any</code> is the stricter of the two",
            correct: false,
            explanation:
              "Backwards. The <code>any</code> keyword is the permissive one — it is why linters flag it and why <code>noImplicitAny</code> exists.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "One of them turns type checking off. The other demands proof before use.",
        "Which would you rather have on the result of <code>JSON.parse</code>?",
      ],
    },
  },

  {
    id: "ts-interface-vs-type",
    slug: "interface-or-type-alias",
    title: "interface or type?",
    topics: ["typescript", "types"],
    relatedModule: "js-practice-ts",
    step: {
      id: "ts-interface-vs-type",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "interface or type?",
        body: "<p>They overlap heavily and either is fine for most object shapes. But some things only one of them can express.</p><p><strong>Select every statement that is true.</strong></p>",
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "union",
            text: "Only <code>type</code> can describe a union such as <code>string | number</code>",
            correct: true,
            explanation:
              "True. An <code>interface</code> always declares an object shape, so unions, tuples, primitives and mapped types all require a <code>type</code> alias.",
          },
          {
            id: "merging",
            text: "Only <code>interface</code> can be declared twice and have the declarations merge",
            correct: true,
            explanation:
              "True — declaration merging. Two <code>interface Window</code> declarations combine, which is how libraries augment existing global types. Redeclaring a <code>type</code> alias is an error. Merging is powerful in library code and usually undesirable in application code, where a silent merge can hide a duplicate name.",
          },
          {
            id: "extends",
            text: "Only <code>interface</code> can extend another type",
            correct: false,
            explanation:
              "Both can compose. <code>interface B extends A</code> and <code>type B = A & { … }</code> achieve much the same thing; an interface can even extend a type alias whose shape is an object.",
          },
          {
            id: "runtime",
            text: "<code>interface</code> exists at runtime, so you can check values against it",
            correct: false,
            explanation:
              "Neither exists at runtime — both are erased entirely when TypeScript compiles to JavaScript. Runtime validation needs actual code, whether hand-written guards or a library like Zod.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two of the four are true. Think about what each keyword can <em>describe</em>.",
        "Does anything from the type system survive compilation?",
      ],
    },
  },

  {
    id: "ts-narrowing",
    slug: "narrow-a-union-type",
    title: "Why is .toUpperCase() an error here?",
    topics: ["typescript", "narrowing", "unions"],
    relatedModule: "js-practice-ts",
    step: {
      id: "ts-narrowing",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Why is .toUpperCase() an error here?",
        body: "<p>The parameter can be a string or a number. Calling a string method on it is rejected.</p><p>Work out what the compiler needs before it will let the call through.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "function shout(value: string | number) {\n  return value.toUpperCase(); // Error\n}",
        codeLanguage: "typescript",
        options: [
          {
            id: "narrow-first",
            text: "On a union you may only use members common to <em>every</em> member — narrow with <code>typeof value === \"string\"</code> first",
            correct: true,
            explanation:
              "Correct. A union means \"one of these, and I do not yet know which\", so only the shared surface is safe — and numbers have no <code>toUpperCase</code>. Inside <code>if (typeof value === \"string\")</code> the compiler narrows the type to <code>string</code> and the call is allowed. This control-flow narrowing is one of TypeScript's most useful features, and it works with <code>typeof</code>, <code>instanceof</code>, <code>in</code>, and equality against literal types.",
          },
          {
            id: "cast",
            text: "You must cast it: <code>(value as string).toUpperCase()</code>",
            correct: false,
            explanation:
              "That silences the compiler without making the code safe — pass a number and it crashes at runtime. A cast asserts knowledge you have not demonstrated; narrowing proves it.",
          },
          {
            id: "any",
            text: "Change the parameter type to <code>any</code>",
            correct: false,
            explanation:
              "This removes the error by removing the checking, which trades a compile-time error for a runtime one. It is the opposite of what the type was for.",
          },
          {
            id: "not-allowed",
            text: "Union types cannot be used as parameters",
            correct: false,
            explanation:
              "They are extremely common as parameters. The restriction is only on which members you may access before narrowing.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Which methods do <code>string</code> and <code>number</code> have in common?",
        "How can you prove to the compiler which one you have at this point?",
      ],
    },
  },

  {
    id: "ts-optional-vs-undefined",
    slug: "optional-property-versus-undefined",
    title: "Is an optional property the same as one that can be undefined?",
    topics: ["typescript", "types", "objects"],
    relatedModule: "js-practice-ts",
    step: {
      id: "ts-optional-vs-undefined",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Is an optional property the same as one that can be undefined?",
        body: "<p>These two declarations look equivalent and are not.</p><p>Work out which object literals each accepts — the difference shows up when the property is left out entirely.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "type A = { name?: string };\ntype B = { name: string | undefined };\n\nconst a: A = {};  // ?\nconst b: B = {};  // ?",
        codeLanguage: "typescript",
        options: [
          {
            id: "b-errors",
            text: "<code>a</code> is fine; <code>b</code> is an error because the property must still be present",
            correct: true,
            explanation:
              "Correct. <code>?</code> makes the property optional — it may be absent altogether. A union with <code>undefined</code> keeps it <strong>required</strong>; you must supply it, even if the value you supply is <code>undefined</code>. The distinction matters for anything that inspects keys, since <code>\"name\" in a</code> is <code>false</code> while <code>\"name\" in b</code> is <code>true</code>.",
          },
          {
            id: "identical",
            text: "They are identical; <code>?</code> is shorthand for <code>| undefined</code>",
            correct: false,
            explanation:
              "<code>?</code> does add <code>undefined</code> to the value type, but it <em>also</em> makes the key itself optional — and that second half is the part this example turns on.",
          },
          {
            id: "a-errors",
            text: "<code>a</code> is an error and <code>b</code> is fine",
            correct: false,
            explanation:
              "Backwards. The question mark is what permits the key to be missing.",
          },
          {
            id: "both-error",
            text: "Both are errors, since neither supplies a name",
            correct: false,
            explanation:
              "An optional property can be omitted — that is its entire purpose, and it is why <code>{}</code> satisfies type <code>A</code>.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Does <code>?</code> change the type of the value, the presence of the key, or both?",
        "What does <code>\"name\" in obj</code> return for each?",
      ],
    },
  },

  {
    id: "ts-array-generic",
    slug: "type-a-generic-first-function",
    title: "Why does this generic lose the type?",
    topics: ["typescript", "generics"],
    relatedModule: "js-practice-ts",
    step: {
      id: "ts-array-generic",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Why does this generic lose the type?",
        body: "<p><code>first</code> is meant to return the first element with its element type preserved. Callers get <code>any</code> instead.</p><p>Compare the two signatures and work out which one actually links input to output.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "function first(items: any[]): any { return items[0]; }\nfunction firstG<T>(items: T[]): T { return items[0]; }\n\nconst n = first([1, 2, 3]);   // any\nconst g = firstG([1, 2, 3]);  // ?",
        codeLanguage: "typescript",
        options: [
          {
            id: "generic-infers",
            text: "<code>g</code> is <code>number</code> — the generic parameter ties the return type to the argument",
            correct: true,
            explanation:
              "Correct. <code>T</code> is a placeholder resolved per call site: passing <code>number[]</code> makes <code>T</code> be <code>number</code>, so the return type is <code>number</code> with no annotation needed. The <code>any[]</code> version throws that relationship away — it accepts every array but tells the caller nothing. Note that both versions lie slightly about empty arrays, where <code>items[0]</code> is actually <code>undefined</code>.",
          },
          {
            id: "also-any",
            text: "<code>g</code> is also <code>any</code>, since <code>T</code> is unconstrained",
            correct: false,
            explanation:
              "An unconstrained <code>T</code> is not <code>any</code> — it is inferred at each call. Constraints like <code>T extends object</code> limit what may be passed; they are not required for inference to work.",
          },
          {
            id: "unknown",
            text: "<code>g</code> is <code>unknown</code>, and you must narrow it",
            correct: false,
            explanation:
              "Inference gives a concrete type here. You would only see <code>unknown</code> if you annotated it that way explicitly.",
          },
          {
            id: "needs-explicit",
            text: "<code>g</code> is <code>number</code>, but only if you write <code>firstG&lt;number&gt;([1, 2, 3])</code>",
            correct: false,
            explanation:
              "You may supply the type argument explicitly, but you rarely need to — TypeScript infers it from the argument. Explicit arguments are for cases where inference cannot decide.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "What does <code>T</code> stand for at the moment the function is called?",
        "Does the <code>any[]</code> signature record any relationship between the parameter and the return?",
      ],
    },
  },

  {
    id: "ts-readonly-array",
    slug: "what-does-readonly-actually-prevent",
    title: "What does readonly actually prevent?",
    topics: ["typescript", "immutability", "types"],
    relatedModule: "js-practice-ts",
    step: {
      id: "ts-readonly-array",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "What does readonly actually prevent?",
        body: "<p>A parameter is declared <code>readonly string[]</code> to signal that the function will not modify it.</p><p><strong>Select every statement that is true</strong> about what this does and does not guarantee.</p>",
      },
      config: {
        type: "quiz",
        mode: "multiple",
        codeSnippet: "function show(items: readonly string[]) {\n  // ...\n}",
        codeLanguage: "typescript",
        options: [
          {
            id: "blocks-push",
            text: "Calling <code>items.push(\"x\")</code> inside the function is a compile error",
            correct: true,
            explanation:
              "True. <code>readonly string[]</code> exposes only the non-mutating members, so <code>push</code>, <code>pop</code>, <code>sort</code> and friends are simply not on the type. It documents the contract and enforces it at the same time.",
          },
          {
            id: "compile-only",
            text: "It is erased at compile time, so nothing stops mutation at runtime",
            correct: true,
            explanation:
              "True, and important. <code>readonly</code> is a type-system annotation with no runtime representation — JavaScript that calls the function from untyped code can mutate freely. For runtime protection you need <code>Object.freeze</code>.",
          },
          {
            id: "deep",
            text: "It makes the array and everything inside it immutable",
            correct: false,
            explanation:
              "It is shallow. <code>readonly {name: string}[]</code> still lets you write <code>items[0].name = \"new\"</code> — the array cannot be reshaped, but its objects can be edited.",
          },
          {
            id: "rejects-normal",
            text: "You can no longer pass an ordinary <code>string[]</code> to this function",
            correct: false,
            explanation:
              "A mutable array is assignable to a <code>readonly</code> parameter — that is what makes the annotation cheap to adopt. The reverse is not allowed, which is the point.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two of the four are true. One is about compile time, one about runtime.",
        "Does the annotation reach <em>inside</em> the array's elements?",
      ],
    },
  },
];
