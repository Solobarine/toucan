import { configureStore } from "@reduxjs/toolkit";
import settings from "../slices/settings";
import auth from "../slices/auth";
import posts from "../slices/posts";
import chats from "../slices/chats";

const store = configureStore({
  reducer: {
    settings,
    auth,
    posts,
    chats,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
