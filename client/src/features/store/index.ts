import { configureStore } from "@reduxjs/toolkit";
import settings from "../slices/settings";
import auth from "../slices/auth";
import posts from "../slices/posts";

const store = configureStore({
  reducer: {
    settings,
    auth,
    posts,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
