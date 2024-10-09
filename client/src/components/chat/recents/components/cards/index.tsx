const ChatCard = () => {
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
        <span className="flex items-center justify-between mt-1">
          <p className="text-sm">Hey There</p>
          <p className="text-xs">10</p>
        </span>
      </div>
    </div>
  );
};

export default ChatCard;
