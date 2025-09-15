"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, BufferGeometry } from "three";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  radius?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 1000,
  radius = 50,
}) => {
  const pointsRef = useRef<Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const r = Math.random() * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Random colors (blue to purple gradient)
      const colorVariation = Math.random();
      colors[i * 3] = 0.2 + colorVariation * 0.5; // Red
      colors[i * 3 + 1] = 0.4 + colorVariation * 0.3; // Green
      colors[i * 3 + 2] = 0.8 + colorVariation * 0.2; // Blue
    }

    return { positions, colors };
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const geometry = pointsRef.current.geometry as BufferGeometry;
    const positionAttribute = geometry.getAttribute("position");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const originalX = positions[i3];
      const originalY = positions[i3 + 1];
      const originalZ = positions[i3 + 2];

      // Add subtle movement
      positionAttribute.setX(
        i,
        originalX + Math.sin(time * 0.5 + i * 0.01) * 2
      );
      positionAttribute.setY(
        i,
        originalY + Math.cos(time * 0.3 + i * 0.01) * 2
      );
      positionAttribute.setZ(
        i,
        originalZ + Math.sin(time * 0.4 + i * 0.01) * 1
      );
    }

    positionAttribute.needsUpdate = true;

    // Rotate the entire particle field slowly
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;
