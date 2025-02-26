import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  me,
  getProfile,
  registerUser,
} from "../thunks/auth";
import { AxiosResponse } from "axios";
import { User, UserProfile } from "../../types/auth";
import { serverError } from "../../utils";
import { toast } from "react-toastify";

interface InitialState {
  isLoggedIn: boolean;
  user: User | null;
  login: {
    statusCode: number | null;
    status: "idle" | "pending" | "failed";
    error: string | null;
  };
  register: {
    statusCode: number | null;
    status: "idle" | "pending" | "failed";
    error: string | null;
    errors: { [key: string]: string[] } | null;
  };
  me: {
    statusCode: number | null;
    status: "idle" | "pending" | "failed";
    error: string | null;
  };
  logout: {
    message: string | null;
  };
  profile: {
    status: "idle" | "pending" | "failed";
    error: string | null;
    data: UserProfile | null;
  };
}

const initialState: InitialState = {
  isLoggedIn: false,
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    bio: "",
  },
  login: {
    statusCode: null,
    status: "idle",
    error: null,
  },
  register: {
    statusCode: null,
    status: "idle",
    error: null,
    errors: null,
  },
  me: {
    statusCode: null,
    status: "idle",
    error: null,
  },
  logout: {
    message: null,
  },
  profile: {
    status: "idle",
    error: null,
    data: null,
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
      state.login.error = null;
      state.login.statusCode = null;
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
      state.register.error = null;
      state.register.errors = null;
      state.register.statusCode = null;
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
        action.payload as { statusCode: number | null }
      ).statusCode;
    });

    /** ME REDUCERS **/
    builder.addCase(me.pending, (state) => {
      state.me.status = "pending";
      state.me.error = null;
      state.me.statusCode = null;
    });
    builder.addCase(me.fulfilled, (state, action) => {
      state.me.status = "idle";
      state.user = action.payload.data.user;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.me.status = "failed";
      state.me.error = action.error.message as string;
      state.me.statusCode = (
        action.payload as { statusCode: number | null }
      ).statusCode;
      if (state.me.statusCode === 500) {
        state.me.error = serverError();
      }
    });

    /** PROFILE REDUCERS **/
    builder.addCase(getProfile.pending, (state) => {
      state.profile = {
        ...state.profile,
        status: "pending",
        error: null,
      };
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = {
        ...state.profile,
        status: "idle",
        data: action.payload.data.profile,
      };
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.profile = {
        ...state.profile,
        status: "failed",
        error: "Something went wrong",
      };
    });

    /** LOGOUT REDUCERS **/
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      toast("User successfully logged out");
      localStorage.removeItem("auth_token");
    });
    builder.addCase(logoutUser.rejected, () => {
      toast("Unable to Logout");
    });
  },
});

export default authSlice.reducer;
