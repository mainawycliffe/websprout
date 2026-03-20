"use client";

import { Text, Line } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";

interface AuditChecklistSceneProps {
  variant: "overview" | "lighthouse" | "axe" | "screen-reader" | "keyboard";
}

const tools = [
  { name: "Lighthouse", icon: "🔍", color: "#3B82F6", y: 1.8 },
  { name: "axe DevTools", icon: "🪓", color: "#8B5CF6", y: 0.6 },
  { name: "Screen Reader", icon: "🔊", color: "#10B981", y: -0.6 },
  { name: "Keyboard Testing", icon: "⌨", color: "#F59E0B", y: -1.8 },
];

function ToolRow({
  name,
  icon,
  color,
  y,
  highlighted,
  detail,
}: {
  name: string;
  icon: string;
  color: string;
  y: number;
  highlighted: boolean;
  detail?: React.ReactNode;
}) {
  const opacity = highlighted ? 1.0 : 0.3;
  return (
    <group>
      {/* Icon placeholder */}
      <mesh position={[-3.8, y, 0]}>
        <circleGeometry args={[0.3, 24]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
      <Text
        position={[-3.8, y, 0.1]}
        fontSize={0.22}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>
      {/* Tool name */}
      <Text
        position={[-2.5, y, 0.1]}
        fontSize={0.24}
        color={highlighted ? "#F1F5F9" : "#475569"}
        anchorX="left"
        anchorY="middle"
      >
        {name}
      </Text>
      {/* Status bar background */}
      <mesh position={[-0.5, y, 0]}>
        <planeGeometry args={[2.0, 0.06]} />
        <meshBasicMaterial color={color} transparent opacity={opacity * 0.3} />
      </mesh>
      {detail}
    </group>
  );
}

function OverviewScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Accessibility Testing Tools
      </Text>
      {tools.map((tool) => (
        <ToolRow
          key={tool.name}
          {...tool}
          highlighted={true}
        />
      ))}
    </group>
  );
}

function LighthouseScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Lighthouse Accessibility Audit
      </Text>
      {tools.map((tool) => (
        <ToolRow
          key={tool.name}
          {...tool}
          highlighted={tool.name === "Lighthouse"}
          detail={
            tool.name === "Lighthouse" ? (
              <group>
                {/* Score circle */}
                <mesh position={[2.5, tool.y, 0]}>
                  <ringGeometry args={[0.45, 0.55, 32]} />
                  <meshBasicMaterial color="#10B981" />
                </mesh>
                <Text
                  position={[2.5, tool.y, 0.1]}
                  fontSize={0.32}
                  color="#10B981"
                  anchorX="center"
                  anchorY="middle"
                >
                  92
                </Text>
                <Text
                  position={[3.8, tool.y, 0.1]}
                  fontSize={0.18}
                  color="#94A3B8"
                  anchorX="center"
                >
                  / 100
                </Text>
              </group>
            ) : undefined
          }
        />
      ))}
    </group>
  );
}

function AxeScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        axe DevTools — Browser Extension
      </Text>
      {tools.map((tool) => (
        <ToolRow
          key={tool.name}
          {...tool}
          highlighted={tool.name === "axe DevTools"}
          detail={
            tool.name === "axe DevTools" ? (
              <group>
                <LabeledBox
                  position={[2.8, tool.y, 0]}
                  width={2.4}
                  height={0.5}
                  color="#EF4444"
                  label="3 issues found"
                  labelSize={0.2}
                  highlighted
                />
              </group>
            ) : undefined
          }
        />
      ))}
    </group>
  );
}

function ScreenReaderScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Screen Reader Output
      </Text>
      {tools.map((tool) => (
        <ToolRow
          key={tool.name}
          {...tool}
          highlighted={tool.name === "Screen Reader"}
          detail={
            tool.name === "Screen Reader" ? (
              <group>
                <LabeledBox
                  position={[2.8, tool.y, 0]}
                  width={3.6}
                  height={0.55}
                  color="#10B981"
                  label={`"Navigation, heading level 1, Home"`}
                  labelSize={0.15}
                  highlighted
                />
              </group>
            ) : undefined
          }
        />
      ))}
    </group>
  );
}

function KeyboardScene() {
  const checks = [
    { label: "Tab order ✓", y: 0.2 },
    { label: "Focus visible ✓", y: -0.15 },
    { label: "No trap ✓", y: -0.5 },
  ];

  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Manual Keyboard Testing Checklist
      </Text>
      {tools.map((tool) => (
        <ToolRow
          key={tool.name}
          {...tool}
          highlighted={tool.name === "Keyboard Testing"}
          detail={
            tool.name === "Keyboard Testing" ? (
              <group>
                {checks.map((check) => (
                  <Text
                    key={check.label}
                    position={[2.8, tool.y + check.y, 0.1]}
                    fontSize={0.17}
                    color="#F59E0B"
                    anchorX="center"
                  >
                    {check.label}
                  </Text>
                ))}
              </group>
            ) : undefined
          }
        />
      ))}
    </group>
  );
}

export default function AuditChecklistScene({
  variant,
}: AuditChecklistSceneProps) {
  switch (variant) {
    case "overview":
      return <OverviewScene />;
    case "lighthouse":
      return <LighthouseScene />;
    case "axe":
      return <AxeScene />;
    case "screen-reader":
      return <ScreenReaderScene />;
    case "keyboard":
      return <KeyboardScene />;
    default:
      return null;
  }
}
