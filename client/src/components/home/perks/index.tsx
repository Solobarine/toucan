const Perks = () => {
  const perks = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam.",
    "Lorem ipsum dolor sit amet consectetur.",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  ];

  return (
    <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-2 py-20">
      <div>
        <h2 className="text-4xl font-semibold">
          Access a unified messaging solution in one place
        </h2>
        <p className="opacity-80 my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          doloribus officia libero inventore rem tenetur iure nobis rerum
          aperiam quis.
        </p>
        <div>
          {perks.map((value, index) => (
            <span key={index} className="flex items-start gap-2">
              <i className="bx bxs-badge-check text-xl text-emerald-600" />
              <p className="text-lg">{value}</p>
            </span>
          ))}
        </div>
      </div>
      <img src="/chats.png" alt="" className="hidden md:block ml-auto" />
    </div>
  );
};

export default Perks;
