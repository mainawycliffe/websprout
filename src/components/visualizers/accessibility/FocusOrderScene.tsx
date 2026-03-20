"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";
import LabeledBox from "../shared/LabeledBox";
import AnimatedArrow from "../shared/AnimatedArrow";

interface FocusOrderSceneProps {
  variant: "no-focus" | "tab-cycle" | "focus-styles" | "skip-link";
}

const elements = [
  { label: "Link", x: -4.0 },
  { label: "Button", x: -2.0 },
  { label: "Input", x: 0 },
  { label: "Button", x: 2.0 },
  { label: "Link", x: 4.0 },
];

const elementWidth = 1.5;
const elementHeight = 0.6;

function ElementRow({
  y = 0,
  opacity = 0.6,
  highlighted,
}: {
  y?: number;
  opacity?: number;
  highlighted?: number;
}) {
  return (
    <group>
      {elements.map((el, i) => (
        <LabeledBox
          key={`${el.label}-${i}`}
          position={[el.x, y, 0]}
          width={elementWidth}
          height={elementHeight}
          color="#3B82F6"
          label={el.label}
          labelSize={0.2}
          opacity={highlighted === i ? 1 : opacity}
          highlighted={highlighted === i}
        />
      ))}
    </group>
  );
}

function FocusRing({ x, y }: { x: number; y: number }) {
  const hw = elementWidth / 2 + 0.12;
  const hh = elementHeight / 2 + 0.12;
  return (
    <Line
      points={[
        [x - hw, y - hh, 0.3],
        [x + hw, y - hh, 0.3],
        [x + hw, y + hh, 0.3],
        [x - hw, y + hh, 0.3],
        [x - hw, y - hh, 0.3],
      ]}
      color="#3B82F6"
      lineWidth={3}
    />
  );
}

function NoFocusScene() {
  return (
    <group>
      <Text
        position={[0, 2.2, 0.1]}
        fontSize={0.28}
        color="#EF4444"
        anchorX="center"
      >
        No keyboard access
      </Text>
      <Text
        position={[0, 1.6, 0.1]}
        fontSize={0.2}
        color="#94A3B8"
        anchorX="center"
      >
        Mouse-only users can click, but keyboard users are stuck
      </Text>
      <ElementRow y={0} opacity={0.3} />
      {/* Cursor with X */}
      <Text
        position={[0, -1.2, 0.1]}
        fontSize={0.4}
        color="#EF4444"
        anchorX="center"
      >
        ⌨ ✕
      </Text>
      <Text
        position={[0, -1.8, 0.1]}
        fontSize={0.18}
        color="#64748B"
        anchorX="center"
      >
        No focus indicators — invisible to keyboard users
      </Text>
    </group>
  );
}

function TabCycleScene() {
  const timerRef = useRef(0);
  const indexRef = useRef(0);
  const focusRingRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    timerRef.current += delta;
    if (timerRef.current > 1.5) {
      timerRef.current = 0;
      indexRef.current = (indexRef.current + 1) % elements.length;
    }
    if (focusRingRef.current) {
      const targetX = elements[indexRef.current].x;
      focusRingRef.current.position.x +=
        (targetX - focusRingRef.current.position.x) * 0.15;
    }
  });

  return (
    <group>
      <Text
        position={[0, 2.2, 0.1]}
        fontSize={0.28}
        color="#3B82F6"
        anchorX="center"
      >
        Tab cycles through elements
      </Text>
      <ElementRow y={0} opacity={0.5} />
      {/* Animated focus ring */}
      <group ref={focusRingRef} position={[elements[0].x, 0, 0]}>
        <FocusRing x={0} y={0} />
      </group>
      <Text
        position={[0, -1.2, 0.1]}
        fontSize={0.22}
        color="#3B82F6"
        anchorX="center"
      >
        Tab →
      </Text>
      <Text
        position={[0, -1.7, 0.1]}
        fontSize={0.17}
        color="#94A3B8"
        anchorX="center"
      >
        Press Tab to move focus to the next interactive element
      </Text>
    </group>
  );
}

function FocusStylesScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Focus Indicators: Default vs Custom
      </Text>

      {/* Top row: default outline */}
      <Text
        position={[-4.8, 1.4, 0.1]}
        fontSize={0.18}
        color="#64748B"
        anchorX="left"
      >
        Default:
      </Text>
      {elements.map((el, i) => (
        <group key={`default-${i}`}>
          <LabeledBox
            position={[el.x, 1.0, 0]}
            width={elementWidth}
            height={elementHeight}
            color="#3B82F6"
            label={el.label}
            labelSize={0.18}
            opacity={0.5}
          />
          {i === 2 && (
            <Line
              points={[
                [el.x - elementWidth / 2 - 0.05, 1.0 - elementHeight / 2 - 0.05, 0.3],
                [el.x + elementWidth / 2 + 0.05, 1.0 - elementHeight / 2 - 0.05, 0.3],
                [el.x + elementWidth / 2 + 0.05, 1.0 + elementHeight / 2 + 0.05, 0.3],
                [el.x - elementWidth / 2 - 0.05, 1.0 + elementHeight / 2 + 0.05, 0.3],
                [el.x - elementWidth / 2 - 0.05, 1.0 - elementHeight / 2 - 0.05, 0.3],
              ]}
              color="#60A5FA"
              lineWidth={1}
            />
          )}
        </group>
      ))}

      {/* Bottom row: custom focus */}
      <Text
        position={[-4.8, -0.6, 0.1]}
        fontSize={0.18}
        color="#10B981"
        anchorX="left"
      >
        Custom:
      </Text>
      {elements.map((el, i) => (
        <group key={`custom-${i}`}>
          <LabeledBox
            position={[el.x, -1.0, 0]}
            width={elementWidth}
            height={elementHeight}
            color="#3B82F6"
            label={el.label}
            labelSize={0.18}
            opacity={0.5}
          />
          {i === 2 && (
            <Line
              points={[
                [el.x - elementWidth / 2 - 0.12, -1.0 - elementHeight / 2 - 0.12, 0.3],
                [el.x + elementWidth / 2 + 0.12, -1.0 - elementHeight / 2 - 0.12, 0.3],
                [el.x + elementWidth / 2 + 0.12, -1.0 + elementHeight / 2 + 0.12, 0.3],
                [el.x - elementWidth / 2 - 0.12, -1.0 + elementHeight / 2 + 0.12, 0.3],
                [el.x - elementWidth / 2 - 0.12, -1.0 - elementHeight / 2 - 0.12, 0.3],
              ]}
              color="#10B981"
              lineWidth={3}
            />
          )}
        </group>
      ))}

      <Text
        position={[0, -2.2, 0.1]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
      >
        :focus-visible — thick, high-contrast ring is easier to see
      </Text>
    </group>
  );
}

function SkipLinkScene() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0.1]}
        fontSize={0.26}
        color="#94A3B8"
        anchorX="center"
      >
        Skip Links
      </Text>

      {/* Skip to content box */}
      <LabeledBox
        position={[-4.0, 1.5, 0]}
        width={2.0}
        height={0.5}
        color="#8B5CF6"
        label="Skip to content"
        labelSize={0.17}
        highlighted
      />

      {/* Nav elements */}
      <Text
        position={[-2.0, 0.5, 0.1]}
        fontSize={0.16}
        color="#64748B"
        anchorX="center"
      >
        Navigation
      </Text>
      {elements.slice(0, 3).map((el, i) => (
        <LabeledBox
          key={`nav-${i}`}
          position={[el.x + 2, 0, 0]}
          width={1.3}
          height={0.5}
          color="#475569"
          label={el.label}
          labelSize={0.17}
          opacity={0.3}
        />
      ))}

      {/* Main content */}
      <LabeledBox
        position={[3.0, 0, 0]}
        width={2.4}
        height={0.6}
        color="#10B981"
        label="<main> Content"
        labelSize={0.18}
        highlighted
      />

      {/* Animated arrow from skip link to main */}
      <AnimatedArrow
        from={[-3.0, 1.5]}
        to={[1.8, 0]}
        color="#8B5CF6"
        animated
        label="Skip!"
      />

      <Text
        position={[0, -1.4, 0.1]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
      >
        Skip links let keyboard users jump past navigation
      </Text>
    </group>
  );
}

export default function FocusOrderScene({ variant }: FocusOrderSceneProps) {
  switch (variant) {
    case "no-focus":
      return <NoFocusScene />;
    case "tab-cycle":
      return <TabCycleScene />;
    case "focus-styles":
      return <FocusStylesScene />;
    case "skip-link":
      return <SkipLinkScene />;
    default:
      return null;
  }
}
