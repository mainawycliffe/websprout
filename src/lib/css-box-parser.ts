import type { BoxModelValues, SideValues } from "@/types/lesson";

function parsePx(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "0") return 0;
  const match = trimmed.match(/^(-?\d+(?:\.\d+)?)px$/);
  return match ? parseFloat(match[1]) : null;
}

export function parseSideShorthand(value: string): SideValues | null {
  const parts = value.trim().split(/\s+/);
  const nums = parts.map(parsePx);

  if (nums.some((n) => n === null)) return null;
  const values = nums as number[];

  switch (values.length) {
    case 1:
      return { top: values[0], right: values[0], bottom: values[0], left: values[0] };
    case 2:
      return { top: values[0], right: values[1], bottom: values[0], left: values[1] };
    case 3:
      return { top: values[0], right: values[1], bottom: values[2], left: values[1] };
    case 4:
      return { top: values[0], right: values[1], bottom: values[2], left: values[3] };
    default:
      return null;
  }
}

function extractProperty(cssText: string, property: string): string | null {
  const regex = new RegExp(`${property}\\s*:\\s*([^;]+);`, "i");
  const match = cssText.match(regex);
  return match ? match[1].trim() : null;
}

export function parseBoxModelCSS(
  cssText: string,
): Partial<BoxModelValues> | null {
  const result: Partial<BoxModelValues> = {};
  let foundAny = false;

  // Width
  const width = extractProperty(cssText, "width");
  if (width) {
    const px = parsePx(width);
    if (px !== null && px >= 0) {
      result.contentWidth = px;
      foundAny = true;
    }
  }

  // Height
  const height = extractProperty(cssText, "height");
  if (height) {
    const px = parsePx(height);
    if (px !== null && px >= 0) {
      result.contentHeight = px;
      foundAny = true;
    }
  }

  // Padding — shorthand
  const padding = extractProperty(cssText, "(?<!-)padding(?!-)");
  if (padding) {
    const sides = parseSideShorthand(padding);
    if (sides) {
      result.padding = sides;
      foundAny = true;
    }
  }

  // Padding — longhand overrides
  const paddingSides: (keyof SideValues)[] = ["top", "right", "bottom", "left"];
  for (const side of paddingSides) {
    const val = extractProperty(cssText, `padding-${side}`);
    if (val) {
      const px = parsePx(val);
      if (px !== null && px >= 0) {
        if (!result.padding) {
          result.padding = { top: 0, right: 0, bottom: 0, left: 0 };
        }
        result.padding[side] = px;
        foundAny = true;
      }
    }
  }

  // Border — shorthand (e.g., "2px solid #FBBF24")
  const border = extractProperty(cssText, "(?<!-)border(?!-)(?!-width)(?!-style)(?!-color)");
  if (border) {
    const widthMatch = border.match(/(\d+(?:\.\d+)?)px/);
    if (widthMatch) {
      const bw = parseFloat(widthMatch[1]);
      result.border = { top: bw, right: bw, bottom: bw, left: bw };
      foundAny = true;
    }
  }

  // Border-width — shorthand
  const borderWidth = extractProperty(cssText, "border-width");
  if (borderWidth) {
    const sides = parseSideShorthand(borderWidth);
    if (sides) {
      result.border = sides;
      foundAny = true;
    }
  }

  // Margin — shorthand
  const margin = extractProperty(cssText, "(?<!-)margin(?!-)");
  if (margin) {
    const sides = parseSideShorthand(margin);
    if (sides) {
      result.margin = sides;
      foundAny = true;
    }
  }

  // Margin — longhand overrides
  const marginSides: (keyof SideValues)[] = ["top", "right", "bottom", "left"];
  for (const side of marginSides) {
    const val = extractProperty(cssText, `margin-${side}`);
    if (val) {
      const px = parsePx(val);
      if (px !== null && px >= 0) {
        if (!result.margin) {
          result.margin = { top: 0, right: 0, bottom: 0, left: 0 };
        }
        result.margin[side] = px;
        foundAny = true;
      }
    }
  }

  // Box-sizing
  const boxSizing = extractProperty(cssText, "box-sizing");
  if (boxSizing) {
    const trimmed = boxSizing.trim();
    if (trimmed === "border-box" || trimmed === "content-box") {
      result.boxSizing = trimmed;
      foundAny = true;
    }
  }

  return foundAny ? result : null;
}
