import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import { getRequest, postRequest } from "../../utils/api";

export const getPostsFeed = createAsyncThunk(
  "POSTS/FEED",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/posts`;
    return getRequest(url, { rejectWithValue });
  }
);

export const createPost = createAsyncThunk(
  "POSTS/CREATE",
  async (data: any, { rejectWithValue }) => {
    const url = `${API_URL}/api/posts`;
    return postRequest(url, data, { rejectWithValue });
  }
);
