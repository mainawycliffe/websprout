"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import type { BoxLayerType } from "@/types/box-model";
import { BOX_LAYER_COLORS } from "@/types/box-model";

interface BoxLayerProps {
  type: BoxLayerType;
  width: number;
  height: number;
  depth: number;
  yOffset: number;
  targetYOffset: number;
  opacity?: number;
  highlighted?: boolean;
  showLabel?: boolean;
}

const SCALE = 0.01; // Convert px to 3D units

export default function BoxLayer({
  type,
  width,
  height,
  depth,
  yOffset,
  targetYOffset,
  opacity = 0.6,
  highlighted = false,
  showLabel = true,
}: BoxLayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = BOX_LAYER_COLORS[type];

  // Smoothly animate to target Y offset
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetYOffset * SCALE,
      0.1
    );
  });

  const w = Math.max(0.01, width * SCALE);
  const h = Math.max(0.01, height * SCALE);
  const d = Math.max(0.01, depth * SCALE);

  return (
    <group>
      <mesh ref={meshRef} position={[0, yOffset * SCALE, 0]}>
        <boxGeometry args={[w, d, h]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={highlighted ? 0.8 : opacity}
          side={THREE.DoubleSide}
        />
      </mesh>
      {showLabel && (
        <mesh position={[0, yOffset * SCALE, h / 2 + 0.05]}>
          <Text
            fontSize={0.12}
            color={color}
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {type}
          </Text>
        </mesh>
      )}
    </group>
  );
}
