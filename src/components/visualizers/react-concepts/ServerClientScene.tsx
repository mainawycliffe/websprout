'use client';

import { motion } from 'motion/react';

interface ServerClientSceneProps {
  variant: 'default' | 'boundary';
}

export default function ServerClientScene({ variant }: ServerClientSceneProps) {
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {variant === 'default'
          ? 'Components run on the SERVER by default'
          : '"use client" moves a component to the BROWSER'}
      </p>

      <div className='grid grid-cols-[1fr_auto_1fr] items-stretch gap-2'>
        {/* Server panel */}
        <Panel title='🖥️ Server' accent='#22D3EE'>
          <Chip label='<Page />' accent='#22D3EE' />
          <Chip label='<ProductList />' accent='#22D3EE' />
          <Chip label='await db.query()' accent='#22D3EE' mono />
          <p className='mt-1 text-[9px] text-slate-400'>can read files, secrets, the database — runs once, sends HTML</p>
        </Panel>

        {/* Boundary */}
        <div className='relative flex flex-col items-center justify-center'>
          <div className='h-full w-px border-l-2 border-dashed border-amber-400/50' />
          <motion.span
            className='absolute rounded bg-amber-400/15 px-1.5 py-0.5 text-[9px] font-medium text-amber-200'
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}>
            boundary
          </motion.span>
        </div>

        {/* Browser panel */}
        <Panel title='🌐 Browser' accent='#FB923C'>
          <motion.div
            animate={variant === 'boundary' ? { x: [12, 0], opacity: [0, 1] } : {}}
            transition={{ duration: 0.6 }}>
            <Chip label='"use client"' accent='#FB923C' mono />
          </motion.div>
          <Chip label='<AddToCart />' accent='#FB923C' interactive={variant === 'boundary'} />
          <Chip label='useState / onClick' accent='#FB923C' mono />
          <p className='mt-1 text-[9px] text-slate-400'>can use state, effects, events, the DOM — interactive</p>
        </Panel>
      </div>

      <p className='text-center text-xs text-slate-400'>
        {variant === 'default'
          ? 'Server components keep heavy work and secrets off the user’s device and ship less JavaScript.'
          : 'Add "use client" at the top of a file only when you need interactivity. It opts that subtree into the browser.'}
      </p>
    </div>
  );
}

function Panel({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className='rounded-lg border bg-slate-900/70 p-2.5' style={{ borderColor: `${accent}55` }}>
      <p className='mb-1.5 text-[11px] font-semibold' style={{ color: accent }}>
        {title}
      </p>
      <div className='flex flex-col gap-1'>{children}</div>
    </div>
  );
}

function Chip({
  label,
  accent,
  mono,
  interactive,
}: {
  label: string;
  accent: string;
  mono?: boolean;
  interactive?: boolean;
}) {
  return (
    <motion.span
      animate={interactive ? { scale: [1, 1.05, 1] } : {}}
      transition={interactive ? { duration: 1.2, repeat: Infinity } : {}}
      className={`rounded border px-2 py-0.5 text-[10px] text-slate-200 ${mono ? 'font-mono' : ''}`}
      style={{ borderColor: `${accent}55`, backgroundColor: `${accent}12` }}>
      {label}
    </motion.span>
  );
}
