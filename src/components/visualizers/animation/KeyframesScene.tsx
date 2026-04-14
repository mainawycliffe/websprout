'use client';

import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface KeyframesSceneProps {
  variant: 'comparison' | 'stages' | 'loop';
}

export default function KeyframesScene({ variant }: KeyframesSceneProps) {
  const transitionRef = useRef<THREE.Mesh>(null);
  const keyframeRef = useRef<THREE.Mesh>(null);
  const dotARef = useRef<THREE.Mesh>(null);
  const dotBRef = useRef<THREE.Mesh>(null);
  const dotCRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.6) % 1;

    if (variant === 'comparison' && transitionRef.current && keyframeRef.current) {
      transitionRef.current.position.x = THREE.MathUtils.lerp(-2, 2, (Math.sin(clock.getElapsedTime() * 2) + 1) / 2);

      if (t < 0.5) {
        keyframeRef.current.position.x = THREE.MathUtils.lerp(-2, 0.4, t / 0.5);
        keyframeRef.current.position.y = THREE.MathUtils.lerp(-0.7, 0.7, t / 0.5);
      } else {
        keyframeRef.current.position.x = THREE.MathUtils.lerp(0.4, 2, (t - 0.5) / 0.5);
        keyframeRef.current.position.y = THREE.MathUtils.lerp(0.7, -0.7, (t - 0.5) / 0.5);
      }
    }

    if (variant === 'stages' && keyframeRef.current) {
      if (t < 0.33) {
        keyframeRef.current.position.y = THREE.MathUtils.lerp(-0.5, 0.6, t / 0.33);
        keyframeRef.current.rotation.z = THREE.MathUtils.lerp(0, -0.2, t / 0.33);
      } else if (t < 0.66) {
        keyframeRef.current.position.y = THREE.MathUtils.lerp(0.6, 0.2, (t - 0.33) / 0.33);
        keyframeRef.current.rotation.z = THREE.MathUtils.lerp(-0.2, 0.15, (t - 0.33) / 0.33);
      } else {
        keyframeRef.current.position.y = THREE.MathUtils.lerp(0.2, -0.5, (t - 0.66) / 0.34);
        keyframeRef.current.rotation.z = THREE.MathUtils.lerp(0.15, 0, (t - 0.66) / 0.34);
      }
    }

    if (variant === 'loop') {
      [dotARef, dotBRef, dotCRef].forEach((ref, index) => {
        if (!ref.current) return;
        const phase = Math.sin(clock.getElapsedTime() * 3 + index * 0.8);
        const scale = 1 + Math.max(0, phase) * 0.45;
        ref.current.scale.set(scale, scale, 1);
      });
    }
  });

  return (
    <group>
      <Text position={[0, 2.75, 0]} fontSize={0.28} color='#E2E8F0' anchorX='center'>
        {variant === 'comparison'
          ? 'Transitions do two states. Keyframes do many.'
          : variant === 'stages'
            ? 'Keyframes mark moments on a timeline'
            : 'Looping motion for loaders and live states'}
      </Text>

      {variant === 'comparison' && (
        <>
          <Text position={[-2.75, 1.3, 0]} fontSize={0.18} color='#CBD5E1' anchorX='left'>
            Transition track
          </Text>
          <Text position={[-2.75, -0.15, 0]} fontSize={0.18} color='#CBD5E1' anchorX='left'>
            Keyframe track
          </Text>
          <mesh position={[0, 0.95, 0]}>
            <planeGeometry args={[4.8, 0.06]} />
            <meshBasicMaterial color='#1E293B' />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <planeGeometry args={[4.8, 0.06]} />
            <meshBasicMaterial color='#1E293B' />
          </mesh>
          <mesh ref={transitionRef} position={[-2, 0.95, 0.08]}>
            <planeGeometry args={[0.32, 0.32]} />
            <meshBasicMaterial color='#38BDF8' />
          </mesh>
          <mesh ref={keyframeRef} position={[-2, -0.5, 0.08]}>
            <planeGeometry args={[0.32, 0.32]} />
            <meshBasicMaterial color='#8B5CF6' />
          </mesh>
        </>
      )}

      {variant === 'stages' && (
        <>
          <Text position={[-2.2, -1.55, 0]} fontSize={0.16} color='#94A3B8'>
            0%
          </Text>
          <Text position={[0, -1.55, 0]} fontSize={0.16} color='#94A3B8'>
            50%
          </Text>
          <Text position={[2.2, -1.55, 0]} fontSize={0.16} color='#94A3B8'>
            100%
          </Text>
          <mesh position={[0, -1.1, 0]}>
            <planeGeometry args={[5.2, 0.06]} />
            <meshBasicMaterial color='#1E293B' />
          </mesh>
          <mesh ref={keyframeRef} position={[0, -0.5, 0.08]}>
            <planeGeometry args={[0.9, 0.4]} />
            <meshBasicMaterial color='#DDD6FE' />
          </mesh>
          <Text position={[0, -0.5, 0.12]} fontSize={0.16} color='#5B21B6' anchorX='center' anchorY='middle'>
            Badge
          </Text>
        </>
      )}

      {variant === 'loop' && (
        <>
          <mesh ref={dotARef} position={[-0.8, 0, 0.08]}>
            <planeGeometry args={[0.38, 0.38]} />
            <meshBasicMaterial color='#8B5CF6' />
          </mesh>
          <mesh ref={dotBRef} position={[0, 0, 0.08]}>
            <planeGeometry args={[0.38, 0.38]} />
            <meshBasicMaterial color='#6366F1' />
          </mesh>
          <mesh ref={dotCRef} position={[0.8, 0, 0.08]}>
            <planeGeometry args={[0.38, 0.38]} />
            <meshBasicMaterial color='#38BDF8' />
          </mesh>
          <Text position={[0, -1.2, 0]} fontSize={0.18} color='#CBD5E1' anchorX='center'>
            loading…
          </Text>
        </>
      )}

      <Text position={[0, -2.35, 0]} fontSize={0.18} color='#94A3B8' anchorX='center' maxWidth={6.2}>
        {variant === 'loop'
          ? 'Keyframes are ideal when the motion repeats or has more than one meaningful stage.'
          : 'Percent stops like 0%, 50%, and 100% let you shape a richer motion path over time.'}
      </Text>
    </group>
  );
}
