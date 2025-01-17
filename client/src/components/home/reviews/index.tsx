// src/components/Reviews.tsx
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Alice",
    review: "Toucan is the best! I love the vibrant design and features.",
    rating: 4,
  },
  {
    name: "Bob",
    review: "Amazing experience. I can’t stop using it!",
    rating: 5,
  },
  {
    name: "Charlie",
    review: "The animations and features are on point. Totally recommend it.",
    rating: 5,
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
      <h2 className="text-4xl font-bold mb-2 text-center">
        Giving Our User a Great Experience
      </h2>
      <p className="opacity-70 max-w-3xl text-center mx-auto mb-10">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
        aliquam at aperiam neque nihil voluptatem excepturi exercitationem culpa
        voluptate provident.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={review.name}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={reviewVariant}
            className="p-4 bg-white dark:bg-stone-700 rounded-lg shadow-lg"
          >
            <div>
              <h3 className="text-xl font-semibold">{review.name}</h3>
              <span>
                {Array.from({ length: review.rating }, (_, i) => i + 1).map(
                  (i) => (
                    <i className="bx bxs-star text-amber-600" key={i} />
                  )
                )}

                <p className="float-right">1 day ago</p>
              </span>
            </div>
            <p>{review.review}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
