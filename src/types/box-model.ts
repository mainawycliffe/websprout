import type { SideValues } from "./lesson";

export interface BoxModelState {
  contentWidth: number;
  contentHeight: number;
  padding: SideValues;
  border: SideValues;
  margin: SideValues;
  boxSizing: "content-box" | "border-box";
  viewMode: "2d" | "3d";
  exploded: boolean;
  contentText: string;
}

export interface BoxModelDerived {
  totalWidth: number;
  totalHeight: number;
  borderBoxWidth: number;
  borderBoxHeight: number;
}

export type BoxLayerType = "content" | "padding" | "border" | "margin";

export const BOX_LAYER_COLORS: Record<BoxLayerType, string> = {
  content: "#60A5FA",
  padding: "#4ADE80",
  border: "#FBBF24",
  margin: "#FB923C",
};
