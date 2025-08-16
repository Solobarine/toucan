/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getRequest = async (
  url: string,
  { rejectWithValue }: { rejectWithValue: any },
) => {
  const token = localStorage.getItem("auth_token");

  try {
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue({
        error: error.response.data,
        statusCode: error.status,
      });
    }
    return rejectWithValue({
      error: "Network Error. Check your connection and try again",
      statusCode: 0,
    });
  }
};

export const postRequest = async (
  url: string,
  data: any,
  { rejectWithValue }: { rejectWithValue: any },
) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await axios.post(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
};

export const postFormRequest = async (
  url: string,
  data: any,
  { rejectWithValue }: { rejectWithValue: any },
) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await axios.postForm(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
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
};

export const putRequest = async (
  url: string,
  data: any,
  { rejectWithValue }: { rejectWithValue: any },
) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await axios.put(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
};

export const patchRequest = async (
  url: string,
  data: any,
  { rejectWithValue }: { rejectWithValue: any },
) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await axios.patch(url, data, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
};

export const deleteRequest = async (
  url: string,
  { rejectWithValue }: { rejectWithValue: any },
) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await axios.delete(url, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
};
