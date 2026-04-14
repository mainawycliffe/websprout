'use client';

import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface TimingSceneProps {
  variant: 'compare' | 'ease-out';
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 2);
}

function easeIn(t: number) {
  return t * t;
}

export default function TimingScene({ variant }: TimingSceneProps) {
  const linearRef = useRef<THREE.Mesh>(null);
  const easeRef = useRef<THREE.Mesh>(null);
  const easeInRef = useRef<THREE.Mesh>(null);
  const easeOutRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const raw = (clock.getElapsedTime() * 0.35) % 1;
    const start = -2.3;
    const end = 2.3;
    const travel = end - start;

    const move = (ref: React.RefObject<THREE.Mesh | null>, progress: number) => {
      if (!ref.current) return;
      ref.current.position.x = start + travel * progress;
    };

    move(linearRef, raw);
    move(easeRef, easeInOut(raw));
    move(easeInRef, easeIn(raw));
    move(easeOutRef, easeOut(raw));
  });

  return (
    <group>
      <Text position={[0, 2.75, 0]} fontSize={0.28} color='#E2E8F0' anchorX='center'>
        {variant === 'compare' ? 'Same distance, different feeling' : 'ease-out settles gently'}
      </Text>

      {[
        { y: 1.3, label: 'linear', color: '#38BDF8', ref: linearRef },
        { y: 0.4, label: 'ease', color: '#8B5CF6', ref: easeRef },
        { y: -0.5, label: 'ease-in', color: '#F59E0B', ref: easeInRef },
        { y: -1.4, label: 'ease-out', color: '#10B981', ref: easeOutRef },
      ].map((track) => (
        <group key={track.label}>
          <mesh position={[0, track.y, 0]}>
            <planeGeometry args={[5.2, 0.06]} />
            <meshBasicMaterial color='#1E293B' />
          </mesh>
          <mesh ref={track.ref} position={[-2.3, track.y, 0.08]}>
            <planeGeometry args={[0.28, 0.28]} />
            <meshBasicMaterial color={track.color} />
          </mesh>
          <Text position={[-3.2, track.y, 0]} fontSize={0.18} color='#CBD5E1' anchorX='left' anchorY='middle'>
            {track.label}
          </Text>
        </group>
      ))}

      <Text position={[0, -2.35, 0]} fontSize={0.18} color='#94A3B8' anchorX='center' maxWidth={6.2}>
        {variant === 'compare'
          ? 'Timing functions change the speed curve, not the start or end point.'
          : 'ease-out starts faster and slows as it arrives, which often feels more natural for UI entrances.'}
      </Text>
    </group>
  );
}
