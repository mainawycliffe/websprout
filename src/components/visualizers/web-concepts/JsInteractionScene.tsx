"use client";

import { Text } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";
import PulsingDot from "../shared/PulsingDot";

interface JsInteractionSceneProps {
  stepId: string;
}

function StaticPage() {
  return (
    <group>
      <LabeledBox
        position={[0, 0.5, 0]}
        width={5}
        height={3.5}
        color="#1E293B"
        opacity={0.6}
      />
      {/* Static boxes */}
      <LabeledBox
        position={[0, 1.5, 0]}
        width={4}
        height={0.5}
        color="#475569"
        label="Header"
        labelSize={0.2}
        opacity={0.4}
      />
      <LabeledBox
        position={[0, 0.7, 0]}
        width={4}
        height={0.5}
        color="#475569"
        label="Content"
        labelSize={0.2}
        opacity={0.4}
      />
      <LabeledBox
        position={[0, -0.1, 0]}
        width={4}
        height={0.5}
        color="#475569"
        label="Button"
        labelSize={0.2}
        opacity={0.4}
      />
      <Text
        position={[0, -1.3, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Static
      </Text>
    </group>
  );
}

function InteractivePage() {
  return (
    <group>
      <LabeledBox
        position={[0, 0.5, 0]}
        width={5}
        height={3.5}
        color="#1E293B"
        opacity={0.6}
      />
      {/* Header */}
      <LabeledBox
        position={[0, 1.5, 0]}
        width={4}
        height={0.5}
        color="#F59E0B"
        label="Header"
        labelSize={0.2}
        opacity={0.7}
      />
      {/* Counter */}
      <LabeledBox
        position={[-1, 0.7, 0]}
        width={1.8}
        height={0.5}
        color="#10B981"
        label="Count: 42"
        labelSize={0.2}
        opacity={0.7}
      />
      {/* Notification */}
      <LabeledBox
        position={[1.2, 0.7, 0]}
        width={1.8}
        height={0.5}
        color="#EF4444"
        label="New message!"
        labelSize={0.18}
        opacity={0.7}
        highlighted
      />
      <PulsingDot position={[2.2, 1.0, 0.2]} color="#EF4444" size={0.1} />
      {/* Button with pulse */}
      <LabeledBox
        position={[0, -0.1, 0]}
        width={2}
        height={0.5}
        color="#3B82F6"
        label="Click Me!"
        labelSize={0.2}
        opacity={0.8}
        highlighted
      />
      <PulsingDot position={[1.2, -0.1, 0.2]} color="#F59E0B" size={0.08} />
      <Text
        position={[0, -1.3, 0.1]}
        fontSize={0.26}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
      >
        Interactive
      </Text>
    </group>
  );
}

function ScriptInHtml() {
  return (
    <group>
      {/* HTML document */}
      <LabeledBox
        position={[0, 0.5, 0]}
        width={5}
        height={4}
        color="#1E293B"
        opacity={0.5}
      />
      <Text
        position={[0, 2.2, 0.1]}
        fontSize={0.2}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        HTML Document
      </Text>
      {/* Head */}
      <LabeledBox
        position={[0, 1.5, 0]}
        width={4}
        height={0.5}
        color="#3B82F6"
        label="<head>...</head>"
        labelSize={0.2}
        opacity={0.5}
      />
      {/* Body content */}
      <LabeledBox
        position={[0, 0.7, 0]}
        width={4}
        height={0.5}
        color="#3B82F6"
        label="<body> content </body>"
        labelSize={0.2}
        opacity={0.5}
      />
      {/* Script tag - highlighted */}
      <LabeledBox
        position={[0, -0.2, 0]}
        width={4}
        height={0.6}
        color="#F59E0B"
        label="<script> ... </script>"
        labelSize={0.22}
        opacity={0.9}
        highlighted
      />
      <Text
        position={[0, -0.8, 0.1]}
        fontSize={0.18}
        color="#FCD34D"
        anchorX="center"
        anchorY="middle"
      >
        JavaScript goes here!
      </Text>
    </group>
  );
}

export default function JsInteractionScene({
  stepId,
}: JsInteractionSceneProps) {
  switch (stepId) {
    case "why-js-exists":
      return <StaticPage />;
    case "what-js-does":
      return <InteractivePage />;
    case "js-in-html":
      return <ScriptInHtml />;
    default:
      return null;
  }
}
