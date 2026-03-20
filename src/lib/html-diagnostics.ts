import type { Diagnostic } from "@codemirror/lint";
import { parseHtml } from "@/lib/html-parser";
import { validateTags } from "@/lib/tag-validator";

export function getHtmlDiagnostics(code: string): Diagnostic[] {
  if (!code.trim()) return [];

  const tree = parseHtml(code);
  const errors = validateTags(tree);

  return errors.map((err) => ({
    from: err.position.start,
    to: Math.min(err.position.end, code.length),
    message: err.message,
    severity: err.severity === "warning" ? ("warning" as const) : ("error" as const),
  }));
}
