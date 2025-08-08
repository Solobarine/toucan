import { motion } from "framer-motion";
import {
  Smartphone,
  Shield,
  Brain,
  Puzzle,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";

const perks = [
  {
    text: "Unified messaging across all devices",
    icon: Smartphone,
    emoji: "📱",
    color: "from-blue-500 to-cyan-500",
    description: "Seamless sync across mobile, tablet, and desktop",
  },
  {
    text: "Advanced privacy controls for your peace of mind",
    icon: Shield,
    emoji: "🔒",
    color: "from-green-500 to-emerald-500",
    description: "Bank-level encryption and granular privacy settings",
  },
  {
    text: "AI-powered content recommendations",
    icon: Brain,
    emoji: "🤖",
    color: "from-purple-500 to-indigo-500",
    description: "Smart algorithms that learn your preferences",
  },
  {
    text: "Seamless integration with your favorite apps",
    icon: Puzzle,
    emoji: "🧩",
    color: "from-orange-500 to-red-500",
    description: "Connect with 100+ popular platforms and services",
  },
];

export default function Perks() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-stone-900 dark:via-stone-800 dark:to-blue-900/20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-2xl"
            style={{
              width: `${120 + Math.random() * 80}px`,
              height: `${120 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 40, -40, 0],
              y: [0, -25, 25, 0],
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

        {/* Animated Lines */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"
            style={{
              width: "150%",
              left: "-25%",
              top: `${25 + i * 20}%`,
              transform: `rotate(${-10 + i * 5}deg)`,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.8,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:w-1/2"
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 font-medium mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="w-4 h-4" />
              <span>Powerful Features ⚡</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Experience the Power of{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
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
                Unified Social Networking 🌐
              </motion.span>
            </h2>

            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
              Our platform brings together all the essential features you need
              for a complete social media experience ✨ Enjoy seamless
              communication, content sharing, and community building - all in
              one place.
            </p>

            {/* Enhanced Perks List */}
            <div className="space-y-6">
              {perks.map((perk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <motion.div
                    className="flex items-start p-6 rounded-2xl bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-stone-700/50 hover:bg-white/80 dark:hover:bg-stone-800/80 transition-all duration-300"
                    whileHover={{ x: 5, y: -2 }}
                  >
                    {/* Icon Container */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${perk.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <perk.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {perk.text}
                        </h3>
                        <span className="text-xl">{perk.emoji}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {perk.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 3 }}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </motion.div>

                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                      style={{
                        background: `linear-gradient(135deg, ${perk.color.split(" ")[1]} 0%, ${perk.color.split(" ")[3]} 100%)`,
                        filter: "blur(20px)",
                        transform: "scale(1.05)",
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="lg:w-1/2 relative"
          >
            {/* Image Container with Enhanced Effects */}
            <div className="relative group">
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 6,
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
                  src="https://i.postimg.cc/k5CN7yFN/chats.avif"
                  alt="Unified Social Media Platform"
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full min-w-52 aspect-[3/2] object-cover"
                />

                {/* Overlay with Stats */}
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold">10M+</div>
                        <div className="text-sm opacity-80">Active Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">99.9%</div>
                        <div className="text-sm opacity-80">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">4.9★</div>
                        <div className="text-sm opacity-80">Rating</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-3 shadow-lg"
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
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">All-in-One</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-stone-800 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-stone-700"
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
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
