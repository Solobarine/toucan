import { useDispatch } from "react-redux";
import { toggleChatSidebar } from "../../../features/slices/settings";
import { AppDispatch } from "../../../features/store";

const Splash = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
          <div className="w-20 h-20 bg-white dark:bg-stone-900 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-stone-600 dark:text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          Welcome to Messages
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
          Select a conversation from the sidebar to start chatting, or create a
          new conversation to connect with friends.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            onClick={() => dispatch(toggleChatSidebar(true))}
          >
            Chats
          </button>
          <button className="px-6 py-3 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-200 hover:scale-105 active:scale-95">
            Browse Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Splash;
