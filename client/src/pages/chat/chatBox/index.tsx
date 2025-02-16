import { useParams } from "react-router-dom";
import ChatCard from "../../../components/chat/components/cards/chats";
import { capitalizeText } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../features/store";
import { Socket } from "phoenix";
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

  const [channel, setChannel] = useState<any>(null);

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
      <div className="bg-white dark:bg-stone-700 p-2 flex items-center justify-between sticky top-0">
        <div className="flex items-start gap-2">
          <img
            src="#"
            alt="Chat Avatar"
            className="w-10 h-10 overflow-hidden rounded-full bg-gray-400"
          />
          <div>
            <p className="font-semibold">
              {capitalizeText(user2.first_name)}{" "}
              {capitalizeText(user2.last_name)}
            </p>
            <p className="text-sm mt-0.5">online</p>
          </div>
        </div>
        <div>
          <button className="px-2 py-0.5 rounded-md hover:bg-gray-400/20 hover:dark:bg-gray-100/20">
            <i className="bx bx-video" />
          </button>
          <button className="px-2 py-0.5 rounded-md hover:bg-gray-400/20 hover:dark:bg-gray-100/20">
            <i className="bx bx-phone" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="overflow-y-scroll p-4 gap-3">
        {chats.map((chat, index) => (
          <ChatCard key={index} chat={chat} />
        ))}
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0">
        {errors.message && (
          <p className="text-red-600 text-sm font-semibold">{errors.message}</p>
        )}
        <div className="bg-white dark:bg-stone-700 flex items-center gap-2 py-2 pr-1">
          <button className="hover:bg-gray-100/20 px-2 py-1 rounded-md">
            <i className="bx bx-smile" />
          </button>
          <button className="hover:bg-gray-100/20 px-2 py-1 rounded-md">
            <i className="bx bx-paperclip" />
          </button>
          <input
            type="text"
            name="message"
            placeholder="Type your message"
            onChange={handleChange}
            value={values.message}
            className="bg-transparent p-2 outline-none w-full"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            <i className="bx bx-send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
