"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Box } from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";

interface SimpleProject3DCardProps {
  title: string;
  description: string;
  position: [number, number, number];
  color: string;
  index: number;
  liveUrl?: string;
  technologies: string[];
  onLoad?: () => void;
}

const SimpleProject3DCard: React.FC<SimpleProject3DCardProps> = ({
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

    // Smooth scaling
    const targetScale = hovered ? 1.05 : clicked ? 0.98 : 1;
    const currentScale = cardRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
    cardRef.current.scale.setScalar(newScale);
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
    >
      {/* Main card */}
      <Box ref={cardRef} args={[4, 2.5, 0.1]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.1}
        />
      </Box>

      {/* Title */}
      <Text
        position={[0, 0.6, 0.06]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        position={[0, 0.1, 0.06]}
        fontSize={0.1}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        textAlign="center"
      >
        {description}
      </Text>

      {/* Technology tags */}
      <group position={[0, -0.4, 0.06]}>
        {technologies.slice(0, 3).map((tech, techIndex) => (
          <group key={tech} position={[(techIndex - 1) * 1.1, 0, 0]}>
            <Box args={[0.9, 0.2, 0.02]}>
              <meshBasicMaterial color={color} transparent opacity={0.7} />
            </Box>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.06}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {tech}
            </Text>
          </group>
        ))}
      </group>

      {/* View Live button */}
      {liveUrl && (
        <group position={[0, -0.8, 0.06]}>
          <Box args={[1.2, 0.3, 0.03]}>
            <meshStandardMaterial
              color={hovered ? "#ffffff" : color}
              transparent
              opacity={0.9}
            />
          </Box>
          <Text
            position={[0, 0, 0.02]}
            fontSize={0.08}
            color={hovered ? color : "white"}
            anchorX="center"
            anchorY="middle"
          >
            View Live
          </Text>
        </group>
      )}
    </group>
  );
};

export default SimpleProject3DCard;
