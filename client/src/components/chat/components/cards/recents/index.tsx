import { useSelector } from "react-redux";
import type { Chat } from "../../../../../types/chat";
import type { RootState } from "../../../../../features/store";
import { capitalizeText, formatTimestamp } from "../../../../../utils";
import { NavLink } from "react-router-dom";
import LargeAvatar from "../../../../avatar/large";

const RecentCard = ({ chat }: { chat: Chat }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <NavLink
      to={`/chats/${
        user?.id === chat.sender_id ? chat.receiver_id : chat.sender_id
      }`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-all duration-300 ease-out hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Avatar with online indicator */}
      <div className="relative flex-shrink-0">
        <LargeAvatar
          avatar={
            chat.receiver.id == user?.id
              ? chat.sender.avatar
              : chat.receiver.avatar
          }
          first_name={
            chat.receiver.id == user?.id
              ? chat.sender.first_name
              : chat.receiver.first_name
          }
          last_name={
            chat.receiver.id == user?.id
              ? chat.sender.last_name
              : chat.receiver.last_name
          }
        />
        {/* Online status indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* Header with name and time */}
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 truncate group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors duration-200">
            {user?.id === chat.sender_id
              ? `${capitalizeText(chat.receiver.first_name)} ${capitalizeText(
                  chat.receiver.last_name
                )}`
              : `${capitalizeText(chat.sender.first_name)} ${capitalizeText(
                  chat.sender.last_name
                )}`}
          </h3>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400 whitespace-nowrap ml-2">
            {formatTimestamp(chat.inserted_at)}
          </span>
        </div>

        {/* Message and unread count */}
        <div className="flex justify-between items-center gap-3">
          <p className="text-sm text-stone-600 dark:text-stone-400 truncate flex-1 leading-relaxed">
            {chat.message}
          </p>

          {/* Unread count badge */}
          <div className="hidden flex-shrink-0">
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm">
              10
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default RecentCard;
