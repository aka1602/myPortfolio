"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/constants/personal";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import Typography from "@/components/atoms/Typography";
import Icon from "@/components/atoms/Icon";

const Footer: React.FC = () => {
  // Use a fixed year to avoid hydration mismatch - update annually
  const currentYear = 2024;

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") return;

    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-white/10 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Section */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Typography
                  variant="h6"
                  className="text-white font-bold text-lg"
                >
                  {PERSONAL_INFO.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h4"
                  className="text-white font-bold text-xl md:text-2xl"
                >
                  {PERSONAL_INFO.name}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-blue-400 font-medium"
                >
                  {PERSONAL_INFO.title}
                </Typography>
              </div>
            </div>

            <Typography
              variant="body1"
              className="text-gray-300 mb-8 max-w-md leading-relaxed"
            >
              Passionate about creating exceptional digital experiences with
              clean, efficient code and modern technologies.
            </Typography>

            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    name={link.icon as any}
                    size="lg"
                    className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <Typography variant="h5" className="text-white mb-6 font-semibold">
              Quick Links
            </Typography>
            <nav className="space-y-4">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 text-left font-medium"
                  whileHover={{ x: 4 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={staggerItem}>
            <Typography variant="h5" className="text-white mb-6 font-semibold">
              Get In Touch
            </Typography>
            <div className="space-y-4">
              <motion.a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group"
                whileHover={{ x: 4 }}
              >
                <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <Icon name="Mail" size="sm" className="text-blue-400" />
                </div>
                <Typography
                  variant="body2"
                  className="text-gray-300 font-medium group-hover:text-white"
                >
                  {PERSONAL_INFO.email}
                </Typography>
              </motion.a>
              <motion.a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group"
                whileHover={{ x: 4 }}
              >
                <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <Icon name="Phone" size="sm" className="text-green-400" />
                </div>
                <Typography
                  variant="body2"
                  className="text-gray-300 font-medium group-hover:text-white"
                >
                  {PERSONAL_INFO.phone}
                </Typography>
              </motion.a>
              <motion.div
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                whileHover={{ x: 4 }}
              >
                <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <Icon name="MapPin" size="sm" className="text-purple-400" />
                </div>
                <Typography
                  variant="body2"
                  className="text-gray-300 font-medium"
                >
                  {PERSONAL_INFO.location}
                </Typography>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Typography variant="body2" className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </Typography>

          <div className="flex items-center space-x-6">
            <Typography variant="body2" className="text-gray-400">
              Built with ❤️ using Next.js & Framer Motion
            </Typography>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 z-40 backdrop-blur-sm border border-white/10"
        onClick={() => scrollToSection("#home")}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Icon name="ArrowRight" size="lg" className="rotate-[-90deg]" />
      </motion.button>
    </footer>
  );
};

export default Footer;
