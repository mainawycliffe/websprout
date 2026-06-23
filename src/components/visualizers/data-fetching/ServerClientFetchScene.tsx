'use client';

import { motion } from 'motion/react';
import { useCycle } from '../react-concepts/useCycle';

interface ServerClientFetchSceneProps {
  variant: 'client' | 'server';
}

const FLOWS: Record<ServerClientFetchSceneProps['variant'], string[]> = {
  client: [
    'Browser downloads JS, renders an empty shell',
    'Spinner shows — there is no data yet',
    'useEffect runs → fetch() to the API',
    'API responds with JSON',
    'Component re-renders with the data',
  ],
  server: [
    'Server runs the async component',
    'await fetch() happens on the server',
    'HTML is built WITH the data inside',
    'The finished page is sent to the browser',
    'User sees the data instantly — no spinner',
  ],
};

export default function ServerClientFetchScene({ variant }: ServerClientFetchSceneProps) {
  const isServer = variant === 'server';
  const steps = FLOWS[variant];
  const active = useCycle(steps.length, 1300);
  const dataNodeStep = isServer ? 1 : 3;

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-center text-sm font-semibold text-slate-100'>
        {isServer ? 'Server Components fetch on the server' : 'Client fetching happens in the browser'}
      </p>

      <div className='grid grid-cols-3 gap-2'>
        <NodeCard
          label='🌐 Browser'
          accent='#FB923C'
          sub={isServer ? 'shows the finished page' : 'runs useEffect & state'}
          active={isServer ? active >= 4 : true}
        />
        <NodeCard
          label='🖥️ Server'
          accent='#38BDF8'
          sub={isServer ? 'runs the component' : 'just serves files'}
          active={isServer ? active <= 3 : false}
          dim={!isServer}
        />
        <NodeCard label='🛢️ API / DB' accent='#A78BFA' sub='the data source' active={active === dataNodeStep} />
      </div>

      <div className='rounded-md border border-white/10 bg-slate-900/70 px-3 py-2'>
        <div className='flex items-center gap-2'>
          <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/30 text-[10px] font-bold text-sky-200'>
            {active + 1}
          </span>
          <motion.span
            key={active}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            className='text-xs text-slate-200'>
            {steps[active]}
          </motion.span>
        </div>
      </div>

      <p className='text-center text-xs text-slate-400'>
        {isServer
          ? 'No useEffect, no loading spinner, and your API keys stay on the server — the work is done before HTML reaches the user.'
          : 'The browser must download JS, then fetch, then re-render — that gap is the loading flicker users see.'}
      </p>
    </div>
  );
}

function NodeCard({
  label,
  accent,
  sub,
  active,
  dim,
}: {
  label: string;
  accent: string;
  sub: string;
  active: boolean;
  dim?: boolean;
}) {
  return (
    <motion.div
      animate={{
        opacity: dim ? 0.4 : active ? 1 : 0.55,
        borderColor: active ? accent : '#1e293b',
      }}
      className='flex flex-col items-center gap-1 rounded-lg border bg-slate-900/70 px-2 py-2.5 text-center'>
      <span className='text-[11px] font-semibold' style={{ color: accent }}>
        {label}
      </span>
      <span className='text-[9px] leading-tight text-slate-400'>{sub}</span>
      {active && (
        <motion.span
          className='mt-0.5 h-1.5 w-1.5 rounded-full'
          style={{ backgroundColor: accent }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
