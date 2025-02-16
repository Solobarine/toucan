import { useSelector } from "react-redux";
import RecentCard from "../components/cards/recents";
import { RootState } from "../../../features/store";
import { useLocation } from "react-router-dom";

const Recents = () => {
  const location = useLocation();
  const { chats } = useSelector((state: RootState) => state.chats.recents);
  return (
    <div
      className={`flex flex-col shrink-0 bg-white dark:bg-stone-900 border-r border-gray-200 dark:border-gray-700 p-4 sm:sticky top-0 left-0 transition-all duration-300 ease-in-out ${
        location.pathname === "/chats"
          ? "w-full grow sm:grow-0 sm:w-72"
          : "absolute"
      } h-full`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Chats
        </h2>
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200">
          <i className="bx bx-message-add text-xl" />
        </button>
      </div>
      <div className="relative mb-6">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Recent Chats"
          className="w-full p-2 pl-10 h-10 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <svg
          className="absolute left-3 top-3 h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="space-y-2 overflow-y-auto">
        {chats.map((chat, index) => (
          <RecentCard key={index} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default Recents;
