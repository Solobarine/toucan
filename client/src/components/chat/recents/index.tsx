import { useSelector, useDispatch } from "react-redux";
import { Search, MessageCirclePlus, ChevronLeft } from "lucide-react";
import RecentCard from "../components/cards/recents";
import type { RootState, AppDispatch } from "../../../features/store";
import { toggleChatSidebar } from "../../../features/slices/settings";

const Recents = () => {
  const { chats } = useSelector((state: RootState) => state.chats.recents);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div
      className={`flex flex-col bg-white dark:bg-stone-800 border-r border-stone-200 dark:border-stone-800 transition-all duration-300 ease-in-out h-full`}
    >
      {/* Header */}
      <div className="flex-shrink-0 p-3 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Messages
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
              {chats.length} conversation{chats.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => dispatch(toggleChatSidebar(false))}
            className="p-2 w-fit ml-auto bg-white/90 dark:bg-neutral-700/90 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 rounded-full shadow-lg hover:bg-red-500 dark:hover:bg-red-500 transition-all duration-200 active:scale-95 md:hidden"
            aria-label="Hide Chat List"
          >
            <ChevronLeft />
          </button>
        </div>
        <button className="relative p-2.5 my-4 flex items-center justify-center gap-3 bg-primary text-stone-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 hover:text-white rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95 w-full">
          <span>New Chat</span>
          <MessageCirclePlus className="w-5 h-5" />
        </button>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-400 dark:text-stone-500" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search conversations..."
            className="w-full pl-11 pr-4 py-3 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-stone-600 scrollbar-track-transparent hover:scrollbar-thumb-stone-400 dark:hover:scrollbar-thumb-stone-500">
          {chats.length > 0 ? (
            <div className="p-3 space-y-1">
              {chats.map((chat, index) => (
                <RecentCard key={index} chat={chat} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4">
                <MessageCirclePlus className="w-8 h-8 text-stone-400 dark:text-stone-500" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">
                No conversations yet
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 max-w-xs">
                Start a new conversation to connect with your friends and
                colleagues.
              </p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:shadow-md">
                Start Chatting
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer with status indicator */}
      <div className="flex-shrink-0 p-4 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span>Online</span>
        </div>
      </div>
    </div>
  );
};

export default Recents;
