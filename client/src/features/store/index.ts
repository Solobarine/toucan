import { configureStore } from "@reduxjs/toolkit";
import settings from "../slices/settings";

const store = configureStore({
  reducer: {
    settings,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
