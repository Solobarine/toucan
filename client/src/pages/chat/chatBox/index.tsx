import { useParams } from "react-router-dom";
import ChatCard from "../../../components/chat/components/cards/chats";
import { capitalizeText } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { Channel, Socket } from "phoenix";
import { useEffect, useState } from "react";
import {
  appendPrivateChat,
  appendRecents,
  populatePrivateChat,
} from "../../../features/slices/chats";
import { getUser } from "../../../features/thunks/user";
import { useFormik } from "formik";
import { ChatSchema } from "../../../schemas/chat";
import { createChat } from "../../../features/thunks/chats";
import { MoreVertical, Phone, Video } from "lucide-react";

const ChatBox = () => {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    privateChat: { status, error, user: user2, chats },
  } = useSelector((state: RootState) => state.chats);
  const dispatch: AppDispatch = useDispatch();
  console.log(chats);
  const chatId =
    (user?.id as number) < parseInt(id as string)
      ? `${user?.id},${id}`
      : `${id},${user?.id}`;
  const socket = new Socket("ws://localhost:4000/socket", {
    params: { token: localStorage.getItem("auth_token") },
  });

  const { values, errors, handleChange } = useFormik({
    initialValues: {
      receiver_id: parseInt(id as string),
      message: "",
    },
    validationSchema: ChatSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(createChat({ chat: values }));
    },
  });

  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    socket.connect();
    const newChannel = socket.channel(`chat:${chatId}`, { user_id: id });

    newChannel
      .join()
      .receive("ok", (response) => {
        console.log("Joined private chat:", response);
        dispatch(populatePrivateChat(response.chats));
        setChannel(newChannel);
      })
      .receive("error", (response) => {
        console.error("Chat join error:", response);
        dispatch(populatePrivateChat([]));
        setChannel(newChannel);
      });

    newChannel.on("new_message", (response) => {
      console.log(response.chat);
      dispatch(appendPrivateChat(response.chat));
    });

    newChannel.on("latest", (response) => {
      console.log(response);
      dispatch(appendRecents(response.chat));
    });

    newChannel.on("ping", (response) => {
      console.log(response);
    });

    return () => {
      newChannel.leave();
      socket.disconnect();
    };
  }, [chatId, id]);

  useEffect(() => {
    dispatch(getUser(id as string));
  }, [id]);

  if (status === "pending") return <p>Loading chat...</p>;

  const handleClick = () => {
    //submitForm();
    if (!channel) return;
    channel.push("new_message", values);
  };

  return error ? (
    <div>{error}</div>
  ) : (
    <div className="messages">
      {/* Chat Header */}
      <header className="bg-white dark:bg-stone-800 p-4 flex items-center justify-between sticky top-0 shadow-sm z-10 border-b border-gray-200 dark:border-stone-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces"
              alt="Chat Avatar"
              className="w-11 h-11 rounded-full object-cover border-2 border-white dark:border-stone-700"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-stone-800 rounded-full"></span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {capitalizeText(user2?.first_name)}{" "}
              {capitalizeText(user2?.last_name)}
            </h2>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              Active now
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-2.5 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors duration-200"
            aria-label="Start video call"
          >
            <Video className="w-5 h-5" />
          </button>
          <button
            className="p-2.5 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors duration-200"
            aria-label="Start voice call"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            className="p-2.5 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors duration-200 ml-1"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>
      {/* Messages */}
      <div className="overflow-y-scroll p-4 gap-3">
        {chats.map((chat, index) => (
          <ChatCard key={index} chat={chat} />
        ))}
      </div>
      {/* Message Input */}
      <div className="sticky bottom-0 bg-white dark:bg-stone-700 shadow-lg transition-all duration-300 ease-in-out">
        {errors.message && (
          <p className="text-red-500 text-sm font-medium px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-t-lg">
            {errors.message}
          </p>
        )}
        <div className="flex items-center gap-2 p-3 rounded-lg">
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <i className="bx bx-smile text-xl" />
          </button>
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <i className="bx bx-paperclip text-xl" />
          </button>
          <div className="flex-grow relative">
            <input
              type="text"
              name="message"
              placeholder="Type your message"
              onChange={handleChange}
              value={values.message}
              className="w-full bg-gray-100 dark:bg-stone-800 text-gray-800 dark:text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark transition-all duration-200"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            className="bg-primary hover:bg-primary/90 text-white p-2 aspect-square h-10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <i className="bx bx-send text-xl" />
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default ChatBox;
