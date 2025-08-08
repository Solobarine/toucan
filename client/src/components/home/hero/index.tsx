"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Heart, MessageCircle, Share2 } from "lucide-react";

const SocialHero = () => {
  const navigate = (path: string) => {
    // Placeholder for navigation - replace with your router logic
    console.log(`Navigating to: ${path}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700"
        animate={{
          background: [
            "linear-gradient(45deg, #8b5cf6, #6366f1, #8b5cf6)",
            "linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1)",
            "linear-gradient(135deg, #8b5cf6, #6366f1, #8b5cf6)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              width: "200%",
              left: "-50%",
              top: `${20 + i * 15}%`,
              transform: `rotate(${-15 + i * 5}deg)`,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Social Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Emojis */}
        {["💬", "❤️", "👥", "🚀", "✨", "🌟", "💫", "🎉"].map((emoji, i) => (
          <motion.div
            key={`emoji-${i}`}
            className="absolute text-2xl sm:text-4xl"
            style={{
              left: `${10 + ((i * 12) % 80)}%`,
              top: `${15 + ((i * 8) % 70)}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{
              delay: i * 0.3,
              duration: 3 + Math.random() * 2,
            }}
          >
            {emoji}
          </motion.div>
        ))}

        {/* Floating Icons */}
        {[Users, Heart, MessageCircle, Share2].map((Icon, i) => (
          <motion.div
            key={`icon-${i}`}
            className="absolute p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            style={{
              right: `${10 + i * 15}%`,
              top: `${20 + i * 20}%`,
            }}
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: i * 0.4 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        ))}
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-8 border border-white/20"
          variants={itemVariants}
        >
          <motion.div
            className="w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="flex items-center gap-1">
            Join 10M+ happy users 🎉
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-7xl font-bold mb-8 leading-tight"
          variants={itemVariants}
        >
          <span className="block">Connect 🤝</span>
          <span className="block">
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Share ✨
            </motion.span>
          </span>
          <span className="block">Thrive 🚀</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          variants={itemVariants}
        >
          Experience a new era of social networking where your voice matters 📢
          <br />
          <span className="text-purple-200">
            Join millions in creating meaningful connections and sharing life's
            beautiful moments 💫
          </span>
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={itemVariants}
        >
          {[
            { icon: "🔒", text: "Privacy First" },
            { icon: "🌍", text: "Global Community" },
            { icon: "⚡", text: "Lightning Fast" },
            { icon: "🎨", text: "Creative Tools" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="mr-2">{feature.icon}</span>
              {feature.text}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <motion.button
            className="group relative overflow-hidden px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl shadow-2xl min-w-[200px]"
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
              Get Started Free 🎯
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>

          <motion.button
            className="group relative overflow-hidden px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-2xl backdrop-blur-sm min-w-[200px]"
            onClick={() => navigate("/about-us")}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <span className="flex items-center justify-center gap-2">
              Watch Demo 📺
              <motion.div
                className="w-2 h-2 bg-red-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </span>
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-purple-200"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white flex items-center justify-center text-xs"
                >
                  {["😊", "🎉", "💫", "🚀"][i]}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium">10M+ Active Users</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>
            <span className="text-sm font-medium">4.9/5 Rating</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20 text-white/10"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            animate={{
              d: [
                "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
                "M0,80 C300,40 900,100 1200,40 L1200,120 L0,120 Z",
                "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default SocialHero;
