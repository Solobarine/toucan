import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../utils/api";

export const getFriends = createAsyncThunk(
  "FRIENDS/GET_FRIENDS",
  async (
    { id, page, per }: { id: number; page: number; per: number },
    { rejectWithValue },
  ) => {
    const url = `${API_URL}/api/friends?user_id=${id}&page=${page}&per=${per}`;
    return getRequest(url, { rejectWithValue });
  },
);

export const getFriendRequests = createAsyncThunk(
  "FRIENDSHIPS/GET_FRIEND_REQUESTS",
  async (type: string, { rejectWithValue }) => {
    const url = `${API_URL}/api/friendships/requests?type=${type}`;
    return getRequest(url, { rejectWithValue });
  },
);

export const getFriendSuggestions = createAsyncThunk(
  "FRIENDSHIPS/GET_FRIEND_SUGGESTIONS",
  async ({ id, limit }: { id: number; limit: number }, { rejectWithValue }) => {
    const url = `${API_URL}/api/friends/suggestions?id=${id}&limit=${limit}`;
    return getRequest(url, { rejectWithValue });
  },
);

export const getFollowers = createAsyncThunk(
  "FOLLOWERSHIPS/GET_FOLLOWERS",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/followerships/followers`;
    return getRequest(url, { rejectWithValue });
  },
);

export const getFollowing = createAsyncThunk(
  "FOLLOWERSHIPS/GET_FOLLOWING",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/followerships/following`;
    return getRequest(url, { rejectWithValue });
  },
);

export const followUser = createAsyncThunk(
  "FOLLOWERSHIPS/FOLLOW_USER",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/followerships`;
    return postRequest(
      url,
      { followership: { followee_id: id } },
      { rejectWithValue },
    );
  },
);

export const unfollowUser = createAsyncThunk(
  "FOLLOWERSHIP/UNFOLLOW_USER",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/followerships?followee_id=${id}`;
    return deleteRequest(url, { rejectWithValue });
  },
);

export const sendFriendRequest = createAsyncThunk(
  "FRIENDSHIP/SEND_FRIEND_REQUEST",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/friendships/request`;
    const body = { friendship: { friend_id: id } };
    return postRequest(url, body, { rejectWithValue });
  },
);

export const cancelFriendRequest = createAsyncThunk(
  "FRIENDSHIP/CANCEL_FRIEND_REQUEST",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/friendships/request/cancel`;
    const body = { id: id };
    return putRequest(url, body, { rejectWithValue });
  },
);

export const acceptFriendRequest = createAsyncThunk(
  "FRIENDSHIP/ACCEPT_FRIEND_REQUEST",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/friendships/${id}/accept`;
    const body = { id: id };
    return putRequest(url, body, { rejectWithValue });
  },
);

export const rejectFriendRequest = createAsyncThunk(
  "FRIENDSHIP/REJECT_FRIEND_REQUEST",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/friendships/${id}/block`;
    const body = { id: id };
    return putRequest(url, body, { rejectWithValue });
  },
);

export const unfriend = createAsyncThunk(
  "FRIENDSHIP/UNFRIEND",
  async (id: number, { rejectWithValue }) => {
    const url = `${API_URL}/api/friendships?friend_id=${id}`;
    return deleteRequest(url, { rejectWithValue });
  },
);
