"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface AnimatedArrowProps {
  from: [number, number];
  to: [number, number];
  color?: string;
  animated?: boolean;
  visible?: boolean;
  lineWidth?: number;
  label?: string;
  labelSize?: number;
}

export default function AnimatedArrow({
  from,
  to,
  color = "#3B82F6",
  animated = false,
  visible = true,
  lineWidth = 2,
  label,
  labelSize = 0.22,
}: AnimatedArrowProps) {
  const dotRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);

  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const angle = Math.atan2(dy, dx);

  const arrowHeadSize = 0.2;
  const lineEnd: [number, number] = [
    to[0] - Math.cos(angle) * arrowHeadSize,
    to[1] - Math.sin(angle) * arrowHeadSize,
  ];

  const triangleShape = useMemo(() => {
    const s = arrowHeadSize;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-s * 2, s * 0.6);
    shape.lineTo(-s * 2, -s * 0.6);
    shape.closePath();
    return shape;
  }, []);

  useFrame((_, delta) => {
    if (animated && dotRef.current && visible) {
      progressRef.current = (progressRef.current + delta * 0.8) % 1;
      const t = progressRef.current;
      dotRef.current.position.x = from[0] + dx * t;
      dotRef.current.position.y = from[1] + dy * t;
    }
  });

  const midX = (from[0] + to[0]) / 2;
  const midY = (from[1] + to[1]) / 2;

  if (!visible) return null;

  return (
    <group>
      <Line
        points={[
          [from[0], from[1], 0],
          [lineEnd[0], lineEnd[1], 0],
        ]}
        color={color}
        lineWidth={lineWidth}
      />
      <mesh position={[to[0], to[1], 0]} rotation={[0, 0, angle]}>
        <shapeGeometry args={[triangleShape]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {animated && (
        <mesh ref={dotRef} position={[from[0], from[1], 0.1]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      )}
      {label && (
        <Text
          position={[midX, midY + 0.3, 0.2]}
          fontSize={labelSize}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
}
