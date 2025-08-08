import { motion } from "framer-motion";
import {
  Palette,
  Edit3,
  Layers,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react";

const features = [
  {
    icon: Palette,
    text: "Customizable themes to match your style",
    emoji: "🎨",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Edit3,
    text: "Easy-to-use content creation tools",
    emoji: "✏️",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Layers,
    text: "Seamless integration of all features",
    emoji: "🔗",
    color: "from-purple-500 to-indigo-500",
  },
];

export default function Looks() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-stone-800 dark:via-purple-900/20 dark:to-pink-900/20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bg-shape-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-2xl"
            style={{
              width: `${150 + Math.random() * 100}px`,
              height: `${150 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:w-1/2 relative"
          >
            {/* Image Container with Enhanced Effects */}
            <div className="relative group">
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Main Image */}
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://i.postimg.cc/YSx60mb5/feed.avif"
                  alt="Social Media App Interface"
                  loading="lazy"
                  width={600}
                  height={400}
                  className="w-full aspect-[3/2] object-cover"
                />

                {/* Overlay with Play Button */}
                <motion.div
                  className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                >
                  <motion.button
                    className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-semibold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Floating UI Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white dark:bg-stone-800 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-stone-700"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Live Updates</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-3 shadow-lg"
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Powered</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="lg:w-1/2"
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300 font-medium mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Beautiful Design ✨</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              An Intuitive Interface for{" "}
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
                Seamless Social Experiences 🚀
              </motion.span>
            </h2>

            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
              Our sleek and user-friendly design puts the focus on what matters
              most - your connections and content 💫 With a clean layout and
              intuitive navigation, you'll find it easier than ever to share
              your world and explore others'.
            </p>

            {/* Enhanced Feature List */}
            <div className="mb-8 space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex items-center p-4 rounded-xl hover:bg-white/50 dark:hover:bg-stone-700/50 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="text-lg font-medium flex items-center gap-2">
                      {feature.text}
                      <span className="text-xl">{feature.emoji}</span>
                    </span>
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 3 }}
                  >
                    <ArrowRight className="w-5 h-5 text-purple-600" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Features 🎯
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
