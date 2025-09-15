"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGeometryProps {
  count?: number;
  speed?: number;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({
  count = 50,
  speed = 0.5,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  // Generate random positions and rotations for each instance
  const { positions, rotations, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const rotations = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random positions in a large sphere
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      // Random rotations
      rotations[i * 3] = Math.random() * Math.PI * 2;
      rotations[i * 3 + 1] = Math.random() * Math.PI * 2;
      rotations[i * 3 + 2] = Math.random() * Math.PI * 2;

      // Random scales
      scales[i] = Math.random() * 0.5 + 0.2;
    }

    return { positions, rotations, scales };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime() * speed;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Floating animation
      tempObject.position.set(
        positions[i3] + Math.sin(time + i * 0.1) * 2,
        positions[i3 + 1] + Math.cos(time + i * 0.15) * 2,
        positions[i3 + 2] + Math.sin(time + i * 0.2) * 1
      );

      // Rotation animation
      tempObject.rotation.set(
        rotations[i3] + time * 0.5,
        rotations[i3 + 1] + time * 0.3,
        rotations[i3 + 2] + time * 0.4
      );

      // Scale animation
      const scale = scales[i] * (1 + Math.sin(time + i * 0.3) * 0.2);
      tempObject.scale.setScalar(scale);

      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.6}
        roughness={0.7}
        metalness={0.3}
      />
    </instancedMesh>
  );
};

export default FloatingGeometry;
