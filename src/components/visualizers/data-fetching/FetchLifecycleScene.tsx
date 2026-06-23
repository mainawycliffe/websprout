'use client';

import { motion } from 'motion/react';
import { useCycle } from '../react-concepts/useCycle';

interface FetchLifecycleSceneProps {
  variant: 'success' | 'error';
}

const PHASES: Record<FetchLifecycleSceneProps['variant'], { label: string; color: string }[]> = {
  success: [
    { label: 'Idle — no data yet', color: '#64748B' },
    { label: 'Loading — request sent', color: '#FBBF24' },
    { label: 'Response arrives', color: '#38BDF8' },
    { label: 'Data in state → UI shows it', color: '#34D399' },
  ],
  error: [
    { label: 'Idle — no data yet', color: '#64748B' },
    { label: 'Loading — request sent', color: '#FBBF24' },
    { label: 'Request fails ✕', color: '#FB7185' },
    { label: 'Error in state → show message', color: '#FB7185' },
  ],
};

export default function FetchLifecycleScene({ variant }: FetchLifecycleSceneProps) {
  const phases = PHASES[variant];
  const active = useCycle(phases.length, 1300);
  const isError = variant === 'error';

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {isError ? 'A fetch can always fail — plan for it' : 'Every fetch moves through the same states'}
      </p>

      {/* Mock UI card that reflects the active phase */}
      <div className='mx-auto flex h-24 w-56 items-center justify-center rounded-lg border border-white/10 bg-slate-900/70 p-3'>
        <PhaseUI variant={variant} active={active} />
      </div>

      {/* Timeline track */}
      <div className='relative px-2'>
        <div className='absolute left-2 right-2 top-3 h-px bg-white/15' />
        <motion.div
          className='absolute top-1.5 h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_8px_2px_rgba(56,189,248,0.5)]'
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
        {isError
          ? 'Network down, a 404, a 500 — your component needs an error branch, not just a data branch.'
          : 'Track these in state: data starts empty, loading flips true then false, and the UI follows.'}
      </p>
    </div>
  );
}

function PhaseUI({ variant, active }: { variant: 'success' | 'error'; active: number }) {
  if (active <= 0) {
    return <span className='text-xs text-slate-500'>(empty)</span>;
  }
  if (active === 1) {
    return (
      <motion.span
        className='inline-block h-6 w-6 rounded-full border-2 border-amber-300/30 border-t-amber-300'
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    );
  }
  if (variant === 'error') {
    return active === 2 ? (
      <span className='text-2xl'>⚡</span>
    ) : (
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className='text-center'>
        <p className='text-sm font-semibold text-rose-300'>Couldn’t load data</p>
        <p className='text-[10px] text-slate-400'>Please try again</p>
      </motion.div>
    );
  }
  return active === 2 ? (
    <span className='font-mono text-[10px] text-sky-300'>{'{ "name": "Leanne" }'}</span>
  ) : (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className='text-center'>
      <p className='text-sm font-semibold text-emerald-300'>Leanne Graham</p>
      <p className='text-[10px] text-slate-400'>Sincere@april.biz</p>
    </motion.div>
  );
}
