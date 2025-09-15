"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Text,
  RoundedBox,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";

interface EnhancedProject3DCardProps {
  title: string;
  description: string;
  position: [number, number, number];
  color: string;
  index: number;
  liveUrl?: string;
  technologies: string[];
  onLoad?: () => void;
}

const EnhancedProject3DCard: React.FC<EnhancedProject3DCardProps> = ({
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
  const glowRef = useRef<Mesh>(null);
  const particlesRef = useRef<Mesh>(null);
  const holoRingRef = useRef<Mesh>(null);
  const dataOrbRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create particle system
  const particleCount = 100;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Random positions around the card
      positions[i3] = (Math.random() - 0.5) * 6;
      positions[i3 + 1] = (Math.random() - 0.5) * 4;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;

      // Color based on card color
      const cardColor = new THREE.Color(color);
      colors[i3] = cardColor.r;
      colors[i3 + 1] = cardColor.g;
      colors[i3 + 2] = cardColor.b;

      sizes[i] = Math.random() * 2 + 1;
    }

    return { positions, colors, sizes };
  }, [color]);

  useEffect(() => {
    // Trigger loading completion for the first card (index 0) only
    if (index === 0) {
      const timer = setTimeout(() => {
        if (!isLoaded) {
          setIsLoaded(true);
          onLoad?.();
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, onLoad, index]);

  useFrame((state) => {
    if (!groupRef.current || !cardRef.current) return;

    const time = state.clock.getElapsedTime();

    // Enhanced floating animation
    const floatY = Math.sin(time * 0.8 + index * 0.8) * 0.5;
    const floatX = Math.cos(time * 0.6 + index * 1.2) * 0.3;
    const floatZ = Math.sin(time * 0.5 + index * 0.6) * 0.2;

    groupRef.current.position.set(
      position[0] + floatX,
      position[1] + floatY,
      position[2] + floatZ
    );

    // Enhanced rotation animation
    groupRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.15;
    groupRef.current.rotation.x = Math.cos(time * 0.2 + index) * 0.08;
    groupRef.current.rotation.z = Math.sin(time * 0.1 + index) * 0.05;

    // Smooth hover scaling
    const targetScale = hovered ? 1.15 : clicked ? 0.95 : 1;
    const currentScale = cardRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
    cardRef.current.scale.setScalar(newScale);

    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time * 2 + i * 0.1) * 0.01;
        positions[i3] += Math.cos(time * 1.5 + i * 0.2) * 0.005;
        positions[i3 + 2] += Math.sin(time * 1.8 + i * 0.15) * 0.003;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      // Particle material animation
      const particleMaterial = particlesRef.current
        .material as THREE.PointsMaterial;
      particleMaterial.opacity = hovered ? 0.8 : 0.4;
      particleMaterial.size = hovered ? 3 : 2;
    }

    // Holographic ring animation
    if (holoRingRef.current) {
      holoRingRef.current.rotation.z = time * 2;
      holoRingRef.current.rotation.x = Math.sin(time) * 0.1;
      const ringMaterial = holoRingRef.current
        .material as THREE.MeshBasicMaterial;
      ringMaterial.opacity = hovered ? 0.6 : 0.2;
    }

    // Data orb pulsing
    if (dataOrbRef.current) {
      const scale = 1 + Math.sin(time * 3) * 0.2;
      dataOrbRef.current.scale.setScalar(scale);
      dataOrbRef.current.rotation.x = time * 0.5;
      dataOrbRef.current.rotation.y = time * 0.7;
      dataOrbRef.current.rotation.z = time * 0.3;
    }

    // Dynamic glow effect
    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = hovered ? 0.4 : 0.15;
      glowRef.current.scale.setScalar(hovered ? 1.3 : 1.1);
    }

    // Card material effects
    const material = cardRef.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = hovered ? 0.3 : 0.1;
    material.roughness = hovered ? 0.1 : 0.3;
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
      {/* Background glow */}
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <planeGeometry args={[4, 3]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main card */}
      <RoundedBox
        ref={cardRef}
        args={[3.5, 2.5, 0.15]}
        radius={0.15}
        smoothness={8}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.95}
          roughness={0.3}
          metalness={0.4}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </RoundedBox>

      {/* Card border glow */}
      <RoundedBox args={[3.6, 2.6, 0.1]} radius={0.16} smoothness={8}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.6 : 0.3}
          side={THREE.BackSide}
        />
      </RoundedBox>

      {/* Title */}
      <Text
        position={[0, 0.8, 0.08]}
        fontSize={0.22}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        outlineWidth={hovered ? 0.005 : 0}
        outlineColor={color}
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        position={[0, 0.3, 0.08]}
        fontSize={0.12}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.2}
        textAlign="center"
        lineHeight={1.2}
      >
        {description}
      </Text>

      {/* Technology tags */}
      <group position={[0, -0.3, 0.08]}>
        {technologies.slice(0, 3).map((tech, techIndex) => (
          <group key={tech} position={[(techIndex - 1) * 1, 0, 0]}>
            <RoundedBox args={[0.8, 0.2, 0.02]} radius={0.1}>
              <meshBasicMaterial color={color} transparent opacity={0.7} />
            </RoundedBox>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.08}
              color="white"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.7}
            >
              {tech}
            </Text>
          </group>
        ))}
      </group>

      {/* Interactive button */}
      {liveUrl && (
        <group position={[0, -0.8, 0.08]}>
          <RoundedBox args={[1.2, 0.3, 0.05]} radius={0.15}>
            <meshStandardMaterial
              color={hovered ? "#ffffff" : color}
              transparent
              opacity={0.9}
              emissive={hovered ? color : "#000000"}
              emissiveIntensity={hovered ? 0.2 : 0}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.1}
            color={hovered ? color : "white"}
            anchorX="center"
            anchorY="middle"
          >
            View Live
          </Text>
        </group>
      )}

      {/* Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[particles.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2}
          transparent
          opacity={0.4}
          vertexColors
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
        />
      </points>

      {/* Holographic Ring */}
      <mesh
        ref={holoRingRef}
        position={[0, 0, 0.2]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[2, 2.2, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Data Visualization Orb */}
      <Sphere ref={dataOrbRef} args={[0.1, 16, 16]} position={[2, 1.5, 0.3]}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.4}
          speed={2}
          roughness={0.1}
        />
      </Sphere>

      {/* Energy Beams */}
      {hovered && (
        <group>
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 4) * Math.PI * 2) * 3,
                Math.sin((i / 4) * Math.PI * 2) * 2.2,
                0.1,
              ]}
              rotation={[0, 0, (i / 4) * Math.PI * 2]}
            >
              <planeGeometry args={[0.02, 1]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Floating Data Points */}
      {hovered && (
        <group>
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 3,
                Math.random() * 0.5,
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.7}
                emissive={color}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Corner decorations */}
      <mesh position={[-1.5, 1, 0.08]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[1.5, 1, 0.08]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>
      <mesh position={[-1.5, -1, 0.08]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[1.5, -1, 0.08]}>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshBasicMaterial color="#ec4899" />
      </mesh>
    </group>
  );
};

export default EnhancedProject3DCard;
