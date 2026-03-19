import type { BoxModelValues, SideValues } from "@/types/lesson";

function formatSides(sides: SideValues): string {
  const { top, right, bottom, left } = sides;
  if (top === right && right === bottom && bottom === left) {
    return `${top}px`;
  }
  if (top === bottom && left === right) {
    return `${top}px ${right}px`;
  }
  return `${top}px ${right}px ${bottom}px ${left}px`;
}

function hasSideValues(sides: SideValues): boolean {
  return sides.top > 0 || sides.right > 0 || sides.bottom > 0 || sides.left > 0;
}

export function generateBoxModelCSS(values: BoxModelValues): string {
  const lines: string[] = [".box {"];

  lines.push(`  width: ${values.contentWidth}px;`);
  lines.push(`  height: ${values.contentHeight}px;`);

  if (hasSideValues(values.padding)) {
    lines.push(`  padding: ${formatSides(values.padding)};`);
  }

  if (hasSideValues(values.border)) {
    lines.push(`  border: ${formatSides(values.border)} solid #FBBF24;`);
  }

  if (hasSideValues(values.margin)) {
    lines.push(`  margin: ${formatSides(values.margin)};`);
  }

  if (values.boxSizing === "border-box") {
    lines.push(`  box-sizing: border-box;`);
  }

  lines.push("}");
  return lines.join("\n");
}

export function generateBoxModelHTML(contentText: string): string {
  return `<div class="box">\n  ${contentText}\n</div>`;
}
