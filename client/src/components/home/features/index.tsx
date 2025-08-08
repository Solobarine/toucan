"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  UserCircle,
  Globe,
  Shield,
  Zap,
  List,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "Real-time Messaging",
    description:
      "Connect instantly with friends through our lightning-fast chat system.",
    icon: MessageSquare,
    emoji: "💬",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    stats: "< 50ms latency",
  },
  {
    title: "Algorithm-Free Feed",
    description:
      "Enjoy content chronologically—no data harvesting, no addictive algorithms.",
    icon: List,
    emoji: "📋",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    stats: "100% chronological",
  },
  {
    title: "Customizable Profiles",
    description:
      "Express your unique personality with fully customizable profile pages.",
    icon: UserCircle,
    emoji: "🎨",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    stats: "Unlimited themes",
  },
  {
    title: "Closer Communities",
    description: "Connect in intimate spaces built for deeper conversations.",
    icon: Globe,
    emoji: "🌍",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    stats: "10K+ communities",
  },
  {
    title: "Privacy Controls",
    description:
      "Stay in control with advanced privacy settings and content filters.",
    icon: Shield,
    emoji: "🔒",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    stats: "Bank-level security",
  },
  {
    title: "Instant Notifications",
    description:
      "Never miss a beat with real-time notifications for all activities.",
    icon: Zap,
    emoji: "⚡",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    stats: "Real-time updates",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const featureVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3 },
  },
};

const cardVariants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: { duration: 0.3 },
  },
};

export default function Features() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-stone-900 dark:via-stone-800 dark:to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-xl"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300 font-medium mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Powerful Features ✨</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
            Built for Modern
            <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Connections 🚀
            </motion.span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience social networking reimagined with features designed for
            authentic connections, privacy, and meaningful interactions 💫
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={featureVariants}
              className="group relative"
            >
              <motion.div
                className="relative bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-stone-700/50 overflow-hidden"
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon Container */}
                <div className="relative mb-6">
                  <motion.div
                    className={`w-16 h-16 ${feature.bgColor} dark:bg-stone-700 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden`}
                    variants={iconVariants}
                  >
                    {/* Icon Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    <feature.icon className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-white relative z-10 transition-colors duration-300" />
                  </motion.div>

                  {/* Floating Emoji */}
                  <motion.div
                    className="absolute -top-2 -right-2 text-2xl"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    {feature.emoji}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Stats Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                      {feature.stats}
                    </span>

                    {/* Learn More Arrow */}
                    <motion.div
                      className="flex items-center text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium mr-2">
                        Learn more
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color.split(" ")[1]} 0%, ${feature.color.split(" ")[3]} 100%)`,
                    filter: "blur(20px)",
                    transform: "scale(1.1)",
                    zIndex: -1,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button
            className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore All Features 🎯
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>

            {/* Button Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
