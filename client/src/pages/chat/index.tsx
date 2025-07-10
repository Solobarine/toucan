"use client";

import { Outlet, useLocation } from "react-router-dom";
import { Socket } from "phoenix";
import Recents from "../../components/chat/recents";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../features/store";
import { useEffect, useRef } from "react";
import { appendRecents, populateRecents } from "../../features/slices/chats";
import { toggleChatSidebar } from "../../features/slices/settings";
import { getSocket, initSocket } from "../../socket";

const Chat = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { isChatSidebarOpen } = useSelector(
    (state: RootState) => state.settings
  );

  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  // Move socket creation outside of render
  const socketRef = useRef<Socket | null>(getSocket());

  console.log(location.pathname.replace(/\/+$/, ""));

  let isOnChats = location.pathname.replace(/\/+$/, "") == "/chats";

  useEffect(() => {
    if (isOnChats) {
      dispatch(toggleChatSidebar(true));
    } else {
      dispatch(toggleChatSidebar(false));
    }
  }, [isOnChats]);

  useEffect(() => {
    // Only create the socket once
    const token = localStorage.getItem("auth_token") as string;
    if (!socketRef.current) {
      socketRef.current = initSocket(token);
    }

    if (!user?.id || !socketRef.current) return;

    const newChannel = socketRef.current.channel("chat:recents:" + user.id, {});

    // Set up event listener before joining
    newChannel.on("latest", (payload) => {
      console.log("Joined Latest chats channel");
      dispatch(appendRecents(payload.chat));
      console.log(payload.chat);
    });

    newChannel
      .join()
      .receive("ok", (response) => {
        console.log("Joined successfully:", response);
        dispatch(populateRecents(response.chats));
      })
      .receive("error", (response) => {
        console.error("Unable to join:", response);
        dispatch(populateRecents([]));
      });

    return () => {
      // Clean up channel and socket
      if (newChannel) {
        newChannel.leave();
      }
      // Only disconnect socket when component unmounts
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user?.id, dispatch]); // Add dispatch to dependencies

  return (
    <section className="relative chats flex h-screen bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
      {/* Sidebar - Recents */}
      <div
        className={`flex-shrink-0 absolute ${
          isChatSidebarOpen ? "inset-0 z-20" : "-z-20"
        } sm:relative sm:z-20`}
      >
        <Recents />
      </div>
      {/* Content Area */}
      <div className="flex-1 flex flex-col h-full">
        <Outlet />
      </div>
    </section>
  );
};

export default Chat;
