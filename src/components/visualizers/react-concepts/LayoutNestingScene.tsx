'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useCycle } from './useCycle';

interface LayoutNestingSceneProps {
  variant: 'single' | 'nested';
}

const PAGES = ['Home', 'About', 'Pricing'];
const DASH_PAGES = ['Overview', 'Billing', 'Team'];

export default function LayoutNestingScene({ variant }: LayoutNestingSceneProps) {
  const page = useCycle(variant === 'single' ? PAGES.length : DASH_PAGES.length, 1700);
  const pages = variant === 'single' ? PAGES : DASH_PAGES;

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {variant === 'single'
          ? 'The layout persists — only {children} swaps on navigation'
          : 'Layouts nest: a section layout sits inside the root layout'}
      </p>

      {/* Root layout frame — stays put */}
      <div className='mx-auto w-full max-w-md rounded-lg border-2 border-indigo-400/50 bg-slate-900/60 p-3'>
        <div className='mb-2 flex items-center justify-between'>
          <span className='font-mono text-[10px] text-indigo-300'>app/layout.tsx</span>
          <div className='flex gap-1.5'>
            {pages.map((p, i) => (
              <span
                key={p}
                className={`rounded px-1.5 py-0.5 text-[9px] ${i === page ? 'bg-indigo-400/30 text-indigo-100' : 'bg-slate-800 text-slate-500'}`}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {variant === 'single' ? (
          <ChildrenSlot pages={pages} page={page} fileLabel='page.tsx' />
        ) : (
          // Nested layout frame inside the root
          <div className='rounded-md border-2 border-emerald-400/50 bg-slate-950/50 p-2'>
            <div className='mb-2 flex items-center gap-2'>
              <span className='font-mono text-[10px] text-emerald-300'>app/dashboard/layout.tsx</span>
              <span className='rounded bg-emerald-400/15 px-1.5 py-0.5 text-[9px] text-emerald-200'>sidebar stays</span>
            </div>
            <ChildrenSlot pages={pages} page={page} fileLabel='dashboard/[page]/page.tsx' />
          </div>
        )}

        <div className='mt-2 rounded bg-slate-800/70 px-2 py-1 text-center text-[9px] text-slate-500'>
          footer — defined once in the layout, shown on every page
        </div>
      </div>

      <p className='text-center text-xs text-slate-400'>
        {variant === 'single'
          ? 'Shared nav and footer live in layout.tsx. React keeps them mounted as the page changes.'
          : 'Each layout wraps the layouts and pages below it — shared UI without repeating yourself.'}
      </p>
    </div>
  );
}

function ChildrenSlot({ pages, page, fileLabel }: { pages: string[]; page: number; fileLabel: string }) {
  return (
    <div className='relative h-16 overflow-hidden rounded bg-slate-800/40'>
      <span className='absolute right-1.5 top-1 font-mono text-[8px] text-slate-600'>{fileLabel}</span>
      <AnimatePresence mode='wait'>
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className='flex h-full items-center justify-center'>
          <span className='rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100'>
            {pages[page]} page · {'{children}'}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
