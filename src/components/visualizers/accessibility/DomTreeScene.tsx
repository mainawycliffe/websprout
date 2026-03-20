"use client";

import { Text, Line } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";

interface DomTreeSceneProps {
  variant: "comparison" | "landmarks" | "headings";
}

interface TreeNode {
  label: string;
  x: number;
  y: number;
  children?: TreeNode[];
}

function TreeConnection({
  parentX,
  parentY,
  childX,
  childY,
  color,
}: {
  parentX: number;
  parentY: number;
  childX: number;
  childY: number;
  color: string;
}) {
  return (
    <Line
      points={[
        [parentX, parentY - 0.3, 0],
        [childX, childY + 0.3, 0],
      ]}
      color={color}
      lineWidth={1.5}
      transparent
      opacity={0.5}
    />
  );
}

function ComparisonScene() {
  const nonSemantic = [
    { label: "<div>", y: 2.0 },
    { label: "<div>", y: 0.7 },
    { label: "<div>", y: -0.6 },
    { label: "<div>", y: -1.9 },
  ];

  const semantic = [
    { label: "<header>", y: 2.0 },
    { label: "<nav>", y: 0.7 },
    { label: "<main>", y: -0.6 },
    { label: "<footer>", y: -1.9 },
  ];

  const leftX = -2.5;
  const rightX = 2.5;

  return (
    <group>
      <Text
        position={[leftX, 2.8, 0.1]}
        fontSize={0.24}
        color="#EF4444"
        anchorX="center"
      >
        Non-semantic
      </Text>
      <Text
        position={[rightX, 2.8, 0.1]}
        fontSize={0.24}
        color="#10B981"
        anchorX="center"
      >
        Semantic
      </Text>
      {nonSemantic.map((node, i) => (
        <group key={`ns-${i}`}>
          <LabeledBox
            position={[leftX, node.y, 0]}
            width={2.0}
            height={0.55}
            color="#EF4444"
            label={node.label}
            labelSize={0.22}
            opacity={0.3}
          />
          {i < nonSemantic.length - 1 && (
            <TreeConnection
              parentX={leftX}
              parentY={node.y}
              childX={leftX}
              childY={nonSemantic[i + 1].y}
              color="#EF4444"
            />
          )}
        </group>
      ))}
      {semantic.map((node, i) => (
        <group key={`s-${i}`}>
          <LabeledBox
            position={[rightX, node.y, 0]}
            width={2.0}
            height={0.55}
            color="#10B981"
            label={node.label}
            labelSize={0.22}
            highlighted
          />
          {i < semantic.length - 1 && (
            <TreeConnection
              parentX={rightX}
              parentY={node.y}
              childX={rightX}
              childY={semantic[i + 1].y}
              color="#10B981"
            />
          )}
        </group>
      ))}
    </group>
  );
}

function LandmarksScene() {
  const landmarks = [
    { tag: "<header>", role: "banner", y: 2.0, color: "#06B6D4" },
    { tag: "<nav>", role: "navigation", y: 0.7, color: "#3B82F6" },
    { tag: "<main>", role: "main", y: -0.6, color: "#8B5CF6" },
    { tag: "<footer>", role: "contentinfo", y: -1.9, color: "#F59E0B" },
  ];

  return (
    <group>
      <Text
        position={[0, 2.8, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Landmark Roles
      </Text>
      {landmarks.map((node, i) => (
        <group key={node.tag}>
          <LabeledBox
            position={[-1.0, node.y, 0]}
            width={2.0}
            height={0.55}
            color={node.color}
            label={node.tag}
            labelSize={0.22}
            highlighted
          />
          <LabeledBox
            position={[2.2, node.y, 0]}
            width={2.2}
            height={0.45}
            color={node.color}
            label={`role="${node.role}"`}
            labelSize={0.18}
            opacity={0.4}
          />
          <Line
            points={[
              [0.0, node.y, 0],
              [1.1, node.y, 0],
            ]}
            color={node.color}
            lineWidth={1}
            transparent
            opacity={0.4}
          />
          {i < landmarks.length - 1 && (
            <TreeConnection
              parentX={-1.0}
              parentY={node.y}
              childX={-1.0}
              childY={landmarks[i + 1].y}
              color="#475569"
            />
          )}
        </group>
      ))}
    </group>
  );
}

function HeadingsScene() {
  return (
    <group>
      <Text
        position={[0, 2.8, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Heading Hierarchy
      </Text>
      {/* H1 */}
      <LabeledBox
        position={[0, 2.0, 0]}
        width={2.4}
        height={0.65}
        color="#3B82F6"
        label="<h1> Page Title"
        labelSize={0.24}
        highlighted
      />
      {/* H2 branches */}
      <TreeConnection parentX={0} parentY={2.0} childX={-2.2} childY={0.7} color="#3B82F6" />
      <TreeConnection parentX={0} parentY={2.0} childX={2.2} childY={0.7} color="#3B82F6" />
      <LabeledBox
        position={[-2.2, 0.7, 0]}
        width={2.0}
        height={0.55}
        color="#8B5CF6"
        label="<h2> Section A"
        labelSize={0.2}
        highlighted
      />
      <LabeledBox
        position={[2.2, 0.7, 0]}
        width={2.0}
        height={0.55}
        color="#8B5CF6"
        label="<h2> Section B"
        labelSize={0.2}
        highlighted
      />
      {/* H3 branches from left H2 */}
      <TreeConnection parentX={-2.2} parentY={0.7} childX={-3.2} childY={-0.6} color="#8B5CF6" />
      <TreeConnection parentX={-2.2} parentY={0.7} childX={-1.2} childY={-0.6} color="#8B5CF6" />
      <LabeledBox
        position={[-3.2, -0.6, 0]}
        width={1.6}
        height={0.45}
        color="#06B6D4"
        label="<h3> Detail"
        labelSize={0.18}
        opacity={0.7}
      />
      <LabeledBox
        position={[-1.2, -0.6, 0]}
        width={1.6}
        height={0.45}
        color="#06B6D4"
        label="<h3> Detail"
        labelSize={0.18}
        opacity={0.7}
      />
      {/* H3 branches from right H2 */}
      <TreeConnection parentX={2.2} parentY={0.7} childX={1.2} childY={-0.6} color="#8B5CF6" />
      <TreeConnection parentX={2.2} parentY={0.7} childX={3.2} childY={-0.6} color="#8B5CF6" />
      <LabeledBox
        position={[1.2, -0.6, 0]}
        width={1.6}
        height={0.45}
        color="#06B6D4"
        label="<h3> Detail"
        labelSize={0.18}
        opacity={0.7}
      />
      <LabeledBox
        position={[3.2, -0.6, 0]}
        width={1.6}
        height={0.45}
        color="#06B6D4"
        label="<h3> Detail"
        labelSize={0.18}
        opacity={0.7}
      />
    </group>
  );
}

export default function DomTreeScene({ variant }: DomTreeSceneProps) {
  switch (variant) {
    case "comparison":
      return <ComparisonScene />;
    case "landmarks":
      return <LandmarksScene />;
    case "headings":
      return <HeadingsScene />;
    default:
      return null;
  }
}
