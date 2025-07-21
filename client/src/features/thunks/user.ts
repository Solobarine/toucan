import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest } from "../../utils/api";
import { API_URL } from "../../constants";

export const getUser = createAsyncThunk(
  "USER/GET_USER",
  async (id: string | number, { rejectWithValue }) => {
    const url = `${API_URL}/api/user/${id}`;
    return getRequest(url, { rejectWithValue });
  }
);

export const getUserMetrics = createAsyncThunk(
  "USER/GET_METRICS",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/users/${id}/metrics`;
    return getRequest(url, { rejectWithValue });
  }
);

export const getBannedUsers = createAsyncThunk(
  "USER/BANNED_USERS",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/users/blocked`;
    return getRequest(url, { rejectWithValue });
  }
);

export const banUser = createAsyncThunk(
  "USER/BAN_USER",
  async (data: { blocked_id: number }, { rejectWithValue }) => {
    const url = `${API_URL}/api/users/block`;
    return postRequest(url, { ban: data }, { rejectWithValue });
  }
);

export const unbanUser = createAsyncThunk(
  "USER/UNBAN_USER",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/users/${id}/block`;
    return deleteRequest(url, { rejectWithValue });
  }
);
