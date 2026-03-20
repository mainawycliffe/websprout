"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PulsingDotProps {
  position: [number, number, number];
  color?: string;
  size?: number;
}

export default function PulsingDot({
  position,
  color = "#3B82F6",
  size = 0.12,
}: PulsingDotProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
      meshRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <circleGeometry args={[size, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}
