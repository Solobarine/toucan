import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../utils/api";
import { Post, Repost } from "../../types/post";

export const getPostsFeed = createAsyncThunk(
  "POSTS/FEED",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/posts`;
    return getRequest(url, { rejectWithValue });
  }
);

export const createPost = createAsyncThunk(
  "POSTS/CREATE",
  async (data: { post: Pick<Post, "title" | "body"> }, { rejectWithValue }) => {
    const url = `${API_URL}/api/posts`;
    return postRequest(url, data, { rejectWithValue });
  }
);

export const getPost = createAsyncThunk(
  "POST/GET_POST",
  async (id: number | string, { rejectWithValue }) => {
    const url = `${API_URL}/api/posts/${id}`;
    return getRequest(url, { rejectWithValue });
  }
);

export const updatePost = createAsyncThunk(
  "POST/UPDATE_POST",
  async (
    { id, data }: { id: number; data: Pick<Post, "id" | "title" | "body"> },
    { rejectWithValue }
  ) => {
    console.log(data);
    const url = `${API_URL}/api/posts/${id}`;
    return patchRequest(url, { post: data }, { rejectWithValue });
  }
);

export const deletePost = createAsyncThunk(
  "POST/DELETE_POST",
  async (id: string | number, { rejectWithValue }) => {
    const url = `${API_URL}/api/posts/${id}`;
    return deleteRequest(url, { rejectWithValue });
  }
);

export const getUserPosts = createAsyncThunk(
  "POSTS/GET_USER_POSTS",
  async (id: string | undefined, { rejectWithValue }) => {
    const url = id
      ? `${API_URL}/api/user-posts?user_id=${id}`
      : `${API_URL}/api/user-posts`;
    return getRequest(url, { rejectWithValue });
  }
);

export const getRepost = createAsyncThunk(
  "POST/GET_REPOST",
  async (id: string | number, { rejectWithValue }) => {
    const url = `${API_URL}/api/reposts/${id}`;
    return getRequest(url, { rejectWithValue });
  }
);

export const repostPost = createAsyncThunk(
  "POSTS/REPOST",
  async (
    data: Pick<Repost, "original_post_id" | "body">,
    { rejectWithValue }
  ) => {
    const url = `${API_URL}/api/posts/repost`;
    return postRequest(url, { repost: data }, { rejectWithValue });
  }
);

export const updateRepost = createAsyncThunk(
  "POST/UPDATE_REPOST",
  async (
    { id, data }: { id: string | number; data: Pick<Repost, "body"> },
    { rejectWithValue }
  ) => {
    const url = `${API_URL}/api/reposts/${id}`;
    return patchRequest(url, { repost: data }, { rejectWithValue });
  }
);

export const deleteRepost = createAsyncThunk(
  "POST/DELETE_REPOST",
  async (id: string | number, { rejectWithValue }) => {
    const url = `${API_URL}/api/reposts/${id}`;
    return deleteRequest(url, { rejectWithValue });
  }
);
