'use client';

import { motion } from 'motion/react';
import { useCycle } from '../react-concepts/useCycle';

interface LoadingStatesSceneProps {
  variant: 'spinner' | 'skeleton';
}

export default function LoadingStatesScene({ variant }: LoadingStatesSceneProps) {
  return variant === 'skeleton' ? <SkeletonVariant /> : <SpinnerVariant />;
}

const BRANCHES = [
  { key: 'loading', label: 'if (loading)', tint: '#FBBF24' },
  { key: 'error', label: 'if (error)', tint: '#FB7185' },
  { key: 'data', label: 'else (data)', tint: '#34D399' },
];

function SpinnerVariant() {
  const active = useCycle(BRANCHES.length, 1500);

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>One piece of state, three things to render</p>

      <div className='flex flex-col gap-2'>
        {BRANCHES.map((b, i) => (
          <motion.div
            key={b.key}
            animate={{ opacity: i === active ? 1 : 0.35, scale: i === active ? 1 : 0.98 }}
            className='flex items-center gap-3 rounded-md border bg-slate-900/70 px-3 py-2'
            style={{ borderColor: i === active ? b.tint : '#1e293b' }}>
            <code className='w-20 shrink-0 font-mono text-[11px]' style={{ color: b.tint }}>
              {b.label}
            </code>
            <div className='flex-1'>
              <BranchUI kind={b.key} active={i === active} tint={b.tint} />
            </div>
          </motion.div>
        ))}
      </div>

      <p className='text-center text-xs text-slate-400'>
        Render exactly one branch at a time — loading first, then either an error or the data. Never a blank screen.
      </p>
    </div>
  );
}

function BranchUI({ kind, active, tint }: { kind: string; active: boolean; tint: string }) {
  if (kind === 'loading') {
    return (
      <span className='flex items-center gap-2 text-[11px] text-slate-300'>
        <motion.span
          className='inline-block h-3.5 w-3.5 rounded-full border-2 border-amber-300/30 border-t-amber-300'
          animate={active ? { rotate: 360 } : {}}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        Loading…
      </span>
    );
  }
  if (kind === 'error') {
    return <span className='text-[11px]' style={{ color: tint }}>⚠ Couldn’t load — Retry</span>;
  }
  return <span className='text-[11px] font-medium text-slate-100'>Leanne Graham · @Bret</span>;
}

function SkeletonVariant() {
  const phase = useCycle(2, 1800); // 0 = skeleton, 1 = content
  const loading = phase === 0;

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>Skeletons keep the layout steady while data loads</p>

      <div className='mx-auto w-60 rounded-lg border border-white/10 bg-slate-900/70 p-3'>
        <div className='flex items-center gap-3'>
          {loading ? (
            <motion.span
              className='h-10 w-10 rounded-full bg-slate-700'
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          ) : (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/30 text-lg'>
              🧑
            </motion.span>
          )}

          <div className='flex-1 space-y-2'>
            {loading ? (
              <>
                <motion.span
                  className='block h-3 w-3/4 rounded bg-slate-700'
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.1 }}
                />
                <motion.span
                  className='block h-3 w-1/2 rounded bg-slate-700'
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                />
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                <p className='text-sm font-semibold text-slate-100'>Leanne Graham</p>
                <p className='text-[11px] text-slate-400'>@Bret</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <p className='text-center text-xs text-slate-400'>
        {loading
          ? 'Loading… grey placeholders match the real content’s shape.'
          : 'Loaded — the real content swaps in with no layout jump.'}
      </p>
    </div>
  );
}
