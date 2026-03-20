"use client";

import { Text, Line } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";

interface UrlAnatomySceneProps {
  stepId: string;
}

const urlParts = [
  { text: "https://", color: "#06B6D4", label: "Protocol", x: -4.2, width: 1.6 },
  { text: "www.example.com", color: "#3B82F6", label: "Domain", x: -2.0, width: 2.8 },
  { text: "/products/shoes", color: "#10B981", label: "Path", x: 0.7, width: 2.6 },
  { text: "?color=red", color: "#F59E0B", label: "Query", x: 3.0, width: 2 },
];

export default function UrlAnatomyScene({ stepId: _stepId }: UrlAnatomySceneProps) {
  return (
    <group>
      {/* URL bar background */}
      <LabeledBox
        position={[0, 0.8, 0]}
        width={9.5}
        height={0.8}
        color="#1E293B"
        opacity={0.7}
      />

      {/* URL parts */}
      {urlParts.map((part) => (
        <group key={part.label}>
          {/* Colored segment */}
          <LabeledBox
            position={[part.x, 0.8, 0]}
            width={part.width}
            height={0.6}
            color={part.color}
            label={part.text}
            labelSize={0.2}
            opacity={0.7}
          />
          {/* Connecting line */}
          <Line
            points={[
              [part.x, 0.4, 0],
              [part.x, -0.2, 0],
            ]}
            color={part.color}
            lineWidth={1.5}
          />
          {/* Label below */}
          <Text
            position={[part.x, -0.6, 0.1]}
            fontSize={0.22}
            color={part.color}
            anchorX="center"
            anchorY="middle"
          >
            {part.label}
          </Text>
        </group>
      ))}

      {/* Title */}
      <Text
        position={[0, -1.5, 0.1]}
        fontSize={0.2}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Every part of a URL has a purpose
      </Text>
    </group>
  );
}
