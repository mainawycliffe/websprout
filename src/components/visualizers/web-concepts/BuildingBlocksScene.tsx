"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import LabeledBox from "../shared/LabeledBox";

interface BuildingBlocksSceneProps {
  stepId: string;
}

function CyclingHighlight() {
  const phaseRef = useRef(0);
  const opacitiesRef = useRef([1, 0.3, 0.3]);

  useFrame((_, delta) => {
    phaseRef.current += delta;
    const cycle = phaseRef.current % 6;
    if (cycle < 2) {
      opacitiesRef.current = [1, 0.3, 0.3];
    } else if (cycle < 4) {
      opacitiesRef.current = [0.3, 1, 0.3];
    } else {
      opacitiesRef.current = [0.3, 0.3, 1];
    }
  });

  return (
    <group>
      <HighlightLayer
        y={-1.2}
        color="#3B82F6"
        label="HTML — Structure"
        index={0}
        opacitiesRef={opacitiesRef}
      />
      <HighlightLayer
        y={0}
        color="#8B5CF6"
        label="CSS — Style"
        index={1}
        opacitiesRef={opacitiesRef}
      />
      <HighlightLayer
        y={1.2}
        color="#F59E0B"
        label="JS — Behavior"
        index={2}
        opacitiesRef={opacitiesRef}
      />
    </group>
  );
}

function HighlightLayer({
  y,
  color,
  label,
  index,
  opacitiesRef,
}: {
  y: number;
  color: string;
  label: string;
  index: number;
  opacitiesRef: React.RefObject<number[]>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      const target = opacitiesRef.current[index];
      mat.opacity += (target - mat.opacity) * 0.1;
    }
  });

  return (
    <group position={[0, y, 0]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[7, 1]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.38}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

export default function BuildingBlocksScene({
  stepId,
}: BuildingBlocksSceneProps) {
  if (stepId === "the-trio") {
    return <CyclingHighlight />;
  }

  const showSubLabels = stepId === "real-world-examples";

  return (
    <group>
      <LabeledBox
        position={[0, -1.2, 0]}
        width={7}
        height={1}
        color="#3B82F6"
        label="HTML — Structure"
        labelSize={0.38}
        opacity={0.85}
      />
      {showSubLabels && (
        <Text
          position={[0, -1.7, 0.1]}
          fontSize={0.24}
          color="#93C5FD"
          anchorX="center"
          anchorY="middle"
        >
          headings, links, images
        </Text>
      )}

      <LabeledBox
        position={[0, 0, 0]}
        width={7}
        height={1}
        color="#8B5CF6"
        label="CSS — Style"
        labelSize={0.38}
        opacity={0.85}
      />
      {showSubLabels && (
        <Text
          position={[0, -0.5, 0.1]}
          fontSize={0.24}
          color="#C4B5FD"
          anchorX="center"
          anchorY="middle"
        >
          colors, fonts, layout
        </Text>
      )}

      <LabeledBox
        position={[0, 1.2, 0]}
        width={7}
        height={1}
        color="#F59E0B"
        label="JS — Behavior"
        labelSize={0.38}
        opacity={0.85}
      />
      {showSubLabels && (
        <Text
          position={[0, 0.7, 0.1]}
          fontSize={0.24}
          color="#FCD34D"
          anchorX="center"
          anchorY="middle"
        >
          clicks, animations, forms
        </Text>
      )}
    </group>
  );
}
