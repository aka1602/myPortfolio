"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import SimpleProject3DCard from "@/components/3d/SimpleProject3DCard";
// import MinimalGalleryEnvironment from "@/components/3d/MinimalGalleryEnvironment";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { PROJECTS } from "@/constants/projects";

const Projects3DSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Select first 6 projects for 3D display
  const featured3DProjects = PROJECTS.slice(0, 6);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };

    // Check for low-power devices
    const checkLowPower = () => {
      // Check for low-end devices
      const navigatorWithMemory = navigator as Navigator & {
        deviceMemory?: number;
      };
      const isLowEnd =
        navigator.hardwareConcurrency <= 4 ||
        (navigatorWithMemory.deviceMemory &&
          navigatorWithMemory.deviceMemory <= 4) ||
        /iPhone [5-8]|iPad|Android.*SM-[A-J]/.test(navigator.userAgent);
      setIsLowPower(isLowEnd);
    };

    // Check WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        setWebGLSupported(!!gl);
      } catch {
        setWebGLSupported(false);
      }
    };

    checkMobile();
    checkLowPower();
    checkWebGL();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="projects-3d"
      className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden"
    >
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
              3D{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Project Showcase
              </span>
            </Typography>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Typography
              variant="body1"
              className="text-gray-300 text-lg max-w-3xl mx-auto"
            >
              Experience my projects in a beautiful, interactive 3D gallery.
              Hover to explore, click to view live projects!
            </Typography>
          </motion.div>
        </motion.div>

        {/* 3D Projects Canvas */}
        <motion.div
          className="relative h-[700px] rounded-2xl overflow-hidden border border-white/10 bg-slate-800/30 backdrop-blur-sm"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {!webGLSupported ? (
            /* Fallback for devices without WebGL */
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <Typography variant="h3" className="text-white mb-4">
                  🚀 3D View Not Available
                </Typography>
                <Typography variant="body1" className="text-gray-300 mb-6">
                  Your device doesn&apos;t support 3D graphics. Check out my
                  projects below!
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {featured3DProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="p-4 bg-slate-700/50 rounded-lg border border-white/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Typography variant="h6" className="text-white mb-2">
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-gray-300 mb-3"
                      >
                        {project.description}
                      </Typography>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Live
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Canvas
              camera={{
                position: isMobile ? [0, 0, 15] : [0, 0, 10],
                fov: isMobile ? 85 : 75,
              }}
              gl={{
                antialias: !isLowPower,
                alpha: true,
                powerPreference: isMobile ? "default" : "high-performance",
                stencil: false,
                depth: true,
              }}
              dpr={isMobile ? [1, 1.5] : [1, 2]}
              performance={{
                min: isMobile ? 0.3 : 0.5,
                max: isMobile ? 0.8 : 1,
                debounce: isMobile ? 300 : 200,
              }}
              frameloop={isMobile ? "demand" : "always"}
              onCreated={(state) => {
                console.log("3D Canvas created successfully", state);
                // Canvas is ready, hide loading after a short delay
                setTimeout(() => {
                  console.log("Setting loading to false");
                  setIsLoading(false);
                }, 1000);
              }}
              onError={(error) => {
                console.error("3D Canvas error:", error);
                setIsLoading(false);
              }}
            >
              {/* Using default Three.js camera */}

              {/* Mobile-optimized lighting */}
              <ambientLight intensity={isMobile ? 0.7 : 0.5} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={isMobile ? 0.8 : 1}
                castShadow={!isMobile}
              />
              {!isLowPower && (
                <pointLight position={[0, 10, 0]} intensity={0.5} />
              )}

              {/* 3D Project Gallery */}
              {featured3DProjects.map((project, index) => {
                // Create a more dynamic 3D arrangement
                let x, y, z;

                if (index < 3) {
                  // Front row - closer to viewer
                  x = (index - 1) * 6;
                  y = 2;
                  z = 2;
                } else {
                  // Back row - further away, higher up
                  x = (index - 3 - 1) * 6;
                  y = 5;
                  z = -4;
                }

                return (
                  <SimpleProject3DCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    position={[x, y, z]}
                    color={project.color || "#3b82f6"}
                    index={index}
                    liveUrl={project.liveUrl}
                    technologies={project.technologies}
                    onLoad={() => setIsLoading(false)}
                  />
                );
              })}

              {/* Environment - disabled on low-power devices */}
              {!isLowPower && <Environment preset="night" />}

              {/* Mobile-optimized controls */}
              <OrbitControls
                enablePan={!isMobile}
                enableZoom={true}
                enableRotate={true}
                autoRotate={!isMobile}
                autoRotateSpeed={isMobile ? 0 : 0.3}
                minDistance={isMobile ? 12 : 10}
                maxDistance={isMobile ? 25 : 30}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
                target={[0, 2, 0]}
                touches={{
                  ONE: isMobile ? 2 : 0, // ROTATE
                  TWO: isMobile ? 1 : 0, // DOLLY (zoom)
                }}
                enableDamping={!isMobile}
                dampingFactor={0.1}
              />
            </Canvas>
          )}

          {/* Instructions overlay - only show if WebGL is supported */}
          {webGLSupported && (
            <>
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Typography variant="caption" className="text-gray-300 text-sm">
                  {isMobile
                    ? "🎯 Tap cards to view • 👆 Touch & drag to rotate • 🤏 Pinch to zoom"
                    : "🎯 Click cards to view live • 🖱️ Drag to explore • ⚡ Hover for effects"}
                </Typography>
              </div>

              {/* Navigation hint */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Typography variant="caption" className="text-gray-300 text-sm">
                  {isMobile
                    ? "📱 Mobile optimized"
                    : "💡 Auto-rotating • Pan enabled"}
                </Typography>
              </div>
            </>
          )}

          {/* Loading fallback */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <Typography variant="body2" className="text-gray-400">
                  Loading 3D Project Gallery...
                </Typography>
              </div>
            </div>
          )}
        </motion.div>

        {/* Project Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              label: "Projects Completed",
              value: "25+",
              color: "from-blue-400 to-blue-600",
            },
            {
              label: "Technologies Used",
              value: "15+",
              color: "from-purple-400 to-purple-600",
            },
            {
              label: "Years Experience",
              value: "6+",
              color: "from-pink-400 to-pink-600",
            },
            {
              label: "Happy Clients",
              value: "20+",
              color: "from-green-400 to-green-600",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div
                className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
              >
                {stat.value}
              </div>
              <Typography variant="body2" className="text-gray-400">
                {stat.label}
              </Typography>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA to regular projects */}
        <motion.div
          className="text-center mt-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.button
            className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (typeof document !== "undefined") {
                const element = document.getElementById("projects");
                element?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="flex items-center">
              View All Projects
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects3DSection;
