import ChatCard from "./components/cards";

const Recents = () => {
  return (
    <div className="flex flex-col basis-72 shrink-0 bg-white/60 dark:bg-stone-700 border-r-2 border-light dark:border-dark min-h-full p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Chats</h2>
        <button>
          <i className="bx bx-message-square-add" />
        </button>
      </div>
      <div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Recent Chats"
          className="p-2 h-9 w-full dark:bg-stone-800 rounded-md mt-2"
        />
      </div>
      <div className="recentChats h-full max-h-full mt-6 grid gap-1 overflow-y-scroll">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <ChatCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Recents;
