'use client';

import FetchLifecycleScene from './FetchLifecycleScene';
import LoadingStatesScene from './LoadingStatesScene';
import RaceConditionScene from './RaceConditionScene';
import ServerClientFetchScene from './ServerClientFetchScene';
import CacheScene from './CacheScene';

interface DataFetchingVisualizerProps {
  lessonSlug: string;
  stepId: string;
  stepIndex: number;
}

type SceneEntry =
  | { scene: 'fetch-lifecycle'; variant: 'success' | 'error' }
  | { scene: 'loading-states'; variant: 'spinner' | 'skeleton' }
  | { scene: 'race-condition'; variant: 'stale' | 'cleanup' }
  | { scene: 'server-client-fetch'; variant: 'client' | 'server' }
  | { scene: 'cache'; variant: 'nocache' | 'cache' };

// Maps lessonSlug → stepId → which animated scene to show.
// The stepId keys MUST match the step.id values authored in src/content/data-fetching/*.
const sceneMap: Record<string, Record<string, SceneEntry>> = {
  'why-react-data-fetching': {
    'data-lives-in-state': { scene: 'fetch-lifecycle', variant: 'success' },
  },
  'fetch-in-useeffect': {
    'the-fetch-effect': { scene: 'fetch-lifecycle', variant: 'success' },
  },
  'loading-and-error-states': {
    'every-fetch-has-three-states': { scene: 'loading-states', variant: 'spinner' },
    'always-handle-errors': { scene: 'fetch-lifecycle', variant: 'error' },
  },
  'animated-loading-ux': {
    'why-skeletons': { scene: 'loading-states', variant: 'skeleton' },
  },
  'race-conditions-and-cleanup': {
    'the-stale-response-bug': { scene: 'race-condition', variant: 'stale' },
    'cleanup-to-the-rescue': { scene: 'race-condition', variant: 'cleanup' },
  },
  'beyond-useeffect-data-libraries': {
    'the-boilerplate-problem': { scene: 'cache', variant: 'nocache' },
    'what-a-library-gives-you': { scene: 'cache', variant: 'cache' },
  },
  'nextjs-server-components-fetching': {
    'the-client-way-recap': { scene: 'server-client-fetch', variant: 'client' },
    'fetch-on-the-server': { scene: 'server-client-fetch', variant: 'server' },
  },
  'loading-and-error-files': {
    'loading-js': { scene: 'loading-states', variant: 'spinner' },
    'caching-and-revalidation': { scene: 'cache', variant: 'cache' },
  },
};

function SceneContent({ entry }: { entry: SceneEntry }) {
  switch (entry.scene) {
    case 'fetch-lifecycle':
      return <FetchLifecycleScene variant={entry.variant} />;
    case 'loading-states':
      return <LoadingStatesScene variant={entry.variant} />;
    case 'race-condition':
      return <RaceConditionScene variant={entry.variant} />;
    case 'server-client-fetch':
      return <ServerClientFetchScene variant={entry.variant} />;
    case 'cache':
      return <CacheScene variant={entry.variant} />;
    default:
      return null;
  }
}

export default function DataFetchingVisualizer({ lessonSlug, stepId }: DataFetchingVisualizerProps) {
  const entry = sceneMap[lessonSlug]?.[stepId];
  if (!entry) return null;

  return (
    <div className='relative w-full overflow-hidden rounded-md border border-white/10 bg-slate-950 px-4 py-5 shadow-card'>
      <SceneContent entry={entry} />
    </div>
  );
}
