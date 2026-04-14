'use client';

import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface MotionCardSceneProps {
  variant: 'purpose' | 'feedback' | 'transition' | 'transforms' | 'capstone' | 'button-lab';
}

export default function MotionCardScene({ variant }: MotionCardSceneProps) {
  const cardRef = useRef<THREE.Group>(null);
  const badgeRef = useRef<THREE.Mesh>(null);
  const buttonRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const wave = Math.sin(t * 2.2);

    if (cardRef.current) {
      cardRef.current.position.y = 0;
      cardRef.current.rotation.z = 0;
      cardRef.current.scale.setScalar(1);

      if (variant === 'purpose') {
        cardRef.current.position.y = wave * 0.08;
      }

      if (variant === 'transition' || variant === 'capstone') {
        cardRef.current.position.y = Math.max(0, wave) * 0.2;
      }

      if (variant === 'transforms') {
        cardRef.current.position.y = Math.max(0, wave) * 0.14;
        cardRef.current.rotation.z = wave * 0.06;
        cardRef.current.scale.setScalar(1 + Math.max(0, wave) * 0.04);
      }
    }

    if (badgeRef.current) {
      badgeRef.current.scale.setScalar(1);
      badgeRef.current.rotation.z = 0;

      if (variant === 'feedback') {
        badgeRef.current.scale.setScalar(1 + Math.max(0, wave) * 0.08);
      }

      if (variant === 'capstone') {
        badgeRef.current.position.y = 1.15 + wave * 0.06;
      }
    }

    if (buttonRef.current) {
      buttonRef.current.scale.set(1, 1, 1);
      if (variant === 'feedback' || variant === 'button-lab') {
        const hover = 1 + Math.max(0, wave) * 0.04;
        buttonRef.current.scale.set(hover, hover, 1);
      }
    }
  });

  const label = {
    purpose: 'Motion explains change',
    feedback: 'Hover feedback',
    transition: 'Two states, one smooth bridge',
    transforms: 'translate + scale + rotate',
    capstone: 'Layered card motion',
    'button-lab': 'Button hover and press',
  }[variant];

  return (
    <group>
      <Text position={[0, 2.75, 0]} fontSize={0.28} color='#E2E8F0' anchorX='center'>
        {label}
      </Text>

      <group ref={cardRef} position={[0, 0.15, 0]}>
        <mesh>
          <planeGeometry args={[4.5, 3.1]} />
          <meshBasicMaterial color='#F8FAFC' />
        </mesh>
        <mesh position={[0, 0.65, 0.05]}>
          <planeGeometry args={[3.7, 0.9]} />
          <meshBasicMaterial color='#E2E8F0' />
        </mesh>
        <mesh ref={badgeRef} position={[-1.45, 1.15, 0.08]}>
          <planeGeometry args={[0.9, 0.38]} />
          <meshBasicMaterial color='#DDD6FE' />
        </mesh>
        <Text position={[-1.45, 1.15, 0.12]} fontSize={0.16} color='#5B21B6' anchorX='center' anchorY='middle'>
          New
        </Text>
        <Text position={[0, 0.1, 0.1]} fontSize={0.22} color='#0F172A' anchorX='center'>
          Motion kit
        </Text>
        <Text position={[0, -0.3, 0.1]} fontSize={0.16} color='#475569' anchorX='center' maxWidth={3.2}>
          Clear, subtle interface feedback
        </Text>
        <mesh ref={buttonRef} position={[0, -1.02, 0.08]}>
          <planeGeometry args={[2.2, 0.52]} />
          <meshBasicMaterial color={variant === 'button-lab' ? '#0F172A' : '#8B5CF6'} />
        </mesh>
        <Text position={[0, -1.02, 0.12]} fontSize={0.18} color='#FFFFFF' anchorX='center' anchorY='middle'>
          {variant === 'button-lab' ? 'Save changes' : 'Preview'}
        </Text>
      </group>

      <Text position={[0, -2.3, 0]} fontSize={0.18} color='#94A3B8' anchorX='center' maxWidth={6.2}>
        {variant === 'transforms'
          ? 'Transforms change how the card is drawn without pushing neighbors away.'
          : variant === 'capstone'
            ? 'A polished UI combines hover feedback, subtle ambient motion, and accessibility fallbacks.'
            : 'Small motion cues can tell the user what changed and what can be clicked.'}
      </Text>
    </group>
  );
}
