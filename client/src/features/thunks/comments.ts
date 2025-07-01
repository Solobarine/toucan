import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../utils/api";
import { API_URL } from "../../constants";
import { Comment } from "../../types/comment";

export const createComment = createAsyncThunk(
  "COMMENTS/CREATE",
  async (
    data: { comment: Pick<Comment, "content_id" | "text"> },
    { rejectWithValue }
  ) => {
    const url = `${API_URL}/api/comments`;
    return postRequest(url, data, { rejectWithValue });
  }
);

export const createReply = createAsyncThunk(
  "COMMENTS/CREATE_REPLY",
  async (data: Comment, { rejectWithValue }) => {
    const url = `${API_URL}/api/replies`;
    return postRequest(url, data, { rejectWithValue });
  }
);
