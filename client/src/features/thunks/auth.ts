import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import { deleteRequest, getRequest, postRequest } from "../../utils/api";

export const loginUser = createAsyncThunk(
  "USER/LOGIN",
  async (data: any, { rejectWithValue }) => {
    const url = `${API_URL}/api/login`;
    return postRequest(url, data, { rejectWithValue });
  }
);

export const registerUser = createAsyncThunk(
  "USER/REGISTER",
  async (data: any, { rejectWithValue }) => {
    const url = `${API_URL}/api/register`;
    return await postRequest(url, data, { rejectWithValue });
  }
);

export const me = createAsyncThunk(
  "USER/ME",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/me`;
    return await getRequest(url, { rejectWithValue });
  }
);

export const getProfile = createAsyncThunk(
  "USER/PROFILE",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/profile`;
    return getRequest(url, { rejectWithValue });
  }
);

export const logoutUser = createAsyncThunk(
  "USER/LOGOUT",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/logout`;
    return deleteRequest(url, { rejectWithValue });
  }
);
