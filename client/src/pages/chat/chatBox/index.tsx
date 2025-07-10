import { useParams } from "react-router-dom";
import ChatCard from "../../../components/chat/components/cards/chats";
import { capitalizeText } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../features/store";
import { type Channel, Socket } from "phoenix";
import { useEffect, useRef, useState } from "react";
import {
  appendPrivateChat,
  populatePrivateChat,
} from "../../../features/slices/chats";
import { getUser } from "../../../features/thunks/user";
import { useFormik } from "formik";
import { ChatSchema } from "../../../schemas/chat";
import { createChat } from "../../../features/thunks/chats";
import {
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
} from "lucide-react";
import { toggleChatSidebar } from "../../../features/slices/settings";
import ChatLoading from "../../../components/chat/loader";
import { getSocket, initSocket } from "../../../socket";

const ChatBox = () => {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    privateChat: { status, user: user2, chats },
  } = useSelector((state: RootState) => state.chats);
  const dispatch: AppDispatch = useDispatch();

  const chatId =
    user?.id && id
      ? user.id < Number.parseInt(id)
        ? `${user.id},${id}`
        : `${id},${user.id}`
      : null;

  const socketRef = useRef<Socket | null>(getSocket());
  const [channel, setChannel] = useState<Channel | null>(null);

  const { values, errors, handleChange } = useFormik({
    initialValues: {
      receiver_id: Number.parseInt(id as string),
      message: "",
    },
    validationSchema: ChatSchema,
    onSubmit: (values) => {
      dispatch(createChat({ chat: values }));
    },
  });

  useEffect(() => {
    if (!chatId) return;

    const token = localStorage.getItem("auth_token");
    if (!socketRef.current && token) {
      socketRef.current = initSocket(token);
      socketRef.current.connect();
    }

    // Create channel
    const newChannel = socketRef.current?.channel(`chat:${chatId}`, {
      user_id: id,
    });

    // Set up all event listeners before joining
    const eventHandlers = {
      new_message: (response: { chat: string }) => {
        console.log(response.chat);
        dispatch(appendPrivateChat(response.chat));
      },
    };

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      newChannel?.on(event, handler);
    });

    // Join the channel
    newChannel
      ?.join()
      .receive("ok", (response) => {
        console.log("Joined private chat:", response);
        dispatch(populatePrivateChat(response.chats));
        setChannel(newChannel);
      })
      .receive("error", (response) => {
        console.error("Chat join error:", response);
        dispatch(populatePrivateChat([]));
      });

    // Cleanup function
    return () => {
      // Remove all event listeners
      Object.keys(eventHandlers).forEach((event) => {
        newChannel?.off(event);
      });

      // Leave the channel
      if (newChannel) {
        newChannel.leave();
      }

      // Only disconnect socket when component unmounts
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [chatId, id, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [id, dispatch]);

  const handleClick = () => {
    if (!channel || !values.message.trim()) return;
    channel.push("new_message", values);
    values.message = "";
  };

  if (status === "pending") return <ChatLoading />;

  return (
    <div className="messages flex flex-col h-full bg-neutral-50 dark:bg-neutral-900">
      {/* Chat Header */}
      <header className="flex-shrink-0 p-4 flex items-center justify-between sticky top-0 shadow-sm z-10 border-b border-neutral-200 dark:border-neutral-800 backdrop-blur-sm bg-white/85 dark:bg-neutral-800/85">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces"
              alt="Chat Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700 shadow-sm"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-neutral-950 rounded-full shadow-sm"></span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg">
              {capitalizeText(user2?.first_name)}{" "}
              {capitalizeText(user2?.last_name)}
            </h2>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                Active now
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="group p-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            aria-label="Start video call"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            className="group p-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            aria-label="Start voice call"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            className="group p-3 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 hover:scale-105 active:scale-95 ml-1"
            onClick={() => dispatch(toggleChatSidebar(true))}
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400 dark:hover:scrollbar-thumb-neutral-500">
        {chats.length > 0 ? (
          chats.map((chat, index) => <ChatCard key={index} chat={chat} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">👋</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Start the conversation
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-sm">
              Send a message to begin chatting with{" "}
              {capitalizeText(user2?.first_name)}
            </p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 bg-white dark:bg-neutral-800 shadow-lg border-t border-neutral-200 dark:border-neutral-800">
        {errors.message && (
          <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
              <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </span>
              {errors.message}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 p-4">
          {/* Emoji Button */}
          <button
            className="group p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Add emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Attachment Button */}
          <button
            className="group p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
              onChange={handleChange}
              value={values.message}
              className="w-full bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 rounded-2xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-neutral-700 transition-all duration-200 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-600"
            />
            {values.message && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            disabled={!values.message?.trim()}
            className="group relative p-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-neutral-300 disabled:to-neutral-400 dark:disabled:from-neutral-600 dark:disabled:to-neutral-700 text-white rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            aria-label="Send message"
          >
            <Send className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            {values.message?.trim() && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
