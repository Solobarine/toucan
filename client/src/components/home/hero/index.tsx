import PrimaryButton from "../../primaryButton";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-900 dark:to-indigo-900 opacity-90"></div>
      <video
        autoPlay
        loop
        muted
        className="absolute hidden w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          Connect, Share, Thrive
        </h1>
        <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto">
          Experience a new era of social networking where your voice matters.
          Join millions in creating meaningful connections and sharing life's
          moments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton className="bg-white text-primary hover:bg-gray-100">
            Get Started
          </PrimaryButton>
          <PrimaryButton className="bg-transparent border-white text-white hover:bg-white hover:text-purple-600 flex items-center justify-between gap-2">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
