"use client";

import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

interface Scene2DWrapperProps {
  children: React.ReactNode;
  height?: number;
  bgColor?: string;
}

export default function Scene2DWrapper({
  children,
  height = 320,
  bgColor = "#0F172A",
}: Scene2DWrapperProps) {
  return (
    <div
      className="rounded-[var(--radius-md)] overflow-hidden shadow-card"
      style={{ height }}
    >
      <Canvas orthographic>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={1} />
        {children}
      </Canvas>
    </div>
  );
}
