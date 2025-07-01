import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import { deleteRequest, postRequest } from "../../utils/api";
import { Like } from "../../types/like";

export const likeContent = createAsyncThunk(
  "LIKES/CREATE",
  async (data: Like, { rejectWithValue }) => {
    const url = `${API_URL}/api/likes`;
    return postRequest(url, { like: data }, { rejectWithValue });
  }
);

export const unlikeContent = createAsyncThunk(
  "LIKES/UNLIKE",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/likes/${id}`;
    return deleteRequest(url, { rejectWithValue });
  }
);
