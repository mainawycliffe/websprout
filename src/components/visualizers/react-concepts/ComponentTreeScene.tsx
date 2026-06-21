'use client';

import { motion } from 'motion/react';
import { useCycle } from './useCycle';

interface ComponentTreeSceneProps {
  variant: 'intro' | 'breakdown';
}

// Each region in the mock UI maps to a node in the component tree.
const NODES = [
  { key: 'App', label: '<App />', region: 'all', color: '#22D3EE' },
  { key: 'Header', label: '<Header />', region: 'header', color: '#818CF8' },
  { key: 'Card1', label: '<Card />', region: 'card1', color: '#34D399' },
  { key: 'Card2', label: '<Card />', region: 'card2', color: '#34D399' },
  { key: 'Card3', label: '<Card />', region: 'card3', color: '#34D399' },
  { key: 'Footer', label: '<Footer />', region: 'footer', color: '#FBBF24' },
];

export default function ComponentTreeScene({ variant }: ComponentTreeSceneProps) {
  const active = useCycle(NODES.length, 1300);
  const activeNode = NODES[active];

  const isActiveRegion = (region: string) => activeNode.region === region || activeNode.region === 'all';

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {variant === 'intro'
          ? 'A component is a reusable piece of UI'
          : 'One screen, broken into a tree of components'}
      </p>

      <div className='grid grid-cols-2 gap-5'>
        {/* Left: the rendered UI mock */}
        <div className='rounded-lg border border-white/10 bg-slate-900/70 p-2'>
          <div className='mb-1 flex gap-1'>
            <span className='h-2 w-2 rounded-full bg-rose-400/70' />
            <span className='h-2 w-2 rounded-full bg-amber-400/70' />
            <span className='h-2 w-2 rounded-full bg-emerald-400/70' />
          </div>
          <motion.div
            animate={{ borderColor: isActiveRegion('header') ? '#818CF8' : 'rgba(255,255,255,0.08)' }}
            className='mb-2 rounded-md border-2 px-2 py-2 text-center text-[10px] font-medium text-slate-300'>
            Header / nav
          </motion.div>
          <div className='mb-2 grid grid-cols-3 gap-1.5'>
            {['card1', 'card2', 'card3'].map((r) => (
              <motion.div
                key={r}
                animate={{
                  borderColor: isActiveRegion(r) ? '#34D399' : 'rgba(255,255,255,0.08)',
                  scale: isActiveRegion(r) ? 1.04 : 1,
                }}
                className='rounded-md border-2 px-1 py-3 text-center text-[9px] text-slate-400'>
                Card
              </motion.div>
            ))}
          </div>
          <motion.div
            animate={{ borderColor: isActiveRegion('footer') ? '#FBBF24' : 'rgba(255,255,255,0.08)' }}
            className='rounded-md border-2 px-2 py-1.5 text-center text-[10px] font-medium text-slate-300'>
            Footer
          </motion.div>
        </div>

        {/* Right: the component tree */}
        <div className='flex flex-col items-center justify-center gap-2'>
          <TreeNode label='<App />' color='#22D3EE' active={activeNode.key === 'App'} />
          <div className='h-3 w-px bg-white/15' />
          <div className='flex w-full items-start justify-center gap-2'>
            <div className='flex flex-col items-center'>
              <TreeNode label='<Header />' color='#818CF8' active={activeNode.key === 'Header'} small />
            </div>
            <div className='flex flex-col items-center'>
              <span className='mb-1 text-[9px] text-slate-500'>×3</span>
              <TreeNode
                label='<Card />'
                color='#34D399'
                active={activeNode.region.startsWith('card')}
                small
              />
            </div>
            <div className='flex flex-col items-center'>
              <TreeNode label='<Footer />' color='#FBBF24' active={activeNode.key === 'Footer'} small />
            </div>
          </div>
        </div>
      </div>

      <p className='text-center text-xs text-slate-400'>
        {variant === 'intro'
          ? 'The same <Card /> is written once and reused three times.'
          : 'Build each piece once, then compose them — like LEGO bricks.'}
      </p>
    </div>
  );
}

function TreeNode({
  label,
  color,
  active,
  small,
}: {
  label: string;
  color: string;
  active: boolean;
  small?: boolean;
}) {
  return (
    <motion.div
      animate={{
        backgroundColor: active ? `${color}22` : 'rgba(15,23,42,0.8)',
        borderColor: active ? color : 'rgba(255,255,255,0.12)',
        scale: active ? 1.06 : 1,
      }}
      className={`rounded-md border font-mono text-slate-200 ${small ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'}`}
      style={{ color: active ? color : undefined }}>
      {label}
    </motion.div>
  );
}
