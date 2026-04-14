'use client';

import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface ReducedMotionSceneProps {
  variant: 'contrast' | 'query';
}

export default function ReducedMotionScene({ variant }: ReducedMotionSceneProps) {
  const animatedRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!animatedRef.current) return;
    const wave = Math.sin(clock.getElapsedTime() * 2.8);
    animatedRef.current.scale.setScalar(1 + Math.max(0, wave) * 0.08);
  });

  return (
    <group>
      <Text position={[0, 2.75, 0]} fontSize={0.28} color='#E2E8F0' anchorX='center'>
        {variant === 'contrast' ? 'Motion should stay optional' : 'CSS can listen to reduced-motion preferences'}
      </Text>

      <Text position={[-2.1, 1.8, 0]} fontSize={0.18} color='#CBD5E1' anchorX='center'>
        Full motion
      </Text>
      <Text position={[2.1, 1.8, 0]} fontSize={0.18} color='#CBD5E1' anchorX='center'>
        Reduced motion
      </Text>

      <mesh position={[-2.1, 0.2, 0]}>
        <planeGeometry args={[2.6, 2.2]} />
        <meshBasicMaterial color='#111827' />
      </mesh>
      <mesh position={[2.1, 0.2, 0]}>
        <planeGeometry args={[2.6, 2.2]} />
        <meshBasicMaterial color='#111827' />
      </mesh>

      <mesh ref={animatedRef} position={[-2.1, 0.2, 0.08]}>
        <planeGeometry args={[1.35, 0.58]} />
        <meshBasicMaterial color='#8B5CF6' />
      </mesh>
      <mesh position={[2.1, 0.2, 0.08]}>
        <planeGeometry args={[1.35, 0.58]} />
        <meshBasicMaterial color='#8B5CF6' />
      </mesh>

      <Text position={[-2.1, 0.2, 0.12]} fontSize={0.18} color='#FFFFFF' anchorX='center' anchorY='middle'>
        Join now
      </Text>
      <Text position={[2.1, 0.2, 0.12]} fontSize={0.18} color='#FFFFFF' anchorX='center' anchorY='middle'>
        Join now
      </Text>

      {variant === 'query' && (
        <>
          <mesh position={[0, -1.1, 0]}>
            <planeGeometry args={[5.6, 0.9]} />
            <meshBasicMaterial color='#1E293B' />
          </mesh>
          <Text position={[0, -1.1, 0.08]} fontSize={0.17} color='#CBD5E1' anchorX='center' maxWidth={5.1}>
            {'@media (prefers-reduced-motion: reduce) { animation: none; }'}
          </Text>
        </>
      )}

      <Text position={[0, -2.25, 0]} fontSize={0.18} color='#94A3B8' anchorX='center' maxWidth={6.2}>
        {variant === 'contrast'
          ? 'The content stays the same in both versions. Only the amount of motion changes.'
          : 'The browser exposes the user preference; your CSS decides how to honor it.'}
      </Text>
    </group>
  );
}
