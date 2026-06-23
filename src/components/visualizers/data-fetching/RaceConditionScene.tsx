'use client';

import { motion } from 'motion/react';
import { useCycle } from '../react-concepts/useCycle';

interface RaceConditionSceneProps {
  variant: 'stale' | 'cleanup';
}

export default function RaceConditionScene({ variant }: RaceConditionSceneProps) {
  const isCleanup = variant === 'cleanup';
  // Changing key remounts the inner block so the whole "race" replays on a loop.
  const run = useCycle(2, 3400);

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {isCleanup ? 'Cleanup ignores the stale response' : 'The stale-response bug'}
      </p>

      <div key={run} className='mx-auto flex w-64 flex-col gap-3'>
        <Request label='Request #1 (older) → “Mars”' color='#FB7185' duration={2.4} ignored={isCleanup} />
        <Request label='Request #2 (newer) → “Moon”' color='#34D399' duration={1.1} />
        <ResultBox isCleanup={isCleanup} />
      </div>

      <p className='text-center text-xs text-slate-400'>
        {isCleanup
          ? 'The effect’s cleanup sets ignore = true, so #1’s late answer is dropped. #2 wins. ✅'
          : '#1 was sent first but arrives LAST, overwriting #2 — the screen shows the wrong data. ✕'}
      </p>
    </div>
  );
}

function Request({
  label,
  color,
  duration,
  ignored,
}: {
  label: string;
  color: string;
  duration: number;
  ignored?: boolean;
}) {
  return (
    <div className='space-y-1'>
      <div className='flex items-center justify-between'>
        <span
          className='font-mono text-[10px]'
          style={{ color, textDecoration: ignored ? 'line-through' : 'none', opacity: ignored ? 0.6 : 1 }}>
          {label}
        </span>
        <motion.span
          className='text-[10px] text-slate-300'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: duration }}>
          {ignored ? '🚫 ignored' : '✓ done'}
        </motion.span>
      </div>
      <div className='h-2 w-full overflow-hidden rounded-full bg-slate-800'>
        <motion.div
          className='h-full rounded-full'
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

function ResultBox({ isCleanup }: { isCleanup: boolean }) {
  return (
    <motion.div
      className='mt-1 rounded-md border px-3 py-2 text-center'
      style={{ borderColor: isCleanup ? '#34D399' : '#FB7185' }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.55 }}>
      <span className='text-[10px] text-slate-400'>Screen shows: </span>
      <span className='font-mono text-xs font-semibold' style={{ color: isCleanup ? '#34D399' : '#FB7185' }}>
        {isCleanup ? '“Moon” ✅' : '“Mars” ✕'}
      </span>
    </motion.div>
  );
}
