'use client';

import { motion } from 'motion/react';
import { useCycle } from './useCycle';

interface EffectTimelineSceneProps {
  variant: 'lifecycle' | 'deps' | 'cleanup';
}

const PHASES: Record<EffectTimelineSceneProps['variant'], { label: string; color: string }[]> = {
  lifecycle: [
    { label: 'Render', color: '#818CF8' },
    { label: 'Commit to DOM', color: '#22D3EE' },
    { label: 'Browser paints', color: '#34D399' },
    { label: 'Effect runs', color: '#FBBF24' },
  ],
  deps: [
    { label: 'Mount → effect runs', color: '#FBBF24' },
    { label: 're-render, deps SAME', color: '#64748B' },
    { label: 'effect SKIPPED', color: '#64748B' },
    { label: 'deps CHANGED → effect runs', color: '#FBBF24' },
  ],
  cleanup: [
    { label: 'Effect runs (subscribe)', color: '#FBBF24' },
    { label: 'deps change / unmount', color: '#818CF8' },
    { label: 'Cleanup runs (unsubscribe)', color: '#FB923C' },
    { label: 'Effect runs again', color: '#FBBF24' },
  ],
};

export default function EffectTimelineScene({ variant }: EffectTimelineSceneProps) {
  const phases = PHASES[variant];
  const active = useCycle(phases.length, 1300);

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {variant === 'lifecycle'
          ? 'useEffect runs AFTER the browser paints'
          : variant === 'deps'
            ? 'The dependency array decides if the effect re-runs'
            : 'The cleanup function runs before the next effect (and on unmount)'}
      </p>

      <div className='relative px-2'>
        {/* The track */}
        <div className='absolute left-2 right-2 top-3 h-px bg-white/15' />
        {/* The playhead */}
        <motion.div
          className='absolute top-1.5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(34,211,238,0.5)]'
          animate={{ left: `${(active / (phases.length - 1)) * 92 + 2}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />

        <div className='flex justify-between pt-8'>
          {phases.map((phase, i) => (
            <motion.div
              key={phase.label}
              animate={{ opacity: i === active ? 1 : 0.4, scale: i === active ? 1.05 : 1 }}
              className='flex w-1/4 flex-col items-center gap-1.5'>
              <span
                className='h-2.5 w-2.5 rounded-full'
                style={{ backgroundColor: i <= active ? phase.color : '#334155' }}
              />
              <span
                className='text-center text-[10px] font-medium leading-tight'
                style={{ color: i === active ? phase.color : '#94A3B8' }}>
                {phase.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <p className='text-center text-xs text-slate-400'>
        {variant === 'lifecycle'
          ? 'That is why effects are for "after render" work: fetching, subscriptions, timers, the DOM.'
          : variant === 'deps'
            ? 'Empty [] = run once. [value] = run when value changes. No array = run every render.'
            : 'Return a function from your effect to undo what it set up — no leaks, no duplicate timers.'}
      </p>
    </div>
  );
}
