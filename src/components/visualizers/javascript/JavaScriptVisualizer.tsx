"use client";

import Scene2DWrapper from "../shared/Scene2DWrapper";
import VariableBoxScene from "./VariableBoxScene";

interface JavaScriptVisualizerProps {
  lessonSlug: string;
  stepId: string;
  stepIndex: number;
}

const sceneMap: Record<string, Record<string, string>> = {
  "what-is-js": {
    "what-is-js-intro": "variable-box",
    "behavior-layer": "variable-box",
    "js-real-world": "variable-box",
  },
  "browser-console": {
    "console-intro": "variable-box",
    "console-log": "variable-box",
    "console-expressions": "variable-box",
  },
  "variables-let": {
    "what-are-variables": "variable-box",
    "let-keyword": "variable-box",
    "let-assignment": "variable-box",
    "let-reassignment": "variable-box",
  },
  constants: {
    "what-is-const": "variable-box",
    "const-keyword": "variable-box",
    "let-vs-const": "variable-box",
  },
};

function getScene(lessonSlug: string, stepId: string): string | null {
  return sceneMap[lessonSlug]?.[stepId] ?? null;
}

function SceneContent({ scene, stepId }: { scene: string; stepId: string }) {
  switch (scene) {
    case "variable-box":
      return <VariableBoxScene stepId={stepId} />;
    default:
      return null;
  }
}

export default function JavaScriptVisualizer({
  lessonSlug,
  stepId,
}: JavaScriptVisualizerProps) {
  const scene = getScene(lessonSlug, stepId);
  if (!scene) return null;

  return (
    <Scene2DWrapper>
      <SceneContent scene={scene} stepId={stepId} />
    </Scene2DWrapper>
  );
}
