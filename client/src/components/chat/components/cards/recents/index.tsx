import { useSelector } from "react-redux";
import { Chat } from "../../../../../types/chat";
import { RootState } from "../../../../../features/store";
import { capitalizeText } from "../../../../../utils";
import { NavLink } from "react-router-dom";

const RecentCard = ({ chat }: { chat: Chat }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <NavLink
      to={`/chats/${
        user?.id === chat.sender_id ? chat.receiver_id : chat.sender_id
      }`}
      className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-stone-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out"
    >
      <img
        src="#"
        alt="Profile Avatar"
        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
            {user?.id === chat.sender_id
              ? `${capitalizeText(chat.receiver.first_name)} ${capitalizeText(
                  chat.receiver.last_name
                )}`
              : `${capitalizeText(chat.sender.first_name)} ${capitalizeText(
                  chat.sender.last_name
                )}`}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            09:10
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {chat.message}
          </p>
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-primary rounded-full">
            10
          </span>
        </div>
      </div>
    </NavLink>
  );
};

export default RecentCard;
