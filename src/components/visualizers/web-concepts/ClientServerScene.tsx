"use client";

import { Text } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";
import AnimatedArrow from "../shared/AnimatedArrow";

interface ClientServerSceneProps {
  stepId: string;
}

function ClientAndServer() {
  return (
    <group>
      {/* Client */}
      <LabeledBox
        position={[-3, 0, 0]}
        width={3}
        height={2}
        color="#3B82F6"
        label="Client"
        labelSize={0.3}
        opacity={0.7}
      />
      <Text
        position={[-3, -0.5, 0.1]}
        fontSize={0.18}
        color="#93C5FD"
        anchorX="center"
        anchorY="middle"
      >
        Your Browser
      </Text>

      {/* Server */}
      <LabeledBox
        position={[3, 0, 0]}
        width={3}
        height={2}
        color="#8B5CF6"
        label="Server"
        labelSize={0.3}
        opacity={0.7}
      />
      <Text
        position={[3, -0.5, 0.1]}
        fontSize={0.18}
        color="#C4B5FD"
        anchorX="center"
        anchorY="middle"
      >
        Remote Computer
      </Text>
    </group>
  );
}

function RequestResponse() {
  return (
    <group>
      {/* Client */}
      <LabeledBox
        position={[-3.5, 0, 0]}
        width={2.4}
        height={1.6}
        color="#3B82F6"
        label="Client"
        labelSize={0.26}
        opacity={0.7}
      />

      {/* Server */}
      <LabeledBox
        position={[3.5, 0, 0]}
        width={2.4}
        height={1.6}
        color="#8B5CF6"
        label="Server"
        labelSize={0.26}
        opacity={0.7}
      />

      {/* Step 1: Request */}
      <AnimatedArrow
        from={[-2.1, 0.8]}
        to={[2.1, 0.8]}
        color="#3B82F6"
        animated
        label="1. Request"
        labelSize={0.2}
      />

      {/* Step 2: Process */}
      <Text
        position={[3.5, -1.2, 0.1]}
        fontSize={0.18}
        color="#C4B5FD"
        anchorX="center"
        anchorY="middle"
      >
        2. Process
      </Text>

      {/* Step 3: Response */}
      <AnimatedArrow
        from={[2.1, -0.4]}
        to={[-2.1, -0.4]}
        color="#10B981"
        animated
        label="3. Response"
        labelSize={0.2}
      />

      {/* Step 4: Render */}
      <Text
        position={[-3.5, -1.2, 0.1]}
        fontSize={0.18}
        color="#93C5FD"
        anchorX="center"
        anchorY="middle"
      >
        4. Render
      </Text>
    </group>
  );
}

function StaticVsDynamic() {
  return (
    <group>
      {/* Server outline */}
      <LabeledBox
        position={[0, 0.5, 0]}
        width={8}
        height={3}
        color="#1E293B"
        opacity={0.4}
      />
      <Text
        position={[0, 2.3, 0.1]}
        fontSize={0.24}
        color="#E2E8F0"
        anchorX="center"
        anchorY="middle"
      >
        Server Types
      </Text>

      {/* Static */}
      <LabeledBox
        position={[-2.2, 0.5, 0]}
        width={3}
        height={2.2}
        color="#3B82F6"
        label="Static"
        labelSize={0.26}
        opacity={0.6}
      />
      <Text
        position={[-2.2, 0, 0.1]}
        fontSize={0.18}
        color="#93C5FD"
        anchorX="center"
        anchorY="middle"
      >
        Pre-made Files
      </Text>
      <Text
        position={[-2.2, -0.4, 0.1]}
        fontSize={0.16}
        color="#64748B"
        anchorX="center"
        anchorY="middle"
      >
        HTML, CSS, images
      </Text>

      {/* Dynamic */}
      <LabeledBox
        position={[2.2, 0.5, 0]}
        width={3}
        height={2.2}
        color="#8B5CF6"
        label="Dynamic"
        labelSize={0.26}
        opacity={0.6}
      />
      <Text
        position={[2.2, 0, 0.1]}
        fontSize={0.18}
        color="#C4B5FD"
        anchorX="center"
        anchorY="middle"
      >
        Generated on Request
      </Text>
      <Text
        position={[2.2, -0.4, 0.1]}
        fontSize={0.16}
        color="#64748B"
        anchorX="center"
        anchorY="middle"
      >
        Code builds the page
      </Text>
    </group>
  );
}

export default function ClientServerScene({ stepId }: ClientServerSceneProps) {
  switch (stepId) {
    case "what-are-clients-servers":
      return <ClientAndServer />;
    case "request-response":
      return <RequestResponse />;
    case "static-vs-dynamic":
      return <StaticVsDynamic />;
    default:
      return null;
  }
}
