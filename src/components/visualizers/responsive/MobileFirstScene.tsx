"use client";

import { Line, Text } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";
import AnimatedArrow from "../shared/AnimatedArrow";

interface MobileFirstSceneProps {
  variant: "desktop-first" | "min-vs-max";
}

function DeviceOutline({
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
        position={[0, -hh - 0.25, 0]}
        fontSize={0.18}
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

function DesktopFirstVariant() {
  // Phone crammed with desktop content
  return (
    <group>
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.24}
        color="#EF4444"
        anchorX="center"
        anchorY="middle"
      >
        {"Desktop-first: too much for mobile"}
      </Text>

      <DeviceOutline position={[0, 0, 0]} width={2.2} height={4} label="Phone">
        {/* Crammed content blocks */}
        <LabeledBox
          position={[0, 1.4, 0.05]}
          width={2}
          height={0.4}
          color="#EF4444"
          label="Nav"
          labelSize={0.14}
          opacity={0.4}
        />
        <LabeledBox
          position={[-0.5, 0.8, 0.05]}
          width={0.8}
          height={0.5}
          color="#EF4444"
          label="Side"
          labelSize={0.12}
          opacity={0.35}
        />
        <LabeledBox
          position={[0.4, 0.8, 0.05]}
          width={1}
          height={0.5}
          color="#EF4444"
          label="Hero"
          labelSize={0.12}
          opacity={0.35}
        />
        <LabeledBox
          position={[0, 0, 0.05]}
          width={2}
          height={0.6}
          color="#EF4444"
          label="3-col grid"
          labelSize={0.12}
          opacity={0.35}
        />
        <LabeledBox
          position={[0, -0.6, 0.05]}
          width={2}
          height={0.4}
          color="#EF4444"
          label="Cards"
          labelSize={0.12}
          opacity={0.35}
        />
        <LabeledBox
          position={[0, -1.1, 0.05]}
          width={2}
          height={0.3}
          color="#EF4444"
          label="Widgets"
          labelSize={0.1}
          opacity={0.35}
        />
        <LabeledBox
          position={[0, -1.5, 0.05]}
          width={2}
          height={0.3}
          color="#EF4444"
          label="Footer"
          labelSize={0.12}
          opacity={0.35}
        />

        {/* Overflow indicator at bottom */}
        <mesh position={[0, -1.85, 0.1]}>
          <planeGeometry args={[2, 0.08]} />
          <meshBasicMaterial color="#EF4444" transparent opacity={0.8} />
        </mesh>
      </DeviceOutline>

      <Text
        position={[0, -2.8, 0]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
        maxWidth={6}
        textAlign="center"
      >
        All desktop features crammed into a tiny screen
      </Text>
    </group>
  );
}

function MinVsMaxVariant() {
  return (
    <group>
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.22}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
      >
        Mobile-first: progressive enhancement
      </Text>

      {/* Phone - simple layout */}
      <DeviceOutline
        position={[-4, 0, 0]}
        width={1.8}
        height={3.5}
        label="Phone"
      >
        <LabeledBox
          position={[0, 1.0, 0.05]}
          width={1.5}
          height={0.35}
          color="#10B981"
          label="Nav"
          labelSize={0.13}
          opacity={0.5}
        />
        <LabeledBox
          position={[0, 0.3, 0.05]}
          width={1.5}
          height={0.6}
          color="#10B981"
          label="Content"
          labelSize={0.14}
          opacity={0.5}
        />
        <LabeledBox
          position={[0, -0.5, 0.05]}
          width={1.5}
          height={0.4}
          color="#10B981"
          label="Footer"
          labelSize={0.13}
          opacity={0.5}
        />
      </DeviceOutline>

      {/* Arrow: phone -> tablet */}
      <AnimatedArrow
        from={[-2.8, 0]}
        to={[-1.6, 0]}
        color="#3B82F6"
        animated
        label="min-width: 768px"
        labelSize={0.15}
      />

      {/* Tablet - adds sidebar */}
      <DeviceOutline
        position={[0, 0, 0]}
        width={3}
        height={3.5}
        label="Tablet"
      >
        <LabeledBox
          position={[0, 1.0, 0.05]}
          width={2.6}
          height={0.35}
          color="#3B82F6"
          label="Nav"
          labelSize={0.13}
          opacity={0.5}
        />
        <LabeledBox
          position={[-0.6, 0.1, 0.05]}
          width={0.8}
          height={1.2}
          color="#3B82F6"
          label="Sidebar"
          labelSize={0.12}
          opacity={0.4}
        />
        <LabeledBox
          position={[0.5, 0.1, 0.05]}
          width={1.5}
          height={1.2}
          color="#3B82F6"
          label="Content"
          labelSize={0.13}
          opacity={0.5}
        />
        <LabeledBox
          position={[0, -1.0, 0.05]}
          width={2.6}
          height={0.35}
          color="#3B82F6"
          label="Footer"
          labelSize={0.13}
          opacity={0.5}
        />
      </DeviceOutline>

      {/* Arrow: tablet -> desktop */}
      <AnimatedArrow
        from={[1.8, 0]}
        to={[2.7, 0]}
        color="#8B5CF6"
        animated
        label="min-width: 1024px"
        labelSize={0.15}
      />

      {/* Desktop - full layout */}
      <DeviceOutline
        position={[4.2, 0, 0]}
        width={3.5}
        height={3.5}
        label="Desktop"
      >
        <LabeledBox
          position={[0, 1.0, 0.05]}
          width={3.1}
          height={0.35}
          color="#8B5CF6"
          label="Full Nav + Search"
          labelSize={0.12}
          opacity={0.5}
        />
        <LabeledBox
          position={[-0.8, 0.1, 0.05]}
          width={0.7}
          height={1.2}
          color="#8B5CF6"
          label="Side"
          labelSize={0.11}
          opacity={0.4}
        />
        <LabeledBox
          position={[0.5, 0.3, 0.05]}
          width={1.8}
          height={0.7}
          color="#8B5CF6"
          label="Grid"
          labelSize={0.13}
          opacity={0.5}
        />
        <LabeledBox
          position={[0.5, -0.4, 0.05]}
          width={1.8}
          height={0.5}
          color="#8B5CF6"
          label="Cards"
          labelSize={0.12}
          opacity={0.45}
        />
        <LabeledBox
          position={[0, -1.0, 0.05]}
          width={3.1}
          height={0.35}
          color="#8B5CF6"
          label="Footer"
          labelSize={0.12}
          opacity={0.5}
        />
      </DeviceOutline>
    </group>
  );
}

export default function MobileFirstScene({ variant }: MobileFirstSceneProps) {
  if (variant === "desktop-first") {
    return <DesktopFirstVariant />;
  }
  return <MinVsMaxVariant />;
}
