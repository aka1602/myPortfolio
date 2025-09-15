"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

const InteractiveCursor: React.FC = () => {
  const meshRef = useRef<Mesh>(null);
  const { camera } = useThree();
  const mouse = useRef(new Vector3());
  const target = useRef(new Vector3());

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse coordinates to normalized device coordinates
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Project mouse position to 3D space
      const vector = new Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      target.current = camera.position
        .clone()
        .add(dir.multiplyScalar(distance));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Smooth follow mouse position
    mouse.current.lerp(target.current, 0.1);
    meshRef.current.position.copy(mouse.current);

    // Add floating animation
    meshRef.current.position.y += Math.sin(time * 2) * 0.5;
    meshRef.current.position.x += Math.cos(time * 1.5) * 0.3;

    // Rotation animation
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.z = time * 0.7;

    // Scale pulsing
    const scale = 1 + Math.sin(time * 3) * 0.2;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color="#60a5fa"
        transparent
        opacity={0.7}
        roughness={0.2}
        metalness={0.8}
        emissive="#1e40af"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

export default InteractiveCursor;
