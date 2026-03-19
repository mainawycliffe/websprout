"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import BoxLayer from "./BoxLayer";
import { useBoxModelStore } from "@/stores/box-model-store";
import { getActualContentSize } from "@/lib/box-model-calc";

interface BoxModelCanvasProps {
  highlightLayer?: string;
}

function BoxModelScene({ highlightLayer }: BoxModelCanvasProps) {
  const state = useBoxModelStore();
  const { exploded } = state;
  const actualContent = getActualContentSize(state);

  // Calculate layer dimensions
  const contentW = actualContent.width;
  const contentH = actualContent.height;

  const paddingW = contentW + state.padding.left + state.padding.right;
  const paddingH = contentH + state.padding.top + state.padding.bottom;

  const borderW = paddingW + state.border.left + state.border.right;
  const borderH = paddingH + state.border.top + state.border.bottom;

  const marginW = borderW + state.margin.left + state.margin.right;
  const marginH = borderH + state.margin.top + state.margin.bottom;

  // Exploded view offsets
  const spacing = exploded ? 60 : 0;

  return (
    <>
      <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={50} />
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2}
        maxDistance={8}
      />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />

      {/* Margin layer (outermost) */}
      <BoxLayer
        type="margin"
        width={marginW}
        height={marginH}
        depth={20}
        yOffset={0}
        targetYOffset={spacing * 1.5}
        opacity={0.3}
        highlighted={highlightLayer === "margin"}
      />

      {/* Border layer */}
      <BoxLayer
        type="border"
        width={borderW}
        height={borderH}
        depth={20}
        yOffset={0}
        targetYOffset={spacing * 0.5}
        opacity={0.7}
        highlighted={highlightLayer === "border"}
      />

      {/* Padding layer */}
      <BoxLayer
        type="padding"
        width={paddingW}
        height={paddingH}
        depth={20}
        yOffset={0}
        targetYOffset={-spacing * 0.5}
        opacity={0.5}
        highlighted={highlightLayer === "padding"}
      />

      {/* Content layer (innermost) */}
      <BoxLayer
        type="content"
        width={contentW}
        height={contentH}
        depth={20}
        yOffset={0}
        targetYOffset={-spacing * 1.5}
        opacity={0.9}
        highlighted={highlightLayer === "content"}
      />
    </>
  );
}

export default function BoxModelCanvas({ highlightLayer }: BoxModelCanvasProps) {
  return (
    <div className="w-full h-[400px] rounded-[var(--radius-lg)] overflow-hidden bg-[#0F0F23] shadow-card">
      <Canvas>
        <BoxModelScene highlightLayer={highlightLayer} />
      </Canvas>
    </div>
  );
}
