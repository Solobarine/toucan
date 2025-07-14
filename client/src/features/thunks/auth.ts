import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../utils/api";
import { LoginInterface, RegisterInterface } from "../../types/auth";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "USER/LOGIN",
  async (data: LoginInterface, { rejectWithValue }) => {
    const url = `${API_URL}/api/login`;
    return postRequest(url, data, { rejectWithValue });
  }
);

export const registerUser = createAsyncThunk(
  "USER/REGISTER",
  async (data: RegisterInterface, { rejectWithValue }) => {
    const url = `${API_URL}/api/register`;
    return await postRequest(url, data, { rejectWithValue });
  }
);

export const me = createAsyncThunk(
  "USER/ME",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/me`;
    return await getRequest(url, { rejectWithValue });
  }
);

export const getProfile = createAsyncThunk(
  "USER/PROFILE",
  async (id: string, { rejectWithValue }) => {
    const url = `${API_URL}/api/user/${id}`;
    return getRequest(url, { rejectWithValue });
  }
);

export const logoutUser = createAsyncThunk(
  "USER/LOGOUT",
  async (_, { rejectWithValue }) => {
    const url = `${API_URL}/api/logout`;
    return deleteRequest(url, { rejectWithValue });
  }
);

export const updateAvatar = createAsyncThunk(
  "USER/UPDATE_AVATAR",
  async (data: FormData, { rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    console.log(data);
    try {
      const url = `${API_URL}/api/users/avatar`;
      /**
      const response = axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
**/
      const response = axios.putForm(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          ...error.response.data,
          statusCode: error.status,
        });
      }
      return rejectWithValue({
        error: "Network Error. Check your connection and try again",
        statusCode: 0,
      });
    }
  }
);
