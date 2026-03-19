import type { BoxModelState } from "@/types/box-model";
import type { BoxModelDerived } from "@/types/box-model";

export function calculateBoxModel(state: BoxModelState): BoxModelDerived {
  const horizontalPadding = state.padding.left + state.padding.right;
  const verticalPadding = state.padding.top + state.padding.bottom;
  const horizontalBorder = state.border.left + state.border.right;
  const verticalBorder = state.border.top + state.border.bottom;
  const horizontalMargin = state.margin.left + state.margin.right;
  const verticalMargin = state.margin.top + state.margin.bottom;

  let borderBoxWidth: number;
  let borderBoxHeight: number;

  if (state.boxSizing === "content-box") {
    borderBoxWidth = state.contentWidth + horizontalPadding + horizontalBorder;
    borderBoxHeight = state.contentHeight + verticalPadding + verticalBorder;
  } else {
    // border-box: contentWidth IS the border-box width
    borderBoxWidth = state.contentWidth;
    borderBoxHeight = state.contentHeight;
  }

  const totalWidth = borderBoxWidth + horizontalMargin;
  const totalHeight = borderBoxHeight + verticalMargin;

  return { totalWidth, totalHeight, borderBoxWidth, borderBoxHeight };
}

export function getActualContentSize(state: BoxModelState): {
  width: number;
  height: number;
} {
  if (state.boxSizing === "content-box") {
    return { width: state.contentWidth, height: state.contentHeight };
  }

  // border-box: actual content = declared size - padding - border
  const horizontalPadding = state.padding.left + state.padding.right;
  const verticalPadding = state.padding.top + state.padding.bottom;
  const horizontalBorder = state.border.left + state.border.right;
  const verticalBorder = state.border.top + state.border.bottom;

  return {
    width: Math.max(0, state.contentWidth - horizontalPadding - horizontalBorder),
    height: Math.max(0, state.contentHeight - verticalPadding - verticalBorder),
  };
}
