"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/constants/projects";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import Typography from "@/components/atoms/Typography";
import ProjectCard from "@/components/molecules/ProjectCard";

const categories = [
  { id: "all", label: "All Projects", count: PROJECTS.length },
  {
    id: "web",
    label: "Web Apps",
    count: PROJECTS.filter((p) => p.category === "web").length,
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    count: PROJECTS.filter((p) => p.category === "mobile").length,
  },
  {
    id: "fullstack",
    label: "Full Stack",
    count: PROJECTS.filter((p) => p.category === "fullstack").length,
  },
];

const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  const featuredProjects = filteredProjects.filter(
    (project) => project.featured
  );
  const otherProjects = filteredProjects.filter((project) => !project.featured);

  const displayedProjects = showAll
    ? filteredProjects
    : [
        ...featuredProjects,
        ...otherProjects.slice(0, Math.max(0, 6 - featuredProjects.length)),
      ];

  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
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
              My Work
            </Typography>
          </div>
          <Typography
            variant="h2"
            className="mb-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Featured Projects
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            A collection of projects that showcase my skills in frontend
            development, system architecture, and problem-solving
          </Typography>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 border backdrop-blur-sm ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              variants={staggerItem}
            >
              <span>{category.label}</span>
              <span className="ml-2 text-xs opacity-75">
                ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayedProjects.map((project, index) => (
            <div key={project.id} className="flex">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </motion.div>

        {/* Show More/Less Button */}
        {filteredProjects.length > 6 && (
          <motion.div
            className="text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.button
              className="px-8 py-4 border border-blue-400 text-blue-400 rounded-full font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 min-w-[200px] backdrop-blur-sm"
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll
                ? "Show Less"
                : `Show All ${filteredProjects.length} Projects`}
            </motion.button>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          className="mt-20 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
            <Typography variant="h3" className="mb-6 text-white">
              Want to see more?
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              Check out my GitHub profile for more projects, contributions, and
              code samples. I&apos;m always working on something new!
            </Typography>
            <motion.button
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                typeof window !== "undefined" &&
                window.open("https://github.com/aka1602", "_blank")
              }
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              Visit GitHub Profile
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
