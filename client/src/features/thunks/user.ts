import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../utils/api";
import { API_URL } from "../../constants";

export const getUser = createAsyncThunk(
  "USER/GET_USER",
  async (id: string | number, { rejectWithValue }) => {
    const url = `${API_URL}/api/user/${id}`;
    return getRequest(url, { rejectWithValue });
  }
);
