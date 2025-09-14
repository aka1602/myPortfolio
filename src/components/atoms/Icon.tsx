"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
  Calendar,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  ArrowRight,
  Send,
  User,
  MessageSquare,
  Heart,
  Eye,
  GitBranch,
  Zap,
  Target,
  Rocket,
  Coffee,
  Server,
  Settings,
  Lightbulb,
  Gamepad2,
  ArrowLeft,
  ChevronRight,
  Scissors,
  Mountain,
  FileText,
  type LucideIcon,
} from "lucide-react";

const iconMap = {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
  Calendar,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  ArrowRight,
  Send,
  User,
  MessageSquare,
  Heart,
  Eye,
  GitBranch,
  Zap,
  Target,
  Rocket,
  Coffee,
  Server,
  Settings,
  Lightbulb,
  Gamepad2,
  ArrowLeft,
  ChevronRight,
  Scissors,
  Mountain,
  FileText,
} as const;

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  className,
  animate = false,
  color,
  ...props
}) => {
  const IconComponent: LucideIcon = iconMap[name];

  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const iconElement = (
    <IconComponent
      className={cn(sizes[size], className)}
      style={{ color }}
      {...props}
    />
  );

  if (animate) {
    return (
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {iconElement}
      </motion.div>
    );
  }

  return iconElement;
};

export default Icon;
