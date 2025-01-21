import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../utils/api";
import { API_URL } from "../../constants";

export const createComment = createAsyncThunk(
  "COMMENTS/CREATE",
  async (data: any, { rejectWithValue }) => {
    const url = `${API_URL}/api/comments`;
    return postRequest(url, data, { rejectWithValue });
  }
);
