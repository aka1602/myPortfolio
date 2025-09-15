"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

const GalleryFloor: React.FC = () => {
  const floorRef = useRef<Mesh>(null);
  const gridRef = useRef<Mesh>(null);
  const reflectionRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animate grid lines
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = time;
    }

    // Subtle floor animation
    if (reflectionRef.current) {
      const material = reflectionRef.current
        .material as THREE.MeshBasicMaterial;
      material.opacity = 0.1 + Math.sin(time * 0.5) * 0.05;
    }
  });

  // Custom grid shader material
  const gridShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      gridSize: { value: 50 },
      lineWidth: { value: 0.02 },
      color: { value: new THREE.Color("#3b82f6") },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float gridSize;
      uniform float lineWidth;
      uniform vec3 color;
      varying vec2 vUv;
      
      void main() {
        vec2 grid = abs(fract(vUv * gridSize) - 0.5);
        float line = min(grid.x, grid.y);
        
        float alpha = 1.0 - smoothstep(0.0, lineWidth, line);
        alpha *= 0.3 + sin(time * 2.0 + vUv.x * 10.0) * 0.1;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  return (
    <group position={[0, -8, 0]}>
      {/* Main floor */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#0f0f23"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Reflective surface */}
      <mesh
        ref={reflectionRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color="#1e40af"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Animated grid */}
      <mesh
        ref={gridRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <primitive object={gridShaderMaterial} />
      </mesh>

      {/* Holographic lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} rotation={[0, (i / 8) * Math.PI * 2, 0]}>
          <mesh position={[0, 0.05, 25]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.1, 50]} />
            <meshBasicMaterial
              color="#60a5fa"
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Energy nodes at intersections */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 15 + (i % 4) * 10;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, 0.1, Math.sin(angle) * radius]}
          >
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial
              color="#3b82f6"
              transparent
              opacity={0.6}
              emissive="#3b82f6"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default GalleryFloor;
