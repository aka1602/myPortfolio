"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/constants/personal";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import { validateEmail } from "@/lib/utils";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { useGameReward } from "@/contexts/GameRewardContext";
import { useGameModal } from "@/contexts/GameModalContext";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const { hasWonGame } = useGameReward();
  const { openGameModal } = useGameModal();
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would send the form data to your backend
      console.log("Form submitted:", form);

      setIsSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: "Mail" as const,
      label: "Email",
      value: hasWonGame ? PERSONAL_INFO.email : "🎮 Win a game to reveal",
      href: hasWonGame ? `mailto:${PERSONAL_INFO.email}` : "#about",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      isLocked: !hasWonGame,
    },
    {
      icon: "Phone" as const,
      label: "Phone",
      value: hasWonGame ? PERSONAL_INFO.phone : "🎮 Win a game to reveal",
      href: hasWonGame ? `tel:${PERSONAL_INFO.phone}` : "#about",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      isLocked: !hasWonGame,
    },
    {
      icon: "MapPin" as const,
      label: "Location",
      value: PERSONAL_INFO.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(
        PERSONAL_INFO.location
      )}`,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      isLocked: false,
    },
  ];

  if (isSubmitted) {
    return (
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp as any}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-900 rounded-2xl p-12 shadow-lg"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon
                name="Send"
                size="lg"
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <Typography variant="h3" className="mb-4">
              Message Sent Successfully!
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-400 mb-8"
            >
              Thank you for reaching out. I&apos;ll get back to you as soon as
              possible.
            </Typography>
            <Button variant="primary" onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        {/* Floating Particles */}
        {Array.from({ length: 20 }, (_, i) => ({
          left: (i * 13.7) % 100,
          top: (i * 19.3) % 100,
          duration: 3 + (i % 3),
          delay: (i % 6) * 0.33,
        })).map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm mb-6">
            <Typography
              variant="overline"
              className="text-blue-400 font-medium"
            >
              Get In Touch
            </Typography>
          </div>
          <Typography variant="h2" className="mb-6 text-white">
            Let&apos;s Work Together
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            I&apos;m always interested in new opportunities and exciting
            projects. Whether you have a question or just want to say hi, feel
            free to reach out!
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={fadeInLeft as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl h-full">
              <Typography variant="h3" className="mb-6 text-white">
                Contact Information
              </Typography>

              <Typography
                variant="body1"
                className="text-gray-300 mb-8 leading-relaxed"
              >
                Ready to start your next project? Let&apos;s discuss how we can
                work together to bring your ideas to life.
              </Typography>

              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                {contactMethods.map((method) => (
                  <motion.div
                    key={method.label}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-colors duration-200 group ${
                      method.isLocked
                        ? "cursor-pointer hover:bg-blue-500/5 border border-blue-500/20"
                        : "cursor-pointer hover:bg-white/5"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (method.isLocked) {
                        openGameModal();
                      } else if (
                        method.href.startsWith("http") ||
                        method.href.startsWith("mailto") ||
                        method.href.startsWith("tel")
                      ) {
                        if (typeof window !== "undefined") {
                          if (method.label === "Location") {
                            window.open(method.href, "_blank");
                          } else {
                            window.location.href = method.href;
                          }
                        }
                      }
                    }}
                  >
                    <div
                      className={`p-3 rounded-lg ${method.bgColor
                        .replace("dark:bg-", "bg-")
                        .replace("bg-blue-100", "bg-blue-500/10")
                        .replace("bg-green-100", "bg-green-500/10")
                        .replace("bg-purple-100", "bg-purple-500/10")}`}
                    >
                      <Icon
                        name={method.icon}
                        size="lg"
                        className={method.color}
                      />
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-400">
                        {method.label}
                      </Typography>
                      <Typography
                        variant="body1"
                        className={`font-medium transition-colors duration-200 ${
                          method.isLocked
                            ? "text-blue-400 group-hover:text-blue-300"
                            : "text-white group-hover:text-blue-400"
                        }`}
                      >
                        {method.value}
                      </Typography>
                      {method.isLocked && (
                        <Typography
                          variant="body2"
                          className="text-gray-500 text-xs mt-1"
                        >
                          Click to go to games
                        </Typography>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <Typography variant="h5" className="mb-4 text-white">
                  Follow Me
                </Typography>
                <div className="flex space-x-4">
                  {SOCIAL_LINKS.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-200 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon
                        name={link.icon as any}
                        size="lg"
                        className="text-gray-400 group-hover:text-blue-400 transition-colors duration-200"
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInRight as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <Typography variant="h3" className="mb-6 text-white">
                Send Message
              </Typography>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 ${
                      errors.name
                        ? "border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-blue-500"
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <Typography variant="caption" className="text-red-400 mt-1">
                      {errors.name}
                    </Typography>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 ${
                      errors.email
                        ? "border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-blue-500"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <Typography variant="caption" className="text-red-400 mt-1">
                      {errors.email}
                    </Typography>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 ${
                      errors.subject
                        ? "border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-blue-500"
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <Typography variant="caption" className="text-red-400 mt-1">
                      {errors.subject}
                    </Typography>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 ${
                      errors.message
                        ? "border-red-500"
                        : "border-white/10 hover:border-white/20 focus:border-blue-500"
                    }`}
                    placeholder="Tell me about your project or just say hello!"
                  />
                  {errors.message && (
                    <Typography variant="caption" className="text-red-400 mt-1">
                      {errors.message}
                    </Typography>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={
                    !isSubmitting ? { scale: 1.02, y: -1 } : undefined
                  }
                  whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Icon name="Send" size="sm" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
