"use client";

import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ff00" />
    </mesh>
  );
}

const BasicCube: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full h-64 bg-slate-800 rounded-lg border border-white/10">
      {error ? (
        <div className="flex items-center justify-center h-full text-red-400">
          Error: {error}
        </div>
      ) : (
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          onCreated={() => {
            console.log("Basic Canvas created successfully!");
          }}
          onError={(error) => {
            console.error("Canvas error:", error);
            setError(String(error));
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
        </Canvas>
      )}
    </div>
  );
};

export default BasicCube;
