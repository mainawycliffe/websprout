"use client";

import Scene2DWrapper from "../shared/Scene2DWrapper";
import DeviceFramesScene from "./DeviceFramesScene";
import ViewportScene from "./ViewportScene";
import UnitsComparisonScene from "./UnitsComparisonScene";
import BreakpointScene from "./BreakpointScene";
import MobileFirstScene from "./MobileFirstScene";
import ResponsiveImageScene from "./ResponsiveImageScene";

interface ResponsiveVisualizerProps {
  lessonSlug: string;
  stepId: string;
  stepIndex: number;
}

type SceneEntry = {
  component: string;
  variant: string;
};

const sceneMap: Record<string, Record<string, SceneEntry>> = {
  "why-responsive": {
    "the-problem": { component: "device-frames", variant: "overflow" },
    "fixed-vs-fluid": { component: "device-frames", variant: "comparison" },
  },
  "viewport-meta": {
    "the-zoom-out-problem": { component: "viewport", variant: "zoomed-out" },
    "anatomy-of-viewport": { component: "viewport", variant: "correct" },
  },
  "relative-units": {
    "px-the-fixed-unit": { component: "units", variant: "px" },
    "percentage-unit": { component: "units", variant: "percent" },
    "em-and-rem": { component: "units", variant: "em-rem" },
    "vw-and-vh": { component: "units", variant: "vw-vh" },
  },
  "media-queries": {
    "what-are-media-queries": { component: "breakpoint", variant: "overview" },
    "media-query-syntax": { component: "breakpoint", variant: "syntax" },
  },
  "mobile-first": {
    "desktop-first-problems": {
      component: "mobile-first",
      variant: "desktop-first",
    },
    "min-width-vs-max-width": {
      component: "mobile-first",
      variant: "min-vs-max",
    },
  },
  "responsive-images": {
    "why-images-need-help": { component: "responsive-image", variant: "overflow" },
    "max-width-100": { component: "responsive-image", variant: "constrained" },
    "srcset-and-sizes": { component: "responsive-image", variant: "srcset" },
    "picture-element": { component: "responsive-image", variant: "picture" },
  },
  "responsive-typography": {
    "why-font-sizes-fail": { component: "units", variant: "fixed-text" },
    "how-clamp-works": { component: "units", variant: "clamp" },
  },
};

function getScene(
  lessonSlug: string,
  stepId: string
): SceneEntry | null {
  return sceneMap[lessonSlug]?.[stepId] ?? null;
}

function SceneContent({ entry }: { entry: SceneEntry }) {
  switch (entry.component) {
    case "device-frames":
      return (
        <DeviceFramesScene
          variant={entry.variant as "overflow" | "comparison"}
        />
      );
    case "viewport":
      return (
        <ViewportScene
          variant={entry.variant as "zoomed-out" | "correct"}
        />
      );
    case "units":
      return (
        <UnitsComparisonScene
          variant={
            entry.variant as
              | "px"
              | "percent"
              | "em-rem"
              | "vw-vh"
              | "fixed-text"
              | "clamp"
          }
        />
      );
    case "breakpoint":
      return (
        <BreakpointScene
          variant={entry.variant as "overview" | "syntax"}
        />
      );
    case "mobile-first":
      return (
        <MobileFirstScene
          variant={entry.variant as "desktop-first" | "min-vs-max"}
        />
      );
    case "responsive-image":
      return (
        <ResponsiveImageScene
          variant={
            entry.variant as "overflow" | "constrained" | "srcset" | "picture"
          }
        />
      );
    default:
      return null;
  }
}

export default function ResponsiveVisualizer({
  lessonSlug,
  stepId,
}: ResponsiveVisualizerProps) {
  const entry = getScene(lessonSlug, stepId);
  if (!entry) return null;

  return (
    <Scene2DWrapper>
      <SceneContent entry={entry} />
    </Scene2DWrapper>
  );
}
