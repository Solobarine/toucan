import { Outlet, useLocation } from "react-router-dom";
import { Channel, Socket } from "phoenix";
import Recents from "../../components/chat/recents";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store";
import { useEffect, useState } from "react";
import { populateRecents } from "../../features/slices/chats";

const Chat = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const socket = new Socket("ws://localhost:4000/socket", {
    params: { token: localStorage.getItem("auth_token") },
  });

  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    socket.connect();
    const newChannel = socket.channel("chat:recents:" + user?.id, {});

    if (user?.id) {
      console.log(user);
      newChannel
        .join()
        .receive("ok", (response) => {
          console.log("Joined successfully:", response);
          setChannel(channel);
          dispatch(populateRecents(response.chats));
        })
        .receive("error", (response) => {
          console.error("Unable to join:", response);
          dispatch(populateRecents([]));
        });
    }

    return () => {
      newChannel.leave();
      socket.disconnect();
    };
  }, []);

  channel?.on("latest", (payload) => {
    console.log(payload);
  });

  const location = useLocation();
  return (
    <section className="chats sm:flex h-screen">
      <Recents />
      <div
        className={`grow ${
          location.pathname === "/chats" ? "hidden sm:block" : ""
        } h-full`}
      >
        <Outlet />
      </div>
    </section>
  );
};

export default Chat;
