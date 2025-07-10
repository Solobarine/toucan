import { useSelector } from "react-redux";
import { Chat } from "../../../../../types/chat";
import { RootState } from "../../../../../features/store";
import { formatTimestamp } from "../../../../../utils";

const ChatCard = ({ chat }: { chat: Chat }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div
      className={`p-2 rounded-md shadow-lg flex items-end justify-start min-w-36 max-w-80 w-fit h-fit gap-5 mb-6 ${
        user?.id === chat.sender_id
          ? "ml-auto text-white bg-purple-600 dark:bg-purple-600"
          : "mr-auto bg-white dark:bg-stone-700"
      }`}
    >
      <p className="grow">{chat.message}</p>
      <span className="grid gap-1">
        <small>{formatTimestamp(chat.inserted_at)}</small>
      </span>
    </div>
  );
};

export default ChatCard;
