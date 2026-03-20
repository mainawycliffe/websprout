"use client";

import Scene2DWrapper from "../shared/Scene2DWrapper";
import BuildingBlocksScene from "./BuildingBlocksScene";
import HtmlStructureScene from "./HtmlStructureScene";
import CssStyleScene from "./CssStyleScene";
import JsInteractionScene from "./JsInteractionScene";
import UrlAnatomyScene from "./UrlAnatomyScene";
import HttpCycleScene from "./HttpCycleScene";
import DnsLookupScene from "./DnsLookupScene";
import ClientServerScene from "./ClientServerScene";
import FullJourneyScene from "./FullJourneyScene";

interface WebConceptsVisualizerProps {
  lessonSlug: string;
  stepId: string;
  stepIndex: number;
}

const sceneMap: Record<string, Record<string, string>> = {
  "building-blocks-of-web": {
    "what-is-a-website": "building-blocks",
    "the-trio": "building-blocks",
    "real-world-examples": "building-blocks",
  },
  "what-is-html": {
    "why-html-exists": "html-structure",
    "what-are-tags": "html-structure",
    "document-structure": "html-structure",
  },
  "what-is-css": {
    "why-css-exists": "css-style",
    "how-css-works": "css-style",
    "css-real-world": "css-style",
  },
  "what-is-javascript": {
    "why-js-exists": "js-interaction",
    "what-js-does": "js-interaction",
    "js-in-html": "js-interaction",
  },
  "web-concepts": {
    urls: "url-anatomy",
    browsers: "http-cycle",
    http: "http-cycle",
    dns: "dns-lookup",
  },
  "client-server": {
    "what-are-clients-servers": "client-server",
    "request-response": "client-server",
    "static-vs-dynamic": "client-server",
  },
  capstone: {
    "the-full-journey": "full-journey",
    "step-1-dns": "full-journey",
    "step-2-http": "full-journey",
    "step-3-response": "full-journey",
    "step-4-render": "full-journey",
  },
};

function getScene(lessonSlug: string, stepId: string): string | null {
  return sceneMap[lessonSlug]?.[stepId] ?? null;
}

function SceneContent({
  scene,
  stepId,
}: {
  scene: string;
  stepId: string;
}) {
  switch (scene) {
    case "building-blocks":
      return <BuildingBlocksScene stepId={stepId} />;
    case "html-structure":
      return <HtmlStructureScene stepId={stepId} />;
    case "css-style":
      return <CssStyleScene stepId={stepId} />;
    case "js-interaction":
      return <JsInteractionScene stepId={stepId} />;
    case "url-anatomy":
      return <UrlAnatomyScene stepId={stepId} />;
    case "http-cycle":
      return <HttpCycleScene stepId={stepId} />;
    case "dns-lookup":
      return <DnsLookupScene stepId={stepId} />;
    case "client-server":
      return <ClientServerScene stepId={stepId} />;
    case "full-journey":
      return <FullJourneyScene stepId={stepId} />;
    default:
      return null;
  }
}

export default function WebConceptsVisualizer({
  lessonSlug,
  stepId,
}: WebConceptsVisualizerProps) {
  const scene = getScene(lessonSlug, stepId);
  if (!scene) return null;

  return (
    <Scene2DWrapper>
      <SceneContent scene={scene} stepId={stepId} />
    </Scene2DWrapper>
  );
}
