import { configureStore } from "@reduxjs/toolkit";
import settings from "../slices/settings";
import auth from "../slices/auth";
import posts from "../slices/posts";
import chats from "../slices/chats";
import users from "../slices/users";
import notifications from "../slices/notifications";
import reports from "../slices/report";

const store = configureStore({
  reducer: {
    settings,
    auth,
    posts,
    chats,
    users,
    notifications,
    reports,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
