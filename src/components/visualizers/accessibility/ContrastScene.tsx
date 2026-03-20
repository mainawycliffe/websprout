"use client";

import { Text, Line } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";

interface ContrastSceneProps {
  variant: "comparison" | "ratios" | "color-plus-icon";
}

function ComparisonScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Color Contrast Matters
      </Text>

      {/* Low contrast panel */}
      <group position={[-2.8, 0.4, 0]}>
        <mesh>
          <planeGeometry args={[3.8, 2.4]} />
          <meshBasicMaterial color="#F8FAFC" />
        </mesh>
        <Text
          position={[0, 0.4, 0.1]}
          fontSize={0.24}
          color="#9CA3AF"
          anchorX="center"
        >
          The quick brown fox
        </Text>
        <Text
          position={[0, -0.1, 0.1]}
          fontSize={0.18}
          color="#9CA3AF"
          anchorX="center"
        >
          jumps over the lazy dog
        </Text>
        {/* Red X */}
        <Text
          position={[1.4, -0.8, 0.2]}
          fontSize={0.4}
          color="#EF4444"
          anchorX="center"
        >
          ✕
        </Text>
      </group>
      <Text
        position={[-2.8, -1.0, 0.1]}
        fontSize={0.18}
        color="#EF4444"
        anchorX="center"
      >
        Low contrast — hard to read
      </Text>

      {/* High contrast panel */}
      <group position={[2.8, 0.4, 0]}>
        <mesh>
          <planeGeometry args={[3.8, 2.4]} />
          <meshBasicMaterial color="#F8FAFC" />
        </mesh>
        <Text
          position={[0, 0.4, 0.1]}
          fontSize={0.24}
          color="#1F2937"
          anchorX="center"
        >
          The quick brown fox
        </Text>
        <Text
          position={[0, -0.1, 0.1]}
          fontSize={0.18}
          color="#1F2937"
          anchorX="center"
        >
          jumps over the lazy dog
        </Text>
        {/* Green check */}
        <Text
          position={[1.4, -0.8, 0.2]}
          fontSize={0.4}
          color="#10B981"
          anchorX="center"
        >
          ✓
        </Text>
      </group>
      <Text
        position={[2.8, -1.0, 0.1]}
        fontSize={0.18}
        color="#10B981"
        anchorX="center"
      >
        High contrast — easy to read
      </Text>
    </group>
  );
}

function RatiosScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        WCAG Contrast Ratios
      </Text>

      {/* Low contrast panel with ratio */}
      <group position={[-2.8, 1.0, 0]}>
        <mesh>
          <planeGeometry args={[3.8, 1.8]} />
          <meshBasicMaterial color="#F8FAFC" />
        </mesh>
        <Text
          position={[0, 0.2, 0.1]}
          fontSize={0.22}
          color="#9CA3AF"
          anchorX="center"
        >
          Hard to read text
        </Text>
        <Text
          position={[0, -0.3, 0.1]}
          fontSize={0.3}
          color="#EF4444"
          anchorX="center"
        >
          2.1:1
        </Text>
      </group>
      <Text
        position={[-2.8, -0.1, 0.1]}
        fontSize={0.18}
        color="#EF4444"
        anchorX="center"
      >
        Fails AA
      </Text>

      {/* High contrast panel with ratio */}
      <group position={[2.8, 1.0, 0]}>
        <mesh>
          <planeGeometry args={[3.8, 1.8]} />
          <meshBasicMaterial color="#F8FAFC" />
        </mesh>
        <Text
          position={[0, 0.2, 0.1]}
          fontSize={0.22}
          color="#1F2937"
          anchorX="center"
        >
          Easy to read text
        </Text>
        <Text
          position={[0, -0.3, 0.1]}
          fontSize={0.3}
          color="#10B981"
          anchorX="center"
        >
          12.4:1
        </Text>
      </group>
      <Text
        position={[2.8, -0.1, 0.1]}
        fontSize={0.18}
        color="#10B981"
        anchorX="center"
      >
        Passes AAA
      </Text>

      {/* Scale bar */}
      <Line
        points={[
          [-4.5, -1.6, 0],
          [4.5, -1.6, 0],
        ]}
        color="#475569"
        lineWidth={2}
      />
      {/* Threshold markers */}
      {[
        { ratio: "3:1", x: -2.0, label: "Large text", color: "#F59E0B" },
        { ratio: "4.5:1", x: 0.5, label: "AA", color: "#3B82F6" },
        { ratio: "7:1", x: 3.0, label: "AAA", color: "#10B981" },
      ].map((t) => (
        <group key={t.ratio}>
          <Line
            points={[
              [t.x, -1.4, 0],
              [t.x, -1.8, 0],
            ]}
            color={t.color}
            lineWidth={2}
          />
          <Text
            position={[t.x, -1.2, 0.1]}
            fontSize={0.16}
            color={t.color}
            anchorX="center"
          >
            {t.ratio}
          </Text>
          <Text
            position={[t.x, -2.1, 0.1]}
            fontSize={0.14}
            color="#64748B"
            anchorX="center"
          >
            {t.label}
          </Text>
        </group>
      ))}
    </group>
  );
}

function ColorPlusIconScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Don't Rely on Color Alone
      </Text>

      {/* Bad: color only */}
      <Text
        position={[-2.8, 1.6, 0.1]}
        fontSize={0.2}
        color="#EF4444"
        anchorX="center"
      >
        Color alone — bad
      </Text>
      {/* Red dot = error */}
      <group position={[-3.5, 0.6, 0]}>
        <mesh>
          <circleGeometry args={[0.25, 24]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        <Text
          position={[0.6, 0, 0.1]}
          fontSize={0.18}
          color="#CBD5E1"
          anchorX="left"
        >
          Error
        </Text>
      </group>
      {/* Green dot = success */}
      <group position={[-3.5, -0.2, 0]}>
        <mesh>
          <circleGeometry args={[0.25, 24]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
        <Text
          position={[0.6, 0, 0.1]}
          fontSize={0.18}
          color="#CBD5E1"
          anchorX="left"
        >
          Success
        </Text>
      </group>
      <Text
        position={[-2.8, -1.0, 0.1]}
        fontSize={0.16}
        color="#64748B"
        anchorX="center"
      >
        Color-blind users cannot tell apart
      </Text>

      {/* Good: color + icon */}
      <Text
        position={[2.8, 1.6, 0.1]}
        fontSize={0.2}
        color="#10B981"
        anchorX="center"
      >
        Color + icon — good
      </Text>
      {/* Red dot + X = error */}
      <group position={[2.1, 0.6, 0]}>
        <mesh>
          <circleGeometry args={[0.25, 24]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.22}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          ✕
        </Text>
        <Text
          position={[0.6, 0, 0.1]}
          fontSize={0.18}
          color="#CBD5E1"
          anchorX="left"
        >
          Error
        </Text>
      </group>
      {/* Green dot + check = success */}
      <group position={[2.1, -0.2, 0]}>
        <mesh>
          <circleGeometry args={[0.25, 24]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.22}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          ✓
        </Text>
        <Text
          position={[0.6, 0, 0.1]}
          fontSize={0.18}
          color="#CBD5E1"
          anchorX="left"
        >
          Success
        </Text>
      </group>
      <Text
        position={[2.8, -1.0, 0.1]}
        fontSize={0.16}
        color="#64748B"
        anchorX="center"
      >
        Everyone can understand the status
      </Text>
    </group>
  );
}

export default function ContrastScene({ variant }: ContrastSceneProps) {
  switch (variant) {
    case "comparison":
      return <ComparisonScene />;
    case "ratios":
      return <RatiosScene />;
    case "color-plus-icon":
      return <ColorPlusIconScene />;
    default:
      return null;
  }
}
