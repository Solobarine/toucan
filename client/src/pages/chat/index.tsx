"use client";

import { Outlet, useLocation } from "react-router-dom";
import { type Channel, Socket } from "phoenix";
import Recents from "../../components/chat/recents";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../features/store";
import { useEffect, useRef, useState } from "react";
import { populateRecents } from "../../features/slices/chats";

const Chat = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  // Move socket creation outside of render
  const socketRef = useRef<Socket | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    // Only create the socket once
    if (!socketRef.current) {
      socketRef.current = new Socket("ws://localhost:4000/socket", {
        params: { token: localStorage.getItem("auth_token") },
      });
      socketRef.current.connect();
    }

    if (!user?.id || !socketRef.current) return;

    const newChannel = socketRef.current.channel("chat:recents:" + user.id, {});

    // Set up event listener before joining
    newChannel.on("latest", (payload) => {
      console.log(payload);
    });

    newChannel
      .join()
      .receive("ok", (response) => {
        console.log("Joined successfully:", response);
        setChannel(newChannel); // Store the new channel, not the old one
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
