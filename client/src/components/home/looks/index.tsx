import { motion } from "framer-motion";
import PrimaryButton from "../../primaryButton";

export default function Looks() {
  return (
    <section className="py-20 bg-white dark:bg-stone-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <img
              src="/app-interface.png"
              alt="Social Media App Interface"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-6">
              An Intuitive Interface for Seamless Social Experiences
            </h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              Our sleek and user-friendly design puts the focus on what matters
              most - your connections and content. With a clean layout and
              intuitive navigation, you'll find it easier than ever to share
              your world and explore others'.
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Customizable themes to match your style
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Easy-to-use content creation tools
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Seamless integration of all features
              </li>
            </ul>
            <PrimaryButton className="bg-purple-600 hover:bg-purple-700 text-white">
              Explore Features
            </PrimaryButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
