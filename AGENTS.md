<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Primary Objective

**The #1 goal of WebSprout is to teach and ensure students grasp the basics and fundamentals of web development.** Every feature, lesson, and UI decision must serve this objective. Content should not just show syntax — it should explain *why* things work the way they do, connect concepts to real-world browser behavior, and reinforce web standards conformance. When in doubt, prioritize understanding over coverage.

### Content Formatting

- **Use HTML, never Markdown, in lesson content strings** (`body`, `analogy`, `infoBoxes[].body`). Since WebSprout teaches HTML, the content itself must use HTML tags for formatting — `<strong>`, `<em>`, `<code>`, `<ul>/<li>`, `<ol>/<li>`, `<br>`, etc. Never use Markdown syntax (`**bold**`, `*italic*`, `` `code` ``, `- list item`). The InstructionPanel and InfoBox components render these strings as HTML.
- **Only a whitelist of tags survives.** `src/lib/lesson-html.ts` allows inline `a br code em kbd mark s strong sub sup u`, plus block `blockquote li ol p pre ul` in `body`. Anything else — including `<div>` and `<span>` — is escaped and wrapped in `<code>`. **Quiz `options[].text` and `options[].explanation` go through `renderLessonInlineHtml`, so they accept inline tags only.**

### Content Guidelines

- **Explain why it exists**: Every concept should include its purpose — *why* was it created, *what problem* does it solve? Don't just show how to use a tag; explain why the web needs it.
- **Incorporate problem solving wherever possible**: Prefer questions and exercises that make students *reason*, not recall. Favour predict-the-output, debug-this-broken-code, choose-between-approaches, and decompose-the-problem framings over "what does this keyword mean". Where a task has two stages (filter then map, normalise then compare), say so and let the student work out the order. State the edge cases as something to think about rather than as instructions to follow.
- **Give real-world examples**: Connect concepts to websites and apps students already know (Google, YouTube, Wikipedia, Amazon, Instagram, etc.). Students should recognize these patterns in the wild.
- **Make it relatable**: Use analogies drawn from everyday life — school, shipping packages, concerts, phone apps — so abstract concepts feel familiar before the technical explanation.
- **Include doc links**: Reference MDN Web Docs for every HTML element, attribute, and CSS property. Conform to web standards — teach the *right* way from the start.
- **Add info boxes**: Use "Web Standard" boxes for accessibility, spec conformance, and browser behavior. Use "Tip" boxes for common mistakes and practical gotchas — placed on practice steps where students are most likely to hit the issue.
- **Include a full example lesson**: Every module should end with a capstone lesson that combines all taught concepts into building something recognizable and complete. Students should walk away having built a real thing, not just practiced isolated skills.
- **Include codelabs**: Every module must include step-by-step codelab lessons that guide students through building real projects in a code editor and browser. Codelabs bridge the gap between the interactive tool and real-world development. Assume Linux, no build tools for HTML/CSS modules (just HTML/CSS files opened in a browser). Don't assume prior knowledge — explain every terminal command and editor action. End each codelab with a free-edit checkpoint. Progressive difficulty: start simple, build on previous codelabs.
  - **Exception — framework modules:** the React and Next.js modules may assume a real toolchain (Node, npm, a local dev server). React Fundamentals teaches concepts live in-app via a CDN-based React + Babel preview loaded in the `html-js` interactive preview (for learning only, like the in-browser TS-compiler codelab); Next.js for Beginners uses local guided codelabs run with `npx create-next-app` and the Next.js dev server (`npm run dev`). The "no build tools" rule still applies to all HTML/CSS modules.

### Question Types, Levels and XP

Two step types exist for assessed practice, on top of the older `gap-fill` / `free-edit` steps:

- **`quiz`** (`QuizConfig`) — `single`, `true-false` or `multiple`. **Every option needs an `explanation`**; that is the teaching payload, not decoration. Write distractors that are wrong for an *interesting* reason, and explain why each was tempting. Single-choice reveals on click; multi-select needs an explicit "Check answer".
- **`code-challenge`** (`CodeChallengeConfig`) — the student writes a function and it is run against real test cases in a sandboxed iframe. Test `args` **must be structured-cloneable — no functions**, since they cross `postMessage`; for callbacks, mutation checks and identity checks use the `expression` form instead. React challenges use `language: "react"` with `componentName` and per-test `render.assert`.

**Difficulty levels** live on `Step.difficulty` (`easy` | `intermediate` | `advanced`), so a step and its practice-hub card can never disagree. Hold to these definitions:

| Level | Quiz | Code challenge |
| --- | --- | --- |
| **Easy** | Recall or one concept; distractors clearly wrong | One built-in or one loop; 2-3 tests, no edge cases |
| **Intermediate** | Combines 2-3 concepts; at least one genuinely tempting distractor | Needs a helper or a condition; 4-5 tests including an empty input |
| **Advanced** | Turns on a gotcha, a spec detail, or an ordering rule | Edge cases, immutability or identity checks, `hidden` anti-hardcoding tests |

**Practice hub** (`/practice`) — the bank lives in `src/content/practice/`. A `PracticeQuestion` wraps a normal `Step`, so quiz/code-challenge/gap-fill components are reused unchanged. Keep the bank JS/TS- and concept-only: React questions need the unpkg CDN and the hub should stay usable offline.

**Gamification** — XP, plant-themed ranks, daily streaks and badges, all in IndexedDB (`src/lib/gamification.ts` is pure; `useGamification` is the only write path). XP is awarded on **first solve only**. Call `award()` from exactly three places — `useLessonProgress.completeStep`, `PracticeRunner` on first solve, and nowhere else. "Level" always means question difficulty; player progression is a **rank**.

**Pinned versions — do not upgrade.** The React sandbox and the React lessons use **React 18 UMD** (React 19 dropped UMD builds) and **`@babel/standalone@7`** (Babel 8 renders a blank preview). Bumping either breaks every React lesson and challenge.

## Overview

WebSprout is an interactive, browser-based learning tool that teaches HTML and CSS to complete beginners through visual, hands-on exercises. No backend — all progress is persisted client-side via IndexedDB.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Compiler enabled)
- **UI:** React 19, Tailwind CSS v4 (inline `@theme`), Motion (`motion/react`)
- **State:** Zustand stores (`src/stores/`)
- **Code Editor:** CodeMirror 6 (`@uiw/react-codemirror`)
- **3D:** Three.js + React Three Fiber + Drei (box-model module only)
- **Persistence:** IndexedDB via `idb` wrapper
- **Drag & Drop:** `@dnd-kit/core` + `@dnd-kit/sortable`

## Architecture

- App Router with `src/` directory structure
- Route group `(modules)` for learning module pages
- All interactive components are client components (`"use client"`)
- Lesson content defined as typed TypeScript objects in `src/content/`
- Custom hooks in `src/hooks/` for lesson progress, code validation, IndexedDB

## Component Organization

```text
src/components/
  ui/          — Primitives: Button, Card, Slider, ProgressIndicator, StepDots, Tooltip, DifficultyBadge, XpToast, RankChip
  layout/      — Header, InstructionPanel, LessonStepper, SplitPane
  editor/      — Step-body widgets: CodeEditor, GapFillEditor, HtmlPreview, SplitPane, QuizQuestion, CodeChallenge, TestResults
  practice/    — PracticeRunner (the standalone /practice drill surface)
  tag-builder/ — TagBuilderLesson, TagVisualizer
  box-model/   — BoxModelLesson, BoxModelCanvas, BoxModel2D, BoxLayer, ValueControls, TargetChallenge, BoxModelCodePanel
```

`editor/` is the *step-body widget* folder, not strictly text editors — it already held a form (`GapFillEditor`), an iframe (`HtmlPreview`) and an output panel (`JsConsole`), so quiz and challenge bodies live there too.

## Styling

- **Tailwind CSS v4** with design tokens defined via `@theme inline` in `src/app/globals.css`
- No CSS modules — utility-first approach only
- Animations via `motion/react` (Framer Motion)
- Custom keyframe animations in `globals.css` for domain-specific effects
- Fonts: Geist Sans + Geist Mono (loaded via `next/font/google` in root layout)
- HeroUI-inspired visual design: gradient accents (blue-to-violet), generous rounding, glassmorphism header, cool neutral palette

## Code Style

- TypeScript strict mode
- Types defined in `src/types/` (lesson.ts, tag-builder.ts, box-model.ts)
- Prefer named exports for types, default exports for components
- Keep component interfaces stable — avoid breaking prop changes

## Testing

- No test framework currently configured
- Validation logic lives in `src/lib/` (html-parser, tag-validator, lesson-engine, box-model-calc)

### Content verification — run this after touching any content

```bash
npm run verify:content   # offline, fast — run it every time
npm run verify:links     # needs the network; checks every docLink resolves
```

`verify:content` is what makes "the questions are correct" a checkable claim rather than an assertion. It:

- **runs every code challenge's `solution` against that challenge's own tests** in the real sandbox harness, so a wrong `expected` value or a typo in an `expression` fails here instead of in front of a student. **Every code challenge must therefore ship a `solution`** — the script fails if one is missing;
- runs the **starter code** too, and fails if it already passes (the challenge would be pre-solved);
- rejects a `function` in test `args` — it cannot cross `postMessage`'s structured clone, so those tests must use `expression`;
- enforces the level definitions above (minimum test counts per difficulty);
- checks quiz integrity: exactly one correct option for `single`/`true-false`, at least one wrong option for `multiple`, a non-trivial `explanation` on every option, unique ids;
- parses every JavaScript `codeSnippet` (as an async function body, so top-level `await` is fine; JSX is bracket-checked instead);
- checks unbalanced formatting tags and Markdown that slipped into content strings.

Assessed content — the practice bank plus every `quiz` and `code-challenge` step anywhere — is held to a **strict** bar and fails the script. Pre-existing prose in older lesson steps is reported as a **warning** so a legacy artefact cannot drown out a real defect in a new question.

> **Known pre-existing issue (~191 warnings):** older lessons write whitelisted tags such as `<p>` and `<a>` unescaped when they mean the tag *name*. `renderLessonHtml` passes them through as real markup, so the browser opens an unclosed element and the student sees a stray line break where the literal text `<p>` was intended. Escaping them as `&lt;p&gt;` is the fix. Note this only affects **whitelisted** tags — a raw `<h1>` is correctly escaped into `<code>` automatically, which is a deliberate authoring convenience.
