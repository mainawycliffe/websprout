"use client";

import { Text, Line } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";

interface HtmlStructureSceneProps {
  stepId: string;
}

function DocumentIcon() {
  return (
    <group>
      <LabeledBox
        position={[0, 0.5, 0]}
        width={4}
        height={3.5}
        color="#1E293B"
        opacity={0.8}
      />
      {/* Header section */}
      <LabeledBox
        position={[0, 1.6, 0]}
        width={3.2}
        height={0.5}
        color="#3B82F6"
        label="Header"
        labelSize={0.22}
        opacity={0.7}
      />
      {/* Body section */}
      <LabeledBox
        position={[0, 0.7, 0]}
        width={3.2}
        height={0.5}
        color="#3B82F6"
        label="Main Content"
        labelSize={0.22}
        opacity={0.5}
      />
      {/* Footer section */}
      <LabeledBox
        position={[0, -0.2, 0]}
        width={3.2}
        height={0.5}
        color="#3B82F6"
        label="Footer"
        labelSize={0.22}
        opacity={0.4}
      />
      <Text
        position={[0, -1.2, 0.1]}
        fontSize={0.24}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        A structured document
      </Text>
    </group>
  );
}

function TagConcept() {
  return (
    <group>
      {/* Opening tag */}
      <LabeledBox
        position={[-2.5, 0, 0]}
        width={1.6}
        height={0.8}
        color="#3B82F6"
        label="<h1>"
        labelSize={0.3}
        opacity={0.8}
      />
      {/* Content */}
      <LabeledBox
        position={[0, 0, 0]}
        width={2.8}
        height={0.8}
        color="#1E293B"
        label="Hello World"
        labelSize={0.28}
        labelColor="#E2E8F0"
        opacity={0.6}
      />
      {/* Closing tag */}
      <LabeledBox
        position={[2.5, 0, 0]}
        width={1.6}
        height={0.8}
        color="#3B82F6"
        label="</h1>"
        labelSize={0.3}
        opacity={0.8}
      />
      {/* Labels */}
      <Text
        position={[-2.5, -0.8, 0.1]}
        fontSize={0.18}
        color="#93C5FD"
        anchorX="center"
        anchorY="middle"
      >
        Opening Tag
      </Text>
      <Text
        position={[0, -0.8, 0.1]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Content
      </Text>
      <Text
        position={[2.5, -0.8, 0.1]}
        fontSize={0.18}
        color="#93C5FD"
        anchorX="center"
        anchorY="middle"
      >
        Closing Tag
      </Text>
    </group>
  );
}

function TreeNode({
  position,
  label,
  color,
}: {
  position: [number, number, number];
  label: string;
  color: string;
}) {
  return (
    <LabeledBox
      position={position}
      width={1.4}
      height={0.6}
      color={color}
      label={label}
      labelSize={0.22}
      opacity={0.7}
    />
  );
}

function TreeDiagram() {
  return (
    <group>
      {/* Nodes */}
      <TreeNode position={[0, 2, 0]} label="<html>" color="#3B82F6" />
      <TreeNode position={[-2, 0.6, 0]} label="<head>" color="#8B5CF6" />
      <TreeNode position={[2, 0.6, 0]} label="<body>" color="#8B5CF6" />
      <TreeNode position={[1, -0.8, 0]} label="<h1>" color="#10B981" />
      <TreeNode position={[3, -0.8, 0]} label="<p>" color="#10B981" />

      {/* Connections: html -> head */}
      <Line
        points={[
          [0, 1.7, 0],
          [-2, 0.9, 0],
        ]}
        color="#475569"
        lineWidth={1.5}
      />
      {/* html -> body */}
      <Line
        points={[
          [0, 1.7, 0],
          [2, 0.9, 0],
        ]}
        color="#475569"
        lineWidth={1.5}
      />
      {/* body -> h1 */}
      <Line
        points={[
          [2, 0.3, 0],
          [1, -0.5, 0],
        ]}
        color="#475569"
        lineWidth={1.5}
      />
      {/* body -> p */}
      <Line
        points={[
          [2, 0.3, 0],
          [3, -0.5, 0],
        ]}
        color="#475569"
        lineWidth={1.5}
      />

      <Text
        position={[0, -1.8, 0.1]}
        fontSize={0.2}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        HTML Document Tree
      </Text>
    </group>
  );
}

export default function HtmlStructureScene({
  stepId,
}: HtmlStructureSceneProps) {
  switch (stepId) {
    case "why-html-exists":
      return <DocumentIcon />;
    case "what-are-tags":
      return <TagConcept />;
    case "document-structure":
      return <TreeDiagram />;
    default:
      return null;
  }
}
