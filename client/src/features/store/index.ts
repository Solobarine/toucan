import { configureStore } from "@reduxjs/toolkit";
import settings from "../slices/settings";
import auth from "../slices/auth";

const store = configureStore({
  reducer: {
    settings,
    auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
