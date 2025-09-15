"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";

interface Skill {
  name: string;
  color: string;
  position: [number, number, number];
}

interface SkillOrbsProps {
  onLoad?: () => void;
}

const SkillOrbs: React.FC<SkillOrbsProps> = ({ onLoad }) => {
  const groupRef = useRef<Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const skills: Skill[] = useMemo(
    () => [
      { name: "React", color: "#61dafb", position: [0, 0, 0] },
      { name: "TypeScript", color: "#3178c6", position: [5, 3, -2] },
      { name: "Next.js", color: "#ffffff", position: [-5, 2, 3] },
      { name: "Node.js", color: "#339933", position: [3, -4, 2] },
      { name: "Three.js", color: "#049ef4", position: [-4, -3, -2] },
      { name: "Python", color: "#3776ab", position: [2, 4, -4] },
      { name: "AWS", color: "#ff9900", position: [-3, 1, 4] },
      { name: "Docker", color: "#2496ed", position: [4, -2, -3] },
      { name: "JavaScript", color: "#f7df1e", position: [-2, -4, 1] },
      { name: "MongoDB", color: "#47a248", position: [1, 2, 4] },
    ],
    []
  );

  useEffect(() => {
    // Simulate loading completion after a short delay
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
        onLoad?.();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoaded, onLoad]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate the entire group slowly
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    // Animate individual orbs
    groupRef.current.children.forEach((child, index) => {
      if (child.type === "Group") {
        const orbGroup = child as Group;
        const sphere = orbGroup.children[0] as Mesh;

        if (sphere) {
          // Individual floating motion
          sphere.position.y =
            skills[index].position[1] + Math.sin(time + index) * 0.5;
          sphere.position.x =
            skills[index].position[0] + Math.cos(time + index * 0.5) * 0.3;

          // Rotation
          sphere.rotation.x = time * (0.5 + index * 0.1);
          sphere.rotation.y = time * (0.3 + index * 0.1);

          // Scale pulsing
          const scale = 1 + Math.sin(time * 2 + index) * 0.1;
          sphere.scale.setScalar(scale);
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill) => (
        <group key={skill.name} position={skill.position}>
          {/* Main Orb */}
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={skill.color}
              transparent
              opacity={0.9}
              roughness={0.1}
              metalness={0.8}
              emissive={skill.color}
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Inner Core */}
          <mesh>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshBasicMaterial color={skill.color} transparent opacity={0.6} />
          </mesh>

          {/* Skill name text */}
          <Text
            position={[0, -2, 0]}
            fontSize={0.35}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {skill.name}
          </Text>

          {/* Outer Glow Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.5, 32]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Atmospheric Glow */}
          <mesh>
            <sphereGeometry args={[1.8, 16, 16]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={0.05}
              side={THREE.BackSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default SkillOrbs;
