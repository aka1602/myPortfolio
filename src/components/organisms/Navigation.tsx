"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PERSONAL_INFO } from "@/constants/personal";
import Icon from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import { useGameModal } from "@/contexts/GameModalContext";

const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { openGameModal } = useGameModal();

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionChange = () => {
      const sections = navigationItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionChange);
    };
  }, []);

  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") return;

    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Typography
                  variant="h6"
                  className="text-white font-bold text-sm md:text-base"
                >
                  {PERSONAL_INFO.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Typography>
              </div>
              <Typography
                variant="h6"
                className="hidden sm:block font-bold text-white"
              >
                {PERSONAL_INFO.name}
              </Typography>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                    activeSection === item.href.slice(1)
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-gray-300 hover:text-blue-400 hover:bg-white/5"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                      layoutId="activeSection"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Game CTA, Resume Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <motion.button
              className="hidden sm:inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={openGameModal}
            >
              <Icon name="Gamepad2" size="sm" className="mr-2" />
              Play
            </motion.button>

            <motion.button
              className="hidden sm:inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.open(PERSONAL_INFO.resumeUrl, "_blank");
                }
              }}
            >
              <Icon name="Download" size="sm" className="mr-2" />
              Resume
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-white/5 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size="lg" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                    activeSection === item.href.slice(1)
                      ? "text-blue-400 bg-blue-500/10 border-l-2 border-blue-400"
                      : "text-gray-300 hover:text-blue-400 hover:bg-white/5"
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="px-3 py-2 space-y-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500"
                  leftIcon={<Icon name="Gamepad2" size="sm" />}
                  onClick={() => {
                    openGameModal();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Play Games
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  leftIcon={<Icon name="Download" size="sm" />}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(PERSONAL_INFO.resumeUrl, "_blank");
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Download Resume
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
