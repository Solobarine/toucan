import { motion } from "framer-motion";
import {
  MessageSquare,
  UserCircle,
  Globe,
  Shield,
  Zap,
  List,
} from "lucide-react";

const features = [
  {
    title: "Real-time Messaging",
    description:
      "Connect instantly with friends through our lightning-fast chat system.",
    icon: MessageSquare,
  },
  {
    title: "Algorithm-Free Feed",
    description:
      "Enjoy content chronologically—no data harvesting, no addictive algorithms.",
    icon: List,
  },
  {
    title: "Customizable Profiles",
    description:
      "Express your unique personality with fully customizable profile pages.",
    icon: UserCircle,
  },
  {
    title: "Closer Communities",
    description: "Connect in intimate spaces built for deeper conversations.",
    icon: Globe,
  },
  {
    title: "Privacy Controls",
    description:
      "Stay in control with advanced privacy settings and content filters.",
    icon: Shield,
  },
  {
    title: "Instant Notifications",
    description:
      "Never miss a beat with real-time notifications for all activities.",
    icon: Zap,
  },
];

const featureVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-stone-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Powerful Features for Seamless Connections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={featureVariant}
              className="bg-white dark:bg-stone-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
