'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface RerenderSceneProps {
  variant: 'trigger' | 'subtree';
}

export default function RerenderScene({ variant }: RerenderSceneProps) {
  const [renders, setRenders] = useState(0);
  const [flash, setFlash] = useState(false);

  // Every 1.8s simulate a state update that re-runs the component.
  useEffect(() => {
    const id = setInterval(() => {
      setRenders((n) => n + 1);
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {variant === 'trigger'
          ? 'A state change re-runs the component'
          : 'Only the component that owns the state (and its children) re-render'}
      </p>

      <div className='flex items-stretch justify-center gap-4'>
        {/* The stateful subtree */}
        <div className='flex flex-col items-center gap-2'>
          <RenderBox label='<App />' flashing={flash} accent='#22D3EE' />
          <div className='h-3 w-px bg-white/15' />
          <RenderBox label='<Counter /> · state' flashing={flash} accent='#34D399' badge={`renders: ${renders}`} />
          <div className='h-3 w-px bg-white/15' />
          <RenderBox label='<Display />' flashing={flash} accent='#34D399' />
        </div>

        {/* A sibling that does NOT depend on the state */}
        {variant === 'subtree' && (
          <div className='flex flex-col items-center justify-start gap-2'>
            <div className='h-9' />
            <div className='h-3' />
            <RenderBox label='<Sidebar />' flashing={false} accent='#64748B' calm />
            <p className='mt-1 max-w-28 text-center text-[9px] text-slate-500'>no state used → never re-runs</p>
          </div>
        )}
      </div>

      <motion.button
        type='button'
        className='mx-auto rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200'
        animate={{ scale: flash ? [1, 0.94, 1] : 1 }}
        transition={{ duration: 0.4 }}>
        setCount(count + 1)
      </motion.button>

      <p className='text-center text-xs text-slate-400'>
        {variant === 'trigger'
          ? 'React re-runs the function and compares the result to update the DOM efficiently.'
          : 'Re-rendering is not the same as re-painting the whole page — React only touches what changed.'}
      </p>
    </div>
  );
}

function RenderBox({
  label,
  flashing,
  accent,
  badge,
  calm,
}: {
  label: string;
  flashing: boolean;
  accent: string;
  badge?: string;
  calm?: boolean;
}) {
  return (
    <motion.div
      animate={{
        backgroundColor: flashing && !calm ? `${accent}26` : 'rgba(15,23,42,0.8)',
        borderColor: flashing && !calm ? accent : 'rgba(255,255,255,0.12)',
      }}
      className='relative rounded-md border px-3 py-1.5 font-mono text-[11px] text-slate-200'>
      {label}
      {badge && (
        <span className='ml-2 rounded bg-emerald-400/15 px-1.5 py-0.5 text-[9px] text-emerald-300'>{badge}</span>
      )}
    </motion.div>
  );
}
