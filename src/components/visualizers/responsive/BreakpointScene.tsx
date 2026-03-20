"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface BreakpointSceneProps {
  variant: "overview" | "syntax";
}

function BreakpointVisualization({ showSyntax }: { showSyntax: boolean }) {
  const viewportRef = useRef<THREE.Mesh>(null);
  const widthRef = useRef(4);

  // Zone color refs
  const zoneColorRef = useRef(new THREE.Color("#3B82F6"));
  const zoneNameRef = useRef("tablet");
  const syntaxRef = useRef<THREE.Object3D>(null);

  // Breakpoint positions mapped to scene units
  // Map 0-1280px range to -5 to 5 (scene units)
  const pxToScene = (px: number) => (px / 1280) * 10 - 5;

  const bp480 = pxToScene(480);
  const bp768 = pxToScene(768);
  const bp1024 = pxToScene(1024);

  useFrame(({ clock }) => {
    const t = Math.sin(clock.getElapsedTime() * 0.4) * 0.5 + 0.5;
    // Viewport width oscillates from ~320px to ~1200px in scene units
    const minScene = pxToScene(320);
    const maxScene = pxToScene(1200);
    const rightEdge = THREE.MathUtils.lerp(minScene, maxScene, t);
    const leftEdge = -5;
    const w = rightEdge - leftEdge;
    widthRef.current = w;

    // Determine zone
    const pxWidth = THREE.MathUtils.lerp(320, 1200, t);
    let targetColor: string;
    let zoneName: string;

    if (pxWidth < 480) {
      targetColor = "#EF4444";
      zoneName = "Mobile (<480px)";
    } else if (pxWidth < 768) {
      targetColor = "#F59E0B";
      zoneName = "Phablet (480-768px)";
    } else if (pxWidth < 1024) {
      targetColor = "#3B82F6";
      zoneName = "Tablet (768-1024px)";
    } else {
      targetColor = "#10B981";
      zoneName = "Desktop (>1024px)";
    }

    zoneNameRef.current = zoneName;
    const target = new THREE.Color(targetColor);

    if (viewportRef.current) {
      viewportRef.current.scale.x = w / 4;
      viewportRef.current.position.x = leftEdge + w / 2;
      const mat = viewportRef.current.material as THREE.MeshBasicMaterial;
      mat.color.lerp(target, 0.08);
    }
  });

  return (
    <group>
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.24}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
      >
        Viewport width & breakpoints
      </Text>

      {/* Animated viewport zone */}
      <mesh ref={viewportRef} position={[0, 0, 0]}>
        <planeGeometry args={[4, 3]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.15} />
      </mesh>

      {/* Breakpoint lines */}
      <BreakpointLine x={bp480} label="480px" color="#F59E0B" />
      <BreakpointLine x={bp768} label="768px" color="#3B82F6" />
      <BreakpointLine x={bp1024} label="1024px" color="#10B981" />

      {/* Zone labels at bottom */}
      <Text
        position={[(pxToScene(0) + bp480) / 2, -2.0, 0]}
        fontSize={0.16}
        color="#EF4444"
        anchorX="center"
        anchorY="middle"
      >
        Mobile
      </Text>
      <Text
        position={[(bp480 + bp768) / 2, -2.0, 0]}
        fontSize={0.16}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
      >
        Phablet
      </Text>
      <Text
        position={[(bp768 + bp1024) / 2, -2.0, 0]}
        fontSize={0.16}
        color="#3B82F6"
        anchorX="center"
        anchorY="middle"
      >
        Tablet
      </Text>
      <Text
        position={[(bp1024 + 5) / 2, -2.0, 0]}
        fontSize={0.16}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
      >
        Desktop
      </Text>

      {/* Zone name display */}
      <ZoneNameDisplay widthRef={widthRef} zoneNameRef={zoneNameRef} />

      {/* Syntax annotation for syntax variant */}
      {showSyntax && <SyntaxAnnotation widthRef={widthRef} />}
    </group>
  );
}

function BreakpointLine({
  x,
  label,
  color,
}: {
  x: number;
  label: string;
  color: string;
}) {
  return (
    <group>
      <Line
        points={[
          [x, -1.5, 0.05],
          [x, 1.5, 0.05],
        ]}
        color={color}
        lineWidth={1.5}
        dashed
        dashSize={0.15}
        gapSize={0.1}
      />
      <Text
        position={[x, 1.8, 0]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function ZoneNameDisplay({
  widthRef,
  zoneNameRef,
}: {
  widthRef: React.RefObject<number>;
  zoneNameRef: React.RefObject<string>;
}) {
  const textRef = useRef<THREE.Object3D>(null);

  return (
    <Text
      ref={textRef}
      position={[0, -2.7, 0]}
      fontSize={0.22}
      color="#E2E8F0"
      anchorX="center"
      anchorY="middle"
    >
      Resize to see breakpoints activate
    </Text>
  );
}

function SyntaxAnnotation({
  widthRef,
}: {
  widthRef: React.RefObject<number>;
}) {
  return (
    <group position={[0, 2.2, 0.1]}>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[5.5, 0.5]} />
        <meshBasicMaterial color="#1E293B" transparent opacity={0.9} />
      </mesh>
      <Text
        position={[0, 0, 0]}
        fontSize={0.17}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {"@media (min-width: 768px) { ... }"}
      </Text>
    </group>
  );
}

export default function BreakpointScene({ variant }: BreakpointSceneProps) {
  return <BreakpointVisualization showSyntax={variant === "syntax"} />;
}
