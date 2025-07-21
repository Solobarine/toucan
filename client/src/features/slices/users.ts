import { createSlice } from "@reduxjs/toolkit";
import { Metrics, User } from "../../types/auth";
import { LoadingInterface } from "../../types/loading";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFollowers,
  getFollowing,
  getFriendRequests,
  getFriendSuggestions,
  getFriends,
  rejectFriendRequest,
  sendFriendRequest,
} from "../thunks/connections";
import {
  banUser,
  getBannedUsers,
  getUserMetrics,
  unbanUser,
} from "../thunks/user";
import { toast } from "react-toastify";

interface UserState {
  friends: {
    state: LoadingInterface;
    error: string;
    data: User[] | [];
  };
  friendRequests: {
    state: LoadingInterface;
    error: string;
    data: User[] | [];
  };
  friendSuggestions: {
    state: LoadingInterface;
    error: string;
    data: User[] | [];
  };
  followers: {
    state: LoadingInterface;
    error: string;
    data: User[] | [];
  };
  following: {
    state: LoadingInterface;
    error: string;
    data: User[] | [];
  };
  metrics: {
    state: LoadingInterface;
    error: string;
    data: Metrics;
  };
  sendFriendRequest: { state: LoadingInterface };
  cancelFriendRequest: { state: LoadingInterface };
  acceptFriendRequest: { state: LoadingInterface };
  rejectFriendRequest: { state: LoadingInterface };
  blockedUsers: { state: LoadingInterface; data: User[] | []; error: string };
  banUser: { state: LoadingInterface };
  unbanUser: { state: LoadingInterface };
}

const initialMetricsData = {
  user_id: 0,
  friends_count: 0,
  followers_count: 0,
  following_count: 0,
  posts_count: 0,
  reposts_count: 0,
  total_posts: 0,
};

const initialState: UserState = {
  friends: {
    state: "idle",
    error: "",
    data: [],
  },
  friendRequests: {
    state: "idle",
    error: "",
    data: [],
  },
  friendSuggestions: {
    state: "idle",
    error: "",
    data: [],
  },
  followers: {
    state: "idle",
    error: "",
    data: [],
  },
  following: {
    state: "idle",
    error: "",
    data: [],
  },
  metrics: {
    state: "idle",
    error: "",
    data: initialMetricsData,
  },
  sendFriendRequest: { state: "idle" },
  cancelFriendRequest: { state: "idle" },
  acceptFriendRequest: { state: "idle" },
  rejectFriendRequest: { state: "idle" },
  blockedUsers: { state: "idle", data: [], error: "" },
  banUser: { state: "idle" },
  unbanUser: { state: "idle" },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** Friends **/
    builder.addCase(getFriends.pending, (state) => {
      state.friends = { state: "pending", error: "", data: [] };
    });
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.friends = {
        ...state.friends,
        state: "idle",
        data: action.payload.data.data,
      };
    });
    builder.addCase(getFriends.rejected, (state) => {
      state.friends = {
        ...state.friends,
        state: "failed",
        error: "Unable to Retrieve Friends",
      };
    });

    /** Friend Requests **/
    builder.addCase(getFriendRequests.pending, (state) => {
      state.friendRequests = {
        state: "pending",
        error: "",
        data: [],
      };
    });
    builder.addCase(getFriendRequests.fulfilled, (state, action) => {
      state.friendRequests = {
        ...state.friendRequests,
        state: "idle",
        data: action.payload.data.data,
      };
    });
    builder.addCase(getFriendRequests.rejected, (state) => {
      state.friendRequests = {
        ...state.friendRequests,
        state: "failed",
        error: "Unable to Retrieve Friend Requests",
      };
    });

    /** Followers **/
    builder.addCase(getFollowers.pending, (state) => {
      state.followers = {
        state: "pending",
        error: "",
        data: [],
      };
    });
    builder.addCase(getFollowers.fulfilled, (state, action) => {
      state.followers = {
        ...state.followers,
        state: "idle",
        data: action.payload.data.followerships,
      };
    });
    builder.addCase(getFollowers.rejected, (state) => {
      state.followers = {
        ...state.followers,
        state: "failed",
        error: "Unable to Retrieve Followers",
      };
    });

    /** Following **/
    builder.addCase(getFollowing.pending, (state) => {
      state.following = {
        state: "pending",
        error: "",
        data: [],
      };
    });
    builder.addCase(getFollowing.fulfilled, (state, action) => {
      state.following = {
        ...state.following,
        state: "idle",
        data: action.payload.data.followerships,
      };
    });
    builder.addCase(getFollowing.rejected, (state) => {
      state.following = {
        ...state.following,
        state: "failed",
        error: "Unable to Retrieve Users Followed",
      };
    });

    /** Metrics **/
    builder.addCase(getUserMetrics.pending, (state) => {
      state.metrics = { state: "pending", error: "", data: initialMetricsData };
    });
    builder.addCase(getUserMetrics.fulfilled, (state, action) => {
      state.metrics = {
        ...state.metrics,
        state: "idle",
        data: action.payload.data,
      };
    });
    builder.addCase(getUserMetrics.rejected, (state) => {
      state.metrics = {
        ...state.metrics,
        state: "failed",
        error: "Unable to Retrieve Metrics",
        data: initialMetricsData,
      };
    });

    /** Friend Suggestions **/
    builder.addCase(getFriendSuggestions.pending, (state) => {
      state.friendSuggestions = { state: "pending", error: "", data: [] };
    });
    builder.addCase(getFriendSuggestions.fulfilled, (state, action) => {
      state.friendSuggestions = {
        ...state.friendSuggestions,
        state: "idle",
        data: action.payload.data,
      };
    });
    builder.addCase(getFriendSuggestions.rejected, (state) => {
      state.friendSuggestions = {
        ...state.friendSuggestions,
        state: "failed",
        error: "Unable to Retrieve Metrics",
        data: [],
      };
    });

    /** Send Friend Request **/
    builder.addCase(sendFriendRequest.pending, (state) => {
      state.sendFriendRequest = { state: "pending" };
    });
    builder.addCase(sendFriendRequest.fulfilled, (state) => {
      state.sendFriendRequest = { state: "idle" };
      toast.success("Friend Request Sent");
    });
    builder.addCase(sendFriendRequest.rejected, (state) => {
      state.sendFriendRequest = { state: "failed" };
      toast.error("Friend Request Failed");
    });

    /** Cancel Friend Request **/
    builder.addCase(cancelFriendRequest.pending, (state) => {
      state.cancelFriendRequest = { state: "pending" };
    });
    builder.addCase(cancelFriendRequest.fulfilled, (state) => {
      state.cancelFriendRequest = { state: "idle" };
      toast.success("Friend Request Canceled");
    });
    builder.addCase(cancelFriendRequest.rejected, (state) => {
      state.cancelFriendRequest = { state: "failed" };
      toast.error("Unable to Cancel Friend Request");
    });

    /** Accept Friend Request **/
    builder.addCase(acceptFriendRequest.pending, (state) => {
      state.acceptFriendRequest = { state: "pending" };
    });
    builder.addCase(acceptFriendRequest.fulfilled, (state) => {
      state.acceptFriendRequest = { state: "idle" };
      toast.success("Friend Request Accepted");
    });
    builder.addCase(acceptFriendRequest.rejected, (state) => {
      state.acceptFriendRequest = { state: "failed" };
      toast.error("Unable to Accept Friend Request");
    });

    /** Send Friend Request **/
    builder.addCase(rejectFriendRequest.pending, (state) => {
      state.rejectFriendRequest = { state: "pending" };
    });
    builder.addCase(rejectFriendRequest.fulfilled, (state) => {
      state.rejectFriendRequest = { state: "idle" };
      toast.success("Friend Request Rejected");
    });
    builder.addCase(rejectFriendRequest.rejected, (state) => {
      state.rejectFriendRequest = { state: "failed" };
      toast.error("Unable to Reject Friend Request");
    });

    /** GET BLOCKED USERS **/
    builder.addCase(getBannedUsers.pending, (state) => {
      state.blockedUsers = { state: "pending", data: [], error: "" };
    });
    builder.addCase(getBannedUsers.fulfilled, (state, action) => {
      state.blockedUsers = {
        ...state.blockedUsers,
        state: "idle",
        data: action.payload.data.users,
      };
    });
    builder.addCase(getBannedUsers.rejected, (state) => {
      state.blockedUsers = {
        ...state.blockedUsers,
        state: "failed",
        error: "Unable to get Banned Users",
      };
    });

    /** BAN USER **/
    builder.addCase(banUser.pending, (state) => {
      state.banUser = { state: "pending" };
    });
    builder.addCase(banUser.fulfilled, (state) => {
      state.banUser = { state: "idle" };
      toast.success("User Banned. You will not see posts from this user");
    });
    builder.addCase(banUser.rejected, (state) => {
      state.banUser = { state: "failed" };
      toast.error("Failed to ban user");
    });

    /** UNBAN USER **/
    builder.addCase(unbanUser.pending, (state) => {
      state.unbanUser = { state: "pending" };
    });
    builder.addCase(unbanUser.fulfilled, (state, action) => {
      const blockedUserId = action.meta.arg;
      state.unbanUser = { state: "idle" };
      toast.success("User unbanned successfully");
      state.blockedUsers.data = state.blockedUsers.data.filter(
        (user) => user.id !== blockedUserId
      );
    });
    builder.addCase(unbanUser.rejected, (state) => {
      state.unbanUser = { state: "failed" };
      toast.error("Failed to Unban User");
    });
  },
});

export default usersSlice.reducer;
