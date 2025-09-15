// Static experience calculation to avoid hydration mismatch
// Update this manually every few months or use a build-time calculation
const CAREER_START = { year: 2019, month: 3 }; // March 2019
const CURRENT_DATE = { year: 2025, month: 9 }; // September 2025 - Update this periodically

const calculateStaticExperience = () => {
  let years = CURRENT_DATE.year - CAREER_START.year;
  let months = CURRENT_DATE.month - CAREER_START.month;

  // Adjust if current month is before start month
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
};

const experience = calculateStaticExperience();
const yearsOfExperience = experience.years;

// Format experience for display
const formatExperience = () => {
  if (experience.months === 0) {
    return `${experience.years} years`;
  } else if (experience.years === 0) {
    return `${experience.months} months`;
  } else {
    return `${experience.years} years ${experience.months} months`;
  }
};

const experienceText = formatExperience();

export const PERSONAL_INFO = {
  name: "Akash Gupta",
  title: "Senior Frontend Engineer",
  email: "akash.greenwork1@gmail.com",
  phone: "9598029090",
  location: "Bengaluru",
  github: "https://github.com/aka1602",
  linkedin: "https://www.linkedin.com/in/akash-a45aab120/",
  portfolio: "https://akash-portfolio.vercel.app",
  resumeUrl: "/resume/Akash_Gupta_Resume.pdf",
  bio: `Senior Frontend Engineer with ${experienceText} of experience delivering scalable, high-performance web and mobile applications. Specialized in React.js, React Native, Next.js, and TypeScript, with strong expertise in building products from scratch, designing system architectures (HLD/LLD), and optimizing performance (achieving 50% load time, +18% conversions).`,
  yearsOfExperience,
  experienceText,
} as const;

export const SKILLS = {
  frontend: [
    "React.js",
    "React Native",
    "Next.js",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "SCSS/SASS",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Redis",
  ],
  tools: [
    "Git",
    "Docker",
    "AWS",
    "Vercel",
    "Webpack",
    "Vite",
    "Jest",
    "Cypress",
    "Figma",
    "Adobe XD",
  ],
  concepts: [
    "Responsive Design",
    "Performance Optimization",
    "SEO",
    "Accessibility",
    "System Design",
    "Micro Frontend",
    "PWA",
    "Cross-platform Development",
  ],
} as const;

export const WORK_EXPERIENCE = [
  {
    company: "Play Games24x7",
    position: "SDE 2",
    duration: "Nov 2024 – Present",
    location: "Bengaluru",
    achievements: [
      "Developed features for MyCircle app, including spinner content and micro-frontend based dashboard modules.",
      "Improved performance by optimizing React Native components and solving frame-rate & loading issues.",
      "Modularized login flows into a reusable module, enabling integration across multiple gaming products.",
      "Collaborated with cross-functional teams (product, QA, backend) to deliver scalable, high-quality gaming experiences.",
    ],
  },
  {
    company: "InfoEdge Technologies (Naukri.com / AmbitionBox)",
    position: "SSE",
    duration: "Jan 2022 – Nov 2024",
    location: "Noida",
    achievements: [
      "Led a 4-member frontend team while driving delivery of new features and migrations.",
      "Architected and launched the AmbitionBox App (React Native + Next.js) from scratch, boosting traffic from 3.5 → 4.7.",
      "Migrated core modules from Vue/Nuxt.js to Next.js, improving SEO and driving 15% increase in organic traffic.",
      "Built new features like Awards, Skill Pages, Interview Question Pages, and Community Platform (similar to Fishbowl/Glassdoor) from scratch.",
      "Tackled Core Web Vitals (INP) challenges, reducing load times by 25% and improving SEO performance.",
      "Mentored junior engineers, handled scrums, and reviewed architecture for scalability.",
    ],
  },
  {
    company: "Satin Creditcare Network",
    position: "Frontend Developer",
    duration: "Jul 2021 – Jan 2022",
    location: "Gurugram",
    achievements: [
      "Rebuilt the HRMS app from scratch (React + React Native) after legacy codebase failures during COVID developer attrition.",
      "Documented architecture (HLD/LLD) and implemented end-to-end modules ensuring smooth deployment.",
      "Led and mentored a 3–4 member team of interns/junior engineers to deliver the MVP.",
      "Solved complex iOS private app release issues by collaborating directly with Apple Developer Support.",
      "Improved app/web performance by 25% and stabilized release cycles.",
    ],
  },
  {
    company: "The Luxury Closet Inc.",
    position: "React Developer",
    duration: "Mar 2019 – Jul 2021",
    location: "Gurugram",
    achievements: [
      "Built an e-commerce platform from scratch including cart, search, orders, and referral modules.",
      "Delivered PWA (mobile + desktop), reducing load times by 40% and improving SEO visibility.",
      "Redesigned iOS checkout flow, increasing conversions by 18%.",
      "Collaborated with designers and backend developers to build responsive UI for retail and real-estate platforms.",
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: PERSONAL_INFO.github,
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: PERSONAL_INFO.linkedin,
    icon: "Linkedin",
  },
  {
    name: "Email",
    url: `mailto:${PERSONAL_INFO.email}`,
    icon: "Mail",
  },
] as const;
