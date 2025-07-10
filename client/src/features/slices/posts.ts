import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post, Repost } from "../../types/post";
import {
  createPost,
  getPost,
  getPostsFeed,
  getUserPosts,
  repostPost,
} from "../thunks/posts";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { createComment, createReply } from "../thunks/comments";
import { likeContent, unlikeContent } from "../thunks/likes";
// import { appendComment } from "../../utils";

type FeedItem = Post | Repost;

interface InitialState {
  posts: {
    statusCode: number | undefined;
    status: "idle" | "pending" | "failed";
    data: [] | FeedItem[];
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
  userPosts: {
    status: "idle" | "pending" | "failed";
    data: Post[] | [];
    error: string | undefined;
  };
  repost: { status: "idle" | "pending" | "failed" };
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
  userPosts: {
    status: "idle",
    data: [],
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
  repost: {
    status: "idle",
  },
};

const post = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cachePost: (state, action: { payload: Post; type: string }) => {
      state.post.data = action.payload;
    },
    incrementLikeCount: (
      state,
      action: { payload: { post_id: number; context: "posts" | "post" } }
    ) => {
      if (action.payload.context === "posts") {
        const postIndex = state.posts.data.findIndex(
          (post) => post.id === action.payload.post_id
        );
        const repostIndex = state.posts.data.findIndex(
          (post) =>
            post.item_type == "repost" &&
            post.original_post_id === action.payload.post_id
        );

        if (postIndex !== -1) {
          let post = state.posts.data[postIndex];

          if (post.item_type === "post") {
            post = {
              ...post,
              is_liked_by_user: true,
              likes_count: post.likes_count + 1,
            };

            const newPosts = [
              ...state.posts.data.slice(0, postIndex),
              post,
              ...state.posts.data.slice(postIndex + 1),
            ];

            state.posts.data = newPosts;
          }
        }

        if (repostIndex !== -1) {
          const repost = state.posts.data[repostIndex] as Repost;

          state.posts.data[repostIndex] = {
            ...repost,
            original_post: {
              ...repost.original_post,
              is_liked_by_user: true,
              likes_count: repost.original_post.likes_count + 1,
            },
          };
        }
      } else {
        state.post.data = {
          ...(state.post.data as Post),
          is_liked_by_user: true,
          likes_count: (state.post.data?.likes_count as number) + 1,
        };
      }
    },
    decrementLikeCount: (
      state,
      action: { payload: { post_id: number; context: "posts" | "post" } }
    ) => {
      if (action.payload.context === "posts") {
        const postIndex = state.posts.data.findIndex(
          (post) => post.id === action.payload.post_id
        );
        const repostIndex = state.posts.data.findIndex(
          (post) =>
            post.item_type == "repost" &&
            post.original_post_id === action.payload.post_id
        );

        if (postIndex !== -1) {
          let post = state.posts.data[postIndex];

          if (post.item_type === "post") {
            post = {
              ...post,
              is_liked_by_user: false,
              likes_count: post.likes_count - 1,
            };

            const newPosts = [
              ...state.posts.data.slice(0, postIndex),
              post,
              ...state.posts.data.slice(postIndex + 1),
            ];

            state.posts.data = newPosts;
          }
        }

        if (repostIndex !== -1) {
          const repost = state.posts.data[repostIndex] as Repost;
          state.posts.data[repostIndex] = {
            ...repost,
            original_post: {
              ...repost.original_post,
              is_liked_by_user: false,
              likes_count: repost.original_post.likes_count - 1,
            },
          };
        }
      } else {
        state.post.data = {
          ...(state.post.data as Post),
          is_liked_by_user: false,
          likes_count: (state.post.data?.likes_count as number) - 1,
        };
      }
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
      (state, action: PayloadAction<AxiosResponse>) => {
        state.posts.status = "idle";
        state.posts.data = action.payload.data.posts;
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
    });

    /** CREATE POST **/
    builder.addCase(createPost.pending, (state) => {
      state.create.statusCode = undefined;
      state.create.status = "pending";
      state.create.error = undefined;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.create.status = "idle";
      state.create.message = "Post created successfully";
      toast(state.create.message, {});
      state.posts.data = [action.payload.data.post, ...state.posts.data];
    });
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
      toast.success("Content liked successfully");
    });
    builder.addCase(likeContent.rejected, (state, action) => {
      state.like = {
        ...state.like,
        status: "failed",
        error: (action.payload as { error: string | undefined }).error,
      };
      toast.error("Unable to like Content");
    });

    /** UNLIKE CONTENT **/
    builder.addCase(unlikeContent.pending, (state) => {
      state.unlike = { ...state.unlike, status: "pending", error: undefined };
    });
    builder.addCase(unlikeContent.fulfilled, (state) => {
      state.unlike.status = "idle";
      toast.success("Content unliked successfully");
    });
    builder.addCase(unlikeContent.rejected, (state, action) => {
      state.unlike = {
        ...state.unlike,
        status: "failed",
        error: (action.payload as { error: string | undefined }).error,
      };
      toast.error("Something went wrong");
    });

    /** USER POSTS **/
    builder.addCase(getUserPosts.pending, (state) => {
      state.userPosts.status = "pending";
      state.userPosts.data = [];
      state.userPosts.error = undefined;
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.userPosts.status = "idle";
      state.userPosts.data = action.payload.data.posts;
    });
    builder.addCase(getUserPosts.rejected, (state) => {
      state.userPosts.status = "failed";
      state.userPosts.error = "Something went wrong";
    });

    /** REPOST **/
    builder.addCase(repostPost.pending, (state) => {
      state.repost.status = "pending";
    });

    builder.addCase(repostPost.fulfilled, (state) => {
      state.repost.status = "idle";
      toast.success("Repost successful");
    });

    builder.addCase(repostPost.rejected, (state) => {
      state.repost.status = "failed";
      toast.error("Repost failed");
    });
  },
});
export const { cachePost, incrementLikeCount, decrementLikeCount } =
  post.actions;
export default post.reducer;
