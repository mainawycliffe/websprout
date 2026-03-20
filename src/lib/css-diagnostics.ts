import type { Diagnostic } from "@codemirror/lint";

export function getCssDiagnostics(code: string): Diagnostic[] {
  if (!code.trim()) return [];

  const diagnostics: Diagnostic[] = [];
  const lines = code.split("\n");
  let braceDepth = 0;
  let offset = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track brace depth
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "{") braceDepth++;
      if (line[j] === "}") braceDepth--;

      if (braceDepth < 0) {
        diagnostics.push({
          from: offset + j,
          to: offset + j + 1,
          message: "Unexpected } — there's no matching opening {",
          severity: "error",
        });
        braceDepth = 0;
      }
    }

    // Skip empty lines, comments, selectors, braces-only lines
    if (
      !trimmed ||
      trimmed.startsWith("/*") ||
      trimmed.startsWith("*") ||
      trimmed === "{" ||
      trimmed === "}" ||
      trimmed.endsWith("{") ||
      trimmed.startsWith("@")
    ) {
      offset += line.length + 1;
      continue;
    }

    // Inside a rule block — check for declaration issues
    if (braceDepth > 0 || trimmed.includes(":")) {
      // Check for missing colon (e.g., "color red")
      if (!trimmed.includes(":") && !trimmed.includes("{") && !trimmed.includes("}")) {
        const lineStart = offset + line.indexOf(trimmed);
        diagnostics.push({
          from: lineStart,
          to: lineStart + trimmed.length,
          message:
            "Missing colon — CSS declarations need a colon between the property and value, like: color: red",
          severity: "error",
        });
        offset += line.length + 1;
        continue;
      }

      // Check for missing semicolon on declarations (not the last line before })
      if (
        trimmed.includes(":") &&
        !trimmed.endsWith(";") &&
        !trimmed.endsWith("{") &&
        !trimmed.endsWith("}")
      ) {
        // Peek ahead — if next non-empty line is not "}", it's likely missing a semicolon
        let nextTrimmed = "";
        for (let k = i + 1; k < lines.length; k++) {
          const nt = lines[k].trim();
          if (nt) {
            nextTrimmed = nt;
            break;
          }
        }
        if (nextTrimmed && nextTrimmed !== "}") {
          const lineEnd = offset + line.trimEnd().length;
          diagnostics.push({
            from: lineEnd - 1,
            to: lineEnd,
            message:
              "Missing semicolon — add ; at the end of this line",
            severity: "warning",
          });
        }
      }
    }

    offset += line.length + 1;
  }

  // Check for unclosed braces at end of file
  if (braceDepth > 0) {
    diagnostics.push({
      from: Math.max(0, code.length - 1),
      to: code.length,
      message: `Unclosed { — add ${braceDepth} closing } to end your rule${braceDepth > 1 ? "s" : ""}`,
      severity: "error",
    });
  }

  return diagnostics;
}
