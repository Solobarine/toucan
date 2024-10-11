// src/components/Features.tsx
import { motion } from "framer-motion";

const features = [
  {
    title: "Instant Messaging",
    description:
      "Chat with friends instantly using our real-time messaging system.",
    icon: "💬",
  },
  {
    title: "Video Sharing",
    description: "Upload and share videos easily.",
    icon: "🎥",
  },
  {
    title: "Customizable Profiles",
    description: "Express yourself with fully customizable profiles.",
    icon: "👤",
  },
];

const featureVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Features: React.FC = () => (
  <section className="py-20 bg-light dark:bg-dark">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-10 text-center">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={featureVariant}
            className="p-8 bg-white dark:bg-stone-700 rounded-lg shadow-lg text-center"
          >
            <span className="text-4xl mb-4">{feature.icon}</span>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
