"use client";

import Navigation from "@/components/organisms/Navigation";
import Footer from "@/components/organisms/Footer";
import HeroSection from "@/features/hero/HeroSection";
import AboutSection from "@/features/about/AboutSection";
import ProjectsSection from "@/features/projects/ProjectsSection";
import ContactSection from "@/features/contact/ContactSection";
import GameModal from "@/components/molecules/GameModal";
import { useGameModal } from "@/contexts/GameModalContext";

export default function Home() {
  const { isGameModalOpen, closeGameModal } = useGameModal();
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <GameModal isOpen={isGameModalOpen} onClose={closeGameModal} />
    </>
  );
}
