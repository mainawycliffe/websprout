"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import LabeledBox from "../shared/LabeledBox";

interface VariableBoxSceneProps {
  stepId: string;
}

function VariableBox({
  position,
  name,
  value,
  isConst = false,
  highlighted = false,
  animateIn = false,
}: {
  position: [number, number, number];
  name: string;
  value: string;
  isConst?: boolean;
  highlighted?: boolean;
  animateIn?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(animateIn ? 0 : 1);

  useFrame((_, delta) => {
    if (groupRef.current && animateIn) {
      scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, 1, delta * 3);
      groupRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <LabeledBox
        position={[0, 0, 0]}
        width={2.8}
        height={1.6}
        color={isConst ? "#7C3AED" : "#3B82F6"}
        opacity={highlighted ? 0.9 : 0.6}
        highlighted={highlighted}
      />
      {/* Variable name label */}
      <Text
        position={[0, 1.1, 0.1]}
        fontSize={0.24}
        color={isConst ? "#C4B5FD" : "#93C5FD"}
        anchorX="center"
        anchorY="middle"
      >
        {isConst ? "const" : "let"} {name}
      </Text>
      {/* Value inside the box */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        {value}
      </Text>
      {/* Lock icon for const */}
      {isConst && (
        <Text
          position={[1.1, 0.55, 0.1]}
          fontSize={0.3}
          color="#FCD34D"
          anchorX="center"
          anchorY="middle"
        >
          🔒
        </Text>
      )}
    </group>
  );
}

function ReassignmentArrow({ position }: { position: [number, number, number] }) {
  const opacityRef = useRef(0);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    opacityRef.current = Math.min(opacityRef.current + delta * 2, 0.8);
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacityRef.current;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <planeGeometry args={[0.6, 0.08]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0} />
      </mesh>
      <Text
        position={[0.4, 0, 0.1]}
        fontSize={0.28}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
      >
        →
      </Text>
    </group>
  );
}

function LetVariablesDemo() {
  return (
    <group>
      <VariableBox position={[-3.5, 0.5, 0]} name="age" value="25" animateIn />
      <VariableBox position={[0, 0.5, 0]} name="name" value='"Alice"' animateIn />
      <VariableBox position={[3.5, 0.5, 0]} name="score" value="0" animateIn />
      <Text
        position={[0, -1.5, 0.1]}
        fontSize={0.22}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Variables are like labeled boxes — each holds one value
      </Text>
    </group>
  );
}

function ReassignmentDemo() {
  return (
    <group>
      <VariableBox position={[-3, 0.5, 0]} name="score" value="0" />
      <ReassignmentArrow position={[0, 0.5, 0]} />
      <VariableBox position={[3, 0.5, 0]} name="score" value="10" highlighted animateIn />
      <Text
        position={[0, -1.5, 0.1]}
        fontSize={0.22}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        With let, you can change what is inside the box
      </Text>
    </group>
  );
}

function ConstDemo() {
  return (
    <group>
      <VariableBox position={[-3, 0.5, 0]} name="PI" value="3.14159" isConst animateIn />
      <VariableBox position={[3, 0.5, 0]} name="API_URL" value='"https://..."' isConst animateIn />
      <Text
        position={[0, -1.5, 0.1]}
        fontSize={0.22}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        const locks the box — the value cannot be replaced
      </Text>
    </group>
  );
}

function LetVsConstDemo() {
  return (
    <group>
      <VariableBox position={[-3, 0.5, 0]} name="count" value="5" />
      <VariableBox position={[3, 0.5, 0]} name="MAX" value="100" isConst />
      <Text
        position={[-3, -1.2, 0.1]}
        fontSize={0.2}
        color="#93C5FD"
        anchorX="center"
        anchorY="middle"
      >
        can change ✓
      </Text>
      <Text
        position={[3, -1.2, 0.1]}
        fontSize={0.2}
        color="#FCD34D"
        anchorX="center"
        anchorY="middle"
      >
        locked 🔒
      </Text>
    </group>
  );
}

function ConsoleDemo() {
  return (
    <group>
      {/* Browser window frame */}
      <LabeledBox
        position={[0, 0, 0]}
        width={8}
        height={4}
        color="#1E293B"
        opacity={0.8}
      />
      {/* Tab bar */}
      <LabeledBox
        position={[0, 1.6, 0.05]}
        width={8}
        height={0.5}
        color="#334155"
        opacity={0.9}
        label="Browser DevTools — Console"
        labelSize={0.2}
      />
      {/* Console lines */}
      <Text position={[-3.2, 0.6, 0.1]} fontSize={0.22} color="#94A3B8" anchorX="left" anchorY="middle">
        {">"} console.log("Hello!")
      </Text>
      <Text position={[-3.2, 0, 0.1]} fontSize={0.22} color="#4ADE80" anchorX="left" anchorY="middle">
        Hello!
      </Text>
      <Text position={[-3.2, -0.6, 0.1]} fontSize={0.22} color="#94A3B8" anchorX="left" anchorY="middle">
        {">"} 2 + 3
      </Text>
      <Text position={[-3.2, -1.2, 0.1]} fontSize={0.22} color="#4ADE80" anchorX="left" anchorY="middle">
        5
      </Text>
    </group>
  );
}

export default function VariableBoxScene({ stepId }: VariableBoxSceneProps) {
  switch (stepId) {
    case "what-is-js-intro":
    case "behavior-layer":
    case "js-real-world":
      return null;
    case "console-intro":
    case "console-log":
    case "console-expressions":
      return <ConsoleDemo />;
    case "what-are-variables":
    case "let-keyword":
    case "let-assignment":
      return <LetVariablesDemo />;
    case "let-reassignment":
      return <ReassignmentDemo />;
    case "what-is-const":
    case "const-keyword":
      return <ConstDemo />;
    case "let-vs-const":
      return <LetVsConstDemo />;
    default:
      return <LetVariablesDemo />;
  }
}
