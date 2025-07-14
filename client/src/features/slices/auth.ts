import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  me,
  getProfile,
  registerUser,
  updateAvatar,
} from "../thunks/auth";
import { AxiosResponse } from "axios";
import { User } from "../../types/auth";
import { serverError } from "../../utils";
import { toast } from "react-toastify";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../thunks/connections";
import { LoadingInterface } from "../../types/loading";

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
    data: User | null;
  };
  updateAvatar: {
    status: LoadingInterface;
  };
}

const initialState: InitialState = {
  isLoggedIn: false,
  user: {
    id: 0,
    avatar: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    bio: "",
    inserted_at: "",
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
  updateAvatar: {
    status: "idle",
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
      (state, action: PayloadAction<AxiosResponse>) => {
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
        data: action.payload.data.user,
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

    /** Send Friend Request **/
    builder.addCase(sendFriendRequest.fulfilled, (state) => {
      state.profile.data = {
        ...(state.profile.data as User),
        friend_request_sent: true,
      };
    });

    /** Cancel Friend Request **/
    builder.addCase(cancelFriendRequest.fulfilled, (state) => {
      state.profile.data = {
        ...(state.profile.data as User),
        friend_request_sent: false,
      };
    });

    /** Accept Friend Request **/
    builder.addCase(acceptFriendRequest.fulfilled, (state) => {
      state.profile.data = {
        ...(state.profile.data as User),
        friend_request_received: false,
        is_friend: true,
      };
    });

    /** Reject Friend Request **/
    builder.addCase(rejectFriendRequest.fulfilled, (state) => {
      state.profile.data = {
        ...(state.profile.data as User),
        friend_request_received: false,
        is_friend: false,
      };
    });

    builder.addCase(updateAvatar.pending, (state) => {
      state.updateAvatar = { status: "pending" };
    });
    builder.addCase(updateAvatar.fulfilled, (state) => {
      state.updateAvatar = { status: "idle" };
      toast.success("Avatar updated successfully");
    });
    builder.addCase(updateAvatar.rejected, (state) => {
      state.updateAvatar = { status: "failed" };
      toast.error("Unable to upload avatar");
    });
  },
});

export default authSlice.reducer;
