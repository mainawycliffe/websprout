export type DisplayValue =
  | "block"
  | "inline"
  | "inline-block"
  | "flex"
  | "grid"
  | "none";

export interface VisualizerItem {
  id: string;
  label: string;
  display?: DisplayValue;
  visibility?: "visible" | "hidden";
  width?: string;
  height?: string;
  color: string;
}
