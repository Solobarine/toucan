import { useSelector } from "react-redux";
import RecentCard from "../components/cards/recents";
import { RootState } from "../../../features/store";

const Recents = () => {
  const { chats } = useSelector((state: RootState) => state.chats.recents);
  return (
    <div className="recents flex flex-col basis-72 shrink-0 bg-white dark:bg-stone-700 border-r-2 border-light dark:border-dark min-h-full p-3 sticky top-0">
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
          className="p-2 h-9 w-full bg-stone-200 dark:bg-stone-800 rounded-md mt-2"
        />
      </div>
      <div className="recentChats h-full max-h-screen mt-6 flex flex-col gap-1 justify-start overflow-y-auto">
        {chats.map((chat, index) => (
          <RecentCard key={index} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default Recents;
