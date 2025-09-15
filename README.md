# 🚀 Akash Gupta - Senior Frontend Engineer Portfolio

A cutting-edge, interactive portfolio website showcasing modern web development skills with **3D graphics**, **advanced animations**, and **mobile-first design**.

![Portfolio Preview](https://hey-akash.vercel.app/)

## ✨ Key Features

### 🎮 **Interactive 3D Experiences**

- **3D Project Gallery** - Immersive project showcase with orbital controls
- **Skills Solar System** - Interactive 3D visualization of technical skills
- **WebGL Optimizations** - Mobile-friendly with automatic fallbacks
- **Performance Adaptive** - Smart device detection and optimization

### 🎨 **Advanced Animations**

- **Framer Motion** - Smooth, professional micro-interactions
- **Typewriter Effects** - Animated developer tags `<Senior Frontend Engineer/>`
- **Stagger Animations** - Orchestrated component entrances
- **Hover States** - Interactive feedback throughout

### 📱 **Mobile Excellence**

- **Touch Controls** - Optimized 3D navigation for mobile
- **Responsive 3D** - Adaptive camera positions and controls
- **Performance Scaling** - Automatic quality adjustments
- **Fallback UI** - Graceful degradation for unsupported devices

### 🎯 **Interactive Elements**

- **Mini Games** - Unlock contact details through gameplay
- **Dynamic Content** - Real-time experience calculations
- **Context API** - Global state management for rewards
- **Smooth Scrolling** - Seamless section navigation

## 🛠️ Tech Stack

### **Core Technologies**

- **Framework:** Next.js 15.5.3 (App Router + Turbopack)
- **Language:** TypeScript 5.0+
- **Styling:** Tailwind CSS 3.4+
- **Animations:** Framer Motion 11+

### **3D & Graphics**

- **3D Engine:** Three.js + React Three Fiber
- **3D Components:** @react-three/drei
- **WebGL:** Hardware-accelerated rendering
- **Performance:** Instanced rendering & LOD optimization

### **Development**

- **Linting:** ESLint + TypeScript ESLint
- **Code Quality:** Prettier + Husky
- **Icons:** Lucide React
- **Fonts:** Inter & JetBrains Mono

### **Deployment**

- **Platform:** Vercel (recommended)
- **CDN:** Global edge network
- **Analytics:** Built-in performance monitoring

## 📁 Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & 3D optimizations
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── atoms/             # Basic UI components
│   │   ├── Button.tsx     # Interactive button component
│   │   ├── Icon.tsx       # Lucide icon wrapper
│   │   └── Typography.tsx # Text components
│   ├── molecules/         # Composite components
│   │   ├── GameModal.tsx  # Interactive game modal
│   │   ├── GameSelector.tsx # Game selection interface
│   │   └── ProjectCard.tsx # Project display cards
│   ├── organisms/         # Complex components
│   │   ├── Header.tsx     # Navigation header
│   │   └── Footer.tsx     # Site footer
│   └── 3d/               # Three.js components
│       ├── SolarSystemSkills.tsx # 3D skills visualization
│       ├── SimpleProject3DCard.tsx # 3D project cards
│       ├── MinimalGalleryEnvironment.tsx # 3D scene setup
│       └── ThreeErrorBoundary.tsx # 3D error handling
├── features/              # Feature-based modules
│   ├── hero/             # Landing section with 3D background
│   ├── about/            # About section with animations
│   ├── skills/           # 3D skills solar system
│   ├── projects/         # 3D project gallery
│   └── contact/          # Interactive contact form
├── contexts/             # React Context providers
│   ├── GameRewardContext.tsx # Game state management
│   └── GameModalContext.tsx  # Modal state management
├── constants/            # Static data & configuration
│   ├── personal.ts       # Personal information
│   └── projects.ts       # Project data
├── types/               # TypeScript definitions
│   └── index.ts         # Global type definitions
└── lib/                 # Utilities & animations
    ├── animations.ts    # Framer Motion variants
    └── utils.ts         # Helper functions
```

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Modern browser with WebGL support

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/aka1602/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### **Build for Production**

```bash
npm run build
npm start
```

## 📱 Device Compatibility

### **Desktop Browsers**

- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### **Mobile Devices**

- ✅ iOS Safari 14+ (iPhone/iPad)
- ✅ Chrome Mobile 90+
- ✅ Samsung Internet 13+
- ✅ Firefox Mobile 88+

### **3D Performance Tiers**

- **High-End**: Full 3D effects, 60fps, all features
- **Mid-Range**: Optimized 3D, 30fps, reduced effects
- **Low-End**: 2D fallback, essential features only

## 🎮 Interactive Features

### **Mini Games System**

- **Number Guessing** - Logic and probability
- **Rock Paper Scissors** - Classic game with AI
- **Tic Tac Toe** - Strategic gameplay
- **Memory Match** - Cognitive challenge
- **Color Match** - Visual perception
- **Reaction Time** - Speed testing

### **3D Experiences**

- **Project Gallery** - Interactive 3D project showcase
- **Skills Solar System** - Orbital skill visualization
- **Touch Controls** - Mobile-optimized interactions
- **Auto-Rotation** - Cinematic presentation mode

## ⚡ Performance Optimizations

### **3D Rendering**

- **Adaptive Quality** - Device-based optimization
- **Instanced Rendering** - Efficient geometry handling
- **Frustum Culling** - Only render visible objects
- **LOD System** - Distance-based detail reduction

### **Mobile Optimizations**

- **Touch Gestures** - Native mobile interactions
- **Battery Efficiency** - Demand-based rendering
- **Memory Management** - Automatic cleanup
- **Network Optimization** - Progressive loading

### **Core Web Vitals**

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

## 🎨 Customization Guide

### **Personal Information**

```typescript
// src/constants/personal.ts
export const PERSONAL_INFO = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... other details
};
```

### **Projects Data**

```typescript
// src/constants/projects.ts
export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Project Name",
    description: "Project description",
    technologies: ["React", "TypeScript"],
    liveUrl: "https://project-url.com",
    color: "#3b82f6", // 3D card color
  },
];
```

### **3D Scene Configuration**

```typescript
// Modify camera positions, lighting, and controls
// in respective 3D component files
```

### **Styling & Themes**

```css
/* src/app/globals.css */
/* Customize colors, fonts, and animations */
```

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
```

## 📊 Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze
```

## 🌐 Deployment

### **Vercel (Recommended)**

1. Connect GitHub repository
2. Auto-deploy on push to main
3. Environment variables configured
4. Edge functions enabled

### **Other Platforms**

- **Netlify**: Static site generation
- **AWS Amplify**: Full-stack deployment
- **GitHub Pages**: Static hosting

## 🔒 Environment Variables

```bash
# .env.local (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_CONTACT_EMAIL=your_contact_email
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** - 3D graphics inspiration
- **Framer Motion** - Animation framework
- **Next.js Team** - React framework
- **Tailwind CSS** - Utility-first CSS

## 📞 Contact & Connect

- **📧 Email:** [akash.greenwork1@gmail.com](mailto:akash.greenwork1@gmail.com)
- **💼 LinkedIn:** [akash-a45aab120](https://www.linkedin.com/in/akash-a45aab120/)
- **🐙 GitHub:** [aka1602](https://github.com/aka1602)
- **🌐 Portfolio:** [Live Demo](https://your-portfolio-url.com)

---

<div align="center">

**Built with ❤️ and ☕ by Akash Gupta**

_Senior Frontend Engineer specializing in React, TypeScript, and 3D Web Experiences_

![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=for-the-badge&logo=next.js)
![Powered by Three.js](https://img.shields.io/badge/Powered%20by-Three.js-orange?style=for-the-badge&logo=three.js)

</div>
