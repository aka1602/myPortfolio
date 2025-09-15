"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import SolarSystemSkills from "@/components/3d/SolarSystemSkills";
import InteractiveCursor from "@/components/3d/InteractiveCursor";
import ThreeErrorBoundary from "@/components/3d/ThreeErrorBoundary";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const Skills3DSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Auto-hide loading after 5 seconds as a fallback
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log("Auto-hiding 3D loading after timeout");
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <section
      id="skills-3d"
      className="relative py-20 bg-slate-900 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={staggerItem}>
            <Typography
              variant="h2"
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Skills{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Solar System
              </span>
            </Typography>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Typography
              variant="body1"
              className="text-gray-300 text-lg max-w-3xl mx-auto"
            >
              Explore my technical skills as planets orbiting around React (the
              central sun). Watch the orbital mechanics of frontend, backend,
              and DevOps technologies in action!
            </Typography>
          </motion.div>
        </motion.div>

        {/* 3D Skills Canvas */}
        <motion.div
          className="relative h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-slate-800/30 backdrop-blur-sm"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <ThreeErrorBoundary>
            <Canvas
              camera={{ position: [0, 15, 25], fov: 50 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
              dpr={[1, 2]}
              performance={{ min: 0.5 }}
              onCreated={(state) => {
                // Canvas is ready, hide loading after a short delay
                console.log("3D Canvas created successfully!", state);
                setTimeout(() => setIsLoading(false), 1500);
              }}
            >
              <Suspense fallback={null}>
                {/* Universe Lighting */}
                <ambientLight intensity={0.3} color="#1a1a2e" />
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={0.5}
                  color="#ffffff"
                />
                <pointLight
                  position={[-15, -15, -15]}
                  intensity={1}
                  color="#3b82f6"
                  distance={30}
                />
                <pointLight
                  position={[15, -15, 15]}
                  intensity={0.8}
                  color="#8b5cf6"
                  distance={25}
                />
                <pointLight
                  position={[0, 20, 0]}
                  intensity={0.6}
                  color="#ec4899"
                  distance={20}
                />

                {/* Solar System Background */}
                <Stars
                  radius={200}
                  depth={100}
                  count={3000}
                  factor={6}
                  saturation={0}
                  fade
                  speed={0.5}
                />

                {/* Skills Solar System */}
                <SolarSystemSkills onLoad={() => setIsLoading(false)} />
                <InteractiveCursor />

                {/* Environment */}
                <Environment preset="night" />

                {/* Controls */}
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  autoRotate
                  autoRotateSpeed={0.2}
                  minDistance={15}
                  maxDistance={60}
                  minPolarAngle={Math.PI / 8}
                  maxPolarAngle={Math.PI - Math.PI / 8}
                />
              </Suspense>
            </Canvas>
          </ThreeErrorBoundary>

          {/* Instructions overlay */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <Typography variant="caption" className="text-gray-300 text-sm">
              🪐 Drag to orbit • 🔍 Zoom to explore planets • ⭐ Watch orbital
              mechanics
            </Typography>
          </div>

          {/* Loading fallback */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <Typography variant="body2" className="text-gray-400">
                  Loading Skills Solar System...
                </Typography>
                <Typography
                  variant="caption"
                  className="text-gray-500 mt-2 block"
                >
                  Calculating orbital mechanics...
                </Typography>
              </div>
            </div>
          )}

          {/* Error fallback */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <Typography variant="h4" className="text-yellow-400 mb-2">
                  3D Content Not Available
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  Your browser may not support WebGL
                </Typography>
              </div>
            </div>
          )}
        </motion.div>

        {/* Skills Grid (Fallback/Additional Info) */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              name: "React",
              level: "Expert",
              color: "from-blue-400 to-blue-600",
            },
            {
              name: "TypeScript",
              level: "Expert",
              color: "from-blue-500 to-blue-700",
            },
            {
              name: "Next.js",
              level: "Expert",
              color: "from-gray-600 to-gray-800",
            },
            {
              name: "Node.js",
              level: "Advanced",
              color: "from-green-400 to-green-600",
            },
            {
              name: "Three.js",
              level: "Intermediate",
              color: "from-purple-400 to-purple-600",
            },
            {
              name: "Python",
              level: "Advanced",
              color: "from-yellow-400 to-yellow-600",
            },
            {
              name: "AWS",
              level: "Intermediate",
              color: "from-orange-400 to-orange-600",
            },
            {
              name: "Docker",
              level: "Intermediate",
              color: "from-cyan-400 to-cyan-600",
            },
          ].map((skill) => (
            <motion.div
              key={skill.name}
              variants={staggerItem}
              className="group p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="text-white font-bold text-lg">
                  {skill.name.charAt(0)}
                </span>
              </div>
              <Typography
                variant="h6"
                className="text-white font-semibold mb-1"
              >
                {skill.name}
              </Typography>
              <Typography variant="caption" className="text-gray-400">
                {skill.level}
              </Typography>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills3DSection;
