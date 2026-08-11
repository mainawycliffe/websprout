/**
 * Minimal Node loader that resolves the project's `@/` path alias so content
 * files can be imported directly by the verification script.
 *
 * Node honours neither tsconfig `paths` nor extensionless TS imports, so both
 * are handled here.
 */
import { statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const SRC = path.resolve(fileURLToPath(import.meta.url), "../../src");

const CANDIDATE_SUFFIXES = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

function isFile(candidate) {
  // existsSync would also match a directory, which then fails with EISDIR.
  try {
    return statSync(candidate).isFile();
  } catch {
    return false;
  }
}

function resolveFile(basePath) {
  for (const suffix of CANDIDATE_SUFFIXES) {
    const candidate = basePath + suffix;
    if (isFile(candidate)) return candidate;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const resolved = resolveFile(path.join(SRC, specifier.slice(2)));
    if (resolved) {
      return { url: pathToFileURL(resolved).href, shortCircuit: true };
    }
  }

  // Relative imports inside content files are extensionless too ("./arrays").
  if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) {
    const parentDir = path.dirname(fileURLToPath(context.parentURL));
    const resolved = resolveFile(path.resolve(parentDir, specifier));
    if (resolved) {
      return { url: pathToFileURL(resolved).href, shortCircuit: true };
    }
  }

  return nextResolve(specifier, context);
}
