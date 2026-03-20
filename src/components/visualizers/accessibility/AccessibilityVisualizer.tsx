"use client";

import Scene2DWrapper from "../shared/Scene2DWrapper";
import DisabilitySpectrumScene from "./DisabilitySpectrumScene";
import DomTreeScene from "./DomTreeScene";
import AriaLabelsScene from "./AriaLabelsScene";
import FocusOrderScene from "./FocusOrderScene";
import ContrastScene from "./ContrastScene";
import AuditChecklistScene from "./AuditChecklistScene";

interface AccessibilityVisualizerProps {
  lessonSlug: string;
  stepId: string;
  stepIndex: number;
}

type SceneConfig =
  | { scene: "disability-spectrum"; variant: "overview" | "spectrum" | "legal" }
  | { scene: "dom-tree"; variant: "comparison" | "landmarks" | "headings" }
  | { scene: "aria-labels"; variant: "overview" | "labels" | "hidden-live" }
  | { scene: "focus-order"; variant: "no-focus" | "tab-cycle" | "focus-styles" | "skip-link" }
  | { scene: "contrast"; variant: "comparison" | "ratios" | "color-plus-icon" }
  | { scene: "audit-checklist"; variant: "overview" | "lighthouse" | "axe" | "screen-reader" | "keyboard" };

const sceneMap: Record<string, Record<string, SceneConfig>> = {
  "what-is-a11y": {
    "why-accessibility-exists": { scene: "disability-spectrum", variant: "overview" },
    "who-benefits": { scene: "disability-spectrum", variant: "spectrum" },
    "legal-requirements": { scene: "disability-spectrum", variant: "legal" },
  },
  "semantic-html-a11y": {
    "divs-vs-semantics": { scene: "dom-tree", variant: "comparison" },
    "landmark-elements": { scene: "dom-tree", variant: "landmarks" },
    "heading-hierarchy": { scene: "dom-tree", variant: "headings" },
  },
  "aria-attributes": {
    "what-is-aria": { scene: "aria-labels", variant: "overview" },
    "aria-label-and-labelledby": { scene: "aria-labels", variant: "labels" },
    "aria-hidden-and-live": { scene: "aria-labels", variant: "hidden-live" },
  },
  "keyboard-navigation": {
    "why-keyboard-matters": { scene: "focus-order", variant: "no-focus" },
    "tab-order-and-tabindex": { scene: "focus-order", variant: "tab-cycle" },
    "focus-indicators": { scene: "focus-order", variant: "focus-styles" },
    "skip-links": { scene: "focus-order", variant: "skip-link" },
  },
  "color-contrast": {
    "why-contrast-matters": { scene: "contrast", variant: "comparison" },
    "wcag-ratios": { scene: "contrast", variant: "ratios" },
    "color-not-alone": { scene: "contrast", variant: "color-plus-icon" },
  },
  "testing-tools": {
    "testing-overview": { scene: "audit-checklist", variant: "overview" },
    "lighthouse-audit": { scene: "audit-checklist", variant: "lighthouse" },
    "axe-devtools": { scene: "audit-checklist", variant: "axe" },
    "screen-reader-basics": { scene: "audit-checklist", variant: "screen-reader" },
    "manual-keyboard-testing": { scene: "audit-checklist", variant: "keyboard" },
  },
};

function getSceneConfig(lessonSlug: string, stepId: string): SceneConfig | null {
  return sceneMap[lessonSlug]?.[stepId] ?? null;
}

function SceneContent({ config }: { config: SceneConfig }) {
  switch (config.scene) {
    case "disability-spectrum":
      return <DisabilitySpectrumScene variant={config.variant} />;
    case "dom-tree":
      return <DomTreeScene variant={config.variant} />;
    case "aria-labels":
      return <AriaLabelsScene variant={config.variant} />;
    case "focus-order":
      return <FocusOrderScene variant={config.variant} />;
    case "contrast":
      return <ContrastScene variant={config.variant} />;
    case "audit-checklist":
      return <AuditChecklistScene variant={config.variant} />;
    default:
      return null;
  }
}

export default function AccessibilityVisualizer({
  lessonSlug,
  stepId,
}: AccessibilityVisualizerProps) {
  const config = getSceneConfig(lessonSlug, stepId);
  if (!config) return null;

  return (
    <Scene2DWrapper>
      <SceneContent config={config} />
    </Scene2DWrapper>
  );
}
