/**
 * Doc-link checker.
 *
 * Run with:  npm run verify:links
 *
 * Every docLink in the course points at MDN or a framework's docs. Those pages
 * get reorganised, and a lesson that sends a beginner to a 404 is worse than
 * one with no link at all. This fetches each distinct URL once and reports
 * anything that does not resolve.
 *
 * Kept separate from `verify:content` on purpose: this one needs the network,
 * so it should never be what stops a build.
 */
import { modules } from "@/content/modules";
import { practiceQuestions } from "@/content/practice";

interface LinkUse {
  url: string;
  label: string;
  where: string[];
}

const links = new Map<string, LinkUse>();

function collect(where: string, docLinks: { label: string; url: string }[] | undefined) {
  for (const link of docLinks ?? []) {
    const existing = links.get(link.url);
    if (existing) {
      existing.where.push(where);
    } else {
      links.set(link.url, { url: link.url, label: link.label, where: [where] });
    }
  }
}

for (const mod of modules) {
  for (const lesson of mod.lessons) {
    for (const step of lesson.steps) {
      collect(`${mod.slug}/${lesson.slug} > ${step.id}`, step.instruction.docLinks);
    }
  }
}
for (const question of practiceQuestions) {
  collect(`practice/${question.slug}`, question.step.instruction.docLinks);
}

const all = [...links.values()];
console.log(`Checking ${all.length} distinct doc links…\n`);

const CONCURRENCY = 8;
const TIMEOUT_MS = 15000;

interface Failure {
  link: LinkUse;
  reason: string;
}

const failures: Failure[] = [];
let checked = 0;

async function check(link: LinkUse) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const fragment = link.url.includes("#") ? link.url.split("#")[1] : null;

  try {
    // A link with a #fragment needs the body, since a missing anchor still
    // returns 200 — that is exactly how a wrong anchor shipped once already.
    if (fragment) {
      const response = await fetch(link.url, { redirect: "follow", signal: controller.signal });
      if (!response.ok) {
        failures.push({ link, reason: `HTTP ${response.status}` });
        return;
      }
      const html = await response.text();
      const hasAnchor =
        html.includes(`id="${fragment}"`) ||
        html.includes(`id='${fragment}'`) ||
        html.includes(`name="${fragment}"`);
      if (!hasAnchor) {
        failures.push({ link, reason: `anchor #${fragment} not found on the page` });
      }
      return;
    }

    // Some doc hosts reject HEAD, so fall back to a ranged GET.
    let response = await fetch(link.url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(link.url, {
        method: "GET",
        redirect: "follow",
        headers: { Range: "bytes=0-1024" },
        signal: controller.signal,
      });
    }
    if (!response.ok && response.status !== 206) {
      failures.push({ link, reason: `HTTP ${response.status}` });
    }
  } catch (err) {
    const message = (err as Error).name === "AbortError" ? "timed out" : (err as Error).message;
    failures.push({ link, reason: message });
  } finally {
    clearTimeout(timer);
    checked++;
    if (checked % 20 === 0) console.log(`  … ${checked}/${all.length}`);
  }
}

const queue = [...all];
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) {
      const next = queue.shift();
      if (next) await check(next);
    }
  })
);

console.log(`\nChecked ${all.length} links.`);

if (failures.length > 0) {
  console.error(`\n${failures.length} BROKEN LINK(S):\n`);
  for (const { link, reason } of failures) {
    console.error(`  ✗ ${reason} — ${link.url}`);
    console.error(`      "${link.label}"`);
    console.error(`      used in: ${link.where.slice(0, 3).join(", ")}${link.where.length > 3 ? ` (+${link.where.length - 3} more)` : ""}`);
  }
  process.exitCode = 1;
} else {
  console.log("✓ every doc link resolves");
}
