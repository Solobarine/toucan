// src/components/Reviews.tsx
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Alice",
    review: "Toucan is the best! I love the vibrant design and features.",
  },
  { name: "Bob", review: "Amazing experience. I can’t stop using it!" },
  {
    name: "Charlie",
    review: "The animations and features are on point. Totally recommend it.",
  },
];

const reviewVariant = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.3 },
  }),
};

const Reviews: React.FC = () => (
  <section className="py-20 bg-light dark:bg-dark">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-10 text-center">User Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={review.name}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={reviewVariant}
            className="p-8 bg-white dark:bg-stone-700 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-xl font-semibold mb-4">{review.name}</h3>
            <p className="italic">"{review.review}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
