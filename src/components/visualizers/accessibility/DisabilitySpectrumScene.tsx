"use client";

import { Text, Line } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";

interface DisabilitySpectrumSceneProps {
  variant: "overview" | "spectrum" | "legal";
}

const categories = [
  { label: "Visual", color: "#06B6D4", x: -3.6 },
  { label: "Motor", color: "#3B82F6", x: -1.2 },
  { label: "Cognitive", color: "#8B5CF6", x: 1.2 },
  { label: "Auditory", color: "#F59E0B", x: 3.6 },
];

const spectrumData: Record<string, [string, string, string]> = {
  Visual: ["Blind", "Post-surgery", "Bright sun"],
  Motor: ["Paralysis", "Broken arm", "Holding baby"],
  Cognitive: ["Dyslexia", "Concussion", "Distracted"],
  Auditory: ["Deaf", "Ear infection", "Noisy room"],
};

const spectrumLabels = ["Permanent", "Temporary", "Situational"];

function CategoryCircle({
  x,
  y,
  color,
  label,
  size = 0.6,
}: {
  x: number;
  y: number;
  color: string;
  label: string;
  size?: number;
}) {
  return (
    <group position={[x, y, 0]}>
      <mesh>
        <circleGeometry args={[size, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, -size - 0.3, 0.1]}
        fontSize={0.24}
        color="#E2E8F0"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function OverviewScene() {
  return (
    <group>
      <Text
        position={[0, 2.5, 0.1]}
        fontSize={0.3}
        color="#94A3B8"
        anchorX="center"
      >
        Types of Disabilities
      </Text>
      {categories.map((cat) => (
        <CategoryCircle
          key={cat.label}
          x={cat.x}
          y={0.4}
          color={cat.color}
          label={cat.label}
        />
      ))}
    </group>
  );
}

function SpectrumScene() {
  return (
    <group>
      <Text
        position={[0, 2.8, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Disability Spectrum: Permanent → Temporary → Situational
      </Text>
      {categories.map((cat) => {
        const children = spectrumData[cat.label];
        return (
          <group key={cat.label}>
            <CategoryCircle
              x={cat.x}
              y={1.4}
              color={cat.color}
              label={cat.label}
              size={0.5}
            />
            {children.map((child, i) => {
              const childY = -0.4 - i * 1.1;
              return (
                <group key={child}>
                  <Line
                    points={[
                      [cat.x, 1.4 - 0.5, 0],
                      [cat.x, childY + 0.22, 0],
                    ]}
                    color={cat.color}
                    lineWidth={1}
                    transparent
                    opacity={0.4}
                  />
                  <mesh position={[cat.x, childY, 0]}>
                    <circleGeometry args={[0.22, 24]} />
                    <meshBasicMaterial
                      color={cat.color}
                      transparent
                      opacity={0.4 + i * 0.05}
                    />
                  </mesh>
                  <Text
                    position={[cat.x, childY - 0.35, 0.1]}
                    fontSize={0.17}
                    color="#CBD5E1"
                    anchorX="center"
                  >
                    {child}
                  </Text>
                  {i === 0 && (
                    <Text
                      position={[cat.x + 1.0, childY, 0.1]}
                      fontSize={0.13}
                      color="#64748B"
                      anchorX="left"
                    >
                      {spectrumLabels[i]}
                    </Text>
                  )}
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

function LegalScene() {
  const principles = [
    { label: "Perceivable", x: 0, y: 2.0 },
    { label: "Operable", x: 2.4, y: 0 },
    { label: "Understandable", x: 0, y: -2.0 },
    { label: "Robust", x: -2.4, y: 0 },
  ];

  return (
    <group>
      {/* Central shield */}
      <LabeledBox
        position={[0, 0, 0]}
        width={2.0}
        height={1.2}
        color="#3B82F6"
        label="WCAG 2.1"
        labelSize={0.32}
        highlighted
      />
      {/* POUR principles */}
      {principles.map((p) => (
        <group key={p.label}>
          <LabeledBox
            position={[p.x, p.y, 0]}
            width={2.0}
            height={0.7}
            color="#8B5CF6"
            label={p.label}
            labelSize={0.24}
            opacity={0.7}
          />
          <Line
            points={[
              [p.x * 0.45, p.y * 0.5, 0],
              [p.x * 0.85, p.y * 0.85, 0],
            ]}
            color="#8B5CF6"
            lineWidth={1.5}
            transparent
            opacity={0.5}
          />
        </group>
      ))}
    </group>
  );
}

export default function DisabilitySpectrumScene({
  variant,
}: DisabilitySpectrumSceneProps) {
  switch (variant) {
    case "overview":
      return <OverviewScene />;
    case "spectrum":
      return <SpectrumScene />;
    case "legal":
      return <LegalScene />;
    default:
      return null;
  }
}
