'use client';

import { motion } from 'motion/react';
import { useCycle } from './useCycle';

interface MemoSceneProps {
  variant: 'value' | 'callback';
}

// 0,1,2 are renders where the input is unchanged; 3 is where it changes.
const STEPS = 4;

export default function MemoScene({ variant }: MemoSceneProps) {
  const tick = useCycle(STEPS, 1500);
  const depsChanged = tick === 3 || tick === 0; // changes on wrap and at step 3

  if (variant === 'callback') {
    return (
      <div className='flex flex-col gap-4'>
        <p className='text-center text-sm font-semibold text-slate-100'>
          useCallback keeps the same function identity between renders
        </p>
        <div className='grid grid-cols-2 gap-4'>
          <IdentityCard
            title='Without useCallback'
            sub={`render #${tick + 1}`}
            hash={`fn@0x${(tick + 1) * 17}`}
            same={false}
          />
          <IdentityCard title='With useCallback' sub={`render #${tick + 1}`} hash='fn@0x4a' same />
        </div>
        <p className='text-center text-xs text-slate-400'>
          A new function each render is a new identity, so <code className='text-slate-300'>React.memo</code> children
          re-render anyway. useCallback freezes the identity until its deps change.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        useMemo caches a result and skips the expensive work
      </p>

      <div className='mx-auto flex items-center gap-2 text-[10px] text-slate-400'>
        <span>render</span>
        {Array.from({ length: STEPS }).map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === tick ? 'bg-cyan-300' : 'bg-slate-700'}`}
          />
        ))}
        <span className='ml-1'>input {depsChanged ? 'CHANGED' : 'same'}</span>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Lane
          title='Without useMemo'
          state='recompute'
          detail='runs the expensive filter every single render'
        />
        <Lane
          title='With useMemo'
          state={depsChanged ? 'recompute' : 'cache-hit'}
          detail={depsChanged ? 'input changed → recompute once' : 'cached result reused — no work'}
        />
      </div>

      <p className='text-center text-xs text-slate-400'>
        Only reach for useMemo when the work is genuinely expensive or the identity must stay stable.
      </p>
    </div>
  );
}

function Lane({ title, state, detail }: { title: string; state: 'recompute' | 'cache-hit'; detail: string }) {
  const recompute = state === 'recompute';
  return (
    <div className='rounded-lg border border-white/10 bg-slate-900/70 p-3'>
      <p className='mb-2 text-xs font-semibold text-slate-200'>{title}</p>
      <motion.div
        key={state + detail}
        initial={{ scale: 0.9, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        className='mb-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium'
        style={{
          backgroundColor: recompute ? '#FB923C22' : '#34D39922',
          color: recompute ? '#FED7AA' : '#A7F3D0',
        }}>
        <motion.span
          animate={recompute ? { rotate: 360 } : { rotate: 0 }}
          transition={recompute ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}>
          {recompute ? '⚙️' : '✓'}
        </motion.span>
        {recompute ? 'recompute' : 'cache hit'}
      </motion.div>
      <p className='text-[10px] leading-tight text-slate-400'>{detail}</p>
    </div>
  );
}

function IdentityCard({
  title,
  sub,
  hash,
  same,
}: {
  title: string;
  sub: string;
  hash: string;
  same: boolean;
}) {
  return (
    <div className='rounded-lg border border-white/10 bg-slate-900/70 p-3'>
      <p className='mb-1 text-xs font-semibold text-slate-200'>{title}</p>
      <p className='mb-2 text-[10px] text-slate-500'>{sub}</p>
      <motion.div
        key={hash}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className='inline-block rounded-md border px-2 py-1 font-mono text-[11px]'
        style={{
          borderColor: same ? '#34D399' : '#FB923C',
          color: same ? '#A7F3D0' : '#FED7AA',
          backgroundColor: same ? '#34D39915' : '#FB923C15',
        }}>
        {hash}
      </motion.div>
      <p className='mt-2 text-[10px] text-slate-400'>{same ? 'same reference ✓' : 'new reference every render'}</p>
    </div>
  );
}
