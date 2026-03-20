"use client";

import { Text, Line } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";
import PulsingDot from "../shared/PulsingDot";

interface AriaLabelsSceneProps {
  variant: "overview" | "labels" | "hidden-live";
}

function StickyNote({
  x,
  y,
  text,
  width = 2.4,
}: {
  x: number;
  y: number;
  text: string;
  width?: number;
}) {
  return (
    <group position={[x, y, 0.2]}>
      <mesh>
        <planeGeometry args={[width, 0.45]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.85} />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.16}
        color="#1C1917"
        anchorX="center"
        anchorY="middle"
        maxWidth={width - 0.2}
      >
        {text}
      </Text>
    </group>
  );
}

function OverviewScene() {
  const nodes = [
    { label: "<button>", x: -2.5, y: 1.0, attr: "aria-label" },
    { label: "<img>", x: 0, y: 1.0, attr: "alt / aria-label" },
    { label: "<div>", x: 2.5, y: 1.0, attr: "role='alert'" },
  ];

  return (
    <group>
      <Text
        position={[0, 2.5, 0.1]}
        fontSize={0.32}
        color="#F59E0B"
        anchorX="center"
      >
        ARIA bridges the gap
      </Text>
      <Text
        position={[0, 2.0, 0.1]}
        fontSize={0.2}
        color="#94A3B8"
        anchorX="center"
      >
        When HTML alone is not enough for assistive technology
      </Text>
      {nodes.map((node) => (
        <group key={node.label}>
          <LabeledBox
            position={[node.x, node.y, 0]}
            width={1.8}
            height={0.6}
            color="#3B82F6"
            label={node.label}
            labelSize={0.22}
            opacity={0.6}
          />
          <StickyNote x={node.x} y={node.y - 0.8} text={node.attr} width={1.8} />
          <Line
            points={[
              [node.x, node.y - 0.3, 0],
              [node.x, node.y - 0.55, 0],
            ]}
            color="#F59E0B"
            lineWidth={1}
            transparent
            opacity={0.5}
          />
        </group>
      ))}
    </group>
  );
}

function LabelsScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.24}
        color="#94A3B8"
        anchorX="center"
      >
        Labeling Elements for Screen Readers
      </Text>

      {/* Left: aria-label */}
      <Text
        position={[-2.8, 1.8, 0.1]}
        fontSize={0.2}
        color="#06B6D4"
        anchorX="center"
      >
        aria-label
      </Text>
      <LabeledBox
        position={[-2.8, 0.8, 0]}
        width={2.0}
        height={0.6}
        color="#3B82F6"
        label="<button> X"
        labelSize={0.22}
        highlighted
      />
      <StickyNote
        x={-2.8}
        y={-0.1}
        text={`aria-label="Close dialog"`}
        width={2.6}
      />
      <Line
        points={[
          [-2.8, 0.5, 0],
          [-2.8, 0.15, 0],
        ]}
        color="#F59E0B"
        lineWidth={1}
        transparent
        opacity={0.5}
      />

      {/* Right: aria-labelledby */}
      <Text
        position={[2.5, 1.8, 0.1]}
        fontSize={0.2}
        color="#06B6D4"
        anchorX="center"
      >
        aria-labelledby
      </Text>
      <LabeledBox
        position={[1.5, 0.8, 0]}
        width={2.0}
        height={0.6}
        color="#3B82F6"
        label={`<input>`}
        labelSize={0.22}
        highlighted
      />
      <LabeledBox
        position={[3.5, 0.8, 0]}
        width={2.0}
        height={0.6}
        color="#10B981"
        label={`<label id="name">`}
        labelSize={0.18}
        opacity={0.7}
      />
      <Line
        points={[
          [2.5, 0.8, 0],
          [2.5, 0.8, 0],
        ]}
        color="#F59E0B"
        lineWidth={1.5}
      />
      <Line
        points={[
          [1.5, 0.5, 0],
          [1.5, 0.15, 0],
        ]}
        color="#F59E0B"
        lineWidth={1}
        transparent
        opacity={0.5}
      />
      <StickyNote
        x={1.5}
        y={-0.1}
        text={`aria-labelledby="name"`}
        width={2.4}
      />
      {/* Connection line between input and label */}
      <Line
        points={[
          [2.5, 0.8, 0.1],
          [2.5, 0.8, 0.1],
        ]}
        color="#F59E0B"
        lineWidth={0}
      />
      <Line
        points={[
          [1.5, 1.1, 0],
          [3.5, 1.1, 0],
        ]}
        color="#F59E0B"
        lineWidth={1.5}
        transparent
        opacity={0.4}
        dashed
      />
    </group>
  );
}

function HiddenLiveScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.24}
        color="#94A3B8"
        anchorX="center"
      >
        Hiding & Announcing Content
      </Text>

      {/* Left: aria-hidden */}
      <Text
        position={[-2.8, 1.8, 0.1]}
        fontSize={0.2}
        color="#EF4444"
        anchorX="center"
      >
        aria-hidden
      </Text>
      <LabeledBox
        position={[-2.8, 0.8, 0]}
        width={2.0}
        height={0.6}
        color="#475569"
        label="Decorative Icon"
        labelSize={0.18}
        opacity={0.25}
      />
      <StickyNote
        x={-2.8}
        y={-0.1}
        text={`aria-hidden="true"`}
        width={2.2}
      />
      <Line
        points={[
          [-2.8, 0.5, 0],
          [-2.8, 0.15, 0],
        ]}
        color="#F59E0B"
        lineWidth={1}
        transparent
        opacity={0.5}
      />
      {/* X overlay */}
      <Line
        points={[
          [-3.4, 1.1, 0.3],
          [-2.2, 0.5, 0.3],
        ]}
        color="#EF4444"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      <Line
        points={[
          [-2.2, 1.1, 0.3],
          [-3.4, 0.5, 0.3],
        ]}
        color="#EF4444"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      <Text
        position={[-2.8, -0.8, 0.1]}
        fontSize={0.17}
        color="#94A3B8"
        anchorX="center"
      >
        Hidden from assistive tech
      </Text>

      {/* Right: aria-live */}
      <Text
        position={[2.8, 1.8, 0.1]}
        fontSize={0.2}
        color="#10B981"
        anchorX="center"
      >
        aria-live
      </Text>
      <LabeledBox
        position={[2.8, 0.8, 0]}
        width={2.4}
        height={0.6}
        color="#10B981"
        label="Status: Saved!"
        labelSize={0.2}
        highlighted
      />
      <StickyNote
        x={2.8}
        y={-0.1}
        text={`aria-live="polite"`}
        width={2.2}
      />
      <Line
        points={[
          [2.8, 0.5, 0],
          [2.8, 0.15, 0],
        ]}
        color="#F59E0B"
        lineWidth={1}
        transparent
        opacity={0.5}
      />
      <PulsingDot position={[4.2, 0.8, 0.3]} color="#10B981" size={0.15} />
      <Text
        position={[2.8, -0.8, 0.1]}
        fontSize={0.17}
        color="#94A3B8"
        anchorX="center"
      >
        Announced when updated
      </Text>
    </group>
  );
}

export default function AriaLabelsScene({ variant }: AriaLabelsSceneProps) {
  switch (variant) {
    case "overview":
      return <OverviewScene />;
    case "labels":
      return <LabelsScene />;
    case "hidden-live":
      return <HiddenLiveScene />;
    default:
      return null;
  }
}
