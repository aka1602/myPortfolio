"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Ring } from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";

interface Planet {
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  moons?: { size: number; distance: number; speed: number }[];
}

interface SolarSystemSkillsProps {
  onLoad?: () => void;
}

const SolarSystemSkills: React.FC<SolarSystemSkillsProps> = ({ onLoad }) => {
  const groupRef = useRef<Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const planets: Planet[] = useMemo(
    () => [
      // Inner planets (Frontend)
      {
        name: "JavaScript",
        color: "#f7df1e",
        size: 0.8,
        orbitRadius: 4,
        orbitSpeed: 0.8,
        rotationSpeed: 1.2,
      },
      {
        name: "TypeScript",
        color: "#3178c6",
        size: 1.0,
        orbitRadius: 6,
        orbitSpeed: 0.6,
        rotationSpeed: 1.0,
        moons: [{ size: 0.2, distance: 1.5, speed: 2 }],
      },
      {
        name: "Next.js",
        color: "#ffffff",
        size: 1.2,
        orbitRadius: 8,
        orbitSpeed: 0.5,
        rotationSpeed: 0.8,
      },

      // Middle planets (Backend)
      {
        name: "Node.js",
        color: "#339933",
        size: 1.1,
        orbitRadius: 11,
        orbitSpeed: 0.4,
        rotationSpeed: 0.7,
        moons: [{ size: 0.15, distance: 1.8, speed: 1.5 }],
      },
      {
        name: "Python",
        color: "#3776ab",
        size: 1.3,
        orbitRadius: 14,
        orbitSpeed: 0.3,
        rotationSpeed: 0.6,
        moons: [
          { size: 0.2, distance: 2, speed: 1.8 },
          { size: 0.15, distance: 2.8, speed: 1.2 },
        ],
      },

      // Outer planets (DevOps & Cloud)
      {
        name: "Docker",
        color: "#2496ed",
        size: 1.4,
        orbitRadius: 18,
        orbitSpeed: 0.25,
        rotationSpeed: 0.5,
        moons: [{ size: 0.25, distance: 2.2, speed: 1.4 }],
      },
      {
        name: "AWS",
        color: "#ff9900",
        size: 1.6,
        orbitRadius: 22,
        orbitSpeed: 0.2,
        rotationSpeed: 0.4,
        moons: [
          { size: 0.3, distance: 2.5, speed: 1.6 },
          { size: 0.2, distance: 3.2, speed: 1.0 },
          { size: 0.15, distance: 4, speed: 0.8 },
        ],
      },

      // Distant planets (Databases & Tools)
      {
        name: "MongoDB",
        color: "#47a248",
        size: 1.2,
        orbitRadius: 26,
        orbitSpeed: 0.15,
        rotationSpeed: 0.3,
      },
      {
        name: "Three.js",
        color: "#049ef4",
        size: 1.0,
        orbitRadius: 30,
        orbitSpeed: 0.1,
        rotationSpeed: 0.2,
      },
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
        onLoad?.();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoaded, onLoad]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate the entire solar system slowly
    groupRef.current.rotation.y = time * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Central Sun - React */}
      <group>
        {/* Sun Core */}
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#61dafb" transparent opacity={0.9} />
        </mesh>

        {/* Sun Glow */}
        <mesh>
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshBasicMaterial
            color="#61dafb"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Sun Corona */}
        <mesh>
          <sphereGeometry args={[3, 16, 16]} />
          <meshBasicMaterial
            color="#87ceeb"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Sun Label */}
        <Text
          position={[0, -3, 0]}
          fontSize={0.6}
          color="#61dafb"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          React
        </Text>
      </group>

      {/* Orbital Paths */}
      {planets.map((planet) => (
        <Ring
          key={`orbit-${planet.name}`}
          args={[planet.orbitRadius - 0.05, planet.orbitRadius + 0.05, 64]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </Ring>
      ))}

      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet3D key={planet.name} planet={planet} index={index} />
      ))}
    </group>
  );
};

// Individual Planet Component
const Planet3D: React.FC<{ planet: Planet; index: number }> = ({
  planet,
  index,
}) => {
  const planetRef = useRef<Group>(null);
  const planetMeshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!planetRef.current || !planetMeshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Orbital motion
    const angle = time * planet.orbitSpeed + index * 0.5;
    planetRef.current.position.x = Math.cos(angle) * planet.orbitRadius;
    planetRef.current.position.z = Math.sin(angle) * planet.orbitRadius;

    // Planet rotation
    planetMeshRef.current.rotation.y = time * planet.rotationSpeed;
  });

  return (
    <group ref={planetRef}>
      {/* Planet */}
      <mesh ref={planetMeshRef}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.7}
          emissive={planet.color}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Planet Atmosphere */}
      <mesh>
        <sphereGeometry args={[planet.size * 1.1, 16, 16]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planet Label */}
      <Text
        position={[0, -planet.size - 1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {planet.name}
      </Text>

      {/* Moons */}
      {planet.moons?.map((moon, moonIndex) => (
        <Moon3D
          key={moonIndex}
          moon={moon}
          moonIndex={moonIndex}
          planetColor={planet.color}
        />
      ))}
    </group>
  );
};

// Moon Component
const Moon3D: React.FC<{
  moon: { size: number; distance: number; speed: number };
  moonIndex: number;
  planetColor: string;
}> = ({ moon, moonIndex, planetColor }) => {
  const moonRef = useRef<Group>(null);

  useFrame((state) => {
    if (!moonRef.current) return;

    const time = state.clock.getElapsedTime();
    const angle = time * moon.speed + moonIndex * Math.PI;

    moonRef.current.position.x = Math.cos(angle) * moon.distance;
    moonRef.current.position.z = Math.sin(angle) * moon.distance;
  });

  return (
    <group ref={moonRef}>
      <mesh>
        <sphereGeometry args={[moon.size, 16, 16]} />
        <meshStandardMaterial
          color={planetColor}
          transparent
          opacity={0.7}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
};

export default SolarSystemSkills;
