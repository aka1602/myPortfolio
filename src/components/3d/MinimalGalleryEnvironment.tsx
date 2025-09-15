"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Group } from "three";

const MinimalGalleryEnvironment: React.FC = () => {
  const lightGroupRef = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Very subtle light rotation
    if (lightGroupRef.current) {
      lightGroupRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group>
      {/* Clean starfield */}
      <Stars
        radius={200}
        depth={100}
        count={1500}
        factor={3}
        saturation={0.8}
        fade
        speed={0.2}
      />

      {/* Minimal lighting setup */}
      <group ref={lightGroupRef}>
        {/* Main lighting */}
        <ambientLight intensity={0.4} color="#f8fafc" />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          color="#ffffff"
          castShadow
        />

        {/* Subtle accent lights */}
        <pointLight position={[-15, 10, 15]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[15, 10, -15]} intensity={0.3} color="#8b5cf6" />
      </group>

      {/* Simple floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Subtle grid lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -7.99, 0]}>
        <planeGeometry args={[100, 100, 20, 20]} />
        <meshBasicMaterial
          color="#1e293b"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

export default MinimalGalleryEnvironment;
