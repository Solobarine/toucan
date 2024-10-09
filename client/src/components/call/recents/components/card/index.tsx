const Card = () => {
  return (
    <div className="flex items-start gap-2 p-1.5 rounded-md hover:bg-stone-300 hover:dark:bg-stone-800">
      <img
        src="#"
        alt="Profile Avatar"
        className="w-10 aspect-square overflow-hidden rounded-full bg-white dark:bg-gray-800"
      />
      <div className="grow">
        <span className="flex items-center justify-between">
          <p className="font-semibold">Alan Wake</p>
          <p className="text-xs">09:20</p>
        </span>
        <p className="text-sm mt-1 flex items-center gap-1">
          <i className="bx bx-phone-incoming text-lg" />
          Incoming
        </p>
      </div>
    </div>
  );
};

export default Card;
