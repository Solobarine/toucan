import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import { deleteRequest, patchRequest, postRequest } from "../../utils/api";
import { Chat } from "../../types/chat";

export const createChat = createAsyncThunk(
  "CHAT/CREATE",
  async (data: any, { rejectWithValue }) => {
    const url = `${API_URL}/api/chats`;
    return postRequest(url, data, { rejectWithValue });
  }
);

export const updateChat = createAsyncThunk(
  "CHAT/UPDATE",
  async (data: Chat, { rejectWithValue }) => {
    const url = `${API_URL}/api/chats/${data.id}`;
    return patchRequest(url, data, { rejectWithValue });
  }
);

export const deleteChat = createAsyncThunk(
  "CHAT/DELETE",
  async (id: number | string, { rejectWithValue }) => {
    const url = `${API_URL}/api/chats/${id}`;
    return deleteRequest(url, { rejectWithValue });
  }
);
