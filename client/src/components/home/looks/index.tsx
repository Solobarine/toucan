const Looks = () => {
  return (
    <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 py-20">
      <img src="/woman.png" alt="" />
      <div>
        <h2 className="text-4xl font-semibold">
          An ideal interface, for your guilty pleasure
        </h2>
        <p className="opacity-80 mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quae
          laborum atque explicabo quas laboriosam!
        </p>
        <p className="opacity-80 my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          repellendus?
        </p>
        <button className="mt-2 px-6 py-2 rounded-full text-white bg-primary shadow-md">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Looks;
