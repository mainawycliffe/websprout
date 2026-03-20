"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import LabeledBox from "../shared/LabeledBox";

interface ViewportSceneProps {
  variant: "zoomed-out" | "correct";
}

function PhoneFrame({
  position,
  children,
}: {
  position: [number, number, number];
  children?: React.ReactNode;
}) {
  const w = 2.4;
  const h = 4;
  const hw = w / 2;
  const hh = h / 2;

  return (
    <group position={position}>
      {/* Phone body with rounded appearance */}
      <Line
        points={[
          [-hw, -hh, 0],
          [hw, -hh, 0],
          [hw, hh, 0],
          [-hw, hh, 0],
          [-hw, -hh, 0],
        ]}
        color="#64748B"
        lineWidth={3}
      />
      {/* Screen area */}
      <mesh position={[0, 0.1, -0.01]}>
        <planeGeometry args={[w - 0.2, h - 0.5]} />
        <meshBasicMaterial color="#1E293B" transparent opacity={0.5} />
      </mesh>
      {/* Notch */}
      <mesh position={[0, hh - 0.15, 0.01]}>
        <planeGeometry args={[0.8, 0.12]} />
        <meshBasicMaterial color="#64748B" />
      </mesh>
      {children}
    </group>
  );
}

function ZoomedOutContent() {
  const scaleRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (scaleRef.current) {
      // Oscillate between tiny and slightly less tiny to show the problem
      const t = Math.sin(clock.getElapsedTime() * 0.8) * 0.5 + 0.5;
      const s = THREE.MathUtils.lerp(0.22, 0.28, t);
      scaleRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group>
      <PhoneFrame position={[0, 0.3, 0]}>
        <group ref={scaleRef} position={[0, 0.1, 0.02]}>
          {/* Desktop-sized page content, shown tiny */}
          <LabeledBox
            position={[0, 1.5, 0]}
            width={8}
            height={1}
            color="#3B82F6"
            label="Navigation"
            labelSize={0.4}
            opacity={0.35}
          />
          <LabeledBox
            position={[0, 0, 0]}
            width={8}
            height={2}
            color="#8B5CF6"
            label="Hero Section"
            labelSize={0.5}
            opacity={0.35}
          />
          <LabeledBox
            position={[-2, -2, 0]}
            width={3.5}
            height={1.5}
            color="#06B6D4"
            label="Sidebar"
            labelSize={0.4}
            opacity={0.35}
          />
          <LabeledBox
            position={[2, -2, 0]}
            width={4}
            height={1.5}
            color="#06B6D4"
            label="Content"
            labelSize={0.4}
            opacity={0.35}
          />
        </group>
      </PhoneFrame>

      <Text
        position={[0, -2.6, 0]}
        fontSize={0.2}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
        textAlign="center"
      >
        {"Without viewport meta \u2014 page renders at 980px"}
      </Text>

      {/* Magnifying glass hint */}
      <Line
        points={[
          [1.8, 1.6, 0.1],
          [2.2, 2.0, 0.1],
        ]}
        color="#F59E0B"
        lineWidth={2}
      />
      <mesh position={[1.6, 1.4, 0.1]}>
        <ringGeometry args={[0.2, 0.28, 24]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>
      <Text
        position={[3.2, 2.2, 0]}
        fontSize={0.18}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
      >
        Tiny text!
      </Text>
    </group>
  );
}

function CorrectContent() {
  return (
    <group>
      <PhoneFrame position={[0, 0.3, 0]}>
        <group position={[0, 0.1, 0.02]}>
          {/* Content fits properly */}
          <LabeledBox
            position={[0, 1.2, 0]}
            width={2}
            height={0.5}
            color="#3B82F6"
            label="Nav"
            labelSize={0.2}
            opacity={0.5}
          />
          <LabeledBox
            position={[0, 0.4, 0]}
            width={2}
            height={0.8}
            color="#8B5CF6"
            label="Hero"
            labelSize={0.22}
            opacity={0.5}
          />
          <LabeledBox
            position={[0, -0.5, 0]}
            width={2}
            height={0.7}
            color="#06B6D4"
            label="Content"
            labelSize={0.2}
            opacity={0.5}
          />
          <LabeledBox
            position={[0, -1.2, 0]}
            width={2}
            height={0.5}
            color="#10B981"
            label="Footer"
            labelSize={0.2}
            opacity={0.5}
          />
        </group>
      </PhoneFrame>

      <Text
        position={[0, -2.6, 0]}
        fontSize={0.2}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
        textAlign="center"
      >
        {"With viewport meta \u2014 page renders at device width"}
      </Text>

      {/* Checkmark */}
      <Line
        points={[
          [2.0, 1.0, 0.1],
          [2.2, 0.8, 0.1],
          [2.6, 1.3, 0.1],
        ]}
        color="#10B981"
        lineWidth={3}
      />
      <Text
        position={[3.2, 1.1, 0]}
        fontSize={0.18}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
      >
        Readable!
      </Text>
    </group>
  );
}

export default function ViewportScene({ variant }: ViewportSceneProps) {
  if (variant === "correct") {
    return <CorrectContent />;
  }
  return <ZoomedOutContent />;
}
