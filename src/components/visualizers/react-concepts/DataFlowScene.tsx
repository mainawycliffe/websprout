'use client';

import { motion } from 'motion/react';

interface DataFlowSceneProps {
  variant: 'props' | 'events';
}

export default function DataFlowScene({ variant }: DataFlowSceneProps) {
  const isProps = variant === 'props';

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {isProps ? 'Props flow DOWN the tree' : 'Events flow UP via callbacks'}
      </p>

      <div className='relative mx-auto h-44 w-64'>
        {/* Parent node (top) */}
        <Node className='left-1/2 top-1 -translate-x-1/2' label='<App />' color='#22D3EE' />

        {/* Connector line */}
        <div className='absolute left-1/2 top-11 h-22 w-px -translate-x-1/2 bg-white/15' />

        {/* Child node (bottom) */}
        <Node className='left-1/2 bottom-1 -translate-x-1/2' label='<Greeting />' color='#34D399' />

        {/* The travelling token */}
        <motion.div
          className='absolute left-1/2 z-10 -translate-x-1/2 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold'
          style={{
            backgroundColor: isProps ? '#818CF822' : '#FB923C22',
            border: `1px solid ${isProps ? '#818CF8' : '#FB923C'}`,
            color: isProps ? '#C7D2FE' : '#FED7AA',
          }}
          animate={{ top: isProps ? [40, 120] : [120, 40], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.15, 0.85, 1] }}>
          {isProps ? 'name="Ada"' : 'onLike()'}
        </motion.div>

        {/* Direction arrow head */}
        <motion.div
          className='absolute left-1/2 -translate-x-1/2 text-lg'
          style={{ color: isProps ? '#818CF8' : '#FB923C' }}
          animate={{ top: isProps ? 104 : 28, opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}>
          {isProps ? '▼' : '▲'}
        </motion.div>
      </div>

      <p className='text-center text-xs text-slate-400'>
        {isProps
          ? 'A parent passes data to a child as props — read-only, one direction.'
          : 'A child cannot change a parent. It calls a function the parent passed down.'}
      </p>
    </div>
  );
}

function Node({ className, label, color }: { className: string; label: string; color: string }) {
  return (
    <div
      className={`absolute rounded-md border bg-slate-900/80 px-3 py-1.5 font-mono text-xs text-slate-200 ${className}`}
      style={{ borderColor: color }}>
      {label}
    </div>
  );
}
