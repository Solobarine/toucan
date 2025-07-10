import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, putRequest } from "../../utils/api";
import { API_URL } from "../../constants";

export const getNotifications = createAsyncThunk(
  "NOTIFICATIONS/GET_NOTIFICATIONS",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/notifications`;
    return getRequest(url, { rejectWithValue });
  }
);

export const markAsRead = createAsyncThunk(
  "NOTIFICATIONS/MARK_AS_READ",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/notifications/${id}`;
    return putRequest(url, {}, { rejectWithValue });
  }
);
