"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

interface UnitsComparisonSceneProps {
  variant: "px" | "percent" | "em-rem" | "vw-vh" | "fixed-text" | "clamp";
}

function AnimatedContainer({
  children,
  minWidth = 3,
  maxWidth = 6,
  speed = 0.6,
  height = 4,
  yOffset = 0,
}: {
  children: (containerWidth: React.RefObject<number>) => React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  speed?: number;
  height?: number;
  yOffset?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const widthRef = useRef(maxWidth);
  const outlineRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = Math.sin(clock.getElapsedTime() * speed) * 0.5 + 0.5;
    widthRef.current = THREE.MathUtils.lerp(minWidth, maxWidth, t);
  });

  return (
    <group position={[0, yOffset, 0]}>
      <group ref={groupRef}>
        {/* Container outline - re-rendered via useFrame */}
        <ContainerOutline
          widthRef={widthRef}
          height={height}
          ref={outlineRef}
        />
        {children(widthRef)}
      </group>
    </group>
  );
}

import { forwardRef } from "react";

const ContainerOutline = forwardRef<
  THREE.Group,
  { widthRef: React.RefObject<number>; height: number }
>(function ContainerOutline({ widthRef, height }, ref) {
  const lineRef = useRef<THREE.Group>(null);
  const p1 = useRef(new THREE.Vector3());
  const p2 = useRef(new THREE.Vector3());
  const p3 = useRef(new THREE.Vector3());
  const p4 = useRef(new THREE.Vector3());

  useFrame(() => {
    if (lineRef.current) {
      const hw = widthRef.current / 2;
      const hh = height / 2;
      // We update the line positions via the parent group scale instead
      lineRef.current.scale.x = widthRef.current / 6;
    }
  });

  const hh = height / 2;
  // Drawn at width=6, scaled dynamically
  return (
    <group ref={ref}>
      <group ref={lineRef}>
        <Line
          points={[
            [-3, -hh, 0],
            [3, -hh, 0],
            [3, hh, 0],
            [-3, hh, 0],
            [-3, -hh, 0],
          ]}
          color="#475569"
          lineWidth={1.5}
          dashed
          dashSize={0.15}
          gapSize={0.1}
        />
      </group>
      <ContainerLabel widthRef={widthRef} y={hh + 0.3} />
    </group>
  );
});

function ContainerLabel({
  widthRef,
  y,
}: {
  widthRef: React.RefObject<number>;
  y: number;
}) {
  const textRef = useRef<THREE.Object3D>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (textRef.current) {
      // Position label at top-right of container
      textRef.current.position.x = widthRef.current / 2;
    }
    if (meshRef.current) {
      meshRef.current.position.x = widthRef.current / 2;
    }
  });

  return (
    <>
      <Text
        ref={textRef}
        position={[3, y, 0]}
        fontSize={0.18}
        color="#64748B"
        anchorX="center"
        anchorY="middle"
      >
        Container
      </Text>
    </>
  );
}

function PxVariant() {
  const barRef = useRef<THREE.Mesh>(null);
  const clipRef = useRef<THREE.Mesh>(null);
  const barWidth = 2;

  return (
    <AnimatedContainer>
      {(widthRef) => (
        <PxBar widthRef={widthRef} barWidth={barWidth} />
      )}
    </AnimatedContainer>
  );
}

function PxBar({
  widthRef,
  barWidth,
}: {
  widthRef: React.RefObject<number>;
  barWidth: number;
}) {
  const clipRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (clipRef.current) {
      const overflow = barWidth > widthRef.current;
      const mat = clipRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(
        mat.opacity,
        overflow ? 0.6 : 0,
        0.1
      );
      clipRef.current.position.x = widthRef.current / 2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[barWidth, 0.6]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        200px (fixed)
      </Text>
      {/* Clip indicator */}
      <mesh ref={clipRef} position={[1.5, 0, 0.1]}>
        <planeGeometry args={[0.1, 0.8]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0} />
      </mesh>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        px stays the same size
      </Text>
    </group>
  );
}

function PercentVariant() {
  return (
    <AnimatedContainer>
      {(widthRef) => <PercentBar widthRef={widthRef} />}
    </AnimatedContainer>
  );
}

function PercentBar({ widthRef }: { widthRef: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const w = widthRef.current * 0.5;
      meshRef.current.scale.x = w / 2; // base geometry is width=2
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} position={[0, 0, 0.05]}>
        <planeGeometry args={[2, 0.6]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        50%
      </Text>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Scales with container
      </Text>
    </group>
  );
}

function EmRemVariant() {
  return (
    <AnimatedContainer height={4.5}>
      {(widthRef) => <EmRemBars widthRef={widthRef} />}
    </AnimatedContainer>
  );
}

function EmRemBars({ widthRef }: { widthRef: React.RefObject<number> }) {
  const emRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (emRef.current) {
      // em scales relative to parent (container)
      const scale = widthRef.current / 6;
      emRef.current.scale.x = scale;
    }
  });

  return (
    <group>
      {/* em bar - scales with parent */}
      <group position={[0, 0.5, 0]}>
        <mesh ref={emRef} position={[0, 0, 0.05]}>
          <planeGeometry args={[2.5, 0.5]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.7} />
        </mesh>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          1em (relative to parent)
        </Text>
      </group>

      {/* rem bar - stays fixed to root */}
      <group position={[0, -0.5, 0]}>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.5, 0.5]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.7} />
        </mesh>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          1rem (fixed to root)
        </Text>
      </group>

      <Text
        position={[0, -1.4, 0]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        em scales with parent, rem stays constant
      </Text>
    </group>
  );
}

function VwVhVariant() {
  return (
    <AnimatedContainer>
      {(widthRef) => <VwBar widthRef={widthRef} />}
    </AnimatedContainer>
  );
}

function VwBar({ widthRef }: { widthRef: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const w = widthRef.current * 0.5;
      meshRef.current.scale.x = w / 2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} position={[0, 0, 0.05]}>
        <planeGeometry args={[2, 0.6]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        50vw
      </Text>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        {"Viewport = container here"}
      </Text>
    </group>
  );
}

function FixedTextVariant() {
  return (
    <AnimatedContainer minWidth={1.5} maxWidth={5}>
      {(widthRef) => <FixedTextBars widthRef={widthRef} />}
    </AnimatedContainer>
  );
}

function FixedTextBars({ widthRef }: { widthRef: React.RefObject<number> }) {
  const clipRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (clipRef.current) {
      const overflow = widthRef.current < 2.5;
      const mat = clipRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(
        mat.opacity,
        overflow ? 0.5 : 0,
        0.1
      );
      clipRef.current.position.x = widthRef.current / 2;
    }
  });

  return (
    <group>
      <Text
        position={[0, 0.4, 0.05]}
        fontSize={0.35}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
      >
        Hello World
      </Text>
      <Text
        position={[0, -0.2, 0.05]}
        fontSize={0.16}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        font-size: 16px (fixed)
      </Text>
      <mesh ref={clipRef} position={[2, 0, 0.1]}>
        <planeGeometry args={[0.1, 1.5]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0} />
      </mesh>
      <Text
        position={[0, -1.0, 0]}
        fontSize={0.18}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
      >
        Fixed text overflows small containers
      </Text>
    </group>
  );
}

function ClampVariant() {
  return (
    <AnimatedContainer minWidth={2} maxWidth={6} speed={0.4}>
      {(widthRef) => <ClampBar widthRef={widthRef} />}
    </AnimatedContainer>
  );
}

function ClampBar({ widthRef }: { widthRef: React.RefObject<number> }) {
  const barRef = useRef<THREE.Mesh>(null);
  const colorRef = useRef(new THREE.Color("#3B82F6"));
  const zoneTextRef = useRef<THREE.Object3D>(null);
  const zoneRef = useRef("preferred");

  const minW = 1.5;
  const maxW = 4;

  useFrame(() => {
    if (barRef.current) {
      // preferred = 60% of container
      const preferred = widthRef.current * 0.6;
      const clamped = Math.max(minW, Math.min(maxW, preferred));
      barRef.current.scale.x = clamped / 3; // base plane width=3

      // Determine zone and color
      if (preferred <= minW) {
        colorRef.current.set("#3B82F6"); // min - blue
        zoneRef.current = "min";
      } else if (preferred >= maxW) {
        colorRef.current.set("#F59E0B"); // max - amber
        zoneRef.current = "max";
      } else {
        colorRef.current.set("#10B981"); // preferred - green
        zoneRef.current = "preferred";
      }
      const mat = barRef.current.material as THREE.MeshBasicMaterial;
      mat.color.lerp(colorRef.current, 0.1);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={barRef} position={[0, 0.3, 0.05]}>
        <planeGeometry args={[3, 0.6]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.7} />
      </mesh>

      <Text
        position={[0, 0.3, 0.1]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        clamp(min, preferred, max)
      </Text>

      {/* Legend */}
      <group position={[0, -0.8, 0]}>
        <mesh position={[-2, 0, 0]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.7} />
        </mesh>
        <Text
          position={[-1.4, 0, 0]}
          fontSize={0.16}
          color="#93C5FD"
          anchorX="center"
          anchorY="middle"
        >
          min
        </Text>

        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.7} />
        </mesh>
        <Text
          position={[0.6, 0, 0]}
          fontSize={0.16}
          color="#6EE7B7"
          anchorX="center"
          anchorY="middle"
        >
          preferred
        </Text>

        <mesh position={[2, 0, 0]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.7} />
        </mesh>
        <Text
          position={[2.6, 0, 0]}
          fontSize={0.16}
          color="#FCD34D"
          anchorX="center"
          anchorY="middle"
        >
          max
        </Text>
      </group>
    </group>
  );
}

export default function UnitsComparisonScene({
  variant,
}: UnitsComparisonSceneProps) {
  switch (variant) {
    case "px":
      return <PxVariant />;
    case "percent":
      return <PercentVariant />;
    case "em-rem":
      return <EmRemVariant />;
    case "vw-vh":
      return <VwVhVariant />;
    case "fixed-text":
      return <FixedTextVariant />;
    case "clamp":
      return <ClampVariant />;
    default:
      return null;
  }
}
