import type { Lesson } from '@/types/lesson';
import { lesson as whyAnimation } from './01-why-animation';
import { lesson as transitions } from './02-transitions';
import { lesson as transforms } from './03-transforms';
import { lesson as timingFunctions } from './04-timing-functions';
import { lesson as keyframes } from './05-keyframes';
import { lesson as performance } from './06-performance';
import { lesson as reducedMotion } from './07-reduced-motion';
import { lesson as capstone } from './08-capstone';
import { lesson as codelabAnimatedButton } from './09-codelab-animated-button';

export const cssAnimationsLessons: Lesson[] = [
  whyAnimation,
  transitions,
  transforms,
  timingFunctions,
  keyframes,
  performance,
  reducedMotion,
  capstone,
  codelabAnimatedButton,
];
