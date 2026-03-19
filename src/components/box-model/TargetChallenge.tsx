"use client";

import type { BoxModelValues, SideValues } from "@/types/lesson";
import { useBoxModelStore } from "@/stores/box-model-store";
import { calculateBoxModel } from "@/lib/box-model-calc";

interface TargetChallengeProps {
  targetValues: BoxModelValues;
  tolerance: number;
}

function checkMatch(actual: number, expected: number, tolerance: number): boolean {
  return Math.abs(actual - expected) <= tolerance;
}

function SideStatus({
  label,
  actual,
  expected,
  tolerance,
}: {
  label: string;
  actual: SideValues;
  expected: SideValues;
  tolerance: number;
}) {
  const sides = ["top", "right", "bottom", "left"] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {sides.map((side) => {
        const match = checkMatch(actual[side], expected[side], tolerance);
        return (
          <div
            key={`${label}-${side}`}
            className={`text-xs px-2 py-1 rounded-full font-mono ${
              match
                ? "bg-success-light/30 text-success"
                : "bg-error-light/30 text-error"
            }`}
          >
            {label}-{side}: {actual[side]}/{expected[side]}px
          </div>
        );
      })}
    </div>
  );
}

export default function TargetChallenge({
  targetValues,
  tolerance,
}: TargetChallengeProps) {
  const store = useBoxModelStore();
  const currentDerived = calculateBoxModel(store);

  const targetState = {
    ...targetValues,
    viewMode: "2d" as const,
    exploded: false,
    contentText: "",
  };
  const targetDerived = calculateBoxModel(targetState);

  const allMatch =
    checkMatch(store.contentWidth, targetValues.contentWidth, tolerance) &&
    checkMatch(store.contentHeight, targetValues.contentHeight, tolerance) &&
    ["top", "right", "bottom", "left"].every(
      (s) =>
        checkMatch(
          store.padding[s as keyof SideValues],
          targetValues.padding[s as keyof SideValues],
          tolerance
        ) &&
        checkMatch(
          store.border[s as keyof SideValues],
          targetValues.border[s as keyof SideValues],
          tolerance
        ) &&
        checkMatch(
          store.margin[s as keyof SideValues],
          targetValues.margin[s as keyof SideValues],
          tolerance
        )
    );

  return (
    <div className="bg-card rounded-[var(--radius-lg)] shadow-card p-4">
      <h3 className="text-base font-bold text-text mb-3">
        {allMatch ? "You matched it!" : "Target to match"}
      </h3>

      {allMatch && (
        <div className="bg-success-light/20 border border-success-light/40 rounded-[var(--radius-md)] p-4 mb-4 text-center animate-success-pop">
          <span className="text-2xl block mb-1">&#127881;</span>
          <span className="text-success font-bold">Perfect match!</span>
        </div>
      )}

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-text-muted">Content size:</span>
          <span
            className={`font-mono ${
              checkMatch(store.contentWidth, targetValues.contentWidth, tolerance) &&
              checkMatch(store.contentHeight, targetValues.contentHeight, tolerance)
                ? "text-success"
                : "text-error"
            }`}
          >
            {store.contentWidth}x{store.contentHeight} / {targetValues.contentWidth}x
            {targetValues.contentHeight}
          </span>
        </div>

        <SideStatus label="padding" actual={store.padding} expected={targetValues.padding} tolerance={tolerance} />
        <SideStatus label="border" actual={store.border} expected={targetValues.border} tolerance={tolerance} />
        <SideStatus label="margin" actual={store.margin} expected={targetValues.margin} tolerance={tolerance} />

        <div className="border-t border-border pt-2 mt-1 flex items-center justify-between">
          <span className="text-text-muted">Total size:</span>
          <span className="font-mono text-text">
            {currentDerived.totalWidth}x{currentDerived.totalHeight} / {targetDerived.totalWidth}x
            {targetDerived.totalHeight}
          </span>
        </div>
      </div>
    </div>
  );
}
