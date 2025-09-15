"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/constants/personal";
import { fadeInRight, staggerContainer, staggerItem } from "@/lib/animations";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";

const HeroSection: React.FC = () => {
  // Pre-defined positions to avoid hydration mismatch
  const particlePositions = Array.from({ length: 50 }, (_, i) => ({
    left: (i * 7.3) % 100,
    top: (i * 13.7) % 100,
    duration: 3 + (i % 4),
    delay: (i % 10) * 0.2,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting */}
            <motion.div variants={staggerItem} className="mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
                <span className="text-2xl mr-2">👋</span>
                <Typography
                  variant="body1"
                  className="text-blue-400 font-medium"
                >
                  Hello, I&apos;m
                </Typography>
              </div>
            </motion.div>

            {/* Name with Gradient Animation */}
            <motion.div variants={staggerItem} className="mb-6">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  {PERSONAL_INFO.name}
                </span>
              </motion.h1>
            </motion.div>

            {/* Title with Typewriter Effect */}
            <motion.div variants={staggerItem} className="mb-8">
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-4 flex items-center justify-center lg:justify-start">
                <span className="text-blue-400">&lt;</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 2, delay: 1 }}
                  className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-blue-400 mx-1"
                >
                  {PERSONAL_INFO.title}
                </motion.span>
                <span className="text-blue-400">/&gt;</span>
              </div>
            </motion.div>

            {/* Bio with better styling */}
            <motion.div variants={staggerItem} className="mb-10">
              <Typography
                variant="body1"
                className="text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-lg opacity-90"
              >
                Crafting exceptional digital experiences with{" "}
                <span className="text-blue-400 font-semibold">
                  {PERSONAL_INFO.experienceText}
                </span>{" "}
                of expertise in{" "}
                <span className="text-purple-400 font-semibold">React</span>,{" "}
                <span className="text-pink-400 font-semibold">Next.js</span>,
                and{" "}
                <span className="text-blue-400 font-semibold">TypeScript</span>.
              </Typography>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12"
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (typeof document !== "undefined") {
                    const element = document.getElementById("projects");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span className="relative z-10 flex items-center">
                  View My Work
                  <Icon
                    name="ArrowRight"
                    size="sm"
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                className="group px-8 py-4 border-2 border-blue-400 rounded-full text-blue-400 font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(PERSONAL_INFO.resumeUrl, "_blank");
                  }
                }}
              >
                <span className="flex items-center">
                  <Icon
                    name="Download"
                    size="sm"
                    className="mr-2 group-hover:animate-bounce"
                  />
                  Download Resume
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={staggerItem}
              className="flex justify-center lg:justify-start space-x-4"
            >
              {SOCIAL_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + index * 0.1 }}
                >
                  <Icon
                    name={link.icon as "Github" | "Linkedin" | "Mail"}
                    size="lg"
                    className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                  />
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {link.name}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Code Animation */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-full max-w-lg">
              {/* 3D Card Container */}
              <motion.div
                className="relative perspective-1000"
                whileHover={{ rotateY: 5, rotateX: 5 }}
                transition={{ duration: 0.6 }}
              >
                {/* Main Card */}
                <div className="relative w-full h-96 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  {/* Code Editor Header */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="ml-4 text-gray-400 text-sm font-mono">
                      portfolio.tsx
                    </div>
                  </div>

                  {/* Code Content */}
                  <div className="space-y-3 font-mono text-sm">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="text-purple-400"
                    >
                      <span className="text-gray-500">01</span>{" "}
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-yellow-400">developer</span> = {"{"}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="text-green-400 ml-4"
                    >
                      <span className="text-gray-500">02</span> name:{" "}
                      <span className="text-orange-400">
                        &quot;Akash Gupta&quot;
                      </span>
                      ,
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.5 }}
                      className="text-green-400 ml-4"
                    >
                      <span className="text-gray-500">03</span> role:{" "}
                      <span className="text-orange-400">
                        &quot;Senior Frontend Engineer&quot;
                      </span>
                      ,
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6, duration: 0.5 }}
                      className="text-green-400 ml-4"
                    >
                      <span className="text-gray-500">04</span> skills: [
                      <span className="text-orange-400">&quot;React&quot;</span>
                      ,{" "}
                      <span className="text-orange-400">
                        &quot;React Native&quot;
                      </span>
                      ,{" "}
                      <span className="text-orange-400">
                        &quot;Next.js&quot;
                      </span>
                      ],
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8, duration: 0.5 }}
                      className="text-green-400 ml-4"
                    >
                      <span className="text-gray-500">05</span> experience:{" "}
                      <span className="text-blue-400">
                        {PERSONAL_INFO.experienceText}
                      </span>
                      ,
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2, duration: 0.5 }}
                      className="text-green-400 ml-4"
                    >
                      <span className="text-gray-500">06</span> passion:{" "}
                      <span className="text-orange-400">
                        &quot;Building amazing UIs&quot;
                      </span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.2, duration: 0.5 }}
                      className="text-purple-400"
                    >
                      <span className="text-gray-500">07</span> {"}"}
                    </motion.div>
                  </div>

                  {/* Cursor */}
                  <motion.div
                    className="w-2 h-5 bg-blue-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      bottom: "120px",
                      left: "60px",
                    }}
                  />
                </div>

                {/* Floating Tech Icons */}
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-white font-bold text-lg">⚛️</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-black rounded-lg flex items-center justify-center shadow-lg"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <span className="text-white font-bold text-lg">▲</span>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-8 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"
                  animate={{
                    x: [0, 15, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                >
                  <span className="text-white font-bold text-sm">TS</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => {
              if (typeof document !== "undefined") {
                const element = document.getElementById("about");
                element?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="flex flex-col items-center space-y-2 p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-all duration-300">
              <Typography
                variant="caption"
                className="text-gray-400 group-hover:text-white transition-colors duration-300"
              >
                Explore More
              </Typography>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon
                  name="ChevronDown"
                  size="lg"
                  className="text-blue-400 group-hover:text-white transition-colors duration-300"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
