import { createSlice } from "@reduxjs/toolkit";
import { LoadingInterface } from "../../types/loading";
import { getNotifications } from "../thunks/notifications";
import { Notification } from "../../types/notifications";

interface InitialState {
  notifications: {
    state: LoadingInterface;
    error: string;
    data: Notification[] | [];
  };
  markAsRead: {
    state: LoadingInterface;
    error: string;
  };
}

const initialState: InitialState = {
  notifications: {
    state: "idle",
    error: "",
    data: [],
  },
  markAsRead: {
    state: "idle",
    error: "",
  },
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state) => {
      state.notifications = {
        ...state.notifications,
        state: "pending",
        error: "",
      };
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notifications = {
        state: "idle",
        error: "",
        data: action.payload.data.data,
      };
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.notifications = {
        ...state.notifications,
        state: "failed",
        error: "Unable to Retrieve Notifications",
      };
    });
  },
});

export default notificationSlice.reducer;
