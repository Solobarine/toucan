import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/post";
import { createPost, getPost, getPostsFeed } from "../thunks/posts";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { createComment, createReply } from "../thunks/comments";
import { likeContent, unlikeContent } from "../thunks/likes";
// import { appendComment } from "../../utils";

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
  createReply: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    message: string | undefined;
    error: string | undefined;
  };
  like: {
    status: "idle" | "pending" | "failed";
    error: string | undefined;
  };
  unlike: {
    status: "idle" | "pending" | "failed";
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
  createReply: {
    statusCode: undefined,
    status: "idle",
    message: undefined,
    error: undefined,
  },
  like: {
    status: "idle",
    error: undefined,
  },
  unlike: { status: "idle", error: undefined },
};

const post = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cachePost: (state, action: { payload: Post; type: string }) => {
      state.post.data = action.payload;
    },
  },
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
        state.posts.data = [action.payload.data.post, ...state.posts.data];
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

    /** GET POST **/
    builder.addCase(getPost.pending, (state) => {
      state.post = {
        ...state.post,
        status: "pending",
        error: undefined,
        statusCode: undefined,
      };
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = {
        ...state.post,
        status: "idle",
        data: action.payload.data.post,
      };
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.post = {
        ...state.post,
        statusCode: (action.payload as { statusCode: number | undefined })
          .statusCode,
        error: (action.payload as { error: string | undefined }).error,
      };
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

      // Increment comment count for post
      if (state.post.data) {
        state.post.data.comments_count += 1;
        state.post.data.comments = [
          action.payload.data.comment,
          ...state.post.data.comments,
        ];
      }
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

    /** CREATE REPLY **/
    builder.addCase(createReply.pending, (state) => {
      state.createReply = {
        error: undefined,
        status: "pending",
        statusCode: undefined,
        message: undefined,
      };
    });
    builder.addCase(createReply.fulfilled, (state, action) => {
      state.createReply = {
        ...state.createReply,
        status: "idle",
        message: "Reply created successfully",
      };
      console.log(action);
      toast("Reply created successfully");

      // Recursively find and append reply
      /**
      if (state.post.data) {
        state.post.data.comments = appendComment(
          state.post.data.comments,
          action.payload.data.comment
        );
      }
      **/
    });
    builder.addCase(createReply.rejected, (state, action) => {
      const payload = action.payload as {
        error: string | undefined;
        statusCode: number | undefined;
      };
      state.createReply = {
        ...state.createReply,
        error: payload.error,
        status: "failed",
        statusCode: payload.statusCode,
      };
    });

    /** LIKE CONTENT **/
    builder.addCase(likeContent.pending, (state) => {
      state.like = { ...state.like, status: "pending", error: undefined };
    });
    builder.addCase(likeContent.fulfilled, (state) => {
      state.like.status = "idle";
      toast("Content liked successfully");
    });
    builder.addCase(likeContent.rejected, (state, action) => {
      state.like = {
        ...state.like,
        status: "failed",
        error: (action.payload as { error: string | undefined }).error,
      };
      toast("Unable to like Content");
    });

    /** UNLIKE CONTENT **/
    builder.addCase(unlikeContent.pending, (state) => {
      state.unlike = { ...state.unlike, status: "pending", error: undefined };
    });
    builder.addCase(unlikeContent.fulfilled, (state) => {
      state.unlike.status = "idle";
      toast("Content liked successfully");
    });
    builder.addCase(unlikeContent.rejected, (state, action) => {
      state.unlike = {
        ...state.unlike,
        status: "failed",
        error: (action.payload as { error: string | undefined }).error,
      };
      toast("Something went wrong");
    });
  },
});
export const { cachePost } = post.actions;
export default post.reducer;
