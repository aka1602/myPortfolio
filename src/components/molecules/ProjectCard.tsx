"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { hoverLift, scaleIn } from "@/lib/animations";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const categoryColors = {
    web: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    mobile:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    fullstack:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  };

  const statusColors = {
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "in-progress":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    planned: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
  };

  return (
    <motion.div
      className="group h-full"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      whileHover={hoverLift}
    >
      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden h-full flex flex-col hover:border-blue-500/30">
        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-br from-slate-700/50 to-slate-800/50 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Code" size="lg" className="text-white" />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-800 rounded-full"></div>
              </div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-yellow-800 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <Icon name="Star" size="xs" />
                <span>Featured</span>
              </div>
            </div>
          )}

          {/* Category & Status Badges */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium capitalize",
                categoryColors[project.category]
              )}
            >
              {project.category}
            </span>
            <span
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium capitalize",
                statusColors[project.status]
              )}
            >
              {project.status.replace("-", " ")}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <Typography
            variant="h4"
            className="mb-3 text-white group-hover:text-blue-400 transition-colors duration-200"
          >
            {project.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            className="text-gray-300 mb-4 flex-1 leading-relaxed"
          >
            {project.description}
          </Typography>

          {/* Technologies */}
          <div className="mb-6">
            <Typography
              variant="caption"
              className="text-gray-400 mb-3 block font-medium"
            >
              Technologies
            </Typography>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-xs font-medium hover:bg-blue-500/20 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-xs font-medium">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            {project.liveUrl && (
              <motion.button
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(project.liveUrl, "_blank");
                  }
                }}
              >
                <span>Live Demo</span>
                <Icon name="ExternalLink" size="xs" />
              </motion.button>
            )}
            {project.githubUrl && (
              <motion.button
                className={`${
                  project.liveUrl ? "flex-1" : "flex-1"
                } px-4 py-2.5 border border-blue-400 text-blue-400 rounded-lg font-medium text-sm hover:bg-blue-400 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(project.githubUrl, "_blank");
                  }
                }}
              >
                <Icon name="Github" size="xs" />
                <span>{project.liveUrl ? "Code" : "View Code"}</span>
              </motion.button>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <div className="flex-1 px-4 py-2.5 border border-gray-600 text-gray-500 rounded-lg font-medium text-sm flex items-center justify-center space-x-2 cursor-not-allowed">
                <Icon name="Eye" size="xs" />
                <span>Private Project</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
