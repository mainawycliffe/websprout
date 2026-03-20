"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import LabeledBox from "../shared/LabeledBox";

interface DeviceFramesSceneProps {
  variant: "overflow" | "comparison";
}

function DeviceFrame({
  position,
  width,
  height,
  label,
  children,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  label: string;
  children?: React.ReactNode;
}) {
  const hw = width / 2;
  const hh = height / 2;

  return (
    <group position={position}>
      <Line
        points={[
          [-hw, -hh, 0],
          [hw, -hh, 0],
          [hw, hh, 0],
          [-hw, hh, 0],
          [-hw, -hh, 0],
        ]}
        color="#94A3B8"
        lineWidth={2}
      />
      <Text
        position={[0, -hh - 0.3, 0]}
        fontSize={0.2}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      {children}
    </group>
  );
}

function ClipIndicator({
  position,
  height,
}: {
  position: [number, number, number];
  height: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 4) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[0.12, height]} />
      <meshBasicMaterial color="#EF4444" transparent opacity={0.6} />
    </mesh>
  );
}

function OverflowVariant() {
  const contentWidth = 4;

  return (
    <group>
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.28}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
      >
        Fixed-width content across devices
      </Text>

      {/* Phone */}
      <DeviceFrame position={[-3.5, 0, 0]} width={2} height={3} label="Phone">
        <LabeledBox
          position={[0, 0, 0.05]}
          width={contentWidth}
          height={2.4}
          color="#3B82F6"
          label="Content (400px)"
          labelSize={0.18}
          opacity={0.4}
        />
        <ClipIndicator position={[1.0, 0, 0.1]} height={3} />
      </DeviceFrame>

      {/* Tablet */}
      <DeviceFrame position={[0, 0, 0]} width={3.5} height={3} label="Tablet">
        <LabeledBox
          position={[0, 0, 0.05]}
          width={contentWidth}
          height={2.4}
          color="#3B82F6"
          label="Content (400px)"
          labelSize={0.18}
          opacity={0.4}
        />
        <ClipIndicator position={[1.75, 0, 0.1]} height={3} />
      </DeviceFrame>

      {/* Desktop */}
      <DeviceFrame position={[4, 0, 0]} width={5} height={3} label="Desktop">
        <LabeledBox
          position={[0, 0, 0.05]}
          width={contentWidth}
          height={2.4}
          color="#3B82F6"
          label="Content (400px)"
          labelSize={0.18}
          opacity={0.5}
        />
      </DeviceFrame>
    </group>
  );
}

function ComparisonVariant() {
  return (
    <group>
      {/* Fixed row (top) */}
      <Text
        position={[-5, 2.4, 0]}
        fontSize={0.24}
        color="#EF4444"
        anchorX="left"
        anchorY="middle"
      >
        Fixed
      </Text>

      <DeviceFrame position={[-3.5, 1.2, 0]} width={1.6} height={1.8} label="">
        <LabeledBox
          position={[0, 0, 0.05]}
          width={3}
          height={1.2}
          color="#EF4444"
          label="400px"
          labelSize={0.16}
          opacity={0.35}
        />
        <ClipIndicator position={[0.8, 0, 0.1]} height={1.8} />
      </DeviceFrame>

      <DeviceFrame position={[0, 1.2, 0]} width={2.6} height={1.8} label="">
        <LabeledBox
          position={[0, 0, 0.05]}
          width={3}
          height={1.2}
          color="#EF4444"
          label="400px"
          labelSize={0.16}
          opacity={0.35}
        />
        <ClipIndicator position={[1.3, 0, 0.1]} height={1.8} />
      </DeviceFrame>

      <DeviceFrame position={[3.5, 1.2, 0]} width={3.8} height={1.8} label="">
        <LabeledBox
          position={[0, 0, 0.05]}
          width={3}
          height={1.2}
          color="#EF4444"
          label="400px"
          labelSize={0.16}
          opacity={0.35}
        />
      </DeviceFrame>

      {/* Fluid row (bottom) */}
      <Text
        position={[-5, -0.6, 0]}
        fontSize={0.24}
        color="#10B981"
        anchorX="left"
        anchorY="middle"
      >
        Fluid
      </Text>

      <DeviceFrame position={[-3.5, -1.8, 0]} width={1.6} height={1.8} label="">
        <LabeledBox
          position={[0, 0, 0.05]}
          width={1.2}
          height={1.2}
          color="#10B981"
          label="100%"
          labelSize={0.16}
          opacity={0.5}
        />
      </DeviceFrame>

      <DeviceFrame position={[0, -1.8, 0]} width={2.6} height={1.8} label="">
        <LabeledBox
          position={[0, 0, 0.05]}
          width={2.2}
          height={1.2}
          color="#10B981"
          label="100%"
          labelSize={0.16}
          opacity={0.5}
        />
      </DeviceFrame>

      <DeviceFrame position={[3.5, -1.8, 0]} width={3.8} height={1.8} label="">
        <LabeledBox
          position={[0, 0, 0.05]}
          width={3.4}
          height={1.2}
          color="#10B981"
          label="100%"
          labelSize={0.16}
          opacity={0.5}
        />
      </DeviceFrame>
    </group>
  );
}

export default function DeviceFramesScene({ variant }: DeviceFramesSceneProps) {
  if (variant === "comparison") {
    return <ComparisonVariant />;
  }
  return <OverflowVariant />;
}
