import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const perks = [
  "Unified messaging across all devices",
  "Advanced privacy controls for your peace of mind",
  "AI-powered content recommendations",
  "Seamless integration with your favorite apps",
];

export default function Perks() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-6">
              Experience the Power of Unified Social Networking
            </h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              Our platform brings together all the essential features you need
              for a complete social media experience. Enjoy seamless
              communication, content sharing, and community building - all in
              one place.
            </p>
            <ul className="space-y-4">
              {perks.map((perk, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                  <span className="text-lg">{perk}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <img
              src="/unified-platform.png"
              alt="Unified Social Media Platform"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl w-full min-w-52"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
