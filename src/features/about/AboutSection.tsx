"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO, SKILLS, WORK_EXPERIENCE } from "@/constants/personal";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";
import { useGameReward } from "@/contexts/GameRewardContext";
import { useGameModal } from "@/contexts/GameModalContext";

const AboutSection: React.FC = () => {
  const { hasWonGame } = useGameReward();
  const { openGameModal } = useGameModal();
  return (
    <section
      id="about"
      className="flex justify-center  py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm mb-8">
            <Typography
              variant="overline"
              className="text-blue-400 font-semibold tracking-wider"
            >
              Get to know me
            </Typography>
          </div>
          <Typography
            variant="h2"
            className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            About Me
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Passionate about creating exceptional digital experiences with
            clean, efficient code
          </Typography>
        </motion.div>

        {/* Main Content - Clean Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column - About Content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {/* Story */}
            <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
              <Typography
                variant="h3"
                className="text-white font-bold mb-6 text-2xl"
              >
                My Journey
              </Typography>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  With{" "}
                  <span className="text-blue-400 font-semibold">
                    {PERSONAL_INFO.experienceText} of experience
                  </span>{" "}
                  in frontend development, I&apos;ve had the privilege of
                  working with amazing teams to build products that impact
                  millions of users.
                </p>
                <p>
                  My journey started with a curiosity for how websites work, and
                  it has evolved into a passion for creating seamless,
                  performant, and accessible web experiences.
                </p>
                <p>
                  I specialize in{" "}
                  <span className="text-purple-400 font-semibold">
                    React ecosystem
                  </span>
                  , with expertise in Next.js, TypeScript, and modern
                  development practices.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 text-center">
                <Typography
                  variant="h2"
                  className="text-4xl font-bold text-white mb-2"
                >
                  {PERSONAL_INFO.yearsOfExperience}+
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  Years Experience
                </Typography>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-6 text-center">
                <Typography
                  variant="h2"
                  className="text-4xl font-bold text-white mb-2"
                >
                  50+
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  Projects Completed
                </Typography>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl h-full">
              <Typography
                variant="h3"
                className="text-white font-bold mb-8 text-2xl"
              >
                Let&apos;s Connect
              </Typography>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                    <Icon name="MapPin" size="lg" className="text-blue-400" />
                  </div>
                  <div>
                    <Typography
                      variant="caption"
                      className="text-gray-400 uppercase tracking-wider text-xs"
                    >
                      Location
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-white font-semibold"
                    >
                      {PERSONAL_INFO.location}
                    </Typography>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                    <Icon name="Mail" size="lg" className="text-green-400" />
                  </div>
                  <div>
                    <Typography
                      variant="caption"
                      className="text-gray-400 uppercase tracking-wider text-xs"
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-white font-semibold"
                    >
                      {PERSONAL_INFO.email}
                    </Typography>
                  </div>
                </div>

                <motion.div
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-colors cursor-pointer ${
                    !hasWonGame
                      ? "hover:bg-purple-500/5 border border-purple-500/20"
                      : "hover:bg-white/5"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (!hasWonGame) {
                      openGameModal();
                    } else if (typeof window !== "undefined") {
                      window.location.href = `tel:${PERSONAL_INFO.phone}`;
                    }
                  }}
                >
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                    <Icon name="Phone" size="lg" className="text-purple-400" />
                  </div>
                  <div>
                    <Typography
                      variant="caption"
                      className="text-gray-400 uppercase tracking-wider text-xs"
                    >
                      Phone
                    </Typography>
                    <Typography
                      variant="body1"
                      className={`font-semibold transition-colors duration-200 ${
                        !hasWonGame ? "text-purple-400" : "text-white"
                      }`}
                    >
                      {hasWonGame
                        ? PERSONAL_INFO.phone
                        : "🎮 Win a game to reveal"}
                    </Typography>
                    {!hasWonGame && (
                      <Typography
                        variant="body2"
                        className="text-gray-500 text-xs mt-1"
                      >
                        Click to go to games
                      </Typography>
                    )}
                  </div>
                </motion.div>
              </div>

              <motion.button
                className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Let&apos;s Work Together
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Skills Section - Clean Grid */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <Typography
              variant="h3"
              className="text-white font-bold mb-4 text-3xl md:text-4xl"
            >
              Skills & Technologies
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-400 max-w-2xl mx-auto"
            >
              A comprehensive toolkit for building modern web applications
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="Code" size="md" className="text-blue-400" />
                </div>
                <Typography variant="h5" className="text-white font-semibold">
                  Frontend
                </Typography>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.frontend.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="Server" size="md" className="text-green-400" />
                </div>
                <Typography variant="h5" className="text-white font-semibold">
                  Backend
                </Typography>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.backend.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-300 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size="md" className="text-purple-400" />
                </div>
                <Typography variant="h5" className="text-white font-semibold">
                  Tools
                </Typography>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.tools.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Concepts */}
            <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center">
                  <Icon
                    name="Lightbulb"
                    size="md"
                    className="text-orange-400"
                  />
                </div>
                <Typography variant="h5" className="text-white font-semibold">
                  Concepts
                </Typography>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.concepts.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Game Section */}

        {/* Experience Timeline - Simplified */}
        <motion.div
          id="experience"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-16">
            <Typography
              variant="h3"
              className="text-white font-bold mb-4 text-3xl md:text-4xl"
            >
              Work Experience
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-400 max-w-2xl mx-auto"
            >
              My professional journey and key achievements
            </Typography>
          </div>

          <div className="space-y-8">
            {WORK_EXPERIENCE.map((experience, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <Typography
                      variant="h4"
                      className="text-white font-bold mb-2"
                    >
                      {experience.position}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="text-blue-400 font-semibold mb-2"
                    >
                      {experience.company}
                    </Typography>
                  </div>
                  <div className="text-left md:text-right">
                    <Typography
                      variant="body2"
                      className="text-gray-400 font-medium"
                    >
                      {experience.duration}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      {experience.location}
                    </Typography>
                  </div>
                </div>

                <ul className="space-y-3">
                  {experience.achievements.map(
                    (achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <Typography
                          variant="body2"
                          className="text-gray-300 leading-relaxed"
                        >
                          {achievement}
                        </Typography>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
