import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginUser, me, registerUser } from "../thunks/auth";
import { AxiosResponse } from "axios";
import { User } from "../../types/auth";

interface InitialState {
  isLoggedIn: boolean;
  user: User | undefined;
  login: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    error: string | undefined;
  };
  register: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    error: string | undefined;
    errors: { [key: string]: string[] } | undefined;
  };
  me: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    error: string | undefined;
  };
}

const initialState: InitialState = {
  isLoggedIn: false,
  user: {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    bio: "",
  },
  login: {
    statusCode: undefined,
    status: "idle",
    error: undefined,
  },
  register: {
    statusCode: undefined,
    status: "idle",
    error: undefined,
    errors: undefined,
  },
  me: {
    statusCode: undefined,
    status: "idle",
    error: undefined,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** LOGIN REDUCERS **/
    builder.addCase(loginUser.pending, (state) => {
      state.isLoggedIn = false;
      state.login.status = "pending";
      state.login.error = undefined;
      state.login.statusCode = undefined;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<AxiosResponse<any>>) => {
        state.isLoggedIn = true;
        state.login.status = "idle";
        localStorage.setItem("auth_token", action.payload.data.token);
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.login.error = (action.payload as { error: string }).error;
    });

    /** REGISTER REDUCERS **/
    builder.addCase(registerUser.pending, (state) => {
      state.isLoggedIn = false;
      state.register.status = "pending";
      state.register.error = undefined;
      state.register.errors = undefined;
      state.register.statusCode = undefined;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.register.status = "idle";
      localStorage.setItem("auth_token", action.payload.data.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.register.error = (action.payload as { error: string }).error;
      state.register.errors = (
        action.payload as { errors: { [key: string]: string[] } }
      ).errors;
      state.register.statusCode = (
        action.payload as { statusCode: number | undefined }
      ).statusCode;
    });

    /** ME REDUCERS **/
    builder.addCase(me.pending, (state) => {
      state.me.status = "pending";
      state.me.error = undefined;
      state.me.statusCode = undefined;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.me.status = "idle";
      state.user = action.payload.data.user;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.me.status = "failed";
      state.me.error = action.error.message;
      state.me.statusCode = (
        action.payload as { statusCode: number | undefined }
      ).statusCode;
      if (state.me.statusCode === 500) {
        state.me.error = "Server Error. We are working to resolve this";
      }
    });
  },
});

export default authSlice.reducer;
