'use client';

import Scene2DWrapper from '../shared/Scene2DWrapper';
import KeyframesScene from './KeyframesScene';
import MotionCardScene from './MotionCardScene';
import PerformanceScene from './PerformanceScene';
import ReducedMotionScene from './ReducedMotionScene';
import TimingScene from './TimingScene';

interface AnimationVisualizerProps {
  lessonSlug: string;
  stepId: string;
  stepIndex: number;
}

type SceneEntry =
  | { scene: 'motion-card'; variant: 'purpose' | 'feedback' | 'transition' | 'transforms' | 'capstone' | 'button-lab' }
  | { scene: 'timing'; variant: 'compare' | 'ease-out' }
  | { scene: 'keyframes'; variant: 'comparison' | 'stages' | 'loop' }
  | { scene: 'performance'; variant: 'transform' | 'compare' | 'safe' | 'caution' }
  | { scene: 'reduced-motion'; variant: 'contrast' | 'query' };

const sceneMap: Record<string, Record<string, SceneEntry>> = {
  'why-animation': {
    'why-motion-exists': { scene: 'motion-card', variant: 'purpose' },
    'feedback-and-orientation': { scene: 'motion-card', variant: 'feedback' },
    'motion-needs-restraint': { scene: 'reduced-motion', variant: 'contrast' },
  },
  transitions: {
    'transition-two-states': { scene: 'motion-card', variant: 'transition' },
    'anatomy-of-transition': { scene: 'motion-card', variant: 'feedback' },
  },
  transforms: {
    'why-transform': { scene: 'performance', variant: 'transform' },
    'translate-vs-top-left': { scene: 'performance', variant: 'compare' },
    'transform-functions': { scene: 'motion-card', variant: 'transforms' },
  },
  'timing-functions': {
    'why-timing-matters': { scene: 'timing', variant: 'compare' },
    'common-timing-functions': { scene: 'timing', variant: 'ease-out' },
  },
  keyframes: {
    'transitions-vs-keyframes': { scene: 'keyframes', variant: 'comparison' },
    'anatomy-of-keyframes': { scene: 'keyframes', variant: 'stages' },
    'animation-shorthand': { scene: 'keyframes', variant: 'loop' },
  },
  performance: {
    'transform-and-opacity': { scene: 'performance', variant: 'safe' },
    'paint-layout-cost': { scene: 'performance', variant: 'compare' },
    'will-change-caution': { scene: 'performance', variant: 'caution' },
  },
  'reduced-motion': {
    'motion-is-optional': { scene: 'reduced-motion', variant: 'contrast' },
    'media-query-for-motion': { scene: 'reduced-motion', variant: 'query' },
  },
  'capstone-animated-product-card': {
    'project-brief': { scene: 'motion-card', variant: 'capstone' },
    'layer-the-motion': { scene: 'motion-card', variant: 'capstone' },
  },
  'codelab-animated-button': {
    'button-lab-hover-press': { scene: 'motion-card', variant: 'button-lab' },
    'button-lab-loading-state': { scene: 'keyframes', variant: 'loop' },
    'button-lab-reduced-motion': { scene: 'reduced-motion', variant: 'query' },
  },
};

function SceneContent({ entry }: { entry: SceneEntry }) {
  switch (entry.scene) {
    case 'motion-card':
      return <MotionCardScene variant={entry.variant} />;
    case 'timing':
      return <TimingScene variant={entry.variant} />;
    case 'keyframes':
      return <KeyframesScene variant={entry.variant} />;
    case 'performance':
      return <PerformanceScene variant={entry.variant} />;
    case 'reduced-motion':
      return <ReducedMotionScene variant={entry.variant} />;
    default:
      return null;
  }
}

export default function AnimationVisualizer({ lessonSlug, stepId }: AnimationVisualizerProps) {
  const entry = sceneMap[lessonSlug]?.[stepId];
  if (!entry) return null;

  return (
    <Scene2DWrapper bgColor='#020617'>
      <SceneContent entry={entry} />
    </Scene2DWrapper>
  );
}
