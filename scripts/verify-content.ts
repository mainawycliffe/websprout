/**
 * Content verifier.
 *
 * Run with:  npm run verify:content
 *
 * The point of this script is that "the questions are correct" is a claim that
 * can be *checked*, not just asserted. In particular every code challenge ships
 * a reference `solution`, and this runs that solution against the challenge's
 * own tests in the real sandbox harness. A wrong `expected` value, a typo in an
 * `expression`, or a function smuggled into `args` all fail here rather than in
 * front of a student.
 */
import vm from "node:vm";
import { createSandboxSrcdoc } from "@/lib/js-sandbox";
import { renderLessonHtml, renderLessonInlineHtml } from "@/lib/lesson-html";
import { modules } from "@/content/modules";
import { practiceQuestions } from "@/content/practice";
import { PRACTICE_CATEGORIES, getPracticeLevel } from "@/types/practice";
import type {
  CodeChallengeConfig,
  DifficultyLevel,
  QuizConfig,
  Step,
} from "@/types/lesson";

/* ------------------------------------------------------------------ */
/* reporting                                                          */
/* ------------------------------------------------------------------ */

const problems: string[] = [];
const warnings: string[] = [];
let checksRun = 0;

/**
 * Assessed content (the practice bank, and every quiz / code-challenge step
 * anywhere) must be spotless — those are the questions being graded, so a
 * formatting slip is a wrong answer waiting to happen.
 *
 * Pre-existing prose in older lesson steps is reported as a warning instead, so
 * a legacy Markdown artefact cannot drown out a real defect in a new question.
 */
let strict = true;

function fail(where: string, message: string) {
  (strict ? problems : warnings).push(`${where}: ${message}`);
}

function expect(where: string, condition: boolean, message: string) {
  checksRun++;
  if (!condition) fail(where, message);
}

/* ------------------------------------------------------------------ */
/* sandbox harness, loaded once                                       */
/* ------------------------------------------------------------------ */

function loadHarness() {
  const html = createSandboxSrcdoc();
  const blocks = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)];
  const source = blocks[blocks.length - 1][1];

  const ctx: Record<string, unknown> = {
    window: { addEventListener() {} },
    parent: { postMessage() {} },
    document: { readyState: "loading" },
    console: { log() {}, warn() {}, error() {}, info() {} },
    setTimeout,
    clearTimeout,
    Promise,
  };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  new vm.Script(source).runInContext(ctx);
  return ctx as Record<string, (...args: unknown[]) => Promise<RunResult>>;
}

interface RunResult {
  results: Array<{ name: string; passed: boolean; expected: string; actual: string; error: string | null }>;
  compileError: string | null;
}

const harness = loadHarness();

async function runChallenge(config: CodeChallengeConfig, code: string): Promise<RunResult> {
  return harness.__runTests(code, config.functionName, config.tests, 2000);
}

/* ------------------------------------------------------------------ */
/* content formatting                                                 */
/* ------------------------------------------------------------------ */

/**
 * Only high-confidence Markdown tells. Deliberately NOT checked:
 *   - backtick code spans, because lessons that teach template literals must
 *     legitimately contain backticks;
 *   - _italics_, because snake_case identifiers and CSS custom properties trip it.
 * Both produced false positives that would train people to ignore this script.
 */
const MARKDOWN_PATTERNS: Array<[RegExp, string]> = [
  [/\*\*[^*\n]+\*\*/, "Markdown bold (**text**) — use <strong>"],
  [/^\s*#{1,6}\s+\S/m, "Markdown heading — use <strong> or a new step"],
  [/^\s*[-*]\s+\S.*\n\s*[-*]\s+\S/m, "Markdown list — use <ul><li>"],
];

function checkNoMarkdown(where: string, text: string) {
  for (const [pattern, message] of MARKDOWN_PATTERNS) {
    checksRun++;
    if (pattern.test(text)) fail(where, `${message} — in: ${text.slice(0, 80)}`);
  }
}

/**
 * Formatting tags must be balanced.
 *
 * Note we do NOT flag tags outside the whitelist: `renderLessonHtml` turns a raw
 * `<h1>` into `<code>&lt;h1&gt;</code>` on purpose, so an HTML lesson can write
 * tag names inline and have them render as code. That escape is a feature.
 * An *unclosed* `<strong>`, on the other hand, silently bleeds formatting
 * through the rest of the paragraph.
 */
const BALANCED_TAGS = ["strong", "em", "code", "ul", "ol", "li", "p", "a", "kbd", "mark"];

function checkBalancedTags(where: string, text: string) {
  for (const tag of BALANCED_TAGS) {
    checksRun++;
    const open = (text.match(new RegExp(`<${tag}(\\s[^>]*)?>`, "g")) ?? []).length;
    const close = (text.match(new RegExp(`</${tag}>`, "g")) ?? []).length;
    if (open !== close) {
      fail(where, `unbalanced <${tag}> — ${open} opening vs ${close} closing`);
    }
  }
}

function checkRenders(where: string, text: string, inline: boolean) {
  checksRun++;
  try {
    const rendered = inline ? renderLessonInlineHtml(text) : renderLessonHtml(text);
    if (rendered.trim().length === 0 && text.trim().length > 0) {
      fail(where, "renders to empty HTML");
    }
  } catch (err) {
    fail(where, `renderLessonHtml threw: ${(err as Error).message}`);
  }
}

function checkProse(where: string, text: string, inline: boolean) {
  checkNoMarkdown(where, text);
  checkBalancedTags(where, text);
  checkRenders(where, text, inline);
}

/* ------------------------------------------------------------------ */
/* per-step checks                                                    */
/* ------------------------------------------------------------------ */

const VALIDATION_FOR_TYPE: Partial<Record<Step["type"], string>> = {
  quiz: "quiz-answer",
  "code-challenge": "tests-pass",
};

/** Minimum test counts, enforcing the level definitions in AGENTS.md. */
const MIN_TESTS: Record<DifficultyLevel, number> = {
  easy: 2,
  intermediate: 4,
  advanced: 4,
};

function isCloneable(value: unknown): boolean {
  try {
    structuredClone(value);
    return true;
  } catch {
    return false;
  }
}

function containsFunction(value: unknown, depth = 0): boolean {
  if (depth > 10) return false;
  if (typeof value === "function") return true;
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((v) => containsFunction(v, depth + 1));
  }
  return false;
}

function checkQuiz(where: string, step: Step) {
  const config = step.config as QuizConfig;
  const correct = config.options.filter((o) => o.correct);

  expect(where, config.options.length >= 2, "a quiz needs at least 2 options");

  const ids = new Set(config.options.map((o) => o.id));
  expect(where, ids.size === config.options.length, "duplicate option ids");

  if (config.mode === "single" || config.mode === "true-false") {
    expect(
      where,
      correct.length === 1,
      `mode "${config.mode}" must have exactly 1 correct option, found ${correct.length}`
    );
  }
  if (config.mode === "true-false") {
    expect(where, config.options.length === 2, "true-false must have exactly 2 options");
  }
  if (config.mode === "multiple") {
    expect(where, correct.length >= 1, "multiple-choice needs at least 1 correct option");
    expect(
      where,
      correct.length < config.options.length,
      "multiple-choice where every option is correct is trivial"
    );
  }

  for (const option of config.options) {
    const oWhere = `${where} > option "${option.id}"`;
    expect(oWhere, option.text.trim().length > 0, "empty option text");
    expect(
      oWhere,
      option.explanation.trim().length > 0,
      "missing explanation — the explanation is the teaching payload"
    );
    expect(
      oWhere,
      option.explanation.trim().length >= 40,
      "explanation is too short to teach anything"
    );
    checkProse(oWhere, option.text, true);
    checkProse(oWhere, option.explanation, true);
  }

  // A JS snippet the student is asked to reason about must at least parse.
  //
  // Snippets are fragments, not programs, so they are parsed inside an async
  // function body — that legitimises top-level `await` and `return`. JSX cannot
  // be parsed by the JS engine at all, so those snippets are checked for
  // balanced brackets instead of being rejected outright.
  if (config.codeSnippet && config.codeLanguage === "javascript") {
    checksRun++;
    const snippet = config.codeSnippet;
    // Arrow functions contribute a ">" that is not markup, so remove them first.
    const withoutArrows = snippet.replace(/=>/g, "");
    const looksLikeJsx = /<\/?[A-Za-z][A-Za-z0-9]*(\s[^<>]*?)?\/?>/.test(withoutArrows);

    if (looksLikeJsx) {
      const open = (withoutArrows.match(/</g) ?? []).length;
      const close = (withoutArrows.match(/>/g) ?? []).length;
      if (open !== close) {
        fail(where, `JSX codeSnippet has unbalanced angle brackets (${open} < vs ${close} >)`);
      }
    } else {
      try {
        new vm.Script(`(async () => {\n${snippet}\n})`);
      } catch (err) {
        fail(where, `codeSnippet is not valid JavaScript: ${(err as Error).message}`);
      }
    }
  }
}

async function checkCodeChallenge(where: string, step: Step) {
  const config = step.config as CodeChallengeConfig;
  const level = step.difficulty ?? "easy";

  expect(where, config.functionName.trim().length > 0, "missing functionName");
  expect(where, config.starterCode.trim().length > 0, "missing starterCode");
  expect(
    where,
    config.tests.length >= MIN_TESTS[level],
    `level "${level}" needs at least ${MIN_TESTS[level]} tests, found ${config.tests.length}`
  );

  const names = new Set(config.tests.map((t) => t.name));
  expect(where, names.size === config.tests.length, "duplicate test names");

  for (const test of config.tests) {
    const tWhere = `${where} > test "${test.name}"`;
    expect(tWhere, test.name.trim().length > 0, "empty test name");

    if (test.args !== undefined) {
      expect(
        tWhere,
        !containsFunction(test.args),
        "args contains a function — it cannot cross postMessage. Use `expression` instead."
      );
      expect(tWhere, isCloneable(test.args), "args is not structured-cloneable");
    }
    expect(tWhere, isCloneable(test.expected), "expected is not structured-cloneable");
    expect(
      tWhere,
      test.args !== undefined || test.expression !== undefined || test.render !== undefined,
      "test has no args, expression or render — nothing to run"
    );
  }

  if (config.language === "react") {
    expect(where, Boolean(config.componentName), "react challenge needs componentName");
    for (const test of config.tests) {
      expect(
        `${where} > test "${test.name}"`,
        Boolean(test.render?.assert),
        "react test needs render.assert"
      );
    }
    // Behaviour of React challenges needs a real browser; structure is all we
    // can prove here, and that is reported honestly in the summary.
    reactChallenges.push(where);
    return;
  }

  expect(
    where,
    Boolean(config.solution),
    "missing `solution` — without one the challenge cannot be machine-verified"
  );
  if (!config.solution) return;

  // The reference solution must pass every test.
  const solved = await runChallenge(config, config.solution);
  checksRun++;
  if (solved.compileError) {
    fail(where, `solution does not compile: ${solved.compileError}`);
  } else {
    const failed = solved.results.filter((r) => !r.passed);
    if (failed.length > 0) {
      const f = failed[0];
      fail(
        where,
        `solution fails ${failed.length}/${solved.results.length} of its own tests — ` +
          `"${f.name}" expected ${f.expected}, got ${f.actual}${f.error ? ` (threw: ${f.error})` : ""}`
      );
    }
  }

  // The starter code must NOT already pass — otherwise there is nothing to solve.
  const starter = await runChallenge(config, config.starterCode);
  checksRun++;
  if (!starter.compileError && starter.results.length > 0 && starter.results.every((r) => r.passed)) {
    fail(where, "starterCode already passes every test — the challenge is pre-solved");
  }
  verifiedChallenges++;
}

const reactChallenges: string[] = [];
let verifiedChallenges = 0;

async function checkStep(where: string, step: Step) {
  expect(where, step.id.trim().length > 0, "missing step id");

  // The two discriminants must agree; a mismatch renders nothing, silently.
  const configTypesThatMirror = [
    "explanation", "gap-fill", "free-edit", "js-console", "slider-explore", "challenge", "quiz", "code-challenge",
  ];
  if (configTypesThatMirror.includes(step.type)) {
    expect(
      where,
      step.config.type === step.type,
      `step.type "${step.type}" does not match config.type "${step.config.type}"`
    );
  }

  const requiredValidation = VALIDATION_FOR_TYPE[step.type];
  if (requiredValidation) {
    expect(
      where,
      step.validation.type === requiredValidation,
      `step type "${step.type}" needs validation.type "${requiredValidation}", found "${step.validation.type}"`
    );
  }

  if (step.difficulty) {
    expect(
      where,
      ["easy", "intermediate", "advanced"].includes(step.difficulty),
      `invalid difficulty "${step.difficulty}"`
    );
  }

  checkProse(`${where} > body`, step.instruction.body, false);
  if (step.instruction.analogy) checkProse(`${where} > analogy`, step.instruction.analogy, true);
  for (const box of step.instruction.infoBoxes ?? []) {
    checkProse(`${where} > infoBox`, box.body, false);
  }
  for (const hint of step.hints) {
    checkProse(`${where} > hint`, hint, true);
  }
  for (const link of step.instruction.docLinks ?? []) {
    expect(
      `${where} > docLink "${link.label}"`,
      /^https?:\/\//.test(link.url),
      `doc link is not an absolute URL: ${link.url}`
    );
  }

  if (step.type === "quiz") checkQuiz(where, step);
  if (step.type === "code-challenge") await checkCodeChallenge(where, step);
}

/* ------------------------------------------------------------------ */
/* run                                                                */
/* ------------------------------------------------------------------ */

const moduleIds = new Set(modules.map((m) => m.slug));

// --- lesson content ---
let lessonStepCount = 0;
for (const mod of modules) {
  const lessonSlugs = new Set<string>();
  for (const lesson of mod.lessons) {
    expect(`${mod.slug}`, !lessonSlugs.has(lesson.slug), `duplicate lesson slug "${lesson.slug}"`);
    lessonSlugs.add(lesson.slug);

    const stepIds = new Set<string>();
    for (const step of lesson.steps) {
      const where = `${mod.slug}/${lesson.slug} > ${step.id}`;
      // Assessed steps are held to the strict bar; legacy prose is warn-only.
      strict = step.type === "quiz" || step.type === "code-challenge";
      expect(where, !stepIds.has(step.id), `duplicate step id "${step.id}"`);
      stepIds.add(step.id);
      lessonStepCount++;
      await checkStep(where, step);
    }
  }
}

// --- practice bank ---
const seenIds = new Set<string>();
const seenSlugs = new Set<string>();
for (const question of practiceQuestions) {
  const where = `practice/${question.slug}`;
  strict = true;

  expect(where, !seenIds.has(question.id), `duplicate question id "${question.id}"`);
  expect(where, !seenSlugs.has(question.slug), `duplicate slug "${question.slug}"`);
  seenIds.add(question.id);
  seenSlugs.add(question.slug);

  expect(where, /^[a-z0-9]+(-[a-z0-9]+)*$/.test(question.slug), "slug must be lowercase kebab-case");
  expect(where, question.title.trim().length > 0, "missing title");
  expect(where, question.topics.length > 0, "needs at least one topic");
  expect(
    where,
    PRACTICE_CATEGORIES.includes(question.category),
    `category "${question.category}" is not one of the known categories`
  );
  expect(
    where,
    Boolean(question.step.difficulty),
    "practice questions must declare a difficulty level"
  );
  expect(
    where,
    ["quiz", "code-challenge", "gap-fill"].includes(question.step.type),
    `practice supports quiz, code-challenge and gap-fill; found "${question.step.type}"`
  );
  if (question.relatedModule) {
    expect(
      where,
      moduleIds.has(question.relatedModule),
      `relatedModule "${question.relatedModule}" is not a real module slug`
    );
  }

  await checkStep(where, question.step);
}

/* ------------------------------------------------------------------ */
/* summary                                                            */
/* ------------------------------------------------------------------ */

const byLevel: Record<string, number> = { easy: 0, intermediate: 0, advanced: 0 };
const byKind: Record<string, number> = {};
for (const q of practiceQuestions) {
  byLevel[getPracticeLevel(q)]++;
  byKind[q.step.type] = (byKind[q.step.type] ?? 0) + 1;
}

console.log(`\nPractice bank: ${practiceQuestions.length} questions`);
console.log(
  `  by level: easy ${byLevel.easy}, intermediate ${byLevel.intermediate}, advanced ${byLevel.advanced}`
);
console.log(`  by type:  ${Object.entries(byKind).map(([k, v]) => `${k} ${v}`).join(", ")}`);
console.log(`Lesson steps scanned: ${lessonStepCount}`);
console.log(`Code challenges executed against their own solution: ${verifiedChallenges}`);
if (reactChallenges.length > 0) {
  console.log(
    `React challenges (structure verified; behaviour needs a browser): ${reactChallenges.length}`
  );
}
console.log(`Assertions run: ${checksRun}`);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s) in pre-existing lesson prose (not blocking):`);
  for (const warning of warnings.slice(0, 15)) console.log(`  · ${warning}`);
  if (warnings.length > 15) console.log(`  … and ${warnings.length - 15} more`);
}

if (problems.length > 0) {
  console.error(`\n${problems.length} PROBLEM(S):\n`);
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  process.exitCode = 1;
} else {
  console.log("\n✓ all content checks passed");
}
