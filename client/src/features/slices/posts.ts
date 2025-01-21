import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/post";
import { createPost, getPostsFeed } from "../thunks/posts";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { createComment } from "../thunks/comments";

interface InitialState {
  posts: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    data: [] | Post[];
    error: string | undefined;
  };
  post: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    data: Post | undefined;
    error: string | undefined;
  };
  create: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    message: string | undefined;
    error: string | undefined;
  };
  update: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    message: string | undefined;
    error: string | undefined;
  };
  delete: {
    statusCode: number | undefined;
    message: string | undefined;
    status: "idle" | "pending" | "failed";
    error: string | undefined;
  };
  createComment: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    message: string | undefined;
    error: string | undefined;
  };
}

const initialState: InitialState = {
  posts: {
    statusCode: undefined,
    status: "idle",
    data: [],
    error: undefined,
  },
  post: {
    statusCode: undefined,
    data: undefined,
    status: "idle",
    error: undefined,
  },
  create: {
    statusCode: undefined,
    status: "idle",
    message: undefined,
    error: undefined,
  },
  update: {
    statusCode: undefined,
    status: "idle",
    message: undefined,
    error: undefined,
  },
  delete: {
    statusCode: undefined,
    status: "idle",
    message: undefined,
    error: undefined,
  },
  createComment: {
    statusCode: undefined,
    status: "idle",
    message: undefined,
    error: undefined,
  },
};

const post = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** GET POSTS FEED **/
    builder.addCase(getPostsFeed.pending, (state) => {
      state.posts.statusCode = undefined;
      state.posts.status = "pending";
      state.posts.error = undefined;
    });
    builder.addCase(
      getPostsFeed.fulfilled,
      (state, action: PayloadAction<AxiosResponse, any>) => {
        state.posts.status = "idle";
        state.posts.data = action.payload.data.posts;
        console.log(action);
      }
    );
    builder.addCase(getPostsFeed.rejected, (state, action) => {
      state.posts.statusCode = (
        action.payload as { statusCode: number | undefined }
      ).statusCode;
      state.posts.status = "failed";
      state.posts.error = (
        action.payload as { error: string | undefined }
      ).error;
      console.log(action);
    });

    /** CREATE POST **/
    builder.addCase(createPost.pending, (state) => {
      state.create.statusCode = undefined;
      state.create.status = "pending";
      state.create.error = undefined;
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.create.status = "idle";
        state.create.message = "Post created successfully";
        toast(state.create.message, {});
        state.posts.data = [action.payload.data, ...state.posts.data];
      }
    );
    builder.addCase(createPost.rejected, (state, action) => {
      state.create.statusCode = (
        action.payload as { statusCode: number | undefined }
      ).statusCode;
      state.create.message = "Post failed to create";
      toast(state.create.message, {});
      state.create.status = "failed";
      state.create.error = (
        action.payload as { error: string | undefined }
      ).error;
    });

    /** CREATE COMMENT **/
    builder.addCase(createComment.pending, (state) => {
      state.createComment.statusCode = undefined;
      state.createComment.status = "pending";
      state.createComment.error = undefined;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      state.createComment.status = "idle";
      console.log(action);
      const postIndex = state.posts.data.findIndex(
        (post) => post.id == action.meta.arg.comment.content_id
      );

      const post = state.posts.data[postIndex];
      post.comments_count += 1;
      post.comments = [action.payload.data.comment, ...post.comments];
      state.posts.data = [
        ...state.posts.data.slice(0, postIndex),
        post,
        ...state.posts.data.slice(postIndex + 1),
      ];
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.createComment.statusCode = (
        action.payload as { statusCode: number | undefined }
      ).statusCode;
      state.createComment.error = (
        action.payload as { error: string | undefined }
      ).error;
      console.log(action);
    });
  },
});

export default post.reducer;
