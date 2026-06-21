'use client';

import { motion } from 'motion/react';
import { useCycle } from './useCycle';

interface FileRouteSceneProps {
  variant: 'routing' | 'dynamic';
}

const ROUTES: Record<FileRouteSceneProps['variant'], { file: string; depth: number; url: string }[]> = {
  routing: [
    { file: 'app/page.tsx', depth: 0, url: '/' },
    { file: 'app/about/page.tsx', depth: 1, url: '/about' },
    { file: 'app/blog/page.tsx', depth: 1, url: '/blog' },
    { file: 'app/dashboard/settings/page.tsx', depth: 2, url: '/dashboard/settings' },
  ],
  dynamic: [
    { file: 'app/blog/[slug]/page.tsx', depth: 2, url: '/blog/hello-world' },
    { file: 'app/blog/[slug]/page.tsx', depth: 2, url: '/blog/react-tips' },
    { file: 'app/shop/[id]/page.tsx', depth: 2, url: '/shop/42' },
  ],
};

export default function FileRouteScene({ variant }: FileRouteSceneProps) {
  const routes = ROUTES[variant];
  const active = useCycle(routes.length, 1600);
  const current = routes[active];

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {variant === 'routing'
          ? 'Folders in app/ become URL segments — no router config'
          : 'A [folder] becomes a dynamic segment that matches anything'}
      </p>

      <div className='grid grid-cols-2 items-center gap-4'>
        {/* File tree */}
        <div className='rounded-lg border border-white/10 bg-slate-900/70 p-3 font-mono text-[11px]'>
          {routes.map((r, i) => (
            <motion.div
              key={r.file + i}
              animate={{
                color: i === active ? '#22D3EE' : '#94A3B8',
                backgroundColor: i === active ? '#22D3EE15' : 'transparent',
              }}
              className='truncate rounded px-1.5 py-1'
              style={{ paddingLeft: `${r.depth * 12 + 6}px` }}>
              📄 {r.file.split('/').slice(1).join('/')}
            </motion.div>
          ))}
        </div>

        {/* Browser URL bar + arrow */}
        <div className='flex flex-col items-center gap-3'>
          <span className='text-lg text-cyan-300'>→</span>
          <div className='w-full rounded-full border border-white/15 bg-slate-800 px-3 py-2'>
            <div className='flex items-center gap-2'>
              <span className='h-2 w-2 rounded-full bg-emerald-400/70' />
              <motion.span
                key={current.url}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                className='font-mono text-xs text-slate-200'>
                yoursite.com<span className='text-cyan-300'>{current.url}</span>
              </motion.span>
            </div>
          </div>
          {variant === 'dynamic' && (
            <p className='text-center text-[10px] text-slate-400'>
              params.slug = <span className='text-cyan-300'>&quot;{current.url.split('/').pop()}&quot;</span>
            </p>
          )}
        </div>
      </div>

      <p className='text-center text-xs text-slate-400'>
        {variant === 'routing'
          ? 'The file named page.tsx is what renders at that URL. The folder path IS the route.'
          : 'One file serves infinitely many pages — the segment value arrives as a prop.'}
      </p>
    </div>
  );
}
