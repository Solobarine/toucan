const Hero = () => {
  return (
    <div className="min-h-[640px] p-4 md:px-20 md:py-10 grid place-content-center gap-4 bg-[url('/hero/hero_light.avif')] dark:bg-[url('/hero/hero_dark.avif')] bg-cover">
      <h1 className="font-semibold text-3xl sm:text-6xl text-center">
        Stay Connected, Share Moments, <br /> and Express Yourself Effortlessly
      </h1>
      <p className="opacity-75 text-xl text-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum,
        consequatur!
      </p>
      <div className="mt-6 w-fit mx-auto flex gap-4">
        <button className="founded-full px-6 py-3 shadow-md text-white bg-emerald-600 rounded-lg">
          Get Started
        </button>
        <button className="founded-full px-6 py-3 shadow-md text-white bg-primary rounded-lg">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
