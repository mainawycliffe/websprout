"use client";

import Slider from "@/components/ui/Slider";
import { useBoxModelStore } from "@/stores/box-model-store";
import type { SideValues } from "@/types/lesson";

interface ValueControlsProps {
  lockedProperties?: string[];
  highlightProperty?: string;
}

function SideSliders({
  label,
  values,
  color,
  disabled,
  onChange,
}: {
  label: string;
  values: SideValues;
  color: string;
  disabled: boolean;
  onChange: (side: keyof SideValues, value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-bold" style={{ color }}>
        {label}
      </h4>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <Slider label="Top" value={values.top} max={60} color={color} disabled={disabled} onChange={(v) => onChange("top", v)} />
        <Slider label="Right" value={values.right} max={60} color={color} disabled={disabled} onChange={(v) => onChange("right", v)} />
        <Slider label="Bottom" value={values.bottom} max={60} color={color} disabled={disabled} onChange={(v) => onChange("bottom", v)} />
        <Slider label="Left" value={values.left} max={60} color={color} disabled={disabled} onChange={(v) => onChange("left", v)} />
      </div>
    </div>
  );
}

export default function ValueControls({
  lockedProperties = [],
  highlightProperty,
}: ValueControlsProps) {
  const store = useBoxModelStore();
  const isLocked = (prop: string) => lockedProperties.includes(prop);

  return (
    <div className="flex flex-col gap-5 p-4 bg-card rounded-[var(--radius-lg)] shadow-card">
      <h3 className="text-base font-bold text-text">Adjust Values</h3>

      {/* Content size */}
      <div className={`flex flex-col gap-2 p-3 rounded-[var(--radius-md)] transition-colors ${highlightProperty === "content" ? "bg-box-content/10 ring-2 ring-box-content/30" : ""}`}>
        <h4 className="text-sm font-bold text-box-content">Content</h4>
        <Slider
          label="Width"
          value={store.contentWidth}
          min={50}
          max={400}
          color="var(--color-box-content)"
          disabled={isLocked("content")}
          onChange={store.setContentWidth}
        />
        <Slider
          label="Height"
          value={store.contentHeight}
          min={30}
          max={300}
          color="var(--color-box-content)"
          disabled={isLocked("content")}
          onChange={store.setContentHeight}
        />
      </div>

      {/* Padding */}
      <div className={`p-3 rounded-[var(--radius-md)] transition-colors ${highlightProperty === "padding" ? "bg-box-padding/10 ring-2 ring-box-padding/30" : ""}`}>
        <SideSliders
          label="Padding"
          values={store.padding}
          color="var(--color-box-padding)"
          disabled={isLocked("padding")}
          onChange={store.setPadding}
        />
      </div>

      {/* Border */}
      <div className={`p-3 rounded-[var(--radius-md)] transition-colors ${highlightProperty === "border" ? "bg-box-border/10 ring-2 ring-box-border/30" : ""}`}>
        <SideSliders
          label="Border"
          values={store.border}
          color="var(--color-box-border)"
          disabled={isLocked("border")}
          onChange={store.setBorder}
        />
      </div>

      {/* Margin */}
      <div className={`p-3 rounded-[var(--radius-md)] transition-colors ${highlightProperty === "margin" ? "bg-box-margin/10 ring-2 ring-box-margin/30" : ""}`}>
        <SideSliders
          label="Margin"
          values={store.margin}
          color="var(--color-box-margin)"
          disabled={isLocked("margin")}
          onChange={store.setMargin}
        />
      </div>

      {/* Box sizing toggle */}
      {!isLocked("boxSizing") && (
        <div className="flex items-center justify-between p-3 bg-bg-warm rounded-[var(--radius-md)]">
          <span className="text-sm font-medium text-text">box-sizing</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => store.setBoxSizing("content-box")}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                store.boxSizing === "content-box"
                  ? "bg-primary text-white"
                  : "bg-border text-text-muted"
              }`}
            >
              content-box
            </button>
            <button
              onClick={() => store.setBoxSizing("border-box")}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                store.boxSizing === "border-box"
                  ? "bg-primary text-white"
                  : "bg-border text-text-muted"
              }`}
            >
              border-box
            </button>
          </div>
        </div>
      )}

      {/* Exploded view toggle */}
      <div className="flex items-center justify-between p-3 bg-bg-warm rounded-[var(--radius-md)]">
        <span className="text-sm font-medium text-text">Exploded view</span>
        <button
          onClick={store.toggleExploded}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            store.exploded
              ? "bg-secondary text-white"
              : "bg-border text-text-muted"
          }`}
        >
          {store.exploded ? "ON" : "OFF"}
        </button>
      </div>

      {/* View mode toggle */}
      <div className="flex items-center justify-between p-3 bg-bg-warm rounded-[var(--radius-md)]">
        <span className="text-sm font-medium text-text">View</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => store.setViewMode("3d")}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              store.viewMode === "3d"
                ? "bg-secondary text-white"
                : "bg-border text-text-muted"
            }`}
          >
            3D
          </button>
          <button
            onClick={() => store.setViewMode("2d")}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              store.viewMode === "2d"
                ? "bg-secondary text-white"
                : "bg-border text-text-muted"
            }`}
          >
            2D
          </button>
        </div>
      </div>
    </div>
  );
}
