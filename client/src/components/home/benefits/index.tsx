// src/components/Benefits.tsx
import { motion } from "framer-motion";

const Benefits = () => (
  <section className="py-20 bg-gradient-to-r from-primary ">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Why Choose Toucan?
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-6">
        {["No Ads!", "Free Forever", "Super Fast"].map((benefit, index) => (
          <motion.div
            key={index}
            className="p-6 bg-yellow-400 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {benefit}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
