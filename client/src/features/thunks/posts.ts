import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import { getRequest, postRequest } from "../../utils/api";
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

export const getUserPosts = createAsyncThunk(
  "POSTS/GET_USER_POSTS",
  async (id: string | undefined, { rejectWithValue }) => {
    const url = id
      ? `${API_URL}/api/user-posts?user_id=${id}`
      : `${API_URL}/api/user-posts`;
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
