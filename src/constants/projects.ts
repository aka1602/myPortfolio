import { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "my11circle-app",
    title: "My11Circle Fantasy Sports App",
    description:
      "A comprehensive fantasy sports gaming platform with spinner content and micro-frontend dashboard modules.",
    longDescription:
      "Developed features for My11Circle app at Play Games24x7, including spinner content and micro-frontend based dashboard modules. Improved performance by optimizing React Native components and solving frame-rate & loading issues. Modularized login flows into a reusable module, enabling integration across multiple gaming products. The app provides users with an engaging fantasy sports experience with real-time updates and seamless gameplay.",
    technologies: [
      "React Native",
      "TypeScript",
      "Micro Frontend",
      "Redux",
      "Performance Optimization",
      "Real-time Updates",
    ],
    liveUrl:
      "https://play.google.com/store/search?q=my11circle+app+download&c=apps&hl=en_IN",
    featured: true,
    category: "mobile",
    status: "completed",
    imageUrl: undefined,
    color: "#10b981",
  },
  {
    id: "ambitionbox-app",
    title: "AmbitionBox Community Application",
    description:
      "Professional community mobile app that boosted traffic from 3.5M to 4.7M users.",
    longDescription:
      "Architected and launched the AmbitionBox mobile app from scratch at InfoEdge Technologies. This professional community application enables users to share company reviews, salary insights, interview experiences, and engage in meaningful career discussions. Features include real-time messaging, content moderation, user verification, and advanced search capabilities. The app successfully boosted traffic from 3.5M to 4.7M users and is available on Google Play Store.",
    technologies: [
      "React Native",
      "TypeScript",
      "Redux",
      "REST APIs",
      "Push Notifications",
      "Real-time Messaging",
      "Content Moderation",
      "User Verification",
    ],
    liveUrl:
      "https://play.google.com/store/search?q=ambitionbox&c=apps&hl=en_IN",
    featured: true,
    category: "mobile",
    status: "completed",
    imageUrl: undefined,
    color: "#8b5cf6",
  },
  {
    id: "ambitionbox-web",
    title: "AmbitionBox Web Application",
    description:
      "Professional community web platform for career insights and company reviews.",
    longDescription:
      "Developed the web version of AmbitionBox platform at InfoEdge Technologies, complementing the mobile app. This comprehensive web application provides professionals with company reviews, salary insights, interview experiences, and career guidance. Built with modern web technologies to ensure optimal performance and user experience across all devices.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Redux",
      "REST APIs",
      "SEO Optimization",
      "Performance Optimization",
    ],
    liveUrl: "https://www.ambitionbox.com",
    featured: true,
    category: "web",
    status: "completed",
    imageUrl: undefined,
    color: "#f59e0b",
  },
  {
    id: "hrcadre-website",
    title: "HR Cadre Consulting Website",
    description:
      "Fully responsive HR consulting website with PWA support, crafted with Next.js and Framer Motion.",
    longDescription:
      "Crafted solo by a dedicated developer, the HR Cadre Consulting website is a testament to innovation and elegance. Built with Next.js, Framer Motion, and Tailwind CSS, it showcases the company's ethos and services in style. The website is fully responsive and supports PWA functionality, seamlessly blending cutting-edge technology with captivating design to represent the future of HR solutions.",
    technologies: [
      "Next.js",
      "React.js",
      "Framer Motion",
      "Tailwind CSS",
      "SCSS",
      "JavaScript",
      "PWA",
      "Cypress",
      "React Hooks",
    ],
    liveUrl: "https://www.hrcadre.in/",
    featured: false,
    category: "web",
    status: "completed",
    imageUrl: undefined,
    color: "#ec4899",
  },
  {
    id: "luxury-closet-web",
    title: "The Luxury Closet Ecommerce Website",
    description:
      "Dynamic luxury ecommerce platform with seamless user experience for buyers and sellers.",
    longDescription:
      "Designed and developed The Luxury Closet website as a testament to the perfect blend of form and function. With a keen eye for user experience, harnessed the power of React.js to create a dynamic, user-friendly ecommerce platform. From crafting smooth navigation to implementing secure transaction processes, every detail was meticulously engineered to ensure a seamless experience for both buyers and sellers in the luxury fashion market. The platform has been trusted experts in luxury resale since 2012.",
    technologies: [
      "React.js",
      "JavaScript",
      "CSS",
      "Ecommerce",
      "Payment Integration",
      "User Experience Design",
    ],
    liveUrl: "https://theluxurycloset.com/",
    featured: false,
    category: "web",
    status: "completed",
    imageUrl: undefined,
    color: "#ef4444",
  },
  {
    id: "luxury-closet-ios",
    title: "The Luxury Closet iOS App",
    description:
      "Ultimate luxury shopping and selling mobile app connecting buyers and sellers globally.",
    longDescription:
      "Introducing The Luxury Closet app, the ultimate destination for luxury shopping and selling. This user-friendly ecommerce platform seamlessly connects buyers and sellers, offering a world of curated luxury fashion at your fingertips. With the app, buyers can explore and purchase the finest in luxury, while sellers can effortlessly showcase their items to a global audience. Experience the future of luxury commerce with cutting-edge mobile technology.",
    technologies: [
      "iOS Development",
      "Mobile App Development",
      "Ecommerce",
      "User Interface Design",
      "Payment Integration",
    ],
    liveUrl:
      "https://apps.apple.com/ae/app/the-luxury-closet-buy-sell/id1085470991",
    featured: false,
    category: "mobile",
    status: "completed",
    imageUrl: undefined,
    color: "#3b82f6",
  },
] as const;
