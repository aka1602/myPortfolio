"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";

interface Project3DCardProps {
  title: string;
  description: string;
  position: [number, number, number];
  color: string;
  index: number;
  onLoad?: () => void;
}

const Project3DCard: React.FC<Project3DCardProps> = ({
  title,
  description,
  position,
  color,
  index,
  onLoad,
}) => {
  const groupRef = useRef<Group>(null);
  const cardRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger loading completion for the first card (index 0) only
    if (index === 0) {
      const timer = setTimeout(() => {
        if (!isLoaded) {
          setIsLoaded(true);
          onLoad?.();
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, onLoad, index]);

  useFrame((state) => {
    if (!groupRef.current || !cardRef.current) return;

    const time = state.clock.getElapsedTime();

    // Floating animation
    groupRef.current.position.y =
      position[1] + Math.sin(time + index * 0.5) * 0.3;
    groupRef.current.position.x =
      position[0] + Math.cos(time + index * 0.3) * 0.2;

    // Rotation animation
    groupRef.current.rotation.y = Math.sin(time * 0.2 + index) * 0.1;
    groupRef.current.rotation.x = Math.cos(time * 0.15 + index) * 0.05;

    // Hover effect
    const targetScale = hovered ? 1.1 : 1;
    cardRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Glow effect when hovered
    const material = cardRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = hovered ? 0.3 : 0.1;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main card */}
      <RoundedBox ref={cardRef} args={[3, 2, 0.2]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      {/* Title */}
      <Text
        position={[0, 0.5, 0.11]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={2.5}
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        position={[0, -0.2, 0.11]}
        fontSize={0.15}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-regular.woff"
        maxWidth={2.5}
        textAlign="center"
      >
        {description}
      </Text>

      {/* Decorative elements */}
      <mesh position={[-1.2, 0.7, 0.11]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[1.2, 0.7, 0.11]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>
      <mesh position={[0, -0.7, 0.11]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Glow effect */}
      {hovered && (
        <RoundedBox args={[3.5, 2.5, 0.1]} radius={0.15} smoothness={4}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </RoundedBox>
      )}
    </group>
  );
};

export default Project3DCard;
