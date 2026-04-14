'use client';

import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface PerformanceSceneProps {
  variant: 'transform' | 'compare' | 'safe' | 'caution';
}

export default function PerformanceScene({ variant }: PerformanceSceneProps) {
  const smoothRef = useRef<THREE.Mesh>(null);
  const jankyRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const wave = Math.sin(clock.getElapsedTime() * 2);

    if (smoothRef.current) {
      smoothRef.current.position.x = wave * 1.2;
      smoothRef.current.scale.y = 1;
    }

    if (jankyRef.current) {
      jankyRef.current.position.x = variant === 'compare' ? 0 : wave * 1.2;
      jankyRef.current.scale.y = variant === 'compare' ? 1 + Math.max(0, wave) * 0.45 : 1;
    }
  });

  return (
    <group>
      <Text position={[0, 2.75, 0]} fontSize={0.28} color='#E2E8F0' anchorX='center'>
        {variant === 'caution' ? 'Use will-change sparingly' : 'Smooth motion prefers transform and opacity'}
      </Text>

      {variant !== 'caution' && (
        <>
          <Text position={[-2.2, 1.75, 0]} fontSize={0.18} color='#CBD5E1' anchorX='center'>
            transform / opacity
          </Text>
          <Text position={[2.2, 1.75, 0]} fontSize={0.18} color='#CBD5E1' anchorX='center'>
            layout-heavy motion
          </Text>

          <mesh position={[-2.2, 0.1, 0]}>
            <planeGeometry args={[2.4, 2.4]} />
            <meshBasicMaterial color='#0F172A' />
          </mesh>
          <mesh position={[2.2, 0.1, 0]}>
            <planeGeometry args={[2.4, 2.4]} />
            <meshBasicMaterial color='#0F172A' />
          </mesh>

          <mesh ref={smoothRef} position={[-2.2, 0.1, 0.08]}>
            <planeGeometry args={[1.05, 0.7]} />
            <meshBasicMaterial color='#10B981' />
          </mesh>
          <mesh ref={jankyRef} position={[2.2, 0.1, 0.08]}>
            <planeGeometry args={[1.05, 0.7]} />
            <meshBasicMaterial color='#F97316' />
          </mesh>
        </>
      )}

      {variant === 'caution' && (
        <>
          <mesh position={[0, 0.5, 0]}>
            <planeGeometry args={[4.8, 1.6]} />
            <meshBasicMaterial color='#1E293B' />
          </mesh>
          <Text position={[0, 0.85, 0.08]} fontSize={0.2} color='#F8FAFC' anchorX='center'>
            will-change: transform;
          </Text>
          <Text position={[0, 0.2, 0.08]} fontSize={0.16} color='#CBD5E1' anchorX='center' maxWidth={4.1}>
            Use it as a targeted hint, not a blanket default on every animated element.
          </Text>
        </>
      )}

      <Text position={[0, -2.2, 0]} fontSize={0.18} color='#94A3B8' anchorX='center' maxWidth={6.3}>
        {variant === 'compare'
          ? 'The left card moves visually with transform. The right card simulates a more layout-heavy change.'
          : variant === 'safe'
            ? 'For common UI polish, start by animating transform and opacity before reaching for heavier properties.'
            : variant === 'caution'
              ? 'Hints like will-change can help in specific cases, but overusing them wastes resources.'
              : 'Transforms change how an element is drawn after layout, which is why they are so common in performant animation.'}
      </Text>
    </group>
  );
}
