"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import FloatingGeometry from "./FloatingGeometry";
import ParticleField from "./ParticleField";

interface Scene3DProps {
  enableControls?: boolean;
  className?: string;
}

const Scene3D: React.FC<Scene3DProps> = ({
  enableControls = false,
  className = "",
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={60} />

          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            color="#ffffff"
          />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#3b82f6"
          />

          {/* 3D Elements */}
          <FloatingGeometry count={30} speed={0.3} />
          <ParticleField count={800} radius={40} />

          {/* Environment */}
          <Environment preset="night" />

          {/* Controls (optional) */}
          {enableControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
