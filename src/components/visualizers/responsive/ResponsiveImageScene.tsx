"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import LabeledBox from "../shared/LabeledBox";
import AnimatedArrow from "../shared/AnimatedArrow";

interface ResponsiveImageSceneProps {
  variant: "overflow" | "constrained" | "srcset" | "picture";
}

/**
 * Simple image placeholder: a rectangle with a mountain/sun icon
 */
function ImagePlaceholder({
  position,
  width,
  height,
  color = "#3B82F6",
  opacity = 0.5,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  color?: string;
  opacity?: number;
}) {
  const hw = width / 2;
  const hh = height / 2;

  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
      {/* Mountain triangle */}
      <Line
        points={[
          [-hw * 0.4, -hh * 0.3, 0.05],
          [0, hh * 0.3, 0.05],
          [hw * 0.4, -hh * 0.3, 0.05],
          [-hw * 0.4, -hh * 0.3, 0.05],
        ]}
        color="#ffffff"
        lineWidth={1.5}
      />
      {/* Sun circle */}
      <mesh position={[hw * 0.3, hh * 0.3, 0.05]}>
        <circleGeometry args={[Math.min(width, height) * 0.08, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function DeviceFrame({
  position,
  width,
  height,
  label,
  children,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  label: string;
  children?: React.ReactNode;
}) {
  const hw = width / 2;
  const hh = height / 2;

  return (
    <group position={position}>
      <Line
        points={[
          [-hw, -hh, 0],
          [hw, -hh, 0],
          [hw, hh, 0],
          [-hw, hh, 0],
          [-hw, -hh, 0],
        ]}
        color="#94A3B8"
        lineWidth={2}
      />
      <Text
        position={[0, -hh - 0.25, 0]}
        fontSize={0.18}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      {children}
    </group>
  );
}

function ClipIndicator({
  position,
  height,
}: {
  position: [number, number, number];
  height: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 4) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[0.1, height]} />
      <meshBasicMaterial color="#EF4444" transparent opacity={0.6} />
    </mesh>
  );
}

function OverflowVariant() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.24}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
      >
        Large image in small container
      </Text>

      {/* Container */}
      <Line
        points={[
          [-1, -1.5, 0],
          [1, -1.5, 0],
          [1, 1.5, 0],
          [-1, 1.5, 0],
          [-1, -1.5, 0],
        ]}
        color="#94A3B8"
        lineWidth={2}
      />
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.16}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Container (200px)
      </Text>

      {/* Overflowing image */}
      <ImagePlaceholder
        position={[0, 0, 0.02]}
        width={4}
        height={3}
        color="#3B82F6"
        opacity={0.35}
      />

      {/* Clip indicators on sides */}
      <ClipIndicator position={[1, 0, 0.1]} height={3} />
      <ClipIndicator position={[-1, 0, 0.1]} height={3} />

      <Text
        position={[0, -2.3, 0]}
        fontSize={0.18}
        color="#EF4444"
        anchorX="center"
        anchorY="middle"
      >
        Image overflows its container!
      </Text>
    </group>
  );
}

function ConstrainedVariant() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.24}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
      >
        {"max-width: 100% constrains the image"}
      </Text>

      {/* Container */}
      <Line
        points={[
          [-1.5, -1.5, 0],
          [1.5, -1.5, 0],
          [1.5, 1.5, 0],
          [-1.5, 1.5, 0],
          [-1.5, -1.5, 0],
        ]}
        color="#10B981"
        lineWidth={2}
      />

      {/* Constrained image fits inside */}
      <ImagePlaceholder
        position={[0, 0, 0.02]}
        width={2.8}
        height={2.1}
        color="#10B981"
        opacity={0.4}
      />

      <Text
        position={[0, -0.05, 0.1]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        max-width: 100%
      </Text>

      <Text
        position={[0, -2.3, 0]}
        fontSize={0.18}
        color="#10B981"
        anchorX="center"
        anchorY="middle"
      >
        Image scales down to fit container
      </Text>
    </group>
  );
}

function SrcsetVariant() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.22}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
      >
        srcset delivers the right image size
      </Text>

      {/* Cloud / source */}
      <LabeledBox
        position={[0, 2.0, 0]}
        width={1.8}
        height={0.5}
        color="#8B5CF6"
        label="Server"
        labelSize={0.18}
        opacity={0.5}
      />

      {/* Phone - small image */}
      <DeviceFrame position={[-3.5, -0.5, 0]} width={1.6} height={2.5} label="">
        <ImagePlaceholder
          position={[0, 0.1, 0.05]}
          width={1.2}
          height={0.9}
          color="#10B981"
          opacity={0.4}
        />
        <Text
          position={[0, -0.8, 0.05]}
          fontSize={0.16}
          color="#10B981"
          anchorX="center"
          anchorY="middle"
        >
          400w
        </Text>
      </DeviceFrame>
      <Text
        position={[-3.5, -2.3, 0]}
        fontSize={0.15}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Small (~50KB)
      </Text>

      {/* Tablet - medium image */}
      <DeviceFrame position={[0, -0.5, 0]} width={2.5} height={2.5} label="">
        <ImagePlaceholder
          position={[0, 0.1, 0.05]}
          width={2}
          height={1.3}
          color="#3B82F6"
          opacity={0.4}
        />
        <Text
          position={[0, -0.8, 0.05]}
          fontSize={0.16}
          color="#3B82F6"
          anchorX="center"
          anchorY="middle"
        >
          800w
        </Text>
      </DeviceFrame>
      <Text
        position={[0, -2.3, 0]}
        fontSize={0.15}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Medium (~120KB)
      </Text>

      {/* Desktop - large image */}
      <DeviceFrame position={[3.5, -0.5, 0]} width={3.2} height={2.5} label="">
        <ImagePlaceholder
          position={[0, 0.1, 0.05]}
          width={2.8}
          height={1.6}
          color="#8B5CF6"
          opacity={0.4}
        />
        <Text
          position={[0, -0.8, 0.05]}
          fontSize={0.16}
          color="#8B5CF6"
          anchorX="center"
          anchorY="middle"
        >
          1200w
        </Text>
      </DeviceFrame>
      <Text
        position={[3.5, -2.3, 0]}
        fontSize={0.15}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        Large (~250KB)
      </Text>

      {/* Arrows from cloud to devices */}
      <AnimatedArrow from={[-0.5, 1.7]} to={[-3.5, 0.8]} color="#10B981" animated />
      <AnimatedArrow from={[0, 1.7]} to={[0, 0.8]} color="#3B82F6" animated />
      <AnimatedArrow from={[0.5, 1.7]} to={[3.5, 0.8]} color="#8B5CF6" animated />
    </group>
  );
}

function PictureVariant() {
  return (
    <group>
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.22}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
      >
        {"<picture> enables art direction"}
      </Text>

      {/* Mobile - cropped/zoomed version */}
      <DeviceFrame position={[-2.5, 0, 0]} width={2} height={3.5} label="Mobile">
        {/* Zoomed-in crop of image (just the mountain peak) */}
        <mesh position={[0, 0.2, 0.05]}>
          <planeGeometry args={[1.6, 2]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.35} />
        </mesh>
        <Line
          points={[
            [-0.3, -0.2, 0.1],
            [0, 0.5, 0.1],
            [0.3, -0.2, 0.1],
            [-0.3, -0.2, 0.1],
          ]}
          color="#ffffff"
          lineWidth={2}
        />
        <Text
          position={[0, -1.1, 0.05]}
          fontSize={0.14}
          color="#06B6D4"
          anchorX="center"
          anchorY="middle"
        >
          Cropped for mobile
        </Text>
      </DeviceFrame>

      {/* Desktop - full image */}
      <DeviceFrame
        position={[2.5, 0, 0]}
        width={4.5}
        height={3.5}
        label="Desktop"
      >
        <ImagePlaceholder
          position={[0, 0.2, 0.05]}
          width={4}
          height={2.2}
          color="#8B5CF6"
          opacity={0.35}
        />
        <Text
          position={[0, -1.1, 0.05]}
          fontSize={0.14}
          color="#8B5CF6"
          anchorX="center"
          anchorY="middle"
        >
          Full landscape
        </Text>
      </DeviceFrame>

      {/* Art direction label */}
      <Text
        position={[0, -2.6, 0]}
        fontSize={0.18}
        color="#F59E0B"
        anchorX="center"
        anchorY="middle"
      >
        Different crops for different screens
      </Text>
    </group>
  );
}

export default function ResponsiveImageScene({
  variant,
}: ResponsiveImageSceneProps) {
  switch (variant) {
    case "overflow":
      return <OverflowVariant />;
    case "constrained":
      return <ConstrainedVariant />;
    case "srcset":
      return <SrcsetVariant />;
    case "picture":
      return <PictureVariant />;
    default:
      return null;
  }
}
