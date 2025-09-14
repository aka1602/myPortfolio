export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'fullstack';
  status: 'completed' | 'in-progress' | 'planned';
}

export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  location: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'tools' | 'concepts';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface AnimationVariants {
  hidden: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
      staggerChildren?: number;
    };
  };
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
