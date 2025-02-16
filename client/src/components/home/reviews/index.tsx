import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Alice Johnson",
    avatar: "/avatars/alice.jpg",
    review:
      "This platform has revolutionized the way I connect with friends and family. The interface is intuitive, and the features are top-notch!",
    rating: 5,
  },
  {
    name: "Bob Smith",
    avatar: "/avatars/bob.jpg",
    review:
      "I'm impressed by the privacy controls and the seamless integration of messaging and content sharing. It's become my go-to social network.",
    rating: 5,
  },
  {
    name: "Charlie Davis",
    avatar: "/avatars/charlie.jpg",
    review:
      "The global community feature has allowed me to connect with like-minded individuals from around the world. It's been an amazing experience!",
    rating: 4,
  },
];

const reviewVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

export default function Reviews() {
  return (
    <section className="py-20 bg-white dark:bg-stone-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-center">
          What Our Users Are Saying
        </h2>
        <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Don't just take our word for it. Here's what some of our satisfied
          users have to say about their experience with our platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reviewVariant}
              className="bg-gray-50 dark:bg-stone-700 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{review.name}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {review.review}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
