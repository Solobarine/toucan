"use client";

import { Outlet, useLocation } from "react-router-dom";
import { Socket } from "phoenix";
import Recents from "../../components/chat/recents";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../features/store";
import { useEffect, useRef } from "react";
import { populateRecents } from "../../features/slices/chats";

const Chat = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  // Move socket creation outside of render
  const socketRef = useRef<Socket | null>(null);

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
    <section className="chats flex h-screen bg-stone-50 dark:bg-stone-900 overflow-hidden">
      {/* Sidebar - Recents */}
      <div className="flex-shrink-0 relative">
        <Recents />
      </div>
      {/* Content Area */}
      <div className="flex-1 flex flex-col h-full">
        <Outlet />
      </div>

      {/* Mobile Back Button Overlay */}
      {location.pathname.replace(/\/+$/, "") !== "/chats" && (
        <div className="sm:hidden absolute top-4 left-4 z-20">
          <button
            onClick={() => window.history.back()}
            className="p-2 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm text-stone-700 dark:text-stone-300 rounded-full shadow-lg hover:bg-white dark:hover:bg-stone-900 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Go back to chat list"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default Chat;
