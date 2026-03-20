"use client";

import { Text } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";
import AnimatedArrow from "../shared/AnimatedArrow";

interface HttpCycleSceneProps {
  stepId: string;
}

function BrowserInternals() {
  const steps = [
    { label: "Parse HTML", color: "#3B82F6", y: 1.2 },
    { label: "Apply CSS", color: "#8B5CF6", y: 0.4 },
    { label: "Run JS", color: "#F59E0B", y: -0.4 },
    { label: "Paint", color: "#10B981", y: -1.2 },
  ];

  return (
    <group>
      {/* Browser outline */}
      <LabeledBox
        position={[0, 0, 0]}
        width={5}
        height={4}
        color="#1E293B"
        opacity={0.5}
      />
      <Text
        position={[0, 2.3, 0.1]}
        fontSize={0.24}
        color="#E2E8F0"
        anchorX="center"
        anchorY="middle"
      >
        Browser
      </Text>

      {steps.map((step, i) => (
        <group key={step.label}>
          <LabeledBox
            position={[0, step.y, 0]}
            width={3.5}
            height={0.6}
            color={step.color}
            label={`${i + 1}. ${step.label}`}
            labelSize={0.22}
            opacity={0.7}
          />
          {i < steps.length - 1 && (
            <AnimatedArrow
              from={[0, step.y - 0.35]}
              to={[0, steps[i + 1].y + 0.35]}
              color="#475569"
              animated
            />
          )}
        </group>
      ))}
    </group>
  );
}

function FullCycle() {
  return (
    <group>
      {/* Browser */}
      <LabeledBox
        position={[-3.5, 0, 0]}
        width={2.2}
        height={1.6}
        color="#3B82F6"
        label="Browser"
        labelSize={0.26}
        opacity={0.7}
      />

      {/* Server */}
      <LabeledBox
        position={[3.5, 0, 0]}
        width={2.2}
        height={1.6}
        color="#8B5CF6"
        label="Server"
        labelSize={0.26}
        opacity={0.7}
      />

      {/* Request arrow (top) */}
      <AnimatedArrow
        from={[-2.2, 0.6]}
        to={[2.2, 0.6]}
        color="#3B82F6"
        animated
        label="GET /page"
        labelSize={0.2}
      />

      {/* Response arrow (bottom) */}
      <AnimatedArrow
        from={[2.2, -0.6]}
        to={[-2.2, -0.6]}
        color="#10B981"
        animated
        label="200 OK + HTML"
        labelSize={0.2}
      />

      <Text
        position={[0, -2, 0.1]}
        fontSize={0.2}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        HTTP Request / Response Cycle
      </Text>
    </group>
  );
}

export default function HttpCycleScene({ stepId }: HttpCycleSceneProps) {
  switch (stepId) {
    case "browsers":
      return <BrowserInternals />;
    case "http":
      return <FullCycle />;
    default:
      return null;
  }
}
