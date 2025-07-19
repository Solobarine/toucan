import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../utils/api";
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
  async (
    data: { comment: Pick<Comment, "content_id" | "text"> },
    { rejectWithValue }
  ) => {
    const url = `${API_URL}/api/replies`;
    return postRequest(url, data, { rejectWithValue });
  }
);

export const getComments = createAsyncThunk(
  "COMMENTS/GET_COMMENTS",
  async (
    { id, content_type }: { id: number; content_type: string },
    { rejectWithValue }
  ) => {
    const url = `${API_URL}/api/comments?content_type=${content_type}&id=${id}`;
    return getRequest(url, { rejectWithValue });
  }
);

export const updateComment = createAsyncThunk(
  "COMMENTS/UPDATE_COMMENT",
  async (
    { id, data }: { id: string | number; data: Pick<Comment, "text"> },
    { rejectWithValue }
  ) => {
    const url = `${API_URL}/api/comments/${id}`;
    return patchRequest(url, { comment: data }, { rejectWithValue });
  }
);

export const deleteComment = createAsyncThunk(
  "COMMENTS/DELETE_COMMENT",
  async (id: string | number, { rejectWithValue }) => {
    const url = `${API_URL}/api/comments/${id}`;
    return deleteRequest(url, { rejectWithValue });
  }
);
