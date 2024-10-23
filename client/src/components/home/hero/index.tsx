import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const emojis = [
  "😎",
  "🥳",
  "😂",
  "😅",
  "😍",
  "🤩",
  "🤔",
  "👍",
  "❤️",
  "🔥",
  "👏",
  "💬",
  "📸",
  "🎉",
  "💡",
  "🙌",
  "👀",
  "🤳",
  "🧠",
  "🔔",
  "💯",
  "🎥",
  "📱",
  "📲",
  "🔗",
  "🔊",
  "📢",
  "✌️",
  "🤯",
  "🤗",
  "😜",
  "🤪",
  "😇",
  "😎",
  "😏",
  "🧐",
  "💻",
  "⌨️",
  "📝",
  "🎤",
  "🎶",
  "🏆",
  "💪",
  "⚡",
  "💼",
  "🚀",
  "🌟",
  "📊",
  "🖼️",
  "💻",
];

// Function to generate random movement properties for each emoji
const generateRandomMovement = () => ({
  x: Math.random() * -200 - 100, // Random left movement (towards the left of the screen)
  y: Math.random() * -200 - 100, // Random upward movement (towards the top of the screen)
  scale: Math.random() * 0.5 + 0.5, // Random scale for slight size variation
  opacity: 0, // Start fading out
  duration: Math.random() * 5 + 3, // Random duration between 3 and 8 seconds
  delay: Math.random() * 1, // Random delay before the animation starts
});

const Hero: React.FC = () => {
  const [emojiConfigs, setEmojiConfigs] = useState(
    emojis.map(() => generateRandomMovement())
  );

  // Regenerate random configurations periodically to give the effect of continuous bubblin

  return (
    <section className="relative h-screen bg-gradient-to-r from-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.h1
          className="text-6xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to <span className="text-yellow-300">Toucan</span> 🐦
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Connect with the world in vibrant, fun, and exciting ways. Your new
          favorite social media platform is here.
        </motion.p>
        <motion.button
          className="bg-yellow-400 text-black px-8 py-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Join Now
        </motion.button>
      </div>

      {/* Bubbling Emojis */}
      {emojiConfigs.map((config, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl"
          style={{ bottom: "5vh", right: "5vw" }} // Start from bottom-right corner
          initial={{ x: 0, y: 0, opacity: 1 }} // Start position and opacity
          animate={{
            x: config.x,
            y: config.y,
            opacity: config.opacity,
            scale: config.scale,
          }}
          transition={{
            duration: config.duration,
            delay: config.delay,
            ease: "easeInOut",
            repeat: Infinity, // Loop the bubbling animation
            repeatType: "loop",
          }}
        >
          {emojis[index]}
        </motion.div>
      ))}
    </section>
  );
};

export default Hero;
