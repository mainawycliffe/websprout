'use client';

import { motion } from 'motion/react';
import { useCycle } from '../react-concepts/useCycle';

interface CacheSceneProps {
  variant: 'nocache' | 'cache';
}

const VISITS = ['Open the page', 'Go back, then return', 'Open it a third time'];

export default function CacheScene({ variant }: CacheSceneProps) {
  const isCache = variant === 'cache';
  const active = useCycle(VISITS.length, 1500);

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {isCache ? 'A cache serves repeat requests instantly' : 'Without a cache, every visit refetches'}
      </p>

      <div className='flex flex-col gap-2'>
        {VISITS.map((v, i) => {
          const fromNetwork = !isCache || i === 0;
          const visible = i <= active;
          return (
            <motion.div
              key={v}
              animate={{ opacity: visible ? 1 : 0.25 }}
              className='flex items-center justify-between rounded-md border border-white/10 bg-slate-900/70 px-3 py-2'>
              <span className='text-xs text-slate-200'>{v}</span>
              {fromNetwork ? (
                <span className='flex items-center gap-1.5 font-mono text-[10px] text-amber-300'>
                  {i === active && (
                    <motion.span
                      className='inline-block h-3 w-3 rounded-full border-2 border-amber-300/30 border-t-amber-300'
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                  network · ~600ms
                </span>
              ) : (
                <span className='font-mono text-[10px] text-emerald-300'>⚡ cache · instant</span>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className='text-center text-xs text-slate-400'>
        {isCache
          ? 'Libraries like TanStack Query — and Next.js fetch caching — reuse data, dedupe requests, and revalidate in the background.'
          : 'Re-running fetch on every mount means spinners again and again, plus wasted bandwidth.'}
      </p>
    </div>
  );
}
