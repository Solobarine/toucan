import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import { deleteRequest, postRequest } from "../../utils/api";

export const likeContent = createAsyncThunk(
  "LIKES/CREATE",
  async (data: any, { rejectWithValue }) => {
    const url = `${API_URL}/api/likes`;
    return postRequest(url, data, { rejectWithValue });
  }
);

export const unlikeContent = createAsyncThunk(
  "LIKES/UNLIKE",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/likes`;
    return deleteRequest(url, { rejectWithValue });
  }
);
