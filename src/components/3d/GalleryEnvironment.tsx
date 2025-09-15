"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";

const GalleryEnvironment: React.FC = () => {
  const lightGroupRef = useRef<Group>(null);
  const nebulaRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate the entire lighting setup
    if (lightGroupRef.current) {
      lightGroupRef.current.rotation.y = time * 0.1;
    }

    // Animate nebula
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z = time * 0.05;
      const material = nebulaRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = time;
    }

    // Atmospheric effects
    if (atmosphereRef.current) {
      const material = atmosphereRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = time;
    }
  });

  // Nebula shader material
  const nebulaShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color("#3b82f6") },
      color2: { value: new THREE.Color("#8b5cf6") },
      color3: { value: new THREE.Color("#ec4899") },
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
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec2 vUv;
      
      float noise(vec2 p) {
        return sin(p.x * 10.0 + time) * sin(p.y * 10.0 + time * 0.5) * 0.5 + 0.5;
      }
      
      void main() {
        vec2 uv = vUv;
        float n1 = noise(uv * 2.0);
        float n2 = noise(uv * 4.0 + vec2(time * 0.1));
        float n3 = noise(uv * 8.0 - vec2(time * 0.05));
        
        float mixFactor1 = n1 * n2;
        float mixFactor2 = n2 * n3;
        
        vec3 color = mix(color1, color2, mixFactor1);
        color = mix(color, color3, mixFactor2);
        
        float alpha = (n1 + n2 + n3) / 3.0 * 0.3;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

  // Atmospheric shader material
  const atmosphereShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vWorldPosition;
      
      void main() {
        float distance = length(vWorldPosition);
        float fog = 1.0 - exp(-distance * 0.01);
        
        vec3 color = vec3(0.1, 0.2, 0.4);
        float pulse = sin(time * 2.0) * 0.1 + 0.9;
        
        gl_FragColor = vec4(color * pulse, fog * 0.1);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
  });

  return (
    <group>
      {/* Enhanced Star Field */}
      <Stars
        radius={300}
        depth={150}
        count={3000}
        factor={6}
        saturation={0.8}
        fade
        speed={0.5}
      />

      {/* Dynamic Lighting Group */}
      <group ref={lightGroupRef}>
        {/* Primary spotlight */}
        <spotLight
          position={[0, 20, 15]}
          angle={0.3}
          penumbra={0.5}
          intensity={2}
          color="#ffffff"
          castShadow
        />

        {/* Accent lights */}
        <pointLight position={[15, 10, 5]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-15, 15, -5]} intensity={1.2} color="#8b5cf6" />
        <pointLight position={[8, -5, 10]} intensity={1} color="#ec4899" />
        <pointLight position={[-8, 12, -8]} intensity={0.8} color="#10b981" />

        {/* Rim lights */}
        <directionalLight
          position={[20, 0, 20]}
          intensity={0.5}
          color="#60a5fa"
        />
        <directionalLight
          position={[-20, 0, -20]}
          intensity={0.3}
          color="#a78bfa"
        />
      </group>

      {/* Nebula Background */}
      <mesh ref={nebulaRef} position={[0, 0, -50]}>
        <planeGeometry args={[200, 200]} />
        <primitive object={nebulaShaderMaterial} />
      </mesh>

      {/* Atmospheric Sphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[100, 32, 32]} />
        <primitive object={atmosphereShaderMaterial} />
      </mesh>

      {/* Energy Pillars */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 40;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
          >
            <cylinderGeometry args={[0.5, 0.5, 50, 8]} />
            <meshStandardMaterial
              color="#3b82f6"
              transparent
              opacity={0.2}
              emissive="#3b82f6"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}

      {/* Floating Energy Orbs */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 80;
        const y = Math.random() * 30 + 10;
        const z = (Math.random() - 0.5) * 80;
        const size = Math.random() * 0.5 + 0.2;
        const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"];
        const color = colors[i % colors.length];

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.6}
              emissive={color}
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default GalleryEnvironment;
