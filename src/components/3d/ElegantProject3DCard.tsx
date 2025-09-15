"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";

interface ElegantProject3DCardProps {
  title: string;
  description: string;
  position: [number, number, number];
  color: string;
  index: number;
  liveUrl?: string;
  technologies: string[];
  onLoad?: () => void;
}

const ElegantProject3DCard: React.FC<ElegantProject3DCardProps> = ({
  title,
  description,
  position,
  color,
  index,
  liveUrl,
  technologies,
  onLoad,
}) => {
  const groupRef = useRef<Group>(null);
  const cardRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (index === 0) {
      const timer = setTimeout(() => {
        if (!isLoaded) {
          setIsLoaded(true);
          onLoad?.();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, onLoad, index]);

  useFrame((state) => {
    if (!groupRef.current || !cardRef.current) return;

    const time = state.clock.getElapsedTime();

    // Gentle floating animation
    groupRef.current.position.y =
      position[1] + Math.sin(time * 0.5 + index * 0.8) * 0.1;

    // Subtle rotation on hover
    const targetRotationY = hovered ? 0.05 : 0;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.05
    );

    // Smooth scaling
    const targetScale = hovered ? 1.05 : clicked ? 0.98 : 1;
    const currentScale = cardRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
    cardRef.current.scale.setScalar(newScale);

    // Material glow effect
    const material = cardRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity,
      hovered ? 0.2 : 0.05,
      0.1
    );
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);

    if (liveUrl && typeof window !== "undefined") {
      window.open(liveUrl, "_blank");
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
      onPointerDown={() => setClicked(true)}
      onPointerUp={() => setClicked(false)}
    >
      {/* Main card */}
      <RoundedBox
        ref={cardRef}
        args={[4, 2.8, 0.1]}
        radius={0.15}
        smoothness={8}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.05}
        />
      </RoundedBox>

      {/* Clean border */}
      {hovered && (
        <RoundedBox args={[4.1, 2.9, 0.05]} radius={0.16} smoothness={8}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </RoundedBox>
      )}

      {/* Title */}
      <Text
        position={[0, 0.8, 0.06]}
        fontSize={0.24}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        font="/fonts/inter-bold.woff"
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        position={[0, 0.2, 0.06]}
        fontSize={0.13}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        textAlign="center"
        lineHeight={1.3}
      >
        {description}
      </Text>

      {/* Technology tags */}
      <group position={[0, -0.4, 0.06]}>
        {technologies.slice(0, 3).map((tech, techIndex) => (
          <group key={tech} position={[(techIndex - 1) * 1.1, 0, 0]}>
            <RoundedBox args={[0.9, 0.22, 0.02]} radius={0.11}>
              <meshBasicMaterial
                color={color}
                transparent
                opacity={hovered ? 0.8 : 0.6}
              />
            </RoundedBox>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.08}
              color="white"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.8}
            >
              {tech}
            </Text>
          </group>
        ))}
      </group>

      {/* View Live button */}
      {liveUrl && (
        <group position={[0, -0.9, 0.06]}>
          <RoundedBox args={[1.4, 0.35, 0.03]} radius={0.17}>
            <meshStandardMaterial
              color={hovered ? "#ffffff" : color}
              transparent
              opacity={0.9}
              emissive={hovered ? color : "#000000"}
              emissiveIntensity={hovered ? 0.1 : 0}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.11}
            color={hovered ? color : "white"}
            anchorX="center"
            anchorY="middle"
          >
            View Live
          </Text>
        </group>
      )}

      {/* Subtle corner accents */}
      <mesh position={[-1.8, 1.2, 0.06]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.7} />
      </mesh>
      <mesh position={[1.8, 1.2, 0.06]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

export default ElegantProject3DCard;
