"use client";

import { Text } from "@react-three/drei";
import LabeledBox from "../shared/LabeledBox";
import AnimatedArrow from "../shared/AnimatedArrow";

interface DnsLookupSceneProps {
  stepId: string;
}

export default function DnsLookupScene({ stepId: _stepId }: DnsLookupSceneProps) {
  return (
    <group>
      {/* Browser */}
      <LabeledBox
        position={[-3.8, 0, 0]}
        width={2}
        height={1.4}
        color="#3B82F6"
        label="Browser"
        labelSize={0.24}
        opacity={0.7}
      />

      {/* DNS Server */}
      <LabeledBox
        position={[0, 0, 0]}
        width={2.4}
        height={1.4}
        color="#8B5CF6"
        label="DNS Server"
        labelSize={0.24}
        opacity={0.8}
      />
      <Text
        position={[0, -0.4, 0.1]}
        fontSize={0.16}
        color="#C4B5FD"
        anchorX="center"
        anchorY="middle"
      >
        (phone book)
      </Text>

      {/* Browser */}
      <LabeledBox
        position={[3.8, 0, 0]}
        width={2}
        height={1.4}
        color="#3B82F6"
        label="Browser"
        labelSize={0.24}
        opacity={0.7}
      />

      {/* Query arrow */}
      <AnimatedArrow
        from={[-2.6, 0.4]}
        to={[-1.4, 0.4]}
        color="#F59E0B"
        animated
        label="google.com?"
        labelSize={0.2}
      />

      {/* Response arrow */}
      <AnimatedArrow
        from={[1.4, -0.1]}
        to={[2.6, -0.1]}
        color="#10B981"
        animated
        label="142.250.80.46"
        labelSize={0.18}
      />

      {/* Description */}
      <Text
        position={[0, -1.8, 0.1]}
        fontSize={0.2}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        DNS translates domain names into IP addresses
      </Text>
    </group>
  );
}
