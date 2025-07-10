import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../utils/api";
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
