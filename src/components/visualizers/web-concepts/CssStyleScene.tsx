"use client";

import { Text } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";
import AnimatedArrow from "../shared/AnimatedArrow";

interface CssStyleSceneProps {
  stepId: string;
}

function BeforeAfter() {
  return (
    <group>
      {/* Without CSS */}
      <LabeledBox
        position={[-2.5, 0, 0]}
        width={3}
        height={2.5}
        color="#475569"
        label="Without CSS"
        labelSize={0.24}
        opacity={0.5}
      />
      <Text
        position={[-2.5, -0.6, 0.1]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Plain, unstyled
      </Text>

      {/* Arrow between */}
      <AnimatedArrow from={[-0.8, 0]} to={[0.8, 0]} color="#8B5CF6" />

      {/* With CSS */}
      <LabeledBox
        position={[2.5, 0, 0]}
        width={3}
        height={2.5}
        color="#8B5CF6"
        label="With CSS"
        labelSize={0.24}
        opacity={0.8}
        highlighted
      />
      <Text
        position={[2.5, -0.6, 0.1]}
        fontSize={0.18}
        color="#C4B5FD"
        anchorX="center"
        anchorY="middle"
      >
        Colorful, styled!
      </Text>
    </group>
  );
}

function FlowDiagram() {
  return (
    <group>
      {/* Selector */}
      <LabeledBox
        position={[-3.5, 0, 0]}
        width={2}
        height={0.8}
        color="#8B5CF6"
        label="h1"
        labelSize={0.28}
        opacity={0.8}
      />
      <Text
        position={[-3.5, -0.7, 0.1]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Selector
      </Text>

      <AnimatedArrow from={[-2.3, 0]} to={[-1.2, 0]} color="#8B5CF6" animated />

      {/* Property: Value */}
      <LabeledBox
        position={[0, 0, 0]}
        width={2.8}
        height={0.8}
        color="#06B6D4"
        label="color: blue"
        labelSize={0.24}
        opacity={0.8}
      />
      <Text
        position={[0, -0.7, 0.1]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Property: Value
      </Text>

      <AnimatedArrow from={[1.6, 0]} to={[2.8, 0]} color="#8B5CF6" animated />

      {/* Styled element */}
      <LabeledBox
        position={[3.8, 0, 0]}
        width={1.6}
        height={0.8}
        color="#3B82F6"
        label="Hello"
        labelSize={0.28}
        opacity={0.9}
        highlighted
      />
      <Text
        position={[3.8, -0.7, 0.1]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Result
      </Text>
    </group>
  );
}

function RealWorldCSS() {
  const properties = [
    { label: "color", color: "#EF4444", x: -3, y: 1.2 },
    { label: "font-size", color: "#8B5CF6", x: -3, y: 0.4 },
    { label: "margin", color: "#10B981", x: -3, y: -0.4 },
    { label: "background", color: "#F59E0B", x: -3, y: -1.2 },
  ];

  return (
    <group>
      {/* Property tags */}
      {properties.map((prop) => (
        <group key={prop.label}>
          <LabeledBox
            position={[prop.x, prop.y, 0]}
            width={2}
            height={0.5}
            color={prop.color}
            label={prop.label}
            labelSize={0.2}
            opacity={0.7}
          />
          <AnimatedArrow
            from={[prop.x + 1.2, prop.y]}
            to={[1.2, prop.y * 0.3]}
            color={prop.color}
          />
        </group>
      ))}

      {/* Styled box */}
      <LabeledBox
        position={[2.8, 0, 0]}
        width={2.8}
        height={2.8}
        color="#8B5CF6"
        label="Styled Element"
        labelSize={0.22}
        opacity={0.8}
        highlighted
      />
    </group>
  );
}

export default function CssStyleScene({ stepId }: CssStyleSceneProps) {
  switch (stepId) {
    case "why-css-exists":
      return <BeforeAfter />;
    case "how-css-works":
      return <FlowDiagram />;
    case "css-real-world":
      return <RealWorldCSS />;
    default:
      return null;
  }
}
