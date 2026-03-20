"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface LabeledBoxProps {
  position: [number, number, number];
  width: number;
  height: number;
  color: string;
  label?: string;
  labelSize?: number;
  labelColor?: string;
  opacity?: number;
  highlighted?: boolean;
  borderRadius?: number;
}

export default function LabeledBox({
  position,
  width,
  height,
  color,
  label,
  labelSize = 0.28,
  labelColor = "#ffffff",
  opacity = 0.6,
  highlighted = false,
}: LabeledBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetOpacity = highlighted ? 1 : opacity;

  useFrame(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </mesh>
      {label && (
        <Text
          position={[0, 0, 0.1]}
          fontSize={labelSize}
          color={labelColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={width - 0.2}
        >
          {label}
        </Text>
      )}
    </group>
  );
}
