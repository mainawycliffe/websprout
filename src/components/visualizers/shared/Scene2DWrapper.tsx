'use client';

import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';

interface Scene2DWrapperProps {
  children: React.ReactNode;
  height?: number;
  bgColor?: string;
}

export default function Scene2DWrapper({ children, height = 320, bgColor = '#0F172A' }: Scene2DWrapperProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');

      setWebglSupported(Boolean(context));
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (webglSupported === false) {
    return (
      <div
        className='flex items-center justify-center rounded-md border border-white/10 bg-slate-950/90 px-6 text-center shadow-card'
        style={{ height }}>
        <div className='max-w-sm space-y-2'>
          <p className='text-sm font-semibold text-slate-100'>Interactive visual unavailable</p>
          <p className='text-sm leading-6 text-slate-400'>
            This browser or environment does not currently support WebGL, so the lesson content is still shown without
            the animated visual.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='rounded-md overflow-hidden shadow-card' style={{ height }}>
      <Canvas orthographic>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />
        <color attach='background' args={[bgColor]} />
        <ambientLight intensity={1} />
        {children}
      </Canvas>
    </div>
  );
}
