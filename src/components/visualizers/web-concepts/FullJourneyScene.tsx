"use client";

import { Text } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";
import AnimatedArrow from "../shared/AnimatedArrow";

interface FullJourneySceneProps {
  stepId: string;
}

export default function FullJourneyScene({ stepId }: FullJourneySceneProps) {
  const highlight1 = stepId === "step-1-dns";
  const highlight2 = stepId === "step-2-http";
  const highlight3 = stepId === "step-3-response";
  const highlight4 = stepId === "step-4-render";
  const showAll = stepId === "the-full-journey";

  return (
    <group>
      {/* Browser (left) */}
      <LabeledBox
        position={[-4, -1, 0]}
        width={2}
        height={1.2}
        color="#3B82F6"
        label="Browser"
        labelSize={0.22}
        opacity={showAll ? 0.6 : 0.4}
        highlighted={highlight4}
      />

      {/* DNS Server (top-center) */}
      <LabeledBox
        position={[0, 1.8, 0]}
        width={2}
        height={1}
        color="#8B5CF6"
        label="DNS"
        labelSize={0.22}
        opacity={showAll ? 0.6 : 0.4}
        highlighted={highlight1}
      />

      {/* Server (right) */}
      <LabeledBox
        position={[4, -1, 0]}
        width={2}
        height={1.2}
        color="#10B981"
        label="Server"
        labelSize={0.22}
        opacity={showAll ? 0.6 : 0.4}
        highlighted={highlight3}
      />

      {/* Segment 1: Browser -> DNS */}
      <AnimatedArrow
        from={[-3.2, -0.2]}
        to={[-1.2, 1.5]}
        color="#F59E0B"
        animated={highlight1 || showAll}
        label="1. DNS Lookup"
        labelSize={0.18}
      />

      {/* DNS -> resolve (back to path toward server) */}
      <AnimatedArrow
        from={[1.2, 1.5]}
        to={[3.2, -0.2]}
        color="#F59E0B"
        animated={highlight1 || showAll}
      />

      {/* Segment 2: Browser -> Server (HTTP Request) */}
      <AnimatedArrow
        from={[-2.8, -0.6]}
        to={[2.8, -0.6]}
        color="#3B82F6"
        animated={highlight2 || showAll}
        label="2. HTTP Request"
        labelSize={0.18}
      />

      {/* Segment 3: Server -> Browser (Response) */}
      <AnimatedArrow
        from={[2.8, -1.4]}
        to={[-2.8, -1.4]}
        color="#10B981"
        animated={highlight3 || showAll}
        label="3. Response"
        labelSize={0.18}
      />

      {/* Segment 4: Render label */}
      <Text
        position={[-4, -2.2, 0.1]}
        fontSize={0.18}
        color={highlight4 || showAll ? "#3B82F6" : "#475569"}
        anchorX="center"
        anchorY="middle"
      >
        4. Render Page
      </Text>
    </group>
  );
}
