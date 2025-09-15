"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const Simple3DTest: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    console.log("Simple3DTest component mounted");
    return () => console.log("Simple3DTest component unmounted");
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
  });

  console.log("Simple3DTest rendering");

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff0000" wireframe />
      </mesh>

      {/* Additional test mesh */}
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>

      {/* Helper to show coordinate system */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#0000ff" />
      </mesh>
    </group>
  );
};

export default Simple3DTest;
