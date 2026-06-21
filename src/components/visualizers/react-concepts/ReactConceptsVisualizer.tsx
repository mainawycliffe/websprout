'use client';

import ComponentTreeScene from './ComponentTreeScene';
import DataFlowScene from './DataFlowScene';
import RerenderScene from './RerenderScene';
import EffectTimelineScene from './EffectTimelineScene';
import MemoScene from './MemoScene';
import FileRouteScene from './FileRouteScene';
import LayoutNestingScene from './LayoutNestingScene';
import ServerClientScene from './ServerClientScene';

interface ReactConceptsVisualizerProps {
  lessonSlug: string;
  stepId: string;
  stepIndex: number;
}

type SceneEntry =
  | { scene: 'component-tree'; variant: 'intro' | 'breakdown' }
  | { scene: 'data-flow'; variant: 'props' | 'events' }
  | { scene: 'rerender'; variant: 'trigger' | 'subtree' }
  | { scene: 'effect-timeline'; variant: 'lifecycle' | 'deps' | 'cleanup' }
  | { scene: 'memo'; variant: 'value' | 'callback' }
  | { scene: 'file-route'; variant: 'routing' | 'dynamic' }
  | { scene: 'layout-nesting'; variant: 'single' | 'nested' }
  | { scene: 'server-client'; variant: 'default' | 'boundary' };

const sceneMap: Record<string, Record<string, SceneEntry>> = {
  'components-and-trees': {
    'what-is-a-component': { scene: 'component-tree', variant: 'intro' },
    'break-it-down': { scene: 'component-tree', variant: 'breakdown' },
  },
  'one-way-data-flow': {
    'props-flow-down': { scene: 'data-flow', variant: 'props' },
    'events-flow-up': { scene: 'data-flow', variant: 'events' },
  },
  'rendering-and-rerenders': {
    'what-triggers-a-render': { scene: 'rerender', variant: 'trigger' },
    'only-the-subtree-rerenders': { scene: 'rerender', variant: 'subtree' },
  },
  'useeffect-visualized': {
    'effect-lifecycle': { scene: 'effect-timeline', variant: 'lifecycle' },
    'the-dependency-array': { scene: 'effect-timeline', variant: 'deps' },
    'cleanup-functions': { scene: 'effect-timeline', variant: 'cleanup' },
  },
  'usememo-and-usecallback': {
    'why-usememo': { scene: 'memo', variant: 'value' },
    'usecallback-and-identity': { scene: 'memo', variant: 'callback' },
  },
  'nextjs-file-routing': {
    'files-become-routes': { scene: 'file-route', variant: 'routing' },
    'dynamic-routes': { scene: 'file-route', variant: 'dynamic' },
  },
  'nextjs-layout-file': {
    'layout-wraps-children': { scene: 'layout-nesting', variant: 'single' },
    'nested-layouts': { scene: 'layout-nesting', variant: 'nested' },
  },
  'server-vs-client-components': {
    'where-code-runs': { scene: 'server-client', variant: 'default' },
    'the-use-client-boundary': { scene: 'server-client', variant: 'boundary' },
  },
  'capstone-reading-an-app': {
    'map-the-tree': { scene: 'component-tree', variant: 'breakdown' },
    'what-rerenders': { scene: 'rerender', variant: 'subtree' },
  },
};

function SceneContent({ entry }: { entry: SceneEntry }) {
  switch (entry.scene) {
    case 'component-tree':
      return <ComponentTreeScene variant={entry.variant} />;
    case 'data-flow':
      return <DataFlowScene variant={entry.variant} />;
    case 'rerender':
      return <RerenderScene variant={entry.variant} />;
    case 'effect-timeline':
      return <EffectTimelineScene variant={entry.variant} />;
    case 'memo':
      return <MemoScene variant={entry.variant} />;
    case 'file-route':
      return <FileRouteScene variant={entry.variant} />;
    case 'layout-nesting':
      return <LayoutNestingScene variant={entry.variant} />;
    case 'server-client':
      return <ServerClientScene variant={entry.variant} />;
    default:
      return null;
  }
}

export default function ReactConceptsVisualizer({ lessonSlug, stepId }: ReactConceptsVisualizerProps) {
  const entry = sceneMap[lessonSlug]?.[stepId];
  if (!entry) return null;

  return (
    <div className='relative w-full overflow-hidden rounded-md border border-white/10 bg-slate-950 px-4 py-5 shadow-card'>
      <SceneContent entry={entry} />
    </div>
  );
}
