import { motion } from "framer-motion";
import {
  Star,
  Quote,
  Heart,
  MessageCircle,
  Users,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const reviews = [
  {
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    review:
      "This platform has revolutionized the way I connect with friends and family. The interface is intuitive, and the features are top-notch! 🚀",
    rating: 5,
    role: "Content Creator",
    location: "San Francisco, CA",
    emoji: "😍",
    color: "from-pink-500 to-rose-500",
    verified: true,
    joinDate: "2023",
    followers: "12.5K",
  },
  {
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=80&width=80",
    review:
      "I'm impressed by the privacy controls and the seamless integration of messaging and content sharing. It's become my go-to social network! 🔒",
    rating: 5,
    role: "Tech Entrepreneur",
    location: "Austin, TX",
    emoji: "🤩",
    color: "from-blue-500 to-cyan-500",
    verified: true,
    joinDate: "2022",
    followers: "8.2K",
  },
  {
    name: "Charlie Davis",
    avatar: "/placeholder.svg?height=80&width=80",
    review:
      "The global community feature has allowed me to connect with like-minded individuals from around the world. It's been an amazing experience! 🌍",
    rating: 4,
    role: "Digital Nomad",
    location: "Barcelona, Spain",
    emoji: "🌟",
    color: "from-purple-500 to-indigo-500",
    verified: true,
    joinDate: "2023",
    followers: "5.7K",
  },
  {
    name: "Diana Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    review:
      "The AI-powered recommendations are spot on! I've discovered so many interesting people and communities. Love the chronological feed too! ✨",
    rating: 5,
    role: "UX Designer",
    location: "Tokyo, Japan",
    emoji: "💫",
    color: "from-green-500 to-emerald-500",
    verified: true,
    joinDate: "2023",
    followers: "15.3K",
  },
  {
    name: "Ethan Rodriguez",
    avatar: "/placeholder.svg?height=80&width=80",
    review:
      "Finally, a social platform that respects privacy and doesn't manipulate what I see. The real-time messaging is lightning fast! ⚡",
    rating: 5,
    role: "Software Engineer",
    location: "Mexico City, MX",
    emoji: "🔥",
    color: "from-orange-500 to-red-500",
    verified: true,
    joinDate: "2022",
    followers: "9.8K",
  },
  {
    name: "Fiona Williams",
    avatar: "/placeholder.svg?height=80&width=80",
    review:
      "The customizable themes and profile options let me express my personality perfectly. Plus, the community moderation is excellent! 🎨",
    rating: 5,
    role: "Artist & Influencer",
    location: "London, UK",
    emoji: "🎭",
    color: "from-yellow-500 to-orange-500",
    verified: true,
    joinDate: "2023",
    followers: "22.1K",
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

const reviewVariants = {
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

const cardVariants = {
  rest: {
    y: 0,
    rotateY: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    y: -8,
    rotateY: 2,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: { duration: 0.3 },
  },
};

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(reviews.length / 3)) %
        Math.ceil(reviews.length / 3),
    );
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-stone-800 dark:via-purple-900/20 dark:to-pink-900/20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Hearts and Stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bg-element-${i}`}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            {i % 3 === 0 ? "💫" : i % 3 === 1 ? "⭐" : "💖"}
          </motion.div>
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
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
            <Heart className="w-5 h-5" />
            <span>Loved by Users ❤️</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            What Our{" "}
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
              Community 🌟
            </motion.span>
            <br />
            Is Saying
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it! Here's what some of our amazing
            users have to say about their experience 💫
          </p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { icon: Users, value: "10M+", label: "Happy Users" },
              { icon: Star, value: "4.9", label: "Average Rating" },
              { icon: MessageCircle, value: "50K+", label: "Reviews" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 px-4 py-2 bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-stone-700/50"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <stat.icon className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-bold text-lg">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              onClick={prevSlide}
              className="p-3 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-stone-700/50 hover:bg-white dark:hover:bg-stone-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="p-3 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-stone-700/50 hover:bg-white dark:hover:bg-stone-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Reviews Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {reviews
              .slice(currentIndex * 3, currentIndex * 3 + 3)
              .map((review, index) => (
                <motion.div
                  key={index}
                  variants={reviewVariants}
                  className="group relative"
                >
                  <motion.div
                    className="relative bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-stone-700/50 overflow-hidden"
                    variants={cardVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {/* Quote Icon */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Quote className="w-12 h-12 text-purple-600" />
                    </motion.div>

                    {/* Gradient Background on Hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${review.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    {/* Header */}
                    <div className="flex items-center mb-6 relative z-10">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          className="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-lg"
                        />
                        {review.verified && (
                          <motion.div
                            className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {review.name}
                          </h3>
                          <span className="text-xl">{review.emoji}</span>
                        </div>
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                          {review.role}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {review.location}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                            <Star
                              className={`w-5 h-5 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {review.rating}/5
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
                      "{review.review}"
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 relative z-10">
                      <span>Joined {review.joinDate}</span>
                      <span>{review.followers} followers</span>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${review.color.split(" ")[1]} 0%, ${review.color.split(" ")[3]} 100%)`,
                        filter: "blur(20px)",
                        transform: "scale(1.05)",
                        zIndex: -1,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(Math.ceil(reviews.length / 3))].map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-purple-600 w-8"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-purple-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
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
              Join Our Community 🎉
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles className="w-5 h-5" />
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
